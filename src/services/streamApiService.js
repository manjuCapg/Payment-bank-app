import { getApiByDb } from "./apiService"; // We might not be able to reuse getApiByDb if we use fetch instead of axios, but we can reuse logic

// Base URLs - matching apiService.js
const bigQueryBase =
    import.meta.env.MODE === "development"
        ? "/api"
        : "https://genaipayment-backend-719673130781.europe-west1.run.app/proxy/8000";

const mongoBase =
    import.meta.env.MODE === "development"
        ? "/mongoapi"
        : "https://genaipayment-backend-719673130781.europe-west1.run.app/proxy/8000";

export const streamProcessQuery = async (
    question,
    dbName = "Big Query DB",
    callbacks = {}
) => {
    const { onStatus, onToken, onData, onError } = callbacks;

    // Determine endpoint and base URL
    const isMongo = dbName === "Mongo DB";
    const baseUrl = isMongo ? mongoBase : bigQueryBase;
    // Based on walkthrough:
    // process_query -> stream_process_query
    // mongodb_query -> stream_mongodb_query
    const endpointPath = isMongo ? "/stream_mongodb_query" : "/stream_process_query";
    const url = `${baseUrl}${endpointPath}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/x-ndjson",
            },
            body: JSON.stringify({ question }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (!response.body) {
            throw new Error("Response body is null");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || ""; // Keep the last incomplete line

            for (const line of lines) {
                if (!line.trim()) continue;
                try {
                    const event = JSON.parse(line);
                    handleEvent(event, isMongo, { onStatus, onToken, onData });
                } catch (e) {
                    console.warn("Error parsing NDJSON line:", line, e);
                }
            }
        }

        // Process any remaining buffer
        if (buffer.trim()) {
            try {
                const event = JSON.parse(buffer);
                handleEvent(event, isMongo, { onStatus, onToken, onData });
            } catch (e) {
                console.warn("Error parsing trailing NDJSON:", buffer, e);
            }
        }

    } catch (error) {
        console.error("Stream processing error:", error);
        if (onError) onError(error);
        throw error;
    }
};

function handleEvent(event, isMongo, { onStatus, onToken, onData }) {
    // Common status handling
    if (event.type === "status") {
        if (onStatus) onStatus(event);
    } else if (event.type === "token") {
        if (onToken) onToken(event.content);
    } else if (event.type === "final_data") {
        // BigQuery final data
        if (onData) onData({ tabularData: event.data, sqlQuery: event.sql, chatResponse: event.text });
    } else if (event.type === "final_result") {
        // MongoDB final result
        // Normalize if needed, similar to apiService.js
        let tabularData = event.result || []; // Adjust based on actual payload structure
        // apiService.js normalization logic:
        // if (Array.isArray(data?.tabularData) && data.tabularData.length === 1 && Array.isArray(data.tabularData[0])) ...

        // Check if event.result matches structure. The walkthrough says {"type": "final_result", ...}
        // I'll assume the payload contains the data directly or in a property.
        // Let's pass the whole event or extract likely fields. 
        // Assuming event keys might be { result: [...], text: "...", ... }

        // NOTE: apiService.js normalizes `tabularData`. 
        // If backend "cloned" logic, likely structure is similar but wrapped in event.
        // Let's pass it to onData.
        if (onData) onData({ tabularData: event.output || event.result, chatResponse: event.text || event.answer });
    } else if (event.type === "tool_call") {
        // Maybe show status for tool call
        if (onStatus) onStatus({ step: `Calling tool: ${event.tool || "Unknown"}` });
    } else if (event.type === "tool_output") {
        // Maybe show status
        if (onStatus) onStatus({ step: `Tool output received` });
    }
}
