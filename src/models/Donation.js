import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Donor Name is required"] },
    email: { type: String, required: [true, "Donor Email is required"] },
    amount: { type: Number, required: [true, "Amount is required"] },
    message: { type: String },

    stripeSessionId: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["pending", "completed", "failed"], 
      default: "pending" 
    },
    accountId: { type: String, required: true },
    areaId: { type: mongoose.Schema.Types.ObjectId, ref: "Village", required: true },
  },
  {
    timestamps: true,
  }
);

const Donation = mongoose.model("Donation", DonationSchema);
export default Donation;
