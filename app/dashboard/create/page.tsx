"use client"
import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";

const tailwindBlocks = [
  {
    id: "tw-section",
    label: "Section",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="2" y="2" width="20" height="20" fill="#fff" stroke="#bdbdbd" stroke-width="2"/></svg>',
    content: '<section class="py-12 bg-gray-50"><div class="container mx-auto px-4">Section content</div></section>',
    category: "Tailwind",
  },
  {
    id: "tw-button",
    label: "Button",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="6" y="10" width="12" height="4" fill="#90caf9" stroke="#1976d2" stroke-width="2"/></svg>',
    content: '<button class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Tailwind Button</button>',
    category: "Tailwind",
  },
  {
    id: "tw-form",
    label: "Form",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="6" y="7" width="12" height="2" fill="#bdbdbd"/><rect x="6" y="11" width="12" height="2" fill="#bdbdbd"/><rect x="6" y="15" width="12" height="2" fill="#bdbdbd"/></svg>',
    content: `<form class="space-y-4 max-w-md mx-auto p-6 bg-white rounded shadow">
      <input type="text" placeholder="Name" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input type="email" placeholder="Email" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button type="submit" class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Submit</button>
    </form>`,
    category: "Tailwind",
  },
  {
    id: "tw-heading",
    label: "Heading",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><text x="6" y="18" font-size="14" fill="#757575">H</text></svg>',
    content: '<h2 class="text-3xl font-bold text-gray-800 mb-4">Tailwind Heading</h2>',
    category: "Tailwind",
  },
  {
    id: "tw-text",
    label: "Text",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><text x="6" y="18" font-size="14" fill="#757575">T</text></svg>',
    content: '<p class="text-gray-600">This is a paragraph using Tailwind CSS.</p>',
    category: "Tailwind",
  },
  {
    id: "tw-card",
    label: "Card",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="4" y="4" width="16" height="16" fill="#fff" stroke="#bdbdbd" stroke-width="2"/></svg>',
    content: '<div class="bg-white rounded-lg shadow p-6"><h3 class="text-xl font-semibold mb-2">Card Title</h3><p class="text-gray-600">Card content goes here.</p></div>',
    category: "Tailwind",
  },
];

export default function CreateFlowPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", margin: 0, padding: 0, boxSizing: "border-box" }}>
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
          }}
          onEditor={editor => {
            // Inject Tailwind CSS into the canvas
            const doc = editor.Canvas.getDocument();
            const tailwindId = 'tailwind-cdn';
            if (!doc.getElementById(tailwindId)) {
              const link = doc.createElement('link');
              link.id = tailwindId;
              link.rel = 'stylesheet';
              link.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css';
              doc.head.appendChild(link);
            }
            // Register Tailwind blocks
            tailwindBlocks.forEach(block => {
              editor.Blocks.add(block.id, block);
            });
          }}
        />
      </div>
    </div>
  );
}
