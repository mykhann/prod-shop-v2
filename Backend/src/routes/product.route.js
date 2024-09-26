import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js"
import {isAuthenticate} from "../middlewares/isAuthenticate.js"
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct
} from "../controllers/product.controller.js";
const router = Router();

router.route("/create").post(
    upload.single("file"),
    createProduct
)
router.route("/fetchProduct/:id").get(getProductById)
router.route("/update-product/:id").patch(upload.single("file"), updateProduct)
router.route("/delete-product/:id").delete(deleteProduct)
router.route("/get").get(isAuthenticate,getAllProducts)


export default router