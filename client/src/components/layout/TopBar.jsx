import React, { useState } from 'react';
import { Phone, Mail, MapPin, Factory, Clock, Award, Globe } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function TopBar() {
  const { settings } = useSettings();

  const phone1 = settings.phonePrimary || "+91 73839 39786";
  const phone2 = settings.phoneSecondary || "+91 96871 36559";
  const emailInfo = settings.emailInfo || "Info@skylinesaltandminerals.com";
  const factoryAddress = settings.factoryAddress || "Plot No. D-35, Jawahar Nagar, Gandhidham, Kutch, 370201, Gujarat, India.";
  const factoryMapsUrl = settings.factoryMapsUrl || "https://www.google.com/maps/search/?api=1&query=Plot+No.+D-35,+Jawahar+Nagar,+Gandhidham,+Kutch,+370201,+Gujarat,+India";

  return (
    <div className="bg-slate-950 text-slate-300 text-xs py-2 px-2 sm:px-4 border-b border-slate-800/80">
      <div className="max-w-[1600px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-3 px-2 sm:px-4 lg:px-6">
        {/* Left: Established 2011 badge & Factory location */}
        <div className="flex items-center flex-wrap gap-3 text-slate-400">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-950 border border-sky-400/50 text-sky-200 flex items-center gap-1 shadow-xs">
            <Award className="w-3 h-3 text-amber-400" />
            <span>Est. 2011 • 15+ Years Excellence</span>
          </span>

          <a
            href={factoryMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Factory Location in Google Maps"
            className="flex items-center gap-1.5 hover:text-amber-400 transition"
          >
            <Factory className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-medium text-slate-300">Factory:</span>
            <span className="truncate max-w-xs md:max-w-none text-slate-300 hover:underline">
              Jawahar Nagar, Gandhidham
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Mon - Sat: 9:00 AM - 7:30 PM IST</span>
          </div>
        </div>

        {/* Right: Phones, Email & Trust Indicators */}
        <div className="flex items-center flex-wrap gap-4 font-medium">
          {/* Phone Numbers */}
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <a
              href={`tel:${phone1.replace(/\s+/g, '')}`}
              className="text-white hover:text-blue-300 transition hover:underline"
              title="Call Primary Phone"
            >
              {phone1}
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={`tel:${phone2.replace(/\s+/g, '')}`}
              className="text-white hover:text-blue-300 transition hover:underline"
              title="Call Secondary Phone"
            >
              {phone2}
            </a>
          </div>

          <span className="hidden sm:inline text-slate-700">|</span>

          {/* Business Email */}
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <a
              href={`mailto:${emailInfo}`}
              className="text-amber-300 hover:text-amber-200 transition hover:underline"
              title="Send Email to Skyline Salt and Minerals"
            >
              {emailInfo}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
