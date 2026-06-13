// A simple Web Audio API utility to generate a guitar-like melody
let audioCtx = null;

export const playGuitarSound = () => {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const t = audioCtx.currentTime;
    
    // Play a short pleasing melody (e.g., C4, E4, G4, C5)
    const notes = [261.63, 329.63, 392.00, 523.25];
    
    notes.forEach((freq, index) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + index * 0.15); // Stagger notes
      
      const noteTime = t + index * 0.15;
      gainNode.gain.setValueAtTime(0, noteTime);
      gainNode.gain.linearRampToValueAtTime(0.3, noteTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.4);
    });
  } catch (error) {
    console.warn("Audio generation failed:", error);
  }
};
