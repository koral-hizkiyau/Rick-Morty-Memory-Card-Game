import React from 'react'

export default function StartGame({flagStart, setFlagStart}) {

    const changeFlagStart = () => {
        setFlagStart(!flagStart);
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_START_FLAG, !flagStart);
    }
  return (
    <div className='container' style={{marginTop:"10%"}}>
    <div className='row'>

    <h2 className='col-lg-12'><img src={"/images/rick_and_morty.png"} alt="title" width="35%" /> <br/> Memory Card Game <br/></h2></div>
    <button className='col-lg-12' style={{marginTop:"2%"}} onClick={changeFlagStart}>Start Game</button>
    </div>
  )
}
