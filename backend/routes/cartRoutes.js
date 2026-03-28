const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /cart - Get all cart items with product details
router.get('/', async (req, res) => {
    try {
        // Join cart with products to get full product info
        const [cartItems] = await db.query(`
            SELECT 
                cart.id,
                cart.product_id,
                cart.quantity,
                products.name,
                products.price,
                products.image_url
            FROM cart
            JOIN products ON cart.product_id = products.id
        `);
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /cart - Add item to cart
router.post('/', async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        
        // Check if product already exists in cart
        const [existing] = await db.query(
            'SELECT * FROM cart WHERE product_id = ?',
            [product_id]
        );
        
        if (existing.length > 0) {
            // Update quantity if product already in cart
            await db.query(
                'UPDATE cart SET quantity = quantity + ? WHERE product_id = ?',
                [quantity, product_id]
            );
        } else {
            // Add new item to cart
            await db.query(
                'INSERT INTO cart (product_id, quantity) VALUES (?, ?)',
                [product_id, quantity]
            );
        }
        
        res.json({ message: 'Item added to cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /cart/:id - Update cart item quantity
router.put('/:id', async (req, res) => {
    try {
        const { quantity } = req.body;
        
        if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            await db.query('DELETE FROM cart WHERE id = ?', [req.params.id]);
            return res.json({ message: 'Item removed from cart' });
        }
        
        await db.query(
            'UPDATE cart SET quantity = ? WHERE id = ?',
            [quantity, req.params.id]
        );
        res.json({ message: 'Cart updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /cart/:id - Remove item from cart
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM cart WHERE id = ?', [req.params.id]);
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
