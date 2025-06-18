"use client"

import { useEffect, useRef } from "react"
import grapesjs from "grapesjs"
import "grapesjs/dist/css/grapes.min.css"

export default function CreateFlowPage() {
  const editorRef = useRef<any>(null)

  useEffect(() => {
    if (editorRef.current) return // Prevent double init
    const editor = grapesjs.init({
      container: "#gjs",
      height: "calc(100vh - 32px)",
      width: "100%",
      fromElement: false,
      storageManager: false,
      panels: { defaults: [] },
      blockManager: {
        appendTo: "#gjs-blocks",
        blocks: [
          {
            id: "section",
            label: "Section",
            attributes: { class: "gjs-block-section" },
            content: `<section class='p-8 bg-gray-900 rounded-xl'><h1 class='text-3xl text-white'>Section Title</h1></section>`
          },
          {
            id: "text",
            label: "Text",
            content: '<div class="text-white">Insert your text here</div>'
          },
          {
            id: "image",
            label: "Image",
            content: { type: "image" }
          },
          {
            id: "video",
            label: "Video",
            content: { type: "video" }
          },
          {
            id: "button",
            label: "Button",
            content: '<button class="bg-purple-600 text-white px-4 py-2 rounded">Button</button>'
          },
          {
            id: "header",
            label: "Header",
            content: '<h2 class="text-2xl text-white">Header</h2>'
          },
          {
            id: "columns",
            label: "Columns",
            content: '<div class="grid grid-cols-2 gap-4"><div class="bg-gray-800 p-4 rounded">Column 1</div><div class="bg-gray-800 p-4 rounded">Column 2</div></div>'
          },
        ]
      },
      styleManager: {
        sectors: [
          {
            name: "General",
            open: false,
            buildProps: ["float", "display", "position", "top", "right", "left", "bottom"],
          },
          {
            name: "Dimension",
            open: false,
            buildProps: ["width", "min-height", "padding"],
          },
          {
            name: "Typography",
            open: false,
            buildProps: ["font-family", "font-size", "font-weight", "color", "line-height", "letter-spacing", "text-align", "text-shadow"],
          },
          {
            name: "Decorations",
            open: false,
            buildProps: ["background-color", "border-radius", "box-shadow", "background"],
          },
        ],
      },
    })
    editorRef.current = editor
    // Dark theme tweaks
    const style = document.createElement("style")
    style.innerHTML = `
      body, #gjs, .gjs-cv-canvas, .gjs-blocks-cs {
        background: #000 !important;
        color: #fff !important;
      }
      .gjs-block {
        background: #18181b !important;
        color: #fff !important;
        border-radius: 0.5rem;
        border: 1px solid #27272a;
      }
      .gjs-block-label { color: #a78bfa !important; }
      .gjs-block-category { color: #fff !important; }
      .gjs-one-bg { background: #18181b !important; }
      .gjs-two-color { color: #a78bfa !important; }
      .gjs-pn-panel, .gjs-pn-views-container { background: #18181b !important; }
      .gjs-sm-sector .gjs-sm-title { color: #a78bfa !important; }
      .gjs-sm-sector .gjs-sm-properties { background: #18181b !important; }
      .gjs-field, .gjs-input-holder input, .gjs-input-holder textarea {
        background: #18181b !important;
        color: #fff !important;
        border: 1px solid #27272a !important;
      }
      #gjs-blocks {
        min-width: 220px;
        max-width: 320px;
        background: #111 !important;
        border-right: 1px solid #27272a;
        padding: 0.5rem 0.5rem 0.5rem 1.5rem;
        height: calc(100vh - 32px);
        overflow-y: auto;
        position: absolute;
        left: 0;
        top: 32px;
        z-index: 20;
      }
      #gjs {
        margin-left: 220px;
        height: calc(100vh - 32px);
        width: calc(100vw - 220px);
        background: #000 !important;
      }
      @media (max-width: 900px) {
        #gjs-blocks {
          position: static;
          min-width: 0;
          max-width: none;
          width: 100vw;
          height: auto;
          border-right: none;
          border-bottom: 1px solid #27272a;
          margin-left: 0;
          padding-left: 0.5rem;
        }
        #gjs {
          margin-left: 0;
          width: 100vw;
        }
      }
    `
    document.head.appendChild(style)
    return () => {
      editor.destroy()
      style.remove()
    }
  }, [])

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col">
      <div className="w-full flex items-center justify-between px-8 py-4 border-b border-gray-800 bg-black z-30" style={{height:32}}>
        <h1 className="text-xl font-bold text-white">Create Flow</h1>
        <span className="text-purple-400 text-sm">Powered by GrapesJS</span>
      </div>
      <div className="relative flex-1 flex overflow-hidden">
        <div id="gjs-blocks" />
        <div id="gjs" className="flex-1 h-full w-full" />
      </div>
    </div>
  )
}
