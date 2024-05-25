const User = require("../models/user-model");

const createUser = (req, userType) => {
    return new User({
        email: req?.body?.email,
        name: req?.body?.name,
        password: req?.body?.password,
        role: userType,
    });
}

module.exports = {
    createUser
}