import React, { useEffect } from 'react'
import { useTimer } from "react-timer-hook";
import { numOfImage} from "../cardImages";
import Swal from 'sweetalert2';

export default function Timer({expiryTimestamp, flagStop, setFlagStop, level, setLevel, shuffleCards, cardImagesAllLevels ,setCardImages}) {
  const {
    seconds,
    minutes,
    pause,
    restart
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setFlagStop(true);
      Swal.fire({
        title: 'You Lose, Try Again!!!',
        imageUrl: "/images/jerryLoser.jpg",
        imageAlt: "end game image",
        width: 460,
        customClass: 'swal-style',
        confirmButtonText: "Play Again",
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)`     
      }).then((result) => {
          setLevel(1);
          setCardImages(cardImagesAllLevels[0]);
          shuffleCards(cardImagesAllLevels[0]);
          localStorage.setItem(process.env.REACT_APP_LOCALHOST_LEVEL,1);
          setFlagStop(false);
       
        })
    }
  });
    

useEffect(()=> {
  if(flagStop)pause();
  else{
      const time = new Date();
      time.setSeconds(time.getSeconds() + numOfImage[level-1]*15);
      restart(time);
  }

},[flagStop || level])

      return (
          <div style={{ fontSize: "25px" }}>
            <span>Timer  </span>
            <span> {minutes}</span>:
            <span>{seconds}</span>
          </div>
      );
}
