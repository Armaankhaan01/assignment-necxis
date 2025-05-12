const fs = require("fs");
require("dotenv").config();
const template = fs.readFileSync("firebase-messaging-sw.template.js", "utf8");

const result = template
  .replace("__API_KEY__", process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
  .replace("__AUTH_DOMAIN__", process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN)
  .replace("__PROJECT_ID__", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
  .replace("__STORAGE_BUCKET__", process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
  .replace("__SENDER_ID__", process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID)
  .replace("__APP_ID__", process.env.NEXT_PUBLIC_FIREBASE_APP_ID)
  .replace("__MEASUREMENT_ID__", process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID);

fs.writeFileSync("public/firebase-messaging-sw.js", result);
