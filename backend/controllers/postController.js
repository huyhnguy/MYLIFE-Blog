const Post = require('../models/post');
const Comment = require('../models/comment');
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.home = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.body.id).exec();

    res.json(user);
})

exports.post_list = asyncHandler(async (req, res, next) => {
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } 
    })

    const allPosts = await Post.find({})
        .sort({ date: -1 })
        .populate("user")
        .exec();

    res.json(allPosts);
})

exports.post_detail = asyncHandler(async (req, res, next) => {
    console.log(req.params);
    const post = await Post.findById(req.params.postId).populate("user comments").exec();
    console.log(post);

    res.json(post);
});

exports.post_create_get = asyncHandler(async (req, res, next) => {
    res.send(`Not implemented: Post create GET`);
});

exports.post_create_post =(req, res, next) => {
    console.log(`content => ${req.body.content}`);
    jwt.verify(req.token, process.env.TOKEN_SECRET, asyncHandler (async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const post = new Post({
                title: req.body.title,
                content: req.body.content,
                htmlContent: req.body.htmlContent,
                user: authData.user._id,
                published: req.body.published,
            })

            await post.save();
        }
    }))
};

exports.post_update_get = asyncHandler(async (req, res, next) => {
    jwt.verify(req.token, process.env.TOKEN_SECRET, asyncHandler (async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } 
    }));

    const oldPost = await Post.findByIdAndUpdate(req.params.postId, {
        title: req.body.title,
        content: req.body.content,
        htmlContent: req.body.htmlContent,
        published: req.body.published
    }).exec();

    res.json(oldPost);
});

exports.post_update_post = asyncHandler (async (req, res, next) => {
    res.send('Not implemented: post update POST')
});

exports.post_delete_get = asyncHandler (async (req, res, next) => {
    const post = await Post.findById(req.params.postId).exec();
    post.comments.forEach(async(comment) => {
        await Comment.findByIdAndDelete(comment).exec();
    });

    await Post.findByIdAndDelete(req.params.postId).exec();

    console.log(post);
});

exports.post_delete_post = asyncHandler (async (req, res, next) => {
    res.send('Not implemented: post delete POST');
});