import { useState, useCallback } from "react";

const useShapeBlocks = () => {
  const [shapeBlocks, setShapeBlocks] = useState([]);
  const [showShapeDropdown, setShowShapeDropdown] = useState(false);

  const addShapeBlock = useCallback((shapeType) => {
    setShapeBlocks((prev) => [
      ...prev,
      { id: Date.now(), x: 0, y: 0, shapeType },
    ]);
  }, []);

  const updateShapePosition = useCallback((id, x, y) => {
    setShapeBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, x, y } : block))
    );
  }, []);

  const removeShapeBlock = useCallback((blockId) => {
    setShapeBlocks((prev) => prev.filter((block) => block.id !== blockId));
  }, []);

  const toggleShapeDropdown = useCallback(() => {
    setShowShapeDropdown((prev) => !prev);
  }, []);

  return {
    shapeBlocks,
    addShapeBlock,
    updateShapePosition,
    removeShapeBlock,
    showShapeDropdown,
    toggleShapeDropdown,
  };
};

export default useShapeBlocks;
