const User = require("../models/user-model");
const roles = require("../enum/roles");

const signup = async(req, res) => {

    const newUser = new User({
        email : req?.body?.email,
        name : req?.body?.name,
        password : req?.body?.password,
        role: roles.USER
    })

    try{
        await newUser.save();
        return res.status(201).json({
            message: "Account successfully created",
            success: true,
        }); 
    }
    catch(err){
        console.log(err.message)
        return res.status(500).json({
           message:err.message
        });
    }
}

module.exports = {
    signup
}