
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";


const isAuthenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(404).json({
                message: "Please login first",
                success: false
            })
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const userId = decodedToken.userId
        const user = await User.findById(userId)
        if (!user) {
            return res.status(403).json({
                message: 'User not found',
                success: false
            })

        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error)

    }

}
export { isAuthenticate }