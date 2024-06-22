const User = require('../models/user');
const asyncHandler = require("express-async-handler");

exports.user_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: User list");
})

exports.user_detail = asyncHandler(async (req, res, next) => {
    res.send(`Not Implemented: User detail: ${res.params.id}`);
});

exports.user_sign_up_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: User sign up GET");
});

exports.user_sign_up_post = asyncHandler(async(req, res, next) => {
    res.send("Not implemented: User sign up POST");
});

exports.user_log_in_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: user log in GET");
});

exports.user_log_in_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: user log in POST");
});

exports.user_delete_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemeneted: user delete GET");
});

exports.user_delete_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: user delete POST");
})

exports.user_update_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: User update GET");
});

exports.user_update_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: User update POST");
});

