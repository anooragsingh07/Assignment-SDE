const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /products - Get all products
router.get('/', async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /products/search/:name - Search products by name
router.get('/search/:name', async (req, res) => {
    try {
        const searchTerm = `%${req.params.name}%`;
        const [products] = await db.query(
            'SELECT * FROM products WHERE name LIKE ?',
            [searchTerm]
        );
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /products/category/:category - Filter products by category
router.get('/category/:category', async (req, res) => {
    try {
        const [products] = await db.query(
            'SELECT * FROM products WHERE category = ?',
            [req.params.category]
        );
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /products/:id - Get single product by ID
router.get('/:id', async (req, res) => {
    try {
        const [products] = await db.query(
            'SELECT * FROM products WHERE id = ?',
            [req.params.id]
        );
        
        if (products.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.json(products[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
