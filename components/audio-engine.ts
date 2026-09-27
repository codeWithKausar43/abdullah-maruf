/**
 * Audio Engine with dual-layer redundancy and interactive rave sound effects:
 * Layer 1: HTML5 Audio streaming from siteConfig.media.audioPath (/audio/prank.mp3)
 * Layer 2: Web Audio API procedural rave synthesizer fallback
 * Layer 3: Interactive bass-drop / laser zap triggered on user clicks!
 */

class AudioExperienceEngine {
  private audioElement: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private mediaSource: MediaElementAudioSourceNode | null = null;
  private synthInterval: number | null = null;
  private isPlaying = false;
  private freqArray: Uint8Array = new Uint8Array(64);
  private lastBeatTime = 0;

  public async prepare(): Promise<void> {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx && !this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext && this.audioContext.state === "suspended") {
        await this.audioContext.resume();
      }
    } catch (e) {
      console.warn("AudioContext prepare error:", e);
    }
  }

  public initAudio(url: string, volume: number = 1.0) {
    if (typeof window === "undefined") return;

    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.src = url;
      this.audioElement.loop = true;
      this.audioElement.crossOrigin = "anonymous";
      this.audioElement.volume = Math.min(1.0, Math.max(0.1, volume));
      this.audioElement.preload = "auto";
      this.audioElement.onerror = () => {
        if (this.audioElement && !this.audioElement.src.includes("prank-adio.mp3")) {
          this.audioElement.src = "/audio/prank-adio.mp3";
        }
      };
    }
  }

  public async play(url: string, volume: number = 1.0): Promise<void> {
    if (typeof window === "undefined") return;
    this.isPlaying = true;

    this.initAudio(url, volume);

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx && !this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext) {
        if (this.audioContext.state === "suspended") {
          await this.audioContext.resume();
        }

        if (!this.analyser) {
          this.analyser = this.audioContext.createAnalyser();
          this.analyser.fftSize = 128;
          this.analyser.smoothingTimeConstant = 0.75;
          this.freqArray = new Uint8Array(this.analyser.frequencyBinCount);
        }

        if (this.audioElement && !this.mediaSource) {
          try {
            this.mediaSource = this.audioContext.createMediaElementSource(this.audioElement);
            this.mediaSource.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);
          } catch (err) {
            console.warn("Direct media source connection error, connecting fallback:", err);
          }
        }
      }
    } catch (e) {
      console.warn("AudioContext setup error:", e);
    }

    let html5Succeeded = false;
    if (this.audioElement) {
      try {
        this.audioElement.currentTime = 0;
        this.audioElement.volume = volume;
        const playPromise = this.audioElement.play();
        if (playPromise !== undefined) {
          await playPromise;
          html5Succeeded = true;
        }
      } catch (e) {
        console.warn("HTML5 audio playback error, falling back:", e);
      }
    }

    if (!html5Succeeded) {
      this.startProceduralClubBeat();
    }
  }

  /**
   * Returns live normalized audio data (0..1) for visuals synchronization
   */
  public getAudioMetrics(): {
    bass: number;
    mid: number;
    treble: number;
    overall: number;
    isBeat: boolean;
  } {
    if (!this.analyser || !this.isPlaying) {
      // Simulate pulsating rhythm if analyzer is unavailable
      const now = performance.now();
      const beatPhase = (now % 440) / 440; // ~136 BPM rhythm
      const isBeat = beatPhase < 0.2;
      const simBass = isBeat ? 0.85 + Math.random() * 0.15 : 0.2 + Math.random() * 0.2;
      return {
        bass: simBass,
        mid: 0.35 + Math.random() * 0.25,
        treble: 0.25 + Math.random() * 0.25,
        overall: (simBass + 0.3) / 2,
        isBeat,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.analyser as any).getByteFrequencyData(this.freqArray);

    let bassSum = 0;
    let midSum = 0;
    let trebleSum = 0;

    // Bass: bins 0..6
    for (let i = 0; i < 7; i++) bassSum += this.freqArray[i] || 0;
    // Mid: bins 7..24
    for (let i = 7; i < 25; i++) midSum += this.freqArray[i] || 0;
    // Treble: bins 25..60
    for (let i = 25; i < 60; i++) trebleSum += this.freqArray[i] || 0;

    const bass = bassSum / (7 * 255);
    const mid = midSum / (18 * 255);
    const treble = trebleSum / (35 * 255);
    const overall = (bass * 0.5 + mid * 0.3 + treble * 0.2);

    const now = performance.now();
    const isBeat = bass > 0.62 && (now - this.lastBeatTime > 260);
    if (isBeat) {
      this.lastBeatTime = now;
    }

    return { bass, mid, treble, overall, isBeat };
  }

  /**
   * Triggers an extreme bass drop / synth explosion when user tries to click the screen to escape!
   */
  public triggerBassDrop(): void {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx && !this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (!this.audioContext) return;
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume().catch(() => {});
      }

      const t = this.audioContext.currentTime;

      // Heavy 808 Sub-Bass Impact
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(35, t + 0.35);

      gain.gain.setValueAtTime(1.0, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.start(t);
      osc.stop(t + 0.45);

      // Sci-fi Laser Zap effect
      const zapOsc = this.audioContext.createOscillator();
      const zapGain = this.audioContext.createGain();
      zapOsc.type = "sawtooth";
      zapOsc.frequency.setValueAtTime(1200, t);
      zapOsc.frequency.exponentialRampToValueAtTime(80, t + 0.2);

      zapGain.gain.setValueAtTime(0.4, t);
      zapGain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);

      zapOsc.connect(zapGain);
      zapGain.connect(this.audioContext.destination);
      zapOsc.start(t);
      zapOsc.stop(t + 0.22);
    } catch (e) {
      console.warn("Bass drop trigger error:", e);
    }
  }

  public stop(): void {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    this.stopProceduralClubBeat();
    if (this.audioContext && this.audioContext.state === "running") {
      this.audioContext.suspend().catch(() => {});
    }
  }

  private startProceduralClubBeat(): void {
    if (!this.audioContext) return;
    this.stopProceduralClubBeat();

    const bpm = 135;
    const intervalMs = (60 / bpm / 4) * 1000;
    let step = 0;

    const notes = [110, 110, 138.6, 110, 164.8, 110, 138.6, 123.5];

    this.synthInterval = window.setInterval(() => {
      if (!this.audioContext || !this.isPlaying) return;
      const t = this.audioContext.currentTime;

      // Kick drum
      if (step % 4 === 0) {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(170, t);
        osc.frequency.exponentialRampToValueAtTime(40, t + 0.18);

        gain.gain.setValueAtTime(1.0, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        osc.start(t);
        osc.stop(t + 0.25);
      }

      // Off-beat hi-hat
      if (step % 4 === 2) {
        const bufferSize = this.audioContext.sampleRate * 0.06;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;
        const filter = this.audioContext.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.value = 7500;

        const gain = this.audioContext.createGain();
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);
        noise.start(t);
      }

      // Synth Bass Arp
      const bassFreq = notes[step % notes.length];
      const bassOsc = this.audioContext.createOscillator();
      const bassGain = this.audioContext.createGain();
      bassOsc.type = "sawtooth";
      bassOsc.frequency.setValueAtTime(bassFreq, t);

      const filter = this.audioContext.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(950, t);
      filter.frequency.exponentialRampToValueAtTime(200, t + 0.1);

      bassGain.gain.setValueAtTime(0.4, t);
      bassGain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

      bassOsc.connect(filter);
      filter.connect(bassGain);
      bassGain.connect(this.audioContext.destination);

      bassOsc.start(t);
      bassOsc.stop(t + 0.11);

      step++;
    }, intervalMs);
  }

  private stopProceduralClubBeat(): void {
    if (this.synthInterval !== null) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

export const audioEngine = new AudioExperienceEngine();
