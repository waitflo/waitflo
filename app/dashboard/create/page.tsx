"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  Type,
  Square,
  BoxIcon as ButtonIcon,
  FileInputIcon as InputIcon,
  Minus,
  ImageIcon,
  Save,
  Eye,
  Settings,
  GripVertical,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "../layout"

interface BlockItem {
  id: string
  type: string
  content: string
  config: Record<string, any>
}

const blockTypes = [
  { id: "text", icon: Type, label: "Text Block", color: "blue" },
  { id: "heading", icon: Type, label: "Heading", color: "purple" },
  { id: "button", icon: ButtonIcon, label: "Button", color: "green" },
  { id: "input", icon: InputIcon, label: "Input Field", color: "orange" },
  { id: "divider", icon: Minus, label: "Divider", color: "gray" },
  { id: "image", icon: ImageIcon, label: "Image", color: "pink" },
]

function SortableBlock({
  block,
  onSelect,
  isSelected,
}: { block: BlockItem; onSelect: (id: string) => void; isSelected: boolean }) {
  const { theme } = useTheme()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const renderBlockContent = () => {
    switch (block.type) {
      case "text":
        return (
          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{block.content || "Text content"}</p>
        )
      case "heading":
        return (
          <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            {block.content || "Heading"}
          </h2>
        )
      case "button":
        return <Button className="bg-purple-600 hover:bg-purple-700 text-white">{block.content || "Button"}</Button>
      case "input":
        return (
          <Input
            placeholder={block.content || "Input placeholder"}
            className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
          />
        )
      case "divider":
        return <hr className={`border-t ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`} />
      case "image":
        return (
          <div
            className={`w-full h-32 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"} rounded-lg flex items-center justify-center`}
          >
            <ImageIcon className={`w-8 h-8 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
          </div>
        )
      default:
        return <div>Unknown block</div>
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
        isSelected
          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
          : theme === "dark"
            ? "border-gray-700 hover:border-gray-600 bg-gray-900"
            : "border-gray-200 hover:border-gray-300 bg-white"
      }`}
      onClick={() => onSelect(block.id)}
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <GripVertical className={`w-4 h-4 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`} />
      </div>
      <div className="ml-6">{renderBlockContent()}</div>
    </div>
  )
}

export default function CreateFlowPage() {
  const { theme } = useTheme()
  const [flowTitle, setFlowTitle] = useState("Untitled Flow")
  const [canvasBlocks, setCanvasBlocks] = useState<BlockItem[]>([])
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const addBlock = (type: string) => {
    const newBlock: BlockItem = {
      id: `${type}-${Date.now()}`,
      type,
      content: "",
      config: {},
    }
    setCanvasBlocks([...canvasBlocks, newBlock])
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setCanvasBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const updateBlockContent = (id: string, content: string) => {
    setCanvasBlocks((blocks) => blocks.map((block) => (block.id === id ? { ...block, content } : block)))
  }

  const selectedBlockData = canvasBlocks.find((block) => block.id === selectedBlock)

  const cardClasses = theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"

  return (
    <div className="h-screen flex">
      {/* Left Panel - Blocks */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`w-64 ${cardClasses} border-r p-4 overflow-y-auto`}
      >
        <h3 className={`font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Blocks</h3>
        <div className="space-y-2">
          {blockTypes.map((blockType) => (
            <motion.button
              key={blockType.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addBlock(blockType.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                theme === "dark"
                  ? "border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className={`p-2 rounded-lg bg-${blockType.color}-100 dark:bg-${blockType.color}-900/30`}>
                <blockType.icon className={`w-4 h-4 text-${blockType.color}-600 dark:text-${blockType.color}-400`} />
              </div>
              <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                {blockType.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`flex items-center justify-between p-4 border-b ${theme === "dark" ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}
        >
          <div className="flex items-center space-x-4">
            <Input
              value={flowTitle}
              onChange={(e) => setFlowTitle(e.target.value)}
              className={`text-lg font-semibold border-none bg-transparent ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Publish</Button>
          </div>
        </motion.div>

        {/* Center - Canvas */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div
              className={`min-h-96 p-6 rounded-lg border-2 border-dashed ${
                theme === "dark" ? "border-gray-700 bg-gray-900/50" : "border-gray-300 bg-gray-50"
              }`}
            >
              {canvasBlocks.length === 0 ? (
                <div className="text-center py-12">
                  <div
                    className={`w-16 h-16 rounded-full ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"} flex items-center justify-center mx-auto mb-4`}
                  >
                    <Square className={`w-8 h-8 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Start building your flow
                  </h3>
                  <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Drag blocks from the left panel to get started
                  </p>
                </div>
              ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={canvasBlocks.map((block) => block.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-4">
                      {canvasBlocks.map((block) => (
                        <SortableBlock
                          key={block.id}
                          block={block}
                          onSelect={setSelectedBlock}
                          isSelected={selectedBlock === block.id}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Configuration */}
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`w-64 ${cardClasses} border-l p-4 overflow-y-auto`}
      >
        <div className="flex items-center space-x-2 mb-4">
          <Settings className={`w-5 h-5 ${theme === "dark" ? "text-white" : "text-gray-900"}`} />
          <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Properties</h3>
        </div>

        {selectedBlockData ? (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Content
              </label>
              <Input
                value={selectedBlockData.content}
                onChange={(e) => updateBlockContent(selectedBlockData.id, e.target.value)}
                placeholder="Enter content..."
                className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Padding
              </label>
              <select
                className={`w-full p-2 rounded-lg border ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
              >
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Alignment
              </label>
              <select
                className={`w-full p-2 rounded-lg border ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
              >
                <option>Left</option>
                <option>Center</option>
                <option>Right</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div
              className={`w-12 h-12 rounded-full ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"} flex items-center justify-center mx-auto mb-3`}
            >
              <Settings className={`w-6 h-6 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
            </div>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Select a block to edit its properties
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
