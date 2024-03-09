"use client"
import React, { useState, useEffect } from 'react';

const PomodoroApp = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [minutes, setMinutes] = useState(sessionLength);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && minutes >= 0 && seconds >= 0) {
      intervalId = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsSession(!isSession);
            setMinutes(isSession ? breakLength : sessionLength);
            setSeconds(0);
            return;
          }
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, minutes, seconds, isSession, breakLength, sessionLength]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsSession(true);
    setMinutes(sessionLength);
    setSeconds(0);
  };

  return (
    <div className="container mx-auto p-2 bg-transparent rounded-md shadow-md text-black text-sm">
      <h1 className="text-lg font-semibold text-center mb-2">Pomodoro Timer</h1>
      <div className="flex justify-around items-center mb-2">
        <div>
          <p>Session Length: {sessionLength} minutes</p>
          <div className="flex justify-center items-center">
            <button onClick={() => setSessionLength(sessionLength + 1)} className="p-1 border rounded-full">+</button>
            <button onClick={() => setSessionLength(sessionLength - 1)} className="p-1 border rounded-full" disabled={sessionLength === 1}>-</button>
          </div>
        </div>
        <div>
          <p>Break Length: {breakLength} minutes</p>
          <div className="flex justify-center items-center">
            <button onClick={() => setBreakLength(breakLength + 1)} className="p-1 border rounded-full">+</button>
            <button onClick={() => setBreakLength(breakLength - 1)} className="p-1 border rounded-full" disabled={breakLength === 1}>-</button>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p>{isSession ? 'Work Session' : 'Break Session'}</p>
        <p className="text-4xl" style={{ color: 'black' }}>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
        {isRunning ? (
          <button onClick={pauseTimer} className="mt-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md">Pause</button>
        ) : (
          <button onClick={startTimer} className="mt-2 bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md">Start</button>
        )}
        <button onClick={resetTimer} className="mt-2 bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-md ml-1">Reset</button>
      </div>
    </div>
  );
};

export default PomodoroApp;
