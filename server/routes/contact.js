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
        console.log('Attempting to save message to DB...');
        // Save to Database
        const newMessage = new Message({
            name,
            email,
            subject,
            message
        });
        const savedMessage = await newMessage.save();
        console.log('Message saved to DB successfully.');

        console.log('Attempting to send email...');
        // Send Email notification
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // Use SSL
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.GMAIL_USER, // Gmail requires this to be the authenticated user
            to: process.env.GMAIL_USER,
            subject: `Portfolio: ${subject || 'New Message'} from ${name}`,
            text: `You have a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
            replyTo: email
        };

        // Timeout for email attempt to avoid hanging
        await Promise.race([
            transporter.sendMail(mailOptions),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Email sending timed out after 10s')), 10000))
        ]);
        console.log('Email sent successfully.');

        res.status(201).json(savedMessage);
    } catch (err) {
        console.error('Contact Detailed Error:', err);
        res.status(500).json({ 
            error: 'Failed to send message', 
            details: err.message,
            step: savedMessage ? 'Email Notification' : 'Database Save'
        });
    }
});

module.exports = router;
