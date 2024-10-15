import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Rnd } from "react-rnd";
import { PiCheckCircle, PiXCircle } from "react-icons/pi";

const ImageBlock = ({
  id,
  x,
  y,
  src,
  updatePosition,
  setSelectedBlockId,
  onClick,
}) => {
  const [imageUrl, setImageUrl] = useState(src);
  const [showInput, setShowInput] = useState(true);
  const [size, setSize] = useState({ width: 200, height: 150 });
  const rndRef = useRef(null);

  const handleDragStop = (e, d) => {
    updatePosition(id, d.x, d.y);
  };

  const handleResize = (e, direction, ref, delta, position) => {
    setSize({
      width: ref.style.width,
      height: ref.style.height,
    });
    updatePosition(id, position.x, position.y);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleConfirm = () => {
    setShowInput(false);
  };

  const handleCancel = () => {
    setImageUrl(src);
    setShowInput(false);
  };

  return (
    <Rnd
      ref={rndRef}
      size={{ width: size.width, height: size.height }}
      position={{ x, y }}
      onDragStop={handleDragStop}
      onResize={handleResize}
      onMouseDown={() => setSelectedBlockId(id)}
      onClick={onClick}
      bounds="parent"
      dragHandleClassName="drag-handle"
    >
      <div className="relative">
        <div className="drag-handle absolute inset-0 cursor-move" />
        <img
          src={imageUrl}
          alt="User uploaded"
          className="w-full h-full object-cover"
        />
        {showInput && (
          <>
            <div className="absolute bottom-0 left-0 right-0 p-1">
              <input
                type="text"
                value={imageUrl}
                onChange={handleImageUrlChange}
                className="w-full border rounded p-1"
                placeholder="Enter image URL"
              />
            </div>
            <div className="absolute bottom-0 right-0 mb-[-30px] mr-1 flex">
              <button
                onClick={handleConfirm}
                className="text-green-500 p-1 rounded mr-1"
              >
                <PiCheckCircle size={20} />
              </button>
              <button
                onClick={handleCancel}
                className="text-red-500 p-1 rounded"
              >
                <PiXCircle size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </Rnd>
  );
};

ImageBlock.propTypes = {
  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  updatePosition: PropTypes.func.isRequired,
  setSelectedBlockId: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageBlock;
