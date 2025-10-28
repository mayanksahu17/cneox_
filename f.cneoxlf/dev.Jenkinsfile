pipeline {
    agent any

    environment {
        CONTAINER_NAME = "crown_frontend_dev_${BUILD_NUMBER}"
        DOCKER_IMAGE_TAG = "crown/crown_frontend:dev-${BUILD_NUMBER}"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build . -t ${DOCKER_IMAGE_TAG}'
                }
            }
        }

        stage('Remove Old Container') {
            steps {
                script {
                    // Use script block for complex shell scripting
                    sh '''
                    last_container_id=$(docker ps -qf "name=crown_frontend_dev*")
                    if [ -n "$last_container_id" ]; then
                        image_name=$(docker inspect --format '{{.Config.Image}}' $last_container_id)
                        docker kill $last_container_id
                        echo "Killed container with ID: $last_container_id"
                        docker rm $last_container_id
                        if [ -n "$image_name" ]; then
                            docker rmi -f $image_name
                            echo "Image deleted, associated with container ID $last_container_id: $image_name"
                        fi
                    else
                        echo "No container with name crown_frontend_dev* found to kill."
                    fi
                    '''
                }
            }
        }

        stage('Run New Container') {
            steps {
                script {
                    sh 'docker run -d --name ${CONTAINER_NAME} -p 9001:80 ${DOCKER_IMAGE_TAG}'
                }
            }
        }
    }
}
