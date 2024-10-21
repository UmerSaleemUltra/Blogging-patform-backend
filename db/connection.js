// backend/db/connection.js
import mongoose from 'mongoose';

// Directly use the MongoDB connection string here
const mongoURI = 'mongodb+srv://umer:171175@cluster0.zbqcm.mongodb.net/blog-platform?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
