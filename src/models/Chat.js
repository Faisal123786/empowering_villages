import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    sender: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    receivers: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }],

    message: { 
      type: String, 
      required: true 
    },

    isGroup: { 
      type: Boolean, 
      default: false 
    },

    groupId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Group", 
      default: null 
    },

    status: {
      type: String,
      enum: ["sent", "delivered", "seen"],
      default: "sent"
    },
     readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);
