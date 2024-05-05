export type VoiceModel = {
  id: string;
  title: string;
  imageUrl: string;
  demoUrl: string;
  instagramLink: string | null;
  spotifyLink: string | null;
  tiktokLink: string | null;
  twitterLink: string | null;
  youtubeLink: string | null;
  tags: string[];
};

export type TextToSpeechApiResponse = {
  createdAt: string;
  id: number;
  jobEndTime: string | null;
  jobStartTime: string | null;
  lossyOutputFileUrl: string | null;
  model: VoiceModel;
  outputFileUrl: string;
  recombinedAudioFileUrl: string | null;
  status: "running" | "success" | "error" | "cancelled";
  type: "tts";
  voiceModelId: number;
  progress: number | null | undefined;
};

export interface TextToSpeechProps {
  models: VoiceModel[];
  serverJobs?: TextToSpeechApiResponse[];
}

export interface TextToSpeechJobDetails {
  createdAt: string;
  id: number;
  jobEndTime: string | null;
  jobStartTime: string | null;
  lossyOutputFileUrl: string | null;
  model: VoiceModel;
  outputFileUrl: string;
  recombinedAudioFileUrl: string | null;
  status: "running" | "success" | "error" | "cancelled";
  type: "tts";
  voiceModelId: number;
  progress: number;
}
