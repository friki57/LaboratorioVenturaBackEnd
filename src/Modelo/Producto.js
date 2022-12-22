const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        id: Number,
        product_name: String,
        stock: Number,
        product_image: String
    }
)

module.exports = Product = mongoose.model("product", ProductSchema);