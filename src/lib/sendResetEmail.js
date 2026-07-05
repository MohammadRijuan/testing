import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendResetEmail(name, email, resetLink) {
  await transporter.sendMail({
    from: {
      name: "Testing Team",
      address: process.env.EMAIL_USER,
    },

    to: email,

    subject: "Reset Your Password",

    text: `
Hello ${name},

We received a request to reset your password.

Open the following link to create a new password:

${resetLink}

This link will expire in 30 minutes.

If you didn't request this, you can safely ignore this email.

Thanks,
Testing Team
`,

    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Reset Password</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;background:#f4f4f4;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

<tr>
<td style="background:#2563eb;padding:35px;text-align:center;">

<h1 style="margin:0;color:white;">
Testing
</h1>

</td>
</tr>

<tr>
<td style="padding:40px;">

<h2>Hello ${name}, 👋</h2>

<p>
We received a request to reset your password.
</p>

<p>
Click the button below to choose a new password.
</p>

<div style="margin:40px 0;text-align:center;">

<a
href="${resetLink}"
style="
background:#2563eb;
color:white;
padding:14px 30px;
text-decoration:none;
border-radius:8px;
display:inline-block;
font-weight:bold;
">
Reset Password
</a>

</div>

<p>
This password reset link will expire in <strong>30 minutes</strong>.
</p>

<p>
If you didn't request a password reset, you can safely ignore this email.
</p>

<br>

<p>
Regards,<br>
<b>Testing Team</b>
</p>

</td>
</tr>

<tr>
<td style="padding:20px;background:#f9fafb;text-align:center;font-size:13px;color:#666;">

© ${new Date().getFullYear()} Testing. All Rights Reserved.

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`,
  });
}
