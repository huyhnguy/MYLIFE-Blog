const Post = require('../models/post');
const Comment = require('../models/comment');
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { body, validationResult } = require("express-validator")

exports.home = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.body.id).exec();

    res.json(user);
})

exports.post_list = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({})
        .sort({ date: -1 })
        .populate("user")
        .exec();

    res.json(allPosts);
})

exports.post_detail = asyncHandler(async (req, res, next) => {
    jwt.verify(req.token, process.env.TOKEN_SECRET, asyncHandler (async (err, authData) => {
        if (err) {
            res.sendStatus(403);
            next();
        } 
    }))
    
    const post = await Post.findById(req.params.postId).populate("user comments").exec();

    res.json(post);
});

exports.post_create_post =[
    body("title", "title empty")
        .trim()
        .isLength({ min:1 })
        .escape(),
    body("content", "content empty")
        .trim()
        .isLength({ min:1 })
        .escape(),

    asyncHandler(async(req, res, next) => {
        console.log(`content => ${req.body.content}`);
        let userId;
        jwt.verify(req.token, process.env.TOKEN_SECRET, asyncHandler (async (err, authData) => {
            if (err) {
                res.sendStatus(403);
                next();
            } 
            userId = authData.user._id;
        }))
    
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        } else {
            const post = new Post({
                title: req.body.title,
                content: req.body.content,
                htmlContent: req.body.htmlContent,
                user: userId,
                published: req.body.published,
            })
        
            await post.save();
            res.json(post);
        }
    })
]

exports.post_update_get = asyncHandler(async (req, res, next) => {
    jwt.verify(req.token, process.env.TOKEN_SECRET, asyncHandler (async (err, authData) => {
        if (err) {
            res.sendStatus(403);
            next();
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

exports.post_delete_get = asyncHandler (async (req, res, next) => {
    jwt.verify(req.token, process.env.TOKEN_SECRET, asyncHandler (async (err, authData) => {
        if (err) {
            res.sendStatus(403);
            next();
        } 
    }))
    const post = await Post.findById(req.params.postId).exec();
    post.comments.forEach(async(comment) => {
        await Comment.findByIdAndDelete(comment).exec();
    });

    await Post.findByIdAndDelete(req.params.postId).exec();
});
