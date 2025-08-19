// hooks/useSuggestions.js
import { useEffect, useState } from "react";

const suggestions = [
  "Show me the top 10 transactions",
  "What is the average transaction amount?",
  "List all payment types",
  "Show transactions by date",
  "Which payment instrument type has the highest average transaction amount?",
];

export const useSuggestions = (query) => {
  const [prediction, setPrediction] = useState("");

  useEffect(() => {
    if (!query) {
      setPrediction("");
      return;
    }

    const match = suggestions.find((s) =>
      s.toLowerCase().startsWith(query.trim().toLowerCase())
    );

    if (match && match.toLowerCase() !== query.toLowerCase()) {
      setPrediction(match);
    } else {
      setPrediction("");
    }
  }, [query]);

  return { prediction };
};
