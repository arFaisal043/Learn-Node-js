/*
_______________________________________________________________________________________________

⚪ 1. Create a Server:
- A server is a computer or system that provides resources, data, services, or programs to other computers, known as clients, over a network.

➡ Structure:

const http = require("http");

const server = http.createServer( (req , res) => {
    .........
} )
server.listen(7070 , () => {
    console.log("server running ...");
})


➡ Code Implementation:

const http = require("http");

const Server = http.createServer((req, res) => {
  // Browser understand this is a html file and content
  res.writeHead(200, {
    "content-type": "text/html",
  });
  res.write("<h1>Hello Browser, I am from a Node js server!</h1>");
  res.end();
});

Server.listen(5173, () => {
  console.log("Server is running on 5173 port");
});


_______________________________________________________________________________________________

⚪ 2. Request Response Model:

- The Request-Response Model (also called Client-Server Model) is the fundamental communication pattern in web development where:
1. A client sends a request to a server
2. The server processes the request and sends back a response
3. The client then handles the response


➡ Code Implementation:

const http = require("http");

const server = http.createServer((req, res) => {

    if (req.url == "/") {
      res.writeHead(200, {"content-type": "text/html"});
      res.write("<h1>This is Home page</h1>");
      res.end();
    } 
    else if (req.url == "/about") {
      res.writeHead(200, {"content-type": "text/html"});
      res.write("<h1>This is About page</h1>");
      res.end();
    } 
    else if (req.url == "/login") {
      res.writeHead(200, {"content-type": "text/html"});
      res.write("<h1>This is Login page</h1>");
      res.end();
    }
});

server.listen(5173, () => {
    console.log("Server is running on 5173 port");
})


_______________________________________________________________________________________________


⚪ 3. URL Modules in Node js:
- The url modules splits up a web address into readable parts. --> return object 


const url = require("url");

const myUrl = "https://arfaisal.com/blog.html?year=2020&month=january";
const myUrlObj = url.parse(myUrl, true);
console.log(myUrlObj);

output: 
       Url {
           protocol: 'https:',
           slashes: true,
           auth: null,
           host: 'arfaisal.com',
           port: null,
           hostname: 'arfaisal.com',
           hash: null,
           search: '?year=2020&month=january',
           query: [Object: null prototype] { year: '2020', month: 'january' },
           pathname: '/blog.html',
           path: '/blog.html?year=2020&month=january',
           href: 'https://arfaisal.com/blog.html?year=2020&month=january'
       }

console.log(myUrlObj.query); // [Object: null prototype] { year: '2020', month: 'january' }
console.log(myUrlObj.hostname); // arfaisal.com



_______________________________________________________________________________________________

⚪ 4. FS (file system) module:
- The fs module (short for File System) is a built-in core module in Node.js that provides an API for interacting with the computer's 
file system, allowing developers to perform file I/O operations such as reading, writing, deleting, and managing files and directories. 


- FS Module: 1.Synchronous and 2.Asynchronous
_________________________________________________________________________________

- Synchronous File Operations:

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

- Create file(folder) directory:


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




______________________________________________________________________________________________________________

⚪ 5. Event Driven Architecture:

// Import Event Emitter
const EventEmitter = require("events");

// 1. ORDER SERVICE (Producer)
class OrderService extends EventEmitter {
  createOrder(item) {
    console.log(`✅ Order created for: ${item}`);
    this.emit("orderCreated", item); // Emit event
  }
}

// 2. SERVICES (Consumers)
class EmailService {
  static sendEmail(item) {
    console.log(`📧 Email sent for: ${item}`);
  }
}

class InventoryService {
  static updateStock(item) {
    console.log(`📦 Stock updated for: ${item}`);
  }
}

// 3. SETUP EVENT LISTENERS
const orderService = new OrderService();

orderService.on("orderCreated", (item) => {
  EmailService.sendEmail(item);
});

orderService.on("orderCreated", (item) => {
  InventoryService.updateStock(item);
});

// 4. TRIGGER EVENT
orderService.createOrder("iPhone 15");



*/
