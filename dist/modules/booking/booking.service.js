"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const config_1 = __importDefault(require("../../config"));
const bookingAdminEmail_1 = require("../../utils/bookingAdminEmail");
const bookingConfirmation_1 = require("../../utils/bookingConfirmation");
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
const booking_schema_1 = __importDefault(require("./booking.schema"));
const getUniqueRecipients = (recipients) => Array.from(new Set(recipients
    .map((recipient) => recipient === null || recipient === void 0 ? void 0 : recipient.trim())
    .filter((recipient) => Boolean(recipient))));
const createBookingInDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("payload", payload);
    if (payload.appointment.hasPreferredDate === true &&
        (!payload.appointment.preferredDate || !payload.appointment.preferredTime)) {
        throw new Error("Please provide preferred date and time");
    }
    const confirmationRecipients = getUniqueRecipients([
        payload.personalInfo.email,
        config_1.default.email.notificationRecipient,
    ]);
    if (!confirmationRecipients.length) {
        throw new Error("No confirmation recipients configured. Set customer email and EMAIL_NOTIFICATION_RECIPIENT.");
    }
    // send booking confirmation to customer + configured extra recipient
    yield (0, sendEmail_1.default)({
        to: confirmationRecipients,
        subject: "Booking Confirmation",
        html: (0, bookingConfirmation_1.bookingConfirmationEmail)(payload),
    });
    const adminRecipient = config_1.default.email.notificationRecipient || config_1.default.email.emailAddress;
    if (!adminRecipient) {
        throw new Error("Admin notification recipient missing. Set EMAIL_NOTIFICATION_RECIPIENT or EMAIL_ADDRESS.");
    }
    // send admin notification
    yield (0, sendEmail_1.default)({
        to: adminRecipient,
        subject: "New Booking Notification",
        html: (0, bookingAdminEmail_1.bookingAdminEmail)(payload),
    });
    // save to DB
    const result = yield booking_schema_1.default.create(payload);
    return {
        success: true,
        message: "Booking details sent to your email.",
        bookingId: result._id,
    };
});
const testEmailSetup = (to) => __awaiter(void 0, void 0, void 0, function* () {
    const recipients = getUniqueRecipients([
        to,
        config_1.default.email.notificationRecipient,
        config_1.default.email.emailAddress,
    ]);
    if (!recipients.length) {
        throw new Error("No email recipients found. Set EMAIL_ADDRESS and EMAIL_NOTIFICATION_RECIPIENT.");
    }
    yield (0, sendEmail_1.default)({
        to: recipients,
        subject: "Email Setup Test",
        html: `
      <h2>Email setup test successful</h2>
      <p>If you received this email, SMTP is configured correctly.</p>
      <p>Time: ${new Date().toISOString()}</p>
    `,
    });
    return {
        success: true,
        recipients,
    };
});
exports.bookingService = {
    createBookingInDb,
    testEmailSetup,
};
