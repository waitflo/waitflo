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
  // Remove GrapesJS React integration, use iframe instead
  return (
    <div className="h-[calc(100vh-80px)] w-full bg-white flex flex-col items-center justify-center">
      <iframe
        src="/grapesjs-iframe.html"
        title="Visual Builder"
        style={{ width: '100%', height: 'calc(100vh - 80px)', border: 'none', maxWidth: 1200 }}
        className="mx-auto rounded-xl shadow-lg"
        id="grapesjs-iframe"
      />
    </div>
  )
}
