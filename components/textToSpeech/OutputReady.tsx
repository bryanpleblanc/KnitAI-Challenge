import React, { useState, useEffect, useRef } from "react";
import { PlayArrow, FileDownload, Pause } from "@mui/icons-material";
import OutputItemTitle from "./OutputItemTitle";

const OutputReady = ({
  audioUrl,
  genre,
  time,
}: {
  audioUrl: string;
  genre: string;
  time: string;
}) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio(audioUrl));
  const intervalRef = useRef<number>(0);

  useEffect(() => {
    const newAudio = new Audio(audioUrl);
    audioRef.current = newAudio;

    const startProgress = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        if (newAudio.duration) {
          setProgress((newAudio.currentTime / newAudio.duration) * 100);
        }
      }, 1000);
    };

    newAudio.addEventListener("play", startProgress);
    newAudio.addEventListener("pause", () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    });
    newAudio.addEventListener("ended", () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setPlaying(false);
      setProgress(0);
    });

    return () => {
      newAudio.removeEventListener("play", startProgress);
      newAudio.removeEventListener("pause", () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      });
      newAudio.removeEventListener("ended", () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setPlaying(false);
        setProgress(0);
      });
      if (intervalRef.current) clearInterval(intervalRef.current);
      newAudio.pause();
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const seekTime = (audio.duration / 100) * Number(e.target.value);
    audio.currentTime = seekTime;
    setProgress(Number(e.target.value));
  };
  return (
    <>
      <OutputItemTitle status={"Ready"} genre={genre} time={time} />

      <div className="flex items-center justify-between w-full p-2 rounded-lg">
        <button
          onClick={() => togglePlay()}
          className="flex items-center justify-center border-2 rounded-sm h-6 w-6 p-1"
        >
          {playing ? (
            <Pause style={{ fontSize: "14px" }} className="text-gray-500" />
          ) : (
            <PlayArrow style={{ fontSize: "14px" }} className="text-gray-500" />
          )}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSliderChange}
          style={{ width: "250px" }}
          className="slider"
        />
        <a
          href={audioUrl}
          download
          className="flex items-center justify-center"
        >
          <div className="flex items-center justify-center border-2 rounded-sm h-6 w-6 p-1">
            <FileDownload
              style={{ fontSize: "14px" }}
              className="text-gray-500"
            />
          </div>
        </a>
      </div>
    </>
  );
};

export default OutputReady;
