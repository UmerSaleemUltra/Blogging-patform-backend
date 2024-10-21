// routes/blogs.js
import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// Create a new blog post
router.post('/', async (req, res) => {
  const { title, content, author } = req.body;
  const newBlog = new Blog({ title, content, author });

  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Error creating blog', error });
  }
});

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
});

// Get a blog post by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Error fetching blog', error });
  }
});

// Update a blog post
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content, author }, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Error updating blog', error });
  }
});

// Delete a blog post
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Error deleting blog', error });
  }
});

export default router;
