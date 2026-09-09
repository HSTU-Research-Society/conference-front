'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { 
  ExternalLink, 
  FileText, 
  ShieldCheck, 
  AlertCircle, 
  Download, 
  CheckCircle, 
  HelpCircle,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';
import { CMT_CONFIG, CMT_SUBMISSION_STEPS, CMT_POLICIES } from '@/lib/conference-data';

export function CmtPortalCard() {
  const [activeTab, setActiveTab] = React.useState<'workflow' | 'policies' | 'templates'>('workflow');

  return (
    <div id="submission" className="scroll-mt-24 w-full bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-950/70 border border-blue-500/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Official Peer-Review Management System
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            Microsoft Conference Management Toolkit (CMT)
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            All manuscript submissions, double-blind peer reviews, author rebuttals, and camera-ready uploads are strictly managed through the secure Microsoft CMT platform for HSTU-ICSRIT 2026.
          </p>
        </div>

        {/* Primary CMT CTA Box */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-3 shrink-0">
          <a
            href={CMT_CONFIG.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-lg shadow-blue-600/30 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>Submit via Microsoft CMT</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <div className="px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
            <span className="text-xs text-slate-400">Conference Code: </span>
            <span className="font-mono text-sm font-bold text-emerald-400">{CMT_CONFIG.conferenceCode}</span>
          </div>
        </div>
      </div>

      {/* Quick Specs Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-800 text-xs">
        <div className="space-y-1">
          <span className="text-slate-400 block font-medium">Review Policy</span>
          <span className="text-white font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Strict Double-Blind
          </span>
        </div>
        <div className="space-y-1">
          <span className="text-slate-400 block font-medium">Page Limit</span>
          <span className="text-white font-semibold flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-emerald-400" /> 6 to 8 Pages (IEEE)
          </span>
        </div>
        <div className="space-y-1">
          <span className="text-slate-400 block font-medium">Plagiarism Standard</span>
          <span className="text-white font-semibold flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> &lt; 15% Similarity
          </span>
        </div>
        <div className="space-y-1">
          <span className="text-slate-400 block font-medium">Submission Format</span>
          <span className="text-white font-semibold flex items-center gap-1">
            <Download className="w-3.5 h-3.5 text-purple-400" /> PDF (Max 20MB)
          </span>
        </div>
      </div>

      {/* Nav Tabs within Card */}
      <div className="flex items-center gap-2 pt-6 pb-4 border-b border-slate-800/80 overflow-x-auto">
        <button
          onClick={() => setActiveTab('workflow')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'workflow'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          5-Step CMT Submission Flow
        </button>
        <button
          onClick={() => setActiveTab('policies')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'policies'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Microsoft CMT Policies & Compliance
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'templates'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Download className="w-4 h-4" />
          Paper Templates (LaTeX & Word)
        </button>
      </div>

      {/* Tab 1: Workflow */}
      {activeTab === 'workflow' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="pt-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {CMT_SUBMISSION_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-slate-950/60 border border-slate-800/90 rounded-2xl p-4 flex flex-col justify-between hover:border-blue-500/40 transition-colors group"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold text-sm flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    0{step.stepNumber}
                  </div>
                  <h4 className="font-bold text-white text-sm leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-800/60 text-[11px] text-amber-300/90 flex items-start gap-1.5">
                  <Sparkles className="w-3 h-3 shrink-0 mt-0.5 text-amber-400" />
                  <span>{step.tip}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <span>
                Need assistance with Microsoft CMT account registration or track allocation? Contact the Technical Program Committee:
              </span>
            </div>
            <a
              href={`mailto:${CMT_CONFIG.supportEmail}`}
              className="text-blue-300 font-semibold hover:underline shrink-0"
            >
              {CMT_CONFIG.supportEmail}
            </a>
          </div>
        </motion.div>
      )}

      {/* Tab 2: Policies */}
      {activeTab === 'policies' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {CMT_POLICIES.map((policy, idx) => (
            <div
              key={idx}
              className="bg-slate-950/60 border border-slate-800/90 rounded-2xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-base flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  {policy.title}
                </h4>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {policy.category}
                </span>
              </div>
              <p className="text-xs text-blue-200/80 font-medium">
                {policy.summary}
              </p>
              <ul className="space-y-1.5 pt-1">
                {policy.rules.map((rule, rIdx) => (
                  <li key={rIdx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      )}

      {/* Tab 3: Templates */}
      {activeTab === 'templates' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold font-mono">
                TeX
              </div>
              <div>
                <h4 className="font-bold text-white text-base">LaTeX Template Package</h4>
                <p className="text-xs text-slate-400">Official IEEEtran class & bibliography format</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Recommended for engineering, computing, and mathematical manuscripts. Ensure anonymized author comments in preamble before compiling to PDF.
            </p>
            <a
              href={CMT_CONFIG.formatTemplates.latex}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />
              Download LaTeX Template (.zip)
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold font-mono">
                DOC
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Microsoft Word Template</h4>
                <p className="text-xs text-slate-400">Standard A4 two-column Word template</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Use standard margins, fonts (Times New Roman), and embed all figures at minimum 300 DPI. Remove author and affiliation sections for initial double-blind review.
            </p>
            <a
              href={CMT_CONFIG.formatTemplates.word}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />
              Download MS Word Template (.doc)
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}
