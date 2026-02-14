import Product from "../models/product.js";
import { isItAdmin } from "./userController.js";

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
            message: "Product Added Successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: "Product Registration Failed"
        })

    }
}


export async function getProduct(req, res) {
    try {

        if (isItAdmin(req)) {
            const products = await Product.find();
            res.json(products);
            return;
        } else {
            const products = await Product.find({ availability: true });
            res.json(products);
            return;
        }

    } catch (error) {
        res.status(500).json({
            message: "Failed to get products"
        })
    }
}


export async function updateProduct(req,res){
    try{
        if(isItAdmin){
            const key = req.params.key;

            const data = req.body;

            await Product.updateOne({key:key},data)

        
            res.json({
                message: "Product Updated Successfully!"
            })
        }else{
            res.status(403).json({
                message:"You are not authorized perform this action"
            })
        }

    }catch(error){
        res.status(500).json({
            message: "Failed to Update Product"
        })
    }
}

export async function deleteProduct(req,res){
    try{
        if(isItAdmin){
            const key = req.params.key;
            await Product.deleteOne({key:key})
            res.json({
                message:"Poduct Deleted Succssfully!"
            })
        }else{
            res.status(403).json({
                message: "You are not authorized perform this action"
            })
        }

    }catch(e){
        res.status(500).json({
            message:"Failed to Delete Product!"
        })
    }
}

