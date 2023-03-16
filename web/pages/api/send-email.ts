import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

type EmailPayload = {
  to: string
  subject: string
  html: string
}

// Replace with your SMTP credentials
const smtpOptions = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "port"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "user",
    pass: process.env.SMTP_PASSWORD || "password",
  },
}

const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  })

  return await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    ...data,
  })
}

// API Call
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { to, subject, html } = req.body

  await sendEmail({
    to,
    subject,
    html,
  })

  return res.status(200).json({ message: "Email sent successfully" })
}
