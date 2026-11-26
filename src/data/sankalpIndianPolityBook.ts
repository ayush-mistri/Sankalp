import { POLITY_PART1_REMAINING_CHAPTERS } from '@/data/polityPart1Remaining';
import { POLITY_PART2_AND_3_CHAPTERS } from '@/data/polityPart2And3';
import { POLITY_PART4_TO_7_CHAPTERS } from '@/data/polityPart4To6';

export interface PolityDiagramNode {
  id: string;
  labelEn: string;
  labelGu: string;
  detailEn: string;
  detailGu: string;
}

export interface PolityComparisonTable {
  titleEn: string;
  titleGu: string;
  headersEn: string[];
  headersGu: string[];
  rowsEn: string[][];
  rowsGu: string[][];
}

export interface PolityChapterSection {
  id: string;
  headingEn: string;
  headingGu: string;
  simpleExplanationEn: string;
  simpleExplanationGu: string;
  importantPointsEn: string[];
  importantPointsGu: string[];
  realLifeExampleEn: string;
  realLifeExampleGu: string;
  keyTerms: string[];
}

export interface PolityMainsAnalysis {
  coreDebateEn: string;
  coreDebateGu: string;
  detailedAnalysisEn: string[];
  detailedAnalysisGu: string[];
  keyArgumentsEn: string[];
  keyArgumentsGu: string[];
  challengesEn: string[];
  challengesGu: string[];
  wayForwardEn: string[];
  wayForwardGu: string[];
  answerFrameworkEn: {
    question: string;
    intro: string;
    bodyPoints: string[];
    conclusion: string;
    modelAnswer: string;
  };
  answerFrameworkGu: {
    question: string;
    intro: string;
    bodyPoints: string[];
    conclusion: string;
    modelAnswer: string;
  };
}

export interface PolityChapterContent {
  id: string;
  chapterNumber: number;
  partNumber: number;
  partTitleEn: string;
  partTitleGu: string;
  titleEn: string;
  titleGu: string;
  readingTimeMinutes: number;
  status: 'published' | 'planned';
  examFocusEn: string;
  examFocusGu: string;
  sections: PolityChapterSection[];
  diagramTitleEn?: string;
  diagramTitleGu?: string;
  diagramNodes?: PolityDiagramNode[];
  comparisonTable?: PolityComparisonTable;
  summaryPointsEn: string[];
  summaryPointsGu: string[];
  mainsAnalysis?: PolityMainsAnalysis;
}

export interface SankalpBookDefinition {
  id: string;
  slug: string;
  titleEn: string;
  titleGu: string;
  subtitleEn: string;
  subtitleGu: string;
  authorEn: string;
  authorGu: string;
  subject: 'polity' | 'history_heritage' | 'economy' | 'geography' | 'science_tech';
  examIds: ('gpsc' | 'upsc')[];
  language: 'bilingual';
  descriptionEn: string;
  descriptionGu: string;
  referenceSourcesEn: string[];
  referenceSourcesGu: string[];
  parts: Array<{
    partNumber: number;
    titleEn: string;
    titleGu: string;
    chapterIds: string[];
  }>;
  chapters: PolityChapterContent[];
}

export const SANKALP_INDIAN_POLITY_BOOK: SankalpBookDefinition = {
  id: 'sankalp-indian-polity',
  slug: 'sankalp-indian-polity',
  titleEn: 'Sankalp Indian Polity (Complete UPSC + GPSC Edition)',
  titleGu: 'સંકલ્પ ભારતીય રાજવ્યવસ્થા (સંપૂર્ણ UPSC + GPSC આવૃત્તિ)',
  subtitleEn: 'Original bilingual textbook with simple explanations, diagrams, real-life examples & 2-minute summaries',
  subtitleGu: 'સરળ સમજૂતી, ડાયાગ્રામ, વાસ્તવિક ઉદાહરણો અને ૨-મિનિટના સારાંશ સાથેનું મૌલિક દ્વિભાષી પુસ્તક',
  authorEn: 'Sankalp Academic Team',
  authorGu: 'સંકલ્પ એકેડેમિક ટીમ',
  subject: 'polity',
  examIds: ['gpsc', 'upsc'],
  language: 'bilingual',
  descriptionEn:
    'A complete, original Indian Polity textbook built from the Constitution of India, Bare Acts, and NCERT foundations. Designed specifically for GPSC Class 1-2 and UPSC CSE aspirants in English and Gujarati.',
  descriptionGu:
    'ભારતના બંધારણ, મૂળ કાયદાઓ (Bare Acts) અને NCERT ના આધારે તૈયાર કરાયેલ સંપૂર્ણ અને મૌલિક ભારતીય રાજવ્યવસ્થાનું પુસ્તક. GPSC વર્ગ ૧-૨ અને UPSC CSE ના વિદ્યાર્થીઓ માટે ખાસ અંગ્રેજી અને ગુજરાતીમાં.',
  referenceSourcesEn: [
    'The Constitution of India (Official Text — legislative.gov.in)',
    'NCERT Class 11: Indian Constitution at Work',
    'GCERT Class 11–12 Political Science',
  ],
  referenceSourcesGu: [
    'ભારતનું બંધારણ (સત્તાવાર પાઠ — legislative.gov.in)',
    'NCERT ધોરણ ૧૧: Indian Constitution at Work',
    'GCERT ધોરણ ૧૧–૧૨ રાજ્યશાસ્ત્ર',
  ],
  parts: [
    {
      partNumber: 1,
      titleEn: 'Part I: Constitutional Framework',
      titleGu: 'ભાગ ૧: બંધારણીય માળખું',
      chapterIds: [
        'polity-ch-01',
        'polity-ch-02',
        'polity-ch-03',
        'polity-ch-04',
        'polity-ch-05',
        'polity-ch-06',
        'polity-ch-07',
        'polity-ch-08',
        'polity-ch-09',
        'polity-ch-10',
        'polity-ch-11',
      ],
    },
    {
      partNumber: 2,
      titleEn: 'Part II: System of Government',
      titleGu: 'ભાગ ૨: શાસન પ્રણાલી',
      chapterIds: [
        'polity-ch-12',
        'polity-ch-13',
        'polity-ch-14',
        'polity-ch-15',
        'polity-ch-16',
      ],
    },
    {
      partNumber: 3,
      titleEn: 'Part III: Central Government',
      titleGu: 'ભાગ ૩: કેન્દ્ર સરકાર',
      chapterIds: [
        'polity-ch-17',
        'polity-ch-18',
        'polity-ch-19',
        'polity-ch-20',
        'polity-ch-21',
        'polity-ch-22',
        'polity-ch-23',
      ],
    },
    {
      partNumber: 4,
      titleEn: 'Part IV: State Government',
      titleGu: 'ભાગ ૪: રાજ્ય સરકાર',
      chapterIds: [
        'polity-ch-24',
        'polity-ch-25',
        'polity-ch-26',
        'polity-ch-27',
      ],
    },
    {
      partNumber: 5,
      titleEn: 'Part V: Local Government & Special Areas',
      titleGu: 'ભાગ ૫: સ્થાનિક સ્વરાજ્ય અને વિશેષ વિસ્તારો',
      chapterIds: [
        'polity-ch-28',
        'polity-ch-29',
        'polity-ch-30',
        'polity-ch-31',
      ],
    },
    {
      partNumber: 6,
      titleEn: 'Part VI: Constitutional & Non-Constitutional Bodies',
      titleGu: 'ભાગ ૬: બંધારણીય અને બિન-બંધારણીય સંસ્થાઓ',
      chapterIds: [
        'polity-ch-32',
        'polity-ch-33',
        'polity-ch-34',
        'polity-ch-35',
        'polity-ch-36',
        'polity-ch-37',
        'polity-ch-38',
      ],
    },
    {
      partNumber: 7,
      titleEn: 'Part VII: Special Constitutional Provisions & Commissions',
      titleGu: 'ભાગ ૭: વિશેષ બંધારણીય જોગવાઈઓ અને આયોગો',
      chapterIds: [
        'polity-ch-39',
        'polity-ch-40',
        'polity-ch-41',
        'polity-ch-42',
        'polity-ch-43',
      ],
    },
  ],
  chapters: [
    // =========================================================================
    // CHAPTER 1: HISTORICAL BACKGROUND (1773 - 1947)
    // =========================================================================
    {
      id: 'polity-ch-01',
      chapterNumber: 1,
      partNumber: 1,
      partTitleEn: 'Part I: Constitutional Framework',
      partTitleGu: 'ભાગ ૧: બંધારણીય માળખું',
      titleEn: '1. Historical Background (1773–1947)',
      titleGu: '૧. બંધારણની ઐતિહાસિક પૃષ્ઠભૂમિ (૧૭૭૩–૧૯૪૭)',
      readingTimeMinutes: 14,
      status: 'published',
      examFocusEn:
        'High-yield for Prelims (GPSC & UPSC): Questions frequently test which Act introduced Governor-General of Bengal vs. India, Dyarchy (1919 vs. 1935), separate electorates, and the three lists of 1935.',
      examFocusGu:
        'પ્રિલિમ્સ (GPSC અને UPSC) માટે અત્યંત મહત્વપૂર્ણ: કયા અધિનિયમથી બંગાળના ગવર્નર-જનરલ vs ભારતના ગવર્નર-જનરલ બન્યા, દ્વિમુખી શાસન (૧૯૧૯ vs ૧૯૩૫), અલગ મતદાર મંડળ અને ૧૯૩૫ ની ત્રણ યાદીઓ વિશે વારંવાર પ્રશ્નો પૂછાય છે.',
      sections: [
        {
          id: 'polity-ch-01-s1',
          headingEn: '1.1 Why Study British Acts? Company Rule (1773–1858)',
          headingGu: '૧.૧ બ્રિટિશ અધિનિયમો કેમ ભણવા? કંપની શાસન (૧૭૭૩–૧૮૫૮)',
          simpleExplanationEn:
            'The British came to India as traders (East India Company, 1600), not as a government. After winning the Battle of Buxar (1764) and getting Diwani rights (tax collection) in Bengal, Bihar, and Orissa (1765), the Company gained huge territory and power—but corruption and financial losses followed. To control the Company, the British Parliament began passing laws. This period from 1773 to 1858 is called Company Rule. Slowly, power shifted from scattered Presidencies (Bengal, Bombay, Madras) to one central authority, laying the early roots of India’s unified administration and Supreme Court.',
          simpleExplanationGu:
            'અંગ્રેજો ભારતમાં સરકાર તરીકે નહીં, પરંતુ વેપારી (ઈસ્ટ ઈન્ડિયા કંપની, ૧૬૦૦) તરીકે આવ્યા હતા. બક્સરના યુદ્ધ (૧૭૬૪) પછી બંગાળ, બિહાર અને ઓરિસ્સાના દિવાની હકો (૧૭૬૫) મળતાં કંપની પાસે વિશાળ સત્તા આવી, પરંતુ ભ્રષ્ટાચાર અને આર્થિક નુકસાન વધ્યું. કંપની પર નિયંત્રણ રાખવા બ્રિટિશ સંસદે કાયદા બનાવવાનું શરૂ કર્યું. ૧૭૭૩ થી ૧૮૫૮ ના આ સમયગાળાને "કંપની શાસન" કહેવાય છે. ધીમે ધીમે અલગ-અલગ પ્રેસિડેન્સી (બંગાળ, બોમ્બે, મદ્રાસ) ની સત્તા એક કેન્દ્રીય સત્તા હેઠળ આવી.',
          importantPointsEn: [
            'Regulating Act of 1773: First step by British Parliament to regulate East India Company; Governor of Bengal became Governor-General of Bengal (Lord Warren Hastings, with a 4-member Executive Council); Supreme Court established at Calcutta in 1774 (Chief Justice Sir Elijah Impey + 3 judges).',
            'Act of Settlement of 1781: Amended the 1773 Act; exempted the Governor-General and Council from the jurisdiction of the Supreme Court for official acts and excluded revenue matters.',
            'Pitt’s India Act of 1784: Separated commercial and political functions; Court of Directors (commercial) and Board of Control (political) created a "Double Government"; Company territories first called "British possessions in India".',
            'Charter Act of 1793 & 1813: 1793 extended Company’s trade monopoly for 20 years and paid Board of Control salaries from Indian revenues. 1813 ended Company’s trade monopoly in India EXCEPT trade in tea and trade with China, allowed Christian missionaries, and allocated ₹1 lakh for Indian education.',
            'Charter Act of 1833: Final step towards centralization; Governor-General of Bengal became Governor-General of India (Lord William Bentinck); ended Company’s commercial activities—it became purely administrative.',
            'Charter Act of 1853: Separated legislative and executive functions of the Governor-General’s Council for the first time (6 new legislative councillors); introduced open competition for civil services (Macaulay Committee, 1854).',
          ],
          importantPointsGu: [
            'રેગ્યુલેટિંગ એક્ટ ૧૭૭૩: કંપની પર બ્રિટિશ સંસદનું પ્રથમ નિયંત્રણ; બંગાળના ગવર્નરને "બંગાળના ગવર્નર-જનરલ" બનાવાયા (પ્રથમ: લોર્ડ વોરન હેસ્ટિંગ્સ, ૪ સભ્યોની કારોબારી પરિષદ); ૧૭૭૪ માં કલકત્તામાં સુપ્રીમ કોર્ટની સ્થાપના (મુખ્ય ન્યાયાધીશ સર એલિઝા ઈમ્પે + ૩ ન્યાયાધીશો).',
            'એક્ટ ઓફ સેટલમેન્ટ ૧૭૮૧: ૧૭૭૩ ના કાયદાની ખામીઓ સુધારી; ગવર્નર-જનરલ અને પરિષદના સત્તાવાર કાર્યો તથા મહેસૂલ બાબતોને સુપ્રીમ કોર્ટના અધિકારક્ષેત્રમાંથી મુક્તિ અપાઈ.',
            'પિટ્સ ઈન્ડિયા એક્ટ ૧૭૮૪: કંપનીના વેપારી અને રાજકીય કાર્યો અલગ કરાયા; કોર્ટ ઓફ ડિરેક્ટર્સ (વેપાર) અને બોર્ડ ઓફ કંટ્રોલ (રાજકારણ) દ્વારા "દ્વિ-શાસન" (Double Government) શરૂ થયું.',
            'ચાર્ટર એક્ટ ૧૭૯૩ અને ૧૮૧૩: ૧૭૯૩ થી વેપાર ઈજારો ૨૦ વર્ષ લંબાવાયો. ૧૮૧૩ થી ભારતમાં કંપનીનો વેપારી ઈજારો સમાપ્ત થયો — સિવાય કે "ચા (Tea) નો વેપાર અને ચીન સાથેનો વેપાર"; ભારતીય શિક્ષણ માટે ₹૧ લાખની જોગવાઈ થઈ.',
            'ચાર્ટર એક્ટ ૧૮૩૩: કેન્દ્રીકરણનું અંતિમ પગલું; બંગાળના ગવર્નર-જનરલ હવે "ભારતના ગવર્નર-જનરલ" બન્યા (પ્રથમ: લોર્ડ વિલિયમ બેન્ટિંક); કંપનીની વેપારી પ્રવૃત્તિઓ સંપૂર્ણ બંધ થઈ.',
            'ચાર્ટર એક્ટ ૧૮૫૩: પ્રથમ વખત ગવર્નર-જનરલની પરિષદના વિધાયી (કાયદાકીય) અને કારોબારી કાર્યો અલગ કરાયા (૬ નવા વિધાયી સભ્યો); સિવિલ સર્વિસ માટે ખુલ્લી સ્પર્ધાત્મક પરીક્ષા શરૂ થઈ (મેકોલે સમિતિ, ૧૮૫૪).',
          ],
          realLifeExampleEn:
            'Think of how UPSC conducts open competitive civil service exams today, or how India has one unified Supreme Court above state courts—the earliest institutional roots of open civil service recruitment (1853) and a central Supreme Court (1774) trace back to these Acts.',
          realLifeExampleGu:
            'આજે જે રીતે UPSC દ્વારા ખુલ્લી સ્પર્ધાત્મક પરીક્ષા લેવાય છે અથવા સમગ્ર દેશમાં એક સુપ્રીમ કોર્ટની વ્યવસ્થા છે, તેના સૌપ્રથમ બીજ અનુક્રમે ૧૮૫૩ ના ચાર્ટર એક્ટ અને ૧૭૭૩ ના રેગ્યુલેટિંગ એક્ટમાં રોપાયા હતા.',
          keyTerms: [
            'Regulating Act 1773',
            'Charter Act 1813 (Tea & China)',
            'Double Government (1784)',
            'Lord William Bentinck',
            'Open Competition (1853)',
          ],
        },
        {
          id: 'polity-ch-01-s2',
          headingEn: '1.2 Crown Rule (1858–1947): Towards Responsible Government',
          headingGu: '૧.૨ તાજનું શાસન (૧૮૫૮–૧૯૪૭): જવાબદાર શાસન તરફ પ્રયાણ',
          simpleExplanationEn:
            'After the Revolt of 1857, Britain realized the East India Company could no longer govern India safely. So the British Crown took direct control in 1858—beginning "Crown Rule". Over the next 90 years, Indian national movements pushed Britain to gradually include Indians in law-making (1861, 1892, 1909), introduce elections and provincial power-sharing (1919), and design a detailed federal framework (1935). Finally, the Indian Independence Act of 1947 ended British rule on August 15, 1947.',
          simpleExplanationGu:
            '૧૮૫૭ ના વિપ્લવ પછી બ્રિટનને સમજાયું કે કંપની ભારતનું શાસન સુરક્ષિત રીતે ચલાવી શકશે નહીં. તેથી ૧૮૫૮ માં બ્રિટિશ તાજે (Crown) સીધું શાસન હાથમાં લીધું. ત્યારબાદ ભારતીય રાષ્ટ્રીય આંદોલનોના દબાણ હેઠળ બ્રિટને ધીમે ધીમે ભારતીયોને કાયદા ઘડવામાં સામેલ કર્યા (૧૮૬૧, ૧૮૯૨, ૧૯૦૯), ચૂંટણી અને પ્રાંતીય સત્તા આપી (૧૯૧૯) અને ૧૯૩૫ નો વિગતવાર સંઘીય કાયદો બનાવ્યો. અંતે ૧૯૪૭ ના ભારતીય સ્વતંત્રતા અધિનિયમથી ૧૫ ઓગસ્ટ ૧૯૪૭ ના રોજ ભારત સ્વતંત્ર થયું.',
          importantPointsEn: [
            'Government of India Act 1858: Abolished East India Company; Governor-General of India became Viceroy of India (Lord Canning); ended Double Government; created Secretary of State for India + 15-member Council of India.',
            'Indian Councils Act 1861: Restored legislative powers to Bombay and Madras (decentralization); Lord Canning nominated 3 Indians (1862: Raja of Benaras, Maharaja of Patiala, Sir Dinkar Rao); recognized Portfolio System; gave Viceroy ordinance-making power (6 months).',
            'Indian Councils Act 1892: Increased non-official members while keeping official majority; gave legislative councils the power to DISCUSS the budget and address questions to the executive; introduced limited indirect nomination/election.',
            'Indian Councils Act 1909 (Morley-Minto Reforms): Central Legislative Council grew from 16 to 60; introduced separate electorate for Muslims; Satyendra Prasad Sinha became the first Indian in Viceroy’s Executive Council (Law Member).',
            'Government of India Act 1919 (Montagu-Chelmsford Reforms): Introduced Dyarchy in provinces (Transferred vs. Reserved subjects), bicameralism (Council of State + Legislative Assembly) and direct elections at the Centre; 3 of 6 Viceroy Executive Council members to be Indians; led to Central Public Service Commission (1926) & Chamber of Princes (1921).',
            'Government of India Act 1935: Divided powers into Federal (59), Provincial (54), and Concurrent (36) lists; abolished provincial dyarchy and introduced provincial autonomy; introduced bicameralism in 6 of 11 provinces (Bengal, Bombay, Madras, Bihar, Assam, UP); abolished Council of India; provided for Federal Court (1937) and Federal/Provincial/Joint PSCs. (Note: Reserve Bank of India was established separately under the RBI Act, 1934 and commenced operations on April 1, 1935).',
            'Indian Independence Act 1947: Declared India an independent and sovereign state from August 15, 1947; abolished the office of Viceroy; empowered the Constituent Assembly to frame any Constitution. Key 1947 First Cabinet portfolios: Nehru (External Affairs), Sardar Patel (Home & States), Rajendra Prasad (Food & Agriculture), Dr. B.R. Ambedkar (Law), Baldev Singh (Defence), R.K. Shanmukham Chetty (Finance), Maulana Azad (Education).',
          ],
          importantPointsGu: [
            'ભારત સરકાર અધિનિયમ ૧૮૫૮: કંપની શાસનનો અંત; ગવર્નર-જનરલ હવે "ભારતના વાઈસરોય" બન્યા (પ્રથમ: લોર્ડ કેનિંગ); બોર્ડ ઓફ કંટ્રોલ અને કોર્ટ ઓફ ડિરેક્ટર્સ નાબૂદ કરી "સેક્રેટરી ઓફ સ્ટેટ ફોર ઈન્ડિયા" નું પદ સર્જાયું.',
            'ભારતીય પરિષદ અધિનિયમ ૧૮૬૧: બોમ્બે અને મદ્રાસને વિધાયી સત્તા પરત આપી (વિકેન્દ્રીકરણ); લોર્ડ કેનિંગે ૩ ભારતીયોને નોમિનેટ કર્યા (૧૮૬૨); પોર્ટફોલિયો સિસ્ટમ (ખાતાકીય પદ્ધતિ) અને વાઈસરોયને વટહુકમ (Ordinance) બહાર પાડવાની સત્તા મળી.',
            'ભારતીય પરિષદ અધિનિયમ ૧૮૯૨: વિધાન પરિષદોને બજેટ પર ચર્ચા કરવાની અને કારોબારીને પ્રશ્નો પૂછવાની સત્તા મળી; પરોક્ષ ચૂંટણી પદ્ધતિની મર્યાદિત શરૂઆત.',
            'ભારતીય પરિષદ અધિનિયમ ૧૯૦૯ (મોર્લે-મિન્ટો સુધારા): કેન્દ્રીય વિધાન પરિષદની સભ્યસંખ્યા ૧૬ થી વધારી ૬૦ કરાઈ; મુસ્લિમો માટે "અલગ મતદાર મંડળ" શરૂ થયું; સત્યેન્દ્ર પ્રસાદ સિન્હા વાઈસરોયની કારોબારીમાં પ્રથમ ભારતીય સભ્ય (કાયદા સભ્ય) બન્યા.',
            'ભારત સરકાર અધિનિયમ ૧૯૧૯ (મોન્ટેગ્યુ-ચેમ્સફર્ડ સુધારા): પ્રાંતોમાં "દ્વિમુખી શાસન" (Dyarchy — હસ્તાંતરિત અને અનામત વિષયો) અને કેન્દ્રમાં પ્રથમ વખત દ્વિગૃહી (Council of State + Legislative Assembly) વ્યવસ્થા તથા પ્રત્યક્ષ ચૂંટણી શરૂ થઈ; ૧૯૨૬ માં કેન્દ્રીય જાહેર સેવા આયોગની રચના થઈ.',
            'ભારત સરકાર અધિનિયમ ૧૯૩૫: સત્તાઓને સંઘીય (૫૯), પ્રાંતીય (૫૪) અને સમવર્તી (૩૬) યાદીમાં વહેંચી; પ્રાંતોમાં દ્વિમુખી શાસન નાબૂદ કરી પ્રાંતીય સ્વાયત્તતા આપી; ૧૧ માંથી ૬ પ્રાંતોમાં દ્વિગૃહી વ્યવસ્થા; કાઉન્સિલ ઓફ ઈન્ડિયા નાબૂદ; ફેડરલ કોર્ટ (૧૯૩૭) અને ફેડરલ/પ્રાંતીય/સંયુક્ત PSC ની જોગવાઈ. (નોંધ: RBI ની સ્થાપના અલગથી RBI એક્ટ, ૧૯૩૪ હેઠળ થઈ હતી અને ૧ એપ્રિલ ૧૯૩૫ થી કામગીરી શરૂ થઈ).',
            'ભારતીય સ્વતંત્રતા અધિનિયમ ૧૯૪૭: ૧૫ ઓગસ્ટ ૧૯૪૭ થી ભારત સ્વતંત્ર બન્યું. સ્વતંત્ર ભારતની પ્રથમ કેબિનેટ (૧૯૪૭): નેહરુ (વિદેશ), સરદાર પટેલ (ગૃહ અને રજવાડાં), રાજેન્દ્ર પ્રસાદ (ખાદ્ય અને કૃષિ), ડૉ. બી.આર. આંબેડકર (કાયદો), બલદેવ સિંહ (સંરક્ષણ), શણમુખમ ચેટ્ટી (નાણાં), મૌલાના આઝાદ (શિક્ષણ).',
          ],
          realLifeExampleEn:
            'Look at the Seventh Schedule of our Constitution today (Union List, State List, Concurrent List) and the President’s power to issue Ordinances (Article 123). Both ideas evolved directly from the 1935 Act’s three lists and the 1861 Act’s ordinance power—except today they operate under a democratic Constitution instead of a British Viceroy.',
          realLifeExampleGu:
            'આજે આપણા બંધારણની ૭મી અનુસૂચિમાં રહેલી ત્રણ યાદીઓ (સંઘ, રાજ્ય અને સમવર્તી યાદી) અને રાષ્ટ્રપતિની વટહુકમ બહાર પાડવાની સત્તા (અનુચ્છેદ ૧૨૩) અનુક્રમે ૧૯૩૫ ના અધિનિયમ અને ૧૮૬૧ ના અધિનિયમમાંથી જ વિકસિત થઈ છે.',
          keyTerms: [
            'Viceroy Lord Canning',
            'Portfolio System (1861)',
            'Separate Electorate (1909)',
            'Dyarchy (1919)',
            'Three Lists (1935)',
          ],
        },
      ],
      diagramTitleEn: 'Evolution Flow: From Trader Company to Sovereign Republic',
      diagramTitleGu: 'વિકાસ પ્રવાહ: વેપારી કંપનીથી સાર્વભૌમ પ્રજાસત્તાક સુધી',
      diagramNodes: [
        {
          id: 'node-1773',
          labelEn: '1773–1833: Centralization',
          labelGu: '૧૭૭૩–૧૮૩૩: કેન્દ્રીકરણ',
          detailEn: 'Governor of Bengal -> Governor-General of Bengal (1773) -> Governor-General of India (1833)',
          detailGu: 'બંગાળના ગવર્નર -> બંગાળના ગવર્નર-જનરલ (૧૭૭૩) -> ભારતના ગવર્નર-જનરલ (૧૮૩૩)',
        },
        {
          id: 'node-1858',
          labelEn: '1858–1909: Crown Control & Councils',
          labelGu: '૧૮૫૮–૧૯૦૯: તાજનું શાસન અને પરિષદો',
          detailEn: 'Viceroy created (1858); Portfolio & Decentralization (1861); Separate Electorates (1909)',
          detailGu: 'વાઈસરોય પદ (૧૮૫૮); ખાતાકીય પદ્ધતિ (૧૮૬૧); અલગ મતદાર મંડળ (૧૯૦૯)',
        },
        {
          id: 'node-1919',
          labelEn: '1919–1935: Dyarchy to Federal Blueprint',
          labelGu: '૧૯૧૯–૧૯૩૫: દ્વિમુખી શાસનથી સંઘીય માળખું',
          detailEn: 'Provincial Dyarchy & Bicameralism (1919) -> Provincial Autonomy & 3 Lists (1935)',
          detailGu: 'પ્રાંતીય દ્વિમુખી શાસન અને દ્વિગૃહી (૧૯૧૯) -> પ્રાંતીય સ્વાયત્તતા અને ૩ યાદી (૧૯૩૫)',
        },
        {
          id: 'node-1947',
          labelEn: '1947: Sovereignty',
          labelGu: '૧૯૪૭: સાર્વભૌમત્વ',
          detailEn: 'Independence Act 1947 ends British Paramountcy; Constituent Assembly becomes sovereign.',
          detailGu: 'સ્વતંત્રતા અધિનિયમ ૧૯૪૭ થી બ્રિટિશ સર્વોપરિતાનો અંત; બંધારણ સભા સાર્વભૌમ બની.',
        },
      ],
      comparisonTable: {
        titleEn: 'Quick Exam Comparison: 1909 vs 1919 vs 1935 Acts',
        titleGu: 'પરીક્ષાલક્ષી તુલના: ૧૯૦૯ vs ૧૯૧૯ vs ૧૯૩૫ અધિનિયમો',
        headersEn: ['Feature', '1909 Act (Morley-Minto)', '1919 Act (Montagu-Chelmsford)', '1935 Act'],
        headersGu: ['બાબત', '૧૯૦૯ (મોર્લે-મિન્ટો)', '૧૯૧૯ (મોન્ટેગ્યુ-ચેમ્સફર્ડ)', '૧૯૩૫ અધિનિયમ'],
        rowsEn: [
          ['Central Legislature', 'Expanded (16 -> 60)', 'Bicameral + Direct Elections', 'Bicameral (Federal Assembly + Council of States)'],
          ['Provincial System', 'Non-official majority', 'Dyarchy (Transferred & Reserved)', 'Provincial Autonomy (Dyarchy abolished)'],
          ['Electoral Representation & Special Electorates', 'Separate electorate introduced for Muslims', 'Separate electorates extended to Sikhs, Indian Christians, Anglo-Indians, Europeans', 'Joint electorates with reserved seats for Depressed Classes (per Poona Pact 1932); special/separate representation for Women & Labour'],
          ['Key Institutions', '1st Indian in Executive Council (S.P. Sinha)', 'Central Public Service Commission (1926)', 'Federal Court (1937) & Federal/Provincial/Joint PSCs'],
        ],
        rowsGu: [
          ['કેન્દ્રીય ધારાસભા', 'વિસ્તરણ (૧૬ -> ૬૦)', 'દ્વિગૃહી + પ્રત્યક્ષ ચૂંટણી', 'દ્વિગૃહી વ્યવસ્થા'],
          ['પ્રાંતીય વ્યવસ્થા', 'બિન-સરકારી બહુમતી', 'દ્વિમુખી શાસન (હસ્તાંતરિત અને અનામત)', 'પ્રાંતીય સ્વાયત્તતા (દ્વિમુખી શાસન નાબૂદ)'],
          ['ચૂંટણી પ્રતિનિધિત્વ અને વિશેષ મતદાર મંડળ', 'મુસ્લિમો માટે અલગ મતદાર મંડળ શરૂ', 'શીખ, ભારતીય ખ્રિસ્તી, એંગ્લો-ઈન્ડિયન, યુરોપિયન', 'પૂના કરાર (૧૯૩૨) મુજબ દલિત વર્ગ માટે સંયુક્ત મતદાર મંડળમાં અનામત બેઠકો; મહિલાઓ અને કામદારો માટે વિશેષ પ્રતિનિધિત્વ'],
          ['મુખ્ય સંસ્થાઓ', 'કારોબારીમાં પ્રથમ ભારતીય (એસ.પી. સિન્હા)', 'કેન્દ્રીય જાહેર સેવા આયોગ (૧૯૨૬)', 'ફેડરલ કોર્ટ (૧૯૩૭) અને ફેડરલ/પ્રાંતીય/સંયુક્ત PSC'],
        ],
      },
      summaryPointsEn: [
        '1773: First parliamentary regulation; Governor-General of Bengal (Warren Hastings); Calcutta Supreme Court (1774).',
        '1833: Governor-General of India (William Bentinck); Company becomes purely administrative.',
        '1858: Crown Rule begins; Viceroy (Lord Canning); Secretary of State for India created.',
        '1909: Communal/separate electorate introduced; S.P. Sinha joins Executive Council.',
        '1919: Provincial Dyarchy, Central Bicameralism, Direct Elections.',
        '1935: Provincial Autonomy, 3 Legislative Lists (59/54/36), Federal Court (1937).',
      ],
      summaryPointsGu: [
        '૧૭૭૩: બંગાળના ગવર્નર-જનરલ (વોરન હેસ્ટિંગ્સ); કલકત્તામાં સુપ્રીમ કોર્ટ (૧૭૭૪).',
        '૧૮૩૩: ભારતના ગવર્નર-જનરલ (વિલિયમ બેન્ટિંક); કંપની માત્ર વહીવટી સંસ્થા બની.',
        '૧૮૫૮: તાજનું શાસન શરૂ; વાઈસરોય (લોર્ડ કેનિંગ); સેક્રેટરી ઓફ સ્ટેટ પદ.',
        '૧૯૦૯: અલગ મતદાર મંડળ; એસ.પી. સિન્હા કારોબારી પરિષદમાં પ્રથમ ભારતીય.',
        '૧૯૧૯: પ્રાંતોમાં દ્વિમુખી શાસન, કેન્દ્રમાં દ્વિગૃહી ધારાસભા અને પ્રત્યક્ષ ચૂંટણી.',
        '૧૯૩૫: પ્રાંતીય સ્વાયત્તતા, ૩ યાદીઓ (૫૯/૫૪/૩૬), ફેડરલ કોર્ટ (૧૯૩૭).',
      ],
    },

    // =========================================================================
    // CHAPTER 2: MAKING OF THE CONSTITUTION
    // =========================================================================
    {
      id: 'polity-ch-02',
      chapterNumber: 2,
      partNumber: 1,
      partTitleEn: 'Part I: Constitutional Framework',
      partTitleGu: 'ભાગ ૧: બંધારણીય માળખું',
      titleEn: '2. Making of the Constitution',
      titleGu: '૨. બંધારણનું ઘડતર (Making of the Constitution)',
      readingTimeMinutes: 12,
      status: 'published',
      examFocusEn:
        'Frequently asked in GPSC & UPSC: Key dates (Dec 9, Dec 11, Dec 13, 1946; Jan 22, 1947; Nov 26, 1949; Jan 26, 1950), Drafting Committee members, and Major Committees & their Chairmen.',
      examFocusGu:
        'GPSC અને UPSC માં વારંવાર પૂછાતા પ્રશ્નો: મહત્વપૂર્ણ તારીખો (૯, ૧૧, ૧૩ ડિસેમ્બર ૧૯૪૬; ૨૨ જાન્યુઆરી ૧૯૪૭; ૨૬ નવેમ્બર ૧૯૪૯; ૨૬ જાન્યુઆરી ૧૯૫૦), મુસદ્દા સમિતિના સભ્યો અને મુખ્ય સમિતિઓના અધ્યક્ષો.',
      sections: [
        {
          id: 'polity-ch-02-s1',
          headingEn: '2.1 Demand & Composition of the Constituent Assembly',
          headingGu: '૨.૧ બંધારણ સભાની માંગ અને રચના',
          simpleExplanationEn:
            'A Constitution is not written overnight by one person—it needs a representative body of the country’s people. In 1934, M.N. Roy first proposed a Constituent Assembly for India. In 1946, the Cabinet Mission Plan created a 389-member Assembly: 296 seats from British Indian provinces (indirectly elected by provincial assembly members) and 93 seats from Princely States (nominated by rulers). Because seats were roughly 1 per million people, the Assembly represented India’s regions, communities, and legal minds.',
          simpleExplanationGu:
            'બંધારણ કોઈ એક વ્યક્તિ દ્વારા રાતોરાત લખાતું નથી; તેના માટે દેશના પ્રતિનિધિઓની સભા જરૂરી હોય છે. ૧૯૩૪ માં સૌપ્રથમ એમ.એન. રોયે બંધારણ સભાનો વિચાર આપ્યો. ૧૯૪૬ માં કેબિનેટ મિશન યોજના હેઠળ ૩૮૯ સભ્યોની બંધારણ સભા રચાઈ: બ્રિટિશ ભારતની ૨૯૬ બેઠકો (પ્રાંતીય ધારાસભાઓ દ્વારા પરોક્ષ ચૂંટણી) અને દેશી રજવાડાંની ૯૩ બેઠકો (શાસકો દ્વારા નિયુક્ત). દર ૧૦ લાખની વસ્તીએ આશરે ૧ બેઠક ફાળવાઈ હતી.',
          importantPointsEn: [
            '1934: M.N. Roy first put forward the idea of a Constituent Assembly; 1935: INC officially demanded it; 1940: Accepted in principle in the August Offer.',
            'November 1946: Constituent Assembly constituted under Cabinet Mission Plan (total 389 seats: 292 Governors’ Provinces + 4 Chief Commissioners’ Provinces + 93 Princely States).',
            'July–August 1946 Elections (296 seats): INC won 208, Muslim League won 73, small groups/independents won 15.',
            '15 Women Members: Included Hansa Mehta (Gujarat/Bombay), Sarojini Naidu, Rajkumari Amrit Kaur, Sucheta Kripalani, Durgabai Deshmukh, Begum Aizaz Rasul, Vijaya Lakshmi Pandit, and Dakshayani Velayudhan.',
            'After Partition (1947): Total strength came down from 389 to 299 (229 from Indian Provinces + 70 from Princely States).',
          ],
          importantPointsGu: [
            '૧૯૩૪: એમ.એન. રોયે સૌપ્રથમ બંધારણ સભાનો વિચાર રજૂ કર્યો; ૧૯૩૫: ભારતીય રાષ્ટ્રીય કોંગ્રેસે સત્તાવાર માંગ કરી; ૧૯૪૦: ઓગસ્ટ ઓફરમાં સૈદ્ધાંતિક સ્વીકાર.',
            'નવેમ્બર ૧૯૪૬: કેબિનેટ મિશન યોજના હેઠળ રચના (કુલ ૩૮૯ બેઠકો: ૨૯૨ ગવર્નરોના પ્રાંત + ૪ ચીફ કમિશનર પ્રાંત + ૯૩ દેશી રજવાડાં).',
            'જુલાઈ–ઓગસ્ટ ૧૯૪૬ ની ચૂંટણી (૨૯૬ બેઠકો): કોંગ્રેસ ૨૦૮, મુસ્લિમ લીગ ૭૩, અન્ય/અપક્ષ ૧૫.',
            '૧૫ મહિલા સભ્યો: જેમાં હંસાબેન મહેતા (ગુજરાત/બોમ્બે), સરોજિની નાયડુ, રાજકુમારી અમૃત કૌર, સુચેતા કૃપલાની, દુર્ગાબાઈ દેશમુખ, બેગમ એજાઝ રસૂલ, વિજયા લક્ષ્મી પંડિત વગેરે સામેલ હતા.',
            'ભાગલા (૧૯૪૭) પછી: કુલ સભ્યસંખ્યા ૩૮૯ થી ઘટીને ૨૯૯ થઈ (૨૨૯ ભારતીય પ્રાંતો + ૭૦ દેશી રજવાડાં).',
          ],
          realLifeExampleEn:
            'Today, Rajya Sabha MPs are also elected indirectly by state MLAs using proportional representation—the exact same voting method (single transferable vote) used to elect members of the Constituent Assembly in 1946.',
          realLifeExampleGu:
            'આજે જે રીતે રાજ્યસભાના સાંસદોની ચૂંટણી રાજ્યોના ધારાસભ્યો દ્વારા પ્રમાણસર પ્રતિનિધિત્વ પદ્ધતિથી થાય છે, બિલકુલ તે જ પદ્ધતિથી ૧૯૪૬ માં બંધારણ સભાના સભ્યો ચૂંટાયા હતા.',
          keyTerms: [
            'M.N. Roy (1934)',
            'Cabinet Mission Plan (1946)',
            '389 -> 299 Members',
            '15 Women (Hansa Mehta)',
          ],
        },
        {
          id: 'polity-ch-02-s2',
          headingEn: '2.2 Working, Key Committees, Facts & Mains Criticism',
          headingGu: '૨.૨ કાર્યપદ્ધતિ, મુખ્ય સમિતિઓ, તથ્યો અને મેઈન્સ વિવેચન',
          simpleExplanationEn:
            'To manage such a massive task smoothly, the Constituent Assembly worked through 8 major committees and several minor committees—on Union powers, Provincial constitutions, Fundamental Rights, and finally the 7-member Drafting Committee chaired by Dr. B.R. Ambedkar. Every clause was debated openly line by line for nearly three years (2 years, 11 months, 18 days). On November 26, 1949, the Constitution was adopted, and on January 26, 1950, India became a Republic.',
          simpleExplanationGu:
            'આટલું મોટું કાર્ય વ્યવસ્થિત રીતે પૂર્ણ કરવા બંધારણ સભાએ ૮ મુખ્ય સમિતિઓ અને અન્ય નાની સમિતિઓ બનાવી—જેમ કે સંઘ શક્તિ સમિતિ, પ્રાંતીય બંધારણ સમિતિ, મૂળભૂત અધિકાર સમિતિ અને અંતે ડૉ. બી.આર. આંબેડકરની અધ્યક્ષતામાં ૭ સભ્યોની મુસદ્દા સમિતિ (Drafting Committee). દરેક કલમ પર ૨ વર્ષ, ૧૧ મહિના અને ૧૮ દિવસ સુધી ઊંડાણપૂર્વક ચર્ચા થઈ. ૨૬ નવેમ્બર ૧૯૪૯ ના રોજ બંધારણ અપનાવાયું અને ૨૬ જાન્યુઆરી ૧૯૫૦ થી ભારત પ્રજાસત્તાક બન્યું.',
          importantPointsEn: [
            'First Meeting (Dec 9, 1946): Temporary President Dr. Sachchidananda Sinha; Muslim League boycotted (211 members attended).',
            'Dec 11, 1946: Dr. Rajendra Prasad elected permanent President; H.C. Mukherjee (and later V.T. Krishnamachari) as Vice-Presidents; Sir B.N. Rau appointed Constitutional Advisor.',
            'Dec 13, 1946: Jawaharlal Nehru moved the Objectives Resolution (adopted unanimously on Jan 22, 1947).',
            'Drafting Committee (Aug 29, 1947): 7 members — Dr. B.R. Ambedkar (Chairman), N. Gopalaswami Ayyangar, Alladi Krishnaswami Ayyar, Dr. K.M. Munshi, Syed Mohammad Saadullah, N. Madhava Rau (replaced B.L. Mitter), T.T. Krishnamachari (replaced D.P. Khaitan).',
            'Important Assembly Facts: Symbol/Seal = Elephant; Secretary = H.V.R. Iyengar; Chief Draftsman = S.N. Mukherjee; English Calligrapher = Prem Behari Narain Raizada; Hindi Calligrapher = Vasant Krishan Vaidya; Illumination = Nandalal Bose & Beohar Rammanohar Sinha.',
            'Nov 26, 1949 (Constitution Day): Adopted with Preamble, 395 Articles, and 8 Schedules (284 members signed). Jan 26, 1950 (Republic Day): Full Constitution commenced (2 years, 11 months, 18 days; 11 sessions).',
            'Mains Criticism: Critics argued the Assembly was (1) not directly elected by universal adult franchise, (2) initially not sovereign until Independence Act 1947, (3) time-consuming, and (4) dominated by Congress and lawyers.',
          ],
          importantPointsGu: [
            'પ્રથમ બેઠક (૯ ડિસેમ્બર ૧૯૪૬): અસ્થાયી અધ્યક્ષ ડૉ. સચ્ચિદાનંદ સિંહા; મુસ્લિમ લીગે બહિષ્કાર કર્યો (૨૧૧ સભ્યો હાજર).',
            '૧૧ ડિસેમ્બર ૧૯૪૬: ડૉ. રાજેન્દ્ર પ્રસાદ સ્થાયી અધ્યક્ષ; એચ.સી. મુખર્જી (અને ત્યારબાદ વી.ટી. કૃષ્ણમાચારી) ઉપાધ્યક્ષ; સર બી.એન. રાવ બંધારણીય સલાહકાર.',
            '૧૩ ડિસેમ્બર ૧૯૪૬: જવાહરલાલ નેહરુએ "ઉદ્દેશ્ય પ્રસ્તાવ" (Objectives Resolution) રજૂ કર્યો, જે ૨૨ જાન્યુઆરી ૧૯૪૭ ના રોજ સર્વસંમતિથી પસાર થયો.',
            'મુસદ્દા સમિતિ (૨૯ ઓગસ્ટ ૧૯૪૭): ૭ સભ્યો — ડૉ. બી.આર. આંબેડકર (અધ્યક્ષ), એન. ગોપાલાસ્વામી આયંગર, અલ્લાદી કૃષ્ણસ્વામી અય્યર, ડૉ. કે.એમ. મુનશી, સૈયદ મોહમ્મદ સાદુલ્લાહ, એન. માધવ રાવ (બી.એલ. મિત્તરના સ્થાને), ટી.ટી. કૃષ્ણમાચારી (ડી.પી. ખૈતાનના સ્થાને).',
            'મહત્વના તથ્યો: સભાનું પ્રતીક = હાથી (Elephant); સચિવ = એચ.વી.આર. આયંગર; મુખ્ય ડ્રાફ્ટ્સમેન = એસ.એન. મુખર્જી; અંગ્રેજી સુલેખક (Calligrapher) = પ્રેમ બિહારી નારાયણ રાયઝાદા; હિન્દી સુલેખક = વસંત કૃષ્ણ વૈદ્ય; સુશોભન = નંદલાલ બોઝ અને બેઓહર રામમનોહર સિન્હા.',
            '૨૬ નવેમ્બર ૧૯૪૯ (બંધારણ દિવસ): આમુખ, ૩૯૫ અનુચ્છેદ અને ૮ અનુસૂચિઓ સાથે સ્વીકારાયું (૨૮૪ સભ્યોએ હસ્તાક્ષર કર્યા). ૨૬ જાન્યુઆરી ૧૯૫૦: સંપૂર્ણ અમલ (૨ વર્ષ, ૧૧ મહિના, ૧૮ દિવસ; ૧૧ સત્રો).',
            'મેઈન્સ માટે વિવેચન: ટીકાકારો મુજબ સભા (૧) સાર્વત્રિક પુખ્ત મતાધિકારથી સીધી ચૂંટાયેલી નહોતી, (૨) ૧૯૪૭ પહેલાં સાર્વભૌમ નહોતી, (૩) ઘણો સમય લીધો, અને (૪) કોંગ્રેસ તથા વકીલોનું પ્રભુત્વ હતું.',
          ],
          realLifeExampleEn:
            'Since 2015, India officially celebrates November 26 every year as Constitution Day (Samvidhan Divas) in schools, courts, and government offices to honour the adoption of the Constitution on November 26, 1949.',
          realLifeExampleGu:
            '૨૬ નવેમ્બર ૧૯૪૯ ના રોજ બંધારણ અપનાવાયું હોવાથી, ૨૦૧૫ થી ભારતમાં દર વર્ષે ૨૬ નવેમ્બરને "બંધારણ દિવસ" (સંવિધાન દિવસ) તરીકે ઉજવવામાં આવે છે.',
          keyTerms: [
            'Objectives Resolution',
            'Drafting Committee (7 Members)',
            'Elephant Seal',
            'Prem Behari Narain Raizada',
          ],
        },
      ],
      comparisonTable: {
        titleEn: 'All 8 Major Committees of the Constituent Assembly & Key Sub-Committees',
        titleGu: 'બંધારણ સભાની તમામ ૮ મુખ્ય સમિતિઓ અને પેટા-સમિતિઓ',
        headersEn: ['Committee', 'Chairman'],
        headersGu: ['સમિતિનું નામ', 'અધ્યક્ષ'],
        rowsEn: [
          ['1. Union Powers Committee & 2. Union Constitution Committee', 'Jawaharlal Nehru'],
          ['3. States Committee (Negotiating with States)', 'Jawaharlal Nehru'],
          ['4. Provincial Constitution Committee', 'Sardar Vallabhbhai Patel'],
          ['5. Advisory Committee on Fundamental Rights, Minorities & Tribal Areas', 'Sardar Vallabhbhai Patel (Sub-committees: FR — J.B. Kripalani; Minorities — H.C. Mukherjee)'],
          ['6. Drafting Committee', 'Dr. B.R. Ambedkar'],
          ['7. Rules of Procedure Committee & 8. Steering Committee', 'Dr. Rajendra Prasad'],
        ],
        rowsGu: [
          ['૧. સંઘ શક્તિ સમિતિ અને ૨. સંઘ બંધારણ સમિતિ', 'જવાહરલાલ નેહરુ'],
          ['૩. રાજ્યો સાથે વાટાઘાટ સમિતિ (States Committee)', 'જવાહરલાલ નેહરુ'],
          ['૪. પ્રાંતીય બંધારણ સમિતિ', 'સરદાર વલ્લભભાઈ પટેલ'],
          ['૫. મૂળભૂત અધિકારો, લઘુમતી અને આદિજાતિ સલાહકાર સમિતિ', 'સરદાર પટેલ (પેટા-સમિતિ: મૂળભૂત અધિકાર — જે.બી. કૃપલાની; લઘુમતી — એચ.સી. મુખર્જી)'],
          ['૬. મુસદ્દા સમિતિ (Drafting Committee)', 'ડૉ. બી.આર. આંબેડકર'],
          ['૭. કાર્યવાહી નિયમ સમિતિ અને ૮. સંચાલન સમિતિ', 'ડૉ. રાજેન્દ્ર પ્રસાદ'],
        ],
      },
      summaryPointsEn: [
        '1934: M.N. Roy’s idea -> 1946: Cabinet Mission Plan (389 seats; 299 after Partition).',
        'Dec 9, 1946: First sitting (Sachchidananda Sinha); Dec 11: Rajendra Prasad President; Dec 13: Objectives Resolution.',
        'Aug 29, 1947: 7-member Drafting Committee chaired by Dr. B.R. Ambedkar.',
        'Nov 26, 1949: Adopted (Preamble, 395 Articles, 8 Schedules); Jan 26, 1950: Full commencement.',
        'National Flag adopted: July 22, 1947; National Anthem & Song: Jan 24, 1950.',
      ],
      summaryPointsGu: [
        '૧૯૩૪: એમ.એન. રોયનો વિચાર -> ૧૯૪૬: કેબિનેટ મિશન (૩૮૯ બેઠકો; ભાગલા પછી ૨૯૯).',
        '૯ ડિસે. ૧૯૪૬: પ્રથમ બેઠક (સચ્ચિદાનંદ સિંહા); ૧૧ ડિસે.: રાજેન્દ્ર પ્રસાદ અધ્યક્ષ; ૧૩ ડિસે.: ઉદ્દેશ્ય પ્રસ્તાવ.',
        '૨૯ ઓગસ્ટ ૧૯૪૭: ડૉ. બી.આર. આંબેડકરની અધ્યક્ષતામાં ૭ સભ્યોની મુસદ્દા સમિતિ.',
        '૨૬ નવે. ૧૯૪૯: સ્વીકાર (આમુખ, ૩૯૫ અનુચ્છેદ, ૮ અનુસૂચિ); ૨૬ જાન્યુ. ૧૯૫૦: સંપૂર્ણ અમલ.',
        'રાષ્ટ્રધ્વજ સ્વીકાર: ૨૨ જુલાઈ ૧૯૪૭; રાષ્ટ્રગીત અને રાષ્ટ્રગાન: ૨૪ જાન્યુઆરી ૧૯૫૦.',
      ],
    },

    // =========================================================================
    // CHAPTER 3: PREAMBLE OF THE CONSTITUTION
    // =========================================================================
    {
      id: 'polity-ch-03',
      chapterNumber: 3,
      partNumber: 1,
      partTitleEn: 'Part I: Constitutional Framework',
      partTitleGu: 'ભાગ ૧: બંધારણીય માળખું',
      titleEn: '3. Preamble of the Constitution',
      titleGu: '૩. બંધારણનું આમુખ (Preamble)',
      readingTimeMinutes: 10,
      status: 'published',
      examFocusEn:
        'Classic GPSC + UPSC Prelims & Mains topic: Exact sequence of words (Sovereign, Socialist, Secular, Democratic, Republic), 42nd Amendment (1976), and Berubari vs. Kesavananda Bharati cases.',
      examFocusGu:
        'GPSC અને UPSC પ્રિલિમ્સ તથા મેઈન્સ માટે મહત્વનો મુદ્દો: શબ્દોનો ચોક્કસ ક્રમ (સાર્વભૌમ, સમાજવાદી, બિનસાંપ્રદાયિક, લોકશાહી, પ્રજાસત્તાક), ૪૨મો સુધારો (૧૯૭૬), અને બેરુબારી vs કેશવાનંદ ભારતી કેસ.',
      sections: [
        {
          id: 'polity-ch-03-s1',
          headingEn: '3.1 Meaning, Source & Key Ideals of the Preamble',
          headingGu: '૩.૧ આમુખનો અર્થ, સ્ત્રોત અને મુખ્ય આદર્શો',
          simpleExplanationEn:
            'The Preamble is like the introduction and identity card of the Indian Constitution. Before you read 400+ Articles, the Preamble tells you in one single sentence: Who made this Constitution ("We, the People of India"), what kind of country India is (Sovereign, Socialist, Secular, Democratic, Republic), and what goals it promises every citizen (Justice, Liberty, Equality, Fraternity). It is based on Jawaharlal Nehru’s Objectives Resolution.',
          simpleExplanationGu:
            'આમુખ એ ભારતીય બંધારણની પ્રસ્તાવના અને ઓળખપત્ર (Identity Card) જેવું છે. ૪૦૦ થી વધુ અનુચ્છેદો વાંચતા પહેલા જ આમુખ એક વાક્યમાં જણાવે છે કે આ બંધારણ કોણે બનાવ્યું ("અમે ભારતના લોકોએ"), ભારત કેવો દેશ છે (સાર્વભૌમ, સમાજવાદી, બિનસાંપ્રદાયિક, લોકશાહી, પ્રજાસત્તાક) અને તે દરેક નાગરિકને કયા આદર્શોની ખાતરી આપે છે (ન્યાય, સ્વતંત્રતા, સમાનતા, બંધુતા). તે જવાહરલાલ નેહરુના ઉદ્દેશ્ય પ્રસ્તાવ પર આધારિત છે.',
          importantPointsEn: [
            'Source of Authority: "We, the People of India" — ultimate sovereignty lies with the people of India.',
            'Sovereign & Republic: India is neither a dependency nor a dominion; Commonwealth/UN membership does not limit sovereignty. Republic means an elected Head of State (President) with no privileged class.',
            'Socialist & Secular (42nd Amendment, 1976): India follows Democratic Socialism (mixed economy where public & private sectors coexist), NOT State Socialism; and Positive Secularism (Sarva Dharma Sambhava — equal respect & support to all religions).',
            'Democratic: Representative Parliamentary Democracy covering Political, Social, and Economic Democracy (Dr. Ambedkar noted political democracy cannot endure without social democracy).',
            'Global Roots of Ideals: Justice (Social, Economic, Political) is taken from the Russian Revolution (1917); Liberty, Equality, and Fraternity are taken from the French Revolution (1789).',
            '42nd Amendment (1976): The ONLY time the Preamble was amended, adding three words — Socialist, Secular, and Integrity. Adoption date mentioned: November 26, 1949.',
            'Famous Quotes: N.A. Palkhivala ("Identity card of the Constitution"); K.M. Munshi ("Horoscope of our sovereign democratic republic"); Thakur Das Bhargava ("Soul of the Constitution"); Sir Ernest Barker ("Key-note to the Constitution").',
          ],
          importantPointsGu: [
            'સત્તાનો સ્ત્રોત: "અમે ભારતના લોકો" — અંતિમ સાર્વભૌમત્વ ભારતની જનતામાં રહેલું છે.',
            'સાર્વભૌમ અને પ્રજાસત્તાક: ભારત કોઈ અન્ય દેશના નિયંત્રણમાં નથી (કોમનવેલ્થ કે UN નું સભ્યપદ સાર્વભૌમત્વ ઘટાડતું નથી). પ્રજાસત્તાક એટલે રાષ્ટ્રના વડા (રાષ્ટ્રપતિ) ચૂંટાયેલા હોય છે.',
            'સમાજવાદી અને બિનસાંપ્રદાયિક (૪૨મો સુધારો, ૧૯૭૬): ભારત "લોકશાહી સમાજવાદ" (મિશ્ર અર્થતંત્ર) અને "સકારાત્મક બિનસાંપ્રદાયિકતા" (સર્વ ધર્મ સમભાવ — બધા ધર્મોને સમાન સન્માન) અપનાવે છે.',
            'લોકશાહી: પ્રતિનિધિ સંસદીય લોકશાહી, જેમાં રાજકીય, સામાજિક અને આર્થિક લોકશાહીનો સમાવેશ થાય છે (ડૉ. આંબેડકર મુજબ સામાજિક લોકશાહી વિના રાજકીય લોકશાહી ટકી શકે નહીં).',
            'વૈશ્વિક પ્રેરણા: ન્યાય (સામાજિક, આર્થિક, રાજકીય) રશિયન ક્રાંતિ (૧૯૧૭) માંથી, જ્યારે સ્વતંત્રતા, સમાનતા અને બંધુતા ફ્રેન્ચ ક્રાંતિ (૧૭૮૯) માંથી લેવાયા છે.',
            '૪૨મો સુધારો (૧૯૭૬): આમુખમાં માત્ર એક જ વાર સુધારો થયો — સમાજવાદી, બિનસાંપ્રદાયિક અને અખંડિતતા શબ્દો ઉમેરાયા. આમુખમાં ઉલ્લેખિત તારીખ: ૨૬ નવેમ્બર, ૧૯૪૯.',
            'પ્રસિદ્ધ વિધાનો: એન.એ. પાલખીવાલા ("બંધારણનું ઓળખપત્ર"); કે.એમ. મુનશી ("સાર્વભૌમ લોકશાહી પ્રજાસત્તાકની જન્મકુંડળી"); ઠાકુર દાસ ભાર્ગવ ("બંધારણનો આત્મા"); અર્નેસ્ટ બાર્કર ("બંધારણની ચાવીરૂપ નોંધ").',
          ],
          realLifeExampleEn:
            'Why is India called a "Republic" while the UK is a "Democracy" but not a Republic? Because in India, the Head of State (the President) is elected—not a hereditary King or Queen. Any Indian citizen who meets the eligibility criteria can become President.',
          realLifeExampleGu:
            'બ્રિટન લોકશાહી હોવા છતાં "પ્રજાસત્તાક" નથી, જ્યારે ભારત "પ્રજાસત્તાક" (Republic) છે. કેમ? કારણ કે ભારતમાં રાષ્ટ્રના વડા (રાષ્ટ્રપતિ) વંશપરંપરાગત રાજા-રાણી નથી, પરંતુ ચૂંટાયેલા હોય છે—કોઈ પણ લાયક ભારતીય નાગરિક રાષ્ટ્રપતિ બની શકે છે.',
          keyTerms: [
            'Sovereign Socialist Secular Democratic Republic',
            '42nd Amendment (1976)',
            'Justice, Liberty, Equality, Fraternity',
          ],
        },
        {
          id: 'polity-ch-03-s2',
          headingEn: '3.2 Is the Preamble Part of the Constitution? (Supreme Court Cases)',
          headingGu: '૩.૨ શું આમુખ બંધારણનો ભાગ છે? (સુપ્રીમ કોર્ટના ચુકાદા)',
          simpleExplanationEn:
            'For many years, lawyers argued: "Is the Preamble actually part of the Constitution, or just a decorative preface?" In 1960 (Berubari case), the Supreme Court said it is NOT a part. But in 1973 (Kesavananda Bharati case), the Court corrected itself and declared that the Preamble IS an integral part of the Constitution and reflects its Basic Structure. However, you cannot go to court to enforce the Preamble directly by itself—it is non-justiciable.',
          simpleExplanationGu:
            'ઘણા વર્ષો સુધી ચર્ચા ચાલી કે શું આમુખ બંધારણનો ભાગ છે કે માત્ર પ્રસ્તાવના? ૧૯૬૦ ના બેરુબારી કેસમાં સુપ્રીમ કોર્ટે કહ્યું કે તે બંધારણનો ભાગ નથી. પરંતુ ૧૯૭૩ ના ઐતિહાસિક કેશવાનંદ ભારતી કેસમાં કોર્ટે પોતાનો નિર્ણય બદલ્યો અને સ્પષ્ટ કર્યું કે આમુખ બંધારણનો અવિભાજ્ય ભાગ છે અને તે બંધારણના "મૂળભૂત માળખા" (Basic Structure) ને દર્શાવે છે. જોકે, આમુખ ન્યાયયોગ્ય (Justiciable) નથી એટલે કે તેના આધારે સીધો કોર્ટમાં દાવો કરી શકાતો નથી.',
          importantPointsEn: [
            'Berubari Union Case (1960): Supreme Court held that the Preamble is NOT a part of the Constitution, though it acts as a key to open the minds of the makers.',
            'Kesavananda Bharati Case (1973): Supreme Court overruled Berubari and held that the Preamble IS a part of the Constitution and can be amended under Article 368, provided the "Basic Structure" is not destroyed.',
            'LIC of India Case (1995): Supreme Court reiterated that the Preamble is an integral part of the Constitution.',
            'Legal Status: Preamble is neither a source of power to legislature nor a prohibition upon legislature; it is non-justiciable.',
          ],
          importantPointsGu: [
            'બેરુબારી કેસ (૧૯૬૦): સુપ્રીમ કોર્ટે ચુકાદો આપ્યો કે આમુખ બંધારણનો ભાગ નથી, છતાં તે બંધારણ ઘડવૈયાઓના મનને સમજવાની ચાવી છે.',
            'કેશવાનંદ ભારતી કેસ (૧૯૭૩): સુપ્રીમ કોર્ટે ૧૯૬૦ નો ચુકાદો ઉલટાવી ઠરાવ્યું કે આમુખ બંધારણનો અવિભાજ્ય ભાગ છે અને અનુચ્છેદ ૩૬૮ હેઠળ તેમાં સુધારો થઈ શકે છે, પરંતુ "મૂળભૂત માળખા" (Basic Structure) ને નુકસાન ન થવું જોઈએ.',
            'LIC ઓફ ઈન્ડિયા કેસ (૧૯૯૫): સુપ્રીમ કોર્ટે ફરી પુષ્ટિ કરી કે આમુખ બંધારણનો અભિન્ન અંગ છે.',
            'કાનૂની દરજ્જો: આમુખ ધારાસભાને સત્તા આપતું નથી કે રોકતું નથી; તે ન્યાયયોગ્ય (Enforceable in court) નથી.',
          ],
          realLifeExampleEn:
            'Whenever a new law is challenged in the Supreme Court for violating secularism or democracy, judges read the Constitution alongside the Preamble to interpret its true spirit—even though no one files a case citing the Preamble alone.',
          realLifeExampleGu:
            'જ્યારે પણ કોઈ નવો કાયદો બિનસાંપ્રદાયિકતા કે લોકશાહીની વિરુદ્ધ હોવાનું જણાવી સુપ્રીમ કોર્ટમાં પડકારાય છે, ત્યારે ન્યાયાધીશો બંધારણની સાચી ભાવના સમજવા આમુખનો સહારો લે છે.',
          keyTerms: [
            'Berubari Case (1960)',
            'Kesavananda Bharati (1973)',
            'Basic Structure Doctrine',
            'Non-Justiciable',
          ],
        },
      ],
      summaryPointsEn: [
        'Based on Nehru’s Objectives Resolution; N.A. Palkhivala called it the "Identity Card of the Constitution".',
        'Exact State Nature: Sovereign, Socialist, Secular, Democratic, Republic.',
        'Amended only once (42nd Amendment, 1976): added Socialist, Secular, Integrity.',
        'Kesavananda Bharati (1973) & LIC (1995): Preamble IS an integral part of the Constitution, but non-justiciable.',
      ],
      summaryPointsGu: [
        'નેહરુના ઉદ્દેશ્ય પ્રસ્તાવ પર આધારિત; એન.એ. પાલખીવાલાએ તેને "બંધારણનું ઓળખપત્ર" કહ્યું.',
        'ચોક્કસ ક્રમ: સાર્વભૌમ, સમાજવાદી, બિનસાંપ્રદાયિક, લોકશાહી, પ્રજાસત્તાક.',
        'માત્ર એક જ વાર સુધારો (૪૨મો સુધારો, ૧૯૭૬): સમાજવાદી, બિનસાંપ્રદાયિક અને અખંડિતતા શબ્દો ઉમેરાયા.',
        'કેશવાનંદ ભારતી (૧૯૭૩) અને LIC (૧૯૯૫): આમુખ બંધારણનો ભાગ છે, પરંતુ ન્યાયયોગ્ય (Justiciable) નથી.',
      ],
    },

    // =========================================================================
    // CHAPTER 4: SALIENT FEATURES OF THE CONSTITUTION
    // =========================================================================
    {
      id: 'polity-ch-04',
      chapterNumber: 4,
      partNumber: 1,
      partTitleEn: 'Part I: Constitutional Framework',
      partTitleGu: 'ભાગ ૧: બંધારણીય માળખું',
      titleEn: '4. Salient Features of the Constitution',
      titleGu: '૪. બંધારણની મુખ્ય વિશેષતાઓ',
      readingTimeMinutes: 14,
      status: 'published',
      examFocusEn:
        'Very high-yield for Prelims: Borrowed features (Country -> Provision), all 12 Schedules, and scholars’ descriptions of Indian federalism (K.C. Wheare, Granville Austin).',
      examFocusGu:
        'પ્રિલિમ્સ માટે અત્યંત મહત્વપૂર્ણ: વિદેશી સ્ત્રોતો (કયા દેશમાંથી શું લેવાયું), તમામ ૧૨ અનુસૂચિઓ, અને ભારતીય સંઘવાદ વિશે વિદ્વાનોના વિધાનો.',
      sections: [
        {
          id: 'polity-ch-04-s1',
          headingEn: '4.1 Lengthiest Written Constitution, Rigidity + Flexibility & Federal-Unitary Blend',
          headingGu: '૪.૧ વિશ્વનું સૌથી લાંબું લેખિત બંધારણ, કઠોરતા + પરિવર્તનશીલતા અને સંઘીય માળખું',
          simpleExplanationEn:
            'India’s Constitution is the longest written Constitution in the world because it covers not just the Central Government, but also State Governments, Fundamental Rights, Directive Principles, Elections, Scheduled Areas, and detailed administrative rules—all in one single document. It is neither too rigid (impossible to change, like the US Constitution) nor too flexible (changed by an ordinary law, like the UK). Instead, some parts change easily by simple majority, while core federal parts require a special majority + half the states.',
          simpleExplanationGu:
            'ભારતનું બંધારણ વિશ્વનું સૌથી લાંબું લેખિત બંધારણ છે, કારણ કે તેમાં કેન્દ્ર ઉપરાંત રાજ્યો, મૂળભૂત અધિકારો, માર્ગદર્શક સિદ્ધાંતો, ચૂંટણી અને વહીવટી નિયમો બધું જ એક દસ્તાવેજમાં છે. તે અમેરિકાની જેમ અતિશય કઠોર પણ નથી અને બ્રિટનની જેમ સાવ લવચીક પણ નથી—તેમાં બંનેનો સમન્વય છે.',
          importantPointsEn: [
            'Original vs Current Size: Originally (1949) had a Preamble, 395 Articles (22 Parts), and 8 Schedules. Currently has ~448+ Articles (25 Parts) and 12 Schedules (9th added by 1st Amendment 1951; 10th by 52nd Amendment 1985; 11th by 73rd Amendment 1992; 12th by 74th Amendment 1992).',
            'Blend of Rigidity & Flexibility (Art. 368): Special majority of Parliament (2/3rd present & voting + >50% of total strength) OR Special majority + ratification by half of the States; simple majority amendments (e.g., Art. 2, 3, 169) lie outside Art. 368.',
            'Federal System with Unitary Bias: Two governments, division of powers, written supremacy vs. strong Centre, single Constitution, single citizenship, All-India Services, integrated judiciary, and Emergency provisions (Art. 352, 356, 360).',
            'Famous Descriptions: K.C. Wheare ("Quasi-federal"); Granville Austin ("Co-operative federalism"); Morris Jones ("Bargaining federalism"); Ivor Jennings ("Federation with a strong centralising tendency").',
          ],
          importantPointsGu: [
            'મૂળ vs વર્તમાન માળખું: મૂળ (૧૯૪૯) માં ૩૯૫ અનુચ્છેદ (૨૨ ભાગ) અને ૮ અનુસૂચિઓ હતી. હાલમાં ૨૫ ભાગ અને ૧૨ અનુસૂચિઓ છે (૯મી: ૧લો સુધારો ૧૯૫૧; ૧૦મી: ૫૨મો સુધારો ૧૯૮૫; ૧૧મી: ૭૩મો સુધારો ૧૯૯૨; ૧૨મી: ૭૪મો સુધારો ૧૯૯૨).',
            'કઠોર અને લવચીકનો સમન્વય (અનુચ્છેદ ૩૬૮): સંસદની વિશેષ બહુમતી અથવા વિશેષ બહુમતી + અડધા રાજ્યોની મંજૂરી; સાદી બહુમતીથી થતા સુધારા અનુચ્છેદ ૩૬૮ ની બહાર છે.',
            'એકાત્મક ઝુકાવ સાથેની સંઘીય વ્યવસ્થા: બે સ્તરની સરકાર અને સત્તાનું વિભાજન (સંઘીય લક્ષણ) + મજબૂત કેન્દ્ર, એકલ નાગરિકતા, અખિલ ભારતીય સેવાઓ, એકીકૃત ન્યાયતંત્ર (એકાત્મક લક્ષણ).',
            'પ્રસિદ્ધ વર્ણનો: કે.સી. વ્હીયર ("અર્ધ-સંઘીય / Quasi-federal"); ગ્રેનવિલ ઓસ્ટિન ("સહકારી સંઘવાદ"); મોરિસ જોન્સ ("સોદાબાજીનો સંઘવાદ").',
          ],
          realLifeExampleEn:
            'When India introduced GST in 2017 (101st Amendment), Parliament needed BOTH a 2/3rd special majority AND ratification by at least half of India’s State Assemblies (including Gujarat)—showing how India’s Constitution protects federal balance on tax powers.',
          realLifeExampleGu:
            '૨૦૧૭ માં GST (૧૦૧મો સુધારો) લાવતી વખતે સંસદની ૨/૩ વિશેષ બહુમતી ઉપરાંત ઓછામાં ઓછા અડધા રાજ્યોની વિધાનસભાઓની મંજૂરી લેવી પડી હતી—જે સંઘીય સંતુલનનું જીવંત ઉદાહરણ છે.',
          keyTerms: [
            '395 Articles, 12 Schedules',
            'Quasi-federal (K.C. Wheare)',
            'Article 368',
          ],
        },
        {
          id: 'polity-ch-04-s2',
          headingEn: '4.2 Parliamentary System, Synthesis of Supremacies & Key Democratic Pillars',
          headingGu: '૪.૨ સંસદીય પ્રણાલી, ન્યાયિક સમીક્ષા અને લોકશાહીના સ્તંભો',
          simpleExplanationEn:
            'India chose the British Parliamentary system where the executive (Prime Minister & Cabinet) is part of and accountable to the Parliament. At the same time, India balanced Parliament’s power with an independent Supreme Court that can strike down unconstitutional laws. Other defining features include Universal Adult Franchise (18+ voting), Single Citizenship across all states, Independent Constitutional Bodies (ECI, CAG, UPSC), and a unique Three-Tier Government (Centre, States, and Panchayats/Municipalities).',
          simpleExplanationGu:
            'ભારતે બ્રિટિશ સંસદીય પ્રણાલી અપનાવી જેમાં વડાપ્રધાન અને મંત્રીમંડળ સંસદને જવાબદાર હોય છે. સાથે જ સંસદની સત્તા અને ન્યાયતંત્રની સર્વોપરિતા વચ્ચે સંતુલન રાખ્યું છે. ઉપરાંત ૧૮+ વયના સૌને મતાધિકાર, એકલ નાગરિકતા, સ્વતંત્ર સંસ્થાઓ (ECI, CAG, UPSC) અને ત્રિ-સ્તરીય સરકાર (કેન્દ્ર, રાજ્ય અને પંચાયત/નગરપાલિકા) તેની ઓળખ છે.',
          importantPointsEn: [
            'Synthesis of Parliamentary Sovereignty (UK) & Judicial Supremacy (USA): Indian Parliament can amend most of the Constitution, while Supreme Court can declare laws void if they violate Fundamental Rights or Basic Structure.',
            'Universal Adult Franchise: Voting age lowered from 21 to 18 years by the 61st Constitutional Amendment Act, 1988 (came into force in 1989).',
            'Fundamental Duties (Part IVA, Art. 51A): Added by 42nd Amendment (1976) on Swaran Singh Committee’s recommendation (10 duties; 11th duty added by 86th Amendment, 2002).',
            'Three-Tier Government & Co-operatives: 73rd & 74th Amendments (1992) added Parts IX and IXA (Panchayats & Municipalities); 97th Amendment (2011) gave constitutional status to Co-operative Societies (Part IXB).',
          ],
          importantPointsGu: [
            'સંસદીય સાર્વભૌમત્વ (UK) અને ન્યાયિક સર્વોપરિતા (USA) નો સમન્વય: સંસદ બંધારણમાં સુધારો કરી શકે છે, પરંતુ સુપ્રીમ કોર્ટ મૂળભૂત માળખા કે અધિકારોનો ભંગ કરતા કાયદા રદ કરી શકે છે.',
            'સાર્વત્રિક પુખ્ત મતાધિકાર: ૬૧મા બંધારણીય સુધારા (૧૯૮૮, અમલ ૧૯૮૯) દ્વારા મતદાનની ઉંમર ૨૧ થી ઘટાડી ૧૮ વર્ષ કરવામાં આવી.',
            'મૂળભૂત ફરજો (ભાગ ૪A, અનુચ્છેદ ૫૧A): સ્વર્ણ સિંહ સમિતિની ભલામણથી ૪૨મા સુધારા (૧૯૭૬) દ્વારા ૧૦ ફરજો ઉમેરાઈ (૮૬મા સુધારા, ૨૦૦૨ થી ૧૧મી ફરજ ઉમેરાઈ).',
            'ત્રિ-સ્તરીય સરકાર અને સહકારી મંડળીઓ: ૭૩મા અને ૭૪મા સુધારા (૧૯૯૨) થી પંચાયતી રાજ અને નગરપાલિકાઓ (ભાગ ૯, ૯A) તથા ૯૭મા સુધારા (૨૦૧૧) થી સહકારી મંડળીઓ (ભાગ ૯B) ને બંધારણીય દરજ્જો મળ્યો.',
          ],
          realLifeExampleEn:
            'Whether you live in Gujarat, Maharashtra, or Assam, you hold only one Indian Citizenship and one Voter ID valid anywhere in India—unlike the USA where citizens hold both US and State citizenship.',
          realLifeExampleGu:
            'તમે ગુજરાતમાં રહો કે આસામમાં, તમારી પાસે માત્ર એક જ "ભારતીય નાગરિકતા" હોય છે—અમેરિકાની જેમ દેશ અને રાજ્યની અલગ-અલગ બેવડી નાગરિકતા હોતી નથી.',
          keyTerms: [
            '61st Amendment (18 Years)',
            'Swaran Singh Committee',
            '73rd & 74th Amendments',
            '97th Amendment (Co-operatives)',
          ],
        },
      ],
      comparisonTable: {
        titleEn: 'Borrowed Features of the Indian Constitution (Complete Exam Table)',
        titleGu: 'ભારતીય બંધારણના વિદેશી સ્ત્રોતો (સંપૂર્ણ પરીક્ષાલક્ષી કોષ્ટક)',
        headersEn: ['Source Country / Act', 'Features Borrowed'],
        headersGu: ['સ્ત્રોત (દેશ / અધિનિયમ)', 'લેવામાં આવેલી જોગવાઈઓ'],
        rowsEn: [
          ['GOI Act of 1935', 'Federal Scheme, Office of Governor, Judiciary, Public Service Commissions, Emergency provisions, Administrative details'],
          ['British Constitution', 'Parliamentary government, Rule of Law, Legislative procedure, Single citizenship, Cabinet system, Prerogative writs, Parliamentary privileges, Bicameralism'],
          ['US Constitution', 'Fundamental Rights, Independence of Judiciary, Judicial Review, Impeachment of President, Removal of SC & HC judges, Post of Vice-President'],
          ['Irish Constitution', 'Directive Principles of State Policy (DPSP), Nomination of members to Rajya Sabha, Method of election of President'],
          ['Canadian Constitution', 'Federation with a strong Centre, Residuary powers with Centre, Appointment of State Governors by Centre, Advisory jurisdiction of SC'],
          ['Australian Constitution', 'Concurrent List, Freedom of trade, commerce & intercourse, Joint sitting of two Houses of Parliament'],
          ['Weimar Constitution (Germany)', 'Suspension of Fundamental Rights during Emergency'],
          ['Soviet Constitution (USSR)', 'Fundamental Duties, Ideal of Justice (social, economic, political) in Preamble'],
          ['French Constitution', 'Republic and ideals of Liberty, Equality & Fraternity in Preamble'],
          ['South African Constitution', 'Procedure for Amendment of Constitution, Election of members of Rajya Sabha'],
          ['Japanese Constitution', 'Procedure established by Law'],
        ],
        rowsGu: [
          ['ભારત સરકાર અધિનિયમ ૧૯૩૫', 'સંઘીય માળખું, રાજ્યપાલનું પદ, ન્યાયતંત્ર, જાહેર સેવા આયોગ, કટોકટીની જોગવાઈઓ'],
          ['બ્રિટિશ બંધારણ', 'સંસદીય શાસન, કાયદાનું શાસન (Rule of Law), એકલ નાગરિકતા, કેબિનેટ પ્રણાલી, રિટ (Writs), દ્વિગૃહી વ્યવસ્થા'],
          ['અમેરિકન બંધારણ', 'મૂળભૂત અધિકારો, ન્યાયતંત્રની સ્વતંત્રતા, ન્યાયિક સમીક્ષા, રાષ્ટ્રપતિ પર મહાભિયોગ, SC/HC ન્યાયાધીશોને હટાવવાની રીત, ઉપરાષ્ટ્રપતિ પદ'],
          ['આયર્લેન્ડનું બંધારણ', 'રાજ્યનીતિના માર્ગદર્શક સિદ્ધાંતો (DPSP), રાજ્યસભામાં સભ્યોની નિમણૂક, રાષ્ટ્રપતિની ચૂંટણી પદ્ધતિ'],
          ['કેનેડાનું બંધારણ', 'મજબૂત કેન્દ્ર સાથેનું સંઘીય માળખું, શેષ સત્તાઓ (Residuary Powers) કેન્દ્ર પાસે, કેન્દ્ર દ્વારા રાજ્યપાલની નિમણૂક, SC નું સલાહકારી ક્ષેત્રાધિકાર'],
          ['ઓસ્ટ્રેલિયાનું બંધારણ', 'સમવર્તી યાદી (Concurrent List), વેપાર-વાણિજ્યની સ્વતંત્રતા, સંસદના બંને ગૃહોની સંયુક્ત બેઠક'],
          ['જર્મની (વાઈમર બંધારણ)', 'કટોકટી દરમિયાન મૂળભૂત અધિકારોની મોકૂફી'],
          ['સોવિયેત સંઘ (USSR)', 'મૂળભૂત ફરજો, આમુખમાં ન્યાયનો આદર્શ (સામાજિક, આર્થિક, રાજકીય)'],
          ['ફ્રાન્સનું બંધારણ', 'પ્રજાસત્તાક અને આમુખમાં સ્વતંત્રતા, સમાનતા તથા બંધુતાના આદર્શો'],
          ['દક્ષિણ આફ્રિકાનું બંધારણ', 'બંધારણમાં સુધારો કરવાની પ્રક્રિયા, રાજ્યસભાના સભ્યોની ચૂંટણી'],
          ['જાપાનનું બંધારણ', 'કાયદા દ્વારા સ્થાપિત પ્રક્રિયા (Procedure established by Law)'],
        ],
      },
      summaryPointsEn: [
        'Originally 395 Articles, 22 Parts, 8 Schedules -> Now ~448+ Articles, 25 Parts, 12 Schedules.',
        'K.C. Wheare: "Quasi-federal"; Granville Austin: "Co-operative federalism".',
        '61st Amendment (1988): Voting age 21 -> 18; 42nd Amendment (1976): Fundamental Duties; 73rd/74th (1992): Local Govt; 97th (2011): Co-operatives.',
        'Master the Borrowed Features table—at least 1 Prelims question frequently comes directly from it.',
      ],
      summaryPointsGu: [
        'મૂળ ૩૯૫ અનુચ્છેદ, ૨૨ ભાગ, ૮ અનુસૂચિ -> હાલ ૨૫ ભાગ, ૧૨ અનુસૂચિ.',
        'કે.સી. વ્હીયર: "અર્ધ-સંઘીય"; ગ્રેનવિલ ઓસ્ટિન: "સહકારી સંઘવાદ".',
        '૬૧મો સુધારો (૧૯૮૮): મતદાન ઉંમર ૨૧ -> ૧૮; ૪૨મો (૧૯૭૬): મૂળભૂત ફરજો; ૭૩/૭૪મો (૧૯૯૨): પંચાયત/નગરપાલિકા.',
        'વિદેશી સ્ત્રોતોનું કોષ્ટક પ્રિલિમ્સ માટે અત્યંત મહત્વપૂર્ણ છે.',
      ],
    },

    // =========================================================================
    // CHAPTER 5: UNION AND ITS TERRITORY (ARTICLES 1-4)
    // =========================================================================
    {
      id: 'polity-ch-05',
      chapterNumber: 5,
      partNumber: 1,
      partTitleEn: 'Part I: Constitutional Framework',
      partTitleGu: 'ભાગ ૧: બંધારણીય માળખું',
      titleEn: '5. Union and Its Territory (Articles 1–4)',
      titleGu: '૫. સંઘ અને તેનું રાજ્યક્ષેત્ર (અનુચ્છેદ ૧–૪)',
      readingTimeMinutes: 13,
      status: 'published',
      examFocusEn:
        'Key Prelims & GPSC Mains focus: Articles 1–4, "Union of States" vs "Federation", Berubari Union Case (1960) & 100th Amendment (2015), Dhar/JVP/Fazl Ali Commissions, and Creation of Gujarat (May 1, 1960).',
      examFocusGu:
        'પ્રિલિમ્સ અને GPSC મેઈન્સ માટે મહત્વપૂર્ણ: અનુચ્છેદ ૧–૪, "રાજ્યોનો સંઘ", બેરુબારી કેસ (૧૯૬૦) અને ૧૦૦મો સુધારો (૨૦૧૫), ધર/JVP/ફઝલ અલી આયોગ, અને ગુજરાતની સ્થાપના (૧ મે ૧૯૬૦).',
      sections: [
        {
          id: 'polity-ch-05-s1',
          headingEn: '5.1 Articles 1–4 & Ceding Territory (Berubari Case)',
          headingGu: '૫.૧ અનુચ્છેદ ૧–૪ અને પ્રદેશ સોંપવાની પ્રક્રિયા (બેરુબારી કેસ)',
          simpleExplanationEn:
            'Article 1 names our country "India, that is Bharat" and calls it a "Union of States"—meaning states did not sign a treaty to join India, and no state can leave (secede from) India. Under Articles 2–4, Parliament has full power to admit new states or redraw state boundaries/names by a simple majority—even if the state assembly disagrees. That is why India is called "an indestructible Union of destructible states". However, giving away Indian territory to a foreign country requires a Constitutional Amendment under Article 368.',
          simpleExplanationGu:
            'અનુચ્છેદ ૧ આપણા દેશને "ઈન્ડિયા, અર્થાત ભારત" તરીકે ઓળખાવે છે અને તેને "રાજ્યોનો સંઘ" (Union of States) કહે છે—એટલે કે કોઈ પણ રાજ્ય ભારતથી અલગ થઈ શકતું નથી. અનુચ્છેદ ૨–૪ હેઠળ સંસદ સાદી બહુમતીથી નવા રાજ્યો બનાવી શકે છે કે સરહદો/નામો બદલી શકે છે. જોકે, ભારતનો કોઈ પ્રદેશ વિદેશી દેશને આપવો હોય તો અનુચ્છેદ ૩૬૮ હેઠળ બંધારણીય સુધારો કરવો પડે છે.',
          importantPointsEn: [
            'Article 1: "India, that is Bharat, shall be a Union of States." "Territory of India" (States + UTs + Acquired territories) is a wider expression than "Union of India" (only States).',
            'Article 2: Admission or establishment of new states (not already part of the Union of India, e.g., Sikkim).',
            'Article 3: Formation of new states & alteration of areas, boundaries, or names of existing states. Two conditions: (1) Prior recommendation of the President, (2) President must refer the bill to the concerned State Legislature for its views within a specified period—views are NOT binding.',
            'Article 4: Laws made under Articles 2 and 3 are passed by simple majority and are NOT considered amendments under Article 368.',
            'Berubari Union Case (1960): SC held Parliament CANNOT cede Indian territory to a foreign state under Art. 3; it requires a Constitutional Amendment under Art. 368 (9th Amendment, 1960; also 100th Amendment, 2015 for India–Bangladesh Land Boundary Agreement). Settling a boundary dispute without ceding territory can be done by executive action (1969 SC ruling).',
          ],
          importantPointsGu: [
            'અનુચ્છેદ ૧: "ઈન્ડિયા, અર્થાત ભારત, રાજ્યોનો સંઘ રહેશે." "ભારતનું રાજ્યક્ષેત્ર" (રાજ્યો + UT + સંપાદિત પ્રદેશો) એ "ભારત સંઘ" (માત્ર રાજ્યો) કરતાં વ્યાપક શબ્દ છે.',
            'અનુચ્છેદ ૨: નવા રાજ્યોનો પ્રવેશ કે સ્થાપના (જે પહેલાં ભારતનો ભાગ ન હોય, દા.ત. સિક્કિમ).',
            'અનુચ્છેદ ૩: હાલના રાજ્યોમાંથી નવા રાજ્યોનું નિર્માણ, વિસ્તાર, સરહદ કે નામમાં ફેરફાર. ૨ શરતો: (૧) રાષ્ટ્રપતિની પૂર્વ મંજૂરી, (૨) સંબંધિત રાજ્ય વિધાનમંડળનો અભિપ્રાય મંગાવવો (પરંતુ અભિપ્રાય સંસદ માટે બંધનકર્તા નથી).',
            'અનુચ્છેદ ૪: અનુચ્છેદ ૨ અને ૩ હેઠળના કાયદા સાદી બહુમતીથી પસાર થાય છે અને તેને અનુચ્છેદ ૩૬૮ હેઠળ સુધારો ગણાતો નથી.',
            'બેરુબારી કેસ (૧૯૬૦): સુપ્રીમ કોર્ટે ઠરાવ્યું કે વિદેશી દેશને ભારતીય પ્રદેશ સોંપવા અનુચ્છેદ ૩૬૮ હેઠળ સુધારો જરૂરી છે (૯મો સુધારો ૧૯૬૦; ભારત-બાંગ્લાદેશ સરહદ કરાર માટે ૧૦૦મો સુધારો ૨૦૧૫).',
          ],
          realLifeExampleEn:
            'When Telangana was carved out of Andhra Pradesh in 2014, the Andhra Pradesh Assembly opposed the bifurcation—yet Parliament passed the bill by simple majority under Article 3 because state views are advisory, not binding.',
          realLifeExampleGu:
            '૨૦૧૪ માં આંધ્રપ્રદેશમાંથી તેલંગાણા અલગ કરાયું ત્યારે આંધ્રપ્રદેશ વિધાનસભાએ વિરોધ કર્યો હતો, છતાં સંસદે અનુચ્છેદ ૩ હેઠળ સાદી બહુમતીથી કાયદો પસાર કર્યો કારણ કે રાજ્યનો અભિપ્રાય બંધનકર્તા નથી.',
          keyTerms: [
            'Union of States (Art. 1)',
            'Article 3 (Simple Majority)',
            'Berubari Case (1960)',
            '100th Amendment (2015)',
          ],
        },
        {
          id: 'polity-ch-05-s2',
          headingEn: '5.2 Evolution of States, Linguistic Reorganization & Creation of Gujarat',
          headingGu: '૫.૨ રાજ્યોનું પુનર્ગઠન અને ગુજરાત રાજ્યની સ્થાપના',
          simpleExplanationEn:
            'At independence, India had 552 princely states and British provinces—Patel, Nehru, and V.P. Menon integrated 549 smoothly (and Hyderabad via Police Action, Junagadh via Referendum, Kashmir via Instrument of Accession). Next came the demand for states based on language. After early hesitation (Dhar & JVP), Andhra State was created in 1953, followed by the Fazl Ali Commission (1953–55) and the States Reorganisation Act 1956 (14 States + 6 UTs). In 1960, Bombay State split into Maharashtra and Gujarat.',
          simpleExplanationGu:
            'આઝાદી સમયે ૫૫૨ દેશી રજવાડાંમાંથી ૫૪૯ સરળતાથી જોડાયા (હૈદરાબાદ પોલીસ કાર્યવાહીથી, જૂનાગઢ લોકમતથી, કાશ્મીર વિલીનીકરણ પત્રથી). ત્યારબાદ ભાષાના આધારે રાજ્યોની માંગ ઊઠી. ૧૯૫૩ માં આંધ્ર પ્રથમ ભાષાકીય રાજ્ય બન્યું અને ૧૯૫૬ માં ૧૪ રાજ્યો અને ૬ કેન્દ્રશાસિત પ્રદેશો રચાયા. ૧ મે ૧૯૬૦ ના રોજ બોમ્બે રાજ્યનું વિભાજન થઈ ગુજરાત ૧૫મું રાજ્ય બન્યું.',
          importantPointsEn: [
            'Dhar Commission (1948) & JVP Committee (1948–49 — Nehru, Patel, Pattabhi Sitaramayya): Rejected language as the basis for state reorganization, favouring administrative convenience.',
            'First Linguistic State (Oct 1953): Andhra State created from Madras after Potti Sriramulu’s 56-day hunger strike.',
            'Fazl Ali Commission (1953–55): 3 members (Fazl Ali, K.M. Panikkar, H.N. Kunzru); accepted language broadly as a basis but rejected "one language–one state".',
            'States Reorganisation Act 1956 & 7th Amendment (1956): Abolished Part A/B/C/D states; created 14 States and 6 UTs.',
            'Creation of Gujarat (May 1, 1960): Bombay Reorganisation Act 1960 bifurcated Bombay State into Maharashtra and Gujarat (15th State of India).',
            'Later Additions -> Present (28 States, 8 UTs): Nagaland (1963), Haryana (1966), Himachal Pradesh (1971), Manipur/Tripura/Meghalaya (1972), Sikkim (35th & 36th Amendments 1974–75, 22nd State), Mizoram/Arunachal/Goa (1987), Chhattisgarh/Uttarakhand/Jharkhand (2000), Telangana (2014), J&K Reorganisation Act 2019 (J&K & Ladakh UTs from Oct 31, 2019; DNH & Daman-Diu merged Jan 26, 2020).',
          ],
          importantPointsGu: [
            'ધર આયોગ (૧૯૪૮) અને JVP સમિતિ (૧૯૪૮–૪૯): વહીવટી સુવિધાને પ્રાધાન્ય આપી ભાષાના આધારે રાજ્યોની માંગ નકારી.',
            'પ્રથમ ભાષાકીય રાજ્ય (ઓક્ટોબર ૧૯૫૩): પોટ્ટી શ્રીરામુલુના ૫૬ દિવસના ઉપવાસ બાદ મદ્રાસમાંથી આંધ્ર રાજ્યની રચના.',
            'ફઝલ અલી આયોગ (૧૯૫૩–૫૫): ૩ સભ્યો (ફઝલ અલી, કે.એમ. પણિક્કર, એચ.એન. કુંઝરુ); ભાષાને આધાર ગણ્યો પરંતુ "એક ભાષા–એક રાજ્ય" નો સિદ્ધાંત નકાર્યો.',
            'રાજ્ય પુનર્ગઠન અધિનિયમ ૧૯૫૬ અને ૭મો સુધારો: ૧૪ રાજ્યો અને ૬ કેન્દ્રશાસિત પ્રદેશોની રચના.',
            'ગુજરાતની સ્થાપના (૧ મે ૧૯૬૦): બોમ્બે પુનર્ગઠન અધિનિયમ ૧૯૬૦ દ્વારા મહારાષ્ટ્ર અને ગુજરાત (ભારતનું ૧૫મું રાજ્ય) અલગ થયા.',
            'હાલની સ્થિતિ (૨૮ રાજ્યો, ૮ UT): સિક્કિમ (૩૬મો સુધારો ૧૯૭૫), છત્તીસગઢ/ઉત્તરાખંડ/ઝારખંડ (૨૦૦૦), તેલંગાણા (૨૦૧૪), જમ્મુ-કાશ્મીર અને લદ્દાખ UT (૩૧ ઓક્ટોબર ૨૦૧૯), દાદરા-નગર હવેલી અને દમણ-દીવનું વિલીનીકરણ (૨૬ જાન્યુ. ૨૦૨૦).',
          ],
          realLifeExampleEn:
            'Every year on May 1, Gujarat celebrates "Gujarat Gaurav Din" (Gujarat Foundation Day) to commemorate May 1, 1960, when Gujarat became India’s 15th State under the Bombay Reorganisation Act, 1960.',
          realLifeExampleGu:
            'દર વર્ષે ૧ મે ના રોજ ગુજરાતમાં "ગુજરાત ગૌરવ દિન" ઉજવાય છે, કારણ કે ૧ મે ૧૯૬૦ ના રોજ બોમ્બે પુનર્ગઠન અધિનિયમ હેઠળ ગુજરાત ભારતનું ૧૫મું રાજ્ય બન્યું હતું.',
          keyTerms: [
            'Dhar & JVP Committee',
            'Fazl Ali Commission (1953)',
            'Gujarat (15th State, 1960)',
            '28 States & 8 UTs',
          ],
        },
      ],
      summaryPointsEn: [
        'Art. 1: "India, that is Bharat, shall be a Union of States" — states have no right to secede.',
        'Art. 2–4: Simple majority for new states/boundary changes; state views under Art. 3 are not binding.',
        'Berubari (1960): Ceding territory to a foreign nation needs Art. 368 amendment (e.g., 9th & 100th Amendments).',
        '1956 Act: 14 States & 6 UTs -> Gujarat became 15th State on May 1, 1960 -> Today 28 States & 8 UTs.',
      ],
      summaryPointsGu: [
        'અનુચ્છેદ ૧: "ભારત રાજ્યોનો સંઘ રહેશે" — રાજ્યોને અલગ થવાનો અધિકાર નથી.',
        'અનુચ્છેદ ૨–૪: સાદી બહુમતીથી નવા રાજ્યો/સરહદ ફેરફાર; રાજ્યનો અભિપ્રાય બંધનકર્તા નથી.',
        'બેરુબારી (૧૯૬૦): વિદેશને પ્રદેશ આપવા અનુચ્છેદ ૩૬૮ હેઠળ સુધારો જરૂરી (૯મો અને ૧૦૦મો સુધારો).',
        '૧૯૫૬: ૧૪ રાજ્યો, ૬ UT -> ૧ મે ૧૯૬૦: ગુજરાત ૧૫મું રાજ્ય -> હાલ ૨૮ રાજ્યો અને ૮ UT.',
      ],
    },

    // =========================================================================
    // CHAPTER 6: CITIZENSHIP (ARTICLES 5-11)
    // =========================================================================
    {
      id: 'polity-ch-06',
      chapterNumber: 6,
      partNumber: 1,
      partTitleEn: 'Part I: Constitutional Framework',
      partTitleGu: 'ભાગ ૧: બંધારણીય માળખું',
      titleEn: '6. Citizenship (Articles 5–11)',
      titleGu: '૬. નાગરિકતા (અનુચ્છેદ ૫–૧૧)',
      readingTimeMinutes: 12,
      status: 'published',
      examFocusEn:
        'Important for UPSC & GPSC Prelims: Articles 5–11 scope (Jan 26, 1950 only), 5 ways of acquisition & 3 ways of loss under Citizenship Act 1955, Single Citizenship, and NRI vs OCI rights.',
      examFocusGu:
        'UPSC અને GPSC પ્રિલિમ્સ માટે મહત્વપૂર્ણ: અનુચ્છેદ ૫–૧૧, નાગરિકતા અધિનિયમ ૧૯૫૫ હેઠળ નાગરિકતા મેળવવાની ૫ રીતો અને ગુમાવવાની ૩ રીતો, એકલ નાગરિકતા, અને NRI vs OCI.',
      sections: [
        {
          id: 'polity-ch-06-s1',
          headingEn: '6.1 Constitutional Provisions (Part II: Articles 5–11)',
          headingGu: '૬.૧ બંધારણીય જોગવાઈઓ (ભાગ ૨: અનુચ્છેદ ૫–૧૧)',
          simpleExplanationEn:
            'The Constitution does NOT lay down permanent rules for who becomes a citizen in the future—it only decided who became an Indian citizen on Republic Day (January 26, 1950) after Partition. For everything after 1950, Article 11 gave Parliament full power to make citizenship laws, which Parliament did through the Citizenship Act of 1955.',
          simpleExplanationGu:
            'બંધારણમાં ભવિષ્યની કાયમી નાગરિકતાના નિયમો નથી—તેમાં માત્ર ૨૬ જાન્યુઆરી ૧૯૫૦ (પ્રજાસત્તાક દિન) ના રોજ કોણ ભારતીય નાગરિક ગણાશે તે નક્કી કરાયું છે. ત્યારબાદના નિયમો બનાવવાની સંપૂર્ણ સત્તા અનુચ્છેદ ૧૧ દ્વારા સંસદને આપવામાં આવી છે (નાગરિકતા અધિનિયમ, ૧૯૫૫).',
          importantPointsEn: [
            'Article 5: Citizenship at commencement (Jan 26, 1950) by domicile + birth in India / either parent born in India / ordinarily resident for 5 years immediately before commencement.',
            'Article 6: Rights of citizenship of persons who migrated to India from Pakistan (cut-off date: July 19, 1948).',
            'Article 7: Persons who migrated to Pakistan after March 1, 1947, and returned to India under a permit for permanent resettlement.',
            'Article 8: Persons of Indian origin residing outside India (registered with diplomatic/consular representative).',
            'Article 9: Person voluntarily acquiring citizenship of a foreign State ceases to be an Indian citizen (enforces Single Citizenship).',
            'Articles 10 & 11: Continuance of citizenship rights; Article 11 gives Parliament plenary power to regulate acquisition and termination of citizenship.',
          ],
          importantPointsGu: [
            'અનુચ્છેદ ૫: બંધારણના આરંભે (૨૬ જાન્યુ. ૧૯૫૦) ભારતમાં નિવાસ (Domicile) અને જન્મ/માતા-પિતા/૫ વર્ષના વસવાટના આધારે નાગરિકતા.',
            'અનુચ્છેદ ૬: પાકિસ્તાનથી ભારત સ્થળાંતરિત થયેલા વ્યક્તિઓની નાગરિકતા (કટ-ઓફ તારીખ: ૧૯ જુલાઈ ૧૯૪૮).',
            'અનુચ્છેદ ૭: ૧ માર્ચ ૧૯૪૭ પછી પાકિસ્તાન ગયેલા અને કાયમી વસવાટ માટે ભારત પરત ફરેલા વ્યક્તિઓ.',
            'અનુચ્છેદ ૮: ભારત બહાર રહેતા ભારતીય મૂળના વ્યક્તિઓની નાગરિકતા.',
            'અનુચ્છેદ ૯: જો કોઈ વ્યક્તિ સ્વેચ્છાએ વિદેશી દેશની નાગરિકતા સ્વીકારે, તો તેની ભારતીય નાગરિકતા સમાપ્ત થાય છે.',
            'અનુચ્છેદ ૧૦ અને ૧૧: નાગરિકતાના અધિકારોનું ચાલુ રહેવું; અનુચ્છેદ ૧૧ સંસદને નાગરિકતા અંગે કાયદા બનાવવાની સંપૂર્ણ સત્તા આપે છે.',
          ],
          realLifeExampleEn:
            'Because of Article 9 and Single Citizenship, if an Indian citizen takes citizenship of Canada or the UK, their Indian passport and citizenship automatically end—they must surrender their Indian passport.',
          realLifeExampleGu:
            'અનુચ્છેદ ૯ અને એકલ નાગરિકતાને કારણે, જો કોઈ ભારતીય નાગરિક કેનેડા કે બ્રિટનની નાગરિકતા સ્વીકારે, તો તેની ભારતીય નાગરિકતા આપોઆપ સમાપ્ત થઈ જાય છે.',
          keyTerms: [
            'Articles 5–11',
            'July 19, 1948 Cut-off',
            'Article 9 (No Dual Citizenship)',
            'Article 11 (Parliament Power)',
          ],
        },
        {
          id: 'polity-ch-06-s2',
          headingEn: '6.2 Citizenship Act 1955 (Acquisition, Loss) & NRI vs OCI',
          headingGu: '૬.૨ નાગરિકતા અધિનિયમ ૧૯૫૫ (પ્રાપ્તિ, સમાપ્તિ) અને NRI vs OCI',
          simpleExplanationEn:
            'Under the Citizenship Act, 1955, there are 5 ways to acquire Indian citizenship (Birth, Descent, Registration, Naturalisation, Incorporation of Territory) and 3 ways to lose it (Renunciation, Termination, Deprivation). Many people confuse NRIs with OCIs: an NRI is a full Indian citizen living abroad (with voting rights), whereas an OCI cardholder is a foreign citizen of Indian origin who gets lifelong visa-free travel to India—but cannot vote or hold constitutional posts.',
          simpleExplanationGu:
            'નાગરિકતા અધિનિયમ ૧૯૫૫ હેઠળ ભારતીય નાગરિકતા મેળવવાની ૫ રીતો (જન્મ, વંશ, નોંધણી, દેશીયકરણ, પ્રદેશનો સમાવેશ) અને ગુમાવવાની ૩ રીતો (ત્યાગ, સમાપ્તિ, વંચિત કરવું) છે. NRI એ વિદેશમાં રહેતો સંપૂર્ણ ભારતીય નાગરિક છે (મતદાન અધિકાર સાથે), જ્યારે OCI એ ભારતીય મૂળનો વિદેશી નાગરિક છે જેને ભારત આવવા માટે આજીવન વિઝા મળે છે—પરંતુ મતદાન કે બંધારણીય પદનો અધિકાર નથી.',
          importantPointsEn: [
            '5 Ways of Acquisition (Act of 1955): (1) Birth (cut-offs: Jan 26, 1950; July 1, 1987; Dec 3, 2004), (2) Descent (cut-offs: Dec 10, 1992; Dec 3, 2004), (3) Registration, (4) Naturalisation, (5) Incorporation of Territory (e.g., Puducherry 1962, Sikkim 1975).',
            '3 Ways of Loss: (1) Renunciation (voluntary declaration), (2) Termination (automatic upon acquiring foreign citizenship), (3) Deprivation (compulsory termination by Central Govt for fraud, disloyalty, 2+ years imprisonment within 5 years of registration/naturalisation, or 7 years continuous residence abroad).',
            'Single Citizenship Exceptions: Parliament can prescribe residence in a state as a condition for certain public employment (Art. 16(3)), and states can protect Scheduled Tribes’ interests (Art. 19(5)).',
            'NRI vs OCI: PIO scheme merged with OCI in 2015. OCI is NOT dual citizenship; OCI cardholders have parity with NRIs in economic/financial/educational fields (except agricultural/plantation land purchase), but NO voting rights (Art. 326), NO public employment equality (Art. 16), and CANNOT contest elections or hold President/VP/Judge/MP/MLA posts.',
          ],
          importantPointsGu: [
            'નાગરિકતા મેળવવાની ૫ રીતો: (૧) જન્મ દ્વારા, (૨) વંશ દ્વારા, (૩) નોંધણી દ્વારા (Registration), (૪) દેશીયકરણ દ્વારા (Naturalisation), (૫) પ્રદેશના સમાવેશ દ્વારા (દા.ત. પુડુચેરી, સિક્કિમ).',
            'નાગરિકતા ગુમાવવાની ૩ રીતો: (૧) સ્વેચ્છાએ ત્યાગ (Renunciation), (૨) અન્ય દેશની નાગરિકતા લેવાથી સમાપ્તિ (Termination), (૩) કેન્દ્ર સરકાર દ્વારા વંચિત કરવું (Deprivation — છેતરપિંડી, રાજદ્રોહ અથવા સતત ૭ વર્ષ વિદેશવાસ).',
            'NRI vs OCI: ૨૦૧૫ માં PIO યોજનાને OCI માં ભેળવી દેવાઈ. OCI એ બેવડી નાગરિકતા નથી; OCI ને મતદાન, ચૂંટણી લડવા કે રાષ્ટ્રપતિ/જજ/સાંસદ બનવાનો અને ખેતીની જમીન ખરીદવાનો અધિકાર નથી.',
          ],
          realLifeExampleEn:
            'A Gujarati software engineer working in the US on an H-1B visa with an Indian passport is an NRI (full Indian citizen who can vote). If they later become a US citizen and take an OCI card, they can visit family in Gujarat anytime without a visa—but can no longer vote in Indian elections.',
          realLifeExampleGu:
            'અમેરિકામાં ભારતીય પાસપોર્ટ પર કામ કરતો ગુજરાતી એન્જિનિયર NRI છે (ભારતીય નાગરિક, મતદાન કરી શકે). પરંતુ જો તે અમેરિકન નાગરિકતા લઈ OCI કાર્ડ મેળવે, તો તે વિઝા વિના ગુજરાત આવી શકે છે, પરંતુ ભારતની ચૂંટણીમાં મતદાન કરી શકતો નથી.',
          keyTerms: [
            'Citizenship Act 1955',
            '5 Acquisition & 3 Loss Modes',
            'NRI vs OCI (2015 Merger)',
          ],
        },
      ],
      summaryPointsEn: [
        'Part II (Art. 5–11) governs citizenship only on Jan 26, 1950; Art. 11 empowers Parliament -> Citizenship Act, 1955.',
        'Acquisition (5): Birth, Descent, Registration, Naturalisation, Incorporation of Territory.',
        'Loss (3): Renunciation, Termination, Deprivation.',
        'India follows Single Citizenship (from UK); OCI is NOT dual citizenship (no voting, no constitutional posts).',
      ],
      summaryPointsGu: [
        'ભાગ ૨ (અનુચ્છેદ ૫–૧૧) ૨૬ જાન્યુ. ૧૯૫૦ ની નાગરિકતા દર્શાવે છે; અનુચ્છેદ ૧૧ હેઠળ નાગરિકતા અધિનિયમ ૧૯૫૫.',
        'પ્રાપ્તિ (૫): જન્મ, વંશ, નોંધણી, દેશીયકરણ, પ્રદેશ સમાવેશ.',
        'સમાપ્તિ (૩): ત્યાગ, સમાપ્તિ, વંચિત કરવું.',
        'એકલ નાગરિકતા (UK માંથી); OCI બેવડી નાગરિકતા નથી (મતદાન કે બંધારણીય પદનો અધિકાર નથી).',
      ],
    },

    ...POLITY_PART1_REMAINING_CHAPTERS,
    ...POLITY_PART2_AND_3_CHAPTERS,
    ...POLITY_PART4_TO_7_CHAPTERS,
  ],
};
