pipeline {

  environment {
    dockerimagename = "maissadaas/jenkins"
    dockerImage = ""
  }

  agent any

  stages {

    stage('Checkout Source') {
      steps {

        git branch: 'jenkins', credentialsId: 'MaissaDaas', url: 'https://github.com/MaissaDaas/BrainTumor.git'
      }
    }

    stage('Build image') {
      steps{
        script {
          dockerImage =  docker.build dockerimagename
        }
      }
    }

    stage('Pushing Image') {
      environment {
               registryCredential = 'dockerhublogin'
           }
      steps{
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
            dockerImage.push("latest")
          }
        }
      }
    }

    stage('Deploying App to Kubernetes') {
      steps {
        script {
          sh '''
            gcloud container clusters get-credentials cluster --zone=us-central1 --project brainproject-421513
            kubectl apply -f deploymentservice.yml
            kubectl set image deployment/myapp myflaskappappcontainer=maissadaas/jenkins:latest
	      '''
        }
      }
    }

  }

}