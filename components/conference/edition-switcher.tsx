'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Award, BookOpen, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { ANNUAL_EDITIONS, ConferenceEdition } from '@/lib/conference-data';

interface EditionSwitcherProps {
  activeEdition: ConferenceEdition;
  onSelectEdition: (edition: ConferenceEdition) => void;
}

export function EditionSwitcher({ activeEdition, onSelectEdition }: EditionSwitcherProps) {
  return (
    <div className="w-full bg-slate-900/60 dark:bg-slate-950/80 border border-slate-700/60 rounded-2xl p-4 sm:p-6 backdrop-blur-md shadow-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Endless Annual Conference Series
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            HSTU International Conference Series (HSTU-ICSRIT)
          </h3>
          <p className="text-sm text-slate-300">
            Hosted annually by HSTU Research Society with peer review managed via Microsoft CMT
          </p>
        </div>

        {/* Edition Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto p-1 bg-slate-950/90 rounded-xl border border-slate-800">
          {ANNUAL_EDITIONS.map((ed) => {
            const isSelected = activeEdition.year === ed.year;
            return (
              <button
                key={ed.year}
                onClick={() => onSelectEdition(ed)}
                className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'text-white bg-blue-600 shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>{ed.year}</span>
                {ed.status === 'current' ? (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ) : (
                  <span className="text-[10px] uppercase font-mono tracking-wider opacity-70">
                    Archived
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Edition Brief Banner */}
      <motion.div
        key={activeEdition.year}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-4 pt-2 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-sm"
      >
        <div className="space-y-1 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
              {activeEdition.acronym}
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              {activeEdition.dates}
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              {activeEdition.venue}
            </span>
          </div>
          <p className="text-slate-200 font-medium">
            &ldquo;{activeEdition.theme}&rdquo;
          </p>
          <p className="text-xs text-slate-400">
            {activeEdition.highlightSummary}
          </p>
        </div>

        {activeEdition.status === 'archived' && (
          <div className="flex items-center gap-3 w-full lg:w-auto p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-xs text-slate-300 space-y-0.5">
              <div className="font-semibold text-white flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                Published Proceedings
              </div>
              <div>{activeEdition.acceptedPapers} papers published ({activeEdition.acceptanceRate} acceptance)</div>
              {activeEdition.proceedingsDoi && (
                <div className="font-mono text-[11px] text-blue-400">DOI: {activeEdition.proceedingsDoi}</div>
              )}
            </div>
          </div>
        )}

        {activeEdition.status === 'current' && (
          <div className="flex items-center gap-2">
            <a
              href="#submission"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Active Submissions Open
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}
