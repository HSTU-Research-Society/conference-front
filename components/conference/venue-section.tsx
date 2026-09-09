'use client';

import * as React from 'react';
import { MapPin, Navigation, Plane, Hotel, Compass, Info } from 'lucide-react';

export function VenueSection() {
  return (
    <section id="venue" className="scroll-mt-24 w-full py-8 space-y-8">
      <div className="space-y-2 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          Conference Venue & Travel
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Hajee Mohammad Danesh Science & Technology University
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Situated in the historic division of Dinajpur, Bangladesh. In-person attendees will enjoy picturesque campus surroundings, air-conditioned smart auditoriums, and dedicated conference transport.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-rose-400" />
              How to Reach HSTU Campus
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              HSTU is located along the Dhaka-Dinajpur highway, approximately 5 km north of Dinajpur city center.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-white">
                <Plane className="w-4 h-4 text-blue-400" />
                By Air (Syedpur Airport)
              </div>
              <p className="text-slate-400 leading-relaxed">
                Take a 45-minute domestic flight from Hazrat Shahjalal International Airport (Dhaka - DAC) to Syedpur Airport (SPD). Dedicated conference shuttle vans will meet international delegates at Syedpur.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-white">
                <Navigation className="w-4 h-4 text-emerald-400" />
                By Intercity Train / Highway
              </div>
              <p className="text-slate-400 leading-relaxed">
                Direct express air-conditioned trains (Drutojan, Ekota, and Panchagarh Express) depart daily from Dhaka (Kamalapur Railway Station) to Dinajpur Railway Station.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/30 text-xs text-rose-200/90 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">Hybrid Option:</strong> Authors unable to travel physically due to visa constraints or scheduling can present remotely in live synchronized virtual rooms with no penalty.
            </span>
          </div>
        </div>

        {/* Accommodation and Hospitality Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Hotel className="w-5 h-5 text-amber-400" />
              Partner Hotels & Guest House
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Discounted corporate rates are negotiated for registered authors and conference delegates.
            </p>

            <ul className="space-y-3 text-xs">
              <li className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="font-bold text-white">HSTU VIP Faculty Guest House</div>
                <div className="text-slate-400">Located on-campus (reserved for keynote speakers & invited guests)</div>
              </li>
              <li className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="font-bold text-white">Hotel Diamond Tower & Suites</div>
                <div className="text-slate-400">City Center, Dinajpur (Conference shuttle provided)</div>
              </li>
              <li className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="font-bold text-white">Dinajpur Tourist Motel (BPC)</div>
                <div className="text-slate-400">Heritage gardens and serene accommodations</div>
              </li>
            </ul>
          </div>

          <div className="pt-2 text-[11px] text-slate-500">
            For visa support letters, contact: hospitality@hsturs.org
          </div>
        </div>
      </div>
    </section>
  );
}
