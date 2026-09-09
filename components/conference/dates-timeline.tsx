'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, CheckCircle, AlertCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { IMPORTANT_DATES, CMT_CONFIG } from '@/lib/conference-data';

export function DatesTimeline() {
  return (
    <section id="dates" className="scroll-mt-24 w-full py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            Deadlines & Deadlines Timeline
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Important Conference Dates
          </h2>
          <p className="text-slate-300 text-sm">
            All deadlines are strictly 23:59 GMT+6 (Bangladesh Standard Time). Submissions close automatically on Microsoft CMT.
          </p>
        </div>

        <a
          href={CMT_CONFIG.portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-semibold transition-colors self-start sm:self-auto"
        >
          <span>CMT Portal Countdown</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {IMPORTANT_DATES.map((item, index) => {
          const isActive = item.status === 'active';
          const isPassed = item.status === 'passed';

          return (
            <div
              key={item.id}
              className={`relative rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-gradient-to-b from-blue-900/40 to-slate-900 border-blue-500 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500'
                  : isPassed
                  ? 'bg-slate-950/40 border-slate-800/80 opacity-75'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {isActive && (
                <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                  Current Milestone
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 font-bold">0{index + 1}</span>
                  {isPassed ? (
                    <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Completed
                    </span>
                  ) : isActive ? (
                    <span className="text-blue-300 font-bold flex items-center gap-1 text-[11px] animate-pulse">
                      <Clock className="w-3.5 h-3.5" /> Now Open
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[11px]">Upcoming</span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs font-semibold text-blue-400 font-mono">
                  {item.dateStr}
                </p>

                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>

              {item.isSubmissionMilestone && isActive && (
                <div className="mt-4 pt-3 border-t border-blue-800/40">
                  <a
                    href={CMT_CONFIG.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-blue-200 transition-colors"
                  >
                    <span>Upload to CMT</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
