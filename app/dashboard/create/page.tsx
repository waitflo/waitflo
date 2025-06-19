"use client"
import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";

export default function CreateFlowPage() {
  return (
    <StudioEditor
      options={{
        licenseKey: "72c0afb552204916b048eddf857fdb841e8a99399a50486e82f1170d9bb1dd31",
        blocks: {
          default: [
            {
              id: 'my-block-image',
              label: 'My Image',
              media: '<svg viewBox="0 0 24 24"><path d="M20 5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h16M5 16h14l-4.5-6-3.5 4.5-2.5-3L5 16Z"/></svg>',
              content: { type: 'image', src: 'https://picsum.photos/seed/my-image/100/100' }
            },
            {
              id: 'my-block-section',
              label: 'My Section',
              media: '<svg viewBox="0 0 24 24"><path d="M21 3H3c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h18c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1m0 10H3c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h18c.6 0 1-.4 1-1v-6c0-.6-.4-1-1-1Z"/></svg>',
              content: {
                tagName: 'section',
                style: { padding: '25px', background: '#f3f3f3' },
                components: [
                  { tagName: 'h1', components: 'Section' },
                  { type: 'image', src: 'https://picsum.photos/seed/my-image/100/100' }
                ]
              }
            },
            {
              id: 'my-block-section-html',
              label: 'My HTML',
              media: '<svg viewBox="0 0 24 24"><path d="M21 3H3c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h18c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1m0 10H3c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h18c.6 0 1-.4 1-1v-6c0-.6-.4-1-1-1Z"/></svg>',
              content: `\
                <section style=\"padding: 25px; background: #f3f3f3\">\
                  <h1>Section (HTML)</h1>\
                  <img src=\"https://picsum.photos/seed/my-image/100/100\" />\
                </section>\
              `
            }
          ]
        },
        project: {
          default: {
            pages: [ { name: 'Home', component: '<h1>Blocks demo project</h1>' } ]
          },
        },
        layout: {
          default: {
            type: 'row',
            style: { height: '100%' },
            children: [
              {
                type: 'panelBlocks',
                header: { label: 'Blocks', collapsible: false, style: { width: '300px' } },
                symbols: false,
              },
              { type: 'canvas' }
            ]
          }
        },
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
    />
  );
}
