const Comment = require('../models/comment');
const asyncHandler = require("express-async-handler");
const Post = require('../models/post');
const jwt = require('jsonwebtoken');

exports.comment_create_post = (req, res, next) => {
    jwt.verify(req.token, process.env.TOKEN_SECRET, asyncHandler (async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const comment = new Comment({
                user: authData.user._id,
                fullname: `${authData.user.first_name} ${authData.user.last_name}`,
                content: req.body.comment
            });
            console.log(comment);
            await comment.save();
            await Post.findOneAndUpdate({ _id: req.params.postid }, { $push: { comments: comment } });
            res.json(comment);
        }
    }))
};

exports.comment_delete_get = asyncHandler(async (req, res, next) => {
    console.log(req.params);
    const comment = await Comment.findByIdAndDelete(req.params.commentId).exec();
})