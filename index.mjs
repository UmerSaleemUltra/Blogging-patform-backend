// backend/index.mjs
import express from 'express';
import cors from 'cors';
import connectDB from './db/connection.js';
import blogRoutes from './routes/blogRoutes.js';

const app = express();
const PORT = 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
