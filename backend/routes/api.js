const express = require('express');
const router = express.Router();
const verifyToken = require('../verifyToken');

const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

router.get('/', post_controller.home);
router.get("/posts", verifyToken, post_controller.post_list);
router.get("/posts/create", post_controller.post_create_get);
router.post("/posts/create", verifyToken, post_controller.post_create_post);
router.get("/posts/:postId", post_controller.post_detail);
router.put("/posts/:postId", post_controller.post_update_get);
router.delete("/posts/:postId", post_controller.post_delete_get);


router.get("/posts/:postid/comments", comment_controller.comment_list);
router.get("/posts/:postid/comments/:commentid", comment_controller.comment_detail);
router.delete("/posts/:postid/comments/:commentid", comment_controller.comment_delete_get);
router.get("/posts/:postid/comments/create", comment_controller.comment_create_get);
router.post("/posts/:postid/comments/create", comment_controller.comment_create_post);

router.get("/users", user_controller.user_list);
router.get("/users/login", user_controller.user_log_in_get);
router.post("/users/login", user_controller.user_log_in_post);
router.get("/users/signup", user_controller.user_sign_up_get);
router.post("/users/signup", user_controller.user_sign_up_post)
router.get("/users/:userid", user_controller.user_detail);
router.put("/users/:userid", user_controller.user_update_get);
router.delete("/users/:userid", user_controller.user_delete_get);


module.exports = router;
