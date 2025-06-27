import transporter from '#@/config/mailer.js';

const sendMail = async ({ from, to, subject, text, html }) => {
  await transporter.sendMail({
    from: from || `"Thiên Trúc" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });
};

export default sendMail;