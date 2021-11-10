const express = require("express");
const postController = require("../controllers/postControllers");
const router = express.Router();

//@route GET && POST - /posts/
router
    .route("/posts")
    .get(postController.getAllPosts)
    .post(postController.createNewPost);
router.route("/battleruleset/").get(postController.getBattles);
//router.route("/:id").get(postControllers.getPostById);

module.exports = router;