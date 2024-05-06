import React from "react";
import type { GetServerSideProps } from "next";
import TextToSpeech from "@/components/textToSpeech/TextToSpeech";
import { TextToSpeechProps } from "@/types/TTS";

export const getServerSideProps: GetServerSideProps = async () => {
  const voiceUrl = `${process.env.API_URL}/voice-models`;
  const jobsUrl = `${process.env.API_URL}/text-to-speech`;
  try {
    const voiceRes = await fetch(voiceUrl);
    const voiceData = await voiceRes.json();
    const models = voiceData.data;
    const jobsRes = await fetch(jobsUrl);
    const initialJobs = await jobsRes.json();

    return {
      props: {
        models,
        initialJobs,
      },
    };
  } catch (error) {
    console.error("getServerSideProps error:", error);
    return {
      props: {
        models: [],
        initialJobs: { data: [], meta: null },
      },
    };
  }
};

const Home = ({ models, initialJobs }: TextToSpeechProps) => {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <TextToSpeech models={models} initialJobs={initialJobs} />
    </div>
  );
};

export default Home;
