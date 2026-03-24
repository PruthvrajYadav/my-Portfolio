const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// @route   POST /api/contact
// @desc    Submit a contact form message
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        // Save to Database
        const newMessage = new Message({
            name,
            email,
            subject,
            message
        });
        const savedMessage = await newMessage.save();

        // Send Email notification
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.GMAIL_USER,
            subject: `Portfolio: ${subject || 'New Message'} from ${name}`,
            text: `You have a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
            replyTo: email
        };

        // We don't want to block the response if email fails, but for "fully working" we should check
        await transporter.sendMail(mailOptions);

        res.status(201).json(savedMessage);
    } catch (err) {
        console.error('Contact Error:', err);
        res.status(500).json({ 
            error: 'Failed to send message', 
            details: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});

module.exports = router;
