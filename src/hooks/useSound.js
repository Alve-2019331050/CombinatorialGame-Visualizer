import { useCallback, useEffect, useRef } from 'react';

const useGameSound = () => {
  const audioContext = useRef(null);
  const gainNode = useRef(null);

  useEffect(() => {
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    gainNode.current = audioContext.current.createGain();
    gainNode.current.connect(audioContext.current.destination);
    gainNode.current.gain.value = 0.3; // Set default volume
  }, []);

  const playSound = useCallback((type) => {
    if (!audioContext.current) return;

    const oscillator = audioContext.current.createOscillator();
    oscillator.connect(gainNode.current);

    // Different sound configurations for different actions
    switch (type) {
      case 'select':
        oscillator.frequency.setValueAtTime(440, audioContext.current.currentTime); // A4 note
        oscillator.type = 'sine';
        break;
      case 'move':
        oscillator.frequency.setValueAtTime(330, audioContext.current.currentTime); // E4 note
        oscillator.type = 'triangle';
        break;
      case 'win':
        oscillator.frequency.setValueAtTime(587.33, audioContext.current.currentTime); // D5 note
        oscillator.type = 'square';
        // Create a victory melody
        oscillator.frequency.setValueAtTime(587.33, audioContext.current.currentTime);
        oscillator.frequency.setValueAtTime(659.25, audioContext.current.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(783.99, audioContext.current.currentTime + 0.2);
        break;
      default:
        oscillator.frequency.setValueAtTime(440, audioContext.current.currentTime);
    }

    oscillator.start();
    oscillator.stop(audioContext.current.currentTime + (type === 'win' ? 0.3 : 0.1));
  }, []);

  return playSound;
};

export default useGameSound;
