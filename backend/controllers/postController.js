const Post = require('../models/post');
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
        .sort({ date: 1 })
        .populate("user")
        .exec();

    res.json(allPosts);
})

exports.post_detail = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId).populate("user comments").exec();
    console.log(post);

    res.json(post);
});

exports.post_create_get = asyncHandler(async (req, res, next) => {
    res.send(`Not implemented: Post create GET`);
});

exports.post_create_post = asyncHandler (async (req, res, next) => {
    console.log(`token secret = ${process.env.TOKEN_SECRET}`);
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            })
        }
    })
});

exports.post_update_get = asyncHandler (async (req, res, next) => {
    res.send('Not implemented: post update GET')
});

exports.post_update_post = asyncHandler (async (req, res, next) => {
    res.send('Not implemented: post update POST')
});

exports.post_delete_get = asyncHandler (async (req, res, next) => {
    res.send('Not implemented: post delete GET');
});

exports.post_delete_post = asyncHandler (async (req, res, next) => {
    res.send('Not implemented: post delete POST');
});