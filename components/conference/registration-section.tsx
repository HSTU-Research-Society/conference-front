'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Check, CreditCard, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { REGISTRATION_TIERS, CMT_CONFIG } from '@/lib/conference-data';

export function RegistrationSection() {
  return (
    <section id="registration" className="scroll-mt-24 w-full py-8 space-y-8">
      <div className="space-y-2 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <CreditCard className="w-3.5 h-3.5" />
          Author & Attendee Passes
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Conference Registration Tiers
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Every accepted paper requires at least one author registration before October 02, 2026 for inclusion in IEEE/Springer proceedings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {REGISTRATION_TIERS.map((tier) => (
          <div
            key={tier.id}
            className={`bg-slate-900/60 dark:bg-slate-950/80 border rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
              tier.badge === 'Popular'
                ? 'border-emerald-500 shadow-xl shadow-emerald-500/10'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            {tier.badge && (
              <div
                className={`absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                  tier.badge === 'Popular'
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-300 border border-slate-700'
                }`}
              >
                {tier.badge}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  {tier.tierName}
                </h3>
                <p className="text-xs text-slate-400 mt-1 min-h-[32px]">
                  {tier.subtext}
                </p>
              </div>

              <div className="py-2 border-y border-slate-800/80">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {tier.price}
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">Per paper / attendee pass</span>
              </div>

              <div className="space-y-2.5 pt-2">
                <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block">
                  Includes:
                </span>
                <ul className="space-y-2">
                  {tier.includes.map((inc, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <a
                href={CMT_CONFIG.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  tier.badge === 'Popular'
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                <span>Register via Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Accepted payment methods: bKash, Nagad, Rocket, Bank Wire (for local delegates) and Stripe / PayPal / International Credit Cards (for global delegates).
          </span>
        </div>
        <span className="text-slate-300 font-medium shrink-0">Official HSTU Receipt Provided</span>
      </div>
    </section>
  );
}
