require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/send-email', async (req, res) => {
  const { formType } = req.body;

  try {
    let mailOptions;

    /* ================= CONTACT FORM ================= */
    if (formType === 'contact') {
      const { firstName, lastName, email, subject, message } = req.body;

      mailOptions = {
        from: `"Website Contact" <${process.env.EMAIL_USER}>`,
        to: 'sameerkhowaja6@gmail.com',
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
      };
    }

    /* ================= APPLICATION FORM ================= */
    else if (formType === 'application') {
      const {
        firstName,
        lastName,
        email,
        phone,
        city,
        linkedin,
        message
      } = req.body;

      mailOptions = {
        from: `"Job Application" <${process.env.EMAIL_USER}>`,
        to: 'sameerkhowaja6@gmail.com',
        replyTo: email,
        subject: `New Job Application - ${firstName} ${lastName}`,
        html: `
          <h3>New Job Application Received</h3>

          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Contact Number:</strong> ${phone}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>LinkedIn:</strong> 
            ${linkedin ? `<a href="${linkedin}" target="_blank">${linkedin}</a>` : 'N/A'}
          </p>

          <p><strong>Message:</strong></p>
          <p>${message || 'No message provided'}</p>
        `
      };
    }

    /* ================= INVALID FORM ================= */
    else {
      return res.status(400).json({ success: false, message: 'Invalid form type' });
    }

    await transporter.sendMail(mailOptions);
    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});


// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post('/send-email', async (req, res) => {
//     const { firstName, lastName, email, subject, message } = req.body;

//     try {
//         const transporter = nodemailer.createTransport({
//             host: 'smtp.gmail.com',
//             port: 587,
//             secure: false,
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         });

//         await transporter.sendMail({
//             from: `"Website Contact Form"`,
//             to: 'sameerkhowaja6@gmail.com',
//             replyTo: email,
//             subject: `Contact Form: ${subject}`,
//             html: `
//                 <h3>New Contact Form Submission</h3>
//                 <p><strong>Name:</strong> ${firstName} ${lastName}</p>
//                 <p><strong>Email:</strong> ${email}</p>
//                 <p><strong>Subject:</strong> ${subject}</p>
//                 <p><strong>Message:</strong></p>
//                 <p>${message}</p>
//             `
//         });

//         res.json({ success: true });
//     } catch (err) {
//         console.error(err);
//         res.json({ success: false });
//     }
// });

// app.listen(3000, () => {
//     console.log('Server running on port 3000');
// });
