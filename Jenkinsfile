pipeline {
    agent any

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
}