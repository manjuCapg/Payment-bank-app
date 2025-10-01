// hooks/useSuggestions.js
import { useEffect, useState } from "react";

const suggestions = [
  "which city has the most transactions for grocery retailers?",
  "I'm the owner of Urban Vogue. From looking at other retailers similar to me, what percentage of sales do they generate from online payments?",
  "List all payment types",
  "For the cities where Morrisons is not present, which city has the most transactions for grocery retailers?",
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
