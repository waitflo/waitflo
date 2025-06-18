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
      height: "calc(100vh - 80px)",
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
            content: `<section class='p-8 bg-white rounded-xl border border-purple-200'><h1 class='text-3xl text-purple-700'>Section Title</h1></section>`
          },
          {
            id: "text",
            label: "Text",
            content: '<div class="text-gray-700">Insert your text here</div>'
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
            content: '<h2 class="text-2xl text-purple-700">Header</h2>'
          },
          {
            id: "columns",
            label: "Columns",
            content: '<div class="grid grid-cols-2 gap-4"><div class="bg-purple-50 p-4 rounded">Column 1</div><div class="bg-purple-50 p-4 rounded">Column 2</div></div>'
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
    // Elementor-like white/purple theme, block panel fits full height
    const style = document.createElement("style")
    style.innerHTML = `
      body, #gjs, .gjs-cv-canvas, .gjs-blocks-cs {
        background: #fff !important;
        color: #4b006e !important;
      }
      .gjs-block {
        background: #fff !important;
        color: #4b006e !important;
        border-radius: 0.5rem;
        border: 1px solid #e9d5ff;
        box-shadow: 0 1px 4px 0 #ede9fe;
      }
      .gjs-block-label { color: #a78bfa !important; }
      .gjs-block-category { color: #4b006e !important; }
      .gjs-one-bg { background: #fff !important; }
      .gjs-two-color { color: #a78bfa !important; }
      .gjs-pn-panel, .gjs-pn-views-container { background: #fff !important; }
      .gjs-sm-sector .gjs-sm-title { color: #a78bfa !important; }
      .gjs-sm-sector .gjs-sm-properties { background: #fff !important; }
      .gjs-field, .gjs-input-holder input, .gjs-input-holder textarea {
        background: #fff !important;
        color: #4b006e !important;
        border: 1px solid #e9d5ff !important;
      }
      #gjs-blocks {
        min-width: 240px;
        max-width: 320px;
        background: #fff !important;
        border-right: 2px solid #e9d5ff;
        padding: 1.5rem 1rem 1.5rem 2rem;
        height: 100%;
        overflow-y: auto;
        position: sticky;
        left: 0;
        top: 0;
        z-index: 20;
        align-self: stretch;
        display: flex;
        flex-direction: column;
      }
      #gjs {
        height: 100%;
        width: 100%;
        max-width: 1200px;
        margin-right: auto;
        margin-left: 0;
        background: #fff !important;
        border: 2px dashed #a78bfa !important;
        border-radius: 1rem;
        box-shadow: 0 0 0 1px #e9d5ff;
        transition: none !important;
      }
      .gjs-editor-cont {
        display: flex;
        height: 100%;
        min-height: 600px;
      }
      @media (max-width: 1200px) {
        #gjs {
          max-width: 100vw;
        }
      }
      @media (max-width: 900px) {
        #gjs-blocks {
          position: static;
          min-width: 0;
          max-width: none;
          width: 100vw;
          height: auto;
          border-right: none;
          border-bottom: 2px solid #e9d5ff;
          margin-left: 0;
          padding-left: 1rem;
          top: 0;
        }
        #gjs {
          margin-left: 0;
          width: 100vw;
          max-width: 100vw;
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
    <div className="h-[calc(100vh-80px)] w-full bg-white flex flex-col items-center justify-center">
      <div className="gjs-editor-cont relative flex-1 flex w-full max-w-7xl mx-auto overflow-hidden" style={{height: 'calc(100vh - 80px)'}}>
        <div id="gjs-blocks" />
        <div id="gjs" className="flex-1 h-full w-full" />
      </div>
    </div>
  )
}
