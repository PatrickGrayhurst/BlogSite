const Blog = require('../models/Blog');

// Show all posts (with layout applied)
exports.getAllPosts = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.render('blogList', { blogs });  // Automatically uses layout if it's set globally
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching blogs');
  }
};

// Show the Create Post form (with layout applied)
exports.createPostPage = (req, res) => {
  res.render('createPost'); // Renders createPost.ejs with the layout
};

// Handle new post creation
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBlogPost = new Blog({ title, content });
    await newBlogPost.save();
    res.redirect('/');  // Redirect to home page after post is created
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating the post');
  }
};

// Show Edit Post form (with layout applied)
exports.editPostPage = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.render('editPost', { post });  // Renders editPost.ejs with the layout
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching post for editing');
  }
};

// Handle post update (with layout applied)
exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Blog.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.redirect('/');  // Redirect to home page after post is updated
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating the post');
  }
};

// Show Delete Post confirmation (with layout applied)
exports.deletePostPage = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.render('deletePost', { post });  // Renders deletePost.ejs with the layout
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching post for deletion');
  }
};

// Handle post deletion (with layout applied)
exports.deletePost = async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.redirect('/');  // Redirect to home page after post is deleted
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting the post');
  }
};