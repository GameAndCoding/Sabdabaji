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
  const replaceUnicodeCharacters = (str) => {
      // Remove zero-width characters
      str = str.replace(/[\u200C\u200D]/g, '');
      str = str.replace(/\u09F0/g, '\u09B0');
      str = str.replace(/\u09FA/g, '\u0981');
      str = str.replace(/\u09AF\u09BC/g, '\u09DF') 
      // Replace specific Bengali character combinations
      str = str.replace(/\u09AF\u09BC/g, '\u09DF') // য + ় -> য়
               .replace(/\u09A1\u09BC/g, '\u09DC') // ড + ় -> ড়
               .replace(/\u09A2\u09BC/g, '\u09DD'); // ঢ + ় -> ঢ়

      return str;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newResults = userInputs.map((input, index) => {
        // Normalize both input and answer strings to Unicode NFC (Canonical Composition)
      const normalizedInput = replaceUnicodeCharacters(input.trim().normalize('NFC'));
      const normalizedAnswer = replaceUnicodeCharacters(answers[index].trim().normalize('NFC'));
      // Log both the input and answer to the console for debugging
      console.log(`Input (Unicode): ${normalizedInput}`);
      console.log(`Answer (Unicode): ${normalizedAnswer}`);
      console.log("Input Unicode Points:");
      for (const char of normalizedInput) {
          console.log(char, char.charCodeAt(0).toString(16)); // Display character and its Unicode code point in hexadecimal
      }

      console.log("Answer Unicode Points:");
      for (const char of normalizedAnswer) {
          console.log(char, char.charCodeAt(0).toString(16));
      }

        return normalizedInput === normalizedAnswer ? "সঠিক" : "ভুল";
    });
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
