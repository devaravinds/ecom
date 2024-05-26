const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },

    rating: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    quantity: {
        type: String,
        required: true,
    },

    category: { 
      type: [String],
    },

    image: {
        type: String
    }
});


const Product = mongoose.model("product", ProductSchema);
module.exports = Product;