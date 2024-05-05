import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";

interface VoiceTextAreaProps {
  control: any;
  name: string;
  rules?: any;
}

const VoiceTextArea = ({ control, name, rules }: VoiceTextAreaProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <>
          <Label htmlFor="voiceInput" className="text-sm">
            Input text
          </Label>
          <Textarea
            id="voiceInput"
            placeholder="Add text here"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
          {fieldState.error && (
            <p className="text-red-500 text-xs">{fieldState.error.message}</p>
          )}
        </>
      )}
    />
  );
};

export default VoiceTextArea;
