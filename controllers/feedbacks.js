import Visitor from "../models/visitors.js"
import Feedback from "../models/feedbacks.js"
import nodemailer from "nodemailer"

async function sendFeedbackNotificationEmail(name, email, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.PRIMARY_GMAIL,
      pass: process.env.PRIMARY_GMAIL_APP_PASS,
    },
  })
  await transporter.sendMail({
    from: `Portfolio <${process.env.PRIMARY_GMAIL}>`,
    to: "harshan2412005@gmail.com",
    subject: "New Feedback Received",
    html: `
      <h3>You have received a new feedback from ${name} (<a href="mailto:${email}">${email}</a>).</h3>
      <h3>Message:</h3>
      <span>${message}</span>
    `,
  })
}

export async function createFeedback(req, res, next) {
  const { name, email, message } = req.body

  await sendFeedbackNotificationEmail(name, email, message)

  let visitorId = req.cookies.visitorId
  if (!visitorId) {
    const visitor = await Visitor.create({})
    visitorId = visitor._id
    res.cookie("visitorId", visitor._id, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    })
  }

  const feedback = await Feedback.create({
    visitiorId: visitorId,
    name,
    email,
    message,
  })
  // console.log("Feedback created", feedback)

  res.status(201).json({ success: true })
}
