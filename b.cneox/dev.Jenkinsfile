pipeline {
    agent any

    environment {
        CONTAINER_NAME = "crown_backend_dev"
        DOCKER_IMAGE_TAG = "crown/crown_backend:dev-${BUILD_NUMBER}"
    }

    stages {
        stage('Setup Environment Variables') {
            steps {
                script {
                    sh 'chmod -R 777 .'

                    // Using the 'withCredentials' step to inject the secret file
                    withCredentials([file(credentialsId: 'crown-backend-dev', variable: 'ENV_FILE')]) {
                        // Copy the .env file to the current working directory
                        sh 'cp $ENV_FILE .env'
                        echo "Environment variables set up successfully."
                        sh 'cat .env'
                    }
                }
            }
        }
      
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build . -t ${DOCKER_IMAGE_TAG}'
                }
            }
        }

        stage('Remove Previous Container') {
            steps {
                script {
                    sh """
                        last_container_id=\$(docker ps -qf "name=${CONTAINER_NAME}*")
                        if [ -n "\$last_container_id" ]; then
                            image_name=\$(docker inspect --format '{{.Config.Image}}' \$last_container_id)
                            docker kill \$last_container_id
                            echo "Killed container with ID: \$last_container_id"
                            docker rm \$last_container_id
                            if [ -n "\$image_name" ]; then
                                docker rmi -f \$image_name
                                echo "Image deleted, associated with container ID \$last_container_id: \$image_name"
                            fi
                        else
                            echo "No container with name ${CONTAINER_NAME}* found to kill."
                        fi
                    """
                }
            }
        }

        stage('Run New Container') {
            steps {
                script {
                    sh """
                        CONTAINER_NAME="${CONTAINER_NAME}_${BUILD_NUMBER}"
                        docker run -d --name \$CONTAINER_NAME --network host \\
                        -v /home/public/documents:/home/public/documents \\
                        -v /home/public/tickets:/home/public/tickets \\
                        -v /home/public/profilepictures:/home/public/profilepictures \\
                        ${DOCKER_IMAGE_TAG}
                    """
                }
            }
        }
    }
}
