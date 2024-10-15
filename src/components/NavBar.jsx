import { useState, useEffect } from "react";
import Svg from "../utils/Svg";
import Drawer from "./Drawer";
import { Link } from "react-router-dom";
import "../App.css";

const NavBar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
      <div className="navbar bg-base-100">
        <div className="flex-none">
          <label
            htmlFor="drawer-toggle"
            className="btn btn-square btn-ghost drawer-button"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Svg name="menu" />
          </label>
        </div>
        <div className="flex-1">
          <Link
            className="btn btn-ghost text-3xl font-bold gradient-text"
            to="/"
          >
            Sketch
          </Link>
        </div>
        <div className="flex-none">
          <label className="swap swap-rotate btn btn-square btn-ghost">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
              className="theme-controller"
            />
            <Svg name="sun" className="swap-on fill-current w-6 h-6" />
            <Svg name="moon" className="swap-off fill-current w-6 h-6" />
          </label>
        </div>
      </div>
    </Drawer>
  );
};

export default NavBar;
