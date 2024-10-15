import { useState } from "react";
import { Rnd } from "react-rnd";
import PropTypes from "prop-types";

const AvatarBlock = ({
  id,
  x,
  y,
  updatePosition,
  setSelectedBlockId,
  onClick,
}) => {
  const [size, setSize] = useState({ width: 128, height: 128 });

  const handleDragStop = (e, d) => {
    updatePosition(id, d.x, d.y);
  };

  const handleResize = (e, direction, ref, delta, position) => {
    setSize({
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    });
    updatePosition(id, position.x, position.y);
  };

  return (
    <Rnd
      size={size}
      position={{ x, y }}
      onDragStop={handleDragStop}
      onResize={handleResize}
      onMouseDown={() => setSelectedBlockId(id)}
      onClick={onClick}
      bounds="parent"
      minWidth={64}
      minHeight={64}
      disableDragging={false}
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        topLeft: true,
        bottomRight: true,
        bottomLeft: true,
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
        border: "1px solid #ddd",
        borderRadius: "4px",
      }}
    >
      <div className="avatar w-full h-full">
        <div className="rounded w-full h-full overflow-hidden">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </Rnd>
  );
};

AvatarBlock.propTypes = {
  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  updatePosition: PropTypes.func.isRequired,
  setSelectedBlockId: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AvatarBlock;
