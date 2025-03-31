import { useRef, useState, useEffect } from "react";

export default function MediaPlayer({ type, mediaSrc, isFull = false, title }) {
  const mediaRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  const togglePlay = () => {
    if (mediaRef.current.paused) {
      mediaRef.current.play();
      setPlaying(true);
    } else {
      mediaRef.current.pause();
      setPlaying(false);
    }
  };

  const handleProgress = () => {
    const percent =
      (mediaRef.current.currentTime / mediaRef.current.duration) * 100;
    setProgress(percent);
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * mediaRef.current.duration;
    mediaRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const handleVolume = (e) => {
    const newVolume = e.target.value;
    mediaRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  useEffect(() => {
    // Reset states when type or mediaSrc changes
    setPlaying(false);
    setProgress(0);
    setVolume(1);

    if (mediaRef.current) {
      mediaRef.current.pause();
      mediaRef.current.currentTime = 0;
      mediaRef.current.volume = 1;
    }
  }, [type, mediaSrc]);



  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs > 0 ? `${hrs}:` : ""}${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }


  if (type === "video") {
    return (
      <div className="space-y-4">
        {
          isFull ? <div className="w-[85%] font-black text-2xl text-white text-center">
            {title}
          </div> : null
        }
        <div className={`absolute ${isFull ? '-bottom-5' : 'bottom-0'} left-1/2 transform -translate-x-1/2 ${isFull ? 'w-[85%]' : 'w-[70%]'} group cursor-pointer`}>


          <img src="/src/assets/tv.png" alt="TV Frame" className="w-full" />
          <video
            ref={mediaRef}
            onTimeUpdate={handleProgress}
            className="absolute top-[0.5%] left-[0.5%] w-[99%] bg-black rounded-[2px]"
            src={mediaSrc}
          />

          <div className="hidden group-hover:block bg-black/20 p-4 rounded-lg absolute bottom-20 z-50 w-[90%] left-1/2 transform -translate-x-1/2">
            <div className="flex justify-end">
              <img className="w-8" src="/src/assets/audio.png" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolume}
                className="ml-2 accent-white"
              />
            </div>

            <div className="flex gap-4 p-4 items-center">
              <button onClick={togglePlay} className="text-white">
                {playing ? (
                  <img className="w-16" src="/src/assets/pause.png" />
                ) : (
                  <img className="w-16" src="/src/assets/play.png" />
                )}
              </button>
              <div className="w-full flex items-center gap-4 justify-center text-white mx-auto">
                {formatTime(mediaRef?.current?.currentTime || 0)}
                <input
                  type="range"
                  value={progress}
                  onChange={handleSeek}
                  className="w-3/5 mx-4 accent-white"
                />
                {formatTime(mediaRef.current?.duration || 0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }


  // Audio Section
  return (
    <div className="w-full bg-black p-4 rounded-lg shadow-lg relative">
      {(
        <div className="w-full flex items-center justify-center">
          <audio ref={mediaRef} onTimeUpdate={handleProgress} src={mediaSrc} />
          <div className="w-full rounded-2xl overflow-hidden">
            <img
              src="/src/assets/queMark.png"
              alt="Audio Icon"
              className="w-full"
            />
          </div>
        </div>
      )}

      <div className="flex justify-end mt-4">
        <img className="w-8" src="/src/assets/audio.png" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolume}
          className="ml-2 accent-white"
        />
      </div>

      <div className="flex gap-4 p-4 flex-col items-center">
        <button onClick={togglePlay} className="text-white">
          {playing ? (
            <img className="w-16" src="/src/assets/pause.png" />
          ) : (
            <img className="w-16" src="/src/assets/play.png" />
          )}
        </button>
        <div className="w-full flex items-center justify-center gap-4 text-white mx-auto">
          {formatTime(mediaRef?.current?.currentTime || 0)}
          <input
            type="range"
            value={progress}
            onChange={handleSeek}
            className="w-4/5 mx-4 accent-white"
          />
          {formatTime(mediaRef?.current?.duration || 0)}
        </div>
      </div>
    </div>
  );
}
