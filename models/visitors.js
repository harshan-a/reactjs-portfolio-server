import mongoose from "mongoose"

const { Schema } = mongoose

const visitorSchema = new Schema(
  {
    visits: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
)

export default mongoose.model("Visitor", visitorSchema)
