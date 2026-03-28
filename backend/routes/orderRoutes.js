const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST /order - Create a new order
router.post('/', async (req, res) => {
    try {
        const { name, address } = req.body;
        
        // Get all cart items to calculate total
        const [cartItems] = await db.query(`
            SELECT cart.quantity, products.price
            FROM cart
            JOIN products ON cart.product_id = products.id
        `);
        
        if (cartItems.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }
        
        // Calculate total amount
        const totalAmount = cartItems.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        
        // Create the order
        const [result] = await db.query(
            'INSERT INTO orders (total_amount, customer_name, customer_address) VALUES (?, ?, ?)',
            [totalAmount, name, address]
        );
        
        // Clear the cart after order is placed
        await db.query('DELETE FROM cart');
        
        res.json({
            message: 'Order placed successfully',
            orderId: result.insertId,
            totalAmount: totalAmount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /order/:id - Get order details (bonus)
router.get('/:id', async (req, res) => {
    try {
        const [orders] = await db.query(
            'SELECT * FROM orders WHERE id = ?',
            [req.params.id]
        );
        
        if (orders.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        res.json(orders[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
