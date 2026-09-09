'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Clock, MapPin, Calendar, Sparkles } from 'lucide-react';
import { PROGRAM_SCHEDULE } from '@/lib/conference-data';

export function ScheduleSection() {
  const [selectedDayIndex, setSelectedDayIndex] = React.useState(0);
  const activeDay = PROGRAM_SCHEDULE[selectedDayIndex];

  return (
    <section id="schedule" className="scroll-mt-24 w-full py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            3-Day Technical Program
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Conference Schedule & Agenda
          </h2>
          <p className="text-slate-300 text-sm">
            All parallel tracks, keynote addresses, paper presentations, and social events at HSTU Central Auditorium.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {PROGRAM_SCHEDULE.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDayIndex(idx)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedDayIndex === idx
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Day 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Items for Active Day */}
      <div className="bg-slate-900/60 dark:bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            {activeDay.day}
          </h3>
          <span className="text-xs font-mono text-slate-400">
            {activeDay.sessions.length} Scheduled Sessions
          </span>
        </div>

        <div className="space-y-3">
          {activeDay.sessions.map((session, sIdx) => (
            <div
              key={sIdx}
              className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1.5 rounded-xl shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{session.time}</span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {session.title}
                  </h4>
                  {session.highlight && (
                    <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                      <Sparkles className="w-3 h-3" />
                      <span>{session.highlight}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 self-start sm:self-center shrink-0 bg-slate-800/60 px-2.5 py-1 rounded-lg">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{session.venue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
