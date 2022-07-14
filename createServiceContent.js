
function createServiceContent(appName,env) {
    let data = `apiVersion: v1
kind: Service
metadata:
  name: ${appName}-${env}-service
  namespace: ${env}
  labels:
    app: ${appName}-${env}-service
spec:
  ports:
  - port: 8080
    protocol: TCP
    targetPort: 8080
  type: ClusterIP
  selector:
    app: ${appName}-${env}-deployment
`
        return data;
  }

exports.createServiceContent = createServiceContent;