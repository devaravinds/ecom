const jwt = require("jsonwebtoken");
const User = require("../models/user-model");


const ensureAuthenticated = async(req, res, next) => {
    const token = req.headers.authorization.slice(7);
    try{
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verifiedToken.userId);
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        req.user = user;
        next();
    }
    catch(error){
        return res.status(409).json({
            message: "JWT verification failed",
            error: error.message
        })
    }
}

const ensureAuthorized = (allowedRoles) => (req, res, next) => {
    const { role } = req.user;
    if(!allowedRoles.includes(role)){
        return res.status(409).json({
            error: `Roles required: ${allowedRoles.join(" or ")}`
        })
    }
    next();
}

module.exports = {
    ensureAuthenticated,
    ensureAuthorized
}