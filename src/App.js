import React, { useEffect, useState } from 'react'
import "./App.css";
import Card from './comps/Card';
import Swal from 'sweetalert2';
import {cardImagesAllLevels , numOfImage} from "./cardImages";
import Timer from './comps/Timer';

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [oneCard, setOneCard] = useState(null);
  const [twoCard, setTwoCard] = useState(null);
  const [disabled ,setDisabled] = useState(false);
  const [counter , setCounter] = useState(0);
  const [level, setLevel] = useState(1)
  const [cardImages, setCardImages] = useState(cardImagesAllLevels[level-1]);
  const [finish, setFinish] = useState(0);
  const [flagStop, setFlagStop] = useState(false);
  const time = new Date();

  useEffect(()=> {  
    if(localStorage.getItem(process.env.REACT_APP_LOCALHOST_LEVEL)){
      shuffleCards(cardImagesAllLevels[localStorage.getItem(process.env.REACT_APP_LOCALHOST_LEVEL)-1]);
      setLevel(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_LEVEL)));
      setFinish(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_FINISH)));
    }else{
      localStorage.setItem(process.env.REACT_APP_LOCALHOST_FINISH, finish);
      localStorage.setItem(process.env.REACT_APP_LOCALHOST_LEVEL, level);
      shuffleCards(cardImages);
    }
    
  },[])

  useEffect(()=> {
    if(oneCard && twoCard){
      setDisabled(true);
      if(oneCard.src === twoCard.src){
        setCounter(prevCounter => prevCounter +1);
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === oneCard.src){
              return {...card, matched: true}
            }
            else{
              return card;
            }
          })
        })
        resetTurn();
      } else{
        setTimeout(() => resetTurn(), 1000)
      }
    }

  },[oneCard , twoCard])

  useEffect(()=> {
    if(counter === cardImages.length){
      setFlagStop(true);
      if(level === numOfImage.length){  
      Swal.fire({
        title: 'You Finished The Game, Excellent Job!!!',
        imageUrl: "/images/endGame.png",
        imageAlt: "end game image",
        width: 550,
        customClass: 'swal-style',
        confirmButtonText: "Play Again",
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        html:
  '<img src="/images/rick-roll.gif" alt="rick dance"/>',
        backdrop: `
          rgba(0,0,123,0.4)`     
      }).then((result) => {
          setLevel(1);
          setCardImages(cardImagesAllLevels[0]);
          shuffleCards(cardImagesAllLevels[0]);
          setFinish(prevFinish => prevFinish + 1);
          localStorage.setItem(process.env.REACT_APP_LOCALHOST_FINISH, finish+1);
          localStorage.setItem(process.env.REACT_APP_LOCALHOST_LEVEL,1);
          setFlagStop(false);
      
        })
      }else{
      Swal.fire({
        title: 'Good Job!!!',
        imageUrl: "/images/finish.jpg",
        imageAlt: "finish",
        width: 550,
        confirmButtonText: "Next Level",
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        html:
  '<img src="/images/rickDance.gif" alt="rick dance" width="80px" height="156px"/>',
        backdrop: `
          rgba(0,0,123,0.4)`     
      }).then((result) => {
          setLevel(prevLevel => prevLevel +1);
          setCardImages(cardImagesAllLevels[level]);
          shuffleCards(cardImagesAllLevels[level]);  
          localStorage.setItem(process.env.REACT_APP_LOCALHOST_LEVEL,level+1);
            setFlagStop(false);
          
          
    })

  }
  }
  
  },[counter])



  const shuffleCards = (cardImages) => {
      const cardsShuffled =[...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random()}))
       setCards(cardsShuffled);
       setTurns(0);
       setCounter(0);
}

const handleChoice = (card) =>{
  oneCard ?  setTwoCard(card) : setOneCard(card);
}

const resetTurn = () =>{
  setOneCard(null);
  setTwoCard(null);
  setTurns(prevTurn => prevTurn + 1);
  setDisabled(false);
}

const resetFinish = () => {
  localStorage.removeItem(process.env.REACT_APP_LOCALHOST_FINISH);
  localStorage.removeItem(process.env.REACT_APP_LOCALHOST_LEVEL);
  window.location.reload(false);

}

const refreshCards = () => {
  window.location.reload(false);
}



  return (
    <>
      <div className='container' style={{marginTop:"10px"}}>
    <div className='row'>
      <div className='col-lg-2 py-3'>    
      <button style={{margin:"5%"}} onClick={refreshCards}>New Game</button>
      <Timer expiryTimestamp={time} flagStop={flagStop} setFlagStop={setFlagStop} level={level} setLevel={setLevel} shuffleCards={shuffleCards} cardImagesAllLevels={cardImagesAllLevels} setCardImages={setCardImages}/>
</div>
    <h2 className='col-lg-8'><img src={"/images/rick_and_morty.png"} alt="title" width="35%" /> <br/> Memory Card Game <br/> <span className='levelStyle'>Level {level}</span></h2>
    <div className='col-lg-2 py-3' style={{fontSize:"18px"}}>Turns {turns} <br/> Finish {finish}<br/> <button style={{fontSize:"15px",margin:"5%"}} onClick={resetFinish}>Reset Game</button></div>
    </div></div>
    <div className={level <= 2 ? (level ===1 ?  "cards" : "cardsLevel2") : (level === 3 ? "cardsLevel3" : "cardsLevel4")}>
    
    {cards.map((card,i) => {
      return (
        
        <Card card={card} key={card.id} handleChoice={handleChoice} flipped={card === oneCard || card === twoCard || card.matched}
        disabled={disabled}  />
        
      )
    })}
    </div>

    </>
  );
}

export default App;
