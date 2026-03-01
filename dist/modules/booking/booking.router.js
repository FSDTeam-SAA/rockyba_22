"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const router = (0, express_1.Router)();
router.post("/create-booking", booking_controller_1.bookingController.createbooking);
router.get("/test-email", booking_controller_1.bookingController.testEmailSetup);
exports.bookingRouter = router;
