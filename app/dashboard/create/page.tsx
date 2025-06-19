"use client"
import { Studio } from "@grapesjs/studio-sdk";
import "@grapesjs/studio-sdk/dist/assets/grapesjs-studio.min.css";
import { useCallback } from "react";

export default function CreateFlowPage() {
  // Custom block definition
  const customBlock = {
    id: "my-block",
    label: "My Block",
    content: `<div style=\"padding:20px; background:#f0f0f0; border:1px solid #ccc;\">Custom Block</div>`,
    category: "Basic",
  };

  // Custom storage manager using localStorage
  const storageManager = {
    type: "local", // Use localStorage
    autosave: true,
    autoload: true,
    stepsBeforeSave: 1,
    options: {
      local: {
        key: "gjs-custom-create-flow", // Unique key for this editor
      },
    },
  };

  // Editor options
  const options = {
    height: "100vh",
    storageManager,
    blockManager: {
      appendTo: "#blocks",
    },
    panels: {
      defaults: [
        {
          id: "blocks",
          el: "#blocks",
          resizable: { maxDim: 350, minDim: 200, tc: 0, cl: 1, cr: 0, bc: 0 },
        },
      ],
    },
    plugins: [],
    pluginsOpts: {},
  };

  // Add custom block on editor ready
  const handleReady = useCallback((editor) => {
    editor.BlockManager.add(customBlock);
  }, []);

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      {/* Block panel */}
      <div id="blocks" style={{ width: 250, background: "#fafafa", borderRight: "1px solid #eee" }} />
      {/* GrapesJS Studio */}
      <Studio
        id="advanced-grapesjs-editor"
        options={options}
        onReady={handleReady}
      />
    </div>
  );
}
