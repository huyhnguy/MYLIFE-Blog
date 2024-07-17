const User = require('../models/user');
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator")
const bcrypt = require('bcryptjs');

exports.user_sign_up_post = [
    body("username", "Username empty")
        .trim()
        .isLength({ min:1 })
        .custom(async (value, {req}) => {
            console.log("HEY");
            const user = await User.findOne({ 'username': value }).exec();
            console.log("THERE");
            if (user != null) {
                throw new Error("Username already exists. Please choose a different one.")
            } 
        })
        .escape(),
    body("password", "Password empty")
        .trim()
        .isLength({ min:1 })
        .escape(),
    body("confirmPassword", "'Confirm password' field is empty")
        .trim()
        .isLength({ min:1 })
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage("Passwords do not match")
        .escape(),
    body("firstname", "First name empty")
        .trim()
        .isLength({ min:1 })
        .escape(),
    body("lastname", "Last name empty")
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
            res.json({ success: "success" });
        }
    })
]

exports.user_log_in_post = [
    body("username", "username is empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("password", "password is empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        } else {
            const user = await User.findOne({ 'username': req.body.username }).exec();

            if (user) {
                const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    
                console.log(isPasswordValid);
                if (isPasswordValid) {
                    jwt.sign({user: user}, process.env.TOKEN_SECRET, (err, token) => {
                        res.json({
                            token: token,
                            full_name: user.full_name,
                        })
                    })
                } else {
                    res.sendStatus(401);
                }
            } else {
                res.sendStatus(401);
            }

        }
    })
]


