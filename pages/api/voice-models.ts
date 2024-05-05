import type { NextApiRequest, NextApiResponse } from "next";

type ApiResponse = {
  id: string;
  name: string;
}[];

type ApiError = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | ApiError>
) {
  const url =
    "https://arpeggi.io/api/kits/v1/voice-models?perPage=50&order=asc";

  try {
    const apiResponse = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.KITAI_API_KEY}`,
      },
    });

    if (!apiResponse.ok) {
      throw new Error(`Error from API: ${apiResponse.status}`);
    }

    const models: ApiResponse = await apiResponse.json();
    res.status(200).json(models);
  } catch (error: any) {
    console.error("Failed to fetch voice models:", error);
    res.status(500).json({ error: "Failed to fetch voice models" });
  }
}
