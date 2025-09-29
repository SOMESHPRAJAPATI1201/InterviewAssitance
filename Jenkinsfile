pipeline {
    agent {
        docker { image 'python:3.11' }
    }

    environment {
        APP_NAME = 'dem-app'
    }

    stages {
        stage('Checkout') {
            steps {
                // Replace with your repository URL
                git branch: 'main', url: 'https://github.com/SOMESHPRAJAPATI1201/InterviewAssitance'
            }
        }
        
        stage('DeepSource Scan') {
            agent {
                docker { image 'python:3.11' }
            }
            steps {
                withCredentials([string(credentialsId: 'DEEP_SOURCE_TOKEN', variable: 'DS_TOKEN')]) {
                    sh '''
                        pip install --upgrade deepsource-cli
                        deepsource analyze --analyzer python --access-token $DS_TOKEN
                    '''
                }
            }
        }

        stage('Test') {
            steps {
                echo "Running tests for ${APP_NAME}..."
                // Replace with your test command
                // Java/Gradle
                // sh 'npm test'          // Node.js
                // sh 'pytest'            // Python
            }
        }
    }

    post {
        success {
            echo "✅ DEM test pipeline completed successfully!"
        }
        failure {
            echo "❌ DEM test pipeline failed!"
        }
    }
}
