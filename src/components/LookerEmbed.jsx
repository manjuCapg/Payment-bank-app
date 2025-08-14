import React, { useEffect, useRef } from "react";
import { getEmbedSDK } from "@looker/embed-sdk";

const LookerEmbed = () => {
  const embedContainer = useRef(null);

  useEffect(() => {
    const runEmbed = async () => {
      try {
        const sdk = getEmbedSDK().init(
          "https://your.looker.instance.com",
          "/auth"
        ); // '/auth' is your backend endpoint for signed URLs

        const connection = await sdk
          .createDashboardWithId("11") // Replace with your dashboard ID
          .appendTo(embedContainer.current)
          .on("dashboard:run:start", () => console.log("Running"))
          .on("dashboard:run:complete", () => console.log("Done"))
          .build()
          .connect();

        // Optional: Interact with the dashboard
        if (connection.getPageType() === "dashboards") {
          connection.asDashboardConnection().run();
        }
      } catch (error) {
        console.error("Error embedding Looker:", error);
      }
    };

    runEmbed();
  }, []);

  return (
    <div ref={embedContainer} style={{ height: "600px", width: "100%" }} />
  );
};

export default LookerEmbed;
