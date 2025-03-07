import React, { useState } from "react";

const App = () => {
  // Predefined list of words
  const wordList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  // State to manage the target password, result, timer, total time, and trials
  const [targetPassword, setTargetPassword] = useState("");
  const [result, setResult] = useState("");
  const [isCracking, setIsCracking] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [totalTime, setTotalTime] = useState(null);
  const [totalTrials, setTotalTrials] = useState(0);

  // Function to simulate password cracking
  const crackPassword = () => {
    setIsCracking(true);
    setResult("");
    setTimeElapsed(0);
    setTotalTime(null);
    setTotalTrials(0);

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
    let trialCount = 0; // Counter for total trials

    for (let i = 0; i < wordList.length; i++) {
      for (let j = 0; j < wordList.length; j++) {
        for (let k = 0; k < wordList.length; k++) {
          for (let l = 0; l < wordList.length; l++) {
            trialCount++; // Increment trial counter
            const attempt = `${wordList[i]} ${wordList[j]} ${wordList[k]} ${wordList[l]}`;

            // Simulate a delay to make it look like cracking is happening
            setTimeout(() => {
              setResult(`Trying: ${attempt}`);
            }, 100 * (i * wordList.length ** 3 + j * wordList.length ** 2 + k * wordList.length + l));

            if (attempt === targetPassword.toLowerCase()) {
              setTimeout(() => {
                const endTime = Date.now();
                const totalTimeTaken = Math.floor((endTime - startTime) / 1000);
                setResult(`Password cracked: ${attempt}`);
                setIsCracking(false);
                clearInterval(timer); // Stop the timer
                setTotalTime(totalTimeTaken); // Set total time
                setTotalTrials(trialCount); // Set total trials
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
        const endTime = Date.now();
        const totalTimeTaken = Math.floor((endTime - startTime) / 1000);
        setResult("Password not found in the word list.");
        setIsCracking(false);
        clearInterval(timer); // Stop the timer
        setTotalTime(totalTimeTaken); // Set total time
        setTotalTrials(trialCount); // Set total trials
      }, 100 * wordList.length ** 4);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'Courier New', monospace", // A font that fits the tech-western vibe
        background: "linear-gradient(135deg, #7A4D3B, #A6C9E2)", // Brown to light blue gradient
        color: "#F7D08A", // Cream text color
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "20px",
          textShadow: "2px 2px 5px #7A4D3B", // Brown shadow for depth
          letterSpacing: "2px",
        }}
      >
        🤠 Cyber Sheriff Cracker 🤠
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "20px",
          color: "#F7D08A", // Cream color for text
        }}
      >
        Enter a 4-word password to crack, partner:
      </p>
      <input
        type="text"
        value={targetPassword}
        onChange={(e) => setTargetPassword(e.target.value)}
        placeholder="e.g., 1 2 3 4"
        style={{
          width: "300px",
          padding: "10px",
          fontSize: "1rem",
          border: "2px solid #F7D08A", // Cream border
          borderRadius: "5px",
          background: "#A6C9E2", // Light blue background
          color: "#7A4D3B", // Brown text
          outline: "none",
          fontFamily: "'Courier New', monospace",
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
          background: "#F7D08A", // Cream button background
          color: "#7A4D3B", // Brown text
          border: "2px solid #7A4D3B", // Brown border
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0 0 10px #F7D08A", // Cream glow
          transition: "background 0.3s ease",
          fontFamily: "'Courier New', monospace",
        }}
        onMouseOver={(e) => (e.target.style.background = "#A6C9E2")} // Light blue on hover
        onMouseOut={(e) => (e.target.style.background = "#F7D08A")} // Back to cream
      >
        {isCracking ? "🔓 Crackin’..." : "🔑 Crack Password"}
      </button>
      <br />
      <br />
      <div
        style={{
          marginTop: "20px",
          fontSize: "1.2rem",
          color: "#F7D08A", // Cream text
          textShadow: "1px 1px 3px #7A4D3B", // Brown shadow
        }}
      >
        {result}
      </div>
      {isCracking && (
        <div
          style={{
            marginTop: "20px",
            fontSize: "1.2rem",
            color: "#F7D08A", // Cream text
            textShadow: "1px 1px 3px #7A4D3B", // Brown shadow
          }}
        >
          ⏱️ Time Elapsed: {timeElapsed} seconds
        </div>
      )}
      {totalTime !== null && (
        <div
          style={{
            marginTop: "20px",
            fontSize: "1.2rem",
            color: "#F7D08A", // Cream text
            textShadow: "1px 1px 3px #7A4D3B", // Brown shadow
          }}
        >
          🕒 Total Time Taken: {totalTime} seconds
          <br />
          🔢 Total Trials: {totalTrials}
        </div>
      )}
    </div>
  );
};

export default App;