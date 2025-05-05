const nodemailer = require('nodemailer');//added for email

const sendEmail = async (req , res) =>{
    const {name, email, subject, message} = req.body;

    if(!name || !email || !subject || !message){
        return res.status(400).send('All fields are required');
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECEIVER_EMAIL,
        subject: `New Contact Form Submission: ${subject}`,
        text: `You have received a new message:

        Name: ${name}
        Email: ${email}
        Message: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
}

module.exports = {
    sendEmail
};