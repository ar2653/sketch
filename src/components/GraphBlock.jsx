import { useState } from "react";
import { Rnd } from "react-rnd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../App.css";
import PropTypes from "prop-types";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

const GraphBlock = ({ id, x, y, updatePosition, setSelectedBlockId }) => {
  const [size, setSize] = useState({ width: 400, height: 300 });

  const handleBlockClick = (e) => {
    e.stopPropagation();
    setSelectedBlockId(id);
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
      <div className="bg-white p-4 rounded-lg shadow-lg h-full">
        <ResponsiveContainer width="100%" height="100%">
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
        </ResponsiveContainer>
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
};

export default GraphBlock;
