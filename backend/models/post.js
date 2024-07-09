const mongoose = require("mongoose");
const { DateTime } = require("luxon");

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
        default: new Date(),
    },
    content: {
        type: String,
        required: true,
    },
    htmlContent: {
        type: String,
        required: true,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'

    }],
    published: {
        type: Boolean,
        required: true,
    }
})

postSchema.virtual("date_formatted").get(function() {
    const isoDateString = this.date.toISOString();

    return DateTime.fromISO(isoDateString).toLocaleString(DateTime.DATETIME_MED);
})

module.exports = mongoose.model("Post", postSchema);