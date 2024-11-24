const mongoose = require('mongoose');

// MongoDB connection
const dbURI = 'mongodb+srv://patrickgrayhurst:smDai7CqgllpuNRK@blogs.onyko.mongodb.net/?retryWrites=true&w=majority&appName=Blogs';
const connectDB = () => {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongoDB:', err));
};

module.exports = connectDB;