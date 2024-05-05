import { NextApiRequest, NextApiResponse } from "next";

interface TextToSpeechRequest {
  voiceModelId: string;
  text: string;
}

interface TextToSpeechResponse {
  id: number;
  createdAt: string;
  type: "rvc" | "uvr" | "tts";
  voiceModelId: string | null | undefined;
  status: "running" | "success" | "error" | "cancelled";
  jobStartTime: string;
  jobEndTime: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TextToSpeechResponse | { error: string }>
) {
  const APIROUTE = process.env.KITAPI_ROUTE;
  const AUTHKEY = `Bearer ${process.env.KITAI_API_KEY}`;

  if (req.method === "POST") {
    const { voiceModelId, text }: TextToSpeechRequest = req.body;
    const formData = new FormData();

    formData.append("voiceModelId", voiceModelId);
    formData.append("inputTtsText", text);

    try {
      const response = await fetch(`${APIROUTE}/kits/v1/tts`, {
        method: "POST",
        headers: {
          Authorization: AUTHKEY,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error(
          `Failed to convert text to speech: ${response.statusText}`
        );
      }
      const result = await response.json();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to convert text to speech" });
    }
  } else if (req.method === "GET") {
    const { jobId } = req.query;
    let response;

    try {
      if (!jobId) {
        response = await fetch(
          `https://arpeggi.io/api/kits/v1/tts/?perPage=5`,
          {
            method: "GET",
            headers: {
              Authorization: AUTHKEY,
            },
          }
        );
      } else {
        response = await fetch(`https://arpeggi.io/api/kits/v1/tts/${jobId}`, {
          method: "GET",
          headers: {
            Authorization: AUTHKEY,
          },
        });
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch TTS job: ${response.statusText}`);
      }
      const jobDetails = await response.json();
      res.status(200).json(jobDetails);
    } catch (error) {
      console.error("Error fetching TTS job:", error);
      res.status(500).json({ error: "Failed to retrieve TTS job" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
