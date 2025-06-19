"use client"

import { Editor, Frame, Element, Canvas } from "@craftjs/core"
import { Sidebar } from "./Sidebar"
import { InspectorPanel } from "./InspectorPanel"
import { Text, Button, Image, Header, Divider } from "./blocks"

export default function CreateFlowPage() {
  return (
    <div className="h-screen w-full flex bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Canvas - full width, edge-to-edge */}
      <div className="flex-1 flex flex-col bg-white text-black relative min-w-0">
        <Editor resolver={{ Text, Button, Image, Header, Divider }}>
          <Frame>
            <Canvas is={Element} canvas className="min-h-screen w-full mx-auto bg-white" />
          </Frame>
          <InspectorPanel />
        </Editor>
      </div>
    </div>
  )
}
