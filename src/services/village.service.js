import User from "../models/User.js";
import Village from "../models/Village.js";
import Wallet from "../models/Wallet.js";

async function createVillage({
  name,
  location,
  nearerCity,
  district,
  tehsil,
  postalCode,
  image,
}) {
  const existingVillage = await Village.findOne({
    name: new RegExp(`^${name}$`, "i"),
  });

  if (existingVillage) {
    throw new Error("Village already exists");
  }
  const v = new Village({
    name,
    location,
    nearerCity,
    district,
    tehsil,
    postalCode,
    image,
  });
  await v.save();
  return v;
}

async function getAllVillages() {
  const villages = await Village.find().sort({ createdAt: -1 });
  return villages;
}

async function getAllUnAssignedVillages() {
  const villages = await Village.find({ employee_id: { $exists: false } });
  return villages;
}

async function getVillageDetail(id) {
  const users = await User.find({ area_id: id })
    .populate({
      path: "area_id",
      select: "-password -__v",
    })
    .select("-password");
  let area = null;
  area = await Village.findById(id).select("-__v");
  if (!area) {
    throw new Error("Village Not Found");
  }
  let userWallet = null;
  if (area) {
    userWallet = await Wallet.findOne({
      moderator_id: area.employee_id,
    }).select("-__v");
    if (!area) {
      return res.status(404).json({ message: "Village not found" });
    }
  }
  return { userWallet, users, area };
}

export default {
  createVillage,
  getAllVillages,
  getVillageDetail,
  getAllUnAssignedVillages,
};
