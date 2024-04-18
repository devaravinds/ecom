const User = require("../models/user-model");
const roles = require("../enum/roles");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const newUser = new User({
    email: req?.body?.email,
    name: req?.body?.name,
    password: req?.body?.password,
    role: roles.USER,
  });

  try {
    const createdUser = await newUser.save();
    return res.status(201).json({
      userId: createdUser._id,
      message: "Account successfully created",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  const {email, password} = req?.body;
  var user = await User.findOne({email:email});
  if(!user) {   
    return res.status(401).json({
        message: "Incorrect credentials, Login Failed",
        success: false,
    })       
  }
  let isMatch = await bcrypt.compare(password, user.password);

  if(isMatch){
    let token = jwt.sign({
      user_id: user._id,
      role: user.role,
      email: user.email,
      name: user.firstName,
    }, 
    process.env.JWT_SECRET, 
    {
      expiresIn: "5 days",
    });

    let result = {
      user: {
        email: user.email,
        role: user.role,
        name: user.name,
      },
      token: token,
      expiresIn: "5 days",
    };
    return res.status(200).json({
      data:result,
      message: "Login was successfull"
    })
  }
  else{
    return res.status(401).json({
      message: "Incorrect credentials, Login Failed",
    })
  }

}

module.exports = {
  signup,
  login
};
