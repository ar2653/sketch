import { useState } from "react";
import { Rnd } from "react-rnd";
import PropTypes from "prop-types";

const TextBlock = ({ id, x, y, updatePosition, setSelectedBlockId }) => {
  const [size, setSize] = useState({ width: 200, height: 40 });

  const handleDragStop = (e, d) => {
    updatePosition(id, d.x, d.y);
  };

  const handleResize = (e, direction, ref) => {
    setSize({
      width: ref.style.width,
      height: ref.style.height,
    });
  };

  const handleClick = () => {
    setSelectedBlockId(id);
  };

  return (
    <Rnd
      size={size}
      position={{ x, y }}
      onDragStop={handleDragStop}
      onResize={handleResize}
      minWidth={100}
      minHeight={30}
      maxWidth={500}
      maxHeight={200}
      bounds="parent"
    >
      <div className="w-full h-full" onClick={handleClick}>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full h-full"
          style={{ resize: "none" }}
        />
      </div>
    </Rnd>
  );
};

TextBlock.propTypes = {
  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  updatePosition: PropTypes.func.isRequired,
  setSelectedBlockId: PropTypes.func.isRequired,
};

export default TextBlock;
