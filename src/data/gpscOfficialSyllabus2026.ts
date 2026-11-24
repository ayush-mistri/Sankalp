export interface ExamStageDetail {
  stage: string;
  stageGu: string;
  marks: number;
  duration: string;
  nature: string;
  descriptionEn: string;
  descriptionGu: string;
}

export interface MainsPaperDetail {
  paperNumber: string;
  titleEn: string;
  titleGu: string;
  marks: number;
  nature: 'Qualifying' | 'Merit';
  overviewEn: string;
  overviewGu: string;
  topicsEn: string[];
  topicsGu: string[];
}

export interface PrelimsSubjectDetail {
  id: string;
  subjectNumber: number;
  nameEn: string;
  nameGu: string;
  subcategories: {
    titleEn: string;
    titleGu: string;
    topicsEn: string[];
    topicsGu: string[];
  }[];
}

export interface FreePdfResource {
  id: string;
  titleEn: string;
  titleGu: string;
  category: 'GCERT' | 'NCERT' | 'Government Report' | 'Official Syllabus' | 'Reference PDF';
  subjectId: string;
  medium: 'gu' | 'en' | 'bilingual';
  downloadUrl: string;
  fileType: string;
  fileSizeApprox: string;
  officialPublisherEn: string;
  officialPublisherGu: string;
  descriptionEn: string;
  descriptionGu: string;
  is100PercentFree: boolean;
  recommendedFor: string;
  coverImageUrl?: string;
}

export interface StudyMonthPlan {
  month: number;
  focusEn: string;
  focusGu: string;
  subjectsEn: string[];
  subjectsGu: string[];
  milestonesEn: string;
  milestonesGu: string;
}

// 1. LATEST 2026-27 EXAM SCHEME
export const GPSC_2026_EXAM_SCHEME = {
  version: '2026-27 Updated Scheme',
  prelimsTotalMarks: 200,
  prelimsPapersCount: 1, // Single General Studies Paper of 200 Marks, 3 Hours
  mainsTotalMarks: 1850,
  mainsMeritMarks: 1250, // 300 Gujarati + 300 English are Qualifying
  interviewMarks: 150,
  finalSelectionMarks: 1400, // 1250 Mains Merit + 150 Interview
  noteEn: 'Crucial Update: The current 2026-27 scheme features ONE single Preliminary General Studies paper (3 hours, 200 marks). In Mains, Gujarati (300) and English (300) are Qualifying papers, while Essay and GS 1 to 4 (250 marks each = 1,250 marks) decide your written merit, followed by the 150-mark interview.',
  noteGu: 'મહત્વની સ્પષ્ટતા: ૨૦૨૬-૨૭ ની નવીનતમ પરીક્ષા પદ્ધતિમાં પ્રિલિમ્સમાં માત્ર ૧ જ જનરલ સ્ટડીઝ પેપર (૩ કલાક, ૨૦૦ ગુણ) લેવાય છે. મુખ્ય પરીક્ષા (Mains) માં ગુજરાતી (૩૦૦) અને અંગ્રેજી (૩૦૦) ક્વોલિફાઇંગ (પાસિંગ) પેપર્સ છે, જ્યારે નિબંધ અને GS ૧ થી ૪ (દરેકના ૨૫૦ = ૧,૨૫૦ ગુણ) મેરિટ નક્કી કરે છે, અને ૧૫૦ ગુણનો ઇન્ટરવ્યૂ મળી કુલ ૧,૪૦૦ ગુણમાંથી આખરી પસંદગી થાય છે.',
  stages: [
    {
      stage: 'Stage 1: Preliminary Examination',
      stageGu: 'તબક્કો ૧: પ્રાથમિક પરીક્ષા (Prelims)',
      marks: 200,
      duration: '3 Hours (૧૮૦ મિનિટ)',
      nature: 'Objective (MCQ) - Screening Test',
      descriptionEn: 'Single composite paper covering History, Geography, Polity, Economy, Science & Tech, Environment, Current Affairs, and Gujarat GK.',
      descriptionGu: 'ઇતિહાસ, ભૂગોળ, બંધારણ, અર્થતંત્ર, વિજ્ઞાન-ટેક, પર્યાવરણ, વર્તમાન પ્રવાહો અને ગુજરાત સામાન્ય જ્ઞાનનો સમાવેશ કરતું એકમાત્ર MCQ પેપર.',
    },
    {
      stage: 'Stage 2: Main Examination',
      stageGu: 'તબક્કો ૨: મુખ્ય લેખિત પરીક્ષા (Mains)',
      marks: 1850, // Total written marks (1250 merit + 600 qualifying)
      duration: '7 Descriptive Papers (3 Hours Each)',
      nature: 'Descriptive / Analytical Written Test',
      descriptionEn: '7 papers: Gujarati (300 - Qualifying), English (300 - Qualifying), Essay (250 - Merit), GS-1 (250 - Merit), GS-2 (250 - Merit), GS-3 (250 - Merit), GS-4 (250 - Merit).',
      descriptionGu: '૭ લેખિત પેપર્સ: ગુજરાતી (૩૦૦ - ક્વોલિફાઇંગ), અંગ્રેજી (૩૦૦ - ક્વોલિફાઇંગ), નિબંધ (૨૫૦ - મેરિટ), GS-૧ (૨૫૦ - મેરિટ), GS-૨ (૨૫૦ - મેરિટ), GS-૩ (૨૫૦ - મેરિટ), GS-૪ (૨૫૦ - મેરિટ).',
    },
    {
      stage: 'Stage 3: Personality Test (Interview)',
      stageGu: 'તબક્કો ૩: રૂબરૂ મુલાકાત (વ્યક્તિત્વ કસોટી)',
      marks: 150,
      duration: '30-45 Minutes',
      nature: 'Oral Interview before GPSC Board',
      descriptionEn: 'Tests administrative acumen, mental alertness, balance of judgment, leadership, and emotional composure under pressure.',
      descriptionGu: 'માનસિક સતર્કતા, વહીવટી તર્કબદ્ધતા, ન્યાયિક દ્રષ્ટિકોણ અને દબાણ હેઠળ સંતુલન ચકાસવા માટે GPSC બોર્ડ સમક્ષ રૂબરૂ મુલાકાત.',
    },
  ],
};

// 2. COMPLETE PRELIMS SYLLABUS (TOP TO BOTTOM)
export const GPSC_PRELIMS_SYLLABUS: PrelimsSubjectDetail[] = [
  {
    id: 'pre-sub-1',
    subjectNumber: 1,
    nameEn: 'History (ઇતિહાસ)',
    nameGu: 'ઇતિહાસ (ભારત અને ગુજરાત)',
    subcategories: [
      {
        titleEn: 'Ancient Indian History',
        titleGu: 'પ્રાચીન ભારતનો ઇતિહાસ',
        topicsEn: [
          'Indus Valley Civilization: Features, urban planning, agriculture, trade, religious beliefs, major sites',
          'Vedic Period: Early and Later Vedic society, economy, polity, Vedic literature',
          'Jainism and Buddhism: Causes of origin, doctrines, schisms, literature, patron kings, impact on art',
          'Maurya and Gupta Empires: Administration, Chandragupta, Ashoka’s Dhamma, Golden age under Guptas, literature, science',
          'Harsha and South Indian Dynasties: Harshavardhana, Cholas, Chalukyas, Pallavas, maritime power, temple architecture',
        ],
        topicsGu: [
          'સિંધુ ખીણની સભ્યતા: વિશેષતાઓ, નગર રચના, કૃષિ, વેપાર, ધાર્મિક માન્યતાઓ અને મુખ્ય સ્થળો',
          'વૈદિક કાળ: પૂર્વ અને ઉત્તર વૈદિક સમાજ, અર્થતંત્ર, રાજકીય વ્યવસ્થા અને વૈદિક સાહિત્ય',
          'જૈન અને બૌદ્ધ ધર્મ: ઉદ્ભવના કારણો, સિદ્ધાંતો, સાહિત્ય, આશ્રયદાતા શાસકો અને કલા પર પ્રભાવ',
          'મૌર્ય અને ગુપ્ત સામ્રાજ્ય: વહીવટ, ચંદ્રગુપ્ત, અશોકનો ધમ્મ, ગુપ્ત સુવર્ણકાળ, વિજ્ઞાન અને સાહિત્ય',
          'હર્ષવર્ધન અને દક્ષિણ ભારતના રાજવંશો: ચોલ, ચાલુક્ય, પલ્લવ, દરિયાઈ શક્તિ અને મંદિર સ્થાપત્ય',
        ],
      },
      {
        titleEn: 'Medieval Indian History',
        titleGu: 'મધ્યકાલીન ભારતનો ઇતિહાસ',
        topicsEn: [
          'Delhi Sultanate: Slave, Khalji, Tughlaq, Sayyid, Lodi dynasties, administrative and market reforms',
          'Mughal Empire: Babur to Aurangzeb, Mansabdari system, agrarian administration, Mughal art and architecture',
          'Vijayanagara and Bahmani Kingdoms: Krishnadevaraya, Nayankara system, architecture (Hampi)',
          'Bhakti and Sufi Movements: Sants (Kabir, Mirabai, Nanak), Sufi silsilahs, syncretic cultural synthesis',
        ],
        topicsGu: [
          'દિલ્હી સલ્તનત: ગુલામ, ખિલજી, તુઘલક, સૈયદ અને લોદી વંશ, વહીવટી અને બજાર સુધારા',
          'મુઘલ સામ્રાજ્ય: બાબુરથી ઔરંગઝેબ, મનસબદારી પ્રથા, જમીન મહેસૂલ વ્યવસ્થા, મુઘલ સ્થાપત્ય',
          'વિજયનગર અને બહમની સામ્રાજ્ય: કૃષ્ણદેવરાય, નાયંકર પ્રથા, હમ્પીનું સ્થાપત્ય',
          'ભક્તિ અને સૂફી આંદોલન: સંતો (કબીર, મીરાંબાઈ, ગુરુ નાનક), સૂફી સિલસિલા અને સંસ્કૃતિ સમન્વય',
        ],
      },
      {
        titleEn: 'Modern Indian History & Freedom Struggle',
        titleGu: 'આધુનિક ભારતનો ઇતિહાસ અને સ્વાતંત્ર્ય સંગ્રામ',
        topicsEn: [
          'Arrival of Europeans: Portuguese, Dutch, British, French rivalries and Carnatic wars',
          'British Rule: Plassey (1757), Buxar (1764), Subsidiary Alliance, Doctrine of Lapse, economic drain',
          'Revolt of 1857: Causes, key leaders, suppression, Government of India Act 1858',
          'Social & Religious Reform: Raja Ram Mohan Roy, Arya Samaj, Jyotirao Phule, Ramakrishna Mission',
          'Indian Freedom Movement: Moderates vs Extremists, Partition of Bengal (1905), Home Rule',
          'Gandhian Era: Non-Cooperation (1920), Civil Disobedience & Dandi March (1930), Quit India (1942)',
          'Important Freedom Fighters: Sardar Patel, Subhash Chandra Bose, Bhagat Singh, Dr. B.R. Ambedkar',
        ],
        topicsGu: [
          'યુરોપિયનોનું આગમન: પોર્ટુગીઝ, ડચ, બ્રિટિશ, ફ્રેન્ચ સંઘર્ષ અને કર્ણાટક યુદ્ધો',
          'બ્રિટિશ સામ્રાજ્યવાદ: પ્લાસી, બક્સર, સહાયકારી યોજના, ખાલસા નીતિ અને આર્થિક શોષણ (Drain of Wealth)',
          '૧૮૫૭ નો સ્વાતંત્ર્ય સંગ્રામ: કારણો, મુખ્ય નેતાઓ, અસરો અને ૧૮૫૮ નો કાયદો',
          'સામાજિક-ધાર્મિક સુધારણા: રાજા રામમોહન રોય, આર્ય સમાજ, જ્યોતિરાવ ફુલે, રામકૃષ્ણ મિશન',
          'રાષ્ટ્રીય આંદોલન: મવાળવાદી અને જહાલવાદી, બંગભંગ (૧૯૦૫), હોમરૂલ લીગ',
          'ગાંધીવાદી યુગ: અસહકાર આંદોલન (૧૯૨૦), સવિનય કાનૂનભંગ અને દાંડીકૂચ (૧૯૩૦), હિન્દ છોડો (૧૯૪૨)',
          'મુખ્ય સ્વાતંત્ર્ય સેનાનીઓ: સરદાર પટેલ, સુભાષચંદ્ર બોઝ, ભગતસિંહ, ડૉ. બાબાસાહેબ આંબેડકર',
        ],
      },
      {
        titleEn: 'Gujarat History & Heritage',
        titleGu: 'ગુજરાતનો ઇતિહાસ અને વિરાસત',
        topicsEn: [
          'Ancient Gujarat: Lothal, Dholavira, Rangpur, Junagadh Ashokan Rock Inscription, Rudradaman, Skandagupta',
          'Maitraka & Solanki Golden Era: Vallabhi Buddhist center, Mularaja, Bhima I, Siddharaj Jaisinh, Kumarapala, Rani ki Vav, Modhera Sun Temple',
          'Chavda & Vaghela Dynasties: Vanraj Chavda, Karnadev Vaghela (last Hindu ruler)',
          'Gujarat Sultanate: Ahmed Shah (founding of Ahmedabad), Mahmud Begada (Champaner, Junagadh fortifications)',
          'Maratha & Gaekwad Rule: Sayajirao Gaekwad III (free compulsory primary education, library movement)',
          'Gujarat’s Contribution to Freedom Movement: Kheda Satyagraha (1918), Bardoli Satyagraha (1928), Dandi Salt March (1930), Maha Gujarat Movement (1956-1960)',
        ],
        topicsGu: [
          'પ્રાચીન ગુજરાત: લોથલ, ધોળાવીરા, રંગપુર, જૂનાગઢ અશોક, રુદ્રદામા અને સ્કંદગુપ્તના શિલાલેખો',
          'મૈત્રક અને સોલંકી યુગ: વલ્લભી બૌદ્ધ વિદ્યાપીઠ, ભીમદેવ ૧લો, સિદ્ધરાજ જયસિંહ, કુમારપાળ, રાણકી વાવ, મોઢેરા સૂર્ય મંદિર',
          'ચાવડા અને વાઘેલા વંશ: વનરાજ ચાવડા, કર્ણદેવ વાઘેલા (અંતિમ હિન્દુ શાસક)',
          'ગુજરાત સલ્તનત: અહમદ શાહ (અમદાવાદની સ્થાપના), મહમૂદ બેગડો (ચાંપાનેર અને જૂનાગઢ વિજય)',
          'મરાઠા અને ગાયકવાડ શાસન: સયાજીરાવ ગાયકવાડ ૩જા (મફત ફરજિયાત શિક્ષણ, પુસ્તકાલય પ્રવૃત્તિ)',
          'સ્વાતંત્ર્ય સંગ્રામમાં ગુજરાત: ખેડા (૧૯૧૮), બારડોલી (૧૯૨૮), દાંડીકૂચ (૧૯૩૦) અને મહાગુજરાત આંદોલન (૧૯૫૬-૧૯૬૦)',
        ],
      },
    ],
  },
  {
    id: 'pre-sub-2',
    subjectNumber: 2,
    nameEn: 'Geography (ભૂગોળ)',
    nameGu: 'ભૂગોળ (ભારત, વિશ્વ અને ગુજરાત)',
    subcategories: [
      {
        titleEn: 'Physical Geography of India & World',
        titleGu: 'ભારત અને વિશ્વની ભૌતિક ભૂગોળ',
        topicsEn: [
          'Earth, Atmosphere, Climate: Earth’s crust, plate tectonics, atmospheric layers, insolation, pressure belts, ocean currents, El Niño/La Niña',
          'Physiographic Divisions: Himalayas, Indo-Gangetic Plains, Peninsular Plateau, Coastal Plains, Islands',
          'River Systems & Drainage: Himalayan rivers (Indus, Ganga, Brahmaputra) vs Peninsular rivers (Godavari, Krishna, Narmada, Tapi)',
          'Indian Monsoon: Southwest & Northeast monsoon mechanism, Western disturbances, drought and flood patterns',
        ],
        topicsGu: [
          'પૃથ્વી, વાતાવરણ અને આબોહવા: પૃથ્વીનું પડ, પ્લેટ ટેક્ટોનિક્સ, વાતાવરણીય સ્તરો, દબાણ પટ્ટા, સમુદ્રી પ્રવાહો, અલ-નીનો/લા-નીના',
          'ભારતના પ્રાકૃતિક વિભાગો: હિમાલય, ઉત્તરના મેદાનો, દ્વીપકલ્પીય ઉચ્ચપ્રદેશ, તટીય મેદાનો અને ટાપુઓ',
          'જળપરિવાહ અને નદીઓ: હિમાલયની નદીઓ (સિંધુ, ગંગા, બ્રહ્મપુત્ર) વિરુદ્ધ દ્વીપકલ્પીય નદીઓ (ગોદાવરી, નર્મદા, તાપી)',
          'ભારતીય ચોમાસું: નૈઋત્ય અને ઈશાનના મોસમી પવનો, પશ્ચિમી વિક્ષોભ, દુષ્કાળ અને પૂરના ચક્રો',
        ],
      },
      {
        titleEn: 'Economic & Human Geography',
        titleGu: 'આર્થિક અને માનવ ભૂગોળ',
        topicsEn: [
          'Agriculture & Irrigation: Major cropping seasons (Kharif, Rabi, Zaid), foodgrains, cash crops, micro-irrigation systems',
          'Minerals & Energy: Iron ore, bauxite, coal, petroleum, renewable energy (Solar, Wind, Green Hydrogen)',
          'Population & Urbanization: Census trends, sex ratio, literacy, migration patterns, smart cities',
          'Transportation & Corridors: Golden Quadrilateral, Dedicated Freight Corridors (DFC), National Waterways',
        ],
        topicsGu: [
          'કૃષિ અને સિંચાઈ: ખરીફ, રવિ અને ઝાયદ પાક, રોકડિયા પાક, ટપક અને ફુવારા પદ્ધતિ',
          'ખનિજો અને ઊર્જા: લોખંડ, બોક્સાઈટ, કોલસો, ખનીજતેલ, બિનપરંપરાગત ઊર્જા (સૌર, પવન, ગ્રીન હાઇડ્રોજન)',
          'વસ્તી અને શહેરીકરણ: વસ્તી ગણતરી વલણો, જાતિ પ્રમાણ, સાક્ષરતા, સ્થળાંતર, સ્માર્ટ સિટીઝ',
          'પરિવહન અને કૉરિડોર: સુવર્ણ ચતુર્ભુજ, ડેડિકેટેડ ફ્રેઈટ કૉરિડોર (DFC), રાષ્ટ્રીય જળમાર્ગો',
        ],
      },
      {
        titleEn: 'Geography of Gujarat',
        titleGu: 'ગુજરાતની વિશેષ ભૂગોળ',
        topicsEn: [
          'Rivers, Dams & Lakes: Narmada (Sardar Sarovar Project), Tapi (Ukai Dam), Mahi (Kadana Dam), Sabarmati (Dharoi Dam), Bhadar, Shetrunji',
          'Climate & Soils: Alluvial (Goradu/Bhatha), Black cotton (Kanam region in Bharuch), Saline coastal soils (Kharaba)',
          'Forests & Wildlife: Gir National Park (Asiatic Lions), Velavadar (Blackbuck), Marine National Park (Gulf of Kutch), Wild Ass Sanctuary (Little Rann of Kutch)',
          'Coastal Features & Ports: 1,600 km coastline, Kandla (Deendayal Port), Mundra, Pipavav, Dahej, Alang Shipbreaking Yard',
        ],
        topicsGu: [
          'નદીઓ, બંધ અને તળાવો: નર્મદા (સરદાર સરોવર), તાપી (ઉકાઈ ડેમ), મહી (કડાણા), સાબરમતી (ધરોઈ), શેત્રુંજી, ભાદર',
          'આબોહવા અને જમીનો: ગોરાડુ, કાળી કપાસની જમીન (ભરૂચનો કાનમ પ્રદેશ), દરિયાઈ ખારી જમીનો',
          'જંગલો અને અભયારણ્યો: ગીર (એશિયાટિક સિંહ), વેળાવદર (કાળિયાર), મરીન નેશનલ પાર્ક (જામનગર), ઘુડખર અભયારણ્ય (કચ્છનું નાનું રણ)',
          'દરિયાકિનારો અને બંદરો: ૧,૬૦૦ કિમી દરિયાકિનારો, કંડલા (દીનદયાલ પોર્ટ), મુંદ્રા, પીપાવાવ, દહેજ, અલંગ શિપ બ્રેકિંગ યાર્ડ',
        ],
      },
    ],
  },
  {
    id: 'pre-sub-3',
    subjectNumber: 3,
    nameEn: 'Indian Constitution & Polity (બંધારણ)',
    nameGu: 'ભારતીય બંધારણ અને રાજ્યવ્યવસ્થા',
    subcategories: [
      {
        titleEn: 'Constitutional Framework & Principles',
        titleGu: 'બંધારણીય માળખું અને સિદ્ધાંતો',
        topicsEn: [
          'Historical Evolution: Regulating Act 1773 to Government of India Act 1935',
          'Constituent Assembly: Drafting committee, Dr. Ambedkar, debates, adoption on 26 Nov 1949',
          'Preamble: Sovereign, Socialist, Secular, Democratic Republic, Basic Structure doctrine',
          'Fundamental Rights (Articles 12-35): Equality, Freedoms, Protection of Life (Art 21), Writs (Art 32 & 226)',
          'Directive Principles of State Policy (Articles 36-51): Socialistic, Gandhian, Liberal-intellectual, Uniform Civil Code (Art 44)',
          'Fundamental Duties (Article 51A): Swaran Singh Committee, 42nd and 86th Amendments',
        ],
        topicsGu: [
          'ઐતિહાસિક વિકાસ: ૧૭૭૩ ના નિયામક ધારાથી લઈને ૧૯૩૫ ના ભારત શાસન અધિનિયમ સુધી',
          'બંધારણ સભા: મુસદ્દા સમિતિ, ડૉ. આંબેડકર, ચર્ચાઓ અને ૨૬ નવેમ્બર ૧૯૪૯ ના રોજ સ્વીકાર',
          'આમુખ: સાર્વભૌમ, સમાજવાદી, બિનસાંપ્રદાયિક, લોકશાહી પ્રજાસત્તાક, મૂળભૂત માળખાનો સિદ્ધાંત',
          'મૂળભૂત અધિકારો (કલમ ૧૨-૩૫): સમાનતા, સ્વતંત્રતા, જીવનનો અધિકાર (કલમ ૨૧), ૫ રિટો (કલમ ૩૨ અને ૨૨૬)',
          'રાજ્યનીતિના માર્ગદર્શક સિદ્ધાંતો (કલમ ૩૬-૫૧): સમાજવાદી, ગાંધીવાદી, સમાન નાગરિક સંહિતા (કલમ ૪૪)',
          'મૂળભૂત ફરજો (કલમ ૫૧A): સ્વર્ણ સિંહ સમિતિ, ૪૨મો અને ૮૬મો સુધારો',
        ],
      },
      {
        titleEn: 'Union, State & Local Governance',
        titleGu: 'કેન્દ્ર, રાજ્ય અને સ્થાનિક વહીવટ',
        topicsEn: [
          'Union Executive: President (elections, veto, ordinance Art 123, pardoning Art 72), Vice-President, Prime Minister & Council of Ministers',
          'Parliament of India: Lok Sabha, Rajya Sabha, legislative procedure, Money Bills (Art 110), Joint Sitting (Art 108), Parliamentary Committees (PAC, Estimates)',
          'Judiciary: Supreme Court (Original, Appellate, Advisory Art 143), Collegium system, High Courts, Judicial Review',
          'State Machinery: Governor (discretionary powers Art 163), Chief Minister, State Legislative Assembly',
          'Local Self-Government: 73rd Amendment (Panchayati Raj - 11th Schedule) & 74th Amendment (Municipalities - 12th Schedule)',
          'Constitutional & Statutory Bodies: Election Commission, UPSC & GPSC, CAG, Finance Commission (Art 280), Attorney General, NITI Aayog, NHRC, Lokpal & Lokayukta',
          'Centre-State Relations: Legislative, Administrative, Financial relations, Sarkaria & Punchhi Commissions, Inter-State Council',
        ],
        topicsGu: [
          'કેન્દ્રીય કારોબારી: રાષ્ટ્રપતિ (ચૂંટણી, વીટો, વટહુકમ કલમ ૧૨૩, દયા અરજી કલમ ૭૨), ઉપરાષ્ટ્રપતિ, વડાપ્રધાન અને મંત્રીમંડળ',
          'ભારતીય સંસદ: લોકસભા, રાજ્યસભા, કાયદાકીય પ્રક્રિયા, નાણાં વિધેયક (કલમ ૧૧૦), સંયુક્ત બેઠક (કલમ ૧૦૮), સમિતિઓ (PAC, અંદાજ)',
          'ન્યાયતંત્ર: સર્વોચ્ચ અદાલત (મૂળભૂત, અપીલ, સલાહકારી કલમ ૧૪૩), કોલેજિયમ પદ્ધતિ, વડી અદાલતો, ન્યાયિક પુનરાવલોકન',
          'રાજ્ય વહીવટી તંત્ર: રાજ્યપાલ (સ્વવિવેકાધીન સત્તાઓ કલમ ૧૬૩), મુખ્યમંત્રી, વિધાનસભા',
          'સ્થાનિક સ્વરાજ્ય: ૭૩મો બંધારણીય સુધારો (પંચાયતી રાજ - ૧૧મી અનુસૂચિ) અને ૭૪મો સુધારો (નગરપાલિકાઓ - ૧૨મી અનુસૂચિ)',
          'બંધારણીય અને વૈધાનિક સંસ્થાઓ: ચૂંટણી પંચ, UPSC અને GPSC, CAG, નાણા પંચ (કલમ ૨૮૦), એટર્ની જનરલ, નીતિ આયોગ, લોકપાલ-લોકાયુક્ત',
          'કેન્દ્ર-રાજ્ય સંબંધો: કાયદાકીય, વહીવટી અને નાણાકીય સંબંધો, સરકારીયા અને પુંછી પંચ, આંતરરાજ્ય પરિષદ',
        ],
      },
    ],
  },
  {
    id: 'pre-sub-4',
    subjectNumber: 4,
    nameEn: 'Indian Economy (અર્થતંત્ર)',
    nameGu: 'ભારતીય અર્થતંત્ર અને આયોજન',
    subcategories: [
      {
        titleEn: 'Macroeconomic Fundamentals',
        titleGu: 'સ્થૂળ અર્થશાસ્ત્રના મૂળભૂત સિદ્ધાંતો',
        topicsEn: [
          'Basic Economic Concepts: National Income, GDP, GNP, NNP, Real vs Nominal GDP, Per Capita Income',
          'Inflation & Unemployment: CPI, WPI, headline vs core inflation, types of unemployment, Philips curve',
          'Poverty & Inequality: Tendulkar and Rangarajan committees, Multidimensional Poverty Index (MPI), Gini coefficient',
          'Banking & Monetary Policy: Reserve Bank of India (RBI), Monetary Policy Committee (MPC), Repo, Reverse Repo, CRR, SLR, NPA resolution (IBC 2016)',
          'Fiscal Policy & Public Finance: Union Budget, Revenue vs Capital expenditure, Fiscal Deficit, FRBM Act',
          'Taxation Structure: Direct vs Indirect taxes, GST architecture, GST Council',
        ],
        topicsGu: [
          'અર્થશાસ્ત્રના પાયાના ખ્યાલો: રાષ્ટ્રીય આવક, GDP, GNP, વાસ્તવિક વિ. નોમિનલ GDP, માથાદીઠ આવક',
          'ફુગાવો અને બેરોજગારી: ગ્રાહક ભાવાંક (CPI), જથ્થાબંધ ભાવાંક (WPI), બેરોજગારીના પ્રકારો',
          'ગરીબી અને અસમાનતા: તેંડુલકર અને રંગરાજન સમિતિ, બહુપરિમાણીય ગરીબી આંક (MPI), ગિની ગુણાંક',
          'બેંકિંગ અને નાણાકીય નીતિ: રિઝર્વ બેંક (RBI), MPC, રેપો રેટ, રિવર્સ રેપો, CRR, SLR, NPA નિવારણ (IBC ૨૦૧૬)',
          'રાજકોષીય નીતિ અને જાહેર નાણાં: કેન્દ્રીય બજેટ, મહેસૂલી અને મૂડી ખર્ચ, રાજકોષીય ખાધ, FRBM કાયદો',
          'કરવેરા માળખું: પ્રત્યક્ષ અને પરોક્ષ કર, GST નું માળખું અને GST પરિષદ',
        ],
      },
      {
        titleEn: 'Sectoral Growth & Gujarat Economy',
        titleGu: 'ક્ષેત્રીય વિકાસ અને ગુજરાતનું અર્થતંત્ર',
        topicsEn: [
          'Agriculture & Industry: Minimum Support Price (MSP), PM-KISAN, Food Security, Make in India, PLI schemes',
          'Infrastructure & Trade: National Infrastructure Pipeline (NIP), PM Gati Shakti, Foreign Trade Policy, Current Account Deficit (CAD)',
          'Gujarat Economy & State Schemes: GSDP growth, manufacturing hub (Chemicals, Petrochemicals, Textiles, Automobiles, Diamond polishing), GIFT City, Dholera SIR, Semiconductor ecosystem, Gujarat Budget and Socio-Economic Review',
        ],
        topicsGu: [
          'કૃષિ અને ઉદ્યોગ: ટેકાના ભાવ (MSP), પીએમ-કિસાન, રાષ્ટ્રીય ખાદ્ય સુરક્ષા, મેક ઇન ઇન્ડિયા, PLI યોજનાઓ',
          'ઇન્ફ્રાસ્ટ્રક્ચર અને વિદેશ વેપાર: પીએમ ગતિ શક્તિ, વિદેશ વેપાર નીતિ, ચાલુ ખાતાની ખાધ (CAD)',
          'ગુજરાતનું અર્થતંત્ર: GSDP વૃદ્ધિદર, ઉત્પાદન ક્ષેત્ર (રસાયણ, પેટ્રોકેમિકલ્સ, કાપડ, ઓટોમોબાઇલ, હીરા ઉદ્યોગ), ગિફ્ટ સિટી, ધોલેરા SIR, સેમિકન્ડક્ટર પોલિસી, ગુજરાત બજેટ અને સામાજિક-આર્થિક સમીક્ષા',
        ],
      },
    ],
  },
  {
    id: 'pre-sub-5',
    subjectNumber: 5,
    nameEn: 'Science & Technology (વિજ્ઞાન અને ટેકનોલોજી)',
    nameGu: 'વિજ્ઞાન અને પ્રૌદ્યોગિકી',
    subcategories: [
      {
        titleEn: 'General Science & Human Biology',
        titleGu: 'સામાન્ય વિજ્ઞાન અને માનવ જીવવિજ્ઞાન',
        topicsEn: [
          'Physics & Chemistry Fundamentals: Motion, gravity, optics, thermodynamics, acids/bases, polymers, everyday chemistry',
          'Human Body & Health: Digestive, circulatory, nervous systems, communicable vs non-communicable diseases (TB, Malaria, Diabetes, Cancer)',
          'Nutrition: Vitamins, minerals, deficiency diseases, national vaccination programs (Mission Indradhanush)',
        ],
        topicsGu: [
          'ભૌતિક અને રસાયણ વિજ્ઞાન: ગતિ, ગુરુત્વાકર્ષણ, પ્રકાશ, એસિડ/બેઝ, રોજિંદા જીવનમાં રસાયણશાસ્ત્ર',
          'માનવ શરીર અને સ્વાસ્થ્ય: પાચનતંત્ર, રુધિરાભિસરણ તંત્ર, ચેપી અને બિન-ચેપી રોગો (ટીબી, મેલેરિયા, ડાયાબિટીસ, કેન્સર)',
          'પોષણ: વિટામિન્સ, ખનિજો, ત્રુટિજન્ય રોગો, રાષ્ટ્રીય રસીકરણ કાર્યક્રમ (મિશન ઇન્દ્રધનુષ)',
        ],
      },
      {
        titleEn: 'Cutting-Edge Frontier Technologies',
        titleGu: 'આધુનિક ઉભરતી ટેકનોલોજી અને સંશોધનો',
        topicsEn: [
          'Space Technology: ISRO programs, PSLV, GSLV Mk III (LVM3), Chandrayaan missions, Aditya-L1, Gaganyaan manned mission, NavIC navigation',
          'Biotechnology & Genetics: DNA replication, CRISPR-Cas9 gene editing, GM crops, recombinant DNA vaccines',
          'Artificial Intelligence & Digital Tech: Machine Learning, Generative AI, Quantum Computing, Blockchain, 5G/6G communication, Supercomputing Mission (PARAM series)',
          'Defence Technology: DRDO missiles (Agni, Prithvi, BrahMos, Akash), ballistic missile defence, INS Vikrant indigenous aircraft carrier',
        ],
        topicsGu: [
          'અવકાશ ટેકનોલોજી: ઇસરો (ISRO), પીએસએલવી, જીએસએલવી (LVM3), ચંદ્રયાન-૩, આદિત્ય-L1, ગગનયાન મિશન, નાવિક (NavIC)',
          'બાયોટેકનોલોજી અને જિનેટિક્સ: DNA, ક્રિસ્પર (CRISPR-Cas9) જનીન સંપાદન, જીએમ પાકો, રસી નિર્માણ',
          'આર્ટિફિશિયલ ઇન્ટેલિજન્સ: મશીન લર્નિંગ, જનરેટિવ AI, ક્વોન્ટમ કમ્પ્યુટિંગ, બ્લોકચેઈન, 5G/6G, સુપરકમ્પ્યુટર (પરમ શ્રેણી)',
          'સંરક્ષણ ટેકનોલોજી: ડીઆરડીઓ (DRDO), મિસાઇલો (અગ્નિ, પૃથ્વી, બ્રહ્મોસ, આકાશ), સ્વદેશી વિમાનવાહક જહાજ INS વિક્રાંત',
        ],
      },
    ],
  },
  {
    id: 'pre-sub-6',
    subjectNumber: 6,
    nameEn: 'Environment & Ecology (પર્યાવરણ)',
    nameGu: 'પર્યાવરણ અને પારિસ્થિતિકી',
    subcategories: [
      {
        titleEn: 'Ecology & Biodiversity Conservation',
        titleGu: 'પારિસ્થિતિકી અને જૈવવિવિધતા સંરક્ષણ',
        topicsEn: [
          'Ecosystem Dynamics: Food chain, food web, trophic levels, ecological pyramids, bio-magnification, bio-accumulation',
          'Biodiversity: Levels of biodiversity, Hotspots (Western Ghats, Indo-Burma), IUCN Red List categories',
          'Conservation Protected Areas: National Parks, Wildlife Sanctuaries, Biosphere Reserves, Ramsar Wetland Sites (Nalsarovar, Thol, Wadhwana, Khijadiya in Gujarat)',
        ],
        topicsGu: [
          'નિવસનતંત્રની રચના: આહાર શૃંખલા, આહાર જાળ, પોષણ સ્તરો, પરિસ્થિતિકીય પિરામિડ, બાયો-મેગ્નિફિકેશન',
          'જૈવવિવિધતા: સ્તરો, હોટસ્પોટ્સ (પશ્ચિમ ઘાટ), IUCN રેડ લિસ્ટ વર્ગીકરણ',
          'સંરક્ષિત વિસ્તારો: રાષ્ટ્રીય ઉદ્યાનો, અભયારણ્યો, બાયોસ્ફિયર રિઝર્વ, ગુજરાતની રામસર સાઇટ્સ (નળ સરોવર, થોળ, વઢવાણા, ખીજડિયા)',
        ],
      },
      {
        titleEn: 'Climate Change, Laws & Conventions',
        titleGu: 'આબોહવા પરિવર્તન, કાયદાઓ અને સંમેલનો',
        topicsEn: [
          'Climate Change & Global Warming: Greenhouse gas effect, carbon footprint, ocean acidification, Net Zero targets (India’s 2070 target), Panchamrit pledges',
          'Environmental Legislation: Wildlife Protection Act 1972, Environment (Protection) Act 1986, Forest Conservation Act, National Green Tribunal (NGT)',
          'Global Conventions: UNFCCC (COP summits, Paris Agreement 2015), CBD (Kunming-Montreal framework), CITES, Ramsar Convention, Montreal Protocol',
          'Gujarat Environmental Issues: Coastal erosion, mangrove conservation, industrial effluent treatment, water table depletion in North Gujarat',
        ],
        topicsGu: [
          'આબોહવા પરિવર્તન: ગ્રીનહાઉસ વાયુઓ, કાર્બન ફૂટપ્રિન્ટ, ભારતનો ૨૦૭૦ સુધીમાં નેટ-ઝીરો લક્ષ્યાંક, પંચામૃત સંકલ્પ',
          'પર્યાવરણીય કાયદાઓ: વન્યજીવ સંરક્ષણ કાયદો ૧૯૭૨, પર્યાવરણ સંરક્ષણ કાયદો ૧૯૮૬, નેશનલ ગ્રીન ટ્રિબ્યુનલ (NGT)',
          'આંતરરાષ્ટ્રીય સંમેલનો: UNFCCC (પેરિસ સમજૂતી ૨૦૧૫), જૈવવિવિધતા સંમેલન (CBD), રામસર સંમેલન, મોન્ટ્રિયલ પ્રોટોકોલ',
          'ગુજરાતના પર્યાવરણીય પડકારો: દરિયાઈ ધોવાણ, ચેર (મેન્ગ્રોવ) સંરક્ષણ, ઔદ્યોગિક પ્રદૂષણ, ઉત્તર ગુજરાતમાં ભૂગર્ભજળ સ્તર ઘટવું',
        ],
      },
    ],
  },
  {
    id: 'pre-sub-7',
    subjectNumber: 7,
    nameEn: 'Current Affairs (વર્તમાન પ્રવાહો)',
    nameGu: 'દૈનિક વર્તમાન પ્રવાહો (ગુજરાત, રાષ્ટ્રીય, આંતરરાષ્ટ્રીય)',
    subcategories: [
      {
        titleEn: 'Events of State, National & Global Importance',
        titleGu: 'રાજ્ય, રાષ્ટ્રીય અને વૈશ્વિક મહત્વની ઘટનાઓ',
        topicsEn: [
          'Gujarat Current Affairs: State government schemes, budget announcements, Vibrant Gujarat summits, infrastructure inaugurations, industrial MoUs',
          'National Affairs: Landmark Supreme Court verdicts, key parliamentary bills, flagship central schemes, election outcomes, socio-economic indexes',
          'International Affairs: Bilateral summits (G20, BRICS, SCO, Quad), global geopolitical conflicts, treaties and international conventions',
          'Appointments, Awards & Sports: Constitutional appointees, Padma Awards, Nobel Prizes, Olympic/Commonwealth/National Games achievements',
          'Reports & Indexes: Global Hunger Index, Human Development Index (HDI), NITI Aayog SDG India Index, State Food Safety Index',
        ],
        topicsGu: [
          'ગુજરાતના વર્તમાન પ્રવાહો: રાજ્ય સરકારની કલ્યાણકારી યોજનાઓ, બજેટ જોગવાઈઓ, વાઇબ્રન્ટ ગુજરાત, ઔદ્યોગિક નીતિઓ',
          'રાષ્ટ્રીય બાબતો: સુપ્રીમ કોર્ટના ઐતિહાસિક ચુકાદાઓ, સંસદના નવા કાયદાઓ, કેન્દ્રની ફ્લેગશિપ યોજનાઓ, સામાજિક આંકડાઓ',
          'આંતરરાષ્ટ્રીય પ્રવાહો: આંતરરાષ્ટ્રીય સંમેલનો (G20, બ્રિક્સ, SCO, ક્વાડ), વૈશ્વિક રાજકીય ઘટનાઓ અને સમજૂતીઓ',
          'નિમણૂકો, પુરસ્કારો અને રમતગમત: બંધારણીય પદો પર નિમણૂક, પદ્મ પુરસ્કારો, નોબેલ પુરસ્કારો, ઓલિમ્પિક્સ અને રાષ્ટ્રીય રમતો',
          'મહત્વના અહેવાલો અને ઇન્ડેક્સ: માનવ વિકાસ આંક (HDI), નીતિ આયોગ SDG ઇન્ડેક્સ, રાજ્ય ખાદ્ય સુરક્ષા ઇન્ડેક્સ',
        ],
      },
    ],
  },
  {
    id: 'pre-sub-8',
    subjectNumber: 8,
    nameEn: 'Gujarat-Specific General Knowledge (ગુજરાત સામાન્ય જ્ઞાન)',
    nameGu: 'ગુજરાત સામાન્ય જ્ઞાન અને વિશેષ પરિપ્રેક્ષ્ય',
    subcategories: [
      {
        titleEn: 'Culture, Literature, Tribes & Administrative Profile',
        titleGu: 'સંસ્કૃતિ, સાહિત્ય, આદિવાસી વારસો અને વહીવટી માળખું',
        topicsEn: [
          'Gujarati Literature: Pioneers (Narsinh Mehta, Mirabai, Akho, Premanand), modern masters (Narmad, Govardhanram Tripathi, Umashankar Joshi, Pannalal Patel), Jnanpith awardees',
          'Folk Dances, Music & Fairs: Garba (UNESCO Intangible Cultural Heritage), Bhavai folk theatre, Tarnetar Fair, Shamlaji Fair, Madhavpur Fair, Vautha Fair (donkey trading)',
          'Famous Personalities: Mahatma Gandhi, Sardar Vallabhbhai Patel, Vikram Sarabhai, Jamshedji Tata, Tribhuvandas Patel, Ravishankar Maharaj',
          'Tribal Heritage of Gujarat: Major tribes (Bhil, Rathwa, Gamit, Chaudhari), Pithora wall paintings, Warli art, tribal festivals, Vanbandhu Kalyan Yojana',
          'Districts & Administration: 33 districts, headquarters, geographical boundaries, special talukas and regional tourist circuits',
        ],
        topicsGu: [
          'ગુજરાતી સાહિત્ય: મધ્યકાલીન ભક્તિ સાહિત્ય (નરસિંહ મહેતા, મીરાંબાઈ, અખો, પ્રેમાનંદ), અર્વાચીન યુગ (નર્મદ, ગોવર્ધનરામ ત્રિપાઠી, ઉમાશંકર જોશી, પન્નાલાલ પટેલ), જ્ઞાનપીઠ પુરસ્કાર વિજેતાઓ',
          'લોકનૃત્યો, સંગીત અને મેળાઓ: ગરબા (યુનેસ્કો અમૂર્ત વારસો), ભવાઈ લોકનાટ્ય, તરણેતરનો મેળો, શામળાજી મેળો, માધવપુર ઘેડ મેળો, વૌઠાનો મેળો',
          'ગુજરાતના યુગપુરુષો: મહાત્મા ગાંધી, સરદાર પટેલ, ડૉ. વિક્રમ સારાભાઈ, જમશેદજી તાતા, ત્રિભુવનદાસ પટેલ, રવિશંકર મહારાજ',
          'આદિવાસી સંસ્કૃતિ: ભીલ, રાઠવા, ગામિત, ચૌધરી જાતિઓ, પીઠોરા ભીંતચિત્રો, વારલી કળા, વનબંધુ કલ્યાણ યોજના',
          'જિલ્લાઓ અને વહીવટ: ૩૩ જિલ્લાઓ, જિલ્લા મથકો, ભૌગોલિક સીમાઓ, તાલુકાઓ અને મુખ્ય પ્રવાસન સર્કિટ',
        ],
      },
    ],
  },
];

// 3. COMPLETE MAINS SYLLABUS (7 PAPERS, 1,850 MARKS)
export const GPSC_MAINS_SYLLABUS: MainsPaperDetail[] = [
  {
    paperNumber: 'Paper 1',
    titleEn: 'Gujarati Language (ગુજરાતી ભાષા)',
    titleGu: 'પેપર ૧: ગુજરાતી ભાષા (ક્વોલિફાઇંગ)',
    marks: 300,
    nature: 'Qualifying',
    overviewEn: 'Qualifying language paper (300 marks). Minimum qualifying score required to evaluate merit papers. Tests administrative drafting and literary comprehension.',
    overviewGu: 'ક્વોલિફાઇંગ (પાસિંગ) પેપર (૩૦૦ ગુણ). મુખ્ય મેરિટ પેપર્સ ચકાસવા માટે આમાં લઘુત્તમ પાસિંગ ગુણ મેળવવા અનિવાર્ય છે. વહીવટી શૈલી અને ભાષાકીય ક્ષમતાની કસોટી.',
    topicsEn: [
      'Gujarati Essay Writing (૨૫૦-૩૦૦ શબ્દો)',
      'વિચાર વિસ્તાર (Expansion of ideas from prominent Gujarati couplets / poetry)',
      'સંક્ષેપીકરણ / સારાંશ લેખન (Summary writing - 1/3rd length with suitable title)',
      'ગદ્ય સમીક્ષા (Reading comprehension with analytical questions)',
      'ગુજરાતી વ્યાકરણ (Grammar: સંધિ, જોડણી, સમાસ, અલંકાર, છંદ, કહેવતો, રૂઢિપ્રયોગો, શબ્દસમૂહ માટે એક શબ્દ)',
      'અંગ્રેજીમાંથી ગુજરાતી ભાષાંતર (English to Gujarati Translation)',
      'બેઠકની કાર્યવાહી નોંધ / કાર્યવૃત્ત (Minutes of Official Meeting)',
      'અરજી લેખન / સત્તાવાર પત્રવ્યવહાર (Formal administrative applications and letters)',
      'પ્રેસ નોટ અને જાહેર નિવેદનો (Press note drafting for government departments)',
    ],
    topicsGu: [
      'ગુજરાતી નિબંધ લેખન (આશરે ૨૫૦ થી ૩૦૦ શબ્દો)',
      'વિચાર વિસ્તાર (પ્રખ્યાત પંક્તિઓ કે સુભાષિતોનું અર્થવિસ્તાર)',
      'સંક્ષેપીકરણ (આપેલા ગદ્યખંડનો ત્રીજા ભાગમાં સારાંશ અને શીર્ષક)',
      'ગદ્ય સમીક્ષા (પરિચ્છેદ વાંચીને પ્રશ્નોના તાર્કિક જવાબો)',
      'ગુજરાતી વ્યાકરણ (જોડણી, સંધિ, સમાસ, અલંકાર, છંદ, કહેવતો, રૂઢિપ્રયોગો, શબ્દસમૂહ)',
      'અંગ્રેજીમાંથી ગુજરાતીમાં સચોટ ભાષાંતર',
      'સત્તાવાર બેઠકની કાર્યવાહી નોંધ (Minutes of Meeting)',
      'અરજી લેખન અને સત્તાવાર પત્રવ્યવહાર',
      'પ્રેસ નોટ અને અખબારી યાદીનું મુસદ્દા લેખન',
    ],
  },
  {
    paperNumber: 'Paper 2',
    titleEn: 'English Language',
    titleGu: 'પેપર ૨: અંગ્રેજી ભાષા (ક્વોલિફાઇંગ)',
    marks: 300,
    nature: 'Qualifying',
    overviewEn: 'Qualifying language paper (300 marks). Tests communication competence in official administrative English.',
    overviewGu: 'ક્વોલિફાઇંગ (પાસિંગ) પેપર (૩૦૦ ગુણ). સરકારી વહીવટમાં જરૂરી અંગ્રેજી ભાષાકીય અભિવ્યક્તિ અને મુસદ્દા ઘડતરની ચકાસણી.',
    topicsEn: [
      'English Essay Writing (250-300 words on contemporary issues)',
      'Precis Writing (Condensing a passage to 1/3rd with title)',
      'Reading Comprehension (Passage with analytical questions)',
      'Gujarati-to-English Translation (Focus on administrative terminology)',
      'English Grammar & Vocabulary (Tenses, Active-Passive, Direct-Indirect, Prepositions, Idioms, Phrasal Verbs)',
      'Formal Letter Writing (Official representation, grievance redressal)',
      'Report Writing (Official committee or investigation report format)',
      'Speech Drafting (Speeches for public ceremonies and official launches)',
    ],
    topicsGu: [
      'અંગ્રેજી નિબંધ લેખન (સમકાલીન વિષયો પર ૨૫૦-૩૦૦ શબ્દો)',
      'સંક્ષિપ્ત લેખન (Precis Writing - ૧/૩ ભાગમાં શીર્ષક સાથે)',
      'વાંચન અર્થગ્રહણ (Reading Comprehension)',
      'ગુજરાતીમાંથી અંગ્રેજીમાં વહીવટી ભાષાંતર',
      'અંગ્રેજી વ્યાકરણ અને શબ્દભંડોળ (Tenses, Voice, Speech, Prepositions, Idioms)',
      'ઔપચારિક પત્ર લેખન (Formal Letter Writing)',
      'અહેવાલ લેખન (Official Report Writing)',
      'જાહેર ભાષણનું આલેખન (Speech Drafting)',
    ],
  },
  {
    paperNumber: 'Paper 3',
    titleEn: 'Essay Paper (નિબંધ)',
    titleGu: 'પેપર ૩: નિબંધ (મેરિટ પેપર)',
    marks: 250,
    nature: 'Merit',
    overviewEn: 'Merit Paper (250 marks). Candidates must write multi-dimensional, analytical essays choosing from thematic sections.',
    overviewGu: 'મેરિટ પેપર (૨૫૦ ગુણ). વિવિધ ક્ષેત્રોમાંથી પસંદ કરી તાર્કિક, વિશ્લેષણાત્મક અને સંતુલિત પરિપ્રેક્ષ્ય સાથે નિબંધ લખવાના રહે છે.',
    topicsEn: [
      '1. Social Issues: Education reforms, Women empowerment, Poverty eradication, Demographic dividend, Social justice',
      '2. Political & Governance Issues: Indian democracy, Electoral reforms, Cooperative federalism, Good governance, Decentralization',
      '3. Economic Issues: Sustainable growth, Agrarian crisis & Agri-tech, Digital economy, Inclusive development, Skilling India',
      '4. Science & Technology: AI ethics, Space exploration, Digital surveillance vs privacy, Green hydrogen revolution',
      '5. Environment & Sustainable Development: Climate crisis, Renewable energy transition, Circular economy, Disaster resilience',
      '6. Philosophical & Ethical Dimensions: Human values, Integrity in public life, Truth and non-violence, Moral leadership',
      '7. Gujarat-Specific Themes: Gujarat’s development model, Industrial legacy, Cultural resilience, Gujarati diaspora worldwide',
    ],
    topicsGu: [
      '૧. સામાજિક મુદ્દાઓ: શિક્ષણ સુધારા, મહિલા સશક્તિકરણ, ગરીબી નિવારણ, સામાજિક ન્યાય',
      '૨. રાજકીય અને શાસકીય મુદ્દાઓ: લોકશાહીના પડકારો, ચૂંટણી સુધારા, સહકારી સંઘવાદ, સુશાસન',
      '૩. આર્થિક મુદ્દાઓ: ટકાઉ આર્થિક વિકાસ, કૃષિ ક્ષેત્રમાં ટેકનોલોજી, ડિજિટલ અર્થતંત્ર, સર્વસમાવેશક વિકાસ',
      '૪. વિજ્ઞાન અને ટેકનોલોજી: AI ની નૈતિકતા, અવકાશ સંશોધન, ગોપનીયતા વિ. દેખરેખ, હરિત ઊર્જા ક્રાંતિ',
      '૫. પર્યાવરણ અને સસ્ટેનેબલ ડેવલપમેન્ટ: આબોહવા પરિવર્તન, આપત્તિ વ્યવસ્થાપન, પર્યાવરણ અને વિકાસનું સંતુલન',
      '૬. દાર્શનિક અને નૈતિક વિષયો: માનવીય મૂલ્યો, જાહેર જીવનમાં સત્યનિષ્ઠા, નૈતિક નેતૃત્વ',
      '૭. ગુજરાત-વિશેષ વિષયો: ગુજરાતનું વિકાસ મોડેલ, ઔદ્યોગિક વારસો, સાંસ્કૃતિક ઓળખ, વિશ્વમાં વસતા ગુજરાતીઓ',
    ],
  },
  {
    paperNumber: 'Paper 4',
    titleEn: 'General Studies 1 (GS-1)',
    titleGu: 'પેપર ૪: સામાન્ય અભ્યાસ ૧ (GS-1 - મેરિટ પેપર)',
    marks: 250,
    nature: 'Merit',
    overviewEn: 'History, Indian Society and Culture. Note that Indian Society is integrated into GS-1 under the 2026-27 syllabus.',
    overviewGu: 'ઇતિહાસ, ભારતીય સમાજ અને સાંસ્કૃતિક વારસો. (નવા ૨૦૨૬-૨૭ અભ્યાસક્રમમાં "ભારતીય સમાજ" GS-૧ નો ભાગ છે).',
    topicsEn: [
      'Indian History & Culture: Ancient to Modern, Art, Architecture, Literature, Sculptures, Bhakti/Sufi movements',
      'Freedom Struggle: Mass phases, Revolutionary movements, Subhash Bose & INA, Partition dynamics, Post-independence consolidation',
      'History & Cultural Heritage of Gujarat: Solanki architecture, Stepwells (Rani ki Vav, Adalaj), Wooden architecture, Fairs & Festivals, Tribals of Gujarat',
      'Indian Society & Characteristics: Salient features of Indian society, Diversity (linguistic, religious, regional)',
      'Role of Women & Women’s Organizations: Issues related to gender disparity, SHGs, women in workforce',
      'Population & Demographic Dynamics: Urbanization, smart cities, slums, metropolitan governance, migration challenges',
      'Poverty, Developmental Issues & Social Empowerment: Caste dynamics, communalism, regionalism, secularism, social problems in Gujarat',
    ],
    topicsGu: [
      'ભારતીય ઇતિહાસ અને સંસ્કૃતિ: પ્રાચીનથી આધુનિક, કલા, સ્થાપત્ય, સાહિત્ય અને ભક્તિ આંદોલન',
      'સ્વાતંત્ર્ય સંગ્રામ: લોકઆંદોલનો, ક્રાંતિકારીઓ, સુભાષચંદ્ર બોઝ, આઝાદી પછીનું એકીકરણ (સરદાર પટેલનું યોગદાન)',
      'ગુજરાતનો ઇતિહાસ અને વારસો: સોલંકી સ્થાપત્ય, વાવ સ્થાપત્ય (રાણકી વાવ, અડાલજ), કાષ્ઠકળા, લોકમેળાઓ અને ઉત્સવો',
      'ભારતીય સમાજની લાક્ષણિકતાઓ: સમાજનું માળખું, ભાષાકીય અને સાંસ્કૃતિક વિવિધતા',
      'મહિલાઓની ભૂમિકા અને સંગઠનો: જાતિગત અસમાનતા, સ્વસહાય જૂથો (SHGs), કાર્યબળમાં મહિલાઓ',
      'વસ્તી અને શહેરીકરણ: શહેરીકરણના પડકારો, સ્લમ્સ, સ્થળાંતર, સ્માર્ટ શહેરોનું આયોજન',
      'ગરીબી, સામાજિક સશક્તિકરણ અને પડકારો: જ્ઞાતિવાદ, કોમવાદ, પ્રદેશવાદ, બિનસાંપ્રદાયિકતા, ગુજરાતના સામાજિક પ્રશ્નો',
    ],
  },
  {
    paperNumber: 'Paper 5',
    titleEn: 'General Studies 2 (GS-2)',
    titleGu: 'પેપર ૫: સામાન્ય અભ્યાસ ૨ (GS-2 - મેરિટ પેપર)',
    marks: 250,
    nature: 'Merit',
    overviewEn: 'Constitution, Polity, Governance and International Relations.',
    overviewGu: 'બંધારણ, રાજ્યવ્યવસ્થા, શાસન (Governance) અને આંતરરાષ્ટ્રીય સંબંધો (IR).',
    topicsEn: [
      'Indian Constitution: Preamble, Fundamental Rights & Duties, DPSP, Amendments, Basic Structure doctrine',
      'Structure of Government: Parliament and State Legislatures, Executive, Judiciary & Judicial Review, Public Interest Litigation (PIL)',
      'Federal Dynamics: Centre-State relations, Fiscal federalism (GST Council, Finance Commission), Inter-State disputes',
      'Local Governance: Panchayati Raj & Urban Local Bodies, PESA Act, 73rd/74th Amendments in Gujarat',
      'Constitutional & Statutory Bodies: Election Commission, CAG, UPSC, GPSC, Finance Commission, CBI, CVC, Lokpal',
      'Governance & Transparency: E-Governance, Digital India, Right to Information (RTI Act 2005), Citizen’s Charters, Social Audit',
      'Role of Civil Services in Democracy: Administrative neutrality, civil services reforms, ARC-2 recommendations',
      'International Relations: India’s Foreign Policy, Neighbourhood First, Act East, Relations with USA, China, Russia, EU, Global Forums (UN, G20, BRICS, Quad, WTO)',
    ],
    topicsGu: [
      'ભારતીય બંધારણ: આમુખ, મૂળભૂત અધિકારો, ફરજો, DPSP, સુધારાઓ, મૂળભૂત માળખાનો સિદ્ધાંત',
      'શાસન પ્રણાલી: સંસદ, વિધાનમંડળ, કારોબારી, ન્યાયતંત્ર, ન્યાયિક સક્રિયતા, જાહેર હિતની અરજી (PIL)',
      'સંઘીય વ્યવસ્થા: કેન્દ્ર-રાજ્ય સંબંધો, નાણાકીય સંઘવાદ (GST પરિષદ, નાણા પંચ), આંતરરાજ્ય વિવાદો',
      'સ્થાનિક સ્વરાજ્ય: પંચાયતી રાજ, ૭૩મો/૭૪મો સુધારો, પેસા (PESA) કાયદો, ગુજરાતમાં સ્થાનિક વહીવટ',
      'બંધારણીય અને વૈધાનિક સંસ્થાઓ: ચૂંટણી પંચ, CAG, UPSC, GPSC, CVC, સીબીઆઈ, લોકપાલ અને લોકાયુક્ત',
      'સુશાસન અને પારદર્શિતા: ઈ-ગવર્નન્સ, માહિતી અધિકાર (RTI ૨૦૦૫), સિટીઝન ચાર્ટર, સોશિયલ ઑડિટ',
      'લોકશાહીમાં સનદી સેવાઓની ભૂમિકા: વહીવટી તટસ્થતા, સનદી સેવા સુધારા, દ્વિતીય વહીવટી સુધારા પંચ (ARC-2)',
      'આંતરરાષ્ટ્રીય સંબંધો: ભારતની વિદેશ નીતિ, પાડોશી દેશો સાથે સંબંધો, અમેરિકા, ચીન, રશિયા, વૈશ્વિક સંગઠનો (UN, G20, ક્વાડ)',
    ],
  },
  {
    paperNumber: 'Paper 6',
    titleEn: 'General Studies 3 (GS-3)',
    titleGu: 'પેપર ૬: સામાન્ય અભ્યાસ ૩ (GS-3 - મેરિટ પેપર)',
    marks: 250,
    nature: 'Merit',
    overviewEn: 'Economy, Geography, Science, Technology, Environment and Internal Security. (Geography is part of GS-3 in the updated scheme).',
    overviewGu: 'અર્થતંત્ર, ભૂગોળ, વિજ્ઞાન-ટેકનોલોજી, પર્યાવરણ અને આંતરિક સુરક્ષા. (નવા સિલેબસ મુજબ ભૂગોળ GS-૩ નો ભાગ છે).',
    topicsEn: [
      'Indian & Gujarat Economy: Macro fundamentals, Union Budget, Gujarat Budget, Socio-Economic Review, NITI Aayog',
      'Agriculture & Industry: Food processing, supply chain logistics, PM Gati Shakti, Gujarat industrial policies',
      'Physical & Economic Geography: Physical divisions of India & Gujarat, monsoon, rivers, mineral deposits, ports and coastal economy',
      'Science & Technology: Space tech (ISRO), Nuclear technology, Biotechnology, Artificial Intelligence, Robotics, Supercomputing',
      'Environment & Ecology: Climate change, National Action Plan on Climate Change (NAPCC), Renewable energy targets, Biodiversity conservation',
      'Disaster Management: Earthquakes (Kutch 2001 lessons), Cyclones in Arabian Sea (Biparjoy disaster management model), Floods, GSDMA framework',
      'Internal Security: Border management (Indo-Pak border in Gujarat, Sir Creek dispute), Cyber security, Coastal security apparatus, Coastal police stations',
    ],
    topicsGu: [
      'ભારત અને ગુજરાતનું અર્થતંત્ર: સ્થૂળ અર્થશાસ્ત્ર, કેન્દ્રીય બજેટ, ગુજરાત બજેટ, સામાજિક-આર્થિક સમીક્ષા, નીતિ આયોગ',
      'કૃષિ અને ઔદ્યોગિક વિકાસ: ફૂડ પ્રોસેસિંગ, સપ્લાય ચેઈન, પીએમ ગતિ શક્તિ, ગુજરાતની ઔદ્યોગિક નીતિઓ',
      'ભૌતિક અને આર્થિક ભૂગોળ: ભારત અને ગુજરાતની ભૂગોળ, મોસમી પવનો, નદી પ્રણાલી, ખનિજ સંપત્તિ, દરિયાઈ બંદરોનો વિકાસ',
      'વિજ્ઞાન અને ટેકનોલોજી: ઇસરો (ISRO), પરમાણુ ઊર્જા, બાયોટેકનોલોજી, આર્ટિફિશિયલ ઇન્ટેલિજન્સ (AI), રોબોટિક્સ',
      'પર્યાવરણ અને સંરક્ષણ: આબોહવા પરિવર્તન, પુનઃપ્રાપ્ય ઊર્જા લક્ષ્યાંકો, જૈવવિવિધતા સંરક્ષણ, પ્રદૂષણ નિયંત્રણ',
      'આપત્તિ વ્યવસ્થાપન: ભૂકંપ (કચ્છ ૨૦૦૧ પાઠ), અરબી સમુદ્રના વાવાઝોડાં (બિપોરજોય આપત્તિ મોડેલ), પૂર વ્યવસ્થાપન, GSDMA',
      'આંતરિક સુરક્ષા: સરહદ વ્યવસ્થાપન (ભારત-પાક સરહદ, સર ક્રિક વિવાદ), સાયબર સુરક્ષા, દરિયાઈ સુરક્ષા વ્યવસ્થા',
    ],
  },
  {
    paperNumber: 'Paper 7',
    titleEn: 'General Studies 4 (GS-4)',
    titleGu: 'પેપર ૭: સામાન્ય અભ્યાસ ૪ (GS-4 - નીતિશાસ્ત્ર, સત્યનિષ્ઠા અને યોગ્યતા)',
    marks: 250,
    nature: 'Merit',
    overviewEn: 'Ethics, Integrity and Aptitude. Tests moral philosophy, emotional intelligence, and administrative problem solving through case studies.',
    overviewGu: 'નીતિશાસ્ત્ર, સત્યનિષ્ઠા અને યોગ્યતા (મેરિટ પેપર - ૨૫૦ ગુણ). સનદી અધિકારી તરીકે નૈતિક નિર્ણયશક્તિ અને કેસ સ્ટડીઝ.',
    topicsEn: [
      'Ethics & Human Interface: Essence, determinants, and consequences of ethics in human actions; dimensions of ethics; ethics in private and public relationships',
      'Human Values & Moral Thinkers: Lessons from lives of great leaders, reformers, administrators; Western & Indian moral philosophers (Socrates, Kant, Gandhi, Kautilya)',
      'Attitude: Content, structure, function; its influence and relation with thought and behaviour; moral and political attitudes; social influence and persuasion',
      'Aptitude & Foundational Values for Civil Service: Integrity, impartiality, non-partisanship, objectivity, dedication to public service, empathy, tolerance, compassion towards weaker sections',
      'Emotional Intelligence: Concepts, utilities, and application in administration and governance; conflict management',
      'Public Service Ethics & Nolan Principles: Selflessness, Integrity, Objectivity, Accountability, Openness, Honesty, Leadership; Code of conduct, RTI, Citizens Charters',
      'Probity in Governance: Concept of public service; philosophical basis of governance; information sharing; challenges of corruption; Prevention of Corruption Act',
      'Case Studies: Practical problem-solving on administrative dilemmas, ethical conflicts, pressure from politicians, tender scams, relief fund distribution',
    ],
    topicsGu: [
      'નીતિશાસ્ત્ર અને માનવીય આંતરક્રિયા: માનવીય કાર્યોમાં નીતિશાસ્ત્રનું મહત્વ, નિર્ધારકો અને અસરો; ખાનગી અને જાહેર સંબંધોમાં નૈતિકતા',
      'માનવીય મૂલ્યો અને મહાન ચિંતકો: મહાન નેતાઓ, સુધારકો અને વહીવટકર્તાઓના જીવનમાંથી બોધપાઠ; ભારતીય અને પશ્ચિમી ફિલસૂફો (ગાંધી, કૌટિલ્ય, સોક્રેટીસ, કાન્ટ)',
      'વલણ (Attitude): બંધારણ, કાર્યો, વિચાર અને વર્તન પર પ્રભાવ; નૈતિક અને રાજકીય વલણો; સામાજિક પ્રભાવ અને સમજાવટ (Persuasion)',
      'સનદી સેવા માટે પાયાના મૂલ્યો: સત્યનિષ્ઠા, નિષ્પક્ષતા, તટસ્થતા, વસ્તુનિષ્ઠતા, જાહેર સેવા પ્રત્યે સમર્પણ, નબળા વર્ગો પ્રત્યે સંવેદનશીલતા અને સહાનુભૂતિ',
      'સાંવેગિક બુદ્ધિમત્તા (Emotional Intelligence): સંકલ્પના, વહીવટ અને શાસનમાં તેનો વ્યવહારુ ઉપયોગ; તણાવ અને સંઘર્ષ વ્યવસ્થાપન',
      'જાહેર સેવા નૈતિકતા અને નોલાન સમિતિના ૭ સિદ્ધાંતો: નિઃસ્વાર્થતા, સત્યનિષ્ઠા, નિષ્પક્ષતા, જવાબદેહી, પારદર્શિતા, પ્રામાણિકતા, નેતૃત્વ',
      'શાસનમાં શુદ્ધતા (Probity in Governance): ભ્રષ્ટાચારના પડકારો, માહિતીની વહેંચણી, ભ્રષ્ટાચાર નિવારણ કાયદો, વ્હિસલ બ્લોઅર સંરક્ષણ',
      'વ્યવહારુ કેસ સ્ટડીઝ (Case Studies): વહીવટી દ્વિધાઓ, રાજકીય દબાણ, ટેન્ડર પ્રક્રિયામાં પારદર્શિતા અને કુદરતી આપત્તિ વખતે રાહત વિતરણના પ્રશ્નો',
    ],
  },
];

// 4. FREE OFFICIAL TEXTBOOKS & PDF VAULT (100% Free & Legal)
export const FREE_PDF_VAULT: FreePdfResource[] = [
  {
    id: 'pdf-gcert-all',
    titleEn: 'GCERT Textbooks (Classes 6 to 12) - Social Science, History, Geography, Polity, Science',
    titleGu: 'GCERT પાઠ્યપુસ્તકો (ધોરણ ૬ થી ૧૨) - સામાજિક વિજ્ઞાન, ઇતિહાસ, ભૂગોળ, રાજ્યશાસ્ત્ર, વિજ્ઞાન',
    category: 'GCERT',
    subjectId: 'all',
    medium: 'gu',
    downloadUrl: 'https://gujarat-education.gov.in/textbook/',
    fileType: 'PDF / Official Portal',
    fileSizeApprox: 'Free Chapter-wise PDFs',
    officialPublisherEn: 'Gujarat State Board of School Textbooks (GSBST), Gandhinagar',
    officialPublisherGu: 'ગુજરાત રાજ્ય શાળા પાઠ્યપુસ્તક મંડળ, ગાંધીનગર',
    descriptionEn: 'The absolute bedrock of GPSC preparation. 100% free official textbook PDFs published by Gujarat Government. GPSC directly quotes these for Prelims answer keys.',
    descriptionGu: 'GPSC તૈયારીનો સુવર્ણ પાયો. ગુજરાત સરકાર દ્વારા પ્રકાશિત અધિકૃત મફત પાઠ્યપુસ્તકો. પ્રોવિઝનલ આન્સર કી સામે આધાર રજૂ કરવા આ પુસ્તકો જ સર્વોપરી ગણાય છે.',
    is100PercentFree: true,
    recommendedFor: 'Prelims & Mains Foundations (Must read for all beginners)',
    coverImageUrl: '/images/books/books-1.jpg',
  },
  {
    id: 'pdf-ncert-all',
    titleEn: 'NCERT Textbooks (Classes 6 to 12) - History, Geography, Economy, Polity, Science',
    titleGu: 'NCERT પાઠ્યપુસ્તકો (ધોરણ ૬ થી ૧૨) - ઇતિહાસ, ભૂગોળ, અર્થતંત્ર, રાજ્યવ્યવસ્થા, વિજ્ઞાન',
    category: 'NCERT',
    subjectId: 'all',
    medium: 'bilingual',
    downloadUrl: 'https://ncert.nic.in/textbook.php',
    fileType: 'PDF / Official Portal',
    fileSizeApprox: 'Free Official E-Books',
    officialPublisherEn: 'National Council of Educational Research and Training (NCERT), New Delhi',
    officialPublisherGu: 'રાષ્ટ્રીય શૈક્ષણિક સંશોધન અને તાલીમ પરિષદ (NCERT), નવી દિલ્હી',
    descriptionEn: 'Official government textbook portal for all classes in Hindi, English, and Urdu. Conceptual clarity for national themes, economic fundamentals, and physical geography.',
    descriptionGu: 'ભારત સરકારનું સત્તાવાર પોર્ટલ. રાષ્ટ્રીય ઇતિહાસ, ભૌતિક ભૂગોળ અને સ્થૂળ અર્થતંત્રના મૂળભૂત સિદ્ધાંતો માટે શ્રેષ્ઠ સ્ત્રોત.',
    is100PercentFree: true,
    recommendedFor: 'National topics, UPSC cross-preparation, and Macroeconomics',
    coverImageUrl: '/images/books/books-2.jpg',
  },
  {
    id: 'pdf-constitution-official',
    titleEn: 'The Constitution of India (Authentic Legislative Text - Updated 2024)',
    titleGu: 'ભારતનું બંધારણ (સત્તાવાર કાયદા મંત્રાલય અધિકૃત ગ્રંથ - અદ્યતન આવૃત્તિ)',
    category: 'Reference PDF',
    subjectId: 'polity',
    medium: 'bilingual',
    downloadUrl: 'https://legislative.gov.in/constitution-of-india/',
    fileType: 'PDF',
    fileSizeApprox: '4.8 MB',
    officialPublisherEn: 'Legislative Department, Ministry of Law and Justice, Government of India',
    officialPublisherGu: 'વિધાન વિભાગ, કાયદા અને ન્યાય મંત્રાલય, ભારત સરકાર',
    descriptionEn: 'The official, legal, unmodified bare text of the Constitution of India in English and Hindi/regional translation. Every single article, schedule, and amendment from Art 1 to 395.',
    descriptionGu: 'ભારત સરકારના કાયદા મંત્રાલય દ્વારા પ્રકાશિત ભારતનું મૂળ બંધારણ. કલમ ૧ થી ૩૯૫, તમામ પરિશિષ્ટો અને તાજેતરના તમામ બંધારણીય સુધારાઓ સાથે.',
    is100PercentFree: true,
    recommendedFor: 'Accurate article numbers, schedules, and word-by-word constitutional interpretation',
    coverImageUrl: '/images/books/books-3.jpg',
  },
  {
    id: 'pdf-gujarat-budget-ser',
    titleEn: 'Gujarat State Budget & Socio-Economic Review (Latest 2024-25 & 2025-26)',
    titleGu: 'ગુજરાત સરકારનું બજેટ અને સામાજિક-આર્થિક સમીક્ષા (Socio-Economic Review)',
    category: 'Government Report',
    subjectId: 'economy',
    medium: 'bilingual',
    downloadUrl: 'https://budget.gujarat.gov.in/',
    fileType: 'PDF',
    fileSizeApprox: '12.4 MB',
    officialPublisherEn: 'Finance Department, Government of Gujarat, Gandhinagar',
    officialPublisherGu: 'નાણાં વિભાગ, ગુજરાત સરકાર, ગાંધીનગર',
    descriptionEn: 'The most authoritative source for Gujarat Economy. Contains verified data on GSDP, sectoral contributions, irrigation progress, renewable energy, and state welfare schemes.',
    descriptionGu: 'ગુજરાતના અર્થતંત્ર માટે સૌથી આધારભૂત સરકારી દસ્તાવેજ. રાજ્યનો GSDP, ક્ષેત્રીય વૃદ્ધિદર, ખેતી, સિંચાઈ, ઊર્જા અને તમામ કલ્યાણકારી યોજનાઓના સચોટ આંકડા.',
    is100PercentFree: true,
    recommendedFor: 'Prelims Economy statistics & Mains GS-3 high-scoring evidence',
    coverImageUrl: '/images/books/books-4.jpg',
  },
  {
    id: 'pdf-gujarat-pakshik',
    titleEn: 'Gujarat Pakshik (ગુજરાત પાક્ષિક) - Official Government Fortnightly Magazine',
    titleGu: 'ગુજરાત પાક્ષિક - રાજ્ય સરકારનું સત્તાવાર પાક્ષિક મુખપત્ર (મહિને ૨ અંક)',
    category: 'Government Report',
    subjectId: 'current_affairs',
    medium: 'gu',
    downloadUrl: 'https://gujaratinformation.gujarat.gov.in/',
    fileType: 'PDF Archive',
    fileSizeApprox: '8 MB per issue',
    officialPublisherEn: 'Information Department, Government of Gujarat',
    officialPublisherGu: 'માહિતી નિયામકની કચેરી, ગુજરાત સરકાર',
    descriptionEn: 'Published twice every month. Contains official details of Gujarat Government policies, Cabinet decisions, industrial MoUs, rural developments, and cultural announcements.',
    descriptionGu: 'દર મહિને બે વાર પ્રકાશિત થતું સરકારનું સત્તાવાર મેગેઝિન. મંત્રીમંડળના નિર્ણયો, નવી સરકારી નીતિઓ, આદિવાસી કલ્યાણ અને ગુજરાતના વર્તમાન પ્રવાહોનો સચોટ સ્ત્રોત.',
    is100PercentFree: true,
    recommendedFor: 'Gujarat Current Affairs & Mains Essay/Answer examples',
    coverImageUrl: '/images/books/books-5.jpg',
  },
  {
    id: 'pdf-prs-india',
    titleEn: 'PRS Legislative Research - Monthly Policy Reviews & Bill Summaries',
    titleGu: 'PRS લેજિસ્લેટિવ રિસર્ચ - સંસદીય ખરડાઓ અને નીતિ વિશ્લેષણ',
    category: 'Reference PDF',
    subjectId: 'polity',
    medium: 'en',
    downloadUrl: 'https://prsindia.org/',
    fileType: 'Web Portal / PDFs',
    fileSizeApprox: 'Free Reports',
    officialPublisherEn: 'PRS Legislative Research, New Delhi',
    officialPublisherGu: 'પીઆરએસ લેજિસ્લેટિવ રિસર્ચ, નવી દિલ્હી',
    descriptionEn: 'Non-partisan research institute providing objective summaries of every bill introduced in Parliament, committee reports, and state assembly laws.',
    descriptionGu: 'સંસદમાં રજૂ થતા દરેક ખરડા (Bills), સંસદીય સમિતિઓના અહેવાલો અને કાયદાઓનું નિષ્પક્ષ, મુદ્દાસર વિશ્લેષણ.',
    is100PercentFree: true,
    recommendedFor: 'Mains GS-2 Polity, Governance, and Legislative analysis',
    coverImageUrl: '/images/books/books-6.jpg',
  },
  {
    id: 'pdf-pib-releases',
    titleEn: 'PIB (Press Information Bureau) - Official Government Press Releases & Year End Reviews',
    titleGu: 'PIB (પ્રેસ ઇન્ફર્મેશન બ્યુરો) - કેન્દ્ર સરકારના સત્તાવાર અખબારી નિવેદનો અને મંત્રાલય વાર્ષિક સમીક્ષાઓ',
    category: 'Government Report',
    subjectId: 'current_affairs',
    medium: 'bilingual',
    downloadUrl: 'https://pib.gov.in/',
    fileType: 'Web & PDF Releases',
    fileSizeApprox: 'Free Daily Releases',
    officialPublisherEn: 'Press Information Bureau, Ministry of Information & Broadcasting, Govt of India',
    officialPublisherGu: 'માહિતી અને પ્રસારણ મંત્રાલય, ભારત સરકાર',
    descriptionEn: 'Direct primary source for all central schemes, cabinet decisions, ISRO launches, and MoUs. Year-End Reviews of ministries are a goldmine for GS papers.',
    descriptionGu: 'કેન્દ્ર સરકારની તમામ યોજનાઓ, કેબિનેટ નિર્ણયો અને મંત્રાલયના વર્ષાંત અહેવાલોનો સીધો સ્ત્રોત. ફેક ન્યૂઝથી મુક્ત સત્તાવાર માહિતી.',
    is100PercentFree: true,
    recommendedFor: 'Daily Current Affairs, Science & Tech updates, Central Schemes',
    coverImageUrl: '/images/books/books-7.jpg',
  },
  {
    id: 'pdf-gpsc-official-syllabus',
    titleEn: 'GPSC Official Class 1 & 2 Notification, Rules & Scheme PDF',
    titleGu: 'GPSC વર્ગ ૧ અને ૨ સત્તાવાર જાહેરાત, પરીક્ષા નિયમો અને વિગતવાર સિલેબસ PDF',
    category: 'Official Syllabus',
    subjectId: 'all',
    medium: 'bilingual',
    downloadUrl: 'https://gpsc.gujarat.gov.in/',
    fileType: 'Official PDF',
    fileSizeApprox: '3.2 MB',
    officialPublisherEn: 'Gujarat Public Service Commission (GPSC), Gandhinagar',
    officialPublisherGu: 'ગુજરાત જાહેર સેવા આયોગ (GPSC), ગાંધીનગર',
    descriptionEn: 'The definitive legal notification issued by the Commission containing eligibility criteria, exam scheme, age relaxations, and topic-by-topic official syllabus text.',
    descriptionGu: 'આયોગ દ્વારા બહાર પાડવામાં આવેલ કાનૂની પરિપત્ર જેમાં પરીક્ષા પદ્ધતિ, લઘુત્તમ લાયકાત, વયમર્યાદા અને સત્તાવાર સિલેબસ આપેલ છે.',
    is100PercentFree: true,
    recommendedFor: 'Final official verification of exam rules and scope',
    coverImageUrl: '/images/books/books-8.jpg',
  },
  {
    id: 'pdf-arc2-reports',
    titleEn: '2nd Administrative Reforms Commission (ARC-2) Reports - Ethics & Governance',
    titleGu: 'દ્વિતીય વહીવટી સુધારા પંચ (ARC-2) અહેવાલો - નીતિશાસ્ત્ર અને સુશાસન',
    category: 'Government Report',
    subjectId: 'ethics',
    medium: 'en',
    downloadUrl: 'https://darpg.gov.in/',
    fileType: 'PDF Reports',
    fileSizeApprox: 'Free Official Reports',
    officialPublisherEn: 'Department of Administrative Reforms and Public Grievances (DARPG), Govt of India',
    officialPublisherGu: 'વહીવટી સુધારા અને જાહેર ફરિયાદ વિભાગ, ભારત સરકાર',
    descriptionEn: 'The holy grail for GS-4 Ethics and GS-2 Governance. Report 4 ("Ethics in Governance") and Report 1 ("Right to Information: Master Key to Good Governance") are directly asked in Mains.',
    descriptionGu: 'મેઈન્સ GS-૪ નીતિશાસ્ત્ર અને GS-૨ શાસન માટેનો સર્વોચ્ચ સંદર્ભ. રિપોર્ટ ૪ "Ethics in Governance" માંથી દર વર્ષે સીધા પ્રશ્નો પૂછાય છે.',
    is100PercentFree: true,
    recommendedFor: 'Mains GS-4 Ethics high-scoring answer frameworks & case studies',
    coverImageUrl: '/images/books/books-9.jpg',
  },
];

// 5. 6-MONTH STRUCTURED STUDY TIMELINE FOR BEGINNERS (2-3 Hours Daily)
export const SIX_MONTH_STUDY_PLAN: StudyMonthPlan[] = [
  {
    month: 1,
    focusEn: 'Indian History & Gujarat History',
    focusGu: 'ભારતનો ઇતિહાસ અને ગુજરાતનો ઇતિહાસ',
    subjectsEn: ['Ancient India (Indus Valley, Vedic, Maurya, Gupta)', 'Gujarat History (Lothal, Dholavira, Maitraka, Solanki)', 'Modern India (1857 to Freedom)'],
    subjectsGu: ['પ્રાચીન ભારત (સિંધુ સભ્યતા, મૌર્ય, ગુપ્ત)', 'ગુજરાતનો ઇતિહાસ (લોથલ, ધોળાવીરા, મૈત્રક, સોલંકી યુગ)', 'આધુનિક ભારત (૧૮૫૭ થી આઝાદી)'],
    milestonesEn: 'Complete GCERT Std 6-10 Social Science + Solve 50 past history PYQs. Build chronological timelines.',
    milestonesGu: 'GCERT ધોરણ ૬ થી ૧૦ સામાજિક વિજ્ઞાન પૂર્ણ કરો + ૫૦ PYQ સોલ્વ કરો. સમયરેખા (Time-line) તૈયાર કરો.',
  },
  {
    month: 2,
    focusEn: 'Indian Constitution & Polity',
    focusGu: 'ભારતીય બંધારણ અને રાજ્યવ્યવસ્થા',
    subjectsEn: ['Preamble & Fundamental Rights (Art 12-35)', 'DPSP & Duties (Art 36-51A)', 'President, Governor, Parliament & Judiciary'],
    subjectsGu: ['આમુખ અને મૂળભૂત અધિકારો (કલમ ૧૨-૩૫)', 'માર્ગદર્શક સિદ્ધાંતો અને ફરજો (કલમ ૩૬-૫૧A)', 'રાષ્ટ્રપતિ, રાજ્યપાલ, સંસદ અને ન્યાયતંત્ર'],
    milestonesEn: 'Master Articles 1 to 51A thoroughly. Practice option elimination on 100 polity questions.',
    milestonesGu: 'કલમ ૧ થી ૫૧A ની કંઠસ્થ સમજ. બંધારણના ૧૦૦ પ્રશ્નો સોલ્વ કરી નેગેટિવ માર્કિંગ નિયંત્રણ શીખો.',
  },
  {
    month: 3,
    focusEn: 'Geography (Physical, India & Gujarat)',
    focusGu: 'ભૂગોળ (ભૌતિક, ભારત અને ગુજરાતની ભૂગોળ)',
    subjectsEn: ['Atmosphere, Climate, Monsoon', 'River systems & Dams of Gujarat', 'Ports, Minerals, Soil & Agriculture'],
    subjectsGu: ['વાતાવરણ, આબોહવા અને મોસમી પવનો', 'ગુજરાતની નદીઓ, ડેમ અને સિંચાઈ', 'બંદરો, ખનિજો, જમીન અને કૃષિ'],
    milestonesEn: 'Atlas mapping practice (Rivers, Mountain passes, National Parks, Gujarat coastline).',
    milestonesGu: 'નકશાપૂર્તિ અને એટલાસ પ્રેક્ટિસ (નદીઓ, અભયારણ્યો, જમીનો અને ૧,૬૦૦ કિમી દરિયાકિનારો).',
  },
  {
    month: 4,
    focusEn: 'Indian Economy & Gujarat Budget',
    focusGu: 'ભારતીય અર્થતંત્ર, બજેટ અને સરકારી યોજનાઓ',
    subjectsEn: ['GDP, Inflation, Banking & RBI Monetary Policy', 'Gujarat Budget & Socio-Economic Review', 'Government Welfare Schemes'],
    subjectsGu: ['રાષ્ટ્રીય આવક (GDP), ફુગાવો, બેંકિંગ અને RBI નાણાકીય નીતિ', 'ગુજરાત બજેટ અને સામાજિક-આર્થિક સમીક્ષા', 'રાજ્ય અને કેન્દ્ર સરકારની કલ્યાણકારી યોજનાઓ'],
    milestonesEn: 'Understand budget terms (Fiscal Deficit, Revenue Expenditure) and state schemes.',
    milestonesGu: 'બજેટની પારિભાષિક સંકલ્પનાઓ સમજો અને ગુજરાત સરકારની મુખ્ય ૧૫ યોજનાઓની યાદી બનાવો.',
  },
  {
    month: 5,
    focusEn: 'Science & Technology + Environment',
    focusGu: 'વિજ્ઞાન-ટેકનોલોજી અને પર્યાવરણ',
    subjectsEn: ['Human biology, diseases & vaccines', 'ISRO, Space missions & AI/IT', 'Ecology, Biodiversity & Ramsar sites in Gujarat'],
    subjectsGu: ['માનવ શરીર, પોષણ, રોગો અને રસીકરણ', 'ઇસરો (ISRO), સ્પેસ મિશન્સ અને AI/IT', 'પારિસ્થિતિકી, જૈવવિવિધતા અને ગુજરાતની રામસર સાઇટ્સ'],
    milestonesEn: 'Connect static science principles with latest ISRO/DRDO current affairs.',
    milestonesGu: 'સામાન્ય વિજ્ઞાનને તાજેતરના ઇસરો અને ડીઆરડીઓ ના વર્તમાન પ્રવાહો સાથે સાંકળો.',
  },
  {
    month: 6,
    focusEn: 'Gujarat GK, Current Affairs & Prelims Mock Drills',
    focusGu: 'ગુજરાત વિશેષ સામાન્ય જ્ઞાન, કરંટ અફેર્સ અને મોક ટેસ્ટ ડ્રીલ',
    subjectsEn: ['Gujarati Literature, Folk arts & Fairs', 'Last 12 months Current Affairs revision', 'Full-length 200-question Prelims Mock Tests'],
    subjectsGu: ['ગુજરાતી સાહિત્ય, લોકમેળાઓ અને આદિવાસી સંસ્કૃતિ', 'છેલ્લા ૧૨ મહિનાના વર્તમાન પ્રવાહોનું રિવિઝન', 'સંપૂર્ણ ૨૦૦ પ્રશ્નોના પ્રિલિમ્સ મોક ટેસ્ટ'],
    milestonesEn: 'Solve 5 full-length mock tests under 3-hour strict time limits. Eliminate negative marking.',
    milestonesGu: '૩ કલાકના સમયબદ્ધ વાતાવરણમાં ૫ ફુલ લેન્થ મોક ટેસ્ટ આપો. ૧૩૦+ ચોક્કસ અટેમ્પટનો લક્ષ્યાંક રાખો.',
  },
];

export interface RecommendedBookSubject {
  subjectEn: string;
  subjectGu: string;
  paperTag: string;
  beginnerBookGu: string;
  advancedEnglishRef: string;
  revisionBookGu: string;
  freeOfficialAlternative: string;
}

export const RECOMMENDED_BOOKS_BY_SUBJECT: RecommendedBookSubject[] = [
  {
    subjectEn: 'History (Ancient, Medieval, Modern & Gujarat)',
    subjectGu: 'ઇતિહાસ (પ્રાચીન, મધ્યકાલીન, આધુનિક અને ગુજરાતનો ઇતિહાસ)',
    paperTag: 'Prelims & Mains GS-1',
    beginnerBookGu: 'GCERT ધોરણ ૬ થી ૧૦ સામાજિક વિજ્ઞાન + વર્લ્ડ ઇનબૉક્સ / લિબર્ટી પબ્લિકેશન (ગુજરાતનો ઇતિહાસ)',
    advancedEnglishRef: "India's Ancient Past (R.S. Sharma), Medieval India (Satish Chandra), A Brief History of Modern India (Spectrum)",
    revisionBookGu: 'યુવા ઉપનિષદ પબ્લિકેશન - ભારત અને ગુજરાતનો ઇતિહાસ (રિવિઝન ચાર્ટ્સ)',
    freeOfficialAlternative: 'GCERT ધોરણ ૬-૧૦ સામાજિક વિજ્ઞાન & ૧૧-૧૨ ઇતિહાસ (સત્તાવાર ગવર્નમેન્ટ PDF)',
  },
  {
    subjectEn: 'Cultural Heritage & Literature of Gujarat & India',
    subjectGu: 'સાંસ્કૃતિક વારસો અને ગુજરાતી સાહિત્ય',
    paperTag: 'Prelims & Mains GS-1',
    beginnerBookGu: 'ગુજરાતની અસ્મિતા (રજની વ્યાસ) / યુવા ઉપનિષદ કલા અને સંસ્કૃતિ',
    advancedEnglishRef: 'Indian Art and Culture by Nitin Singhania',
    revisionBookGu: 'હેરીટેજ ઓફ ગુજરાત - ગ્રંથ નિર્માણ બોર્ડ પુસ્તકો',
    freeOfficialAlternative: 'ગુજરાત પાક્ષિક સાંસ્કૃતિક વિશેષાંક & ગ્રંથ નિર્માણ બોર્ડ PDF',
  },
  {
    subjectEn: 'Indian Constitution & Polity',
    subjectGu: 'ભારતીય બંધારણ અને રાજ્યવ્યવસ્થા',
    paperTag: 'Prelims & Mains GS-2',
    beginnerBookGu: 'ભારતીય બંધારણ અને રાજ્યવ્યવસ્થા - વિકલ્પ કોટવાલ (લિબર્ટી) / યુવા ઉપનિષદ',
    advancedEnglishRef: 'Indian Polity by M. Laxmikanth (7th Edition)',
    revisionBookGu: 'ડેલ્ટા પબ્લિકેશન અથવા સેલ્ફ આર્ટિકલ સમરી નોટ્સ (કલમ ૧ થી ૫૧A)',
    freeOfficialAlternative: 'ભારત સરકારના કાયદા મંત્રાલયનું અધિકૃત બંધારણ (સત્તાવાર Legislative Dept PDF)',
  },
  {
    subjectEn: 'Indian Economy & Gujarat State Finances',
    subjectGu: 'ભારતીય અર્થતંત્ર, ગુજરાત બજેટ અને સરકારી યોજનાઓ',
    paperTag: 'Prelims & Mains GS-3',
    beginnerBookGu: 'ભારતીય અર્થતંત્ર - યુવા ઉપનિષદ / આયોજન અને નીતિ આયોગ',
    advancedEnglishRef: 'Indian Economy by Ramesh Singh or Nitin Singhania',
    revisionBookGu: 'ગુજરાત રાજ્યનું તાજેતરનું બજેટ હાઇલાઇટ્સ & સામાજિક-આર્થિક સમીક્ષા',
    freeOfficialAlternative: 'ગુજરાત સરકાર બજેટ અને Socio-Economic Review (સત્તાવાર Finance Dept PDF)',
  },
  {
    subjectEn: 'Geography (Physical, India & Gujarat)',
    subjectGu: 'ભૂગોળ (ભૌતિક, ભારત અને ગુજરાતની ભૂગોળ)',
    paperTag: 'Prelims & Mains GS-1',
    beginnerBookGu: 'ગુજરાતની ભૂગોળ (મંજુલાબેન દવે) & GCERT ધોરણ ૯-૧૧ ભૂગોળ',
    advancedEnglishRef: 'Certificate Physical and Human Geography (G.C. Leong) & Majid Husain',
    revisionBookGu: 'વર્લ્ડ ઇનબૉક્સ - ભારત અને ગુજરાતની ભૂગોળ એટલાસ',
    freeOfficialAlternative: "NCERT Class 11 'Fundamentals of Physical Geography' PDF",
  },
  {
    subjectEn: 'Science & Technology',
    subjectGu: 'સામાન્ય વિજ્ઞાન, સ્પેસ, સંરક્ષણ અને IT',
    paperTag: 'Prelims & Mains GS-3',
    beginnerBookGu: 'સામાન્ય વિજ્ઞાન - યુવા ઉપનિષદ & GCERT ધોરણ ૬-૧૦ વિજ્ઞાન',
    advancedEnglishRef: 'Science and Technology by Ravi P. Agrahari (McGraw Hill)',
    revisionBookGu: 'ઇસરો, ડીઆરડીઓ મિશન પરિશિષ્ટ અને AI નોટ્સ',
    freeOfficialAlternative: 'PIB સાયન્સ એન્ડ ટેકનોલોજી વાર્ષિક રિવ્યુ & ISRO સત્તાવાર પોર્ટલ',
  },
  {
    subjectEn: 'General Mental Ability (Reasoning & Data Interpretation)',
    subjectGu: 'સામાન્ય બૌદ્ધિક ક્ષમતા, તાર્કિક કસોટી અને ગણિત',
    paperTag: 'Prelims Screening',
    beginnerBookGu: 'તાર્કિક કસોટી અને ગણિત - અંકિત પટેલ / યુવા ઉપનિષદ',
    advancedEnglishRef: 'Quantitative Aptitude & Logical Reasoning by R.S. Aggarwal',
    revisionBookGu: 'પાછલા વર્ષોના પેપર્સ (PYQ) ૨૦૧૭-૨૦૨૪ પ્રેક્ટિસ',
    freeOfficialAlternative: 'GPSC પાછલા વર્ષોના સોલ્વ કરેલા ગણિત-રીઝનિંગ પ્રશ્નો',
  },
  {
    subjectEn: 'Ethics, Integrity & Aptitude (GS-4)',
    subjectGu: 'નીતિશાસ્ત્ર, સત્યનિષ્ઠા અને યોગ્યતા (GS-4)',
    paperTag: 'Mains GS-4 Merit',
    beginnerBookGu: 'નીતિશાસ્ત્ર, સત્યનિષ્ઠા અને અભિરુચિ - ડૉ. હસમુખ પટેલ / યુવા ઉપનિષદ',
    advancedEnglishRef: 'Lexicon for Ethics, Integrity & Aptitude / Subba Rao',
    revisionBookGu: 'નોલાન કમિટીના ૭ સિદ્ધાંતો અને કેસ સ્ટડી સોલ્યુશન્સ',
    freeOfficialAlternative: '2nd ARC 4th Report "Ethics in Governance" (સત્તાવાર DARPG PDF)',
  },
];

export const FREE_OFFICIAL_PDF_VAULT = FREE_PDF_VAULT;
export const RECOMMENDED_BOOKS = RECOMMENDED_BOOKS_BY_SUBJECT;

