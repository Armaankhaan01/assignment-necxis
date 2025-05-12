# assignment-necxis 🌐🚀

This is a **Next.js** application that acts as the companion frontend/backend service for the [expo-fcm-webview](https://github.com/armaankhaan01/expo-fcm-webview) mobile app.

Its main role is to:

- Register FCM tokens sent from the mobile app
- Subscribe users to topics or channels
- Send notifications to devices
- Render a responsive web interface accessible via a WebView

---

## 🔧 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/armaankhaan01/assignment-necxis.git
cd assignment-necxis
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase (Required)

Create a `.env.local` file and add your Firebase config and google auth credentials

```env
GOOGLE_CLIENT_ID=google-client-id
GOOGLE_CLIENT_SECRET=google-client-id
NEXTAUTH_URL=auth_url
NEXTAUTH_SECRET=any_random_string_for_jwt_encryption
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL=your-client-email@your-project-id.iam.gserviceaccount.com
NEXT_PUBLIC_FIREBASE_PRIVATE_KEY="your-private-key"
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_SENDER_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your-vapid-key
```


---

### 4. Start the app

```bash
npm run dev
```

App will run at: [http://localhost:3000](http://localhost:3000)

You can now open this in a browser or connect to it via the Expo WebView app.

---

## 📱 Connect With the Mobile App

To fully utilize this project, pair it with the companion mobile app:

> [Expo FCM WebView Repo](https://github.com/armaankhaan01/expo-fcm-webview)

Make sure the WebView inside the Expo app points to:

```
http://<your-local-ip>:3000
```

---

## 🔔 Notification Sending (Example API)

You can expose an API route like `/api/sendNotification` to handle POST requests with payloads like:

```json
{
  "token": "user-device-token",
  "title": "Hello",
  "body": "This is a test message"
}
```

Or use [topic messaging](https://firebase.google.com/docs/cloud-messaging/js/topic-messaging) for group notifications.

---

## 🧪 Test & Dev Tools

- Firebase Admin SDK
- Firebase Cloud Messaging
- Next.js API routes for server-side logic
- Integrated with the Expo WebView mobile app


## 🤝 Connect with Me

- GitHub: [@armaankhaan01](https://github.com/armaankhaan01)
- Companion app: [expo-fcm-webview](https://github.com/armaankhaan01/expo-fcm-webview)

---

Built with 🔥 using Next.js + Firebase

```
