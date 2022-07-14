const { createDir, createfile,copyRawFiles } = require("./fileHelperFunctions");
const { createDockerfileContentSpringBoot, createDockerfileContentWildFly } = require('./createDockerfileContent');
const { createDeploymentContent } = require('./createDeploymentContent');
const { createServiceContent } = require('./createServiceContent');
const { createGitHubSetupContent } = require('./createGitHubSetupContent ');
const { createGitHubDeploymentContent } = require('./createGitHubDeploymentContent');
const { createSpinner } =  require('nanospinner');
const path =  require('path');
const { createPomFileContent } = require("./createPomFileContent");
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function createKubernetesFiles(rootDir,appName)
{
  let dir = path.join(rootDir,".k8s");
  await createDir(dir)
  await createKubernetesSingleEnv(dir,appName,'test');
  await createKubernetesSingleEnv(dir,appName,'production');
}
async function createKubernetesSingleEnv(rootDir,appName,env) {
  let dir = path.join(rootDir,env);
  await createDir(dir)

  let deployment = createDeploymentContent(appName,env);
  let service = createServiceContent(appName,env);
  path.join(dir,"/deployment.yaml")
  createfile(path.join(dir,"/deployment.yaml"),deployment)
  createfile(path.join(dir,"/service.yaml"),service)
}

async function createSingleGithubAction(rootDir,appName,env) {
  let dir = rootDir;
  await createDir(dir)
  let setup = createGitHubSetupContent(appName,env);
  let deployment = createGitHubDeploymentContent(appName,env);

  createfile(path.join(dir,"create-k8s-"+env+".yaml"),setup)
  createfile(path.join(dir,"build-"+env+".yaml"),deployment)
}
async function creatGithubActions(rootDir,appName) {
  let dir = path.join(rootDir,".github");
  await createDir(dir)
  let dir2 = path.join(dir, "workflows");
  await createDir(dir2)
  createSingleGithubAction(dir2,appName,'test')
  createSingleGithubAction(dir2,appName,'production')

}


async function creatDockerfile(appType,rootDir,appName) {
  let data;
  if (appType === 'Spring Boot')
    data = createDockerfileContentSpringBoot();
  if (appType === 'Wildfly')
    data = createDockerfileContentWildFly();
  createfile(path.join(rootDir, "Dockerfile"), data)
}

async function creatPomFile(rootDir,appName) {
  let data = createPomFileContent(appName);
  createfile(path.join(rootDir, "pom.xml"), data)
}

async function createApp(data,outDirName,appName)
{
	console.log(data);
	const spinner = createSpinner('Creating app setup...').start();
  await createKubernetesFiles(outDirName,appName);
  await creatGithubActions(outDirName,appName);
  await creatDockerfile(data.appType,outDirName,appName);
  await creatPomFile(outDirName,appName);
  copyRawFiles('./raw',outDirName);
	await sleep(2000);
}

exports.createApp = createApp;