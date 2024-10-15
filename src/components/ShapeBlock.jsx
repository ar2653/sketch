import { Rnd } from "react-rnd";
import PropTypes from "prop-types";

const ShapeBlock = ({
  id,
  x,
  y,
  shapeType,
  updatePosition,
  setSelectedBlockId,
  onClick,
}) => {
  const getShapeSVG = () => {
    switch (shapeType) {
      case "triangle":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon
              points="50,5 5,95 95,95"
              fill="none"
              stroke="black"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        );
      case "rectangle":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <rect
              x="5"
              y="5"
              width="90"
              height="90"
              fill="none"
              stroke="black"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        );
      case "circle":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="black"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        );
      case "square":
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <rect
              x="5"
              y="5"
              width="90"
              height="90"
              fill="none"
              stroke="black"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Rnd
      default={{
        x: x,
        y: y,
        width: 100,
        height: 100,
      }}
      minWidth={50}
      minHeight={50}
      bounds="parent"
      onDragStop={(e, d) => {
        updatePosition(id, d.x, d.y);
      }}
      onResize={(e, direction, ref, delta, position) => {
        updatePosition(id, position.x, position.y);
      }}
      onClick={() => {
        setSelectedBlockId(id);
        onClick(id);
      }}
    >
      {getShapeSVG()}
    </Rnd>
  );
};

ShapeBlock.propTypes = {
  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  shapeType: PropTypes.string.isRequired,
  updatePosition: PropTypes.func.isRequired,
  setSelectedBlockId: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ShapeBlock;
