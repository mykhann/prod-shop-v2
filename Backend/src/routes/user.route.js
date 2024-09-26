import { Router } from "express";
import { isAuthenticate } from "../middlewares/isAuthenticate.js";
import {
    Login,
    Logout,
    registerUser,
    updateProfile
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = new Router();

router.route("/register").post(upload.single("file"), registerUser)
router.route("/login").post(Login)
router.route("/logout").post(isAuthenticate,Logout)
router.route("/update").patch(upload.single("file"),isAuthenticate,updateProfile)



export default router