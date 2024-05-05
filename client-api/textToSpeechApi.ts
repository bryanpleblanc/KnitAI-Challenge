"use client";
export const handleTextToSpeechConversion = async (
  voiceModelId: string,
  text: string
) => {
  try {
    const response = await fetch("/api/text-to-speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ voiceModelId, text }),
    });

    if (!response.ok) {
      throw new Error("Failed to convert text to speech");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error converting text to speech:", error);
  }
};

export const getTTSJobs = async () => {
  let response;
  try {
    response = await fetch(`/api/text-to-speech`);

    if (!response.ok) {
      throw new Error("Failed to fetch TTS job details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching TTS job details:", error);
    throw error;
  }
};
