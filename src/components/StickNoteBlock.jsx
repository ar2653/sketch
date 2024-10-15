import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Rnd } from "react-rnd";
import { PiCheckCircle, PiXCircle } from "react-icons/pi";

const StickNoteBlock = ({
  initialContent = "",
  initialColor = "#ffd700",
  initialWidth = 200,
  initialHeight = 200,
}) => {
  const [color, setColor] = useState(initialColor);
  const [tempColor, setTempColor] = useState(initialColor);
  const [content, setContent] = useState(initialContent);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const contentEditableRef = useRef(null);

  const handleContentChange = () => {
    // Do nothing on every input to prevent rerendering.
  };

  const handleBlur = () => {
    // On blur, update the state with the current content in the div.
    if (contentEditableRef.current) {
      setContent(contentEditableRef.current.innerText);
    }
  };

  const colorOptions = ["#ffd700", "#ff7eb9", "#7afcff", "#feff9c", "#fff740"];

  const noteStyle = {
    backgroundColor: color,
    padding: "20px",
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
    transform: "rotate(-2deg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
    fontSize: "18px",
    color: "#333",
    cursor: "move",
    position: "relative",
  };

  const contentStyle = {
    width: "100%",
    height: "100%",
    outline: "none",
    overflow: "auto",
    whiteSpace: "pre-wrap",
  };

  const handleColorSelect = (selectedColor) => {
    setTempColor(selectedColor);
    setColor(selectedColor);
  };

  const handleConfirmColor = () => {
    setShowColorPicker(false);
  };

  const handleCancelColor = () => {
    setTempColor(color);
    setShowColorPicker(false);
  };

  return (
    <Rnd
      style={{
        ...noteStyle,
        backgroundColor: showColorPicker ? tempColor : color,
      }}
      default={{
        x: 0,
        y: 0,
        width: initialWidth,
        height: initialHeight,
      }}
      minWidth={100}
      minHeight={100}
      bounds="window"
    >
      <div
        ref={contentEditableRef}
        contentEditable
        style={contentStyle}
        onInput={handleContentChange}
        onBlur={handleBlur}
        suppressContentEditableWarning={true}
      >
        {content}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "-30px",
          right: "0",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        {showColorPicker && (
          <>
            {colorOptions.map((colorOption) => (
              <div
                key={colorOption}
                onClick={() => handleColorSelect(colorOption)}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: colorOption,
                  cursor: "pointer",
                  border:
                    colorOption === tempColor
                      ? "2px solid #333"
                      : "1px solid #333",
                }}
              />
            ))}
            <button
              onClick={handleConfirmColor}
              className="text-green-500 p-1 rounded"
            >
              <PiCheckCircle />
            </button>
            <button
              onClick={handleCancelColor}
              className="text-red-500 p-1 rounded"
            >
              <PiXCircle />
            </button>
          </>
        )}
        {!showColorPicker && (
          <button
            onClick={() => setShowColorPicker(true)}
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: color,
              cursor: "pointer",
              border: "1px solid #333",
            }}
          />
        )}
      </div>
    </Rnd>
  );
};

StickNoteBlock.propTypes = {
  initialContent: PropTypes.string,
  initialColor: PropTypes.string,
  initialWidth: PropTypes.number,
  initialHeight: PropTypes.number,
};

export default StickNoteBlock;
