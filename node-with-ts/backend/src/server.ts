import { createServer, IncomingMessage, Server, ServerResponse } from "node:http";
import { routeHandler } from "./routes/routes";
import config from "./config/env.config";

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    routeHandler(req, res);
})

server.listen(config.port, () => console.log(`Server is created on http://localhost:${config.port}`));