import "./App.css";
import { useEffect, useState, useRef } from "react";
import { Header } from "./components/Header";
import { Instructions } from "./components/Instructions";
import Sidebar from "./components/Sidebar";
import { QueryBox } from "./components/QueryBox";
import { DataTable } from "./components/DataTable";
import { streamProcessQuery } from "./services/streamApiService";
import { ChartDisplay } from "./components/ChartDisplay";
import LookerEmbed from "./components/LookerEmbed";
import ChartModal from "./components/ChartModal";
import { LoadingMessage } from "./components/LoadingMessage";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

function AppStream() {
    const [query, setQuery] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [responseData, setResponseData] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDb, setSelectedDb] = useState("Selected Database");
    const [showChartModal, setShowChartModal] = useState(false);
    const [streamingStep, setStreamingStep] = useState("");

    const chatHistoryRef = useRef(chatHistory); // Ref to keep track of history for callbacks

    useEffect(() => {
        chatHistoryRef.current = chatHistory;
    }, [chatHistory]);

    useEffect(() => {
        const chatResponse = localStorage.getItem("chatResponse");
        const sqlQuery = localStorage.getItem("sqlQuery");
        const tabularData = localStorage.getItem("tabularData");
        const chatHistoryLoaded = localStorage.getItem("chatHistory");
        const storedDb = localStorage.getItem("selectedDb");

        if (chatResponse || sqlQuery || tabularData) {
            setResponseData({
                chatResponse: chatResponse || "",
                sqlQuery: sqlQuery || "",
                tabularData: tabularData ? JSON.parse(tabularData) : [],
            });
        }

        if (chatHistoryLoaded) {
            setChatHistory(JSON.parse(chatHistoryLoaded));
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

    const handleSend = async () => {
        if (isLoading) return;
        if (!query.trim()) return;

        if (selectedDb === "Selected Database") {
            alert("Please select a valid database to send the query.");
            return;
        }

        const updatedHistory = [...chatHistory, { text: query, isUser: true }];
        // Add an empty message for the bot response which will be streamed into
        const initialBotMessage = { text: "", isUser: false, isStreaming: true };
        const historyWithBot = [...updatedHistory, initialBotMessage];

        setChatHistory(historyWithBot);
        setQuery("");
        setIsLoading(true);
        setStreamingStep("Initializing...");

        // Clear previous response data but keep the chat history as is
        setResponseData({
            chatResponse: "",
            sqlQuery: "",
            tabularData: [],
        });

        let currentBotText = "";

        try {
            await streamProcessQuery(query, selectedDb, {
                onStatus: (statusEvent) => {
                    const step = statusEvent.step || "Processing...";
                    setStreamingStep(step);

                    setChatHistory(currentHistory => {
                        const newHistory = [...currentHistory];
                        if (newHistory.length === 0) return newHistory;

                        const lastMsg = { ...newHistory[newHistory.length - 1] };
                        if (!lastMsg.isUser) {
                            lastMsg.text = `Status: ${step}`;
                            lastMsg.isStreaming = true;
                            newHistory[newHistory.length - 1] = lastMsg;
                        }
                        return newHistory;
                    });
                },
                onToken: (token) => {
                    currentBotText += token;
                    setChatHistory(currentHistory => {
                        const newHistory = [...currentHistory];
                        if (newHistory.length === 0) return newHistory;

                        // Clone the last message to avoid mutating state directly
                        const lastMsg = { ...newHistory[newHistory.length - 1] };
                        if (!lastMsg.isUser) {
                            lastMsg.text = currentBotText;
                            newHistory[newHistory.length - 1] = lastMsg;
                        }
                        return newHistory;
                    });
                },
                onData: (data) => {
                    // bigQuery vs mongo normalization handled in service to some extent, 
                    // but we might need to be careful with structure.
                    // service passes { tabularData, sqlQuery, chatResponse }

                    // If chatResponse came in onData, it might be the full text.
                    // If we were streaming, currentBotText should match or we overwrite?
                    // Usually onData comes at the end.

                    const finalResponse = {
                        chatResponse: data.chatResponse || currentBotText,
                        sqlQuery: data.sqlQuery || "",
                        tabularData: data.tabularData || []
                    };

                    // Normalize tabular data if needed (if not already done in service)
                    // The Service handles mongo normalization logic so we assume data.tabularData is correct.

                    setResponseData(finalResponse);

                    // Update localStorage
                    localStorage.setItem("chatResponse", finalResponse.chatResponse);
                    localStorage.setItem("sqlQuery", finalResponse.sqlQuery);
                    localStorage.setItem("tabularData", JSON.stringify(finalResponse.tabularData));
                    localStorage.setItem("selectedDb", selectedDb);

                    // Update history one last time to remove isStreaming flag if needed
                    setChatHistory(currentHistory => {
                        const newHistory = [...currentHistory];
                        if (newHistory.length === 0) return newHistory;

                        const lastMsg = { ...newHistory[newHistory.length - 1] };
                        lastMsg.text = finalResponse.chatResponse;
                        lastMsg.isStreaming = false;
                        newHistory[newHistory.length - 1] = lastMsg;

                        localStorage.setItem("chatHistory", JSON.stringify(newHistory));
                        return newHistory;
                    });
                }
            });

        } catch (error) {
            console.error("Error processing query:", error);
            const errorMessage = { text: "Error processing query", isUser: false, isError: true };

            setChatHistory(currentHistory => {
                // Remove the loading/streaming message and add error
                const newHistory = [...currentHistory.slice(0, -1), errorMessage]; // remove the partial bot msg
                localStorage.setItem("chatHistory", JSON.stringify(newHistory));
                return newHistory;
            });

            toast.error("Query failed. Please try again.");
        } finally {
            setIsLoading(false);
            setStreamingStep("");
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
                    className={`transition-all duration-300 ease-in-out ${sidebarOpen ? "w-120" : "w-0"
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
                        <Instructions
                            onNewChat={() => {
                                setQuery("");
                                setChatHistory([]);
                                setResponseData(null);
                                localStorage.removeItem("chatResponse");
                                localStorage.removeItem("sqlQuery");
                                localStorage.removeItem("tabularData");
                                localStorage.removeItem("selectedDb");
                            }}
                        />

                        <div className="relative">
                            {isLoading && (
                                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-40 flex flex-col items-center justify-center">
                                    <LoadingMessage />
                                    {streamingStep && (
                                        <div className="mt-2 text-sm text-green-700 font-medium animate-pulse">
                                            {streamingStep}
                                        </div>
                                    )}
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

export default AppStream;
