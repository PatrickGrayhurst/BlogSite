const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController'); // Adjust path if needed

// Home route (Splash Page)
router.get('/', blogController.homePage);

// Route to display all blog posts
router.get('/posts', blogController.getAllPosts);

// Route to display the "Create Post" page
router.get('/create', blogController.createPostPage);

// Route to handle form submission (creating a new post)
router.post('/create', blogController.createPost);

// Route to display the "Edit Post" page
router.get('/edit/:id', blogController.editPostPage);

// Route to handle updating the post after form submission
router.post('/edit/:id', blogController.updatePost);

// Route to handle the "Delete Post" page
router.get('/delete/:id', blogController.deletePostPage);

// Route to actually delete the post
router.post('/delete/:id', blogController.deletePost);

module.exports = router;