const fs = require('node:fs');

// Read file:
// const content = fs.readFileSync('../../Topics.md', 'utf-8')
// console.log(content);



// Write file:

// try {
//     if(!fs.existsSync("copy2.txt")) {
//         const createFile = fs.writeFileSync('copy2.txt', 'Hello World!', 'utf-8');
//         console.log("File created successfully");
//     }
//     else {
//         console.log("File is exist");
//     }
// } catch(err) {
//     console.log(`Error is: ${err}`);
// }




// create directory:

const dir = fs.mkdirSync('hello-world/xyz/abc', {recursive: true});


console.log("Start...");

const createFile = async () => {
    const data = await fs.writeFile('hello.txt', 'Hello World!', 'utf-8');
    console.log("File content: ", data);
}
createFile();

console.log("End...");