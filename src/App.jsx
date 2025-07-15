import "./App.css";
import { Header } from "./components/Header";
import { Instructions } from "./components/Instructions";
import Sidebar from "./components/Sidebar";
import { QueryBox } from "./components/QueryBox";
import { DataTable } from "./components/DataTable";
import { useState } from "react";
import mockResponse from "./data/mockResponse";

function App() {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [responseData, setResponseData] = useState(null);

  const handleSend = () => {
    if (!query.trim()) return;

    //Add user query to chat history
    const updatedHistory = [...chatHistory, { text: query, isUser: true }];
    setChatHistory(updatedHistory);
    setQuery("");
    // Simulate API response
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { text: mockResponse.chatResponse, isUser: false },
      ]);
      setResponseData(mockResponse);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-3 h-full">
        <div className="lg:col-span-1">
          <Sidebar
            query={query}
            onSend={handleSend}
            setQuery={setQuery}
            chatHistory={chatHistory}
          />
        </div>
        <div className="lg:col-span-2 md:col-span-1 space-y-8">
          <Instructions />
          <QueryBox sqlQuery={responseData?.sqlQuery} />
          <DataTable data={responseData?.tabularData} />
        </div>
      </div>
    </div>
  );
}

export default App;
