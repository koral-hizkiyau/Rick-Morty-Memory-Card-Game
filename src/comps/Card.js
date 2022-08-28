import React from 'react'
import "../css/cards.css";

export default function Card({card, handleChoice, flipped, disabled}) {

    const handleClick= () => {
        if(!disabled){
            handleChoice(card);
        }
   }

  return (
    <div className="card">
    <div className={flipped ? "flipped" : ""}>
    <img src={card.src} className="back" alt="back card"/>
    <img src="images/front.png" className="front" alt="front card" onClick={handleClick}
    />
</div>
  </div>  )
}
