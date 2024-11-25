const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController'); // Adjust path if needed

// Route to display all blog posts
router.get('/', blogController.getAllPosts);

// Route to display the "Create Post" page
router.get('/create', blogController.createPostPage);

// Route to handle form submission (creating a new post)
router.post('/create', blogController.createPost);

// Route to display the "Edit Post" page (using the ID of the blog post)
router.get('/edit/:id', blogController.editPostPage);

// Route to handle updating the post after form submission
router.post('/edit/:id', blogController.updatePost);

// Route to handle the "Delete Post" page
router.get('/delete/:id', blogController.deletePostPage);

// Route to actually delete the post
router.post('/delete/:id', blogController.deletePost);

module.exports = router;