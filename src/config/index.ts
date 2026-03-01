import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  mogodbUrl: process.env.MONGODB_URL,
  nodeEnv: process.env.NODE_ENV,

  email: {
    emailAddress: process.env.EMAIL_ADDRESS,
    emailPass: process.env.EMAIL_PASSWORD,
    notificationRecipient: process.env.EMAIL_NOTIFICATION_RECIPIENT,
  },
};
