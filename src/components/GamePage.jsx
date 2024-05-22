import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';
import { db } from "../firebase-config"; 
import { doc, getDoc } from "firebase/firestore";
import '../styles.css'; // CSS file for styling
import '../Modal.css'; // CSS file for styling


function GamePage () {
  const [clues, setClues] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [userInputs, setUserInputs] = useState([]);
  const [results, setResults] = useState([]);
  const [gameRule, setGameRule] = useState([]);
  const [gameDesc, setGameDesc] = useState([]);
  const [gameMaker, setGameMaker] = useState([]);
  const [ruleExample, setruleExample] = useState([]);
  const { gameName } = useParams(); // Get the game name from URL parameters
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true); // Initializes the modal as open


  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "GameData", gameName);
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
    const handleMenuToggle = () => {
        console.log("Current menu state before toggle:", isMenuOpen);
        setIsMenuOpen(!isMenuOpen);
        console.log("Menu state after toggle:", !isMenuOpen);
    };
    const handleLinkClick = (path) => {
        setIsMenuOpen(false); // Close the menu
        navigate(path); // Then navigate
    };
      return (
          <div className="game-container">
              
              <div className="hamburger-menu" onClick={handleMenuToggle}>☰</div>
              {isMenuOpen && (
                  <div className="menu">
                      <ul>
                          <li onClick={() => handleLinkClick('/')}>প্রথম পাতা</li>
                          <li onClick={() => {
                              setIsModalOpen(true);
                              setIsMenuOpen(false);
                          }}>খেলার নিয়ম </li>
                      </ul>
                  </div>
              )}
              {isModalOpen && (
                    <div className="modal-overlay">
                        <span className="close-icon" onClick={() => setIsModalOpen(false)}>×</span>
                        
                            <div className="top-panel">
                                <img src="/logo.jpg" alt="Game Logo" className="game-logo" />

                                <p className="game-name">{gameDesc}</p> 
                                <p className="game-rule">{gameRule}</p>
                                <p className="game-rule">{ruleExample}</p>
                                <p className="game-rule">খেলা সাজানো: শব্দকর্মী- {gameMaker}</p>

                            </div>

                    </div>
                )}
              <div className="header">
                  <h2>২০১০ সাল থেকে মজাদার শব্দের খেলার মাধ্যমে ভাষা চর্চার মাধ্যম </h2>
              </div>
              <div className="bottom-panel">
                  
              <form onSubmit={handleSubmit} className="form-style">
                      <img src="/logo.jpg" alt="Game Logo" className="game-logo" />
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
                                              type="text" style={{
                                                    backgroundColor: results[index] === 'সঠিক' ? 'green' : results[index] === 'ভুল' ? 'red' : 'white',
                                                    color: 'black'
                                                }}
                                              value={userInputs[index]}
                                              onChange={(e) => handleInputChange(index, e.target.value)}
                                              size="20"
                                          />
                                      </td>
                                      <td >
                                          {results[index] === 'সঠিক' ? <FontAwesomeIcon icon={faCheck} color="green" /> : results[index] === 'ভুল' ? <FontAwesomeIcon icon={faTimes} color="red" /> : ''}
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                      <button type="submit">জমা দিন</button>
                  </form>
              </div>
               <Footer />
          </div>
      );
  }

export default GamePage ;