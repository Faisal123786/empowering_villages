import Donation from "../models/Donation.js";
import Transaction from "../models/Transaction.js";

async function createDonation({
  donorId,
  areaId,
  moderatorId,
  amount,
  currency,
  metadata,
}) {
  const d = new Donation({
    donor: donorId,
    areaId,
    moderator: moderatorId,
    amount,
    currency,
    metadata,
  });
  await d.save();
  await Transaction.create({
    type: "donation",
    amount,
    currency,
    user: donorId,
    donation: d._id,
  });
  return d;
}

async function setStatus(donationId, status, meta) {
  const d = await Donation.findByIdAndUpdate(
    donationId,
    { status, metadata: { ...meta } },
    { new: true }
  );
  return d;
}

export default { createDonation, setStatus };
