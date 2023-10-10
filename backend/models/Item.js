const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    currentPrice: Number,
    currentCost: Number,
    category: String,
    name: String,
});

module.exports = mongoose.model("Item", itemSchema);
