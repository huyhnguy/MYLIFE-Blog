const User = require('../models/user');
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator")
const bcrypt = require('bcryptjs');

exports.user_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: User list");
})

exports.user_detail = asyncHandler(async (req, res, next) => {
    res.send(`Not Implemented: User detail: ${res.params.id}`);
});

exports.user_sign_up_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: User sign up GET");
});

exports.user_sign_up_post = [
    body("username", "username empty")
        .trim()
        .isLength({ min:1 })
        .escape(),
    body("password", "password empty")
        .trim()
        .isLength({ min:1 })
        .escape(),
    body("firstname", "first name empty")
        .trim()
        .isLength({ min:1 })
        .escape(),
    body("lastname", "last name empty")
        .trim()
        .isLength({ min:1 })
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            const user = new User({
                username: req.body.username,
                password: hashedPassword,
                first_name: req.body.firstname,
                last_name: req.body.lastname,
            })
            await user.save();
        }
    })
]

exports.user_log_in_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: user log in GET");
});

exports.user_log_in_post = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ 'username': req.body.username }).exec();

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (user != null && isPasswordValid) {
        jwt.sign({user: user}, process.env.TOKEN_SECRET, (err, token) => {
            res.json({
                token: token,
                full_name: user.full_name,
            })
        })
    } else {
        res.sendStatus(401);
    }


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

