import express from 'express';
import "dotenv/config"
import { connectToDatabase } from './src/db/index.js';
import userRoutes from "./src/routes/user.route.js"
import productRoutes from "./src/routes/product.route.js"
import orderRoutes from "./src/routes/order.route.js"
import cookieParser from 'cookie-parser';
import cors from "cors"
import path from "path";


const app = express();

const _dirname=path.resolve()

// Middlewares 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// CORS 
const corsOptions = {
    origin: 'https://prod-shop-v2.onrender.com/',
    credentials: true
}
app.use(cors(corsOptions))

// Database
connectToDatabase()

// Routes
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/orders", orderRoutes)

app.use(express.static(path.join(_dirname,"/frontend/dist")))

app.get("*",(_,res)=>{
    res.sendFile(path.join(_dirname, "frontend","dist","index.html"))

})




export default app