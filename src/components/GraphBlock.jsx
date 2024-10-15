import { useState } from "react";
import { Rnd } from "react-rnd";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../App.css";
import PropTypes from "prop-types";

const GraphBlock = ({
  id,
  x,
  y,
  updatePosition,
  setSelectedBlockId,
  isSelected,
}) => {
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [graphType, setGraphType] = useState("line");
  const [data, setData] = useState([
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
  ]);

  const handleBlockClick = (e) => {
    e.stopPropagation();
    setSelectedBlockId(id);
  };

  const generateRandomData = () => {
    const newData = Array.from({ length: 5 }, (_, i) => ({
      name: `Item ${i + 1}`,
      value: Math.floor(Math.random() * 1000),
    }));
    setData(newData);
  };

  const addCustomData = () => {
    const name = prompt("Enter data name:");
    const value = parseInt(prompt("Enter data value:"));
    if (name && !isNaN(value)) {
      setData([...data, { name, value }]);
    }
  };

  const renderGraph = () => {
    switch (graphType) {
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        );
      case "pie":
        return (
          <PieChart>
            <Pie dataKey="value" data={data} fill="#8884d8" label />
            <Tooltip />
          </PieChart>
        );
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        );
      default:
        return null;
    }
  };

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x, y }}
      onDragStop={(e, d) => {
        updatePosition(id, d.x, d.y);
      }}
      onResize={(e, direction, ref, delta, position) => {
        setSize({
          width: ref.style.width,
          height: ref.style.height,
        });
        updatePosition(id, position.x, position.y);
      }}
      minWidth={200}
      minHeight={200}
      maxWidth={800}
      maxHeight={600}
      bounds="parent"
      onClick={handleBlockClick}
    >
      <div className="bg-white p-4 rounded-lg shadow-lg h-full flex flex-col">
        <ResponsiveContainer width="100%" height="100%">
          {renderGraph()}
        </ResponsiveContainer>
        {isSelected && (
          <div className="mt-4 flex justify-between items-center">
            <select
              value={graphType}
              onChange={(e) => setGraphType(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="line">Line</option>
              <option value="pie">Pie</option>
              <option value="bar">Bar</option>
            </select>
            <button
              onClick={addCustomData}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Add Data
            </button>
            <button
              onClick={generateRandomData}
              className="p-2 bg-green-500 text-white rounded"
            >
              Random Data
            </button>
          </div>
        )}
      </div>
    </Rnd>
  );
};

GraphBlock.propTypes = {
  id: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  updatePosition: PropTypes.func.isRequired,
  setSelectedBlockId: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default GraphBlock;
