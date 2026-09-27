const fs = require('fs');
const path = require('path');

// Generates a 15-second looping electronic DJ dance beat (WAV format)
const sampleRate = 44100;
const bpm = 128;
const beatDuration = 60 / bpm; // ~0.46875s
const totalDuration = 15; // 15 seconds
const totalSamples = sampleRate * totalDuration;

const buffer = Buffer.alloc(44 + totalSamples * 2);

// RIFF header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + totalSamples * 2, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // SubChunk1Size
buffer.writeUInt16LE(1, 20); // PCM format
buffer.writeUInt16LE(1, 22); // Mono
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * 2, 28); // ByteRate
buffer.writeUInt16LE(2, 32); // BlockAlign
buffer.writeUInt16LE(16, 34); // BitsPerSample
buffer.write('data', 36);
buffer.writeUInt32LE(totalSamples * 2, 40);

for (let i = 0; i < totalSamples; i++) {
  const t = i / sampleRate;
  const beatTime = t % beatDuration;
  const measureTime = t % (beatDuration * 4);
  const beatIndex = Math.floor((t / beatDuration) % 4);

  // 1. Hard Dance Kick drum (punchy 150Hz decaying down to 45Hz)
  let kick = 0;
  if (beatTime < 0.25) {
    const env = Math.exp(-beatTime * 18);
    const freq = 45 + 110 * Math.exp(-beatTime * 35);
    kick = Math.sin(2 * Math.PI * freq * beatTime) * env * 0.9;
  }

  // 2. Off-beat Open/Closed Hi-hat
  let hihat = 0;
  const offbeatTime = (t + beatDuration * 0.5) % beatDuration;
  if (offbeatTime < 0.12) {
    const env = Math.exp(-offbeatTime * 30);
    const noise = (Math.random() * 2 - 1);
    hihat = noise * env * 0.25;
  }

  // 3. Energetic Synth Bassline / Arp (16th notes)
  const sixteenthTime = t % (beatDuration / 4);
  const sixteenthStep = Math.floor((t / (beatDuration / 4)) % 16);
  const notes = [110, 110, 138.59, 110, 164.81, 110, 138.59, 123.47, 110, 110, 138.59, 164.81, 220, 164.81, 138.59, 123.47];
  const synthFreq = notes[sixteenthStep % notes.length];
  const synthEnv = Math.exp(-sixteenthTime * 15);
  // Sawtooth approximation
  const synthPhase = (t * synthFreq) % 1;
  const saw = (synthPhase * 2 - 1);
  const synth = saw * synthEnv * 0.35;

  // 4. Strobe Siren / Rave lead (rhythmic rise)
  const sirenFreq = 350 + Math.sin(t * 8) * 120;
  const siren = Math.sin(2 * Math.PI * sirenFreq * t) * 0.15;

  let sample = kick + hihat + synth + siren;
  // Soft limiter
  sample = Math.tanh(sample * 1.2);
  const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));
  buffer.writeInt16LE(intSample, 44 + i * 2);
}

const outPath = path.join(__dirname, '..', 'public', 'audio', 'prank.mp3');
fs.writeFileSync(outPath, buffer);
console.log('Generated audio successfully at:', outPath);
