import {
  FaMicrophone,
  FaPaperPlane,
  FaExclamationTriangle,
} from "react-icons/fa";
import DbSelection from "./DbSelection";

const Sidebar = ({ query, setQuery, onSend, chatHistory }) => {
  return (
    <div className="bg-white  shadow space-y-4">
      <div className=" gap-2 bg-white p-2 rounded shadow flex flex-col">
        <div className="flex-1 overflow-y-auto px-2 space-y-2">
          {chatHistory?.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.isUser ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`p-2 rounded shadow max-w-xs ${
                  msg.isUser
                    ? "bg-green-700 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-2 ">
          <DbSelection />
        </div>
        <div className=" p-2 m-2 rounded flex flex-col space-x-2">
          <label htmlFor="" className="m-1">
            Type your query and Speak
          </label>
          <textarea
            className=" p-2  border-green-800 rounded border-2 shadow  mb-2 resize-none bg-white outline-none text-black
            focus:outline-none focus:ring-2 focus:ring-green-700"
            name="query"
            placeholder="Type your message..."
            id="query"
            rows={3}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <button className="">
              <FaMicrophone size={25} color="green" className="mr-1" />
            </button>
            <button
              onClick={onSend}
              className="bg-green-700 text-white px-3 py-1 rounded shadow flex items-center space-x-2"
            >
              <FaPaperPlane />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
