'use client';

import { useState, useEffect } from 'react';
import { differenceInSeconds, parseISO } from 'date-fns';

export function useTimer(startTimeIso?: string | null, isRunning: boolean = true) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!startTimeIso) {
      setElapsedSeconds(0);
      return;
    }

    const start = parseISO(startTimeIso);
    
    // Initial calculation
    setElapsedSeconds(Math.max(0, differenceInSeconds(new Date(), start)));

    if (!isRunning) return;

    // Update every second
    const intervalId = setInterval(() => {
      setElapsedSeconds(Math.max(0, differenceInSeconds(new Date(), start)));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTimeIso, isRunning]);

  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  
  const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  return {
    elapsedSeconds,
    hours,
    minutes,
    seconds,
    formattedHours,
    formattedMinutes,
    formattedSeconds,
    formattedTime,
  };
}
