import { useNode } from "@craftjs/core"

export function Text({ text = "Text", color = "#333", align = "left" }) {
  const {
    connectors: { drag, connect },
    selected,
  } = useNode((state) => ({ selected: state.events.selected }))
  return (
    <div ref={ref => connect(drag(ref))} style={{ color, textAlign: align }} className={`text-base py-1 px-2 ${selected ? 'ring-2 ring-purple-500' : ''}`}>
      {text}
    </div>
  )
}
Text.craft = {
  displayName: "Text",
  props: { text: "Text", color: "#333", align: "left" },
  related: {
    settings: () => {
      const { text, color, align, setProp } = useNode((node) => ({ ...node.data.props, setProp: node.setProp }))
      return (
        <div className="flex flex-col gap-2">
          <label className="text-xs">Text</label>
          <input className="border rounded p-1" value={text} onChange={e => setProp(props => props.text = e.target.value)} />
          <label className="text-xs">Color</label>
          <input type="color" value={color} onChange={e => setProp(props => props.color = e.target.value)} />
          <label className="text-xs">Align</label>
          <select className="border rounded p-1" value={align} onChange={e => setProp(props => props.align = e.target.value)}>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      )
    }
  }
}

export function Header({ text = "Header", color = "#6d28d9", align = "left" }) {
  const {
    connectors: { drag, connect },
    selected,
  } = useNode((state) => ({ selected: state.events.selected }))
  return (
    <h2 ref={ref => connect(drag(ref))} style={{ color, textAlign: align }} className={`text-2xl font-bold py-2 px-2 ${selected ? 'ring-2 ring-purple-500' : ''}`}>
      {text}
    </h2>
  )
}
Header.craft = {
  displayName: "Header",
  props: { text: "Header", color: "#6d28d9", align: "left" },
  related: {
    settings: () => {
      const { text, color, align, setProp } = useNode((node) => ({ ...node.data.props, setProp: node.setProp }))
      return (
        <div className="flex flex-col gap-2">
          <label className="text-xs">Text</label>
          <input className="border rounded p-1" value={text} onChange={e => setProp(props => props.text = e.target.value)} />
          <label className="text-xs">Color</label>
          <input type="color" value={color} onChange={e => setProp(props => props.color = e.target.value)} />
          <label className="text-xs">Align</label>
          <select className="border rounded p-1" value={align} onChange={e => setProp(props => props.align = e.target.value)}>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      )
    }
  }
}

export function Button({ text = "Button", color = "#a78bfa", textColor = "#fff", align = "center" }) {
  const {
    connectors: { drag, connect },
    selected,
  } = useNode((state) => ({ selected: state.events.selected }))
  return (
    <button ref={ref => connect(drag(ref))} style={{ backgroundColor: color, color: textColor, textAlign: align }} className={`px-6 py-2 rounded font-semibold shadow ${selected ? 'ring-2 ring-purple-500' : ''}`}>
      {text}
    </button>
  )
}
Button.craft = {
  displayName: "Button",
  props: { text: "Button", color: "#a78bfa", textColor: "#fff", align: "center" },
  related: {
    settings: () => {
      const { text, color, textColor, align, setProp } = useNode((node) => ({ ...node.data.props, setProp: node.setProp }))
      return (
        <div className="flex flex-col gap-2">
          <label className="text-xs">Text</label>
          <input className="border rounded p-1" value={text} onChange={e => setProp(props => props.text = e.target.value)} />
          <label className="text-xs">Button Color</label>
          <input type="color" value={color} onChange={e => setProp(props => props.color = e.target.value)} />
          <label className="text-xs">Text Color</label>
          <input type="color" value={textColor} onChange={e => setProp(props => props.textColor = e.target.value)} />
          <label className="text-xs">Align</label>
          <select className="border rounded p-1" value={align} onChange={e => setProp(props => props.align = e.target.value)}>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      )
    }
  }
}

export function Image({ src = "https://placehold.co/400x200?text=Image", alt = "Image", align = "center" }) {
  const {
    connectors: { drag, connect },
    selected,
  } = useNode((state) => ({ selected: state.events.selected }))
  return (
    <div ref={ref => connect(drag(ref))} className={`flex ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'} py-2 ${selected ? 'ring-2 ring-purple-500' : ''}`}>
      <img src={src} alt={alt} className="rounded shadow max-w-full h-auto" style={{ maxWidth: 400 }} />
    </div>
  )
}
Image.craft = {
  displayName: "Image",
  props: { src: "https://placehold.co/400x200?text=Image", alt: "Image", align: "center" },
  related: {
    settings: () => {
      const { src, alt, align, setProp } = useNode((node) => ({ ...node.data.props, setProp: node.setProp }))
      return (
        <div className="flex flex-col gap-2">
          <label className="text-xs">Image URL</label>
          <input className="border rounded p-1" value={src} onChange={e => setProp(props => props.src = e.target.value)} />
          <label className="text-xs">Alt Text</label>
          <input className="border rounded p-1" value={alt} onChange={e => setProp(props => props.alt = e.target.value)} />
          <label className="text-xs">Align</label>
          <select className="border rounded p-1" value={align} onChange={e => setProp(props => props.align = e.target.value)}>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      )
    }
  }
}

export function Divider({ color = "#e5e7eb", thickness = 2, margin = 16 }) {
  const {
    connectors: { drag, connect },
    selected,
  } = useNode((state) => ({ selected: state.events.selected }))
  return (
    <hr ref={ref => connect(drag(ref))} style={{ borderColor: color, borderWidth: thickness, marginTop: margin, marginBottom: margin }} className={`${selected ? 'ring-2 ring-purple-500' : ''}`} />
  )
}
Divider.craft = {
  displayName: "Divider",
  props: { color: "#e5e7eb", thickness: 2, margin: 16 },
  related: {
    settings: () => {
      const { color, thickness, margin, setProp } = useNode((node) => ({ ...node.data.props, setProp: node.setProp }))
      return (
        <div className="flex flex-col gap-2">
          <label className="text-xs">Color</label>
          <input type="color" value={color} onChange={e => setProp(props => props.color = e.target.value)} />
          <label className="text-xs">Thickness</label>
          <input type="number" className="border rounded p-1" value={thickness} min={1} max={10} onChange={e => setProp(props => props.thickness = Number(e.target.value))} />
          <label className="text-xs">Margin</label>
          <input type="number" className="border rounded p-1" value={margin} min={0} max={64} onChange={e => setProp(props => props.margin = Number(e.target.value))} />
        </div>
      )
    }
  }
} 