import { model, Schema } from "mongoose";

const cleaningPackageSchema = new Schema({
  type: {
    type: String,
    enum: ["executive", "ceo"],
    required: true,
  },
  includedServices: [String],
});

const appointmentSchema = new Schema({
  hasPreferredDate: { type: Boolean, required: true },
  preferredDate: { type: Date },
  preferredTime: { type: String },
});

const extrasSchema = new Schema({
  specialRequests: { type: String },
});

const priceSchema = new Schema({
  perCleaning: { type: Number, required: true },
  total: { type: Number, required: true },
});

const bookingInfoSchema = new Schema({
  apartmentSize: { type: String, required: true },
  cleaningInterval: { type: String, required: true },
  householdSize: { type: Number, required: true },
  cleaningPackage: { type: cleaningPackageSchema, required: true },
  extras: { type: extrasSchema },
  appointment: { type: appointmentSchema, required: true },
  price: { type: priceSchema, required: true },
  agreedToPrivacyPolicy: { type: Boolean, required: true },
  personalInfo: {
    type: Schema.Types.ObjectId,
    ref: "PersonalInfo",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const booking = model("Booking", bookingInfoSchema);

export default booking;
