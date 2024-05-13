import express from 'express';
import { models, connectDb } from './models';  // Adjust the path as necessary
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
import noteRoutes from './routes/note'; // Make sure this uses the models
import userRoutes from './routes/user'; // Make sure this uses the models

// Use routes
app.use('/api', noteRoutes);
app.use('/api', userRoutes);
  
// Connect to DB and start server
connectDb().then(() => {
  app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Failed to make database connection:', error);
  process.exit(1);
});