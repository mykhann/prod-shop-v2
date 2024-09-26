import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const placeOrder = asyncHandler(async (req, res) => {
    const { cartItems, address, phoneNo } = req.body;  
    const user = req.user;  
    if (!cartItems || !cartItems.length || !address || !phoneNo) {
        return res.status(400).json({
            success: false,
            message: "Please provide cart items, address, and phone number"
        });
    }

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Please login first"
        });
    }

   
    const orderItems = [];
    for (const item of cartItems) {
        const product = await Product.findById(item.productId);  // 
        if (!product) {
            return res.status(404).json({
                success: false,
                message: `No product found for ID: ${item.productId}`
            });
        }

     
        orderItems.push({
            product: item.productId,
            quantity: item.quantity
        });
    }

    const order = await Order.create({
        user: user._id,
        orderItems: orderItems,  
        address: address,
        phoneNo: phoneNo,
        orderStatus: 'Processing'
    });

    res.status(200).json({
        success: true,
        message: "Order created successfully",
        order
    });
});

// User orders history 

const userOrderHistory = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
        res.status(400).json({
            success: false,
            message: "Please login to see order history"
        });
    };
    const orders = await Order.find({ user: userId }).sort({createdAt:-1})
    .populate('orderItems.product') 
    .populate('cart.product');
    if (!orders) {
        res.status(404).json({ success: false, message: "no orders found" });
    };
    res.status(200).json({ success: true, orders });


});

// User will cancel the order if it is still on processing 
const cancelOrder = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const orderId = req.params.id;
    if (!userId) {
        return res.status(404).json({ success: false, message: "please login first." });
    };
    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(404).json({ success: false, message: "no order found" });
    };

    if (order.user.toString() !== userId.toString()) {
        res.status(404).json({ success: false, message: "you are not authorized to delete this order" });
    }

    if (order.orderStatus == "Shipped" || order.orderStatus=="Delivered") {
        return res.status(404).json({ success: false, message: "Cannot cancel an order that is already shipped or delivered" });

    };

    order.orderStatus = "Cancelled";
    await order.save();
    res.status(200).json({ success: true, message: "Order has been cancelled" });

});




// ADMIN will get all orders for admin dashboard 
const getAllOrders = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
        res.status(400).json({
            success: false,
            message: "Please login first"
        });
    };

    // finding orders and then pouplating user and poduct 
    const orders = await Order.find().sort({createdAt:-1}).populate("user").populate("orderItems.product");
    res.status(200).json({ success: true, orders });
});

// Admin can check the details of the single order 

const getOrderById = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const userId = req.user?._id
    if (!userId) {
       return res.status(404).json({
            success: false,
            message: 'please login first'
        });
    };
    const order = await Order.findById(orderId);
    if (!order) {
       return res.status(404).json({
            success: false,
            message: "order not found"
        });
    };
    res.status(200).json({ success: true, order });

});

const deleteOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const userId = req.user._id;
    if (!userId) {
       return res.status(404).json({ success: false, message: "please login first" });
    };
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
       return res.status(404).json({ success: false, message: "no order found" });
    };
    res.status(200).json({ success: true, message: "Delete order successfully" });
});

const deleteOrderUser=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const orderId = req.params.id;
    if (!userId) {
        return res.status(404).json({ success: false, message: "please login first" });
    }
    const order=await Order.findByIdAndDelete(orderId);
    if (!order){
        return res.status(404).json({ success: false, message: "no order found" });
    }
    
    res.status(200).json({ success: true,message: "order deleted successfully" });

})

const updateOrderStatus = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const userId = req.user._id;

    if (!userId) {
        res.status(400).json({
            success: false,
            message: "please login first "
        });
    };
    const order = await Order.findById(orderId);
    order.orderStatus = req.body.orderStatus;
   
    await order.save();

    res.status(200).json({ success: true, order })

});



export {
    placeOrder,
    getAllOrders,
    getOrderById,
    deleteOrder,
    updateOrderStatus,
    userOrderHistory,
    cancelOrder,
    deleteOrderUser
}