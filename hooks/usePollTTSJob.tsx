import { useState, useEffect } from "react";
import { TextToSpeechJobDetails } from "@/types/TTS";
import { getTTSJobs } from "@/client-api/textToSpeechApi";

const usePollTTSJob = (
  jobId: number | null,
  maxAttempts = 15,
  interval = 2000
) => {
  const [jobDetails, setJobDetails] = useState<TextToSpeechJobDetails | null>(
    null
  );
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!jobId) return;

    let attempts = 0;
    const totalDuration = maxAttempts * interval; // Total duration job is expected to take
    const intervalId = setInterval(async () => {
      if (attempts >= maxAttempts) {
        console.log("Maximum attempts reached without completion.");
        clearInterval(intervalId);
        setProgress(100); // Ensure progress is set to 100% when max attempts are reached
        return;
      }

      try {
        const result = await getTTSJobs(jobId);
        console.log("Job Result:", result);
        setJobDetails({
          ...result,
          progress: Math.min(90, (attempts / maxAttempts) * 100),
        });

        // Increment progress only if the job is still converting
        if (result.status === "running" && attempts < maxAttempts - 1) {
          setProgress((attempts / maxAttempts) * 100);
        }

        if (
          result.status === "success" ||
          result.status === "cancelled" ||
          result.status === "error"
        ) {
          console.log("Job completed successfully.");
          setProgress(100);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error fetching job status:", error);
        setError("Failed to fetch job status");
        clearInterval(intervalId);
      }

      attempts++;
    }, interval);

    return () => clearInterval(intervalId);
  }, [jobId, maxAttempts, interval]);

  return { jobDetails, progress, error };
};

export default usePollTTSJob;
