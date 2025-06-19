"use client"
import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";

const tailwindBlocks = [
  // Layout
  {
    id: "tw-section",
    label: "Section",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="2" y="2" width="20" height="20" fill="#fff" stroke="#bdbdbd" stroke-width="2"/></svg>',
    content: '<section class="py-12 bg-gray-50"><div class="container mx-auto px-4">Section content</div></section>',
    category: "Layout",
  },
  {
    id: "tw-2col",
    label: "2 Columns",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="4" y="4" width="6" height="16" fill="#fff" stroke="#bdbdbd" stroke-width="2"/><rect x="14" y="4" width="6" height="16" fill="#fff" stroke="#bdbdbd" stroke-width="2"/></svg>',
    content: '<div class="grid grid-cols-2 gap-4"><div class="bg-white p-4 rounded shadow">Left</div><div class="bg-white p-4 rounded shadow">Right</div></div>',
    category: "Layout",
  },
  {
    id: "tw-divider",
    label: "Divider",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="4" y="11" width="16" height="2" fill="#bdbdbd"/></svg>',
    content: '<hr class="my-8 border-t border-gray-300"/>',
    category: "Layout",
  },
  // Basic
  {
    id: "tw-heading",
    label: "Heading",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><text x="6" y="18" font-size="14" fill="#757575">H</text></svg>',
    content: '<h2 class="text-3xl font-bold text-gray-800 mb-4">Tailwind Heading</h2>',
    category: "Basic",
  },
  {
    id: "tw-text",
    label: "Text",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><text x="6" y="18" font-size="14" fill="#757575">T</text></svg>',
    content: '<p class="text-gray-600">This is a paragraph using Tailwind CSS.</p>',
    category: "Basic",
  },
  {
    id: "tw-list",
    label: "List",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="6" y="7" width="12" height="2" fill="#bdbdbd"/><rect x="6" y="11" width="12" height="2" fill="#bdbdbd"/><rect x="6" y="15" width="12" height="2" fill="#bdbdbd"/></svg>',
    content: '<ul class="list-disc pl-6 text-gray-700"><li>List item 1</li><li>List item 2</li></ul>',
    category: "Basic",
  },
  // Media
  {
    id: "tw-image",
    label: "Image",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="4" y="4" width="16" height="16" fill="#fff" stroke="#bdbdbd" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="#bdbdbd"/></svg>',
    content: '<img src="https://placehold.co/600x400" alt="Tailwind Image" class="rounded shadow"/>',
    category: "Media",
  },
  {
    id: "tw-video",
    label: "Video",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><polygon points="9,7 19,12 9,17" fill="#1976d2"/></svg>',
    content: '<div class="aspect-w-16 aspect-h-9"><iframe class="w-full h-full rounded" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe></div>',
    category: "Media",
  },
  // Buttons & Forms
  {
    id: "tw-button",
    label: "Button",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="6" y="10" width="12" height="4" fill="#90caf9" stroke="#1976d2" stroke-width="2"/></svg>',
    content: '<button class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Tailwind Button</button>',
    category: "Buttons & Forms",
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
    category: "Buttons & Forms",
  },
  // Cards, Alerts, etc.
  {
    id: "tw-card",
    label: "Card",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="4" y="4" width="16" height="16" fill="#fff" stroke="#bdbdbd" stroke-width="2"/></svg>',
    content: '<div class="bg-white rounded-lg shadow p-6"><h3 class="text-xl font-semibold mb-2">Card Title</h3><p class="text-gray-600">Card content goes here.</p></div>',
    category: "Cards & Alerts",
  },
  {
    id: "tw-alert",
    label: "Alert",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#ffe082"/><text x="6" y="18" font-size="14" fill="#ff9800">!</text></svg>',
    content: '<div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert"><p class="font-bold">Alert</p><p>Something went wrong!</p></div>',
    category: "Cards & Alerts",
  },
  // Icons, Maps, Testimonials, Pricing, etc.
  {
    id: "tw-icon",
    label: "Icon",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ffd600"/></svg>',
    content: '<span class="text-4xl">⭐</span>',
    category: "Media",
  },
  {
    id: "tw-map",
    label: "Map",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><circle cx="12" cy="12" r="6" fill="#81c784"/></svg>',
    content: '<iframe src="https://maps.google.com/maps?q=New+York&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="250" frameborder="0" class="rounded" style="border:0;"></iframe>',
    category: "Media",
  },
  {
    id: "tw-testimonial",
    label: "Testimonial",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><circle cx="8" cy="12" r="3" fill="#90caf9"/><rect x="13" y="10" width="7" height="4" fill="#bdbdbd"/></svg>',
    content: '<div class="bg-white rounded-lg shadow p-6 flex flex-col items-center"><img src="https://randomuser.me/api/portraits/men/32.jpg" class="w-16 h-16 rounded-full mb-4"/><p class="text-gray-700 italic mb-2">"This is a testimonial block."</p><span class="text-gray-500">- John Doe</span></div>',
    category: "Cards & Alerts",
  },
  {
    id: "tw-pricing",
    label: "Pricing Table",
    media: '<svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#e0e0e0"/><rect x="4" y="8" width="16" height="8" fill="#fff" stroke="#bdbdbd" stroke-width="2"/></svg>',
    content: '<div class="bg-white rounded-lg shadow p-6 text-center"><h3 class="text-2xl font-bold mb-2">Pro Plan</h3><p class="text-4xl font-extrabold mb-4">$29<span class="text-lg font-normal">/mo</span></p><ul class="mb-4 text-gray-600"><li>✔ Feature 1</li><li>✔ Feature 2</li></ul><button class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Choose Plan</button></div>',
    category: "Cards & Alerts",
  },
];

export default function CreateFlowPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", margin: 0, padding: 0, boxSizing: "border-box", fontFamily: 'Inter, Arial, sans-serif', background: '#f7f8fa' }}>
      <div style={{ flex: 1, minHeight: 0, minWidth: 0, display: 'flex' }}>
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
                    header: { label: "Blocks", collapsible: true, style: { width: "360px" } },
                    symbols: true,
                  },
                  {
                    type: "canvas",
                    style: { background: "#f7f8fa", borderRadius: 8, margin: 0, border: '1px solid #e5e7eb', minHeight: '100%', minWidth: 0, flex: 1, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.03)' }
                  },
                  {
                    type: "panelProperties",
                    header: { label: "Properties", collapsible: true, style: { width: "360px" } },
                  },
                ]
              }
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
