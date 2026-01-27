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

        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker Image...'
                    bat "docker build -t %IMAGE_NAME%:%IMAGE_TAG% ."
                    bat "docker tag %IMAGE_NAME%:%IMAGE_TAG% %IMAGE_NAME%:latest"
                }
            }
        }

        stage('Trivy Security Scan') {
            steps {
                script {
                    echo 'Scanning Docker Image...'
                    // 1. Download Template
                    bat "curl -L -o html.tpl https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/html.tpl"

                    // 2. HTML Report
                    bat "trivy image --format template --template \"@html.tpl\" -o trivy-report.html %IMAGE_NAME%:latest"
                    
                    // 3. JSON Report (Required for AI Analysis)
                    bat "trivy image --format json -o trivy-report.json %IMAGE_NAME%:latest"

                    // 4. Pass/Fail Check
                    bat "trivy image --exit-code 1 --severity CRITICAL %IMAGE_NAME%:latest"
                }
            }
        }

        stage('AI Analysis') {
            steps {
                // Ensure you added 'groq-api-key' in Jenkins Credentials!
                withCredentials([string(credentialsId: 'groq-api-key', variable: 'GROQ_API_KEY')]) {
                    script {
                        echo 'Asking Groq AI to analyze reports...'
                        bat "node ai-analyst.js"
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                // Archive reports and the AI text file
                archiveArtifacts artifacts: 'trivy-report.html, trivy-report.json, ai-advice.txt', fingerprint: true, allowEmptyArchive: true

                def toEmail = "sahilrane249@gmail.com" 
                
                // --- READ AI ADVICE ---
                def aiMessage = "No AI analysis generated (No vulnerabilities found or script failed)."
                if (fileExists('ai-advice.txt')) {
                    aiMessage = readFile('ai-advice.txt')
                }
                
                try {
                    mail to: toEmail,
                         subject: "Jenkins Build ${currentBuild.currentResult}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                         body: """
                            Build Status: ${currentBuild.currentResult}
                            Job: ${env.JOB_NAME}
                            Build Number: ${env.BUILD_NUMBER}
                            Docker Image: ${env.IMAGE_NAME}:${env.IMAGE_TAG}
                            
                            ------------------------------------------
                            🤖 AI SECURITY ADVICE (GROQ)
                            ------------------------------------------
                            ${aiMessage}
                            
                            ------------------------------------------
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