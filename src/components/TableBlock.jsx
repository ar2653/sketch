import { useState } from "react";
import { Rnd } from "react-rnd";
import PropTypes from "prop-types";
import { PiPlus } from "react-icons/pi";

const EditableCell = ({ value, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [cellValue, setCellValue] = useState(value);

  EditableCell.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    onChange(cellValue);
  };

  const handleChange = (e) => {
    setCellValue(e.target.value);
  };

  return editing ? (
    <input
      type="text"
      value={cellValue}
      onChange={handleChange}
      onBlur={handleBlur}
      autoFocus
    />
  ) : (
    <div onDoubleClick={handleDoubleClick}>{cellValue}</div>
  );
};

const TableBlock = ({
  id,
  x,
  y,
  updatePosition,
  onClick,
  setSelectedBlockId,
}) => {
  const [size, setSize] = useState({ width: 600, height: 300 });
  const [tableData, setTableData] = useState([
    ["Header 1", "Header 2", "Header 3"],
    ["Row 1, Cell 1", "Row 1, Cell 2", "Row 1, Cell 3"],
    ["Row 2, Cell 1", "Row 2, Cell 2", "Row 2, Cell 3"],
    ["Row 3, Cell 1", "Row 3, Cell 2", "Row 3, Cell 3"],
  ]);

  const handleDragStop = (e, d) => {
    updatePosition(id, d.x, d.y);
  };

  const handleResize = (e, direction, ref) => {
    setSize({
      width: ref.style.width,
      height: ref.style.height,
    });
  };

  const handleCellChange = (rowIndex, cellIndex, newValue) => {
    const newTableData = tableData.map((row, i) =>
      i === rowIndex
        ? row.map((cell, j) => (j === cellIndex ? newValue : cell))
        : row
    );
    setTableData(newTableData);
  };

  const addRow = () => {
    const newRow = Array(tableData[0].length).fill("New Cell");
    setTableData([...tableData, newRow]);
  };

  const addColumn = () => {
    const newTableData = tableData.map((row, index) =>
      index === 0 ? [...row, "New Header"] : [...row, "New Cell"]
    );
    setTableData(newTableData);
  };

  const handleBlockClick = (e) => {
    e.stopPropagation(); // Prevent click from propagating to parent elements
    setSelectedBlockId(id);
    onClick(); // Keep the existing onClick behavior
  };

  return (
    <div className="relative">
      <Rnd
        size={size}
        position={{ x, y }}
        onDragStop={handleDragStop}
        onResize={handleResize}
        minWidth={300}
        minHeight={200}
        maxWidth={1000}
        maxHeight={600}
        onClick={handleBlockClick}
      >
        <div className="h-full bg-base-100 shadow-xl rounded-lg">
          <table className="table w-full h-full">
            <thead>
              <tr>
                {tableData[0].map((header, index) => (
                  <th key={index}>
                    <EditableCell
                      value={header}
                      onChange={(newValue) =>
                        handleCellChange(0, index, newValue)
                      }
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      <EditableCell
                        value={cell}
                        onChange={(newValue) =>
                          handleCellChange(rowIndex + 1, cellIndex, newValue)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="absolute inset-x-0 bottom-0 h-8 group">
            <button
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 p-1 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 hover:text-gray-800 transition-colors opacity-0 group-hover:opacity-100"
              onClick={addRow}
            >
              <PiPlus size={16} />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 w-8 group">
            <button
              className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 p-1 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 hover:text-gray-800 transition-colors opacity-0 group-hover:opacity-100"
              onClick={addColumn}
            >
              <PiPlus size={16} />
            </button>
          </div>
        </div>
      </Rnd>
    </div>
  );
};

TableBlock.propTypes = {
  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  updatePosition: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  setSelectedBlockId: PropTypes.func.isRequired,
};

export default TableBlock;
