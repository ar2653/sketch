import { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { PiX, PiWrench, PiGearFine } from "react-icons/pi";
const Drawer = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !event.target.closest(".drawer-side")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <PiX className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-grow overflow-y-auto">
            <ul className="menu p-4 w-full text-base-content">
              <li className="mb-2">
                <Link
                  to="/builder"
                  className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                >
                  <PiWrench className="h-5 w-5" />
                  <span>Builder</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/settings"
                  className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                >
                  <PiGearFine className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="drawer-content">{children}</div>
    </>
  );
};

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Drawer;
