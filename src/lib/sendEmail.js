import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendWelcomeEmail(name, email) {
  try {
    console.log("Sending email to:", email);

    const info = await transporter.sendMail({
      from: `"Testing" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Registration Successful 🎉",
      html: `
        <h2>Hello ${name},</h2>
        <p>Your account has been created successfully.</p>
        <p>Welcome to Testing ❤️</p>
      `,
    });

    console.log("Email sent successfully!");
    console.log(info);
  } catch (error) {
    console.error("Email sending failed:");
    console.error(error);
  }
}