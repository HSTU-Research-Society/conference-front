'use client';

import * as React from 'react';
import { Award, Users, ShieldCheck, Mail, Building } from 'lucide-react';
import { COMMITTEE_MEMBERS, CMT_CONFIG } from '@/lib/conference-data';

export function CommitteeSection() {
  return (
    <section id="committee" className="scroll-mt-24 w-full py-8 space-y-8">
      <div className="space-y-2 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Users className="w-3.5 h-3.5" />
          Conference Leadership
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Organizing Committee & Editorial Board
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Distinguished patrons, general chairs, and Microsoft CMT workflow administrators guiding the peer-review process.
        </p>
      </div>

      {/* Chief Patron Highlight */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs uppercase font-bold text-blue-400 tracking-wider">
            Chief Patron
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {COMMITTEE_MEMBERS.chiefPatron.name}
          </h3>
          <p className="text-sm font-medium text-slate-300">
            {COMMITTEE_MEMBERS.chiefPatron.title}
          </p>
          <p className="text-xs text-slate-400">
            {COMMITTEE_MEMBERS.chiefPatron.affiliation}
          </p>
        </div>
        <div className="px-5 py-3 rounded-2xl bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs text-center sm:text-right shrink-0">
          <span className="font-semibold block text-white">Hajee Mohammad Danesh</span>
          <span>Science & Technology University</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* General Chairs */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-indigo-400 tracking-wider">
            <Award className="w-4 h-4" />
            General Chairs
          </div>
          <div className="space-y-3">
            {COMMITTEE_MEMBERS.generalChairs.map((chair, i) => (
              <div key={i} className="pb-3 border-b border-slate-800/80 last:border-0 last:pb-0 space-y-0.5">
                <h4 className="text-sm font-bold text-white">{chair.name}</h4>
                <p className="text-xs text-indigo-300">{chair.title}</p>
                <p className="text-[11px] text-slate-400">{chair.affiliation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TPC Chairs */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-400 tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Technical Program Committee (TPC)
          </div>
          <div className="space-y-3">
            {COMMITTEE_MEMBERS.tpcChairs.map((chair, i) => (
              <div key={i} className="pb-3 border-b border-slate-800/80 last:border-0 last:pb-0 space-y-0.5">
                <h4 className="text-sm font-bold text-white">{chair.name}</h4>
                <p className="text-xs text-emerald-300">{chair.title}</p>
                <p className="text-[11px] text-slate-400">{chair.affiliation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Microsoft CMT Managers */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-blue-800/60 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-blue-400 tracking-wider">
            <Users className="w-4 h-4" />
            Microsoft CMT Managers & Audit
          </div>
          <div className="space-y-3">
            {COMMITTEE_MEMBERS.cmtManagers.map((mgr, i) => (
              <div key={i} className="pb-3 border-b border-slate-800/80 last:border-0 last:pb-0 space-y-0.5">
                <h4 className="text-sm font-bold text-white">{mgr.name}</h4>
                <p className="text-xs text-blue-300">{mgr.title}</p>
                <p className="text-[11px] text-slate-400">{mgr.affiliation}</p>
                <div className="pt-1 flex items-center gap-1 text-[11px] text-blue-400">
                  <Mail className="w-3 h-3" />
                  <a href={`mailto:${mgr.email}`} className="hover:underline">{mgr.email}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
