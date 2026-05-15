import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct } from "../service/product.service";

export const productController = (req: IncomingMessage, res: ServerResponse) => {
    const products = readProduct();

    if(req.url === "/products") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "This product route",
            data: { products },
          }),
        );
    }
}