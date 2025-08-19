import "./App.css";
import { Header } from "./components/Header";
import { Instructions } from "./components/Instructions";
import Sidebar from "./components/Sidebar";
import { QueryBox } from "./components/QueryBox";
import { DataTable } from "./components/DataTable";
import { useState } from "react";
import { processQuery } from "./services/apiService";
import { ChartDisplay } from "./components/ChartDisplay";
import LookerEmbed from "./components/LookerEmbed";
import ChartModal from "./components/ChartModal";
import { LoadingMessage } from "./components/LoadingMessage";

import { Toaster } from "react-hot-toast";

function App() {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDb, setSelectedDb] = useState("Selected Database");
  const [showChartModal, setShowChartModal] = useState(false);

  const isChartable = (data) => {
    if (!Array.isArray(data) || data.length === 0) return false;

    const sample = data[0];
    const hasNumeric = Object.values(sample).some(
      (val) => typeof val === "number"
    );
    const hasLabel = Object.values(sample).some(
      (val) => typeof val === "string"
    );

    return hasNumeric && hasLabel;
  };

  const handleSend = async () => {
    if (!query.trim()) return;

    const updatedHistory = [...chatHistory, { text: query, isUser: true }];
    setChatHistory(updatedHistory);
    setQuery("");
    setIsLoading(true);

    try {
      if (selectedDb === "Selected Database") {
        alert("Please select a valid database to send the query.");
        return;
      }

      const apiResponse = await processQuery(query, selectedDb);

      setChatHistory((prev) => [
        ...prev,
        { text: apiResponse.chatResponse || "Query processed", isUser: false },
      ]);
      setResponseData(apiResponse);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { text: "Error processing query", isUser: false },
      ]);
      console.error("Error processing query:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 ">
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
        data-cy="header"
      />

      <Toaster position="top-left" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            sidebarOpen ? "w-120" : "w-0"
          } overflow-hidden`}
          data-cy="sidebar"
        >
          <Sidebar
            query={query}
            onSend={handleSend}
            setQuery={setQuery}
            chatHistory={chatHistory}
            isLoading={isLoading}
            selectedDb={selectedDb}
            setSelectedDb={setSelectedDb}
            data-cy="sidebar-component"
          />
        </div>
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="overflow-y-auto p-4 space-y-8">
            {/* Instructions should stay visible and interactive */}
            <Instructions
              onNewChat={() => {
                setQuery("");
                setChatHistory([]);
                setResponseData(null);
              }}
            />

            {/* Wrap rest of content in relative container */}
            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-40 flex items-center justify-center">
                  <LoadingMessage />
                </div>
              )}

              <QueryBox sqlQuery={responseData?.sqlQuery} />

              {isChartable(responseData?.tabularData) && (
                <ChartModal
                  isOpen={showChartModal}
                  onClose={() => setShowChartModal(false)}
                  data={responseData.tabularData}
                />
              )}

              <DataTable
                data={responseData?.tabularData}
                onToggleChart={() => setShowChartModal(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
