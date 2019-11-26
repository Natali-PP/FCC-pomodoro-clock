import React, { useState, useEffect, useRef } from 'react';import Break from './Break';
import soundfile from './wronger-rave-hit.wav';
import Session from './Session';

const Timer = () => {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [secondsLeft, setSecondsLeft] = useState(25 * 60);
    const [timerRunning, setTimerRunning] = useState(false);
    const [timerLabel, setTimerLabel] = useState('Session');

    const myAudio = useRef();
    const context = new AudioContext();

  let minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  const incrementBreak = () => {
    if(!timerRunning && breakLength < 60 ){
      setBreakLength(breakLength + 1)
    }}

  const decrementBreak = () => {
    if(!timerRunning && breakLength > 1) {
    setBreakLength(breakLength - 1);
  }}

  const incrementSession = () => {
    if(!timerRunning && sessionLength <60 ){
      setSessionLength(sessionLength + 1);
      setSecondsLeft((sessionLength + 1) * 60);
    }
  }

  const decrementSession = () => {
    if(!timerRunning && sessionLength > 1 ){
      setSessionLength(sessionLength - 1);
      setSecondsLeft((sessionLength - 1)* 60)}
  }
  
  const startTimer = () => {
    context.resume();
    setTimerRunning(true)
  }

  const pauseTimer = () => {
    setTimerRunning(false)
  }

  const resetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setSecondsLeft(25 * 60);
    setTimerRunning(false);
    setTimerLabel('Session');
    myAudio.current.pause();
    myAudio.current.currentTime = 0;
  }

  useEffect(() => {
    const handleSwitch = () => {
      if (timerLabel === 'Session'){
        setTimerLabel('Break');
        setSecondsLeft(breakLength *60);
      } else if (timerLabel === 'Break'){
        setTimerLabel('Session');
        setSecondsLeft(sessionLength * 60);
      }
    }

    let contador = null
    if (timerRunning && secondsLeft >0){
      contador = setInterval( () => {setSecondsLeft(secondsLeft -1)}, 1000)
    } else if(timerRunning && secondsLeft === 0) {
      contador = setInterval( () => {setSecondsLeft(secondsLeft -1)}, 1000);
      myAudio.current.play();
      handleSwitch();
    } else{
      clearInterval(contador)
    };
    return () => {
      clearInterval(contador)
    };
  }, [timerRunning, secondsLeft, timerLabel, breakLength, sessionLength, myAudio]);

    return (
    <div className="App">
      <header><h1>Pomodoro Clock</h1></header>
      <div className="grid-container">
        
        <Break
          breakLength={breakLength}
          incrementBreak={incrementBreak}
          decrementBreak={decrementBreak}
        />

        <Session
          sessionLength={sessionLength}
          incrementSession={incrementSession}
          decrementSession={decrementSession}
        />
      </div>
      <div className="Timer">
        <h1 id="timer-label">{timerLabel}</h1>
        
        <h2 id="time-left">
        {minutes < 10 ? ("0" + minutes).slice(-2) : minutes}:{seconds < 10 ? ("0" + seconds).slice(-2) : seconds}
          </h2>
        <div className="grid-container">
          <button 
            id="start_stop" 
            onClick={timerRunning ?   pauseTimer : startTimer }>
            { timerRunning ?  "❚❚" : "▶"}
        </button>
         
          <button 
            id="reset" 
            onClick={resetTimer}> ↺ </button>
        </div>
        
        <audio 
        src={soundfile} 
        id="beep" 
        type="audio" 
        ref={myAudio}
        ></audio>
      </div>
    </div>
    )
  }
export default Timer