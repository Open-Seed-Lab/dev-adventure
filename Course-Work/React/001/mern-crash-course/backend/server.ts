import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import Product, { IProduct } from "./models/product.model";
import mongoose from "mongoose";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Enable JSON request body parsing

// Define response types for better clarity
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

app.get("/", (req: Request, res: Response<ApiResponse<string>>) => {
  res.send({ success: true, data: "Server is Ready" }); // Basic server status route
});

app.get(
  "/api/products",
  async (_req: Request, res: Response<ApiResponse<IProduct[]>>) => {
    try {
      const products: IProduct[] = await Product.find({}); // Fetch all products
      res.status(200).json({ success: true, data: products }); // Respond with products
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          "[mern-crash-course] Error fetching products:",
          error.message
        );
        res
          .status(500)
          .json({ success: false, message: "Error Getting Products" });
      } else {
        console.error("[mern-crash-course] An unknown error occurred:", error);
        res
          .status(500)
          .json({ success: false, message: "An unexpected error occurred" });
      }
    }
  }
);

app.put(
  "/api/product/:id",
  async (
    req: Request<{ id: string }, {}, IProduct>,
    res: Response<ApiResponse<IProduct | null>>
  ) => {
    const { id } = req.params;
    try {
      const product: IProduct = req.body;
      if (!product) {
        res.status(400).json({ success: false, message: "Provide body" });
      } else if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: "Product Not Found" });
      } else {
        const updatedProduct: IProduct | null = await Product.findByIdAndUpdate(
          id,
          product,
          { new: true }
        ); // Update product by ID
        if (!updatedProduct) {
          res.status(404).json({ success: false, message: "Product Not Found" });
        } else {
          res.status(200).json({ success: true, data: updatedProduct }); // Respond with updated product
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          "[mern-crash-course] Error updating product:",
          error.message
        );
        res.status(500).json({ success: false, message: "Server Error" });
      } else {
        console.error("[mern-crash-course] An unknown error occurred:", error);
        res
          .status(500)
          .json({ success: false, message: "An unexpected error occurred" });
      }
    }
  }
);

app.delete(
  "/api/product/:id",
  async (
    req: Request<{ id: string }>,
    res: Response<ApiResponse<IProduct | null>>
  ) => {
    const { id } = req.params;
    try {
      const deletedProduct = await Product.findByIdAndDelete(id); // Delete product by ID
      if (!deletedProduct) {
        res
          .status(404)
          .json({ success: false, message: "Product Not Found" });
      } else {
        res
          .status(200)
          .json({ success: true, message: "Product deleted" }); // Respond with success message
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          "[mern-crash-course] Error deleting product:",
          error.message
        );
        res
          .status(404)
          .json({ success: false, message: "Product Not Found" });
      } else {
        console.error("[mern-crash-course] An unknown error occurred:", error);
        res
          .status(500)
          .json({ success: false, message: "An unexpected error occurred" });
      }
    }
  }
);

app.post(
  "/api/product",
  async (
    req: Request<{}, {}, IProduct>,
    res: Response<ApiResponse<IProduct>>
  ) => {
    const product: IProduct = req.body;
    if (!product) {
      res.status(400).json({ success: false, message: "Provide body" }); return;
    }
    const { name, image, price } = product;
    if (!name || !price || !image) {
      res
        .status(400)
        .json({ success: false, message: "Provide all fields" }); return;
    }
    const newProduct = new Product(product); // Create new product instance
    try {
      const savedProduct = await newProduct.save(); // Save the new product
      res.status(201).json({ success: true, data: savedProduct }); // Respond with created product
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          "[mern-crash-course] Error creating product:",
          error.message
        );
        res
          .status(400)
          .json({ success: false, message: "Internal Server Error" });
      } else {
        console.error("[mern-crash-course] An unknown error occurred:", error);
        res
          .status(500)
          .json({ success: false, message: "An unexpected error occurred" });
      }
    }
  }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB(); // Connect to database
  console.log(`[mern-crash-course] Server started at http://localhost:${PORT}`);
});
