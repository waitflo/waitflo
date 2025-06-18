"use client"

import { useState } from "react"
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"
import { GripVertical } from "lucide-react"

const BLOCK_PALETTE = [
  { id: "hero", label: "Hero Section" },
  { id: "features", label: "Features" },
  { id: "testimonials", label: "Testimonials" },
  { id: "cta", label: "Call to Action" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
]

const BLOCK_PREVIEWS: Record<string, JSX.Element> = {
  hero: (
    <div className="p-4 text-center">
      <div className="text-2xl font-bold mb-2">Hero Section</div>
      <div className="text-gray-400">Big headline, subheadline, and CTA button</div>
    </div>
  ),
  features: (
    <div className="p-4">
      <div className="font-semibold mb-2">Features</div>
      <ul className="text-gray-400 list-disc ml-6">
        <li>Feature 1</li>
        <li>Feature 2</li>
        <li>Feature 3</li>
      </ul>
    </div>
  ),
  testimonials: (
    <div className="p-4">
      <div className="font-semibold mb-2">Testimonials</div>
      <div className="italic text-gray-400">"This product changed my life!"</div>
    </div>
  ),
  cta: (
    <div className="p-4 text-center">
      <div className="font-semibold mb-2">Call to Action</div>
      <Button className="bg-purple-600 text-white mt-2">Get Started</Button>
    </div>
  ),
  pricing: (
    <div className="p-4">
      <div className="font-semibold mb-2">Pricing</div>
      <div className="text-gray-400">$19/mo, $49/mo, $99/mo</div>
    </div>
  ),
  faq: (
    <div className="p-4">
      <div className="font-semibold mb-2">FAQ</div>
      <div className="text-gray-400">Q: Is this easy to use?<br/>A: Yes!</div>
    </div>
  ),
}

type Block = {
  id: string
  type: string
}

function SortableBlock({ block, index }: { block: Block; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative bg-gray-900 border border-gray-700 rounded-lg mb-4 p-0 shadow group"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4 text-gray-500" />
      </div>
      {BLOCK_PREVIEWS[block.type]}
    </div>
  )
}

export default function CreateFlowPage() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const sensors = useSensors(useSensor(PointerSensor))

  // Drag from palette to canvas
  const handlePaletteDragStart = (type: string) => {
    const newBlock: Block = { id: `${type}-${Date.now()}`, type }
    setBlocks((prev) => [...prev, newBlock])
  }

  // Reorder inside canvas
  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setBlocks((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id)
      const newIndex = items.findIndex((i) => i.id === over.id)
      return arrayMove(items, oldIndex, newIndex)
    })
  }

  const handleSave = () => {
    // For now, just log the structure
    // In the future, send to Supabase
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(blocks, null, 2))
    alert("Flow structure saved! (see console)")
  }

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen bg-black text-white">
      {/* Sidebar Palette */}
      <aside className="w-full md:w-64 bg-gray-950 border-r border-gray-800 p-4 flex-shrink-0">
        <h2 className="text-lg font-bold mb-4 text-purple-400">Blocks</h2>
        <div className="space-y-4">
          {BLOCK_PALETTE.map((block) => (
            <div
              key={block.id}
              className="bg-gray-900 border border-gray-700 rounded-lg p-4 cursor-pointer hover:border-purple-500 transition"
              onClick={() => handlePaletteDragStart(block.id)}
            >
              <div className="font-semibold text-white mb-1">{block.label}</div>
              <div className="text-xs text-gray-400">Drag or click to add</div>
            </div>
          ))}
        </div>
      </aside>

      {/* Canvas Area */}
      <main className="flex-1 flex flex-col items-center justify-start p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-white">Create Flow</h1>
        <div className="w-full max-w-xl min-h-[400px] bg-gray-950 border-2 border-purple-700 rounded-2xl p-6 flex flex-col">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
              {blocks.length === 0 ? (
                <div className="text-gray-500 text-center py-20">Drag blocks here to build your onboarding flow</div>
              ) : (
                blocks.map((block, idx) => <SortableBlock key={block.id} block={block} index={idx} />)
              )}
            </SortableContext>
          </DndContext>
        </div>
        <Button
          className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow"
          onClick={handleSave}
        >
          Save Flow
        </Button>
      </main>
    </div>
  )
}
