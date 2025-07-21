import { FiMenu } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

export const Header = ({ onToggleSidebar }) => {
  return (
    <div className="flex items-center bg-green-800 p-4 w-full shadow-md sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="w-1/4">
        <h1 className="text-xl font-semibold text-white text-left">
          DATA BANK
        </h1>
      </div>

      {/* Right: Menu + User Info */}
      <div className="w-4/5 flex justify-between items-center">
        <div className="w-1/2 flex items-center">
          <button
            onClick={onToggleSidebar}
            className="flex items-center text-white hover:text-gray-200"
          >
            <FiMenu className="text-2xl" />
            <span className="ml-2 text-lg">MENU</span>
          </button>
        </div>

        <div className="w-1/2 flex justify-end items-center space-x-4">
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
    </div>
  );
};
