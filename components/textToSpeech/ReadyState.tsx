import React, { memo, useState, useEffect, useRef } from "react";
import { PlayArrow, FileDownload, Pause } from "@mui/icons-material";
import OutputItemTitle from "./OutputItemTitle";
const ReadyState = memo(
  ({
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
      const audio = audioRef.current;

      const startProgress = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => {
          if (audio.duration) {
            setProgress((audio.currentTime / audio.duration) * 100);
          }
        }, 1000);
      };

      audio.addEventListener("play", startProgress);
      audio.addEventListener("pause", () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      });
      audio.addEventListener("ended", () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setPlaying(false);
        setProgress(0);
      });

      return () => {
        audio.removeEventListener("play", startProgress);
        audio.removeEventListener("pause", () => {
          if (intervalRef.current) clearInterval(intervalRef.current);
        });
        audio.removeEventListener("ended", () => {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setPlaying(false);
          setProgress(0);
        });
        if (intervalRef.current) clearInterval(intervalRef.current);
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
            className="flex items-center justify-center"
          >
            {playing ? <Pause /> : <PlayArrow className="text-gray-500" />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSliderChange}
            style={{ width: "250px", color: "black", background: "black" }}
            className="slider"
          />
          <a
            href={audioUrl}
            download
            className="flex items-center justify-center"
          >
            <FileDownload className="text-gray-500" />
          </a>
        </div>
      </>
    );
  }
);

export default ReadyState;
