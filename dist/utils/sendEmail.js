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
const config_1 = __importDefault(require("../config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, html }) {
    const smtpUser = config_1.default.email.emailAddress;
    const smtpPass = config_1.default.email.emailPass;
    if (!smtpUser || !smtpPass) {
        throw new Error("Email configuration missing. Set EMAIL_ADDRESS and EMAIL_PASSWORD in .env");
    }
    const recipients = Array.isArray(to) ? to : [to];
    const validRecipients = recipients
        .map((item) => item === null || item === void 0 ? void 0 : item.trim())
        .filter((item) => Boolean(item));
    if (!validRecipients.length) {
        throw new Error("No valid recipient email address provided.");
    }
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
    });
    yield transporter.sendMail({
        from: smtpUser,
        to: validRecipients.join(","),
        subject,
        html,
    });
});
exports.default = sendEmail;
