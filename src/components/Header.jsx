import { FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

export const Header = ({ onToggleSidebar, sidebarOpen }) => {
  return (
    <div className="flex items-center justify-between bg-green-800 p-4 w-full shadow-md sticky top-0 z-50">
      {/* Left: Menu + Logo */}
      <div className="flex items-center gap-4 min-w-[200px]">
        <button
          onClick={onToggleSidebar}
          className="flex items-center text-white hover:text-gray-200 transition-transform duration-300 active:scale-95"
        >
          <span className="relative w-6 h-6 flex items-center justify-center">
            <span
              className={`absolute transition-opacity duration-300 ${
                sidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              <FiMenu className="text-2xl" />
            </span>
            <span
              className={`absolute transition-opacity duration-300 ${
                sidebarOpen ? "opacity-0" : "opacity-100"
              }`}
            >
              <FiX className="text-2xl" />
            </span>
          </span>
          <span className="ml-2 text-lg">{sidebarOpen ? "Menu" : "Menu"}</span>
        </button>

        <h1 className="text-xl font-semibold text-white">DATA BANK</h1>
      </div>

      {/* Right: User Info */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-white">
          <FaUserCircle className="text-xl" />
          <span className="text-sm">Austyn Bambrook</span>
        </div>
        <button className="flex items-center px-3 py-1 rounded text-white hover:bg-gray-700">
          <BiLogOut className="mr-1" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};
