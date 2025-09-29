pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                echo 'Building the project...'
                // Add build steps here, e.g., sh 'make build'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add test steps here, e.g., sh 'make test'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Tests passed!'
        }
        failure {
            echo 'Tests failed.'
        }
    }
}