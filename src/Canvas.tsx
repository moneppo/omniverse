import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { useEffect } from 'react';
import { FiImage, FiSquare, FiType, FiBox, FiChevronRight } from 'react-icons/fi';

type CanvasProps = {
  onSave?: (svg: string, thumb: string) => void;
}

const Canvas = ({ onSave }: CanvasProps) => {
  const { editor, onReady } = useFabricJSEditor();

  const addImage = () => {
    fabric.Image.fromURL('http://localhost:3000/omniverse/logo192.png', (img) => {
      editor?.canvas.add(img);
    })
  }

  useEffect(() => {
    const handler = () => {
      if (editor && onSave) {
        console.log("saving");
        onSave(editor.canvas.toSVG(), editor.canvas.toDataURL({multiplier:.5}));
      }
    }

    editor?.canvas.on("object:modified", handler);

    return () => { editor?.canvas.off("object:modified", handler) }
  }, [onSave, editor]);

  return (<div style={{ display: "flex", flexDirection: "row" }} >
    <FabricJSCanvas className="canvas" onReady={onReady} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }} >
      <button 
        onClick={addImage} 
        style={{ margin: 5 }}>
          <FiImage size={40} color="#999" />
      </button>
      <button style={{ margin: 5 }}><FiSquare size={40} color="#999" /></button>
      <button style={{ margin: 5 }}><FiType size={40} color="#999" /></button>
      <button
        style={{
          margin: 5,
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }}>
          <FiBox size={40} color="#999" />
          <FiChevronRight size={20} color="#999" />
      </button>
    </div>
  </div>)
}

export default Canvas;