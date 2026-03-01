"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    apartmentSize: { type: String, required: true },
    cleaningInterval: { type: String, required: true },
    householdSize: { type: Number, required: true },
    cleaningPackage: {
        type: {
            type: String,
            enum: ['executive', 'ceo'],
            required: true,
        },
        // includedServices: [String],
    },
    specialWish: { type: String },
    appointment: {
        //? if it true then preferredDate and preferredTime is required.......
        hasPreferredDate: { type: Boolean, required: true },
        preferredDate: { type: Date },
        preferredTime: { type: String },
    },
    personalInfo: {
        salutation: {
            type: String,
            enum: ['Mr', 'Ms'],
            required: false,
            default: null,
        },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        address: {
            houseNumber: { type: String, required: true },
            zipCode: { type: String, required: true },
            street: { type: String, required: true },
            city: { type: String, required: true },
        },
        howDidYouFindUs: { type: String },
    },
    price: {
        perCleaning: { type: Number, required: true },
        total: { type: Number, required: true },
    },
}, {
    timestamps: true,
});
const booking = (0, mongoose_1.model)("booking", BookingSchema);
exports.default = booking;
