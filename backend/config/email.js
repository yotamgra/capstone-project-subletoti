import nodemailer from "nodemailer";

const createTransport = () => {
  return nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f17f26f85052ae",
      pass: "71c0f4fa867840"
    },
  });
};

export const transporter = createTransport();

