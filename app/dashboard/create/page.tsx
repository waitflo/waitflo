"use client"

import dynamic from "next/dynamic"
import { types } from "react-bricks"

// Dynamically import Playground to avoid SSR issues
const Playground = dynamic(() => import("react-bricks-ui").then(mod => mod.Playground), { ssr: false })

export default function CreateFlowPage() {
  return (
    <div className="h-screen w-full bg-white text-black">
      {/* React Bricks Playground (visual editor) */}
      <Playground
        blocks={[]}
        // You can add your custom bricks/blocks here
      />
      <div className="fixed bottom-4 right-4 bg-purple-100 text-purple-800 px-4 py-2 rounded shadow">
        <b>Note:</b> For full React Bricks functionality, configure your credentials and custom blocks.
      </div>
    </div>
  )
}
