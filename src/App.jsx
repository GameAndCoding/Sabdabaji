import React, { useEffect, useState } from "react";
import { db } from "./firebase-config"; // Make sure this import path is correct
import { doc, getDoc } from "firebase/firestore";
// Ensure your project structure includes a directory for CSS and images
import './styles.css'; // CSS file for styling

function FirestoreArrays() {
  const [clues, setClues] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [userInputs, setUserInputs] = useState([]);
  const [results, setResults] = useState([]);
  const [gameRule, setGameRule] = useState([]);
  const [gameDesc, setGameDesc] = useState([]);
  const [gameMaker, setGameMaker] = useState([]);
  const [ruleExample, setruleExample] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "GameData", "GameState");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        // Extract clues and answers using predefined keys
        const fetchedClues = [data.clue1, data.clue2, data.clue3, data.clue4];
        const fetchedAnswers = [data.ans1, data.ans2, data.ans3, data.ans4];
        
        setClues(fetchedClues);
        setAnswers(fetchedAnswers);
        setGameRule(data.GameRule);
        setGameDesc(data.GameDesc);
        setruleExample(data.RuleExample);
        setGameMaker(data.GameMaker);
      
 setUserInputs(Array(fetchedClues.length).fill(""));
        setResults(Array(fetchedClues.length).fill(""));
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, []);
  const handleInputChange = (index, value) => {
    const updatedInputs = [...userInputs];
    updatedInputs[index] = value;
    setUserInputs(updatedInputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newResults = userInputs.map((input, index) =>
      input.trim() === answers[index].trim() ? "সঠিক" : "ভুল",
    );
    setResults(newResults);
  };
      return (
          <div className="game-container">
        <div className="top-panel">
            <p className="game-name">{gameDesc}</p> 
            <p className="game-rule">{gameRule}</p>
            <p className="game-rule">{ruleExample}</p>
            <p className="game-rule">{gameMaker}</p>
          
        </div>
              <div className="bottom-panel">
              <form onSubmit={handleSubmit} className="form-style">
                      <table className="data-table">
                          <thead>
                              <tr>
                                  <th>সূত্র</th>
                                  <th>আপনার উত্তর</th>
                                  <th>ফলাফল</th>
                              </tr>
                          </thead>
                          <tbody>
                              {clues.map((clue, index) => (
                                  <tr key={index}>
                                      <td>{clue}</td>
                                      <td>
                                          <input
                                              type="text"
                                              value={userInputs[index]}
                                              onChange={(e) => handleInputChange(index, e.target.value)}
                                              size="10"
                                          />
                                      </td>
                                      <td style={{
                                          backgroundColor: results[index] === 'সঠিক' ? 'green' : results[index] === 'ভুল' ? 'red' : 'transparent',
                                          color: 'white'
                                      }}>
                                          {results[index]}
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                      <button type="submit">জমা দিন</button>
                  </form>
              </div>
          </div>
      );
  }

export default FirestoreArrays;
