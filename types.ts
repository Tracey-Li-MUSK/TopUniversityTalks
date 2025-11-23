export interface Speech {
  speaker: string;
  university: string;
  year: number | string;
  role: string; // e.g., "Actor", "Tech CEO"
  topic: string;
  quote: string;
  summary: string;
  youtubeQuery: string;
  videoId?: string; // YouTube Video ID (e.g. "UF8uR6Z6KLc")
  popularityLabel: string; // e.g. "Viral Hit", "Classic", "Hidden Gem"
  viewCountEstimate: string; // e.g. "25M+ views"
  recommendationScore: number; // 0-100
}

export interface SpeechResponse {
  speeches: Speech[];
}