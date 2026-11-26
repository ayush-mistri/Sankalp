'use client';

import React, { useState, useEffect } from 'react';
import { Language } from '@/types';
import { Clock, Pause, Play, RotateCcw } from 'lucide-react';

interface LiveStudyTimerProps {
  language: Language;
}

export const LiveStudyTimer: React.FC<LiveStudyTimerProps> = ({ language }) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
          isActive ? 'bg-emerald-600 text-white animate-pulse' : 'bg-emerald-50 text-emerald-800'
        }`}>
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-stone-900">
              {language === 'gu' ? 'લાઇવ અભ્યાસ ટાઈમર' : 'Live Focus Timer'}
            </span>
            {isActive && (
              <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                LIVE
              </span>
            )}
          </div>
          <p className="text-[11px] text-stone-500">
            {language === 'gu' ? 'તમારું દૈનિક એકાગ્રતા સત્ર' : 'Active preparation session'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="font-mono text-xl sm:text-2xl font-black text-emerald-800">
          {formatTime(seconds)}
        </div>

        <button
          onClick={toggleTimer}
          className={`p-2.5 rounded-xl font-semibold text-xs flex items-center justify-center transition-all ${
            isActive
              ? 'bg-stone-800 text-white hover:bg-stone-700'
              : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-md'
          }`}
          title={isActive ? 'Pause' : 'Start'}
        >
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {seconds > 0 && (
          <button
            onClick={resetTimer}
            className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
