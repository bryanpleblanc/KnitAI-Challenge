import { useState, useEffect } from "react";
import {
  TextToSpeechApiResponse as Response,
  PaginationInfo,
} from "@/types/TTS";
import { useQuery } from "@tanstack/react-query";
import { getTTSJobs } from "@/client-api/textToSpeechApi";

type TextToSpeechApiResponse = {
  data: Response[];
  meta: PaginationInfo;
};

const usePollMultipleTTSJobs = () => {
  const [shouldPoll, setShouldPoll] = useState(true);
  const [refetchCount, setRefetchCount] = useState(0);

  const { data, error, refetch, isFetching } =
    useQuery<TextToSpeechApiResponse>({
      queryKey: ["ttsJobs"],
      queryFn: getTTSJobs,
      enabled: shouldPoll,
      refetchInterval: shouldPoll ? 2000 : undefined,
      refetchOnWindowFocus: false,
    });

  useEffect(() => {
    const anyRunning =
      data?.data.some((job) => job.status === "running") || false;
    setShouldPoll(anyRunning);
    // Update the refetch count, but cap it at 10
    if (anyRunning && refetchCount < 10) {
      setRefetchCount((currentCount) => currentCount + 1);
    } else {
      setRefetchCount(0);
      setShouldPoll(false);
    }
  }, [data]);

  const jobs = data?.data || [];

  return {
    jobs: jobs.map((job, index) => ({
      ...job,
      progress: job.status === "running" ? (refetchCount / 5) * 100 : 100, // Produce Percent Progress
    })),
    error,
    refetch,
    isFetching,
    currentPage: data?.meta.currentPage,
    totalPages: data?.meta.lastPage,
  };
};

export default usePollMultipleTTSJobs;
