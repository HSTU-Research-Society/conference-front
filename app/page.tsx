'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  FileText, 
  Sparkles,
  BookOpen,
  Award,
  Users
} from 'lucide-react';
import { CURRENT_EDITION, ANNUAL_EDITIONS, ConferenceEdition, CMT_CONFIG } from '@/lib/conference-data';
import { EditionSwitcher } from '@/components/conference/edition-switcher';
import { CmtPortalCard } from '@/components/conference/cmt-portal-card';
import { PreflightChecklist } from '@/components/conference/preflight-checklist';
import { DatesTimeline } from '@/components/conference/dates-timeline';
import { TracksSection } from '@/components/conference/tracks-section';
import { SpeakersSection } from '@/components/conference/speakers-section';
import { ScheduleSection } from '@/components/conference/schedule-section';
import { RegistrationSection } from '@/components/conference/registration-section';
import { CommitteeSection } from '@/components/conference/committee-section';
import { ArchiveSection } from '@/components/conference/archive-section';
import { VenueSection } from '@/components/conference/venue-section';

function SubmissionCountdown() {
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    // Target deadline: July 25, 2026, 23:59:59 GMT+6
    const targetDate = new Date('2026-07-25T23:59:59+06:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, targetDate - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-2xl bg-slate-950/70 border border-slate-800 shadow-inner">
      <div className="flex flex-col items-center justify-center min-w-[52px] sm:min-w-[64px] px-2 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
        <span className="font-mono text-base sm:text-xl font-black text-white">{timeLeft.days}</span>
        <span className="text-[9px] uppercase font-bold text-slate-400">Days</span>
      </div>
      <span className="text-slate-600 font-bold">:</span>
      <div className="flex flex-col items-center justify-center min-w-[52px] sm:min-w-[64px] px-2 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
        <span className="font-mono text-base sm:text-xl font-black text-white">{timeLeft.hours}</span>
        <span className="text-[9px] uppercase font-bold text-slate-400">Hours</span>
      </div>
      <span className="text-slate-600 font-bold">:</span>
      <div className="flex flex-col items-center justify-center min-w-[52px] sm:min-w-[64px] px-2 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
        <span className="font-mono text-base sm:text-xl font-black text-white">{timeLeft.minutes}</span>
        <span className="text-[9px] uppercase font-bold text-slate-400">Mins</span>
      </div>
      <span className="text-slate-600 font-bold">:</span>
      <div className="flex flex-col items-center justify-center min-w-[52px] sm:min-w-[64px] px-2 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
        <span className="font-mono text-base sm:text-xl font-black text-emerald-400">{timeLeft.seconds}</span>
        <span className="text-[9px] uppercase font-bold text-emerald-400/80">Secs</span>
      </div>
    </div>
  );
}

export default function ConferenceHomePage() {
  const [activeEdition, setActiveEdition] = React.useState<ConferenceEdition>(CURRENT_EDITION);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 selection:bg-blue-600 selection:text-white pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl space-y-12 sm:space-y-16">
        
        {/* HERO SECTION */}
        <section className="relative pt-6 sm:pt-12 pb-8 sm:pb-12 overflow-hidden">
          {/* Subtle glowing ambient orbs */}
          <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-start space-y-6 max-w-4xl">
            {/* Badges strip */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                {activeEdition.acronym}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                Microsoft CMT Managed
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Indexed Proceedings (IEEE / Scopus)
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              International Conference on Scientific Research, AI & Sustainable Innovation
            </h1>

            {/* Subtitle / Theme */}
            <div className="space-y-2 text-slate-300">
              <p className="text-base sm:text-xl font-medium text-slate-200">
                Theme: <span className="text-blue-300 font-semibold">&ldquo;{activeEdition.theme}&rdquo;</span>
              </p>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-3xl">
                The premier annual academic conference hosted by HSTU Research Society. Gathering international scientists, engineers, researchers, and students. All manuscript peer review is managed strictly via Microsoft CMT.
              </p>
            </div>

            {/* Event Key Details Strip */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-semibold">{activeEdition.dates}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{activeEdition.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>CMT Code: <strong className="font-mono text-emerald-300">{CMT_CONFIG.conferenceCode}</strong></span>
              </div>
            </div>

            {/* Countdown to Submission */}
            <div className="w-full pt-4 space-y-2">
              <div className="flex items-center justify-between max-w-md text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  Submission Deadline Countdown (CMT):
                </span>
                <span className="text-blue-400 font-mono">July 25, 2026</span>
              </div>
              <SubmissionCountdown />
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href={CMT_CONFIG.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
              >
                <span>Submit Paper via Microsoft CMT</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="#submission"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm transition-colors"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Author Guidelines & CMT Guide</span>
              </a>

              <a
                href="#tracks"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800 font-semibold text-sm transition-colors"
              >
                <span>Call for Papers & Tracks</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ANNUAL SERIES SWITCHER */}
        <EditionSwitcher
          activeEdition={activeEdition}
          onSelectEdition={(ed) => setActiveEdition(ed)}
        />

        {/* MICROSOFT CMT PORTAL HUB */}
        <CmtPortalCard />

        {/* PRE-FLIGHT COMPLIANCE CHECKLIST */}
        <PreflightChecklist />

        {/* IMPORTANT DATES TIMELINE */}
        <DatesTimeline />

        {/* CALL FOR PAPERS & RESEARCH TRACKS */}
        <TracksSection />

        {/* KEYNOTE SPEAKERS */}
        <SpeakersSection />

        {/* 3-DAY TECHNICAL PROGRAM SCHEDULE */}
        <ScheduleSection />

        {/* REGISTRATION TIERS */}
        <RegistrationSection />

        {/* ORGANIZING COMMITTEE & CMT REVIEW BOARD */}
        <CommitteeSection />

        {/* ANNUAL SERIES ARCHIVES & PAST PROCEEDINGS */}
        <ArchiveSection
          onSelectEdition={(ed) => {
            setActiveEdition(ed);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* VENUE, TRAVEL & HOSPITALITY */}
        <VenueSection />

        {/* BOTTOM QUICK FOOTER BANNER */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900/30 via-slate-900 to-indigo-900/30 border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">
              Ready to submit your manuscript for peer review?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Access the official Microsoft CMT portal for {activeEdition.acronym} and submit your IEEE-format PDF today.
            </p>
          </div>
          <a
            href={CMT_CONFIG.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all shrink-0"
          >
            <span>Open Microsoft CMT Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
