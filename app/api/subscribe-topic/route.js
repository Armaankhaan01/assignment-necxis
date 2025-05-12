import admin from "firebase-admin";
import { NextResponse } from "next/server";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export async function POST(request) {
  try {
    const { token, topic } = await request.json();

    if (!token || !topic) {
      return NextResponse.json(
        { success: false, error: "Missing token or topic" },
        { status: 400 }
      );
    }

    await admin.messaging().subscribeToTopic(token, topic);

    return NextResponse.json({
      success: true,
      message: `Subscribed to topic: ${topic}`,
    });
  } catch (error) {
    console.error("FCM topic subscription error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
