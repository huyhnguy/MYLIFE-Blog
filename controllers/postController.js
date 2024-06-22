const Post = require('../models/post');
const asyncHandler = require("express-async-handler");

exports.post_list = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: post list")
})

exports.post_detail = asyncHandler(async (req, res, next) => {
    res.send(`Not implemented: Post detail ${req.params.id}`);
});

exports.post_create_get = asyncHandler(async (req, res, next) => {
    res.send(`Not implemented: Post create GET`);
});

exports.post_create_post = asyncHandler (async (req, res, next) => {
    res.send('Not impmlemented: Post create POST');
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