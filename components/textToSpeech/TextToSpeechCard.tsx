import { useState } from "react";
import VoiceModelSelector from "@/components/form/VoiceModelSelector";
import FormButton from "../form/FormButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VoiceTextArea from "../form/VoiceTextArea";
import { useForm } from "react-hook-form";
import { handleTextToSpeechConversion } from "@/client-api/textToSpeechApi";
import { TextToSpeechApiResponse, TextToSpeechProps } from "@/types/TTS";

type TextToSpeechCardProps = TextToSpeechProps & {
  setJob: (result: TextToSpeechApiResponse) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};
type FormData = {
  voiceModelId: string;
  text: string;
};

const TextToSpeechCard = ({
  models,
  setJob,
  isLoading,
  setIsLoading,
}: TextToSpeechCardProps) => {
  const [error, setError] = useState("");
  const { control, handleSubmit } = useForm({
    defaultValues: {
      voiceModelId: "",
      text: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError("");
    try {
      const response: TextToSpeechApiResponse =
        await handleTextToSpeechConversion(data.voiceModelId, data.text);
      setJob(response);
    } catch (err) {
      console.error("Conversion error:", err);
      setError("Failed to convert text to speech. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Text to speech</CardTitle>
        <CardDescription className="text-xs">
          Select a voice and provide text to generate speech
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <VoiceModelSelector
                models={models}
                control={control}
                name="voiceModelId"
                rules={{ required: "Voice model is required" }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <VoiceTextArea
                control={control}
                name="text"
                rules={{ required: "Text is required" }}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <FormButton isLoading={isLoading} />
        </CardFooter>
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </form>
    </Card>
  );
};

export default TextToSpeechCard;
