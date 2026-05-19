import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/product.service";
import { read } from "node:fs";
import type { InProduct } from "../Type/product.type";
import { parseBody } from "../utility/parseBody";
import { parse } from "node:path";

export const productController = async (req: IncomingMessage, res: ServerResponse) => {
  //console.log("Request", req);
  const url = req.url;
  const method = req.method;

  // localhost:5173/products/1
  const urlParts = url?.split("/"); // => [ '', 'products', '1' ]
  const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null; // 1

  const products = readProduct();

  // __________ All products _____________________
  if (url === "/products" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "This products route",
        data: { products },
      }),
    );
  } // _________ single products by id ________________________
  else if (method === "GET" && id != null) {
    const products = readProduct();
    const product = products.find((val: InProduct) => val.id === id);
    // console.log(product); ==> { id: 1, name: 'Product 1' }

    if (!product) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "This product route",
          data: product,
        }),
      );
    }
  } // ____________ create a product  _____________________
  else if (method === "POST" && url === "/products") {
    const products = readProduct();
    const body = await parseBody(req);

    const newProduct = { id: Date.now(), ...body };
    products.push(newProduct);
    insertProduct(products); // save products on db.json file

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "This is post request",
        data: products,
      }),
    );
  } // ___________ update product  _____________________
  else if (method === "PUT" && id != null) {
    const body = await parseBody(req);
    const products = readProduct();

    const idx = products.findIndex((val: InProduct) => val.id === id);
    // console.log(idx); // products/1 => idx = 0
    // console.log(products[idx]);
    if (idx < 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "products not found",
          data: null,
        }),
      );
    }
    products[idx] = { id: products[idx].id, ...body };
    insertProduct(products);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "product updated successfully",
        data: products[idx],
      }),
    );
  } // ___________ delete product  _____________________
  else if (method === "DELETE" && id != null) {
    const product = readProduct();
    const idx = products.findIndex((val: InProduct) => val.id === id);

    if (idx < 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "products not found",
          data: null,
        }),
      );
    }

    // _____ remove element in an array:
    // const arr = [1, 2, 3, 4];
    // arr.splice(2, 1); // [1, 2, 4]

    products.splice(idx, 1);
    // console.log(products);
    insertProduct(products);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "product deleted successfully",
        data: products[idx],
      }),
    );
  }
}