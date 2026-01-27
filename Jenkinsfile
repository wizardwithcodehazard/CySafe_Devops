pipeline {
    agent any

    tools {
        // This must match the name you gave in Global Tool Configuration
        nodejs 'Node 20' 
    }

    environment {
        // This helps avoid path issues with npm
        PATH = "${tool 'Node 20'}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Jenkins automatically checks out code from Git here
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing NPM dependencies...'
                // 'npm ci' is faster/cleaner for CI than 'npm install'
                sh 'npm ci' 
            }
        }

        stage('Lint Code') {
            steps {
                echo 'Checking code quality...'
                // Fails the build if your code has syntax errors
                sh 'npm run lint'
            }
        }

        stage('Unit Tests') {
            steps {
                echo 'Running Vitest...'
                // Fails if logic is broken
                sh 'npm run test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo 'Scanning with SonarQube...'
                withSonarQubeEnv('SonarServer') { // Must match System config name
                    // Ensure the tool name matches Global Tool Config
                    def scannerHome = tool 'SonarScanner'
                    sh "${scannerHome}/bin/sonar-scanner"
                }
            }
        }

        stage('Build Application') {
            steps {
                echo 'Building production artifact...'
                sh 'npm run build'
            }
        }
    }

    post {
        success {
            echo 'Pipeline successfully completed!'
            // Archive the 'dist' folder so you can download it from Jenkins
            archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
        }
        failure {
            echo 'Pipeline failed. Please check logs.'
        }
    }
}