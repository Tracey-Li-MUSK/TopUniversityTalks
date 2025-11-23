import React, { useState, useCallback } from 'react';
import { Speech } from './types';
import { fetchSpeeches } from './services/geminiService';
import { APP_TITLE, APP_SUBTITLE, SAMPLE_QUERIES } from './constants';
import SearchBar from './components/SearchBar';
import SpeechCard from './components/SpeechCard';
import VideoModal from './components/VideoModal';

const App: React.FC = () => {
  const [speeches, setSpeeches] = useState<Speech[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedKeyword, setSearchedKeyword] = useState<string>("");
  const [hasSearched, setHasSearched] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const handleSearch = useCallback(async (keyword: string) => {
    setLoading(true);
    setError(null);
    setSearchedKeyword(keyword);
    setHasSearched(true);
    setSpeeches([]); // Clear previous results
    setActiveVideoId(null);

    try {
      const results = await fetchSpeeches(keyword);
      setSpeeches(results);
    } catch (err) {
      console.error(err);
      setError("We couldn't reach the library of speeches. Please verify your API Key and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePlayVideo = useCallback((videoId: string) => {
    setActiveVideoId(videoId);
  }, []);

  const handleCloseVideo = useCallback(() => {
    setActiveVideoId(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      {/* Hero Section */}
      <div className="relative bg-slate-900 pb-20 pt-24 lg:pt-32 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 z-0">
             <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[100px]" />
             <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[80px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white md:text-7xl font-serif">
            {APP_TITLE}
          </h1>
          <p className="mb-10 text-xl text-blue-200 md:text-2xl font-light">
            {APP_SUBTITLE}
          </p>

          <SearchBar onSearch={handleSearch} isLoading={loading} />

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <span className="text-sm text-gray-400 py-1">Try asking about:</span>
            {SAMPLE_QUERIES.map((q) => (
              <button
                key={q}
                onClick={() => handleSearch(q)}
                disabled={loading}
                className="rounded-full border border-gray-600 bg-gray-800/50 px-3 py-1 text-sm text-gray-300 transition-colors hover:border-gray-400 hover:text-white disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-1 bg-slate-50 relative z-20 -mt-10 rounded-t-3xl shadow-inner min-h-[500px]">
        <div className="container mx-auto px-4 py-12">
          
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700 max-w-2xl mx-auto">
              <p className="font-semibold">Oh no!</p>
              <p>{error}</p>
            </div>
          )}

          {!hasSearched && !loading && !error && (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="text-xl font-serif text-gray-500">Enter a keyword to discover timeless wisdom.</p>
            </div>
          )}

          {hasSearched && !loading && speeches.length === 0 && !error && (
             <div className="text-center py-20">
                <p className="text-xl text-gray-600">No speeches found for "{searchedKeyword}". Try a broader term like 'Courage' or 'Success'.</p>
             </div>
          )}

          {speeches.length > 0 && (
            <>
              <div className="mb-8 flex items-baseline justify-between border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-slate-800">
                  Speeches on <span className="text-blue-700">"{searchedKeyword}"</span>
                </h2>
                <span className="text-sm text-gray-500">{speeches.length} results curated</span>
              </div>

              <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {speeches.map((speech, index) => (
                  <SpeechCard 
                    key={`${speech.speaker}-${index}`} 
                    speech={speech} 
                    index={index} 
                    onPlay={handlePlayVideo}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <footer className="bg-white py-8 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {APP_TITLE}. Powered by Gemini API.</p>
        </div>
      </footer>

      {/* Video Modal */}
      {activeVideoId && (
        <VideoModal 
          videoId={activeVideoId} 
          onClose={handleCloseVideo} 
        />
      )}
    </div>
  );
};

export default App;