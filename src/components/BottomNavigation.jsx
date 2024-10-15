import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { PiGear, PiTrash } from "react-icons/pi";

const BottomNavigation = ({ selectedBlock, selectedBlockId, removeBlock }) => {
  const [prefixes, setPrefixes] = useState([]);
  const [usedPrefixes, setUsedPrefixes] = useState({});

  const fetchRandomWords = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.datamuse.com/words?rel_jjb=block&max=10" // Fetch 10 words
      );
      const words = await response.json();
      setPrefixes(words.map((word) => word.word));
    } catch (error) {
      console.error("Error fetching random words:", error);
      setPrefixes(["Mysterious"]); // Fallback if API fails
    }
  }, []);

  useEffect(() => {
    if (prefixes.length === 0) {
      fetchRandomWords();
    }
  }, [prefixes, fetchRandomWords]);

  useEffect(() => {
    if (selectedBlock && !usedPrefixes[selectedBlockId]) {
      if (prefixes.length === 0) {
        fetchRandomWords();
      } else {
        const prefix = prefixes[0];
        setPrefixes((prevPrefixes) => prevPrefixes.slice(1));
        setUsedPrefixes((prev) => ({ ...prev, [selectedBlockId]: prefix }));
      }
    }
  }, [
    selectedBlock,
    selectedBlockId,
    prefixes,
    usedPrefixes,
    fetchRandomWords,
  ]);

  const handleRemove = () => {
    if (selectedBlock && selectedBlockId) {
      removeBlock(selectedBlock, selectedBlockId);
      setUsedPrefixes((prev) => {
        const updated = { ...prev };
        delete updated[selectedBlockId];
        return updated;
      });
    }
  };

  const displayBlockName =
    selectedBlock && selectedBlockId
      ? `${usedPrefixes[selectedBlockId] || "Loading..."}-${selectedBlock}`
      : "";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-base-200 p-4 shadow-lg flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <PiGear className="text-2xl text-gray-600" />
        <span className="font-medium">Settings</span>
      </div>
      <div className="flex items-center space-x-4">
        {selectedBlock && selectedBlockId ? (
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Selected: {displayBlockName}</span>
            <span>(ID: {selectedBlockId})</span>
            <button
              onClick={handleRemove}
              className="bg-red-500 text-white px-2 py-1 rounded flex items-center"
            >
              <PiTrash className="mr-1" /> Remove
            </button>
          </div>
        ) : (
          <div className="text-sm text-gray-500">No block selected</div>
        )}
      </div>
    </div>
  );
};

BottomNavigation.propTypes = {
  selectedBlock: PropTypes.string,
  selectedBlockId: PropTypes.number,
  removeBlock: PropTypes.func.isRequired,
};

export default BottomNavigation;
