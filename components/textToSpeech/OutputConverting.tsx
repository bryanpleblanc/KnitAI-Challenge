import React from "react";
import OutputItemTitle from "./OutputItemTitle";

const OutputConverting = ({
  progress,
  genre,
  time,
}: {
  progress?: number | null;
  genre: string;
  time: string;
}) => {
  return (
    <>
      <OutputItemTitle status={"Converting"} genre={genre} time={time} />
      <div className="flex items-center justify-between w-full p-2 rounded-lg">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress ? progress : 0}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default OutputConverting;
