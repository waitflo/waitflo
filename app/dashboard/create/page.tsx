"use client"

import { useState } from "react"
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"
import { GripVertical, Layout, Text, Image as ImageIcon, Video, Link as LinkIcon, Columns, Star, User, Divide } from "lucide-react"

const PALETTE = [
  { type: "section", label: "Section", icon: Layout },
  { type: "text", label: "Text", icon: Text },
  { type: "image", label: "Image", icon: ImageIcon },
  { type: "video", label: "Video", icon: Video },
  { type: "button", label: "Button", icon: LinkIcon },
  { type: "columns", label: "Columns", icon: Columns },
  { type: "icon", label: "Icon", icon: Star },
  { type: "testimonial", label: "Testimonial", icon: User },
  { type: "divider", label: "Divider", icon: Divide },
]

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
  // Simple preview for each block type
  let content
  switch (block.type) {
    case "section":
      content = <div className="p-6 bg-gray-50 rounded border border-purple-200 text-lg font-bold text-gray-700">Section</div>; break
    case "text":
      content = <div className="p-4 text-gray-700">Text block</div>; break
    case "image":
      content = <div className="p-4 flex items-center justify-center"><ImageIcon className="w-8 h-8 text-purple-400" /></div>; break
    case "video":
      content = <div className="p-4 flex items-center justify-center"><Video className="w-8 h-8 text-purple-400" /></div>; break
    case "button":
      content = <div className="p-4 flex items-center justify-center"><Button className="bg-purple-600 text-white">Button</Button></div>; break
    case "columns":
      content = <div className="p-4 flex gap-2"><div className="flex-1 bg-purple-50 h-8 rounded" /><div className="flex-1 bg-purple-50 h-8 rounded" /></div>; break
    case "icon":
      content = <div className="p-4 flex items-center justify-center"><Star className="w-8 h-8 text-purple-400" /></div>; break
    case "testimonial":
      content = <div className="p-4 italic text-gray-700">"Testimonial block"</div>; break
    case "divider":
      content = <div className="p-2"><hr className="border-t-2 border-purple-200" /></div>; break
    default:
      content = <div className="p-4">Unknown block</div>
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative bg-white border border-purple-200 rounded shadow mb-4 group cursor-pointer"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4 text-purple-400" />
      </div>
      {content}
    </div>
  )
}

export default function CreateFlowPage() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const sensors = useSensors(useSensor(PointerSensor))

  // Add block from palette
  const handlePaletteAdd = (type: string) => {
    setBlocks([...blocks, { id: `${type}-${Date.now()}`, type }])
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

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white">
      {/* Sidebar */}
      <aside className="w-64 min-w-[220px] max-w-xs border-r border-gray-200 bg-white p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-4 text-purple-600">Widgets</h2>
        <div className="flex flex-col gap-2">
          {PALETTE.map((block) => (
            <button
              key={block.type}
              className="flex items-center gap-3 px-3 py-2 rounded border border-transparent hover:border-purple-400 hover:bg-purple-50 transition group"
              onClick={() => handlePaletteAdd(block.type)}
              type="button"
            >
              <block.icon className="w-5 h-5 text-purple-500 group-hover:text-purple-700" />
              <span className="text-gray-700 font-medium group-hover:text-purple-700">{block.label}</span>
            </button>
          ))}
        </div>
      </aside>
      {/* Canvas */}
      <main className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full max-w-3xl min-h-[500px] bg-white rounded-xl border-2 border-dashed border-purple-400 p-8 flex flex-col items-center justify-center transition-all">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
              {blocks.length === 0 ? (
                <div className="text-purple-400 text-lg font-semibold flex flex-col items-center gap-2">
                  <span className="text-3xl">+</span>
                  Drag widget here
                </div>
              ) : (
                blocks.map((block, idx) => <SortableBlock key={block.id} block={block} index={idx} />)
              )}
            </SortableContext>
          </DndContext>
        </div>
      </main>
    </div>
  )
}
