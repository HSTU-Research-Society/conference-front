'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Mic, Globe, Building2, Quote, BookOpen } from 'lucide-react';
import { KEYNOTE_SPEAKERS, KeynoteSpeaker } from '@/lib/conference-data';

export function SpeakersSection() {
  const [activeSpeaker, setActiveSpeaker] = React.useState<KeynoteSpeaker | null>(null);

  return (
    <section id="speakers" className="scroll-mt-24 w-full py-8 space-y-8">
      <div className="space-y-2 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
          <Mic className="w-3.5 h-3.5" />
          Distinguished Keynote Addresses
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Plenary & Keynote Speakers
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Hear visionary lectures from globally acclaimed pioneers in artificial intelligence, clean energy, precision bio-computing, and university research leadership.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KEYNOTE_SPEAKERS.map((speaker) => (
          <div
            key={speaker.id}
            className="bg-slate-900/60 dark:bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-purple-500/5"
          >
            <div>
              {/* Photo */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-800">
                <Image
                  src={speaker.photoUrl}
                  alt={speaker.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur border border-slate-700 text-[11px] text-slate-300 flex items-center gap-1 font-medium">
                  <Globe className="w-3 h-3 text-blue-400" />
                  {speaker.country}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {speaker.name}
                  </h3>
                  <p className="text-xs text-purple-300 font-medium line-clamp-1">
                    {speaker.title}
                  </p>
                </div>
              </div>

              {/* Speaker Speech Details */}
              <div className="p-5 space-y-3">
                <div className="text-xs text-slate-400 flex items-start gap-1.5 leading-tight">
                  <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>{speaker.affiliation}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                    <Quote className="w-3 h-3 text-purple-400" /> Keynote Title:
                  </span>
                  <p className="text-xs font-semibold text-white leading-snug line-clamp-2">
                    &ldquo;{speaker.speechTitle}&rdquo;
                  </p>
                </div>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {speaker.bio}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => setActiveSpeaker(speaker)}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Keynote Abstract</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Keynote Abstract Modal */}
      {activeSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-mono text-purple-400 tracking-wider">
                  Keynote Speech Abstract
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {activeSpeaker.speechTitle}
                </h3>
                <p className="text-sm text-slate-300 mt-0.5">
                  by <span className="font-semibold text-white">{activeSpeaker.name}</span> ({activeSpeaker.affiliation})
                </p>
              </div>
              <button
                onClick={() => setActiveSpeaker(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-60 overflow-y-auto">
              {activeSpeaker.speechAbstract}
            </div>

            <div className="text-xs text-slate-400 space-y-1">
              <span className="font-bold text-slate-300">About the Speaker:</span>
              <p className="leading-relaxed">{activeSpeaker.bio}</p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveSpeaker(null)}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
              >
                Close Abstract
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
