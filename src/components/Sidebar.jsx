import {
  FaMicrophone,
  FaPaperPlane,
  FaDatabase,
  FaSpinner,
} from "react-icons/fa";
import DbSelection from "./DbSelection";
import React, { useState } from "react";
import { LoadingMessage } from "./LoadingMessage";

const Sidebar = ({
  query,
  setQuery,
  onSend,
  chatHistory,
  isLoading,
  selectedDb,
  setSelectedDb,
}) => {
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("en-US");

  const isDbvalid = selectedDb === "Big Query DB" || selectedDb === "Mongo DB";

  const handleSubmit = (e, customQuery = null) => {
    if (e && e.preventDefault) e.preventDefault();

    const finalQuery = customQuery ?? query;

    if (!finalQuery.trim()) {
      setError("Query cannot be empty");
      return;
    }
    if (!isDbvalid) {
      setError("Please select a valid database");
      return;
    }
    if (error) {
      setError("");
    }

    setQuery(finalQuery);
    onSend();
  };

  const handleMicClick = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      handleSubmit(null, transcript);
    };

    recognition.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  // Extract main answer before either "Follow-up Questions:" or "Further Analysis Questions:"
  const getMainAnswer = (text) => {
    const followUpIndex = text.indexOf("Follow-up Questions:");
    const analysisIndex = text.indexOf("Further Analysis Questions:");
    const splitIndex =
      followUpIndex !== -1
        ? followUpIndex
        : analysisIndex !== -1
        ? analysisIndex
        : -1;
    return splitIndex !== -1 ? text.slice(0, splitIndex).trim() : text;
  };

  // Extract follow-up questions from bolded text
  const extractFollowUpQuestions = (text) => {
    const matches = [...text.matchAll(/\*\*(.*?)\*\*/g)];
    return matches.map((match) => match[1]);
  };

  // Only get follow-up questions from the latest Copilot message
  const lastCopilotMessage = [...chatHistory]
    .reverse()
    .find((msg) => !msg.isUser);
  const followUpQuestions = lastCopilotMessage
    ? extractFollowUpQuestions(lastCopilotMessage.text)
    : [];

  const handleFollowUpClick = (question) => {
    setQuery(question);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white shadow">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chatHistory?.length > 0 ? (
          chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-md shadow ${
                  msg.isUser
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.isUser ? msg.text : getMainAnswer(msg.text)}
              </div>
            </div>
          ))
        ) : (
          <div className="mt-10 text-center text-gray-500">
            <FaDatabase className="text-4xl mx-auto mb-3 text-gray-300" />
            <h3 className="text-lg font-semibold">No Data Available</h3>
            <p>Select a database and run a query to display results.</p>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-lg max-w-md shadow bg-gray-100 text-gray-800">
              <LoadingMessage />
            </div>
          </div>
        )}
      </div>

      {/* Follow-up Questions (styled like Copilot) */}
      {followUpQuestions.length > 0 && (
        <div className="px-4 py-3 border-b flex flex-wrap gap-2 ">
          {followUpQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleFollowUpClick(q)}
              className="bg-white border border-green-600 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-50 hover:border-green-700 transition duration-150 ease-in-out focus:outline-none"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="border-t p-4 bg-white sticky bottom-0">
        <DbSelection onDbChange={setSelectedDb} />

        <form onSubmit={handleSubmit} className="mt-3 space-y-2">
          <div className="text-sm font-medium text-gray-700 m-1">
            Type your query and speak
          </div>
          <textarea
            className="w-full p-2 border border-gray-300 rounded shadow-sm resize-none focus:ring-2 focus:ring-green-600 focus:outline-none"
            rows={3}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your message..."
          />
          {error && (
            <div className="text-red-600 text-sm flex items-center gap-1">
              <FaDatabase />
              {error}
            </div>
          )}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleMicClick}
              disabled={isListening}
            >
              {isListening ? (
                <FaSpinner className="animate-spin text-green-600" size={24} />
              ) : (
                <FaMicrophone size={24} className="text-green-600" />
              )}
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded shadow flex items-center gap-2"
            >
              <FaPaperPlane />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
