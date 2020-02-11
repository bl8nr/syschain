const childProcess = require('child_process');


try {
    // remove the most current build
    fs.removeSync('./dist/');

    // build/transpile the most recent code
    childProcess.exec('tsc --build tsconfig.prod.json');

} catch (err) {
    console.log(err);
}
