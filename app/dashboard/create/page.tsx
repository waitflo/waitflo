"use client"

import { useEffect, useRef, useState } from "react"
import grapesjs from "grapesjs"
import "grapesjs/dist/css/grapes.min.css"
import { Plus, LayoutGrid, LayoutList, Layout } from "lucide-react"

const GRID_BLOCKS = [
  {
    label: "1 Column",
    html: `<div class='grid grid-cols-1 gap-4'><div class='bg-purple-50 p-8 rounded'>Column 1</div></div>`
  },
  {
    label: "2 Columns",
    html: `<div class='grid grid-cols-2 gap-4'><div class='bg-purple-50 p-8 rounded'>Column 1</div><div class='bg-purple-50 p-8 rounded'>Column 2</div></div>`
  },
  {
    label: "3 Columns",
    html: `<div class='grid grid-cols-3 gap-4'><div class='bg-purple-50 p-8 rounded'>Column 1</div><div class='bg-purple-50 p-8 rounded'>Column 2</div><div class='bg-purple-50 p-8 rounded'>Column 3</div></div>`
  },
]

export default function CreateFlowPage() {
  const editorRef = useRef<any>(null)
  const [showGridModal, setShowGridModal] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)

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
    // Elementor-like black sidebar, purple accent, white text
    const style = document.createElement("style")
    style.innerHTML = `
      #gjs-blocks {
        min-width: 240px;
        max-width: 320px;
        background: #18181b !important;
        color: #fff !important;
        border-right: 2px solid #a78bfa;
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
      #gjs-blocks .gjs-block {
        background: #232136 !important;
        color: #fff !important;
        border-radius: 0.5rem;
        border: 1px solid #a78bfa;
        box-shadow: 0 1px 4px 0 #ede9fe;
      }
      #gjs-blocks .gjs-block-label { color: #a78bfa !important; }
      #gjs-blocks .gjs-block:hover { border-color: #a78bfa !important; background: #2d1e4a !important; }
      .gjs-block-category { color: #fff !important; }
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
          border-bottom: 2px solid #a78bfa;
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
    // Listen for changes to update isEmpty
    const updateIsEmpty = () => {
      setIsEmpty(editor.getHtml().trim() === "")
    }
    editor.on("component:add", updateIsEmpty)
    editor.on("component:remove", updateIsEmpty)
    updateIsEmpty()
    return () => {
      editor.destroy()
      style.remove()
    }
  }, [])

  // Insert grid block into GrapesJS
  const handleGridSelect = (html: string) => {
    setShowGridModal(false)
    if (editorRef.current) {
      editorRef.current.setComponents(html)
    }
    setIsEmpty(false)
  }

  return (
    <div className="h-[calc(100vh-80px)] w-full bg-white flex flex-col items-center justify-center">
      <div className="gjs-editor-cont relative flex-1 flex w-full max-w-7xl mx-auto overflow-hidden" style={{height: 'calc(100vh - 80px)'}}>
        <div id="gjs-blocks" />
        <div id="gjs" className="flex-1 h-full w-full flex items-center justify-center">
          {isEmpty && (
            <button
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg text-5xl z-30 border-4 border-white"
              onClick={() => setShowGridModal(true)}
              style={{ outline: 'none' }}
            >
              <Plus className="w-16 h-16" />
              <span className="text-xs font-semibold mt-2">Add Grid</span>
            </button>
          )}
        </div>
        {/* Grid Modal */}
        {showGridModal && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col gap-6 min-w-[320px]">
              <h2 className="text-lg font-bold text-purple-700 mb-2">Choose a grid layout</h2>
              <div className="flex gap-4">
                {GRID_BLOCKS.map((g, i) => (
                  <button
                    key={g.label}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-purple-200 hover:border-purple-600 transition bg-purple-50"
                    onClick={() => handleGridSelect(g.html)}
                  >
                    {i === 0 && <LayoutList className="w-8 h-8 text-purple-600" />}
                    {i === 1 && <LayoutGrid className="w-8 h-8 text-purple-600" />}
                    {i === 2 && <Layout className="w-8 h-8 text-purple-600" />}
                    <span className="font-medium text-purple-700">{g.label}</span>
                  </button>
                ))}
              </div>
              <button className="mt-4 text-sm text-gray-500 hover:text-purple-600" onClick={() => setShowGridModal(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
