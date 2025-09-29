// sessionManager.js
let sessionCounter = 1;
const questionSessionMap = new Map();

export const getSessionIdForQuestion = (question) => {
  if (questionSessionMap.has(question)) {
    return questionSessionMap.get(question);
  } else {
    const newSessionId = sessionCounter++;
    questionSessionMap.set(question, newSessionId);
    return newSessionId;
  }
};
