"use client";

import { useEffect, useRef, useState } from "react";
import { onMessage } from "firebase/messaging";
import { fetchToken, messaging } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { initializeWebViewBridge } from "@/lib/webViewFCMBridge";

async function getNotificationPermissionAndToken() {
  const { isInWebView, getFCMToken } = initializeWebViewBridge();

  if (isInWebView) {
    const externalToken = getFCMToken();
    if (externalToken) {
      return externalToken;
    }
    return null;
  }

  if (!("Notification" in window)) return null;

  if (Notification.permission === "granted") {
    return await fetchToken();
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      return await fetchToken();
    }
  }

  return null;
}

const useFcmToken = () => {
  const router = useRouter();
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState(null);
  const [token, setToken] = useState(null);
  const retryLoadToken = useRef(0);
  const isLoading = useRef(false);
  const [isWebView, setIsWebView] = useState(false);
  const fcmBridge = useRef(null);

  useEffect(() => {
    fcmBridge.current = initializeWebViewBridge();
    setIsWebView(fcmBridge.current.isInWebView);

    const handleExternalToken = (event) => {
      setToken(event.detail.token);
      setNotificationPermissionStatus("granted");
    };

    window.addEventListener("fcmTokenReceived", handleExternalToken);
    return () => window.removeEventListener("fcmTokenReceived", handleExternalToken);
  }, []);

  const loadToken = async () => {
    if (isLoading.current) return;
    isLoading.current = true;

    const fetchedToken = await getNotificationPermissionAndToken();

    if (fcmBridge.current?.isInWebView) {
      if (fetchedToken) {
        setToken(fetchedToken);
        setNotificationPermissionStatus("granted");

        try {
          await fetch("/api/subscribe-topic", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: fetchedToken, topic: "all" }),
          });
        } catch (err) {
          console.error("Failed to subscribe to topic:", err);
        }
      }

      isLoading.current = false;
      return;
    }

    if (Notification.permission === "denied") {
      setNotificationPermissionStatus("denied");
      isLoading.current = false;
      return;
    }

    if (!fetchedToken) {
      if (retryLoadToken.current >= 3) {
        alert("Unable to load token, refresh the browser");
        isLoading.current = false;
        return;
      }

      retryLoadToken.current += 1;
      isLoading.current = false;
      await loadToken();
      return;
    }

    setNotificationPermissionStatus(Notification.permission);
    setToken(fetchedToken);

    try {
      await fetch("/api/subscribe-topic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: fetchedToken, topic: "all" }),
      });
    } catch (err) {
      console.error("Failed to subscribe to topic:", err);
    }

    isLoading.current = false;
  };

  useEffect(() => {
    if ("Notification" in window || fcmBridge.current?.isInWebView) {
      loadToken();
    }
  }, [isWebView]);

  useEffect(() => {
    const setupListener = async () => {
      if (!token || fcmBridge.current?.isInWebView) return;

      const m = await messaging();
      if (!m) return;

      const unsubscribe = onMessage(m, (payload) => {
        if (Notification.permission !== "granted") return;

        const link = payload.fcmOptions?.link || payload.data?.link;

        toast.info(
          `${payload.notification?.title}: ${payload.notification?.body}`,
          link
            ? {
                action: {
                  label: "Visit",
                  onClick: () => router.push(link),
                },
              }
            : undefined
        );

        const n = new Notification(payload.notification?.title || "New message", {
          body: payload.notification?.body || "This is a new message",
          data: link ? { url: link } : undefined,
        });

        n.onclick = (event) => {
          const link = event.target?.data?.url;
          if (link) router.push(link);
        };
      });

      return unsubscribe;
    };

    let unsubscribe = null;
    setupListener().then((unsub) => {
      if (unsub) unsubscribe = unsub;
    });

    return () => unsubscribe?.();
  }, [token, router]);

  const sendTestNotification = async () => {
    if (fcmBridge.current?.isInWebView) {
      const sent = fcmBridge.current.sendNotificationToNative(
        "Test Notification",
        "This is a test notification from WebView",
        { link: "/contact" }
      );
      if (sent) return true;
    }

    const response = await fetch("/api/send-notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        title: "Test Notification",
        message: "This is a test notification",
        data: { link: "/contact" },
      }),
    });

    const data = await response.json();
    return data.success;
  };

  return {
    token,
    notificationPermissionStatus,
    isWebView: fcmBridge.current?.isInWebView || false,
    sendTestNotification,
  };
};

export default useFcmToken;
