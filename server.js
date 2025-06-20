require('dotenv').config();
const express = require('express');
const cors = require('cors');
const smsRoutes = require('./routes/sms');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sms', smsRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});