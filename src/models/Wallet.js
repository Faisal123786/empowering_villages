
import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  balance: {
    type: Number,
    default: 0,
  },
  moderator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, 
  },
  stripeAccountId: { 
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
