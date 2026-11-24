'use client';

import React, { useState, useEffect } from 'react';
import { Language, ImageAnnotation } from '@/types';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ExternalLink, 
  Sparkles, 
  Info, 
  CheckCircle2 
} from 'lucide-react';

interface InteractiveImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  titleEn: string;
  titleGu: string;
  captionEn: string;
  captionGu: string;
  source: string;
  annotations?: ImageAnnotation[];
  language: Language;
}

export const InteractiveImageModal: React.FC<InteractiveImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  titleEn,
  titleGu,
  captionEn,
  captionGu,
  source,
  annotations = [],
  language,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedAnnotationIndex, setSelectedAnnotationIndex] = useState<number | null>(
    annotations.length > 0 ? 0 : null
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-emerald-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Sparkles className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                {language === 'gu' ? 'ઇન્ટરેક્ટિવ દ્રશ્ય વિશ્લેષણ' : 'Interactive Visual Deep Dive'}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                {language === 'gu' ? titleGu : titleEn}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-stone-500 hover:text-emerald-700 hover:bg-stone-100 transition-colors"
              title={language === 'gu' ? 'મૂળ છબી જુઓ' : 'View Original High-Res Image'}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left / Center: Interactive Image Viewer with Pan & Zoom */}
          <div className="lg:col-span-7 bg-stone-950 relative min-h-[320px] sm:min-h-[420px] flex items-center justify-center overflow-hidden select-none">
            <div 
              className="transition-transform duration-200 ease-out flex items-center justify-center p-4 max-h-[550px]"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img
                src={imageUrl}
                alt={titleEn}
                className="max-h-[500px] w-auto max-w-full object-contain rounded-lg shadow-lg pointer-events-auto cursor-grab"
              />
            </div>

            {/* Floating Zoom Controls */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 p-1.5 rounded-xl bg-stone-900/90 backdrop-blur-md border border-stone-700 text-white shadow-lg">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.75}
                className="p-1.5 rounded-lg hover:bg-stone-800 disabled:opacity-40 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono px-1 font-bold">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2.5}
                className="p-1.5 rounded-lg hover:bg-stone-800 disabled:opacity-40 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1.5 rounded-lg hover:bg-stone-800 transition-colors border-l border-stone-700 ml-1 pl-2"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Source Tag */}
            <div className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-stone-900/80 backdrop-blur-xs text-[10px] text-stone-300 font-mono">
              {source}
            </div>
          </div>

          {/* Right Panel: High-Yield Exam Clues & Interactive Annotations */}
          <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between bg-stone-50 border-t lg:border-t-0 lg:border-l border-stone-200 space-y-5 overflow-y-auto">
            
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'gu' ? 'વિગત અને ઐતિહાસિક સંદર્ભ' : 'Historical & Exam Context'}</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                  {language === 'gu' ? captionGu : captionEn}
                </p>
              </div>

              {/* Interactive Visual Annotations / Hotspot Pills */}
              {annotations.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    {language === 'gu' ? 'પરીક્ષાલક્ષી સંકેતો (ક્લિક કરીને વિગતો જુઓ):' : 'High-Yield Exam Clues (Click to inspect):'}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {annotations.map((ann, idx) => {
                      const isSelected = selectedAnnotationIndex === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedAnnotationIndex(idx)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all text-left flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-emerald-700 border-emerald-700 text-white shadow-xs'
                              : 'bg-white border-stone-200 text-stone-700 hover:border-emerald-400 hover:bg-emerald-50/50'
                          }`}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-emerald-200' : 'text-emerald-600'}`} />
                          <span>{language === 'gu' ? ann.tagGu : ann.tagEn}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Selected Annotation Detail Card */}
                  {selectedAnnotationIndex !== null && annotations[selectedAnnotationIndex] && (
                    <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-xs space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                        <span className="text-xs font-extrabold text-emerald-900">
                          {language === 'gu' 
                            ? annotations[selectedAnnotationIndex].tagGu 
                            : annotations[selectedAnnotationIndex].tagEn}
                        </span>
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed font-medium">
                        {language === 'gu' 
                          ? annotations[selectedAnnotationIndex].noteGu 
                          : annotations[selectedAnnotationIndex].noteEn}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Reminder / Tip */}
            <div className="p-3.5 rounded-xl bg-emerald-100/60 border border-emerald-200 text-emerald-950 text-[11px] leading-relaxed">
              <span className="font-bold">💡 {language === 'gu' ? 'મેઈન્સ આન્સર રાઈટિંગ ટીપ:' : 'Mains Answer Writing Tip:'}</span>{' '}
              {language === 'gu'
                ? 'આવા ઐતિહાસિક પુરાવા અને સ્થાપત્ય વિશેષતાઓને તમારા GS-1 અને GS-2 ના જવાબોમાં ડાયાગ્રામ સાથે ટાંકવાથી વધારાના ૨-૩ માર્કસ મળી શકે છે.'
                : 'Citing authentic archaeological evidence and constitutional calligraphy in your GS answers sets your paper apart for top marks.'}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
