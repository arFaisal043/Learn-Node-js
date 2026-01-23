/* 
- FS Module: 1.Synchronous and 2.Asynchronous
_________________________________________________________________________________

⚪ Synchronous File Operations:

// FS create/write/content change:

const fs = require("fs");

try {
    if(!fs.existsSync("demo.txt")) {
        fs.writeFileSync("demo.txt", "Hello World!");
        console.log("File written successfully...");
    }
}
catch(err) {
    console.error(`error is: ${err}`);
}



// fs Append to file:

const fs = require("fs");

try {
    fs.appendFileSync("demo.txt", "\n This is Appended text!");
    console.log("Append text successfully...");
}
catch(err) {
    console.error(`error is: ${err}`);
}



// fs Read:

const fs = require("fs");

try {
    const data = fs.readFileSync("demo.txt", "utf-8");
    console.log("Data", data);
    console.log("Read the file successfully...");
} 
catch(err) {
    console.error(`error is: ${err}`);
}



// Copy file:

const fs = require("fs");

try {
    fs.copyFileSync("demo.txt", "demo-copy.txt");
    console.log("Copy the file successfully...");
} 
catch (err) {
    console.error(`error is: ${err}`);
}




// Rename file:

const fs = require("fs");

try {
    fs.renameSync("demo-copy.txt", "demo-rename.txt");
    console.log("Rename the file successfully...");
} 
catch (err) {
    console.error(`error is: ${err}`);
}




// Delete file

const fs = require("fs");

try {
    fs.unlinkSync("demo-rename.txt");
    console.log("Delete the file successfully...");
} 
catch (err) {
    console.error(`error is: ${err}`);
}



_______________________________________________________________________________________

⚪ Create file(folder) directory:


// Create a folder:

const fs = require("fs");

try {
    fs.mkdirSync("New_folder");
    console.log("successfully create file directory");
}
catch(err) {
    console.log(err);
}




// Rename folder:

const fs = require("fs");

try {
    fs.renameSync("New_folder", "New_Rename_folder");
    console.log("successfully rename the folder");
}
catch(err) {
    console.log(err);
}




// Delete folder:

const fs = require("fs");

try {
    fs.rmdirSync("New_Rename_folder");
    console.log("successfully delete the folder");
}
catch(err) {
    console.log(err);
}

*/
