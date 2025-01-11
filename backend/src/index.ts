import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db';
import todoRoutes from './routes/todoRoutes';
import statsRoutes from './routes/statsRoutes';
import metricsRoutes from './routes/metricsRoutes';
import loadRoutes from './routes/loadRoutes';

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

app.use('/api/todos', todoRoutes);
app.use('/api', statsRoutes);
app.use('/api', metricsRoutes);
app.use('/api', loadRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
