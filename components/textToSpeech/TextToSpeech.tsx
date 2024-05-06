import React, { useEffect, useState } from "react";
import TextToSpeechCard from "./TextToSpeechCard";
import OutputCard from "./OutputCard";
import { TextToSpeechApiResponse, TextToSpeechProps } from "@/types/TTS";
import usePollMultipleTTSJobs from "@/hooks/usePollMultipleTTSJobs";

const TextToSpeech = ({ models, initialJobs }: TextToSpeechProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { jobs, refetch, error, isFetching } =
    usePollMultipleTTSJobs(initialJobs);
  const [job, setJob] = useState<TextToSpeechApiResponse | null>(null);
  const [resetForm, setResetForm] = useState(false);

  // Resetting state after tts-job is complete
  useEffect(() => {
    const resetState = () => {
      if (
        job &&
        jobs[0] &&
        jobs[0].id === job.id &&
        jobs[0].status !== "running"
      ) {
        setIsLoading(false);
        setJob(null);
        setResetForm(true);
      }
    };
    resetState();
  }, [jobs]);

  // Once tts-job is sent, start polling
  useEffect(() => {
    const fetchJobs = () => {
      if (job) {
        refetch();
      }
    };
    fetchJobs();
  }, [job, refetch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center mb-8 w-[500px]">
        <h1 className="text-3xl font-bold text-gray-900">
          Kits AI Text-to-speech
        </h1>
        <p className="text-md text-gray-700 mt-5 ">
          Play with unique AI voice models, languages, and pitch without the
          need for voice actors, microphones, or recordings.
        </p>
      </div>

      <div className="flex flex-row justify-center items-start space-x-4">
        <TextToSpeechCard
          models={models}
          setJob={setJob}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          resetForm={resetForm}
          setResetForm={setResetForm}
        />
        <OutputCard jobs={jobs} error={error} />
      </div>
    </div>
  );
};

export default TextToSpeech;
