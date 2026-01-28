import Visitor from "../models/visitors.js"

export async function createOrUpdateVisitor(req, res, next) {
  const existingVisitorId = req.cookies.visitorId

  let visitor
  if (existingVisitorId) {
    visitor = await Visitor.findOneAndUpdate(
      { _id: existingVisitorId },
      { $inc: { visits: 1 } },
      { new: true },
    )
    // console.log("Visitor updated", visitor)
  } else {
    visitor = await Visitor.create({})
    // console.log("New visitor created", visitor)
  }

  res.cookie("visitorId", visitor._id, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  })
  res.status(201).json({ success: true })
}
