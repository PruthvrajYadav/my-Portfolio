const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// @route   POST /api/contact
// @desc    Submit a contact form message
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newMessage = new Message({
            name,
            email,
            message
        });

        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (err) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

module.exports = router;
