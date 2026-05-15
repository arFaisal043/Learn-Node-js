import path from "node:path";
import fs from "fs";

const filePath = path.join(process.cwd(), './src/database/db.json')

export const readProduct = () => {
    // console.log(process.cwd()); // C:\Users\USER\Desktop\Learn Node JS\node-with-ts
    // console.log(filePath); // C:\Users\USER\Desktop\Learn Node JS\node-with-ts\src\database\db.json
    
    const products = fs.readFileSync(filePath, "utf-8");
    // console.log(products);
    return JSON.parse(products);
}