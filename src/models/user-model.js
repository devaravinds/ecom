const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const roles = require("../enum/roles");

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique:true
    },

    password: {
      type: String,
      required: true,
    },

    role: { 
      type: String,
      enum: roles,
      default: roles.USER
    }
});

UserSchema.pre("save", function (next) {  
    if (this.isModified("password")) {
      bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
      });
    }
});


const User = mongoose.model("users", UserSchema);
module.exports = User;