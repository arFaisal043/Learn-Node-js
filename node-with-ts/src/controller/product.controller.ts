import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct } from "../service/product.service";
import { read } from "node:fs";
import type { InProduct } from "../Type/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (req: IncomingMessage, res: ServerResponse) => {
  //console.log("Request", req);
  const url = req.url;
  const method = req.method;

  // localhost:5173/products/1
  const urlParts = url?.split("/"); // => [ '', 'products', '1' ]
  const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null; // 1

  const products = readProduct();

  // All products
  if (url === "/products" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "This products route",
        data: { products },
      }),
    );
  } // single products by id
  else if (method === "GET" && id != null) {
    const products = readProduct();
    const product = products.find((val: InProduct) => val.id === id);
    // console.log(product); ==> { id: 1, name: 'Product 1' }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "This product route",
        data: product,
      }),
    );
  }
  else if(method === "POST" && url === "/products") {
    const body = await parseBody(req);
    console.log("Body", body);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "This is post request",
        // data: product,
      }),
    );
  }
}