// Path Module: for find files location

const path = require("path");
const filesDir = path.join(__dirname, "path-module");  // add path-module on directory file

// find files directory
console.log(filesDir); // C:\Users\USER\Desktop\Learn Node JS\path-module

// find extension name of any file
console.log(path.extname("demo.txt")); // .txt

// find base name of a file
console.log(path.basename(filesDir)); // path-module

// find a path detailed object
console.log(path.parse(filesDir)); //return a object
/*
{
  root: 'C:\\',
  dir: 'C:\\Users\\USER\\Desktop\\Learn Node JS',
  base: 'path-module',
  ext: '',
  name: 'path-module'
}
*/