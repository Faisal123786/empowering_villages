import mongoose from "mongoose";
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  type: {
    type: String,
    enum: ["donation", "payout", "fee", "refund"],
    required: true,
  },
  amount: { type: Number, required: true },
  currency: { type: String, default: "usd" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  donation: { type: Schema.Types.ObjectId, ref: "Donation" },
  meta: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Transaction", TransactionSchema);
