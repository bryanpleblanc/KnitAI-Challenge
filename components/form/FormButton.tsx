import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";

const FormButton = ({
  isLoading,
  label,
}: {
  isLoading: boolean;
  label: string;
}) => {
  return (
    <Button type="submit" disabled={isLoading}>
      {isLoading ? (
        <div className="flex items-center">
          <LoaderIcon className="animate-spin" />
        </div>
      ) : (
        <span>{label}</span>
      )}
    </Button>
  );
};

export default FormButton;
