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
  Cell,
} from "recharts";
import "../App.css";
import PropTypes from "prop-types";
import { PiGear } from "react-icons/pi";

const GraphBlock = ({
  id,
  x,
  y,
  updatePosition,
  setSelectedBlockId,
  setConfigDrawer,
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

  const handleConfigClick = (e) => {
    e.stopPropagation();
    setSelectedBlockId(id);
    setConfigDrawer({
      open: true,
      id: id,
      type: "graph",
      config: {
        graphType,
        setGraphType: (newType) => setGraphType(newType),
        data,
        setData: (newData) => setData(newData),
      },
    });
    // Ensure the drawer is opened
    const drawerCheckbox = document.getElementById("config-drawer");
    if (drawerCheckbox) {
      drawerCheckbox.checked = true;
    }
  };

  // Add this new constant for color schemes
  const colorSchemes = {
    line: ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"],
    pie: ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"],
    bar: ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"],
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
            {Object.keys(data[0])
              .filter((key) => key !== "name")
              .map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colorSchemes.line[index % colorSchemes.line.length]}
                  strokeWidth={2}
                />
              ))}
          </LineChart>
        );
      case "pie":
        return (
          <PieChart>
            <Pie dataKey="value" data={data} fill="#8884d8" label>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorSchemes.pie[index % colorSchemes.pie.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
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
            {Object.keys(data[0])
              .filter((key) => key !== "name")
              .map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colorSchemes.bar[index % colorSchemes.bar.length]}
                />
              ))}
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
      <div className="bg-white rounded-lg border border-gray-200 shadow-lg h-full flex flex-col relative group overflow-hidden">
        <div className="flex-grow p-4">
          <ResponsiveContainer width="100%" height="100%">
            {renderGraph()}
          </ResponsiveContainer>
        </div>
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="tooltip tooltip-left" data-tip="Configure">
            <PiGear
              onClick={handleConfigClick}
              className="text-2xl text-gray-600 hover:text-gray-800 focus:outline-none cursor-pointer bg-white rounded-full p-1 shadow-md"
            />
          </div>
        </div>
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
  setConfigDrawer: PropTypes.func.isRequired,
};

export default GraphBlock;
