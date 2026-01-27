pipeline {
    agent any

    triggers {
        githubPush()
    }

    tools {
        nodejs 'Node 20' 
    }

    environment {
        // Ensure npm is available in the path
        PATH = "${tool 'Node 20'}/bin;${env.PATH}"
        
        // Define Docker image details
        IMAGE_NAME = "cybersafe-app"
        IMAGE_TAG = "v${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci' 
            }
        }

        stage('Lint Code') {
            steps {
                bat 'npm run lint'
            }
        }

        stage('Unit Tests') {
            steps {
                bat 'npm run test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner' 
                    // Make sure this name ('SonarQube') matches your Jenkins System configuration!
                    withSonarQubeEnv('SonarQube') {
                        bat "\"${scannerHome}\\bin\\sonar-scanner.bat\""
                    }
                }
            }
        }

        stage('Build Application') {
            steps {
                bat 'npm run build'
            }
        }

        // --- NEW STAGE: BUILD DOCKER IMAGE ---
        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker Image...'
                    // Build the image using the variables defined at the top
                    bat "docker build -t %IMAGE_NAME%:%IMAGE_TAG% ."
                    
                    // Also tag it as 'latest' for the scanner
                    bat "docker tag %IMAGE_NAME%:%IMAGE_TAG% %IMAGE_NAME%:latest"
                }
            }
        }

        // --- NEW STAGE: SECURITY SCAN ---
        stage('Trivy Security Scan') {
            steps {
                script {
                    echo 'Scanning Docker Image...'
                    // 1. Download the HTML template for the report (Windows compatible)
                    bat "curl -L -o html.tpl https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/html.tpl"

                    // 2. Generate the HTML Report (Does not fail build yet)
                    // We use 'call' to ensure it continues even if vulnerabilities are found
                    bat "trivy image --format template --template \"@html.tpl\" -o trivy-report.html %IMAGE_NAME%:latest"
                    
                    // 3. Generate JSON Report (for import later)
                    bat "trivy image --format json -o trivy-report.json %IMAGE_NAME%:latest"

                    // 4. Run the "Pass/Fail" check (Fails build on CRITICAL)
                    bat "trivy image --exit-code 1 --severity CRITICAL %IMAGE_NAME%:latest"
                }
            }
        }
    }

    post {
        always {
            script {
                // Archive the reports so they appear on the Build page
                archiveArtifacts artifacts: 'trivy-report.html, trivy-report.json', fingerprint: true
                
                def toEmail = "sahilrane249@gmail.com" 
                
                try {
                    mail to: toEmail,
                         subject: "Jenkins Build ${currentBuild.currentResult}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                         body: """
                            Build Status: ${currentBuild.currentResult}
                            Job: ${env.JOB_NAME}
                            Build Number: ${env.BUILD_NUMBER}
                            
                            Docker Image: ${env.IMAGE_NAME}:${env.IMAGE_TAG}
                            
                            Check console output at: ${env.BUILD_URL}
                         """
                } catch (Exception e) {
                    echo "Failed to send email: ${e.message}"
                }
            }
        }
        failure {
            echo 'Build failed. Email sent.'
        }
    }
}