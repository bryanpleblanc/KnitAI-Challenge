import React, { useState } from "react";
import { VoiceModel } from "@/types/TTS";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";

type Props = {
  models: VoiceModel[];
  control: any;
  name: string;
  rules?: any;
};

const VoiceModelSelector = ({ models, control, name, rules }: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        const handleValueChange = (value: string) => {
          const selectedModel = models.find((model) => model.id === value);
          if (selectedModel) {
            field.onChange(value);
          }
        };

        const sortedModels = models.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        const selectedTitle =
          models.find((model) => model.id === field.value)?.title ||
          "Select a model";

        return (
          <>
            <Label htmlFor="voiceModelSelector" className="text-sm">
              Voice Model
            </Label>
            <Select onValueChange={handleValueChange}>
              <SelectTrigger className="w-[300px]">
                <SelectValue>{selectedTitle}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {sortedModels.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.error && (
              <p className="text-red-500 text-xs">{fieldState.error.message}</p>
            )}
          </>
        );
      }}
    />
  );
};

export default VoiceModelSelector;
