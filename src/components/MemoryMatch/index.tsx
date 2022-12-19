import React, { useState, useEffect } from 'react';
import './style.scss';
import { data } from '../../data/data';

const MemoryMatch = () => {
   const [state, setState] = useState<{
      dataArray: number[];
      cardsChosen: number[];
      cardsChosenIndex: number[];
      openCards: number[];
   }>({
      dataArray: [],
      cardsChosen: [],
      cardsChosenIndex: [],
      openCards: [],
   });

   const { dataArray, cardsChosen, cardsChosenIndex, openCards } = state;

   const createCardBoard = () => {
      const dataGenerated = data.concat(...data);
      const shuffledArray = shuffleArray(dataGenerated);
      setState({ ...state, dataArray: shuffledArray });
   };

   useEffect(() => {
      createCardBoard();
   }, []);

   const shuffleArray = (array: number[]) => {
      for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
   };

   const isCardChosen = (item: number, index: number) => {
      return cardsChosenIndex.includes(index) || openCards.includes(item);
   };

   const flipCard = (item: number, index: number) => {
      if (openCards.length === dataArray.length) {
         alert('Good Job');
         window.location.reload();
      }

      if (cardsChosenIndex.length === 1 && cardsChosenIndex[0] === index) {
         return;
      }

      if (cardsChosen.length < 2) {
         setState((prevState) => ({
            ...state,
            cardsChosen: prevState.cardsChosen.concat(item),
            cardsChosenIndex: prevState.cardsChosenIndex.concat(index),
         }));

         if (cardsChosen.length === 1) {
            if (cardsChosen[0] === item) {
               setState((prevState) => ({
                  ...state,
                  cardsChosen: [],
                  openCards: prevState.openCards.concat([cardsChosen[0], item]),
               }));
            } else {
               setTimeout(() => {
                  setState({ ...state, cardsChosen: [], cardsChosenIndex: [] });
               }, 700);
            }
         }
      }
   };

   const resetGame = () => {
      setState({
         ...state,
         cardsChosen: [],
         cardsChosenIndex: [],
         openCards: [],
      });
   };

   return (
      <div className="container">
         <h2>Memory Game</h2>
         <button onClick={resetGame}>Reset the game</button>
         <div className="cards-container">
            {dataArray.map((item, index) => {
               return (
                  <div
                     className="card"
                     key={index}
                     onClick={() => flipCard(item, index)}
                  >
                     <label className="item">
                        {isCardChosen(item, index) ? item : ''}
                     </label>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default MemoryMatch;
