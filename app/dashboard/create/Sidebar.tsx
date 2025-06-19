import { useEditor, Element } from "@craftjs/core"
import { Text, Button, Image, Header, Divider } from "./blocks"

export function Sidebar() {
  return (
    <aside className="w-64 h-full bg-black text-white flex flex-col p-6 border-r border-purple-700">
      <h2 className="text-xl font-bold mb-6 text-purple-400">Blocks</h2>
      <div className="flex flex-col gap-4">
        <Element is={Text} canvas className="p-3 rounded-lg bg-gray-900 hover:bg-purple-900 border border-purple-700 cursor-pointer">Text</Element>
        <Element is={Header} canvas className="p-3 rounded-lg bg-gray-900 hover:bg-purple-900 border border-purple-700 cursor-pointer">Header</Element>
        <Element is={Button} canvas className="p-3 rounded-lg bg-gray-900 hover:bg-purple-900 border border-purple-700 cursor-pointer">Button</Element>
        <Element is={Image} canvas className="p-3 rounded-lg bg-gray-900 hover:bg-purple-900 border border-purple-700 cursor-pointer">Image</Element>
        <Element is={Divider} canvas className="p-3 rounded-lg bg-gray-900 hover:bg-purple-900 border border-purple-700 cursor-pointer">Divider</Element>
      </div>
    </aside>
  )
} 