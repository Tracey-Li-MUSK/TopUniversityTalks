import { GoogleGenAI, Type } from "@google/genai";
import { Speech } from "../types";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

// Initialize the client once, but check for key in function to avoid init errors if env is missing
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey: apiKey });
}

export const fetchSpeeches = async (keyword: string): Promise<Speech[]> => {
  if (!ai) {
    console.error("API Key not found");
    throw new Error("API Key is missing. Please set process.env.API_KEY.");
  }

  const prompt = `
    Find 6 to 9 real, famous, and inspiring commencement speeches or guest lectures at top US universities (like Harvard, Stanford, MIT, Yale, etc.) that relate to the theme: "${keyword}".
    
    Focus on speeches that are encouraging for young people. 
    
    For each speech, estimate its:
    1. 'popularityLabel': A short descriptor of its fame (e.g., "Viral Sensation", "Modern Classic", "Hidden Gem").
    2. 'viewCountEstimate': An estimate of views across major platforms (e.g., "20M+", "5M+", "500K+").
    3. 'recommendationScore': A score from 85 to 100 representing how highly recommended it is for this specific theme.
    
    IMPORTANT: Provide the specific 'videoId' (the 11-character code, e.g., 'UF8uR6Z6KLc') for the most popular/official YouTube upload of this speech.
    If you cannot find a specific video ID with high certainty, leave the videoId field empty, but always provide the 'youtubeQuery'.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            speeches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  speaker: { type: Type.STRING, description: "Name of the speaker" },
                  university: { type: Type.STRING, description: "Name of the university" },
                  year: { type: Type.STRING, description: "Year of the speech" },
                  role: { type: Type.STRING, description: "Profession of the speaker (e.g. Author, CEO)" },
                  topic: { type: Type.STRING, description: "Short title or main theme of the speech" },
                  quote: { type: Type.STRING, description: "A famous or inspiring short quote from this speech" },
                  summary: { type: Type.STRING, description: "One sentence summary of the message" },
                  youtubeQuery: { type: Type.STRING, description: "Search query string to find this video on YouTube" },
                  videoId: { type: Type.STRING, description: "The 11-character YouTube video ID (e.g. dQw4w9WgXcQ)" },
                  popularityLabel: { type: Type.STRING, description: "Short text describing fame level" },
                  viewCountEstimate: { type: Type.STRING, description: "Estimated view count string (e.g. 10M+)" },
                  recommendationScore: { type: Type.NUMBER, description: "Score from 85-100" },
                },
                required: ["speaker", "university", "year", "topic", "quote", "summary", "youtubeQuery", "role", "popularityLabel", "viewCountEstimate", "recommendationScore"],
              },
            },
          },
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) return [];

    const data = JSON.parse(jsonText);
    return data.speeches || [];

  } catch (error) {
    console.error("Error fetching speeches:", error);
    throw error;
  }
};
