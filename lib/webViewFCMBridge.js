export function initializeWebViewBridge() {
  const isInWebView =
    typeof window !== "undefined" && window.ReactNativeWebView;
  let externalFCMToken = null;

  if (isInWebView) {
    window.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "FCM_TOKEN") {
          externalFCMToken = data.token;
          localStorage.setItem("externalFCMToken", data.token);

          window.dispatchEvent(
            new CustomEvent("fcmTokenReceived", {
              detail: { token: data.token },
            })
          );
        }
      } catch (error) {
        console.error("Error parsing message from React Native:", error);
      }
    });

    if (window.ReactNativeWebView?.postMessage) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: "WEB_VIEW_READY" })
      );
    }
  }

  const getFCMToken = () => {
    if (isInWebView) {
      return externalFCMToken || localStorage.getItem("externalFCMToken");
    }
    return null;
  };

  const sendNotificationToNative = (
    title,
    message,
    data = { link: "/contact" }
  ) => {
    if (isInWebView && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "SHOW_NOTIFICATION",
          notification: {
            title,
            body: message,
            data,
          },
        })
      );
      return true;
    }
    return false;
  };

  return {
    isInWebView,
    getFCMToken,
    sendNotificationToNative,
  };
}
