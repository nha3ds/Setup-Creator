
function createGitHubSetupContent(appName,env) {
    let envUpper = env.toUpperCase();
    let data = `name: create-k8s-${env}

on:
  workflow_dispatch:

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Create on K8S
      uses: kubectl@v1.17.9
      env:
        KUBE_CONFIG: \${{ secrets.KUBE_CONFIG_${envUpper} }}
        ACTIONS_ALLOW_UNSECURE_COMMANDS: true
      with:
        args: apply -f .k8s/${env}`
            return data;
  }

exports.createGitHubSetupContent = createGitHubSetupContent;