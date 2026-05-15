import { createServer, IncomingMessage, Server, ServerResponse } from "node:http";
import { routeHandler } from "./routes/routes";

const PORT = 5173;

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    routeHandler(req, res);
})

server.listen(PORT, () => console.log(`Server is created on http://localhost:${PORT}`));