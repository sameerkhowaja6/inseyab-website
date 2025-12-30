const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { firstName, lastName, email, subject, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'js4835724@gmail.com',
                pass: 'john@321'
            }
        });

        await transporter.sendMail({
            from: `"Website Contact" <js4835724@gmail.com`,
            to: 'js4835724@gmail.com',
            replyTo: email,
            subject: `Contact Form: ${subject}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
