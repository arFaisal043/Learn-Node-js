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

*/


// Request Response Model:

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


