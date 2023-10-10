const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    notes: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Note",
            },
        ],
        default: [],
    },
    labels: {
        type: [
            {
                text: String,
                id: String,
                options: [
                    {
                        text: String,
                        id: String,
                    },
                ],
            },
        ],
        default: [],
    },
});

module.exports = mongoose.model("User", userSchema);
