import type { SankalpBookDefinition } from './sankalpIndianPolityBook';
import { HISTORY_PART_1_AND_2_CHAPTERS } from './historyPart1And2';
import { HISTORY_PART_3_AND_4_CHAPTERS } from './historyPart3And4';

export const SANKALP_HISTORY_HERITAGE_BOOK: SankalpBookDefinition = {
  id: 'sankalp-history-heritage',
  slug: 'sankalp-history-heritage',
  titleEn: 'Modern Indian History & Gujarat Heritage',
  titleGu: 'આધુનિક ભારતનો ઇતિહાસ અને ગુજરાતનો વારસો',
  subtitleEn: 'Sankalp Original Bilingual Edition • UPSC + GPSC Prelims & Mains',
  subtitleGu: 'સંકલ્પ ઓરિજિનલ દ્વિભાષી આવૃત્તિ • UPSC + GPSC પ્રિલિમ્સ અને મેઈન્સ',
  authorEn: 'Sankalp Editorial & Subject Board',
  authorGu: 'સંકલ્પ સંપાદકીય અને વિષય નિષ્ણાત બોર્ડ',
  subject: 'history_heritage',
  examIds: ['gpsc', 'upsc'],
  language: 'bilingual',
  descriptionEn:
    'A comprehensive, exam-first textbook combining Modern Indian History, Gujarat’s Freedom Struggle, Ancient & Medieval Gujarat Dynasties, Art, Architecture, Folk Culture, Literature, and all 4 UNESCO World Heritage Sites with Prelims visual diagrams and GS-I Mains model answers.',
  descriptionGu:
    'આધુનિક ભારતનો ઇતિહાસ, ગુજરાતનો સ્વાતંત્ર્ય સંગ્રામ, પ્રાચીન-મધ્યકાલીન રાજવંશો, કલા, સ્થાપત્ય, લોકસંસ્કૃતિ, સાહિત્ય અને ગુજરાતના ૪ UNESCO વર્લ્ડ હેરિટેજ સ્થળોને પ્રિલિમ્સ ડાયાગ્રામ અને GS-I મેઈન્સ મોડેલ ઉત્તરો સાથે આવરી લેતું સંપૂર્ણ પુસ્તક.',
  referenceSourcesEn: [
    'Spectrum Modern India (Rajiv Ahir)',
    'Bipan Chandra — India’s Struggle for Independence',
    'GCERT Std 6–12 History & Gujarat Heritage',
    'Gazetteer of Gujarat & UNESCO World Heritage Dossiers'
  ],
  referenceSourcesGu: [
    'સ્પેક્ટ્રમ આધુનિક ભારત (રાજીવ આહીર)',
    'બિપિન ચંદ્ર — ભારતનો સ્વાતંત્ર્ય સંગ્રામ',
    'GCERT ધોરણ ૬–૧૨ ઇતિહાસ અને ગુજરાતનો વારસો',
    'ગુજરાત ગેઝેટિયર અને UNESCO વર્લ્ડ હેરિટેજ દસ્તાવેજો'
  ],
  parts: [
    {
      partNumber: 1,
      titleEn: 'Part I: Advent of Europeans, British Expansion & 1857',
      titleGu: 'ભાગ ૧: યુરોપિયનોનું આગમન, બ્રિટિશ વિસ્તરણ અને ૧૮૫૭નો સંગ્રામ',
      chapterIds: ['hist-ch-01', 'hist-ch-02', 'hist-ch-03', 'hist-ch-04']
    },
    {
      partNumber: 2,
      titleEn: 'Part II: Indian National Movement & Gandhian Era in Gujarat',
      titleGu: 'ભાગ ૨: ભારતીય રાષ્ટ્રીય આંદોલન અને ગુજરાતમાં ગાંધી યુગ',
      chapterIds: ['hist-ch-05', 'hist-ch-06', 'hist-ch-07', 'hist-ch-08', 'hist-ch-09']
    },
    {
      partNumber: 3,
      titleEn: 'Part III: Ancient & Medieval Gujarat History',
      titleGu: 'ભાગ ૩: પ્રાચીન અને મધ્યકાલીન ગુજરાતનો ઇતિહાસ',
      chapterIds: ['hist-ch-10', 'hist-ch-11', 'hist-ch-12', 'hist-ch-13']
    },
    {
      partNumber: 4,
      titleEn: 'Part IV: Gujarat Art, Architecture, Culture & UNESCO Heritage',
      titleGu: 'ભાગ ૪: ગુજરાતની કલા, સ્થાપત્ય, સંસ્કૃતિ અને UNESCO વારસો',
      chapterIds: ['hist-ch-14', 'hist-ch-15', 'hist-ch-16']
    }
  ],
  chapters: [...HISTORY_PART_1_AND_2_CHAPTERS, ...HISTORY_PART_3_AND_4_CHAPTERS]
};
