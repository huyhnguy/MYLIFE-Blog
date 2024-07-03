const Comment = require('../models/comment');
const asyncHandler = require("express-async-handler");
const Post = require('../models/post');

exports.comment_list = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: comment list");
})

exports.comment_detail = asyncHandler(async (req, res, next) => {
    res.send(`Not implemented: comment detail: ${req.params.id}`);
})

exports.comment_create_get = asyncHandler(async (req, res, next) => {
    res.send("not implemented: comment create GET");
});

exports.comment_create_post = asyncHandler(async (req, res, next) => {
    console.log(req.params.postid);
    console.log(req.body.comment);
    console.log(req.body.userId);

    const comment = new Comment({
        user: req.body.userId,
        content: req.body.comment
    })
    await comment.save();

    const post = await Post.findOneAndUpdate({ _id: req.params.postid }, { $push: { comments: comment } });
    res.json(comment);
});

exports.comment_delete_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: comment delete GET");
})