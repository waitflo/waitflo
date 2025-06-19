import { useEditor } from "@craftjs/core"

export function InspectorPanel() {
  const { selected, actions, query } = useEditor((state) => ({
    selected: state.events.selected,
  }))
  const selectedArr = Array.from(selected || [])
  const nodeId = selectedArr.length === 1 ? selectedArr[0] : null
  const node = nodeId ? query.node(nodeId).get() : null
  if (!nodeId || !node) return null
  const { related } = node
  return (
    <aside className="fixed right-6 top-6 w-80 bg-white text-black rounded-xl shadow-lg border-2 border-purple-400 z-50 p-6">
      <h2 className="text-lg font-bold mb-4 text-purple-600">Inspector</h2>
      {related && related.settings ? <related.settings /> : <div className="text-gray-500">No settings</div>}
    </aside>
  )
} 