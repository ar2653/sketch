import { useState, useCallback, useEffect } from "react";
import {
  PiTextAa,
  PiChartLineLight,
  PiImage,
  PiTable,
  PiShapes,
  PiNoteThin,
  PiTriangle,
  PiRectangle,
  PiCircle,
  PiSquare,
} from "react-icons/pi";
import TextBlock from "./TextBlock";
import GraphBlock from "./GraphBlock";
import BottomNavigation from "./BottomNavigation";
import TableBlock from "./TableBlock";
import ShapeBlock from "./ShapeBlock";
import ImageBlock from "./ImageBlock";
import StickNoteBlock from "./StickNoteBlock";

const Builder = () => {
  // Shape dropdown
  const [showShapeDropdown, setShowShapeDropdown] = useState(false);
  // Bottom Navigation block details
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedBlockId, setSelectedBlockId] = useState(null);

  // Show and Hide Shape Dropdown
  const toggleShapeDropdown = useCallback((e) => {
    e.stopPropagation();
    setShowShapeDropdown((prev) => !prev);
  }, []);

  // Handle Block Click for Bottom Navigation
  const handleBlockClick = useCallback((blockType) => {
    console.log("Block clicked:", blockType);
    setSelectedBlock(blockType);
  }, []);

  useEffect(() => {
    console.log("Selected block updated:", selectedBlock);
  }, [selectedBlock]);
  // text block
  const [textBlocks, setTextBlocks] = useState([]);
  const addTextBlock = useCallback(() => {
    setTextBlocks((prev) => [...prev, { id: Date.now(), x: 0, y: 0 }]);
    handleBlockClick("text");
  }, [handleBlockClick]);

  const updatePosition = useCallback((id, x, y) => {
    setTextBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, x, y } : block))
    );
  }, []);

  const [graphBlocks, setGraphBlocks] = useState([]);
  const addGraphBlock = useCallback(() => {
    setGraphBlocks((prev) => [...prev, { id: Date.now(), x: 0, y: 0 }]);
    handleBlockClick("graph");
  }, [handleBlockClick]);
  const updateGraphPosition = useCallback((id, x, y) => {
    setGraphBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, x, y } : block))
    );
  }, []);

  const [tableBlocks, setTableBlocks] = useState([]);
  const addTableBlock = useCallback(() => {
    setTableBlocks((prev) => [...prev, { id: Date.now(), x: 0, y: 0 }]);
    handleBlockClick("table");
  }, [handleBlockClick]);
  const updateTablePosition = useCallback((id, x, y) => {
    setTableBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, x, y } : block))
    );
  }, []);

  const [shapeBlocks, setShapeBlocks] = useState([]);
  const addShapeBlock = useCallback(
    (shapeType) => {
      setShapeBlocks((prev) => [
        ...prev,
        { id: Date.now(), x: 0, y: 0, shapeType },
      ]);
      handleBlockClick("shape");
      setShowShapeDropdown(false);
    },
    [handleBlockClick]
  );
  const updateShapePosition = useCallback((id, x, y) => {
    setShapeBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, x, y } : block))
    );
  }, []);

  const [imageBlocks, setImageBlocks] = useState([]);
  const addImageBlock = useCallback(() => {
    setImageBlocks((prev) => [
      ...prev,
      { id: Date.now(), x: 0, y: 0, src: "https://placeholder.com/400x400" },
    ]);
    handleBlockClick("image");
  }, [handleBlockClick]);
  const updateImagePosition = useCallback((id, x, y) => {
    setImageBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, x, y } : block))
    );
  }, []);

  // Add this new state for note blocks
  const [noteBlocks, setNoteBlocks] = useState([]);

  // Add this new function to create a note block
  const addNoteBlock = useCallback(() => {
    setNoteBlocks((prev) => [
      ...prev,
      { id: Date.now(), x: 0, y: 0, content: "" },
    ]);
    handleBlockClick("note");
  }, [handleBlockClick]);

  // Add this new function to update note position
  const updateNotePosition = useCallback((id, x, y) => {
    setNoteBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, x, y } : block))
    );
  }, []);

  // Update the removeBlock function to include note blocks
  const removeBlock = useCallback((blockType, blockId) => {
    switch (blockType) {
      case "text":
        setTextBlocks((prev) => prev.filter((block) => block.id !== blockId));
        break;
      case "graph":
        setGraphBlocks((prev) => prev.filter((block) => block.id !== blockId));
        break;
      case "table":
        setTableBlocks((prev) => prev.filter((block) => block.id !== blockId));
        break;
      case "shape":
        setShapeBlocks((prev) => prev.filter((block) => block.id !== blockId));
        break;
      case "image":
        setImageBlocks((prev) => prev.filter((block) => block.id !== blockId));
        break;
      case "note":
        setNoteBlocks((prev) => prev.filter((block) => block.id !== blockId));
        break;
      default:
        console.warn(`Unknown block type: ${blockType}`);
    }
    setSelectedBlock(null);
    setSelectedBlockId(null);
  }, []);

  return (
    <>
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-10">
        <ul className="menu bg-base-100 rounded-box shadow-lg hover:shadow-xl transition-shadow duration-300">
          <li>
            <button
              className="tooltip tooltip-right"
              data-tip="Add Text"
              onClick={addTextBlock}
            >
              <PiTextAa className="h-5 w-5" />
            </button>
          </li>
          <li className="relative">
            <button
              className="tooltip tooltip-right"
              data-tip="Add Shape"
              onClick={toggleShapeDropdown}
            >
              <PiShapes className="h-5 w-5" />
            </button>
            {showShapeDropdown && (
              <div className="absolute left-full ml-2 top-0 bg-base-100 rounded-box p-4 w-40 border hover:bg-base-100 border-gray-200 z-20">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className="text-center py-2 px-3 hover:bg-base-300 rounded"
                    onClick={() => addShapeBlock("triangle")}
                  >
                    <PiTriangle className="h-5 w-5" />
                  </button>
                  <button
                    className="text-center py-2 px-3 hover:bg-base-300 rounded"
                    onClick={() => addShapeBlock("rectangle")}
                  >
                    <PiRectangle className="h-5 w-5" />
                  </button>
                  <button
                    className="text-center py-2 px-3 hover:bg-base-300 rounded"
                    onClick={() => addShapeBlock("circle")}
                  >
                    <PiCircle className="h-5 w-5" />
                  </button>
                  <button
                    className="text-center py-2 px-3 hover:bg-base-300 rounded"
                    onClick={() => addShapeBlock("square")}
                  >
                    <PiSquare className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </li>
          <li>
            <button
              className="tooltip tooltip-right"
              data-tip="Add Note"
              onClick={addNoteBlock}
            >
              <PiNoteThin className="h-5 w-5" />
            </button>
          </li>
          <li>
            <button
              className="tooltip tooltip-right"
              data-tip="Add Chart"
              onClick={addGraphBlock}
            >
              <PiChartLineLight className="h-5 w-5" />
            </button>
          </li>
          <li>
            <button
              className="tooltip tooltip-right"
              data-tip="Add Image"
              onClick={addImageBlock}
            >
              <PiImage className="h-5 w-5" />
            </button>
          </li>
          <li>
            <button
              className="tooltip tooltip-right"
              data-tip="Add Table"
              onClick={addTableBlock}
            >
              <PiTable className="h-5 w-5" />
            </button>
          </li>
        </ul>
      </div>
      <div
        className="relative h-screen w-full overflow-x-hidden"
        onClick={() => setShowShapeDropdown(false)}
      >
        {textBlocks.map((block) => (
          <TextBlock
            key={block.id}
            id={block.id}
            x={block.x}
            y={block.y}
            updatePosition={updatePosition}
            setSelectedBlockId={setSelectedBlockId}
            onClick={() => handleBlockClick("text")}
          />
        ))}
        {graphBlocks.map((block) => (
          <GraphBlock
            key={block.id}
            id={block.id}
            x={block.x}
            y={block.y}
            updatePosition={updateGraphPosition}
            setSelectedBlockId={setSelectedBlockId}
            onClick={() => handleBlockClick("graph")}
          />
        ))}
        {tableBlocks.map((block) => (
          <TableBlock
            key={block.id}
            id={block.id}
            x={block.x}
            y={block.y}
            updatePosition={updateTablePosition}
            setSelectedBlockId={setSelectedBlockId}
            onClick={() => handleBlockClick("table")}
          />
        ))}
        {shapeBlocks.map((block) => (
          <ShapeBlock
            key={block.id}
            id={block.id}
            x={block.x}
            y={block.y}
            shapeType={block.shapeType}
            updatePosition={updateShapePosition}
            setSelectedBlockId={setSelectedBlockId}
            onClick={() => handleBlockClick("shape")}
          />
        ))}
        {imageBlocks.map((block) => (
          <ImageBlock
            key={block.id}
            id={block.id}
            x={block.x}
            y={block.y}
            src={block.src}
            updatePosition={updateImagePosition}
            setSelectedBlockId={setSelectedBlockId}
            onClick={() => handleBlockClick("image")}
          />
        ))}
        {noteBlocks.map((block) => (
          <StickNoteBlock
            key={block.id}
            id={block.id}
            x={block.x}
            y={block.y}
            content={block.content}
            updatePosition={updateNotePosition}
            setSelectedBlockId={setSelectedBlockId}
            onClick={() => handleBlockClick("note")}
          />
        ))}
      </div>
      <BottomNavigation
        selectedBlock={selectedBlock}
        selectedBlockId={selectedBlockId}
        removeBlock={removeBlock}
      />
    </>
  );
};

export default Builder;
