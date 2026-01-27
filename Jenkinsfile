pipeline {
    agent any

    tools {
        // ERROR 1 FIX: Ensure the name in Manage Jenkins -> Tools -> NodeJS is EXACTLY "Node 20"
        nodejs 'Node 20' 
    }

    environment {
        // This puts the Node bin in your path so 'npm' commands work anywhere
        PATH = "${tool 'Node 20'}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci' 
            }
        }

        stage('Lint Code') {
            steps {
                // Returns 0 if lint passes, non-zero if it fails
                sh 'npm run lint'
            }
        }

        stage('Unit Tests') {
            steps {
                sh 'npm run test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // ERROR 2 FIX: Wrapped in 'script' block to allow variable definition
                script {
                    // This fetches the path where SonarScanner is installed
                    def scannerHome = tool 'SonarScanner' 
                    
                    withSonarQubeEnv('SonarServer') {
                        // Uses the variable we just defined
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }
    }
}