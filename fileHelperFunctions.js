const inquirer =  require('inquirer');
const fs =  require('fs');
const path =  require('path');
const mainDir = process.cwd();

function copyFileSync( source, target ) {

    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target ) {
    var files = [];

    // Check if folder needs to be created or integrated
    var targetFolder = path.join( target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    // Copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}

function copyRawFiles( source, targetFolder ) {
  var files = [];

  // Check if folder needs to be created or integrated
  if ( !fs.existsSync( targetFolder ) ) {
      fs.mkdirSync( targetFolder );
  }

  // Copy
  if ( fs.lstatSync( source ).isDirectory() ) {
      files = fs.readdirSync( source );
      files.forEach( function ( file ) {
          var curSource = path.join( source, file );
          if ( fs.lstatSync( curSource ).isDirectory() ) {
              copyFolderRecursiveSync( curSource, targetFolder );
          } else {
              copyFileSync( curSource, targetFolder );
          }
      } );
  }
}
async function askFileReplace(dir) {
    const answers = await inquirer.prompt({
      name: 'question_0',
      type: 'list',
      message: 'There are already files in "'+dir+'". Do you want to replace them?\n',
      choices: [
        'yes',
        'no',
      ],
    });
  
    return answers.question_0;
  }
  
  async function createCheckDir(dir) {
    
    try {
      fs.mkdirSync(path.join(mainDir, dir))
    } catch (error) {
        if (error.code ==='EEXIST')
        {
          let files = fs.readdirSync(dir)
                  if (files.length > 0) {
            let res = await askFileReplace(dir);
            if (res ==='yes')
            {
  
            }
            else
            {
              console.log(' Please run the program in a different dir or remove the files you need to.');
              process.exit(0);
            }
          }
          else
          {
  
          }
        }
        else
        {
          console.log(error);
          process.exit(0);
        }
    }
  }
  
  async function createDir(dir) {
    
    try {
      fs.mkdirSync(path.join(mainDir, dir))
    } catch (error) {
        if (error.code ==='EEXIST')
        {
  
        }
        else
        {
          console.log(error);
          process.exit(0);
        }
    }
  }
  
  function createfile (name,data)
  {
    try
    {
      fs.writeFileSync(name,data);
    }
    catch(error)
    {
      console.log(error);
      process.exit(0);
    }
  }

  
  exports.createfile = createfile;
  exports.createDir = createDir;
  exports.createCheckDir = createCheckDir;
  exports.copyRawFiles = copyRawFiles;