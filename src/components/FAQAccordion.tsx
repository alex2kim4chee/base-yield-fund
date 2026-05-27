import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { t } = useLanguage();
  const faqs = t('faqs');

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-3" id="faq-section">
      {faqs.map((faq: any, idx: number) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-slate-300 shadow-tiny"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left p-4 flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-sm font-bold text-slate-900 leading-snug">{faq.question}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-blue-600' : ''}`}
              />
            </button>

            {/* Expandable Box */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-60 border-t border-slate-100' : 'max-h-0'
              }`}
            >
              <div className="p-4 text-slate-600 text-[13px] leading-relaxed font-sans bg-slate-50/50">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
