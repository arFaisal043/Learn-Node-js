import { createServer, IncomingMessage, Server, ServerResponse } from "node:http";
const PORT = 5173;

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(
        200, 
        {'Content-Type': 'text/json'}
    )
    res.end(JSON.stringify({ message: "This is json file" }));
})

server.listen(PORT, () => console.log(`Server is created on http://localhost:${PORT}`));