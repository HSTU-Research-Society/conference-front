'use client';

import * as React from 'react';
import { BookOpen, ExternalLink, Award, FileCheck, Calendar, MapPin, Archive } from 'lucide-react';
import { ANNUAL_EDITIONS, ConferenceEdition } from '@/lib/conference-data';

interface ArchiveSectionProps {
  onSelectEdition: (edition: ConferenceEdition) => void;
}

export function ArchiveSection({ onSelectEdition }: ArchiveSectionProps) {
  const pastEditions = ANNUAL_EDITIONS.filter((e) => e.status === 'archived');

  return (
    <section id="archive" className="scroll-mt-24 w-full py-8 space-y-8">
      <div className="space-y-2 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <Archive className="w-3.5 h-3.5" />
          Endless Annual Series
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Conference Proceedings & Archive
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Access past digital proceedings, citation DOIs, acceptance analytics, and historical archives from earlier annual editions of HSTU-ICSRIT.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pastEditions.map((ed) => (
          <div
            key={ed.year}
            className="bg-slate-900/60 dark:bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl hover:shadow-amber-500/5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl font-black text-amber-400">
                  {ed.year}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] uppercase font-mono">
                  {ed.acronym}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {ed.editionName}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  &ldquo;{ed.theme}&rdquo;
                </p>
              </div>

              {/* Stats pill */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">Accepted</span>
                  <span className="font-bold text-white">{ed.acceptedPapers} Papers</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">Acceptance Rate</span>
                  <span className="font-bold text-emerald-400">{ed.acceptanceRate}</span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  <span>{ed.dates}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>{ed.venue}</span>
                </div>
                {ed.proceedingsPublisher && (
                  <div className="flex items-center gap-1.5 text-blue-400">
                    <BookOpen className="w-3 h-3" />
                    <span>{ed.proceedingsPublisher}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
              <button
                onClick={() => {
                  onSelectEdition(ed);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors"
              >
                Inspect Year
              </button>

              {ed.proceedingsDoi && (
                <span className="font-mono text-[11px] text-slate-400 truncate max-w-[140px]" title={ed.proceedingsDoi}>
                  DOI: {ed.proceedingsDoi}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
