// pages/CardsPage.js
import React from 'react';
import styles from '../styles/styles.module.css';
const CardsPage = () => {
  return (
    <div className="container">
      <h1>Cards Page</h1>
      <div className="cards-container">
        {/* Render the cards here */}
        <div className="card">
          <img src="/CAT.jpg" alt="Image 1" />
          <h2>Card Title 1</h2>
          <p>This is a sample paragraph for card 1.</p>
        </div>
      
      </div>
    </div>
  );
};

export default CardsPage;
