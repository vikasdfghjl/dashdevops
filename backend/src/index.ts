import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db';
import todoRoutes from './routes/todoRoutes';

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

app.use('/api/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
