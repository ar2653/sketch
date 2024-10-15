import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const ConfigDrawer = ({ id, type, config, isOpen, onClose }) => {
  const [localConfig, setLocalConfig] = useState(config || {});

  useEffect(() => {
    if (config) {
      setLocalConfig(config);
    }
  }, [config]);

  const handleGraphTypeChange = (e) => {
    const newGraphType = e.target.value;
    setLocalConfig((prev) => ({ ...prev, graphType: newGraphType }));
    if (config && config.setGraphType) {
      config.setGraphType(newGraphType);
    }
  };

  const handleDataChange = (index, field, value) => {
    if (!localConfig.data) return;

    const newData = [...localConfig.data];
    newData[index][field] = field === "value" ? Number(value) : value;
    setLocalConfig((prev) => ({ ...prev, data: newData }));
    if (config && config.setData) {
      config.setData(newData);
    }
  };

  const handleImageSrcChange = (e) => {
    const newSrc = e.target.value;
    setLocalConfig((prev) => ({ ...prev, src: newSrc }));
    if (config && config.setSrc) {
      config.setSrc(newSrc);
    }
  };

  const renderGraphConfig = () => {
    if (!localConfig || !localConfig.graphType || !localConfig.data) {
      return <p>No graph configuration available.</p>;
    }

    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">Graph Configuration</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Graph Type</label>
          <select
            value={localConfig.graphType}
            onChange={handleGraphTypeChange}
            className="select select-bordered w-full"
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-2">Data</h4>
          {localConfig.data.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item.name}
                onChange={(e) =>
                  handleDataChange(index, "name", e.target.value)
                }
                className="input input-bordered w-1/2"
              />
              <input
                type="number"
                value={item.value}
                onChange={(e) =>
                  handleDataChange(index, "value", e.target.value)
                }
                className="input input-bordered w-1/2"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderImageConfig = () => (
    <div>
      <h3 className="text-lg font-semibold mb-2">Image Configuration</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          type="text"
          value={localConfig.src || ""}
          onChange={handleImageSrcChange}
          className="input input-bordered w-full"
          placeholder="Enter image URL"
        />
      </div>
    </div>
  );

  return (
    <div className={`drawer drawer-end ${isOpen ? "drawer-open" : ""}`}>
      <input
        id="config-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={onClose}
      />
      <div className="drawer-content">{/* Page content here */}</div>
      <div className="drawer-side">
        <label
          htmlFor="config-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={onClose}
        ></label>
        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <h2 className="text-xl font-bold mb-4">Block Configuration</h2>
          <p className="mb-4">ID: {id}</p>
          {type === "graph" && renderGraphConfig()}
          {type === "image" && renderImageConfig()}
        </div>
      </div>
    </div>
  );
};

ConfigDrawer.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  config: PropTypes.shape({
    graphType: PropTypes.string,
    data: PropTypes.array,
    setGraphType: PropTypes.func,
    setData: PropTypes.func,
    src: PropTypes.string,
    setSrc: PropTypes.func,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ConfigDrawer;
