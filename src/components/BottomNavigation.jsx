import PropTypes from "prop-types";
import { PiGear, PiTrash } from "react-icons/pi";

const BottomNavigation = ({ selectedBlock, selectedBlockId, removeBlock }) => {
  const handleRemove = () => {
    if (selectedBlock && selectedBlockId) {
      removeBlock(selectedBlock, selectedBlockId);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-base-200 p-4 shadow-lg flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <PiGear className="text-2xl text-gray-600" />
        <span className="font-medium">Settings</span>
      </div>
      <div className="flex items-center space-x-4">
        {selectedBlock && selectedBlockId ? (
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Selected: {selectedBlock}</span>
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
