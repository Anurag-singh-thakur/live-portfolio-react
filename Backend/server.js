const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middleware/errorHandeler');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();

app.use(cors());  // Add this line
app.use(express.json());

app.use('/api/posts', postRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));