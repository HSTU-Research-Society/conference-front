'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Wheat, 
  Zap, 
  Shield, 
  Activity, 
  Sparkles, 
  Search, 
  ExternalLink,
  Users,
  Tag
} from 'lucide-react';
import { RESEARCH_TRACKS, ConferenceTrack, CMT_CONFIG } from '@/lib/conference-data';

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-5 h-5 text-blue-400" />,
  Wheat: <Wheat className="w-5 h-5 text-emerald-400" />,
  Zap: <Zap className="w-5 h-5 text-amber-400" />,
  Shield: <Shield className="w-5 h-5 text-rose-400" />,
  Activity: <Activity className="w-5 h-5 text-cyan-400" />,
  Sparkles: <Sparkles className="w-5 h-5 text-purple-400" />,
};

export function TracksSection() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedTrack, setSelectedTrack] = React.useState<ConferenceTrack | null>(null);

  const filteredTracks = React.useMemo(() => {
    if (!searchQuery.trim()) return RESEARCH_TRACKS;
    const q = searchQuery.toLowerCase();
    return RESEARCH_TRACKS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.topics.some((topic) => topic.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <section id="tracks" className="scroll-mt-24 w-full py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            Call for Papers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Research Tracks & Topics of Interest
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Original research papers, industrial innovations, and state-of-the-art literature surveys are solicited across 6 primary academic tracks.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search topics (e.g., AI, Soil)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTracks.map((track) => (
          <div
            key={track.id}
            className="bg-slate-900/60 dark:bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-blue-500/5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {iconMap[track.icon] || <Cpu className="w-5 h-5 text-blue-400" />}
                </div>
                <span className="font-mono text-xs font-bold text-slate-400 px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700/50">
                  Track 0{track.number}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                  {track.name}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {track.description}
                </p>
              </div>

              {/* Topics Pills */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Key Topics:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {track.topics.slice(0, 4).map((topic, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/40"
                    >
                      {topic}
                    </span>
                  ))}
                  {track.topics.length > 4 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-blue-900/30 text-blue-300 border border-blue-700/40">
                      +{track.topics.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Track Footer & Submit shortcut */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="text-slate-400 flex items-center gap-1.5 truncate max-w-[170px]">
                <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="truncate text-[11px]">{track.chairs[0]}</span>
              </div>
              <a
                href={`${CMT_CONFIG.portalUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold group-hover:underline text-xs"
              >
                <span>Submit to Track {track.number}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
