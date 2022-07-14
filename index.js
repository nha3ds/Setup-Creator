
const chalk =  require('chalk');
const inquirer =  require('inquirer');
const gradient =  require('gradient-string');
const figlet =  require('figlet');
const { createApp } = require('./createApp');
const { createCheckDir } = require('./fileHelperFunctions');
const outDirName = 'out'
let appName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  console.clear();
  let duck = gradient('orange', 'yellow').multiline([
    "  __",
    "<(o )___",
    " ( ._> /",
    "  `---'",
].join('\n'));
console.log(duck);
  figlet(`Hello`, (err, data) => {
	console.log(gradient('blue', 'grey').multiline(data)+ '\n');
	figlet(`Setup Creator`, (err, data) => {
    console.log(gradient('red', 'grey').multiline(data)+ '\n');
    });
	console.log(`Welcome`);
	console.log(`This application will create template for Kubernetes, GitHub actions and basic application setup in the out dir.`);

  });
  
  await sleep(100);
}

function endApp() {
  console.clear();
  figlet(`Application  setup  is done`
  , (err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n');
    console.log(
      chalk.green(
        `Thank you for using the app\nsetup is done for:${appName}`
      )
    );
    console.log(
      chalk.green(
        `The files are created in:${outDirName}`
      )
    );
  });
}

async function askAppName() {
  const answers = await inquirer.prompt({
    name: 'app_name',
    type: 'input',
    message: 'What is your app name?',
    default() {
      return 'default-app-name';
    },
  });

  appName = answers.app_name;
}

async function askPackagingType() {
  const answers = await inquirer.prompt({
    name: 'question_2',
    type: 'list',
    message: 'Which package manger are you using\n',
    choices: [
      'Maven',
      'Nothing',
    ],
  });

  return answers.question_2;
}

async function askAppType() {
  const answers = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: 'What type of app you using\n',
    choices: [
      'Spring Boot',
      'Wildfly',
    ],
  });

  return answers.question_1;
}

(async () => {
  try {
    console.clear();
    await welcome();
    await createCheckDir(outDirName);
    await askAppName();
    let appType = await askAppType();
    let pacakge = await askPackagingType();
    await createApp({appType,pacakge},outDirName,appName);
    endApp()
    process.exit(0);
  } catch (e) {
      console.log(e);
  }
})();

