import { useState, useCallback } from "react";

const useTextBlocks = () => {
  const [textBlocks, setTextBlocks] = useState([]);

  const addTextBlock = useCallback(() => {
    setTextBlocks((prev) => [...prev, { id: Date.now(), x: 0, y: 0 }]);
  }, []);

  const updatePosition = useCallback((id, x, y) => {
    setTextBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, x, y } : block))
    );
  }, []);

  const removeTextBlock = useCallback((blockId) => {
    setTextBlocks((prev) => prev.filter((block) => block.id !== blockId));
  }, []);

  return {
    textBlocks,
    addTextBlock,
    updatePosition,
    removeTextBlock,
  };
};

export default useTextBlocks;
