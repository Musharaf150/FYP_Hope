// lib/email.service.ts
import nodemailer from 'nodemailer';

// Configure your SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email provider or SMTP service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

export async function sendVolunteerEmail(userEmail: string, eventTitle: string, startDateTime:string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Volunteer Application Confirmation',
    text: `Thank you for applying to volunteer for the event: ${eventTitle}. We will get back to you soon.\n Date: ${startDateTime}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
