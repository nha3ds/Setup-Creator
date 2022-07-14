
function createDeploymentContent(appName,env) {
    let data = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${appName}-${env}-deployment
  namespace: ${env}
  labels:
    app: ${appName}-${env}-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ${appName}-${env}-deployment
  template:
    metadata:
      labels:
        app: ${appName}-${env}-deployment
    spec:
      containers:
        - name: ${appName}-${env}-container
          image: DockerContainerRegistry/${env}/${appName}:latest
          env:
          - name: TZ
            value: Asia/Riyadh
          ports:
          - containerPort: 8080
      imagePullSecrets:
        - name: docker-registry-cred-inside-kubernetes
`

       return data
   }

exports.createDeploymentContent = createDeploymentContent;