
function createGitHubDeploymentContent(appName,env) {
  let envUpper = env.toUpperCase();
  let data = `name: Build ${appName}-${env}

on:
  workflow_dispatch:

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Set up JDK 11
      uses: actions/setup-java@v1
      with:
        java-version: 11
    - name: Add default settings.xml with github server in it.
      uses: s4u/maven-settings-action@v2.3.0
    - name: Cache local Maven repository
      uses: actions/cache@v2
      with:
        path: ~/.m2/repository
        key: \${{ runner.os }}-maven-\${{ hashFiles('**/pom.xml') }}
        restore-keys: |
          \${{ runner.os }}-maven-
  
    - name: Install Maven Dependency ojdbc8
      run: mvn install:install-file -Dfile=libs/ojdbc8.jar -DgroupId=com.oracle -DartifactId=ojdbc8 -Dversion=18.3.0 -Dpackaging=jar 
    - name: Install Maven Dependency ojdbc ucp
      run: mvn install:install-file -Dfile=libs/ucp.jar -DgroupId=com.oracle -DartifactId=ucp -Dversion=18.3.0 -Dpackaging=jar 
    - name: Install Maven Dependency ojdbc osdt_cert
      run: mvn install:install-file -Dfile=libs/osdt_cert.jar -DgroupId=com.oracle -DartifactId=osdt_cert -Dversion=18.3.0 -Dpackaging=jar 
    - name: Install Maven Dependency ojdbc osdt_core
      run: mvn install:install-file -Dfile=libs/osdt_core.jar -DgroupId=com.oracle -DartifactId=osdt_core -Dversion=18.3.0 -Dpackaging=jar 
    - name: Install Maven Dependency ojdbc orcalepki
      run: mvn install:install-file -Dfile=libs/oraclepki.jar -DgroupId=com.oracle -DartifactId=oraclepki -Dversion=18.3.0 -Dpackaging=jar 
    - name: Build with Maven
      run: mvn package -P ${env} -Dmaven.javadoc.skip=true -Dmaven.site.skip=true -Dmaven.source.skip=true -Djacoco.skip=true -Dcheckstyle.skip=true -Dfindbugs.skip=true -Dpmd.skip=true -Dfabric8.skip=true -e -B    

    - name: Docker Login
      env:
        DOCKER_USER: \${{ secrets.DOCKER_USER }}
        DOCKER_PASSWORD: \${{ secrets.DOCKER_PASSWORD }}
      run: docker login DockerContainerRegistry -u $DOCKER_USER -p $DOCKER_PASSWORD

    - name: Docker Build
      run: docker build --build-arg env_name=${env} . -t DockerContainerRegistry/${env}/${appName}:latest -t  DockerContainerRegistry/${env}/${appName}:\${{ github.sha }}

    - name: Docker Push
      run: docker push --all-tags DockerContainerRegistry/${env}/${appName}
      
    - name: Deploy to K8S
      uses: kubectl@v1.17.9
      env:
        KUBE_CONFIG: \${{ secrets.KUBE_CONFIG_${envUpper} }}
        ACTIONS_ALLOW_UNSECURE_COMMANDS: true
      with:
        args: set image --record deployment/${appName}-${env}-deployment ${appName}-${env}-container=DockerContainerRegistry/${env}/${appName}:\${{ github.sha }} -n ${env}`
          return data;
}

exports.createGitHubDeploymentContent = createGitHubDeploymentContent;