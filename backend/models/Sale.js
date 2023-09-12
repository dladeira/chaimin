const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    },
    price: Number,
    cost: Number,
    time: Number
})

module.exports = mongoose.model("Sale", saleSchema)