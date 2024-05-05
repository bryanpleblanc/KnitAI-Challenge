import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";

const FormButton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Button type="submit" disabled={isLoading}>
      {isLoading ? (
        <div className="flex items-center">
          <LoaderIcon className="animate-spin" />
        </div>
      ) : (
        "Convert"
      )}
    </Button>
  );
};

export default FormButton;
