async function sendMessage(userInput) {
  try {
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput }),
    });
    const data = await response.json();
    return data.response;
  } catch (error) {
    return "Error while connecting to backend";
  }
}
