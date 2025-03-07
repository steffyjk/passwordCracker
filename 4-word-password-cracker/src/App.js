import React, { useState } from "react";

const App = () => {
  // Predefined list of words
  const wordList = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew"];

  // State to manage the target password, result, and timer
  const [targetPassword, setTargetPassword] = useState("");
  const [result, setResult] = useState("");
  const [isCracking, setIsCracking] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Function to simulate password cracking
  const crackPassword = () => {
    setIsCracking(true);
    setResult("");
    setTimeElapsed(0);

    // Split the target password into words
    const targetWords = targetPassword.trim().toLowerCase().split(" ");

    // Check if the password is exactly 4 words
    if (targetWords.length !== 4) {
      setResult("Please enter a 4-word password (space-separated).");
      setIsCracking(false);
      return;
    }

    // Start the timer
    const startTime = Date.now();
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    // Simulate cracking by iterating through the word list
    let isCracked = false;
    for (let i = 0; i < wordList.length; i++) {
      for (let j = 0; j < wordList.length; j++) {
        for (let k = 0; k < wordList.length; k++) {
          for (let l = 0; l < wordList.length; l++) {
            const attempt = `${wordList[i]} ${wordList[j]} ${wordList[k]} ${wordList[l]}`;

            // Simulate a delay to make it look like cracking is happening
            setTimeout(() => {
              setResult(`Trying: ${attempt}`);
            }, 100 * (i * wordList.length ** 3 + j * wordList.length ** 2 + k * wordList.length + l));

            if (attempt === targetPassword.toLowerCase()) {
              setTimeout(() => {
                setResult(`Password cracked: ${attempt}`);
                setIsCracking(false);
                clearInterval(timer); // Stop the timer
              }, 100 * (i * wordList.length ** 3 + j * wordList.length ** 2 + k * wordList.length + l));
              isCracked = true;
              return;
            }
          }
        }
      }
    }

    // If no match is found
    if (!isCracked) {
      setTimeout(() => {
        setResult("Password not found in the word list.");
        setIsCracking(false);
        clearInterval(timer); // Stop the timer
      }, 100 * wordList.length ** 4);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'Orbitron', sans-serif",
        background: "linear-gradient(135deg, #1e1e2f, #2a2a40)",
        color: "#00ffcc",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "20px", textShadow: "0 0 10px #00ffcc" }}>
        🚀 4-Word Password Cracker 🚀
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
        Enter a 4-word password (space-separated) to crack:
      </p>
      <input
        type="text"
        value={targetPassword}
        onChange={(e) => setTargetPassword(e.target.value)}
        placeholder="e.g., apple banana cherry date"
        style={{
          width: "300px",
          padding: "10px",
          fontSize: "1rem",
          border: "2px solid #00ffcc",
          borderRadius: "5px",
          background: "transparent",
          color: "#00ffcc",
          outline: "none",
        }}
      />
      <br />
      <br />
      <button
        onClick={crackPassword}
        disabled={isCracking}
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          background: "#00ffcc",
          color: "#1e1e2f",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0 0 10px #00ffcc",
          transition: "background 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.background = "#00ccaa")}
        onMouseOut={(e) => (e.target.style.background = "#00ffcc")}
      >
        {isCracking ? "🔓 Cracking..." : "🔑 Crack Password"}
      </button>
      <br />
      <br />
      <div
        style={{
          marginTop: "20px",
          fontSize: "1.2rem",
          color: "#00ffcc",
          textShadow: "0 0 10px #00ffcc",
        }}
      >
        {result}
      </div>
      {isCracking && (
        <div
          style={{
            marginTop: "20px",
            fontSize: "1.2rem",
            color: "#00ffcc",
            textShadow: "0 0 10px #00ffcc",
          }}
        >
          ⏱️ Time Elapsed: {timeElapsed} seconds
        </div>
      )}
    </div>
  );
};

export default App;