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
