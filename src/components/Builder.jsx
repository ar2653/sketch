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
  PiUserCircle,
} from "react-icons/pi";
import TextBlock from "./TextBlock";
import GraphBlock from "./GraphBlock";
import BottomNavigation from "./BottomNavigation";
import TableBlock from "./TableBlock";
import ShapeBlock from "./ShapeBlock";
import ImageBlock from "./ImageBlock";
import StickNoteBlock from "./StickNoteBlock";
import AvatarBlock from "./AvatarBlock";
import ConfigDrawer from "./ConfigDrawer";
import useTextBlocks from "../hooks/useTextBlocks";
import useTableBlocks from "../hooks/useTableBlocks";

const Builder = () => {
  // Text Block Hook
  const { textBlocks, addTextBlock, updatePosition, removeTextBlock } =
    useTextBlocks();

  // Table Block Hook
  const { tableBlocks, addTableBlock, updateTablePosition, removeTableBlock } =
    useTableBlocks();

  // Shape dropdown
  const [showShapeDropdown, setShowShapeDropdown] = useState(false);
  // Bottom Navigation block details
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedBlockId, setSelectedBlockId] = useState(null);

  // Add this new state for the ConfigDrawer
  const [configDrawer, setConfigDrawer] = useState({
    open: false,
    id: null,
    type: null,
    config: null,
  });

  // Handle Block Click for Bottom Navigation
  const handleBlockClick = useCallback((blockType) => {
    console.log("Block clicked:", blockType);
    setSelectedBlock(blockType);
  }, []);

  // Add Text Block
  const handleAddTextBlock = useCallback(() => {
    addTextBlock();
    handleBlockClick("text");
  }, [addTextBlock, handleBlockClick]);

  // Add Table Block
  const handleAddTableBlock = useCallback(() => {
    addTableBlock();
    handleBlockClick("table");
  }, [addTableBlock, handleBlockClick]);

  // Show and Hide Shape Dropdown
  const toggleShapeDropdown = useCallback((e) => {
    e.stopPropagation();
    setShowShapeDropdown((prev) => !prev);
  }, []);

  useEffect(() => {
    console.log("Selected block updated:", selectedBlock);
  }, [selectedBlock]);

  const [graphBlocks, setGraphBlocks] = useState([]);
  const addGraphBlock = useCallback(() => {
    const newId = Date.now().toString(); // Convert to string
    setGraphBlocks((prev) => [...prev, { id: newId, x: 0, y: 0 }]);
    handleBlockClick("graph");
    setSelectedBlockId(newId);
    setConfigDrawer({ open: true, id: newId });
  }, [handleBlockClick]);
  const updateGraphPosition = useCallback((id, x, y) => {
    setGraphBlocks((prev) =>
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

  // Add this new state for avatar blocks
  const [avatarBlocks, setAvatarBlocks] = useState([]);

  // Add this new function to create an avatar block
  const addAvatarBlock = useCallback(() => {
    setAvatarBlocks((prev) => [
      ...prev,
      {
        id: Date.now(),
        x: 0,
        y: 0,
        avatarUrl: "https://api.dicebear.com/6.x/avataaars/svg",
      },
    ]);
    handleBlockClick("avatar");
  }, [handleBlockClick]);

  // Add this new function to update avatar position
  const updateAvatarPosition = useCallback((id, x, y) => {
    setAvatarBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, x, y } : block))
    );
  }, []);

  // Update the removeBlock function
  const removeBlock = useCallback(
    (blockType, blockId) => {
      switch (blockType) {
        case "text":
          removeTextBlock(blockId);
          break;
        case "graph":
          setGraphBlocks((prev) =>
            prev.filter((block) => block.id !== blockId)
          );
          break;
        case "table":
          removeTableBlock(blockId);
          break;
        case "shape":
          setShapeBlocks((prev) =>
            prev.filter((block) => block.id !== blockId)
          );
          break;
        case "image":
          setImageBlocks((prev) =>
            prev.filter((block) => block.id !== blockId)
          );
          break;
        case "note":
          setNoteBlocks((prev) => prev.filter((block) => block.id !== blockId));
          break;
        case "avatar":
          setAvatarBlocks((prev) =>
            prev.filter((block) => block.id !== blockId)
          );
          break;
        default:
          console.warn(`Unknown block type: ${blockType}`);
      }
      setSelectedBlock(null);
      setSelectedBlockId(null);
    },
    [removeTextBlock, removeTableBlock]
  );

  const handleConfigClose = useCallback(() => {
    setConfigDrawer((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <>
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-10">
        <ul className="menu bg-base-100 rounded-box shadow-lg hover:shadow-xl transition-shadow duration-300">
          <li>
            <button
              className="tooltip tooltip-right"
              data-tip="Add Text"
              onClick={handleAddTextBlock}
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
              onClick={handleAddTableBlock}
            >
              <PiTable className="h-5 w-5" />
            </button>
          </li>

          <li>
            <button
              className="tooltip tooltip-right"
              data-tip="Add Avatar"
              onClick={addAvatarBlock}
            >
              <PiUserCircle className="h-5 w-5" />
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
            isSelected={selectedBlockId === block.id}
            setConfigDrawer={setConfigDrawer}
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
        {avatarBlocks.map((block) => (
          <AvatarBlock
            key={block.id}
            id={block.id}
            x={block.x}
            y={block.y}
            avatarUrl={block.avatarUrl}
            updatePosition={updateAvatarPosition}
            setSelectedBlockId={setSelectedBlockId}
            onClick={() => handleBlockClick("avatar")}
          />
        ))}
      </div>
      <BottomNavigation
        selectedBlock={selectedBlock}
        selectedBlockId={selectedBlockId}
        removeBlock={removeBlock}
      />
      <ConfigDrawer
        id={configDrawer.id}
        type={configDrawer.type}
        config={configDrawer.config}
        isOpen={configDrawer.open}
        onClose={handleConfigClose}
      />
    </>
  );
};

export default Builder;
