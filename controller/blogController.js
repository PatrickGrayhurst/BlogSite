const Blog = require('../models/Blog');

// Home route (Splash Page)
exports.homePage = (req, res) => {
  res.render('home'); // Render the home page
};

// Show all posts
exports.getAllPosts = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.render('blogList', { blogs });  // Render blogList.ejs with the list of blog posts
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching blogs');
  }
};

// Show the Create Post form
exports.createPostPage = (req, res) => {
  res.render('createPost'); // Render createPost.ejs with the layout
};

// Handle new post creation
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBlogPost = new Blog({ title, content });
    await newBlogPost.save();
    res.redirect('/posts');  // Redirect to the posts page after post is created
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating the post');
  }
};

// Show Edit Post form
exports.editPostPage = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.render('editPost', { post });  // Render editPost.ejs with the post data
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching post for editing');
  }
};

// Handle post update
exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Blog.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.redirect('/posts');  // Redirect to posts page after post is updated
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating the post');
  }
};

// Show Delete Post confirmation
exports.deletePostPage = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.render('deletePost', { post });  // Render deletePost.ejs with the post data
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching post for deletion');
  }
};

// Handle post deletion
exports.deletePost = async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.redirect('/posts');  // Redirect to posts page after post is deleted
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting the post');
  }
};