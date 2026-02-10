import Product from "../models/product.js";

export function AddProduct(req,res){

    console.log(req.user);

    const data = req.body;

    const newProduct = new Product (data);

    newProduct.save().then(() =>{
        res.json({ message: "New Product Added successfully"})
    })
    .catch((error) =>{
        res.status(500).json({ error: "Failed to add product" })
    })
}
