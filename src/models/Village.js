import mongoose from "mongoose";

const VillageSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    location: { type: String, required: [true, "Location is required"] },
    nearerCity: { type: String, required: [true, "Nearer City is required"] },
    district: { type: String, required: [true, "District is required"] },
    tehsil: { type: String, required: [true, "Tehsil is required"] },
    postalCode: { type: Number, required: [true, "Postal Code is required"] },
    image: { type: String },
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: false, },

  },
  {
    timestamps: true,
  }
);

const Village = mongoose.model("Village", VillageSchema);
export default Village;
