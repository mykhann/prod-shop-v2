import { Router } from "express";
import {
    cancelOrder,
    deleteOrder,
    deleteOrderUser,
    getAllOrders,
    getOrderById,
    placeOrder,
    updateOrderStatus,
    userOrderHistory
} from "../controllers/order.controller.js";
import { isAuthenticate } from "../middlewares/isAuthenticate.js";
const router = new Router();

// User 
router.route("/order").post(isAuthenticate, placeOrder)
router.route("/get/:id").get(isAuthenticate, getOrderById)
router.route("/cancel/:id").patch(isAuthenticate, cancelOrder)
router.route("/order-history").get(isAuthenticate, userOrderHistory)

// Admin 
router.route("/get").get(isAuthenticate, getAllOrders)
router.route("/delete/:id").delete(isAuthenticate, deleteOrder)
router.route("/delete-user-order/:id").delete(isAuthenticate, deleteOrderUser)
router.route("/update-status/:id").patch(isAuthenticate, updateOrderStatus)

export default router;