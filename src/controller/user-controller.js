const User = require("../models/user-model");
const roles = require("../enum/roles");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const { createUser } = require("../helper/user-helper");

const signup = async (req, res) => {
  const newUser = createUser(req, roles.USER);
  try {
    const createdUser = await newUser.save();
    logger.info(`New user account created with Id: ${createUser._id}`);
    return res.status(201).json({
      userId: createdUser._id,
      message: "Account successfully created",
    });
  } catch (err) {
    logger.error(`Error: ${error.message}`);
    return res.status(500).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req?.body;
  var user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).json({
      message: "Incorrect credentials, Login Failed",
      success: false,
    });
  }
  let isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    let token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        email: user.email,
        name: user.firstName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );

    let result = {
      user: {
        email: user.email,
        role: user.role,
        name: user.name,
      },
      token: token,
      expiresIn: process.env.JWT_EXPIRY,
    };
    logger.info(`User ${user._id} has logged in`);
    return res.status(200).json({
      data: result,
      message: "Login was successfull",
    });
  } else {
    return res.status(401).json({
      message: "Incorrect credentials, Login Failed",
    });
  }
};

const createAdmin = async (req, res) => {
  const newAdmin = createUser(req, roles.ADMIN);
  try {
    const createdAdmin = await newAdmin.save();
    logger.info(`New admin account created with Id: ${createUser._id}`);
    return res.status(201).json({
      userId: createdAdmin._id,
      message: "Admin created successfully",
    });
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    return res.status(500).json({
      message: "An error occured!",
      error: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  let isMatch = await bcrypt.compare(req?.body?.currentPassword, user.password);

  if (!isMatch) {
    return res.status(409).json({
      message: "Current password is wrong",
    });
  }
  user.password = await bcrypt.hash(req.body.newPassword, 8);
  await User.updateOne({ email: req.user.email }, user);
  return res.status(200).json({
    message: "Password has been changed",
  });
};

const deleteProfile = async(req, res) => {
  const user = req.user;
  if(user.role == roles.SUPER_ADMIN){
    res.status(409).json({
      message:"Super Admin cannot be deleted"
    })
  }
  await User.deleteOne({_id: user._id});
  return res.status(200).json({
    message:`Profile with id ${user._id} has been deleted`
  })
}

const deleteAdmin = async(req, res) => {
  const adminId = req?.headers?.id;
  const admin = await User.findById(adminId);
  if(!admin || admin.role != roles.ADMIN){
    return res.status(409).json({
      message:"Admin id is invalid"
    })
  }
  await User.deleteOne({_id: adminId});
  return res.status(200).json({
    message: `Admin with id ${adminId} has been deleted`
  })
}

module.exports = {
  signup,
  login,
  createAdmin,
  changePassword,
  deleteProfile,
  deleteAdmin
};
