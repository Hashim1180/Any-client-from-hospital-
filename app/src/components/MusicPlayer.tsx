import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        // Autoplay blocked
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    setIsMuted(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <>
      {/* Audio Element */}
      <audio ref={audioRef} src="/assets/audio/Winter(MP3_320K).mp3" loop />

      {/* Toggle Button */}
      <button
        onClick={() => setShowPlayer(!showPlayer)}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full liquid-glass flex items-center justify-center transition-all hover:bg-white/10"
      >
        <Music className={`w-5 h-5 ${isPlaying ? 'text-clinical-blue' : 'text-white/60'}`} />
        {isPlaying && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-clinical-green rounded-full animate-pulse" />
        )}
      </button>

      {/* Player Panel */}
      {showPlayer && (
        <div className="fixed bottom-20 left-6 z-50 w-80 liquid-glass rounded-2xl p-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-4">
            {/* Album Art / Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-clinical-blue to-clinical-green flex items-center justify-center flex-shrink-0">
              <Music className="w-6 h-6 text-white" />
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">Ambient Background</p>
              <p className="text-white/50 text-xs">Relaxing Music</p>
            </div>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-clinical-blue flex items-center justify-center hover:bg-clinical-blue/80 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white ml-0.5" />
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-clinical-blue"
            />
            <div className="flex justify-between mt-1">
              <span className="text-white/40 text-xs">{formatTime(currentTime)}</span>
              <span className="text-white/40 text-xs">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 mt-3">
            <button onClick={toggleMute} className="text-white/60 hover:text-white transition-colors">
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-clinical-blue"
            />
          </div>

          {/* Visualizer */}
          {isPlaying && (
            <div className="flex items-end justify-center gap-1 mt-3 h-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-clinical-blue rounded-full voice-bar"
                  style={{
                    height: `${4 + Math.random() * 16}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
