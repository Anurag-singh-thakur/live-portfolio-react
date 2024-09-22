const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middleware/errorHandeler');
const cors = require('cors');
const path = require('path');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/posts', postRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));