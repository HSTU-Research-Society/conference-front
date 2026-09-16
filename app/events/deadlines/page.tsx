'use client';

import { PageHeader } from '@/components/page-header';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  CalendarPlus, 
  AlertCircle,
  Sparkles,
  FileText,
  Send,
  Flag,
  Award
} from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  date: string;
  time?: string;
  isoDate: string; // for calendar export (YYYYMMDD)
  description: string;
  status: 'completed' | 'upcoming' | 'deadline' | 'highlight';
  icon: typeof Calendar;
}

const MILESTONES: Milestone[] = [
  {
    id: 'announcement',
    title: 'Event Announcement Date',
    date: 'October 15, 2026',
    time: '10:00 AM UTC',
    isoDate: '20261015T100000Z',
    description: 'Official launch of ICTSET 2027, website unveiling, tracks disclosure, and initial call for committee members.',
    status: 'completed',
    icon: Sparkles,
  },
  {
    id: 'abstract-start',
    title: 'Abstract Submission Commencement',
    date: 'November 01, 2026',
    time: '00:00 UTC',
    isoDate: '20261101T000000Z',
    description: 'Portal opens for initial abstract proposals, extended summaries, and thematic track submissions.',
    status: 'upcoming',
    icon: Send,
  },
  {
    id: 'abstract-deadline',
    title: 'Abstract Submission Deadline',
    date: 'December 15, 2026',
    time: '23:59 UTC',
    isoDate: '20261215T235900Z',
    description: 'Strict cutoff for all initial abstract submissions through the online conference portal.',
    status: 'deadline',
    icon: AlertCircle,
  },
  {
    id: 'abstract-acceptance',
    title: 'Abstract Acceptance Notification',
    date: 'January 10, 2027',
    time: '18:00 UTC',
    isoDate: '20270110T180000Z',
    description: 'Authors will receive peer review feedback and decisions regarding their abstract proposals.',
    status: 'upcoming',
    icon: CheckCircle2,
  },
  {
    id: 'full-paper-start',
    title: 'Full Paper Submission Commencement',
    date: 'January 15, 2027',
    time: '00:00 UTC',
    isoDate: '20270115T000000Z',
    description: 'Submission system opens for full manuscripts adhering to official conference formatting templates.',
    status: 'upcoming',
    icon: FileText,
  },
  {
    id: 'full-paper-deadline',
    title: 'Full Paper Submission Deadline',
    date: 'March 01, 2027',
    time: '23:59 UTC',
    isoDate: '20270301T235900Z',
    description: 'Final deadline for full research papers, technical reports, and survey submissions.',
    status: 'deadline',
    icon: AlertCircle,
  },
  {
    id: 'registration-deadline',
    title: 'Registration Deadline',
    date: 'March 25, 2027',
    time: '23:59 UTC',
    isoDate: '20270325T235900Z',
    description: 'Early bird and author registration deadline to guarantee inclusion in the official conference proceedings.',
    status: 'deadline',
    icon: Award,
  },
  {
    id: 'camera-ready',
    title: 'Camera Ready Submission Deadline',
    date: 'April 10, 2027',
    time: '23:59 UTC',
    isoDate: '20270410T235900Z',
    description: 'Final submission of revised papers incorporating reviewer feedback with copyright authorization.',
    status: 'deadline',
    icon: FileText,
  },
  {
    id: 'conference-date',
    title: 'Conference Date',
    date: 'May 14 – 16, 2027',
    time: '09:00 AM UTC',
    isoDate: '20270514T090000Z',
    description: 'Inaugural edition of ICTSET 2027 featuring keynote addresses, technical oral sessions, and workshop tracks.',
    status: 'highlight',
    icon: Flag,
  },
];

export default function DeadlinesPage() {
  const handleAddToCalendar = (milestone: Milestone) => {
    const endStr = milestone.isoDate;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `ICTSET: ${milestone.title}`
    )}&dates=${milestone.isoDate}/${endStr}&details=${encodeURIComponent(
      milestone.description
    )}&location=${encodeURIComponent('ICTSET Conference Portal / HSTU')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-5xl pb-28">
      <PageHeader 
        title="Roadmap & Deadlines" 
        description="Chronological schedule of key dates, paper submission cutoffs, and conference proceedings." 
      />

      {/* Overview Notice Box */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass rounded-3xl p-6 sm:p-8 mb-12 border border-info-light/20 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-info-light/10 text-info-light flex items-center justify-center shrink-0 mt-0.5">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary-light dark:text-primary mb-1">
              ICTSET 2027 Important Dates
            </h3>
            <p className="text-sm text-primary-light/70 dark:text-primary/70 max-w-2xl">
              All deadlines are strict and correspond to 23:59 UTC unless specifically stated otherwise. 
              Please synchronize important dates to your personal calendar.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-stretch md:self-auto shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-info-light/10 text-info-light border border-info-light/20">
            <Clock className="w-3.5 h-3.5" /> UTC Timezone
          </span>
        </div>
      </motion.div>

      {/* Dotted Connecting Timeline */}
      <div className="relative pl-6 sm:pl-10 md:pl-12">
        {/* Continuous Dotted Connecting Line */}
        <div 
          className="absolute top-4 bottom-8 left-[11px] sm:left-[19px] md:left-[23px] w-0 border-l-2 border-dotted border-info-light/50 dark:border-info-light/40" 
          aria-hidden="true"
        />

        <div className="space-y-8 sm:space-y-10">
          {MILESTONES.map((item, idx) => {
            const Icon = item.icon;
            
            // Badge color mapping
            const getStatusBadge = () => {
              switch (item.status) {
                case 'completed':
                  return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                  );
                case 'deadline':
                  return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      <AlertCircle className="w-3 h-3" /> Hard Deadline
                    </span>
                  );
                case 'highlight':
                  return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      <Flag className="w-3 h-3" /> Main Event
                    </span>
                  );
                default:
                  return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-info-light/10 text-info-light border border-info-light/20">
                      <Clock className="w-3 h-3" /> Milestone
                    </span>
                  );
              }
            };

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="relative group"
              >
                {/* Node on the dotted line */}
                <div 
                  className={`absolute -left-[30px] sm:-left-[38px] md:-left-[42px] top-6 w-5 h-5 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 flex items-center justify-center bg-white dark:bg-[#0c1017] z-10 ${
                    item.status === 'highlight'
                      ? 'border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                      : item.status === 'deadline'
                      ? 'border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]'
                      : item.status === 'completed'
                      ? 'border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                      : 'border-info-light shadow-[0_0_8px_rgba(59,130,246,0.3)]'
                  }`}
                >
                  <div 
                    className={`w-2 h-2 rounded-full ${
                      item.status === 'highlight' 
                        ? 'bg-amber-500 animate-pulse' 
                        : item.status === 'deadline'
                        ? 'bg-rose-500'
                        : item.status === 'completed'
                        ? 'bg-emerald-500'
                        : 'bg-info-light'
                    }`} 
                  />
                </div>

                {/* Milestone Card */}
                <div 
                  className={`glass-card rounded-[24px] p-6 sm:p-7 border transition-all duration-300 shadow-md hover:shadow-xl ${
                    item.status === 'highlight' 
                      ? 'border-amber-500/30 dark:border-amber-400/20 bg-gradient-to-br from-amber-500/[0.04] to-transparent' 
                      : item.status === 'deadline'
                      ? 'border-rose-500/20 dark:border-rose-500/10 hover:border-rose-500/40'
                      : 'border-white/20 dark:border-white/10 hover:border-info-light/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    {/* Timestamp Tag */}
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/5 dark:bg-white/5 font-mono text-xs sm:text-sm font-bold text-info-light border border-black/5 dark:border-white/10">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                        {item.time && (
                          <>
                            <span className="opacity-40">•</span>
                            <span className="font-normal text-xs text-primary-light/70 dark:text-primary/70">{item.time}</span>
                          </>
                        )}
                      </div>
                      {getStatusBadge()}
                    </div>

                    {/* Add to Calendar Shortcut */}
                    <button
                      onClick={() => handleAddToCalendar(item)}
                      className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-primary-light/60 hover:text-info-light dark:text-primary/60 dark:hover:text-info-light transition-colors py-1 px-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                      title="Add to Google Calendar"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                      <span>Sync Date</span>
                    </button>
                  </div>

                  {/* Title & Description */}
                  <div className="flex items-start gap-3.5">
                    <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                      item.status === 'highlight'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : item.status === 'deadline'
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        : item.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-info-light/10 text-info-light'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-primary-light dark:text-primary mb-1.5 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-primary-light/70 dark:text-primary/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
