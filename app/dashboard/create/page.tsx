"use client"
import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";

export default function CreateFlowPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", margin: 0, padding: 0, boxSizing: "border-box" }}>
      {/* The header is assumed to be rendered by the app layout, so we just fill the rest */}
      <div style={{ flex: 1, minHeight: 0, minWidth: 0 }}>
        <StudioEditor
          options={{
            licenseKey: "72c0afb552204916b048eddf857fdb841e8a99399a50486e82f1170d9bb1dd31",
            project: {
              type: "web",
              id: "UNIQUE_PROJECT_ID",
            },
            identity: {
              id: "UNIQUE_END_USER_ID",
            },
            assets: {
              storageType: "cloud",
            },
            storage: {
              type: "cloud",
              autosaveChanges: 100,
              autosaveIntervalMs: 10000,
            },
            layout: {
              default: {
                type: "row",
                style: { height: "100%" },
                children: [
                  {
                    type: "panelBlocks",
                    header: { label: "Blocks", collapsible: true, style: { width: "300px" } },
                    symbols: true,
                  },
                  {
                    type: "panelPages",
                    header: { label: "Pages", collapsible: true, style: { width: "200px" } },
                  },
                  {
                    type: "panelAssets",
                    header: { label: "Assets", collapsible: true, style: { width: "200px" } },
                  },
                  {
                    type: "panelGlobalStyles",
                    header: { label: "Global Styles", collapsible: true, style: { width: "200px" } },
                  },
                  {
                    type: "panelTemplates",
                    header: { label: "Templates", collapsible: true, style: { width: "200px" } },
                  },
                  { type: "canvas" }
                ]
              }
            },
          }}
        />
      </div>
    </div>
  );
}
