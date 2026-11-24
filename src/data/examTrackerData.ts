export interface ExamCountdown {
  id: string;
  nameEn: string;
  nameGu: string;
  targetDate: string; // ISO string
  authority: 'GPSC' | 'UPSC';
  stage: 'Prelims' | 'Mains' | 'Interview';
  status: 'confirmed' | 'tentative' | 'application_open';
  officialNoticeUrl: string;
  seatsCount: number;
}

export interface OfficialNotification {
  id: string;
  titleEn: string;
  titleGu: string;
  date: string;
  authority: 'GPSC' | 'UPSC';
  type: 'calendar' | 'advertisement' | 'answer_key' | 'result' | 'admit_card';
  downloadUrl: string;
  isNew: boolean;
}

export const EXAM_COUNTDOWNS: ExamCountdown[] = [
  {
    id: 'gpsc-class-12',
    nameEn: 'GPSC Class 1 & 2 (GAS/GPS) Prelims',
    nameGu: 'GPSC વર્ગ ૧ અને ૨ (GAS/GPS) પ્રિલિમ્સ',
    targetDate: '2027-02-14T10:00:00',
    authority: 'GPSC',
    stage: 'Prelims',
    status: 'confirmed',
    officialNoticeUrl: 'https://gpsc.gujarat.gov.in/',
    seatsCount: 285,
  },
  {
    id: 'gpsc-dyso',
    nameEn: 'GPSC DYSO / Nayab Mamlatdar',
    nameGu: 'GPSC નાયબ સેક્શન ઑફિસર (DYSO)',
    targetDate: '2027-04-18T10:00:00',
    authority: 'GPSC',
    stage: 'Prelims',
    status: 'tentative',
    officialNoticeUrl: 'https://ojas.gujarat.gov.in/',
    seatsCount: 320,
  },
  {
    id: 'upsc-cse-prelims',
    nameEn: 'UPSC Civil Services (CSE) Prelims',
    nameGu: 'UPSC સનદી સેવા (CSE) પ્રિલિમ્સ',
    targetDate: '2027-05-23T09:30:00',
    authority: 'UPSC',
    stage: 'Prelims',
    status: 'confirmed',
    officialNoticeUrl: 'https://upsc.gov.in/',
    seatsCount: 1056,
  },
  {
    id: 'gpsc-sti',
    nameEn: 'State Tax Inspector (STI) Class 3',
    nameGu: 'રાજ્ય વેરા નિરીક્ષક (STI) વર્ગ ૩',
    targetDate: '2027-07-11T10:00:00',
    authority: 'GPSC',
    stage: 'Prelims',
    status: 'tentative',
    officialNoticeUrl: 'https://gpsc.gujarat.gov.in/',
    seatsCount: 410,
  },
];

export const OFFICIAL_NOTIFICATIONS: OfficialNotification[] = [
  {
    id: 'notif-01',
    titleEn: 'GPSC Annual Examination Calendar 2026-27 Announced',
    titleGu: 'GPSC વાર્ષિક પરીક્ષા કેલેન્ડર ૨૦૨૬-૨૭ ની સત્તાવાર જાહેરાત',
    date: 'Today / આજે',
    authority: 'GPSC',
    type: 'calendar',
    downloadUrl: 'https://gpsc.gujarat.gov.in/',
    isNew: true,
  },
  {
    id: 'notif-02',
    titleEn: 'Provisional Answer Key released for DYSO General Studies Paper',
    titleGu: 'નાયબ સેક્શન ઑફિસર (DYSO) સામાન્ય અભ્યાસ પેપરની પ્રોવિઝનલ આન્સર કી પ્રસિદ્ધ',
    date: 'Yesterday / ગઈકાલે',
    authority: 'GPSC',
    type: 'answer_key',
    downloadUrl: 'https://ojas.gujarat.gov.in/',
    isNew: true,
  },
  {
    id: 'notif-03',
    titleEn: 'UPSC CSE 2027 Official Notification & Application Portal Live',
    titleGu: 'UPSC સનદી સેવા પરીક્ષા ૨૦૨૭ સત્તાવાર નોટિફિકેશન અને ફોર્મ ભરવાનું શરૂ',
    date: 'This Week / આ અઠવાડિયે',
    authority: 'UPSC',
    type: 'advertisement',
    downloadUrl: 'https://upsc.gov.in/',
    isNew: false,
  },
];

export interface ConcludedExamPaper {
  id: string;
  paperId: string;
  examNameEn: string;
  examNameGu: string;
  concludedDateEn: string;
  concludedDateGu: string;
  authority: 'GPSC' | 'UPSC';
  totalQuestions: number;
  provisionalKeyStatus: 'Released' | 'Awaiting' | 'Final Key Out';
  expectedCutoffEn: string;
  expectedCutoffGu: string;
  paperTypeEn: string;
  paperTypeGu: string;
}

export const CONCLUDED_EXAM_PAPERS: ConcludedExamPaper[] = [
  {
    id: 'concluded-gpsc-2024',
    paperId: 'gpsc-prelims-2024-gs1',
    examNameEn: 'GPSC Class 1 & 2 (Advt 47/2023-24) Prelims GS-1',
    examNameGu: 'GPSC વર્ગ ૧ અને ૨ (જાહેરાત ૪૭/૨૦૨૩-૨૪) પ્રિલિમ્સ GS-1',
    concludedDateEn: 'Exam Concluded (Jan 2024)',
    concludedDateGu: 'પરીક્ષા પૂર્ણ (જાન્યુઆરી ૨૦૨૪)',
    authority: 'GPSC',
    totalQuestions: 200,
    provisionalKeyStatus: 'Final Key Out',
    expectedCutoffEn: 'Provisional General Male Cutoff: ~139.5 Marks',
    expectedCutoffGu: 'જનરલ કટ-ઓફ: ~૧૩૯.૫ ગુણ',
    paperTypeEn: 'General Studies Paper-1 (History, Heritage, Polity, Mental Ability)',
    paperTypeGu: 'સામાન્ય અભ્યાસ પેપર-૧ (ઇતિહાસ, વારસો, બંધારણ, ગણિત-રીઝનિંગ)',
  },
  {
    id: 'concluded-upsc-2024',
    paperId: 'upsc-prelims-2024-gs1',
    examNameEn: 'UPSC Civil Services (Preliminary) Examination 2024 GS-1',
    examNameGu: 'UPSC સિવિલ સર્વિસીસ (પ્રાથમિક) પરીક્ષા ૨૦૨૪ GS-1',
    concludedDateEn: 'Exam Concluded (June 2024)',
    concludedDateGu: 'પરીક્ષા પૂર્ણ (જૂન ૨૦૨૪)',
    authority: 'UPSC',
    totalQuestions: 100,
    provisionalKeyStatus: 'Released',
    expectedCutoffEn: 'Expected General Cutoff: ~88 - 92 Marks',
    expectedCutoffGu: 'અપેક્ષિત કટ-ઓફ: ~૮૮ - ૯૨ ગુણ',
    paperTypeEn: 'General Studies Paper-1',
    paperTypeGu: 'સામાન્ય અભ્યાસ પેપર-૧',
  },
  {
    id: 'concluded-gpsc-dyso-2023',
    paperId: 'gpsc-prelims-2023-dyso',
    examNameEn: 'GPSC DYSO / Nayab Mamlatdar (Advt 42/2023-24)',
    examNameGu: 'GPSC નાયબ સેક્શન ઑફિસર (DYSO)',
    concludedDateEn: 'Exam Concluded (Oct 2023)',
    concludedDateGu: 'પરીક્ષા પૂર્ણ (ઓક્ટોબર ૨૦૨૩)',
    authority: 'GPSC',
    totalQuestions: 200,
    provisionalKeyStatus: 'Final Key Out',
    expectedCutoffEn: 'Official Cutoff: 99.42 Marks',
    expectedCutoffGu: 'સત્તાવાર કટ-ઓફ: ૯૯.૪૨ ગુણ',
    paperTypeEn: 'General Studies Composite Paper (200 Questions)',
    paperTypeGu: 'સામાન્ય અભ્યાસ સંયુક્ત પેપર (૨૦૦ પ્રશ્નો)',
  }
];

