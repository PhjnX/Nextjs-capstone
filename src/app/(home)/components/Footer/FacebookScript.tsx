import { useEffect } from "react";

declare global {
  interface Window {
    FB: any;
  }
}

function FacebookScript() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.getElementById("facebook-jssdk")) {
        const script = document.createElement("script");
        script.id = "facebook-jssdk";
        script.src =
          "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
          if (window.FB) {
            window.FB.init({
              xfbml: true,
              version: "v18.0",
            });
            window.FB.XFBML.parse();
          }
        };
      } else {
        // Nếu SDK đã tải, chỉ cần parse lại để hiển thị plugin
        window.FB?.XFBML.parse();
      }
    }
  }, []);

  return null;
}

export default FacebookScript;
