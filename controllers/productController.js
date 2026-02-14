import Product from "../models/product.js";

export async function AddProduct(req, res) {

    console.log(req.user);

    if (req.user == null) {
        res.status(401).json({
            message: "Please Login and Try Again"
        })
        return

    }

    if (req.user.role != "admin") {
        res.status(401).json({
            message: "You are not authorized to perform this action"
        })
        return
    }


    if (req.user == null) {
        res.status(401).json({
            message: "Please Login and Try Again"
        })
    }

    const data = req.body;

    const newProduct = new Product(data);

    try {

        await newProduct.save();
        res.json({
            message: "Product Registerd Successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: "Product Registration Failed"
        })

    }
}
