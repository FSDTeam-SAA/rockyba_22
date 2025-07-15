import { Router } from "express";
import { bookingRouter } from "../modules/booking/booking.router";

const router = Router();

const moduleRoutes = [
  {
    path: "/booking",
    route: bookingRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
