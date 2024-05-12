import React from 'react';
import './Modal.css'; 
//import './src/styles.css';
const [gameRule, setGameRule] = useState([]);
  const [gameDesc, setGameDesc] = useState([]);
  const [gameMaker, setGameMaker] = useState([]);
  const [ruleExample, setruleExample] = useState([]);
  const [selectedGame, setSelectedGame] = useState("Palti"); 
const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    useEffect(() => {
        const fetchData = async () => {
          const docRef = doc(db, "GameData", "Palti");
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            // Extract clues and answers using predefined keys
            const fetchedClues = [data.clue1, data.clue2, data.clue3, data.clue4];
            const fetchedAnswers = [data.ans1, data.ans2, data.ans3, data.ans4];

            setClues(fetchedClues);
            setAnswers(fetchedAnswers);
            setGameRule(data.rules);
            setGameDesc(data.GameDesc);
            setruleExample(data.RuleExample);
            setGameMaker(data.gameMaker);

     setUserInputs(Array(fetchedClues.length).fill(""));
            setResults(Array(fetchedClues.length).fill(""));
          } else {
            console.log("No such document!");
          }
        };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p className="modal-text">বাংলা শব্দের খেলা</p>
              <div className="top-panel">
                  <label htmlFor="game-name-select" className="game-name-label">নিচের ড্রপডাউন থেকে আপনার পছন্দের খেলাটি বেছে নিন:</label>
                  <select id="game-name-select" className="game-name-dropdown" >
                      <option value="Palti">পাল্টি</option>
                      <option value="Murolyajakhabli">মুড়োল্যাজাখাবলি</option>
                      <option value="Parabarna">পরবর্ণ</option>
                  </select>

                  <p className="game-name">{gameDesc}</p> 
                  <p className="game-rule">{gameRule}</p>
                  <p className="game-rule">{ruleExample}</p>
                  <p className="game-rule">খেলা সাজানো: শব্দকর্মী- {gameMaker}</p>
              </div>

                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
    export default FirestoreArrays;
