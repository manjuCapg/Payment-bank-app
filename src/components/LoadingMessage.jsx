import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const dots = ["", ".", "..", "..."];

export const LoadingMessage = () => {
  const [dotIndex, setDotIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % dots.length);
    }, 500); // Change every 500ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <div className="flex items-center gap-3 text-gray-600 animate-pulse">
      <FaSpinner className="animate-spin text-green-600" />
      <span className="font-medium">Generating response{dots[dotIndex]}</span>
    </div>
  );
};
