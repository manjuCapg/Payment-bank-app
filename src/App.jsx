import "./App.css";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Instructions } from "./components/Instructions";
import Sidebar from "./components/Sidebar";
import { QueryBox } from "./components/QueryBox";
import { DataTable } from "./components/DataTable";
import {
  processQuery,
  getSessionId,
  resetSessionId,
} from "./services/apiService";
import { ChartDisplay } from "./components/ChartDisplay";
import LookerEmbed from "./components/LookerEmbed";
import ChartModal from "./components/ChartModal";
import { LoadingMessage } from "./components/LoadingMessage";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDb, setSelectedDb] = useState("Selected Database");
  const [showChartModal, setShowChartModal] = useState(false);
  const [sessionId, setSessionId] = useState(getSessionId());

  const startNewChat = () => {
    setQuery("");
    setChatHistory([]);
    setResponseData(null);
    resetSessionId();
    setSessionId(getSessionId());
    localStorage.removeItem("chatResponse");
    localStorage.removeItem("sqlQuery");
    localStorage.removeItem("tabularData");
    localStorage.removeItem("selectedDb");
  };

  useEffect(() => {
    const chatResponse = localStorage.getItem("chatResponse");
    const sqlQuery = localStorage.getItem("sqlQuery");
    const tabularData = localStorage.getItem("tabularData");
    const chatHistory = localStorage.getItem("chatHistory");
    const storedDb = localStorage.getItem("selectedDb");

    if (chatResponse || sqlQuery || tabularData) {
      setResponseData({
        chatResponse: chatResponse || "",
        sqlQuery: sqlQuery || "",
        tabularData: tabularData ? JSON.parse(tabularData) : [],
      });
    }

    if (chatHistory) {
      setChatHistory(JSON.parse(chatHistory));
    }

    if (storedDb) {
      setSelectedDb(storedDb);
    }
  }, []);

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

  const handleSend = async (query, sessionIdFromSidebar) => {
    if (!query.trim()) return;

    const updatedHistory = [...chatHistory, { text: query, isUser: true }];
    setChatHistory(updatedHistory);
    setQuery("");
    setIsLoading(true);

    try {
      if (selectedDb === "Selected Database") {
        alert("Please select a valid database to send the query.");
        setIsLoading(false);
        return;
      }

      const apiResponse = await processQuery(
        query,
        selectedDb,
        sessionIdFromSidebar
      );

      const newHistory = [
        ...updatedHistory,
        { text: apiResponse.chatResponse || "Query processed", isUser: false },
      ];

      localStorage.setItem("chatHistory", JSON.stringify(newHistory));
      localStorage.setItem("chatResponse", apiResponse.chatResponse || "");
      localStorage.setItem("sqlQuery", apiResponse.sqlQuery || "");
      localStorage.setItem(
        "tabularData",
        JSON.stringify(apiResponse.tabularData || [])
      );
      localStorage.setItem("selectedDb", selectedDb);

      setChatHistory(newHistory);
      setResponseData(apiResponse);
    } catch (error) {
      const errorMessage = { text: "Error processing query", isUser: false };
      const errorHistory = [...updatedHistory, errorMessage];

      localStorage.setItem("chatHistory", JSON.stringify(errorHistory));
      setChatHistory(errorHistory);
      toast.error("Query failed. Please try again.");

      setResponseData({
        chatResponse: "",
        sqlQuery: "",
        tabularData: [],
      });

      console.error("Error processing query:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
        data-cy="header"
      />
      <Toaster position="top-left" />
      <div className="flex flex-1 overflow-hidden">
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
        <div className="flex-1 overflow-hidden">
          <div className="overflow-y-auto p-4 space-y-8">
            <Instructions onNewChat={startNewChat} sessionId={sessionId} />
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
              <div className="relative">
                <DataTable
                  data={responseData?.tabularData || []}
                  onToggleChart={() => setShowChartModal(true)}
                  selectedDb={selectedDb}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
