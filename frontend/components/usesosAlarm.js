// hooks/useAlarm.js
import { useRef } from 'react';

export function usesosAlarm() {
  const audioRef = useRef(null);

  const playAlarm = () => {
    if (!audioRef.current) {
      // Initialize and preload alarm sound
      const audio = new Audio('/alarm2.mp3'); // Place alarm.mp3 in your public folder
      audio.loop = true;
      audio.volume = 1.0;
      audioRef.current = audio;
    }

    // Play the sound
    audioRef.current.play().catch((err) => {
      console.error('Alarm play error:', err);
    });

    // Vibrate if supported
    if (navigator.vibrate) {
      navigator.vibrate([500, 200, 500, 200, 500]); // pattern
    }
  };

  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      navigator.vibrate(0); // Stop vibration
    }
  };

  return { playAlarm, stopAlarm };
}
