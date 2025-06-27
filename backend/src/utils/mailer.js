import transporter from '#@/config/mailer.js';

const sendMail = async ({ to, subject, text, html }) => {
  await transporter.sendMail({
    from: `"Tuyển dụng" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });
};

export default sendMail;