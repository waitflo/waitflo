"use client"

import { useState, useRef } from "react"
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"
import { GripVertical, Undo2, Redo2, Trash2, Save, Image as ImageIcon, Video, Columns, Text, Layout, Star, User, Link as LinkIcon, Divide, FileImage, ChevronDown, ChevronUp } from "lucide-react"
import create from "zustand"
import { nanoid } from "nanoid"

// --- Zustand store for undo/redo/global state ---
type BlockType = "text" | "image" | "button" | "logo" | "header" | "divider" | "icon" | "video" | "hero" | "testimonial" | "row" | "column"

interface Block {
  id: string
  type: BlockType
  children?: string[] // for row/column nesting
  props: Record<string, any>
}

interface BuilderState {
  blocks: Block[]
  selectedId: string | null
  history: Block[][]
  future: Block[][]
  setBlocks: (blocks: Block[]) => void
  select: (id: string | null) => void
  undo: () => void
  redo: () => void
  clear: () => void
  save: () => void
}

const useBuilderStore = create<BuilderState>((set, get) => ({
  blocks: [],
  selectedId: null,
  history: [],
  future: [],
  setBlocks: (blocks) => set((state) => ({
    history: [...state.history, state.blocks],
    future: [],
    blocks
  })),
  select: (id) => set({ selectedId: id }),
  undo: () => set((state) => {
    if (state.history.length === 0) return state
    const prev = state.history[state.history.length - 1]
    return {
      blocks: prev,
      history: state.history.slice(0, -1),
      future: [state.blocks, ...state.future],
    }
  }),
  redo: () => set((state) => {
    if (state.future.length === 0) return state
    const next = state.future[0]
    return {
      blocks: next,
      history: [...state.history, state.blocks],
      future: state.future.slice(1),
    }
  }),
  clear: () => set((state) => ({
    history: [...state.history, state.blocks],
    future: [],
    blocks: [],
    selectedId: null,
  })),
  save: () => {
    // For now, just log the structure
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(get().blocks, null, 2))
    alert("Flow structure saved! (see console)")
  },
}))

// --- Block palette ---
const PALETTE = [
  { type: "hero", label: "Hero Section", icon: Layout },
  { type: "header", label: "Header", icon: Text },
  { type: "text", label: "Text", icon: Text },
  { type: "image", label: "Image", icon: FileImage },
  { type: "logo", label: "Logo", icon: ImageIcon },
  { type: "button", label: "Button", icon: LinkIcon },
  { type: "divider", label: "Divider", icon: Divide },
  { type: "icon", label: "Icon", icon: Star },
  { type: "video", label: "Video", icon: Video },
  { type: "testimonial", label: "Testimonial", icon: User },
  { type: "row", label: "Row/Columns", icon: Columns },
]

// --- Block components ---
function BlockPreview({ block, onSelect, selected }: { block: Block; onSelect: (id: string) => void; selected: boolean }) {
  // Render based on block type
  const base = "rounded-lg border border-gray-700 bg-gray-900 p-4 mb-2 cursor-pointer hover:border-purple-500 transition-all"
  const selectedClass = selected ? "border-purple-500 ring-2 ring-purple-700" : ""
  switch (block.type) {
    case "hero":
      return <div className={`${base} ${selectedClass}`} onClick={() => onSelect(block.id)}><div className="text-2xl font-bold mb-2">Hero Section</div><div className="text-gray-400">Big headline, subheadline, and CTA button</div></div>
    case "header":
      return <div className={`${base} ${selectedClass}`} onClick={() => onSelect(block.id)}><h2 className="text-xl font-bold">{block.props.text || "Header"}</h2></div>
    case "text":
      return <div className={`${base} ${selectedClass}`} onClick={() => onSelect(block.id)}><p>{block.props.text || "Editable text..."}</p></div>
    case "image":
      return <div className={`${base} ${selectedClass}`} onClick={() => onSelect(block.id)}><img src={block.props.url || "/placeholder.svg"} alt={block.props.alt || "Image"} className="w-full h-32 object-cover rounded" /></div>
    case "logo":
      return <div className={`${base} ${selectedClass}`} onClick={() => onSelect(block.id)}><img src={block.props.url || "/placeholder.svg"} alt="Logo" className="w-16 h-16 object-contain mx-auto" /></div>
    case "button":
      return <div className={`${base} ${selectedClass}`} onClick={() => onSelect(block.id)}><Button className="bg-purple-600 text-white w-full">{block.props.label || "Button"}</Button></div>
    case "divider":
      return <div className={`${base} ${selectedClass}`} onClick={() => onSelect(block.id)}><hr className="border-purple-700" /></div>
    case "icon":
      return <div className={`${base} ${selectedClass}`} onClick={() => onSelect(block.id)}><Star className="w-8 h-8 text-purple-400 mx-auto" /></div>
    case "video":
      return <div className={`${base} ${selectedClass}`} onClick={() => onSelect(block.id)}><div className="aspect-video bg-gray-800 flex items-center justify-center text-gray-400">Video Embed</div></div>
    case "testimonial":
      return <div className={`${base} ${selectedClass}`} onClick={() => onSelect(block.id)}><blockquote className="italic">"This product changed my life!"</blockquote><div className="text-right text-sm mt-2">- Happy User</div></div>
    case "row":
      return <div className={`${base} ${selectedClass}`} onClick={() => onSelect(block.id)}><div className="flex gap-2"><div className="flex-1 bg-gray-800 h-16 rounded"></div><div className="flex-1 bg-gray-800 h-16 rounded"></div></div><div className="text-xs text-gray-400 mt-2">Row/Columns (nest blocks inside)</div></div>
    default:
      return <div className={`${base} ${selectedClass}`} onClick={() => onSelect(block.id)}>Unknown block</div>
  }
}

// --- Inspector panel ---
function InspectorPanel() {
  const { blocks, selectedId, setBlocks, select } = useBuilderStore()
  const block = blocks.find((b) => b.id === selectedId)
  if (!block) return null
  // Inspector controls by type
  const update = (props: Record<string, any>) => {
    setBlocks(blocks.map((b) => b.id === block.id ? { ...b, props: { ...b.props, ...props } } : b))
  }
  return (
    <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-gray-950 border-t border-purple-900 p-4 z-40 flex flex-col md:flex-row gap-4 items-center md:items-start">
      <div className="flex-1">
        <div className="font-bold text-purple-400 mb-2">Inspector: {block.type.charAt(0).toUpperCase() + block.type.slice(1)}</div>
        {block.type === "text" || block.type === "header" ? (
          <input
            className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white mb-2"
            value={block.props.text || ""}
            onChange={e => update({ text: e.target.value })}
            placeholder="Edit text..."
          />
        ) : null}
        {block.type === "button" ? (
          <>
            <input
              className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white mb-2"
              value={block.props.label || ""}
              onChange={e => update({ label: e.target.value })}
              placeholder="Button label"
            />
            <input
              className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white mb-2"
              value={block.props.link || ""}
              onChange={e => update({ link: e.target.value })}
              placeholder="Button link (https://...)"
            />
          </>
        ) : null}
        {block.type === "image" || block.type === "logo" ? (
          <>
            <input
              className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white mb-2"
              value={block.props.url || ""}
              onChange={e => update({ url: e.target.value })}
              placeholder="Image URL"
            />
            <input
              className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white mb-2"
              value={block.props.alt || ""}
              onChange={e => update({ alt: e.target.value })}
              placeholder="Alt text"
            />
          </>
        ) : null}
        {/* Add more controls for other block types as needed */}
      </div>
      <Button variant="outline" className="text-red-400 border-red-400 hover:bg-red-900/20" onClick={() => {
        useBuilderStore.setState(state => ({
          blocks: state.blocks.filter(b => b.id !== block.id),
          selectedId: null,
        }))
      }}>Delete</Button>
    </div>
  )
}

// --- Main page ---
export default function CreateFlowPage() {
  const { blocks, setBlocks, selectedId, select, undo, redo, clear, save, history, future } = useBuilderStore()
  const sensors = useSensors(useSensor(PointerSensor))
  const canvasRef = useRef<HTMLDivElement>(null)

  // Drag from palette to canvas
  const handlePaletteDrag = (type: BlockType) => {
    const newBlock: Block = { id: nanoid(), type, props: {} }
    setBlocks([...blocks, newBlock])
  }

  // Drag and drop reorder
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setBlocks(arrayMove(blocks, blocks.findIndex(b => b.id === active.id), blocks.findIndex(b => b.id === over.id)))
  }

  return (
    <div className="flex h-full min-h-screen bg-black text-white">
      {/* Sidebar Palette */}
      <aside className="w-64 bg-gray-950 border-r border-gray-800 p-4 flex-shrink-0 hidden md:block">
        <h2 className="text-lg font-bold mb-4 text-purple-400">Blocks</h2>
        <div className="space-y-4">
          {PALETTE.map((block) => (
            <div
              key={block.type}
              className="bg-gray-900 border border-gray-700 rounded-lg p-4 cursor-pointer hover:border-purple-500 transition"
              onClick={() => handlePaletteDrag(block.type as BlockType)}
            >
              <block.icon className="w-5 h-5 text-purple-400 mb-2" />
              <div className="font-semibold text-white mb-1">{block.label}</div>
              <div className="text-xs text-gray-400">Click to add</div>
            </div>
          ))}
        </div>
      </aside>
      {/* Canvas Area */}
      <main className="flex-1 flex flex-col items-center justify-start p-6 overflow-y-auto">
        <div className="flex w-full justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Visual Page Builder</h1>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" onClick={undo} disabled={history.length === 0}><Undo2 className="w-5 h-5" /></Button>
            <Button size="icon" variant="ghost" onClick={redo} disabled={future.length === 0}><Redo2 className="w-5 h-5" /></Button>
            <Button size="icon" variant="ghost" onClick={clear}><Trash2 className="w-5 h-5" /></Button>
            <Button size="icon" variant="ghost" onClick={save}><Save className="w-5 h-5" /></Button>
          </div>
        </div>
        <div ref={canvasRef} className="w-full max-w-2xl min-h-[500px] bg-gray-950 border-2 border-purple-700 rounded-2xl p-6 flex flex-col">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
              {blocks.length === 0 ? (
                <div className="text-gray-500 text-center py-20">Click blocks on the left to add to your page</div>
              ) : (
                blocks.map((block, idx) => (
                  <div key={block.id} onClick={() => select(block.id)}>
                    <SortableBlock block={block} index={idx} />
                  </div>
                ))
              )}
            </SortableContext>
          </DndContext>
        </div>
        <div className="md:hidden mt-8 w-full">
          <h2 className="text-lg font-bold mb-4 text-purple-400">Blocks</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {PALETTE.map((block) => (
              <div
                key={block.type}
                className="bg-gray-900 border border-gray-700 rounded-lg p-4 cursor-pointer hover:border-purple-500 transition min-w-[120px]"
                onClick={() => handlePaletteDrag(block.type as BlockType)}
              >
                <block.icon className="w-5 h-5 text-purple-400 mb-2" />
                <div className="font-semibold text-white mb-1">{block.label}</div>
              </div>
            ))}
          </div>
        </div>
        {selectedId && <InspectorPanel />}
      </main>
    </div>
  )
}
