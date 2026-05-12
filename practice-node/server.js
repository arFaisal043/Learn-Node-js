const http = require("http");
const url = require("url");
const PORT = 5173;

const server = http.createServer((req, res) => {
    if(req.url === "/login") {
        res.write("<h1>Hello, This is Login page</h1>")
    }

})

server.listen(PORT, () => console.log("server is running"));