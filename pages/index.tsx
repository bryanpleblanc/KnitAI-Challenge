import React from "react";
import type { GetServerSideProps } from "next";
import TextToSpeech from "@/components/textToSpeech/TextToSpeech";
import { TextToSpeechProps } from "@/types/TTS";

export const getServerSideProps: GetServerSideProps = async () => {
  const voiceUrl = `${process.env.API_URL}/voice-models`;
  try {
    const voiceRes = await fetch(voiceUrl);
    const voiceData = await voiceRes.json();
    const models = voiceData.data;
    return {
      props: {
        models,
      },
    };
  } catch (error) {
    console.error("getServerSideProps error:", error);
    return {
      props: {
        models: [],
      },
    };
  }
};

const Home = ({ models }: TextToSpeechProps) => {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <TextToSpeech models={models} />
    </div>
  );
};

export default Home;
