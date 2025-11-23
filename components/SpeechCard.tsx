import React from 'react';
import { Speech } from '../types';

interface SpeechCardProps {
  speech: Speech;
  index: number;
  onPlay: (videoId: string) => void;
}

const SpeechCard: React.FC<SpeechCardProps> = ({ speech, index, onPlay }) => {
  // Generate a predictable gradient based on index to make it look nice
  const gradients = [
    'from-blue-900 to-slate-900',
    'from-emerald-900 to-slate-900',
    'from-purple-900 to-slate-900',
    'from-rose-900 to-slate-900',
  ];
  const bgGradient = gradients[index % gradients.length];

  const handleAction = () => {
    if (speech.videoId) {
      onPlay(speech.videoId);
    } else {
      // Fallback: Open YouTube search in a new tab if no specific ID
      const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(speech.youtubeQuery)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-white border border-gray-100">
      
      {/* Thumbnail / Header Area */}
      <div 
        onClick={handleAction}
        className={`relative h-44 w-full bg-gradient-to-br ${bgGradient} p-6 flex flex-col justify-between cursor-pointer`}
      >
        <div className="absolute top-4 right-4 flex gap-2">
            <div className="flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md border border-white/10">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-orange-400">
                    <path fillRule="evenodd" d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.031.04.07.077.115.112a1 1 0 00.978.204.606.606 0 01.593.125l.003.004a.6.6 0 00.738.106c.036-.02.073-.038.111-.052a1 1 0 00.672-1.077c-.012-.083-.016-.167-.013-.251a.606.606 0 01.32-.486L9 4.875a.6.6 0 00.178-.716A.6.6 0 019.5 3.5h.004a.6.6 0 00.596-.53 6.96 6.96 0 011.025-1.556c.207-.238.604-.158.683.153.11.431.155.882.128 1.336a.606.606 0 01-.17.411c-.085.085-.152.188-.198.3a1 1 0 00.672 1.325z" clipRule="evenodd" />
                 </svg>
                 {speech.viewCountEstimate}
            </div>
            <span className="inline-block rounded-full bg-white/20 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                {speech.university}
            </span>
        </div>
        
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-center w-14 h-14 bg-white/90 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="z-10 mt-auto pointer-events-none">
            <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-bold text-white leading-tight font-serif tracking-wide text-shadow-sm truncate pr-2">
                    {speech.speaker}
                </h3>
            </div>
            <p className="text-blue-100 text-xs font-medium uppercase tracking-wider">{speech.role}</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Stats Row */}
        <div className="mb-4 flex items-center gap-3 text-xs border-b border-gray-100 pb-3">
            <div className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-md">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                 </svg>
                 {speech.recommendationScore}% Match
            </div>
            <div className="flex items-center gap-1 text-slate-600 font-medium bg-slate-100 px-2 py-1 rounded-md">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                   <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                 </svg>
                 {speech.year}
            </div>
            <div className="text-gray-400 font-medium ml-auto text-[10px] uppercase tracking-wide">
                {speech.popularityLabel}
            </div>
        </div>

        <h4 className="mb-2 text-lg font-bold text-gray-900 font-sans leading-snug group-hover:text-blue-800 transition-colors">
            {speech.topic}
        </h4>

        <div className="relative mb-4 pl-4 border-l-2 border-ivy-gold">
            <p className="text-sm italic text-gray-600 font-serif">
                "{speech.quote}"
            </p>
        </div>

        <p className="mb-4 text-sm text-gray-600 line-clamp-2">
          {speech.summary}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <button 
            onClick={handleAction}
            className="flex w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            {speech.videoId ? "Play Video" : "Search Video"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeechCard;