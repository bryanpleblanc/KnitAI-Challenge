import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TextToSpeechApiResponse } from "@/types/TTS";
import OutputConverting from "./OutputConverting";
import OutputReady from "./OutputReady";

const OutputCard = ({
  jobs,
  error,
}: {
  jobs?: TextToSpeechApiResponse[] | null;
  error: Error | null;
}) => {
  return (
    <Card className="w-[350px]">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Outputs</CardTitle>
        <CardDescription className="text-xs">
          This section will show your last 5 conversations.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {jobs &&
          jobs.map((jobDetails, index) => (
            <div key={index} className="mt-2 border-t border-gray-300">
              {jobDetails?.status === "running" &&
                jobDetails?.progress !== undefined && (
                  <OutputConverting
                    progress={jobDetails.progress}
                    genre={jobDetails.model?.title}
                    time={jobDetails.createdAt}
                  />
                )}
              {jobDetails?.status === "success" && (
                <OutputReady
                  audioUrl={jobDetails.outputFileUrl}
                  genre={jobDetails.model?.title}
                  time={jobDetails.createdAt}
                />
              )}
            </div>
          ))}
        {error && <div>Error: {error.message}</div>}
      </CardContent>
    </Card>
  );
};

export default OutputCard;
