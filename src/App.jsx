import "./App.css";
import { Header } from "./components/Header";
import { Instructions } from "./components/Instructions";
import Sidebar from "./components/Sidebar";
import { QueryBox } from "./components/QueryBox";
import { DataTable } from "./components/DataTable";
import { useState } from "react";
import { processQuery } from "./services/apiService";

function App() {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); // NEW

  const handleSend = async () => {
    if (!query.trim()) return;

    const updatedHistory = [...chatHistory, { text: query, isUser: true }];
    setChatHistory(updatedHistory);
    setQuery("");

    try {
      const apiResponse = await processQuery(query);
      setChatHistory((prev) => [
        ...prev,
        { text: apiResponse.chatResponse, isUser: false },
      ]);
      setResponseData(apiResponse);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { text: "Error processing query", isUser: false },
      ]);
      console.error("Error processing query:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 ">
      <Header
        onToggleSidebar={() => {
          console.log("Toggle Sidebar", sidebarOpen);
          setSidebarOpen(!sidebarOpen);
        }}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            sidebarOpen ? "w-80" : "w-0"
          } overflow-hidden`}
        >
          <Sidebar
            query={query}
            onSend={handleSend}
            setQuery={setQuery}
            chatHistory={chatHistory}
          />
        </div>
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-8">
          <Instructions
            onNewChat={() => {
              setQuery("");
              setChatHistory([]);
              setResponseData(null);
            }}
          />
          <QueryBox sqlQuery={responseData?.sqlQuery} />
          <DataTable data={responseData?.tabularData} />
        </div>
      </div>
    </div>
  );
}

export default App;
