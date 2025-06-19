"use client"
import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";

export default function CreateFlowPage() {
  return (
    <StudioEditor
      options={{
        licenseKey: "72c0afb552204916b048eddf857fdb841e8a99399a50486e82f1170d9bb1dd31",
        project: {
          type: "web",
          id: "UNIQUE_PROJECT_ID", // TODO: Replace with a real unique project ID
        },
        identity: {
          id: "UNIQUE_END_USER_ID", // TODO: Replace with a real unique user ID
        },
        assets: {
          storageType: "cloud",
        },
        storage: {
          type: "cloud",
          autosaveChanges: 100,
          autosaveIntervalMs: 10000,
        },
      }}
    />
  );
}
