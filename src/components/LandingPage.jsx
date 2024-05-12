import React from "react";
import { Link } from "react-router-dom";
import "./LandingStyle.css";
import "../styles.css";

function LandingPage() {
  const games = [
    { name: "Palti", displayName: "পাল্টি" },
    { name: "Murolyajakhabli", displayName: "মুড়োল্যাজাখাবলি" },
    { name: "Parabarna", displayName: "পরবর্ণ" },
  ];

  return (
    <div className="landing-container">
      <div className="landing-header">
          <h2>২০১০ সাল থেকে মজাদার শব্দের খেলার মাধ্যমে ভাষা চর্চার মাধ্যম </h2>
      </div>
      <h1 className="landing-title">আপনার পছন্দের খেলাটি বেছে নিন:</h1>
      <ul className="game-list">
        {games.map((game) => (
          <li key={game.name} className="game-list-item">
            <Link to={`/game/${game.name}`} className="game-link">
              {game.displayName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LandingPage;
