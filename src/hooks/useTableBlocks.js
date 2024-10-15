import { useState, useCallback } from "react";

const useTableBlocks = () => {
  const [tableBlocks, setTableBlocks] = useState([]);

  const addTableBlock = useCallback(() => {
    setTableBlocks((prev) => [...prev, { id: Date.now(), x: 0, y: 0 }]);
  }, []);

  const updateTablePosition = useCallback((id, x, y) => {
    setTableBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, x, y } : block))
    );
  }, []);

  const removeTableBlock = useCallback((blockId) => {
    setTableBlocks((prev) => prev.filter((block) => block.id !== blockId));
  }, []);

  return {
    tableBlocks,
    addTableBlock,
    updateTablePosition,
    removeTableBlock,
  };
};

export default useTableBlocks;
