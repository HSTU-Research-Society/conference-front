'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { 
  CheckSquare, 
  Square, 
  ShieldCheck, 
  ExternalLink, 
  Sparkles, 
  RotateCcw,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { PREFLIGHT_CHECKLIST_ITEMS, CMT_CONFIG } from '@/lib/conference-data';

export function PreflightChecklist() {
  const [checkedIds, setCheckedIds] = React.useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalItems = PREFLIGHT_CHECKLIST_ITEMS.length;
  const completedCount = PREFLIGHT_CHECKLIST_ITEMS.filter((item) => checkedIds[item.id]).length;
  const isComplete = completedCount === totalItems;
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  const resetAll = () => setCheckedIds({});
  const selectAll = () => {
    const all: Record<string, boolean> = {};
    PREFLIGHT_CHECKLIST_ITEMS.forEach((item) => (all[item.id] = true));
    setCheckedIds(all);
  };

  return (
    <div className="w-full bg-slate-900/80 dark:bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            Author Quality Assurance
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            CMT Pre-Submission Preflight Checklist
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Verify these mandatory Microsoft CMT & double-blind compliance items before uploading your final PDF.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={resetAll}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
          <button
            onClick={selectAll}
            className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-medium transition-colors"
          >
            Check All
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="py-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-300">
            Compliance Score: {completedCount} of {totalItems} verified ({progressPercent}%)
          </span>
          <span className={isComplete ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
            {isComplete ? 'All Clear for CMT Upload' : 'Verification In Progress'}
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <motion.div
            className={`h-full rounded-full transition-all duration-300 ${
              isComplete
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                : 'bg-gradient-to-r from-blue-500 to-indigo-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Interactive Item List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {PREFLIGHT_CHECKLIST_ITEMS.map((item) => {
          const isChecked = Boolean(checkedIds[item.id]);
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-3.5 rounded-2xl border cursor-pointer select-none transition-all flex items-start gap-3 ${
                isChecked
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                  : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isChecked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
              </div>
              <span className={`text-xs leading-relaxed ${isChecked ? 'text-slate-200 font-medium' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Action Banner */}
      <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs text-slate-300">
          {isComplete ? (
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Congratulations! Your manuscript is completely compliant with Microsoft CMT rules.</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-amber-300">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Please review and check off all items before uploading to avoid desk rejection.</span>
            </div>
          )}
        </div>

        <a
          href={CMT_CONFIG.portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
            isComplete
              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30'
              : 'bg-slate-800 hover:bg-slate-700 text-white'
          }`}
        >
          <span>Launch Microsoft CMT Portal</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
