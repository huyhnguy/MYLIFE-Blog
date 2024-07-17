const express = require('express');
const router = express.Router();
const verifyToken = require('../verifyToken');

const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

router.get('/', post_controller.home);
router.post('/', post_controller.home);
router.get("/posts", verifyToken, post_controller.post_list);
router.post("/posts/create", verifyToken, post_controller.post_create_post);
router.get("/posts/:postId", post_controller.post_detail);
router.post("/posts/:postId", post_controller.post_detail);
router.put("/posts/:postId", verifyToken, post_controller.post_update_get);
router.delete("/posts/:postId", verifyToken, post_controller.post_delete_get);

router.post("/posts/:postid/comments/create", verifyToken, comment_controller.comment_create_post);
router.delete("/posts/:postId/comments/:commentId", comment_controller.comment_delete_get);

router.post("/users/login", user_controller.user_log_in_post);
router.post("/users/signup", user_controller.user_sign_up_post)


module.exports = router;
