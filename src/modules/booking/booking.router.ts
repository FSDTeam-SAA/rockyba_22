import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/create-booking", bookingController.createbooking);
router.get("/test-email", bookingController.testEmailSetup);

export const bookingRouter = router;
