"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_router_1 = require("../modules/booking/booking.router");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/booking",
        route: booking_router_1.bookingRouter,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
