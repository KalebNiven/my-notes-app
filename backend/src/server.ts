const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const noteRoutes = require('./routes/noteRoutes');

// Use routes
app.use('/api', noteRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
