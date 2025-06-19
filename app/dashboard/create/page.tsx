"use client"
import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";

const elementorBlocks = [
  {
    id: "section",
    label: "Section",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="2" y="2" width="20" height="20" fill="#fff" stroke="#bdbdbd" stroke-width="2"/></svg>',
    content: '<section class="gjs-section" style="padding: 40px 0; background-color: #f8f9fa;"><div class="gjs-container" style="max-width: 1200px; margin: 0 auto;"></div></section>',
    category: "Layout",
  },
  {
    id: "column",
    label: "Column",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="4" y="4" width="6" height="16" fill="#fff" stroke="#bdbdbd" stroke-width="2"/><rect x="14" y="4" width="6" height="16" fill="#fff" stroke="#bdbdbd" stroke-width="2"/></svg>',
    content: '<div class="gjs-column" style="min-height: 75px; padding: 10px;"></div>',
    category: "Layout",
  },
  {
    id: "text",
    label: "Text",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><text x="6" y="18" font-size="14" fill="#757575">T</text></svg>',
    content: '<div style="padding: 10px;"><p style="margin:0;">Insert your text here</p></div>',
    category: "Basic",
  },
  {
    id: "heading",
    label: "Heading",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><text x="6" y="18" font-size="14" fill="#757575">H</text></svg>',
    content: '<h2 style="margin:0;">Heading</h2>',
    category: "Basic",
  },
  {
    id: "image",
    label: "Image",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="4" y="4" width="16" height="16" fill="#fff" stroke="#bdbdbd" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="#bdbdbd"/></svg>',
    content: { type: "image" },
    category: "Basic",
  },
  {
    id: "button",
    label: "Button",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="6" y="10" width="12" height="4" fill="#90caf9" stroke="#1976d2" stroke-width="2"/></svg>',
    content: '<button style="padding: 10px 30px; background: #1976d2; color: #fff; border: none; border-radius: 4px;">Button</button>',
    category: "Basic",
  },
  {
    id: "video",
    label: "Video",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><polygon points="9,7 19,12 9,17" fill="#1976d2"/></svg>',
    content: { type: "video" },
    category: "Media",
  },
  {
    id: "map",
    label: "Map",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><circle cx="12" cy="12" r="6" fill="#81c784"/></svg>',
    content: '<iframe src="https://maps.google.com/maps?q=New+York&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="250" frameborder="0" style="border:0;"></iframe>',
    category: "Media",
  },
  {
    id: "divider",
    label: "Divider",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="4" y="11" width="16" height="2" fill="#bdbdbd"/></svg>',
    content: '<hr style="margin: 20px 0; border: none; border-top: 1px solid #bdbdbd;"/>',
    category: "Basic",
  },
  {
    id: "list",
    label: "List",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="6" y="7" width="12" height="2" fill="#bdbdbd"/><rect x="6" y="11" width="12" height="2" fill="#bdbdbd"/><rect x="6" y="15" width="12" height="2" fill="#bdbdbd"/></svg>',
    content: '<ul style="padding-left: 20px;"><li>List item 1</li><li>List item 2</li></ul>',
    category: "Basic",
  },
  {
    id: "form",
    label: "Form",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="6" y="7" width="12" height="2" fill="#bdbdbd"/><rect x="6" y="11" width="12" height="2" fill="#bdbdbd"/><rect x="6" y="15" width="12" height="2" fill="#bdbdbd"/></svg>',
    content: '<form style="display: flex; flex-direction: column; gap: 10px;"><input type="text" placeholder="Name" style="padding: 8px; border: 1px solid #bdbdbd; border-radius: 4px;"/><input type="email" placeholder="Email" style="padding: 8px; border: 1px solid #bdbdbd; border-radius: 4px;"/><button type="submit" style="padding: 10px 30px; background: #1976d2; color: #fff; border: none; border-radius: 4px;">Submit</button></form>',
    category: "Forms",
  },
  {
    id: "icon",
    label: "Icon",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ffd600"/></svg>',
    content: '<span style="font-size: 32px;">⭐</span>',
    category: "Media",
  },
];

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
            blockManager: {
              blocks: elementorBlocks,
              appendTo: undefined,
              custom: false,
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
