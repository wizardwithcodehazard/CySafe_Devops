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
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // CHANGED: 'sh' -> 'bat'
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
                        // CHANGED: Pointing to the .bat file and using backslashes for Windows
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
    }

    post {
        always {
            script {
                // Change this email address to your own
                def toEmail = "sahil@example.com" 
                
                mail to: toEmail,
                     subject: "Jenkins Build ${currentBuild.currentResult}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                     body: """
                        Build Status: ${currentBuild.currentResult}
                        Job: ${env.JOB_NAME}
                        Build Number: ${env.BUILD_NUMBER}
                        Check console output at: ${env.BUILD_URL}
                     """
            }
        }
        failure {
            // Optional: Send a specific alert only if it fails
            echo 'Build failed. Email sent.'
        }
    }
}
}