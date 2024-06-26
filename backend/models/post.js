const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    content: {
        type: String,
        required: true,
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    published: {
        type: Boolean,
        required: true,
    }
})

module.exports = mongoose.model("Post", postSchema);