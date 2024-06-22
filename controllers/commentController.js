const Comment = require('../models/comment');
const asyncHandler = require("express-async-handler");

exports.comment_list = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: comment list");
})

exports.comment_create_get = asyncHandler(async (req, res, next) => {
    res.send("not implemented: comment create GET");
});

exports.comment_create_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: comment create POST");
});

exports.comment_delete_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: comment delete GET");
})