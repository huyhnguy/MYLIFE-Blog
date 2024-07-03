const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    fullname: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    content: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Comment", commentSchema);