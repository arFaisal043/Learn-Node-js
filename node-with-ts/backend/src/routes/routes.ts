import type { IncomingMessage, ServerResponse } from "node:http";
import { productController } from "../controller/product.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {

    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "This root route" }));
    } 
    else if (req.url?.startsWith("/products")) {
      productController(req, res);
    } 
    else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "routes not found" }));
    }
}