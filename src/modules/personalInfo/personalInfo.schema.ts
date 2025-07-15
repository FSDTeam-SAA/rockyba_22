import { model, Schema } from "mongoose";

const addressSchema = new Schema({
  houseNumber: { type: String, required: true },
  zipCode: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
});

const personalInfoSchema = new Schema({
  salutation: { type: String, enum: ["Mr", "Ms"], required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: addressSchema, required: true },
  referral: { type: String },
});

const personalInfo = model("personalInfo", personalInfoSchema);

export default personalInfo;
