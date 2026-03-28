const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware
app.use(cors());                    // Allow cross-origin requests from React
app.use(express.json());            // Parse JSON request bodies

// API Routes
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'E-commerce API is running!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
