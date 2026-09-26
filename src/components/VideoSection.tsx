import React, { useState } from 'react';
import { Play, X, Sparkles, Volume2, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface VideoSectionProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ isOpen, onOpen, onClose }) => {
  const { t, settings, videos } = useStore();
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string>('v-main');

  const activeVideo = videos.find((v) => v.id === selectedVideoId) || videos[0] || {
    url: settings.videoUrl,
    title: 'SEYOUL Collagen Jelly Mask',
    type: 'youtube'
  };

  // Normalize video URL to embeddable format
  const getEmbedUrl = (url: string) => {
    if (!url) return 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('vimeo.com/')) {
      const id = url.split('vimeo.com/')[1];
      return `https://player.vimeo.com/video/${id}?autoplay=1`;
    }
    return url;
  };

  const isMp4 = activeVideo.url.endsWith('.mp4');

  return (
    <section id="video" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Section Header */}
        <div className="mb-8 space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-sky-400">
            {t.video.tag}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-white">
            {t.video.title}
          </h2>
        </div>

        {/* 16:9 Video Canvas Frame */}
        <div className="relative mx-auto w-full aspect-16/9 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-950 group">
          {!isPlayingInline ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
              {/* High-end decorative poster simulation */}
              {activeVideo.posterUrl ? (
                <img
                  src={activeVideo.posterUrl}
                  alt={activeVideo.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-sky-950 opacity-90"></div>
              )}
              <div className="absolute inset-0 bg-slate-950/60"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0,transparent_70%)]"></div>

              {/* Water Caustics grid simulation */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>

              {/* Foreground Visual Content on Poster */}
              <div className="relative z-10 space-y-4 max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-sky-200">
                  <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                  <span>K-Beauty Ritual in High Definition</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-light text-white tracking-wide">
                  {activeVideo.title || 'SEYOUL Collagen Jelly Mask Experience'}
                </h3>

                {/* Big Center Play Button */}
                <div className="pt-2">
                  <button
                    onClick={onOpen}
                    className="relative group/btn inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/95 hover:bg-white text-slate-950 shadow-2xl shadow-sky-500/20 hover:scale-105 transition-all duration-300 cursor-pointer"
                    aria-label={t.video.playButton}
                  >
                    <span className="absolute inset-0 rounded-full bg-white/40 animate-ping duration-2000 pointer-events-none"></span>
                    <Play className="w-8 h-8 fill-current ml-1 text-slate-900" />
                  </button>
                </div>

                <p className="text-xs text-slate-400 font-medium tracking-wide">
                  {activeVideo.duration ? `${activeVideo.duration} · ` : ''}{t.video.duration} · Full 4K Ultra HD
                </p>
              </div>

              {/* Corner badge */}
              <div className="absolute bottom-4 left-6 hidden sm:flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Certifikovaný korejský rituál</span>
              </div>
            </div>
          ) : isMp4 ? (
            <video
              src={activeVideo.url}
              controls
              autoPlay
              className="w-full h-full object-cover"
            />
          ) : (
            <iframe
              src={getEmbedUrl(activeVideo.url)}
              title="SEYOUL Product Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>

        {/* Video selector clips list if multiple videos configured */}
        {videos.length > 1 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {videos.map((vid) => (
              <button
                key={vid.id}
                onClick={() => {
                  setSelectedVideoId(vid.id);
                  onOpen();
                }}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedVideoId === vid.id
                    ? 'bg-sky-500/20 border border-sky-400 text-sky-300 shadow-sm'
                    : 'bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current text-sky-400" />
                <span className="truncate max-w-[200px]">{vid.title}</span>
                {vid.duration && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900/60 text-slate-400">
                    {vid.duration}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Editorial Quote Under Video */}
        <div className="mt-8 max-w-2xl mx-auto">
          <blockquote className="text-sm sm:text-base text-slate-300 font-serif italic leading-relaxed">
            “{t.video.quote}”
          </blockquote>
        </div>
      </div>

      {/* Video Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
              <div className="flex items-center gap-2 text-sm font-medium text-white truncate mr-4">
                <Volume2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="truncate">{activeVideo.title}</span>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label={t.video.close}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-16/9 w-full bg-black">
              {isMp4 ? (
                <video
                  src={activeVideo.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={getEmbedUrl(activeVideo.url)}
                  title="SEYOUL Video Presentation"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
