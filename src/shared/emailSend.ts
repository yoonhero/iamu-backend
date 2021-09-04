import nodemailer from "nodemailer";

export const emailSend = async (email, generatedAuthNumber) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    await transporter.sendMail({
      from: `"IAMU Team" <${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: "Email Verification",
      // text: generatedAuthNumber,
      html: `${generatedAuthNumber}`,
    });

    return {
      ok: true,
    };
  } catch (err) {
    return {
      ok: false,
    };
  }
};
