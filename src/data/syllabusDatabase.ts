import { 
  ExamSyllabusRecord, 
  SyllabusTopic, 
  SyllabusSubject, 
  ExamStageId,
  StudentSyllabusProgress,
  TopicProgressStatus 
} from '@/types/syllabus';

/**
 * ---------------------------------------------------------------------------------
 * SANKALP MASTER EXAMINATION SYLLABUS DATABASE
 * ---------------------------------------------------------------------------------
 * Architecture:
 * - Decoupled data model allowing administrators to register new examinations dynamically.
 * - Strict separation between Official Commission Verbatim Text and Sankalp Pedagogical Guidance.
 * - Granular hierarchy: Exam -> Stage (Prelims/Mains) -> Paper -> Subject -> Chapter -> Topic.
 * - Direct cross-links to Topic Revision Notes, Practice MCQs, and Free Official PDFs.
 * ---------------------------------------------------------------------------------
 */

export const SANKALP_EXAM_DATABASE: Record<string, ExamSyllabusRecord> = {
  // ==============================================================================
  // 1. GPSC CLASS 1 & CLASS 2 (Gujarat Administrative & Police Services)
  // ==============================================================================
  'gpsc-class-1-2': {
    id: 'gpsc-class-1-2',
    nameEn: 'GPSC Gujarat Administrative Service, Class 1 & Class 2',
    nameGu: 'ગુજરાત વહીવટી સેવા વર્ગ-૧ અને વર્ગ-૨ (GPSC Class 1 & 2)',
    shortName: 'GPSC Class 1/2',
    badgeEn: 'Official 2026-27 Scheme',
    badgeGu: 'અધિકૃત ૨૦૨૬-૨૭ પરીક્ષા યોજના',
    conductingBodyEn: 'Gujarat Public Service Commission (GPSC)',
    conductingBodyGu: 'ગુજરાત જાહેર સેવા આયોગ (GPSC), ગાંધીનગર',
    officialSource: {
      titleEn: 'GPSC Class 1-2 General Rules, Examination Regulations & Official Syllabus Notification',
      titleGu: 'ગુજરાત જાહેર સેવા આયોગ વર્ગ-૧ અને વર્ગ-૨ પરીક્ષા નિયમો અને સત્તાવાર અભ્યાસક્રમ ગેઝેટ',
      documentRef: 'Advt. No. GAD / GPSC-Exam-Rules-2026 / Notification Sec. 10(A)',
      gazetteOrNotificationDate: 'Updated February 2026',
      officialUrl: 'https://gpsc.gujarat.gov.in',
      notesEn: 'Verified against the official GPSC gazette syllabus. In the revised pattern, Preliminary Examination comprises a single comprehensive General Studies paper (200 marks, 3 hours). Mains comprises 7 papers (Gujarati & English 300 marks each qualifying; Essay + GS 1-4 of 250 marks each = 1,250 merit marks).',
      notesGu: 'અધિકૃત GPSC ગેઝેટ મુજબ પ્રમાણિત. સુધારેલ માળખામાં પ્રિલિમ્સમાં ૧ જ પેપર (૨૦૦ ગુણ, ૩ કલાક) છે. મેઈન્સમાં ૭ પેપર્સ પૈકી ગુજરાતી અને અંગ્રેજી (૩૦૦-૩૦૦ ગુણ) ક્વોલિફાઇંગ છે, જ્યારે નિબંધ અને GS ૧ થી ૪ (દરેકના ૨૫૦ ગુણ = ૧,૨૫૦ ગુણ) મેરિટ ગણાય છે.',
    },
    scheme: {
      prelimsMarks: 200,
      prelimsDuration: '3 Hours (180 Minutes)',
      mainsMarks: 1850,
      mainsMeritMarks: 1250,
      interviewMarks: 150,
      finalMeritMarks: 1400,
      patternSummaryEn: 'Prelims: 1 Single Composite GS Paper (200 MCQs, 200 Marks). Mains: 7 Descriptive Papers (1,250 Merit Marks + 600 Qualifying Marks). Interview: 150 Marks.',
      patternSummaryGu: 'પ્રિલિમ્સ: ૧ સિંગલ GS પેપર (૨૦૦ MCQ, ૨૦૦ ગુણ). મુખ્ય લેખિત: ૭ વર્ણનાત્મક પેપર્સ (૧,૨૫૦ મેરિટ ગુણ + ૬૦૦ પાસિંગ ગુણ). રૂબરૂ મુલાકાત: ૧૫૦ ગુણ.',
    },
    prelimsPapers: [
      {
        id: 'gpsc-pre-p1',
        paperCode: 'Paper 1',
        titleEn: 'General Studies (Single Composite Preliminary Paper)',
        titleGu: 'સામાન્ય અભ્યાસ (એકમાત્ર સંયુક્ત પ્રાથમિક પ્રશ્નપત્ર)',
        stage: 'prelims',
        marks: 200,
        duration: '3 Hours',
        nature: 'Merit',
        officialDescriptionEn: 'The question paper will be of objective type (multiple choice questions) consisting of 200 questions carrying 200 marks of 3 hours duration covering 8 core subjects with proportional weightage.',
        officialDescriptionGu: 'પ્રશ્નપત્ર હેતુલક્ષી (MCQ) પ્રકારનું રહેશે, જેમાં ૨૦૦ પ્રશ્નો, ૨૦૦ ગુણ અને ૩ કલાકનો સમયગાળો રહેશે. ૮ મુખ્ય વિષયોમાંથી સમાન ભારાંશ મુજબ પ્રશ્નો પૂછાશે.',
        subjects: [
          // Subject 1: History
          {
            id: 'gpsc-pre-subj-hist',
            subjectCode: 'GS-SUB-01',
            nameEn: 'History of India & Gujarat',
            nameGu: 'ભારત અને ગુજરાતનો ઇતિહાસ',
            icon: 'Landmark',
            officialWeightageEn: 'Approx. 25 Marks (12.5% of Paper)',
            officialWeightageGu: 'આશરે ૨૫ ગુણ (પ્રશ્નપત્રના ૧૨.૫%)',
            chapters: [
              {
                id: 'gpsc-ch-hist-ancient',
                chapterNumber: 1,
                titleEn: 'Ancient Civilizations & Gujarat Heritage',
                titleGu: 'પ્રાચીન સભ્યતાઓ અને ગુજરાતનો પ્રાચીન વારસો',
                topics: [
                  {
                    id: 'gpsc-top-hist-ivc',
                    code: 'HIST-IVC',
                    titleEn: 'Indus Valley Civilization & Major Gujarat Sites (Lothal, Dholavira, Rangpur)',
                    titleGu: 'સિંધુ ખીણની સભ્યતા અને ગુજરાતના મુખ્ય સ્થળો (લોથલ, ધોળાવીરા, રંગપુર)',
                    chapterId: 'gpsc-ch-hist-ancient',
                    subjectId: 'gpsc-pre-subj-hist',
                    paperId: 'gpsc-pre-p1',
                    examId: 'gpsc-class-1-2',
                    stage: 'prelims',
                    officialWordingEn: 'Indus Valley Civilization: Features, Sites in Gujarat, Town Planning, Society, Economy, Religious beliefs, Art, Architecture, Harappan trade and maritime legacy.',
                    officialWordingGu: 'સિંધુ ખીણની સભ્યતા: વિશેષતાઓ, ગુજરાતના સ્થળો (લોથલ, ધોળાવીરા, રંગપુર વગેરે), નગર આયોજન, સમાજ, અર્થતંત્ર, ધાર્મિક માન્યતાઓ, કલા, શિલ્પ અને દરિયાઈ વેપાર.',
                    sankalpExplanationEn: 'Crucial high-yield area. Dholavira’s UNESCO water harvesting system (16 reservoirs, cascade dams) and Lothal’s world-first tidal dockyard are tested annually in both Prelims assertion-reasoning and Mains analytic questions.',
                    sankalpExplanationGu: 'પરીક્ષા માટે સૌથી મહત્વનો ભાગ. ધોળાવીરાનું યુનેસ્કો જળ વ્યવસ્થાપન અને લોથલની ટાઈડલ ગોદી પર દર વર્ષે પ્રશ્નો પૂછાય છે.',
                    keySubtopicsEn: [
                      'Lothal tidal dockyard & Persian Gulf bead trade',
                      'Dholavira tri-partite city layout (Citadel, Bailey, Lower Town) and cascading reservoirs',
                      'Rangpur and Surkotada horse bone controversy',
                      'Signboard inscription in Dholavira (10 large Harappan signs)'
                    ],
                    keySubtopicsGu: [
                      'લોથલ ડૉકયાર્ડ અને મણકા બનાવવાની ફેક્ટરી',
                      'ધોળાવીરાની ત્રિ-સ્તરીય નગરરચના અને ૧૬ જળાશયો',
                      'સુરકોટડા અને રંગપુરમાંથી મળેલા પુરાતત્વીય અવશેષો',
                      'ધોળાવીરાનું ૧૦ અક્ષરોવાળું સાઈનબોર્ડ'
                    ],
                    importance: 'Essential',
                    examFrequency: 'Every year without exception (2-3 MCQs in Prelims)',
                    linkedModuleTopicId: 'topic-f2',
                    linkedPracticeTag: 'history',
                    recommendedReadings: [
                      { title: 'GCERT Class 11 Gujarat History', source: 'Gujarat State Board of School Textbooks', isGovtFree: true },
                      { title: 'Ancient & Medieval India', source: 'Poonam Dalal Dahiya', isGovtFree: false }
                    ]
                  },
                  {
                    id: 'gpsc-top-hist-dynasties',
                    code: 'HIST-DYN',
                    titleEn: 'Ruling Dynasties of Gujarat: Maitrakas, Solanki, and Vaghela Eras',
                    titleGu: 'ગુજરાતના મહત્વના રાજવંશો: મૈત્રક, સોલંકી અને વાઘેલા યુગ',
                    chapterId: 'gpsc-ch-hist-ancient',
                    subjectId: 'gpsc-pre-subj-hist',
                    paperId: 'gpsc-pre-p1',
                    examId: 'gpsc-class-1-2',
                    stage: 'prelims',
                    officialWordingEn: 'The major dynasties of Gujarat: Maitrakas of Vallabhi, Chavdas, Solankis (Golden Age of Gujarat), and Vaghela dynasty; Administration, Art, Architecture, Literature and patronage.',
                    officialWordingGu: 'ગુજરાતના પ્રમુખ રાજવંશો: વલ્લભીના મૈત્રકો, ચાવડા વંશ, સોલંકી યુગ (ગુજરાતનો સુવર્ણકાળ), વાઘેલા વંશ; વહીવટી તંત્ર, સ્થાપત્ય, સાહિત્ય અને સાંસ્કૃતિક પ્રદાન.',
                    sankalpExplanationEn: 'Solanki era (Siddhraj Jaisinh, Kumarapala) is considered the Golden Age of Gujarat. Focus on Hemchandracharya, Dvayashraya Kavya, Sun Temple Modhera, Rani ki Vav, and Vallabhi Buddhist University.',
                    sankalpExplanationGu: 'સોલંકી કાળ (સિદ્ધરાજ જયસિંહ, કુમારપાળ) અને હેમચંદ્રાચાર્યનું યોગદાન, મોઢેરા સૂર્યમંદિર, રાણકી વાવ અને વલ્લભી વિદ્યાપીઠ મુખ્ય ફોકસ પોઈન્ટ છે.',
                    keySubtopicsEn: [
                      'Vallabhi Buddhist University & Hiuen Tsang visit',
                      'Siddhraj Jaisinh & compilation of Siddha-Hema-Shabdanushasana',
                      'Architecture: Maru-Gurjara style, Rani ki Vav (Patan), Modhera Sun Temple',
                      'Kumarapala’s Jain patronage & Ahimsa state policy'
                    ],
                    keySubtopicsGu: [
                      'વલ્લભી વિદ્યાપીઠ અને હ્યુઅન સ્યાંગની મુલાકાત',
                      'સિદ્ધરાજ જયસિંહ અને સિદ્ધહેમ શબ્દાનુશાસન ગ્રંથ',
                      'મારુ-ગુર્જર સ્થાપત્ય શૈલી (રાણકી વાવ, મોઢેરા સૂર્યમંદિર)',
                      'કુમારપાળનું જૈન ધર્મ પ્રદાન અને અહિંસા નીતિ'
                    ],
                    importance: 'Essential',
                    examFrequency: 'Every year (3-4 MCQs)',
                    linkedModuleTopicId: 'topic-f3',
                    linkedPracticeTag: 'history',
                    recommendedReadings: [
                      { title: 'Gujarat no Rajkiya ane Sanskritik Itihas', source: 'University Granth Nirman Board', isGovtFree: true }
                    ]
                  }
                ]
              },
              {
                id: 'gpsc-ch-hist-modern',
                chapterNumber: 2,
                titleEn: 'Modern Freedom Movement & Gujarat’s Role',
                titleGu: 'આધુનિક સ્વતંત્રતા સંગ્રામ અને ગુજરાતનું પ્રદાન',
                topics: [
                  {
                    id: 'gpsc-top-hist-freedom',
                    code: 'HIST-FREEDOM',
                    titleEn: 'Mahatma Gandhi, Sardar Patel, Dandi March & Bardoli Satyagraha',
                    titleGu: 'મહાત્મા ગાંધી, સરદાર પટેલ, દાંડી કૂચ અને બારડોલી સત્યાગ્રહ',
                    chapterId: 'gpsc-ch-hist-modern',
                    subjectId: 'gpsc-pre-subj-hist',
                    paperId: 'gpsc-pre-p1',
                    examId: 'gpsc-class-1-2',
                    stage: 'prelims',
                    officialWordingEn: 'Freedom struggle in India with special reference to Gujarat: Role of Mahatma Gandhi, Sardar Vallabhbhai Patel, Kheda Satyagraha, Ahmedabad Mill Strike, Bardoli Satyagraha, Salt Satyagraha (Dandi March), Quit India Movement, Integration of Princely States.',
                    officialWordingGu: 'ગુજરાતના વિશેષ સંદર્ભ સાથે ભારતમાં સ્વાતંત્ર્ય સંગ્રામ: મહાત્મા ગાંધી અને સરદાર પટેલનું યોગદાન, ખેડા સત્યાગ્રહ, અમદાવાદ મિલ મજૂર આંદોલન, બારડોલી સત્યાગ્રહ, દાંડી યાત્રા, હિંદ છોડો આંદોલન, દેશી રાજ્યોનું વિલીનીકરણ.',
                    sankalpExplanationEn: 'Highest weightage chapter in History. Focus on micro-details: exact dates, ashrams established (Kochrab, Sabarmati), titles given (Sardar title by Bardoli women), and integration of Junagadh.',
                    sankalpExplanationGu: 'ઇતિહાસમાં સૌથી વધુ ગુણ ધરાવતો વિષય. તારીખો, આશ્રમો, બારડોલી સત્યાગ્રહમાં બહેનો દ્વારા સરદાર ઉપાધિ, અને જૂનાગઢ વિલીનીકરણના ચોક્કસ તથ્યો પૂછાય છે.',
                    keySubtopicsEn: [
                      'Champaran, Ahmedabad Mill Strike & Kheda Satyagraha chronologies',
                      'Bardoli Satyagraha (1928) & Mehta brothers role',
                      'Dandi March (March 12 - April 6, 1930) route & 78 marchers',
                      'Integration of 360+ Gujarat princely states by Sardar Patel and V.P. Menon'
                    ],
                    keySubtopicsGu: [
                      'અમદાવાદ મિલ હડતાળ અને ખેડા સત્યાગ્રહનો ઘટનાક્રમ',
                      'બારડોલી સત્યાગ્રહ (૧૯૨૮) અને મહેતા બંધુઓ',
                      'દાંડી કૂચ (૧૨ માર્ચ - ૬ એપ્રિલ ૧૯૩૦) અને ૭૮ સાથીઓ',
                      'સરદાર પટેલ અને વી.પી. મેનન દ્વારા જૂનાગઢ સહિત રજવાડાઓનું વિલીનીકરણ'
                    ],
                    importance: 'Essential',
                    examFrequency: '4-5 MCQs in Prelims, Compulsory Question in Mains GS-1',
                    linkedModuleTopicId: 'topic-f4',
                    linkedPracticeTag: 'history',
                    recommendedReadings: [
                      { title: 'Spectrum Modern India History', source: 'Rajiv Ahir IPS', isGovtFree: false },
                      { title: 'Sardar Patel & Integration of India', source: 'Publications Division (Govt of India)', isGovtFree: true }
                    ]
                  },
                  {
                    id: 'gpsc-top-hist-mahagujarat',
                    code: 'HIST-MAHAGUJ',
                    titleEn: 'Mahagujarat Movement & Formation of Gujarat State (1956–1960)',
                    titleGu: 'મહાગુજરાત આંદોલન અને અલગ ગુજરાત રાજ્યની સ્થાપના (૧૯૫૬-૧૯૬૦)',
                    chapterId: 'gpsc-ch-hist-modern',
                    subjectId: 'gpsc-pre-subj-hist',
                    paperId: 'gpsc-pre-p1',
                    examId: 'gpsc-class-1-2',
                    stage: 'prelims',
                    officialWordingEn: 'Mahagujarat Movement: Causes, leaders (Indulal Yagnik, Jayanti Dalal), students agitation, martyrdom, bilingual Bombay state issues and creation of separate Gujarat State on 1st May 1960.',
                    officialWordingGu: 'મહાગુજરાત આંદોલન: કારણો, પ્રમુખ નેતાઓ (ઇન્દુલાલ યાજ્ઞિક, જયંતિ દલાલ, બ્રહ્મકુમાર ભટ્ટ), વિદ્યાર્થીઓનું યોગદાન, શહીદ સ્મારક, દ્વિભાષી મુંબઈ રાજ્ય અને ૧ મે ૧૯૬૦ ના રોજ નવા ગુજરાતની સ્થાપના.',
                    sankalpExplanationEn: 'Exclusive GPSC state syllabus topic. Memorize Mahagujarat Janata Parishad formation, Indulal Yagnik (Induchacha), inauguration by Ravi Shankar Maharaj at Sabarmati Ashram.',
                    sankalpExplanationGu: 'GPSC નો વિશિષ્ટ વિષય. મહાગુજરાત જનતા પરિષદ, ઇન્દુલાલ યાજ્ઞિક, ૮ ઓગસ્ટ શહીદી અને રવિશંકર મહારાજના હસ્તે ઉદ્ઘાટન ખાસ તૈયાર કરવું.',
                    keySubtopicsEn: [
                      'Fazal Ali States Reorganization Commission recommendations',
                      '8 August 1956 Congress House student firing incident',
                      'Role of Indulal Yagnik and weekly Navjivan / Yugdharm',
                      'May 1, 1960 inauguration at Sabarmati Ashram by Ravishankar Maharaj'
                    ],
                    keySubtopicsGu: [
                      'ફઝલ અલી રાજ્ય પુનર્ગઠન પંચ અને દ્વિભાષી મુંબઈ રાજ્ય',
                      '૮ ઓગસ્ટ ૧૯૫૬ કોંગ્રેસ હાઉસ ગોળીબાર ઘટના',
                      'ઇન્દુલાલ યાજ્ઞિક (ઇન્દુચાચા) નું નેતૃત્વ',
                      '૧ મે ૧૯૬૦ ના રોજ સાબરમતી આશ્રમ ખાતે રવિશંકર મહારાજ દ્વારા ઉદ્ઘાટન'
                    ],
                    importance: 'High',
                    examFrequency: 'Every year (1-2 MCQs)',
                    linkedModuleTopicId: 'topic-f5',
                    linkedPracticeTag: 'history',
                    recommendedReadings: [
                      { title: 'Atmakatha (Autobiography)', source: 'Indulal Yagnik (Granth Nirman Board)', isGovtFree: true }
                    ]
                  }
                ]
              }
            ]
          },

          // Subject 2: Polity & Constitution
          {
            id: 'gpsc-pre-subj-polity',
            subjectCode: 'GS-SUB-02',
            nameEn: 'Indian Constitution, Polity, Social Justice & Rights',
            nameGu: 'ભારતીય બંધારણ, રાજ્યવ્યવસ્થા, સામાજિક ન્યાય અને અધિકારો',
            icon: 'Scale',
            officialWeightageEn: 'Approx. 25-30 Marks (15% of Paper)',
            officialWeightageGu: 'આશરે ૨૫ થી ૩૦ ગુણ (પ્રશ્નપત્રના ૧૫%)',
            chapters: [
              {
                id: 'gpsc-ch-pol-foundations',
                chapterNumber: 1,
                titleEn: 'Constitutional Framework & Fundamental Rights',
                titleGu: 'બંધારણીય માળખું અને મૂળભૂત અધિકારો',
                topics: [
                  {
                    id: 'gpsc-top-pol-preamble',
                    code: 'POL-PREAMBLE',
                    titleEn: 'Preamble, Salient Features & Basic Structure Doctrine',
                    titleGu: 'બંધારણનું આમુખ, મુખ્ય લક્ષણો અને મૂળભૂત માળખાનો સિદ્ધાંત',
                    chapterId: 'gpsc-ch-pol-foundations',
                    subjectId: 'gpsc-pre-subj-polity',
                    paperId: 'gpsc-pre-p1',
                    examId: 'gpsc-class-1-2',
                    stage: 'prelims',
                    officialWordingEn: 'Indian Constitution: Evolution, features, Preamble, Fundamental Rights, Fundamental Duties, Directive Principles of State Policy, Important Constitutional Amendments, Significant Provisions and Basic Structure.',
                    officialWordingGu: 'ભારતીય બંધારણ: વિકાસ, વિશેષતાઓ, આમુખ, મૂળભૂત અધિકારો, મૂળભૂત ફરજો, રાજ્યનીતિના માર્ગદર્શક સિદ્ધાંતો, મહત્વપૂર્ણ બંધારણીય સુધારાઓ, મહત્વની જોગવાઈઓ અને મૂળભૂત માળખું.',
                    sankalpExplanationEn: 'The core foundation of Polity. Tested on the exact wording of the 42nd Amendment (Socialist, Secular, Integrity), non-justiciable nature, and the evolution of the Basic Structure doctrine across Shankari Prasad, Golaknath, and Kesavananda Bharati (1973).',
                    sankalpExplanationGu: 'રાજ્યવ્યવસ્થાનો પાયાનો વિષય. ૪૨મો સુધારો (સમાજવાદી, બિનસાંપ્રદાયિક, અખંડિતતા), બિન-અમલવારીપાત્ર સ્વરૂપ અને કેશવાનંદ ભારતી કેસ (૧૯૭૩) આધારિત પ્રશ્નો પૂછાય છે.',
                    keySubtopicsEn: [
                      'Objectives Resolution by Jawaharlal Nehru (Dec 13, 1946)',
                      'Significance of each keyword (Sovereign, Socialist, Secular, Democratic, Republic)',
                      'Kesavananda Bharati (1973) & Minerva Mills (1980) landmark judgments',
                      'Article 368 scope vs Basic Structure limitation'
                    ],
                    keySubtopicsGu: [
                      'જવાહરલાલ નેહરુનો ઉદ્દેશ્ય પ્રસ્તાવ (૧૩ ડિસેમ્બર ૧૯૪૬)',
                      'આમુખના મુખ્ય શબ્દોનો કાનૂની અર્થ',
                      'કેશવાનંદ ભારતી (૧૯૭૩) અને મિનર્વા મિલ્સ (૧૯૮૦) ચુકાદા',
                      'કલમ ૩૬૮ હેઠળ સુધારા કરવાની મર્યાદા'
                    ],
                    importance: 'Essential',
                    examFrequency: 'Every year (2-3 MCQs in Prelims, Direct question in Mains GS-2)',
                    linkedModuleTopicId: 'topic-f1',
                    linkedPracticeTag: 'polity',
                    recommendedReadings: [
                      { title: 'Indian Polity (7th Edition)', source: 'M. Laxmikanth', isGovtFree: false },
                      { title: 'Constitution of India (Official Bare Act)', source: 'Legislative Department, Ministry of Law & Justice', isGovtFree: true }
                    ]
                  },
                  {
                    id: 'gpsc-top-pol-fr-dpsp',
                    code: 'POL-FR-DPSP',
                    titleEn: 'Fundamental Rights (Arts 12–35), DPSPs (Arts 36–51) & Fundamental Duties (Art 51A)',
                    titleGu: 'મૂળભૂત અધિકારો (કલમ ૧૨ થી ૩૫), DPSP (કલમ ૩૬ થી ૫૧) અને મૂળભૂત ફરજો (૫૧-ક)',
                    chapterId: 'gpsc-ch-pol-foundations',
                    subjectId: 'gpsc-pre-subj-polity',
                    paperId: 'gpsc-pre-p1',
                    examId: 'gpsc-class-1-2',
                    stage: 'prelims',
                    officialWordingEn: 'Fundamental Rights, Directive Principles of State Policy, Fundamental Duties, Relationship between Fundamental Rights and Directive Principles, Writ Jurisdiction (Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto).',
                    officialWordingGu: 'મૂળભૂત અધિકારો, રાજ્યનીતિના માર્ગદર્શક સિદ્ધાંતો, મૂળભૂત ફરજો, અધિકારો અને DPSP વચ્ચેનો સંબંધ, સુપ્રીમ કોર્ટ અને હાઇકોર્ટની રિટ અધિકારિતા (બંધી પ્રત્યક્ષીકરણ, પરમાદેશ, પ્રતિષેધ, ઉત્પ્રેષણ, અધિકાર પૃચ્છા).',
                    sankalpExplanationEn: 'A high-stakes area. Focus on Article 21 (Puttaswamy privacy case, Menaka Gandhi due process), Article 32 vs 226 writ powers, and the conflict/balance between Part III and Part IV.',
                    sankalpExplanationGu: 'પરીક્ષા માટે સૌથી મહત્વપૂર્ણ કલમો. કલમ ૨૧ (ગોપનીયતાનો અધિકાર), કલમ ૩૨ અને ૨૨૬ હેઠળ રિટ્સ, અને ૪૨મા-૪૪મા સુધારા દ્વારા થયેલા ફેરફારો.',
                    keySubtopicsEn: [
                      'Article 14, 19, 21 Golden Triangle of Constitution',
                      'Article 32 & 226 five constitutional writs with practical examples',
                      'DPSP classification: Socialist, Gandhian, Liberal-Intellectual',
                      'Swaran Singh Committee recommendations & 86th Amendment 2002'
                    ],
                    keySubtopicsGu: [
                      'કલમ ૧૪, ૧૯ અને ૨૧ ની સુવર્ણ ત્રિપુટી',
                      'કલમ ૩૨ અને ૨૨૬ હેઠળ ૫ બંધારણીય રિટ્સ',
                      'માર્ગદર્શક સિદ્ધાંતોનું વર્ગીકરણ: સમાજવાદી, ગાંધીવાદી, ઉદાર-બૌદ્ધિક',
                      'સ્વર્ણસિંહ સમિતિની ભલામણો અને ૮૬મો સુધારો ૨૦૦૨'
                    ],
                    importance: 'Essential',
                    examFrequency: '4-5 MCQs in Prelims',
                    linkedModuleTopicId: 'topic-f1',
                    linkedPracticeTag: 'polity',
                    recommendedReadings: [
                      { title: 'Introduction to the Constitution of India', source: 'Dr. D.D. Basu', isGovtFree: false }
                    ]
                  }
                ]
              },
              {
                id: 'gpsc-ch-pol-institutions',
                chapterNumber: 2,
                titleEn: 'Parliament, Judiciary & Panchayati Raj in Gujarat',
                titleGu: 'સંસદ, ન્યાયતંત્ર અને ગુજરાતમાં પંચાયતી રાજ',
                topics: [
                  {
                    id: 'gpsc-top-pol-panchayat',
                    code: 'POL-PANCHAYAT',
                    titleEn: '73rd & 74th Amendments & Gujarat Panchayats Act 1993',
                    titleGu: '૭૩મો અને ૭૪મો બંધારણીય સુધારો તથા ગુજરાત પંચાયત અધિનિયમ ૧૯૯૩',
                    chapterId: 'gpsc-ch-pol-institutions',
                    subjectId: 'gpsc-pre-subj-polity',
                    paperId: 'gpsc-pre-p1',
                    examId: 'gpsc-class-1-2',
                    stage: 'prelims',
                    officialWordingEn: 'Panchayati Raj and Rural Local Self Government: 73rd and 74th Constitutional Amendment Acts, Structure, powers, finances, State Election Commission, State Finance Commission, Panchayati Raj setup in Gujarat.',
                    officialWordingGu: 'પંચાયતી રાજ અને સ્થાનિક સ્વરાજ્ય: ૭૩મો અને ૭૪મો બંધારણીય સુધારો, માળખું, સત્તાઓ, નાણાં, રાજ્ય ચૂંટણી પંચ, રાજ્ય નાણાં પંચ, ગુજરાત પંચાયત અધિનિયમ ૧૯૯૩ હેઠળ ત્રિ-સ્તરીય વ્યવસ્થા.',
                    sankalpExplanationEn: 'State PSCs test state-specific panchayat acts thoroughly. Gujarat follows a 3-tier structure (Gram, Taluka, Jilla). Learn Samras Gram Panchayat Scheme, Gram Sabha quorum, and reservation provisions.',
                    sankalpExplanationGu: 'ગુજરાત પંચાયત અધિનિયમ ૧૯૯૩, સમરસ ગ્રામ યોજના, મહિલાઓ માટે ૫૦% અનામત, અને ગ્રામસભાના અધિકારો વિશે વિગતવાર પ્રશ્નો પૂછાય છે.',
                    keySubtopicsEn: [
                      'Balwantrai Mehta Committee (Gujarat CM legacy) & Ashok Mehta report',
                      '11th Schedule (29 subjects) and 12th Schedule (18 subjects)',
                      'Samras Gram Panchayat scheme incentives and awards in Gujarat',
                      'State Election Commission (Article 243K) powers and autonomy'
                    ],
                    keySubtopicsGu: [
                      'બળવંતરાય મહેતા સમિતિ (ગુજરાતના બીજા મુખ્યમંત્રી) અને ત્રિસ્તરીય માળખું',
                      '૧૧મું પરિશિષ્ટ (૨૯ વિષયો) અને ૧૨મું પરિશિષ્ટ (૧૮ વિષયો)',
                      'ગુજરાત સરકારની સમરસ ગ્રામ પંચાયત યોજના અને પ્રોત્સાહક અનુદાન',
                      'રાજ્ય ચૂંટણી પંચ (કલમ ૨૪૩-K) ની સત્તાઓ'
                    ],
                    importance: 'Essential',
                    examFrequency: 'Every year (2-3 MCQs in Prelims)',
                    linkedModuleTopicId: 'topic-f6',
                    linkedPracticeTag: 'polity',
                    recommendedReadings: [
                      { title: 'Gujarat Panchayati Raj Darshan', source: 'Panchayat & Rural Housing Dept, Gandhinagar', isGovtFree: true }
                    ]
                  }
                ]
              }
            ]
          },

          // Subject 3: Economy
          {
            id: 'gpsc-pre-subj-econ',
            subjectCode: 'GS-SUB-03',
            nameEn: 'Indian Economy & Gujarat Development Model',
            nameGu: 'ભારતીય અર્થતંત્ર અને ગુજરાતનો આર્થિક વિકાસ',
            icon: 'TrendingUp',
            officialWeightageEn: 'Approx. 25 Marks (12.5% of Paper)',
            officialWeightageGu: 'આશરે ૨૫ ગુણ (પ્રશ્નપત્રના ૧૨.૫%)',
            chapters: [
              {
                id: 'gpsc-ch-econ-growth',
                chapterNumber: 1,
                titleEn: 'Macroeconomic Policies, Fiscal Federalism & Gujarat Budget',
                titleGu: 'મેક્રો ઇકોનોમિક નીતિઓ, રાજકોષીય સંઘવાદ અને ગુજરાત બજેટ',
                topics: [
                  {
                    id: 'gpsc-top-econ-gujarat',
                    code: 'ECON-GUJ',
                    titleEn: 'Gujarat Industrial Policy, GIFT City, Dholera SIR & Port Infrastructure',
                    titleGu: 'ગુજરાત ઔદ્યોગિક નીતિ, ગિફ્ટ સિટી, ધોલેરા SIR અને બંદર વિકાસ',
                    chapterId: 'gpsc-ch-econ-growth',
                    subjectId: 'gpsc-pre-subj-econ',
                    paperId: 'gpsc-pre-p1',
                    examId: 'gpsc-class-1-2',
                    stage: 'prelims',
                    officialWordingEn: 'Economy of Gujarat: Industrial development, infrastructure projects (GIFT City, Dholera SIR, DMIC), port-led development, GSDP growth, employment, agriculture and cooperative movement (AMUL).',
                    officialWordingGu: 'ગુજરાતનું અર્થતંત્ર: ઔદ્યોગિક વિકાસ, મેગા પ્રોજેક્ટ્સ (ગિફ્ટ સિટી, ધોલેરા SIR, દિલ્હી-મુંબઈ ઇન્ડસ્ટ્રિયલ કોરિડોર), પોર્ટ-આધારિત અર્થતંત્ર, કૃષિ અને ડેરી સહકારી આંદોલન (અમૂલ).',
                    sankalpExplanationEn: 'Very high yield for both GPSC Prelims and Mains. Gujarat handles over 40% of India’s national maritime cargo via Deendayal Port (Kandla) and non-major ports managed by GMB.',
                    sankalpExplanationGu: 'ગુજરાત દેશના ૪૦% થી વધુ કાર્ગોનું સંચાલન કરે છે. ગિફ્ટ સિટી (IFSCA), ધોલેરા સેમિકન્ડક્ટર હબ અને બજેટની મુખ્ય કલ્યાણકારી યોજનાઓ પર ખાસ પ્રશ્નો પૂછાય છે.',
                    keySubtopicsEn: [
                      'GIFT City IFSC regulatory structure and international stock exchanges',
                      'Dholera Special Investment Region (SIR) & India Semiconductor Mission',
                      'Gujarat Maritime Board (GMB) and port-led manufacturing',
                      'White Revolution, NDDB Anand, and cooperative dairy federal structure'
                    ],
                    keySubtopicsGu: [
                      'ગિફ્ટ સિટી (IFSCA) નું નાણાકીય માળખું',
                      'ધોલેરા સ્પેશિયલ ઇન્વેસ્ટમેન્ટ રીજન અને સેમિકન્ડક્ટર પ્લાન્ટ્સ',
                      'ગુજરાત મેરીટાઇમ બોર્ડ (GMB) અને પોર્ટ વિકાસ',
                      'શ્વેતક્રાંતિ અને સહકારી ડેરી ફેડરેશન'
                    ],
                    importance: 'Essential',
                    examFrequency: '3-4 MCQs in Prelims, 2 Questions in Mains GS-3',
                    linkedModuleTopicId: 'topic-f7',
                    linkedPracticeTag: 'economy',
                    recommendedReadings: [
                      { title: 'Socio-Economic Review of Gujarat (Latest)', source: 'Directorate of Economics & Statistics, Gandhinagar', isGovtFree: true },
                      { title: 'Gujarat Annual Budget Highlights', source: 'Finance Department, Govt of Gujarat', isGovtFree: true }
                    ]
                  }
                ]
              }
            ]
          },

          // Subject 4: Geography
          {
            id: 'gpsc-pre-subj-geog',
            subjectCode: 'GS-SUB-04',
            nameEn: 'Geography of India & Gujarat',
            nameGu: 'ભારત અને ગુજરાતની ભૂગોળ',
            icon: 'Globe',
            officialWeightageEn: 'Approx. 25 Marks (12.5% of Paper)',
            officialWeightageGu: 'આશરે ૨૫ ગુણ (પ્રશ્નપત્રના ૧૨.૫%)',
            chapters: [
              {
                id: 'gpsc-ch-geog-gujarat',
                chapterNumber: 1,
                titleEn: 'Physical & Economic Geography of Gujarat',
                titleGu: 'ગુજરાતની ભૌતિક, નદીતંત્ર અને આર્થિક ભૂગોળ',
                topics: [
                  {
                    id: 'gpsc-top-geog-drainage',
                    code: 'GEOG-DRAINAGE',
                    titleEn: 'Gujarat River Systems, Sardar Sarovar Dam & 1,600 km Coastline',
                    titleGu: 'ગુજરાતનું નદીતંત્ર, સરદાર સરોવર નર્મદા યોજના અને ૧,૬૦૦ કિમી દરિયાકાંઠો',
                    chapterId: 'gpsc-ch-geog-gujarat',
                    subjectId: 'gpsc-pre-subj-geog',
                    paperId: 'gpsc-pre-p1',
                    examId: 'gpsc-class-1-2',
                    stage: 'prelims',
                    officialWordingEn: 'Physical features of Gujarat: Physiography, Gulf of Kutch, Gulf of Khambhat, 1600 km coastline, River drainage systems (Narmada, Tapi, Sabarmati, Mahi), Sardar Sarovar Project, SAUNI Yojana, Sujalam Sufalam, Climate and agro-climatic zones.',
                    officialWordingGu: 'ગુજરાતના ભૌતિક લક્ષણો: ભૂપૃષ્ઠ, કચ્છનો અખાત, ખંભાતનો અખાત, ૧,૬૦૦ કિમી દરિયાકિનારો, નદીતંત્ર (નર્મદા, તાપી, સાબરમતી, મહી), સરદાર સરોવર યોજના, સૌની યોજના, સુજલામ સુફલામ યોજના, આબોહવા અને જમીનના પ્રકારો.',
                    sankalpExplanationEn: 'Examiners frequently quiz candidates on tributaries, origin spots (Amarkantak for Narmada), SAUNI Yojana link canals in Saurashtra, and coastal ecosystems (mangroves of Marine National Park Jamnagar).',
                    sankalpExplanationGu: 'નર્મદા, તાપી, મહી, સાબરમતીના ઉદ્ગમ સ્થાનો, સૌની યોજનાના ૪ લીંક કેનાલો, અને જામનગર મરીન નેશનલ પાર્ક પરથી દર વર્ષે પ્રશ્નો આવે છે.',
                    keySubtopicsEn: [
                      'Sardar Sarovar Multipurpose Dam capacity, power generation & beneficiary states',
                      'SAUNI Yojana (Saurashtra Narmada Avtaran Irrigation Yojana) design',
                      'Kutch Rann: Great Rann, Little Rann & Wild Ass Sanctuary',
                      'Agro-climatic zones of Gujarat and major cash crops (Cotton, Groundnut, Castor)'
                    ],
                    keySubtopicsGu: [
                      'સરદાર સરોવર નર્મદા ડેમ અને લાભાર્થી રાજ્યો',
                      'સૌની યોજના (SAUNI) નું માળખું',
                      'કચ્છનું મોટું-નાનું રણ અને ઘુડખર અભયારણ્ય',
                      'ગુજરાતના કૃષિ-આબોહવા વિસ્તારો અને રોકડિયા પાકો (કપાસ, મગફળી, દિવેલા)'
                    ],
                    importance: 'Essential',
                    examFrequency: '3-4 MCQs in Prelims',
                    linkedModuleTopicId: 'topic-f8',
                    linkedPracticeTag: 'geography',
                    recommendedReadings: [
                      { title: 'GCERT Class 9-10 Samajik Vigyan', source: 'Gujarat State Board', isGovtFree: true },
                      { title: 'Geography of Gujarat', source: 'University Granth Nirman Board', isGovtFree: true }
                    ]
                  }
                ]
              }
            ]
          },

          // Subject 5: Science & Environment
          {
            id: 'gpsc-pre-subj-sci',
            subjectCode: 'GS-SUB-05',
            nameEn: 'Science, Technology, Ecology & Climate Change',
            nameGu: 'વિજ્ઞાન, ટેકનોલોજી, પર્યાવરણ અને જળવાયુ પરિવર્તન',
            icon: 'Cpu',
            officialWeightageEn: 'Approx. 25 Marks (12.5% of Paper)',
            officialWeightageGu: 'આશરે ૨૫ ગુણ (પ્રશ્નપત્રના ૧૨.૫%)',
            chapters: [
              {
                id: 'gpsc-ch-sci-tech',
                chapterNumber: 1,
                titleEn: 'Space Tech, Renewable Energy & Climate Initiatives',
                titleGu: 'અંતરિક્ષ વિજ્ઞાન, પુનઃપ્રાપ્ય ઊર્જા અને પર્યાવરણ પહેલ',
                topics: [
                  {
                    id: 'gpsc-top-sci-isro',
                    code: 'SCI-ISRO',
                    titleEn: 'ISRO Space Missions, Khavda Renewable Energy Park & Biodiversity',
                    titleGu: 'ઇસરો અંતરિક્ષ મિશનો, ખાવડા રીન્યુએબલ એનર્જી પાર્ક અને જૈવવિવિધતા',
                    chapterId: 'gpsc-ch-sci-tech',
                    subjectId: 'gpsc-pre-subj-sci',
                    paperId: 'gpsc-pre-p1',
                    examId: 'gpsc-class-1-2',
                    stage: 'prelims',
                    officialWordingEn: 'Science & Technology: Space missions of ISRO, Defence DRDO, Nuclear power, Biotechnology, Artificial Intelligence, Renewable energy (Khavda Hybrid Solar-Wind Park), Environmental pollution, National Parks & Sanctuaries in Gujarat (Gir Asiatic Lion, Blackbuck Velavadar, Marine National Park).',
                    officialWordingGu: 'વિજ્ઞાન અને ટેકનોલોજી: ઇસરોના અવકાશ મિશનો, DRDO મિસાઇલ પ્રણાલી, પરમાણુ ઊર્જા, આર્ટિફિશિયલ ઇન્ટેલિજન્સ, પુનઃપ્રાપ્ય ઊર્જા (કચ્છના ખાવડા ખાતે વિશ્વનો સૌથી મોટો હાઇબ્રિડ પાર્ક), જૈવવિવિધતા અને ગુજરાતના રાષ્ટ્રીય ઉદ્યાનો (ગીર એશિયાટીક સિંહ, વેળાવદર કાળિયાર, મરીન નેશનલ પાર્ક).',
                    sankalpExplanationEn: 'Blend of current science with Gujarat’s green energy infrastructure. Khavda 30 GW hybrid park is the world’s largest green energy project. Asiatic lion conservation projects and Ramsar wetland sites in Gujarat (Nalsarovar, Thol, Wadhwana, Khijadiya) are frequently quizzed.',
                    sankalpExplanationGu: 'કચ્છ ખાવડા ખાતે વિશ્વનો સૌથી મોટો ૩૦ GW હાઇબ્રિડ સોલાર-વિન્ડ પાર્ક, ગુજરાતના ૪ રામસર વેટલેન્ડ સાઇટ્સ (નળસરોવર, થોળ, વઢવાણા, ખીજડીયા) અને ગીર સિંહ સંરક્ષણ પ્રોજેક્ટ ખાસ પૂછાય છે.',
                    keySubtopicsEn: [
                      'ISRO Launch Vehicles (PSLV, LVM3, SSLV) & Deep Space Exploration (Chandrayaan-3, Gaganyaan)',
                      'Khavda 30,000 MW Hybrid Renewable Energy Park in Kutch',
                      'Four Ramsar Wetland Sites of Gujarat (Nalsarovar, Thol, Wadhwana, Khijadiya)',
                      'Artificial Intelligence, 5G/6G, Quantum Computing national missions'
                    ],
                    keySubtopicsGu: [
                      'ઇસરો પ્રક્ષેપણ વાહનો (PSLV, LVM3) અને ગગનયાન મિશન',
                      'કચ્છનું ખાવડા ૩૦,૦૦૦ મેગાવોટ રીન્યુએબલ એનર્જી પ્રોજેક્ટ',
                      'ગુજરાતના ૪ રામસર વેટલેન્ડ (નળસરોવર, થોળ, વઢવાણા, ખીજડીયા)',
                      'ભારતનું રાષ્ટ્રીય ક્વોન્ટમ મિશન અને AI મિશન'
                    ],
                    importance: 'Essential',
                    examFrequency: 'Every year (4-5 MCQs in Prelims)',
                    linkedModuleTopicId: 'topic-f9',
                    linkedPracticeTag: 'science_tech',
                    recommendedReadings: [
                      { title: 'Environment & Ecology', source: 'Shankar IAS / PMFIAS', isGovtFree: false },
                      { title: 'Gujarat Forest Dept Annual Report', source: 'Govt of Gujarat', isGovtFree: true }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    mainsPapers: [
      {
        id: 'gpsc-main-p1',
        paperCode: 'Paper 1',
        titleEn: 'Gujarati Language (Qualifying)',
        titleGu: 'ગુજરાતી ભાષા (ક્વોલિફાઇંગ / પાસિંગ પેપર)',
        stage: 'mains',
        marks: 300,
        duration: '3 Hours',
        nature: 'Qualifying',
        officialDescriptionEn: 'Descriptive qualifying paper of 300 marks. Candidates must score minimum qualifying percentage. Marks are NOT counted in the final merit rank.',
        officialDescriptionGu: '૩૦૦ ગુણનું વર્ણનાત્મક ક્વોલિફાઇંગ પેપર. લઘુત્તમ પાસિંગ ગુણ મેળવવા ફરજિયાત છે. આ ગુણ આખરી મેરિટમાં ગણવામાં આવતા નથી.',
        subjects: [
          {
            id: 'gpsc-mains-subj-guj',
            subjectCode: 'MAINS-GUJ',
            nameEn: 'Gujarati Essay, Drafting & Grammar',
            nameGu: 'ગુજરાતી નિબંધ, લેખન અને વ્યાકરણ',
            icon: 'FileText',
            officialWeightageEn: '300 Marks (Qualifying Standard)',
            officialWeightageGu: '૩૦૦ ગુણ (લઘુત્તમ પાસિંગ ધોરણ)',
            chapters: [
              {
                id: 'gpsc-ch-mains-guj-comp',
                chapterNumber: 1,
                titleEn: 'Official Drafting, Comprehension & Idioms',
                titleGu: 'અધિકૃત પત્રવ્યવહાર, સંક્ષેપીકરણ અને રૂઢિપ્રયોગો',
                topics: [
                  {
                    id: 'gpsc-top-mains-guj-draft',
                    code: 'MAINS-GUJ-01',
                    titleEn: 'Formal Correspondence, Précis Writing & Gujarati Vyakaran',
                    titleGu: 'સત્તાવાર પત્રલેખન, સંક્ષેપીકરણ અને ગુજરાતી વ્યાકરણ',
                    chapterId: 'gpsc-ch-mains-guj-comp',
                    subjectId: 'gpsc-mains-subj-guj',
                    paperId: 'gpsc-main-p1',
                    examId: 'gpsc-class-1-2',
                    stage: 'mains',
                    officialWordingEn: 'Essay (approx 800 words), Précis writing (one-third length), Reading comprehension, Formal speech writing, Press release / Circular drafting, English to Gujarati Translation, Grammar (Alankar, Chhand, Samas, Jodani, Rudhiprayog, Kahevat).',
                    officialWordingGu: 'નિબંધ (આશરે ૮૦૦ શબ્દો), સંક્ષેપીકરણ (ત્રીજા ભાગનું), ગદ્ય સમીક્ષા, વક્તવ્ય/ભાષણ લેખન, અખબારી યાદી/પરિપત્ર ડ્રાફ્ટિંગ, અંગ્રેજીમાંથી ગુજરાતી ભાષાંતર, વ્યાકરણ (અલંકાર, છંદ, સમાસ, જોડણી, રૂઢિપ્રયોગો, કહેવતો).',
                    sankalpExplanationEn: 'While qualifying, students who ignore Gujarati grammar often fail to reach the cutoff. Focus on standard Granth Nirman Board grammar rules, correct official terminology (Paribhashik Shabdavali), and clean paragraph structuring.',
                    sankalpExplanationGu: 'ક્વોલિફાઇંગ હોવા છતાં દર વર્ષે ઘણા ઉમેદવારો જોડણી અને વ્યાકરણમાં ગુણ ગુમાવી બેસે છે. સાર્થ જોડણીકોશ અને ભાષા નિયામકની કચેરીની પારિભાષિક શબ્દાવલિનું પાલન કરવું.',
                    keySubtopicsEn: [
                      'High-scoring Essay formats on contemporary governance & socio-cultural themes',
                      'Official government communication formats (Kacheri Patra, Paripatra, Jahirnamu)',
                      'English to Gujarati official administrative terminology translation',
                      'Grammar precision: Jodani rules, Samas identification, Chhand & Alankar'
                    ],
                    keySubtopicsGu: [
                      'સમકાલીન વહીવટ અને સામાજિક વિષયો પર ૮૦૦ શબ્દોનો નિબંધ',
                      'સરકારી પત્રવ્યવહારના માન્ય ફોર્મેટ્સ (અખબારી યાદી, જાહેરનામું, પરિપત્ર)',
                      'વહીવટી પારિભાષિક શબ્દાવલિ અને ભાષાંતર',
                      'ગુજરાતી વ્યાકરણ: જોડણી શુદ્ધિ, સમાસ, છંદ અને અલંકાર'
                    ],
                    importance: 'Essential',
                    examFrequency: 'Every Mains Examination',
                    linkedPracticeTag: 'mains',
                    recommendedReadings: [
                      { title: 'Bhasha Saundarya & Vyakaran', source: 'University Granth Nirman Board', isGovtFree: true },
                      { title: 'Sarth Jodnikosh', source: 'Gujarat Vidyapith', isGovtFree: true }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'gpsc-main-p2',
        paperCode: 'Paper 2',
        titleEn: 'English Language (Qualifying)',
        titleGu: 'અંગ્રેજી ભાષા (ક્વોલિફાઇંગ / પાસિંગ પેપર)',
        stage: 'mains',
        marks: 300,
        duration: '3 Hours',
        nature: 'Qualifying',
        officialDescriptionEn: 'Descriptive qualifying paper of 300 marks. Tested on Essay, Drafting, Précis, and Functional English Grammar. Marks not counted in final merit.',
        officialDescriptionGu: '૩૦૦ ગુણનું ક્વોલિફાઇંગ પેપર. નિબંધ, ડ્રાફ્ટિંગ, સંક્ષેપીકરણ અને વ્યાકરણ. આ ગુણ મેરિટમાં ગણવામાં આવતા નથી.',
        subjects: [
          {
            id: 'gpsc-mains-subj-eng',
            subjectCode: 'MAINS-ENG',
            nameEn: 'English Essay, Drafting & Functional Grammar',
            nameGu: 'અંગ્રેજી નિબંધ, ડ્રાફ્ટિંગ અને ફંક્શનલ ગ્રામર',
            icon: 'Languages',
            officialWeightageEn: '300 Marks (Qualifying Standard)',
            officialWeightageGu: '૩૦૦ ગુણ (લઘુત્તમ પાસિંગ ધોરણ)',
            chapters: [
              {
                id: 'gpsc-ch-mains-eng-skills',
                chapterNumber: 1,
                titleEn: 'Essay, Report Writing & Vocabulary',
                titleGu: 'નિબંધ, રિપોર્ટ રાઇટિંગ અને વોકેબ્યુલરી',
                topics: [
                  {
                    id: 'gpsc-top-mains-eng-draft',
                    code: 'MAINS-ENG-01',
                    titleEn: 'English Essay, Formal Letters, Précis & Grammar',
                    titleGu: 'અંગ્રેજી નિબંધ, સત્તાવાર પત્રો, પ્રીસી રાઇટિંગ અને ગ્રામર',
                    chapterId: 'gpsc-ch-mains-eng-skills',
                    subjectId: 'gpsc-mains-subj-eng',
                    paperId: 'gpsc-main-p2',
                    examId: 'gpsc-class-1-2',
                    stage: 'mains',
                    officialWordingEn: 'Essay (800 words), Letter writing (Official/Formal), Report writing, Press release, Précis writing, Reading comprehension, Gujarati to English translation, Grammar (Tenses, Voices, Direct/Indirect, Idioms, Prepositions, Correction of Sentences).',
                    officialWordingGu: 'નિબંધ (૮૦૦ શબ્દો), સત્તાવાર પત્ર લેખન, રિપોર્ટ રાઇટિંગ, પ્રેસ રિલીઝ, પ્રીસી રાઇટિંગ, ગુજરાતીમાંથી અંગ્રેજી ભાષાંતર, વ્યાકરણ (Tenses, Active-Passive, Direct-Indirect, Prepositions, Idioms).',
                    sankalpExplanationEn: 'Gujarati medium students should focus heavily on grammar basics (Subject-Verb agreement, prepositions) and standard report writing formats to comfortably clear the 35% qualifying bar.',
                    sankalpExplanationGu: 'ગુજરાતી માધ્યમના વિદ્યાર્થીઓ માટે ટેન્સીસ, પેસિવ વોઇસ અને પ્રેપોઝિશન પર પકડ મેળવવી જરૂરી છે જેથી સરળતાથી ક્વોલિફાઇંગ માર્ક્સ મેળવી શકાય.',
                    keySubtopicsEn: [
                      'Structuring an 800-word English essay with coherent transition paragraphs',
                      'Official Memo, Representation, and Inspection Report formats',
                      'Gujarati administrative paragraph to English translation',
                      'Common English grammatical errors in sentence correction'
                    ],
                    keySubtopicsGu: [
                      '૮૦૦ શબ્દોના અંગ્રેજી નિબંધનું વ્યવસ્થિત માળખું',
                      'સત્તાવાર મેમો, રજૂઆત પત્ર અને ઇન્સ્પેક્શન રિપોર્ટ',
                      'ગુજરાતી સરકારી પેરેગ્રાફનું અંગ્રેજીમાં અનુવાદ',
                      'વાક્ય શુદ્ધિકરણ અને સામાન્ય વ્યાકરણની ભૂલો'
                    ],
                    importance: 'Essential',
                    examFrequency: 'Every Mains Examination',
                    linkedPracticeTag: 'mains',
                    recommendedReadings: [
                      { title: 'High School English Grammar & Composition', source: 'Wren & Martin', isGovtFree: false }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'gpsc-main-p3',
        paperCode: 'Paper 3',
        titleEn: 'Essay (Merit Paper)',
        titleGu: 'નિબંધ (મેરિટ પેપર)',
        stage: 'mains',
        marks: 250,
        duration: '3 Hours',
        nature: 'Merit',
        officialDescriptionEn: 'Candidates are required to write 3 essays chosen from given topics (approx. 800 words each). Each essay carries 83.33 marks = 250 total merit marks.',
        officialDescriptionGu: 'આપેલા વિષયોમાંથી ૩ નિબંધો લખવાના રહેશે (દરેક આશરે ૮૦૦ શબ્દો). કુલ ૨૫૦ ગુણ મેરિટમાં ગણાય છે.',
        subjects: [
          {
            id: 'gpsc-mains-subj-essay',
            subjectCode: 'MAINS-ESSAY',
            nameEn: 'Analytical & Multi-Dimensional Essay Writing',
            nameGu: 'વિશ્લેષણાત્મક અને બહુપરિમાણીય નિબંધ લેખન',
            icon: 'PenTool',
            officialWeightageEn: '250 Merit Marks (Rank Deciding Paper)',
            officialWeightageGu: '૨૫૦ મેરિટ ગુણ (રેન્ક નિર્ધારક પેપર)',
            chapters: [
              {
                id: 'gpsc-ch-mains-essay-types',
                chapterNumber: 1,
                titleEn: 'Socio-Economic, Philosophical & Science Themes',
                titleGu: 'સામાજિક-આર્થિક, દાર્શનિક અને વિજ્ઞાન વિષયો',
                topics: [
                  {
                    id: 'gpsc-top-mains-essay-method',
                    code: 'MAINS-ESSAY-01',
                    titleEn: 'Multi-Dimensional PESTLE Brainstorming & Argument Building',
                    titleGu: 'બહુપરિમાણીય PESTLE વિશ્લેષણ અને તાર્કિક દલીલોનું નિર્માણ',
                    chapterId: 'gpsc-ch-mains-essay-types',
                    subjectId: 'gpsc-mains-subj-essay',
                    paperId: 'gpsc-main-p3',
                    examId: 'gpsc-class-1-2',
                    stage: 'mains',
                    officialWordingEn: 'Three essays of 800 words each from sections: (A) Contemporary Socio-Economic Issues, (B) Governance, Science, Technology & Environment, (C) Philosophical, Cultural and Value-based themes.',
                    officialWordingGu: 'ત્રણ વિભાગોમાંથી ૮૦૦-૮૦૦ શબ્દોના ૩ નિબંધ: (અ) સમકાલીન સામાજિક-આર્થિક મુદ્દાઓ, (બ) શાસન, વિજ્ઞાન, ટેકનોલોજી અને પર્યાવરણ, (ક) દાર્શનિક, સાંસ્કૃતિક અને મૂલ્ય-આધારિત વિષયો.',
                    sankalpExplanationEn: 'The single biggest rank booster. Use the PESTLE framework (Political, Economic, Social, Technological, Legal, Environmental) + Gujarat specific case studies, constitutional values, and quotes.',
                    sankalpExplanationGu: 'મેરિટમાં ટોપ રેન્ક મેળવવા માટે સૌથી મહત્વપૂર્ણ પેપર. ઐતિહાસિક, સામાજિક, આર્થિક, કાનૂની અને નૈતિક તમામ પાસાઓ આવરી લઈને સંતુલિત નિષ્કર્ષ આપવો.',
                    keySubtopicsEn: [
                      'Introduction hooks: anecdotes, constitutional quotes, striking statistics',
                      'PESTLE structural framework for balanced body paragraphs',
                      'Counter-arguments handling and constructive future roadmaps',
                      'Philosophical quotes interpretation (Mahatma Gandhi, Swami Vivekananda, Sardar Patel)'
                    ],
                    keySubtopicsGu: [
                      'નિબંધની આકર્ષક શરૂઆત: પ્રસંગો, બંધારણીય મૂલ્યો અને સુવિચારો',
                      'બહુપરિમાણીય વિશ્લેષણ (રાજકીય, આર્થિક, સામાજિક, ટેકનોલોજીકલ)',
                      'સમસ્યાઓ સામે રચનાત્મક અને વ્યવહારુ ઉકેલોની રજૂઆત',
                      'મહાત્મા ગાંધી, સરદાર પટેલ અને સ્વામી વિવેકાનંદના વિચારોનું જોડાણ'
                    ],
                    importance: 'Essential',
                    examFrequency: 'Every Mains Examination',
                    linkedPracticeTag: 'mains',
                    recommendedReadings: [
                      { title: 'Selected Contemporary Essays for Civil Services', source: 'Sankalp Civil Services Vault', isGovtFree: true }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'gpsc-main-p4',
        paperCode: 'Paper 4',
        titleEn: 'General Studies 1 (History, Culture & Geography)',
        titleGu: 'સામાન્ય અભ્યાસ ૧ (ઇતિહાસ, વારસો અને ભૂગોળ)',
        stage: 'mains',
        marks: 250,
        duration: '3 Hours',
        nature: 'Merit',
        officialDescriptionEn: 'Descriptive analytical paper covering History of India & Gujarat, Cultural Heritage, and Geography. 250 merit marks.',
        officialDescriptionGu: 'ભારત અને ગુજરાતનો ઇતિહાસ, સાંસ્કૃતિક વારસો અને ભૂગોળ આવરી લેતું ૨૫૦ ગુણનું વર્ણનાત્મક મેરિટ પેપર.',
        subjects: [
          {
            id: 'gpsc-mains-subj-gs1',
            subjectCode: 'MAINS-GS1',
            nameEn: 'Mains GS-1 Analytical Disciplines',
            nameGu: 'મુખ્ય પરીક્ષા GS-૧ વિષયો',
            icon: 'BookOpen',
            officialWeightageEn: '250 Merit Marks',
            officialWeightageGu: '૨૫૦ મેરિટ ગુણ',
            chapters: [
              {
                id: 'gpsc-ch-mains-gs1-core',
                chapterNumber: 1,
                titleEn: 'Deep-Dive Historical & Geographic Analysis',
                titleGu: 'ઇતિહાસ અને ભૂગોળનું વિશ્લેષણાત્મક અધ્યયન',
                topics: [
                  {
                    id: 'gpsc-top-mains-gs1-art',
                    code: 'MAINS-GS1-01',
                    titleEn: 'Maru-Gurjara Architecture, Stepwells & Textile Traditions of Gujarat',
                    titleGu: 'મારુ-ગુર્જર સ્થાપત્ય શૈલી, વાવ સ્થાપત્ય અને ગુજરાતની વણાટ કળા',
                    chapterId: 'gpsc-ch-mains-gs1-core',
                    subjectId: 'gpsc-mains-subj-gs1',
                    paperId: 'gpsc-main-p4',
                    examId: 'gpsc-class-1-2',
                    stage: 'mains',
                    officialWordingEn: 'Art, Architecture, Sculpture and Crafts of Gujarat: Architectural evolution from Solanki period, Maru-Gurjara style, Stepwells (Vav) of Gujarat, Patola of Patan, Bandhani, Rogan art, and tribal wall paintings (Pithora).',
                    officialWordingGu: 'ગુજરાતની કળા, સ્થાપત્ય, શિલ્પ અને હસ્તકળા: સોલંકી સ્થાપત્યનો વિકાસ, મારુ-ગુર્જર શૈલી, વાવ સ્થાપત્ય (નંદા, ભદ્રા, જયા, વિજયા પ્રકારો), પાટણના પટોળાં, બાંધણી, રોગન આર્ટ અને રાઠવા આદિવાસીઓની પીઠોરા ચિત્રકળા.',
                    sankalpExplanationEn: 'Mains examiners look for hand-drawn architectural diagrams (ground plan, Torana, Shikhara) and specific terminology for stepwells (Koot, Mandapa) and GI tagged handicrafts.',
                    sankalpExplanationGu: 'મેઈન્સમાં રાણકી વાવ, અડાલજની વાવ, મોઢેરા સૂર્યમંદિરના સ્કેચ અને પીઠોરા ચિત્રકળાના સાંસ્કૃતિક મહત્વ પર પ્રશ્નો પૂછાય છે.',
                    keySubtopicsEn: [
                      'Structural components of Maru-Gurjara Temple Architecture (Modhera & Somnath)',
                      'Stepwell architectural typology (Nanda, Bhadra, Jaya, Vijaya)',
                      'Geographical Indications (GI Tags) of Gujarat handicrafts (Patan Patola, Tangaliya shawl, Sankheda furniture)',
                      'Pithora painting ritual significance among Rathwa tribes'
                    ],
                    keySubtopicsGu: [
                      'મારુ-ગુર્જર મંદિર સ્થાપત્યના મુખ્ય અંગો (મંડપ, ગર્ભગૃહ, શિખર, તોરણ)',
                      'ગુજરાતની વાવનું વર્ગીકરણ (નંદા, ભદ્રા, જયા, વિજયા)',
                      'ગુજરાતની GI ટેગ ધરાવતી હસ્તકળાઓ (પાટણના પટોળા, સંખેડા ફર્નિચર)',
                      'રાઠવા જનજાતિની પીઠોરા ચિત્રકળાનું વિધિ-વિધાન'
                    ],
                    importance: 'Essential',
                    examFrequency: 'Direct 10-15 mark question in Mains GS-1 every year',
                    linkedPracticeTag: 'mains',
                    recommendedReadings: [
                      { title: 'Gujarat no Sanskrutik Varso', source: 'University Granth Nirman Board', isGovtFree: true }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'gpsc-main-p5',
        paperCode: 'Paper 5',
        titleEn: 'General Studies 2 (Constitution, Governance & Public Administration)',
        titleGu: 'સામાન્ય અભ્યાસ ૨ (બંધારણ, શાસન અને જાહેર વહીવટ)',
        stage: 'mains',
        marks: 250,
        duration: '3 Hours',
        nature: 'Merit',
        officialDescriptionEn: 'Constitution of India, Public Administration, Good Governance, Citizen Charters, and Administrative Ethics. 250 merit marks.',
        officialDescriptionGu: 'ભારતનું બંધારણ, જાહેર વહીવટ, સુશાસન, સિટીઝન ચાર્ટર અને વહીવટી નૈતિકતા. ૨૫૦ ગુણ.',
        subjects: [
          {
            id: 'gpsc-mains-subj-gs2',
            subjectCode: 'MAINS-GS2',
            nameEn: 'Constitution & Public Administration',
            nameGu: 'બંધારણ અને જાહેર વહીવટ',
            icon: 'Building2',
            officialWeightageEn: '250 Merit Marks',
            officialWeightageGu: '૨૫૦ મેરિટ ગુણ',
            chapters: [
              {
                id: 'gpsc-ch-mains-gs2-pubad',
                chapterNumber: 1,
                titleEn: 'Good Governance, RTI, & Citizen Centric Administration',
                titleGu: 'સુશાસન, માહિતીનો અધિકાર (RTI) અને નાગરિક કેન્દ્રી શાસન',
                topics: [
                  {
                    id: 'gpsc-top-mains-gs2-gov',
                    code: 'MAINS-GS2-01',
                    titleEn: 'E-Governance, Digital Gujarat Portal, SWAGAT & Citizen Charters',
                    titleGu: 'ઈ-ગવર્નન્સ, ડિજિટલ ગુજરાત પોર્ટલ, સ્વાગત (SWAGAT) અને નાગરિક અધિકારપત્ર',
                    chapterId: 'gpsc-ch-mains-gs2-pubad',
                    subjectId: 'gpsc-mains-subj-gs2',
                    paperId: 'gpsc-main-p5',
                    examId: 'gpsc-class-1-2',
                    stage: 'mains',
                    officialWordingEn: 'Public Administration and Governance: Meaning, scope and significance, Principles of Public Administration, E-governance applications, SWAGAT (State Wide Attention on Grievances by Application of Technology), Citizen’s Charters, Right to Information (RTI Act 2005), Lokpal, Lokayukta and anti-corruption machinery.',
                    officialWordingGu: 'જાહેર વહીવટ અને સુશાસન: અર્થ, કાર્યક્ષેત્ર અને મહત્વ, ઈ-ગવર્નન્સ, સ્વાગત (SWAGAT) ફરિયાદ નિવારણ ઓનલાઇન મોડેલ, સિટીઝન ચાર્ટર, માહિતીનો અધિકાર અધિનિયમ ૨૦૦૫, લોકપાલ અને લોકાયુક્ત.',
                    sankalpExplanationEn: 'SWAGAT won the United Nations Public Service Award. Explain its four tiers (State, District, Taluka, Gram) and how technology empowers direct citizen access to the Chief Minister.',
                    sankalpExplanationGu: 'સંયુક્ત રાષ્ટ્ર (UN) પબ્લિક સર્વિસ એવોર્ડ વિજેતા સ્વાગત મોડેલ, ડિજિટલ ગુજરાત અને સેવા સેતુ કાર્યક્રમ વહીવટી સુધારાના મુખ્ય ઉદાહરણો છે.',
                    keySubtopicsEn: [
                      'SWAGAT (State Wide Attention on Grievances by Application of Technology) mechanism',
                      'Right to Information Act 2005: Section 4 proactive disclosures & exemptions',
                      'Citizen Charters: Sevottam model and 7 principles of public service delivery',
                      'Role of District Collector, DDO, and Mamlatdar in Gujarat field administration'
                    ],
                    keySubtopicsGu: [
                      'ટેકનોલોજી આધારિત ફરિયાદ નિવારણ સ્વાગત (SWAGAT) ની ૪ સ્તરીય કાર્યપદ્ધતિ',
                      'માહિતી અધિકાર અધિનિયમ ૨૦૦૫ (કલમ ૪ અને કલમ ૮ હેઠળ મુક્તિઓ)',
                      'સિટીઝન ચાર્ટર અને સેવોત્તમ (Sevottam) મોડેલ',
                      'જિલ્લા કલેક્ટર, ડીડીઓ (DDO) અને મામલતદારની ભૂમિકા'
                    ],
                    importance: 'Essential',
                    examFrequency: 'Every Mains Examination',
                    linkedPracticeTag: 'mains',
                    recommendedReadings: [
                      { title: 'Public Administration in India', source: 'Granth Nirman Board / 2nd ARC Reports', isGovtFree: true }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'gpsc-main-p6',
        paperCode: 'Paper 6',
        titleEn: 'General Studies 3 (Economy, Science & Technology)',
        titleGu: 'સામાન્ય અભ્યાસ ૩ (અર્થતંત્ર, વિજ્ઞાન અને ટેકનોલોજી)',
        stage: 'mains',
        marks: 250,
        duration: '3 Hours',
        nature: 'Merit',
        officialDescriptionEn: 'Descriptive analytical paper covering Economy of India & Gujarat, Science & Tech applications, Environment, and Disaster Management. 250 merit marks.',
        officialDescriptionGu: 'ભારત અને ગુજરાતનું અર્થતંત્ર, વિજ્ઞાન અને ટેકનોલોજી, પર્યાવરણ અને આપત્તિ વ્યવસ્થાપન. ૨૫૦ ગુણ.',
        subjects: [
          {
            id: 'gpsc-mains-subj-gs3',
            subjectCode: 'MAINS-GS3',
            nameEn: 'Economy & Scientific Innovation',
            nameGu: 'અર્થતંત્ર અને વૈજ્ઞાનિક સંશોધન',
            icon: 'Zap',
            officialWeightageEn: '250 Merit Marks',
            officialWeightageGu: '૨૫૦ મેરિટ ગુણ',
            chapters: [
              {
                id: 'gpsc-ch-mains-gs3-core',
                chapterNumber: 1,
                titleEn: 'Disaster Management & GSDMA Model',
                titleGu: 'આપત્તિ વ્યવસ્થાપન અને GSDMA મોડેલ',
                topics: [
                  {
                    id: 'gpsc-top-mains-gs3-disaster',
                    code: 'MAINS-GS3-01',
                    titleEn: 'Gujarat State Disaster Management Authority (GSDMA) & Sendai Framework',
                    titleGu: 'ગુજરાત રાજ્ય આપત્તિ વ્યવસ્થાપન સત્તામંડળ (GSDMA) અને સેન્ડાઈ ફ્રેમવર્ક',
                    chapterId: 'gpsc-ch-mains-gs3-core',
                    subjectId: 'gpsc-mains-subj-gs3',
                    paperId: 'gpsc-main-p6',
                    examId: 'gpsc-class-1-2',
                    stage: 'mains',
                    officialWordingEn: 'Disaster Management: Institutional framework in India and Gujarat, Gujarat State Disaster Management Act 2003, GSDMA, Cyclone preparedness along 1600 km coast, Earthquake mitigation, Early Warning Systems, Sendai Framework for Disaster Risk Reduction.',
                    officialWordingGu: 'આપત્તિ વ્યવસ્થાપન: ભારત અને ગુજરાતમાં સંસ્થાકીય માળખું, ગુજરાત આપત્તિ વ્યવસ્થાપન અધિનિયમ ૨૦૦૩, GSDMA, દરિયાકાંઠે વાવાઝોડા (સાયક્લોન) સાવચેતી, ભૂકંપ નિયંત્રણ, વહેલી ચેતવણી પ્રણાલી (Early Warning Systems) અને સેન્ડાઈ ફ્રેમવર્ક.',
                    sankalpExplanationEn: 'Gujarat was the first state in India to enact a dedicated State Disaster Management Act (2003) following the 2001 Bhuj earthquake. Explain GSDMA’s zero-casualty cyclone evacuation model (Biparjoy cyclone case study).',
                    sankalpExplanationGu: '૨૦૦૧ ભુજ ભૂકંપ પછી ગુજરાતે દેશમાં સૌપ્રથમ આપત્તિ વ્યવસ્થાપન કાયદો (૨૦૦૩) બનાવ્યો હતો. બિપરજોય વાવાઝોડા વખતે અપનાવાયેલ ઝીરો કેઝ્યુઅલ્ટી મોડેલ મેઈન્સનો શ્રેષ્ઠ કેસ સ્ટડી છે.',
                    keySubtopicsEn: [
                      'GSDMA statutory structure under Gujarat Disaster Management Act 2003',
                      'Sendai Framework 4 Priorities for Disaster Risk Reduction (2015-2030)',
                      'Early Warning dissemination: Integrated Coastal Zone Management (ICZM)',
                      'Post-disaster reconstruction: Bhuj earthquake recovery lessons'
                    ],
                    keySubtopicsGu: [
                      'ગુજરાત આપત્તિ વ્યવસ્થાપન કાયદો ૨૦૦૩ હેઠળ GSDMA ની વૈધાનિક રચના',
                      'સેન્ડાઈ ફ્રેમવર્કના ૪ મુખ્ય લક્ષ્યાંકો (૨૦૧૫-૨૦૩૦)',
                      'દરિયાકાંઠે આગોતરી ચેતવણી અને સાયક્લોન શેલ્ટર્સ',
                      'આપત્તિ બાદ પુનર્વસન: ભુજ ભૂકંપ પછીનું શ્રેષ્ઠ મેનેજમેન્ટ'
                    ],
                    importance: 'High',
                    examFrequency: 'Compulsory question in Mains GS-3',
                    linkedPracticeTag: 'mains',
                    recommendedReadings: [
                      { title: 'GSDMA Disaster Management Guidelines', source: 'Govt of Gujarat Official Portal', isGovtFree: true }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'gpsc-main-p7',
        paperCode: 'Paper 7',
        titleEn: 'General Studies 4 (Ethics, Integrity & Aptitude)',
        titleGu: 'સામાન્ય અભ્યાસ ૪ (નીતિશાસ્ત્ર, સત્યનિષ્ઠા અને યોગ્યતા)',
        stage: 'mains',
        marks: 250,
        duration: '3 Hours',
        nature: 'Merit',
        officialDescriptionEn: 'Ethics, Integrity, Emotional Intelligence, Probity in Governance, and Case Studies on ethical dilemmas faced by civil servants. 250 merit marks.',
        officialDescriptionGu: 'નીતિશાસ્ત્ર, સત્યનિષ્ઠા, ભાવનાત્મક બુદ્ધિમત્તા, શાસનમાં પ્રામાણિકતા અને સનદી અધિકારીઓ સામેના નૈતિક પડકારોના કેસ સ્ટડીઝ. ૨૫૦ ગુણ.',
        subjects: [
          {
            id: 'gpsc-mains-subj-gs4',
            subjectCode: 'MAINS-GS4',
            nameEn: 'Ethics & Administrative Case Studies',
            nameGu: 'નીતિશાસ્ત્ર અને વહીવટી કેસ સ્ટડીઝ',
            icon: 'ShieldCheck',
            officialWeightageEn: '250 Merit Marks (Rank Decider)',
            officialWeightageGu: '૨૫૦ મેરિટ ગુણ (રેન્ક નિર્ધારક)',
            chapters: [
              {
                id: 'gpsc-ch-mains-gs4-foundations',
                chapterNumber: 1,
                titleEn: 'Ethical Values, Emotional Intelligence & Dilemmas',
                titleGu: 'નૈતિક મૂલ્યો, ભાવનાત્મક બુદ્ધિમત્તા અને દ્વિધાઓ',
                topics: [
                  {
                    id: 'gpsc-top-mains-gs4-casestudy',
                    code: 'MAINS-GS4-01',
                    titleEn: 'Civil Service Values, Nolan Committee Principles & Practical Case Studies',
                    titleGu: 'સનદી સેવાના પાયાના મૂલ્યો, નોલન સમિતિના ૭ સિદ્ધાંતો અને વ્યવહારુ કેસ સ્ટડીઝ',
                    chapterId: 'gpsc-ch-mains-gs4-foundations',
                    subjectId: 'gpsc-mains-subj-gs4',
                    paperId: 'gpsc-main-p7',
                    examId: 'gpsc-class-1-2',
                    stage: 'mains',
                    officialWordingEn: 'Ethics and Human Interface: Essence, determinants and consequences of Ethics in human actions; Dimensions of ethics; Ethics in public and private relationships. Foundational values for Civil Service (Integrity, Impartiality, Non-partisanship, Objectivity, Dedication to public service, Empathy, Tolerance and Compassion). Case Studies on ethical dilemmas.',
                    officialWordingGu: 'નીતિશાસ્ત્ર અને માનવીય સહસંબંધો: માનવીય કાર્યોમાં નીતિશાસ્ત્રના તત્વો, નિર્ધારકો અને પરિણામો; સનદી સેવા માટે પાયાના મૂલ્યો (સત્યનિષ્ઠા, નિષ્પક્ષતા, બિન-પક્ષપાતી વલણ, વસ્તુલક્ષીતા, લોકસેવા પ્રત્યે સમર્પણ, સહાનુભૂતિ અને સંવેદનશીલતા). વહીવટી નૈતિક દ્વિધાઓના કેસ સ્ટડીઝ.',
                    sankalpExplanationEn: 'Consists of Section A (Theory) and Section B (Practical Case Studies). In Case Studies, identify all stakeholders, list options with pros/cons, test each option against the Constitution and Nolan Principles, and provide a justified course of action.',
                    sankalpExplanationGu: 'વિભાગ-અ માં સિદ્ધાંતો અને વિભાગ-બ માં પ્રેક્ટિકલ કેસ સ્ટડીઝ હોય છે. કેસ સ્ટડીમાં તમામ પક્ષકારો (Stakeholders) ની ઓળખ, વિવિધ વિકલ્પોનું વિશ્લેષણ અને કાયદો તથા અંતરાત્મા વચ્ચે સંતુલન રાખવું.',
                    keySubtopicsEn: [
                      'Nolan Committee 7 Principles of Public Life (Selflessness, Integrity, Objectivity, Accountability, Openness, Honesty, Leadership)',
                      'Emotional Intelligence: Daniel Goleman 5 components applied to law and order policing',
                      'Resolving ethical dilemma: Conflict between public duty and personal loyalty',
                      'Structured 5-step methodology to solve GS-4 Case Studies in examination hall'
                    ],
                    keySubtopicsGu: [
                      'જાહેર જીવન માટે નોલન સમિતિના ૭ સિદ્ધાંતો (નિઃસ્વાર્થતા, પ્રામાણિકતા, પારદર્શિતા, નેતૃત્વ)',
                      'ડેનિયલ ગોલમેનનો ભાવનાત્મક બુદ્ધિમત્તાનો ખ્યાલ અને વહીવટમાં ઉપયોગ',
                      'કાયદાકીય ફરજ અને નૈતિક માનવતા વચ્ચેના વિરોધાભાસનું નિવારણ',
                      'કેસ સ્ટડી ઉકેલવાની ક્રમબદ્ધ વૈજ્ઞાનિક પદ્ધતિ'
                    ],
                    importance: 'Essential',
                    examFrequency: 'Half the paper consists of 120 marks of Case Studies',
                    linkedPracticeTag: 'mains',
                    recommendedReadings: [
                      { title: 'Lexicon for Ethics, Integrity & Aptitude', source: 'Chronicle Books', isGovtFree: false },
                      { title: '2nd Administrative Reforms Commission (4th Report: Ethics in Governance)', source: 'Government of India', isGovtFree: true }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // ==============================================================================
  // 2. UPSC CIVIL SERVICES EXAMINATION (IAS, IPS, IFS, IRS)
  // ==============================================================================
  'upsc-cse': {
    id: 'upsc-cse',
    nameEn: 'UPSC Civil Services Examination (CSE - IAS/IPS/IFS)',
    nameGu: 'યુનિયન પબ્લિક સર્વિસ કમિશન (UPSC સિવિલ સર્વિસીસ પરીક્ષા - IAS/IPS)',
    shortName: 'UPSC CSE',
    badgeEn: 'Official Gazette Scheme',
    badgeGu: 'અધિકૃત ગેઝેટ યોજના',
    conductingBodyEn: 'Union Public Service Commission (UPSC), Dholpur House, New Delhi',
    conductingBodyGu: 'કેન્દ્રીય જાહેર સેવા આયોગ (UPSC), નવી દિલ્હી',
    officialSource: {
      titleEn: 'UPSC Civil Services Examination Notification Gazette Rules & Syllabi',
      titleGu: 'UPSC સિવિલ સર્વિસીસ પરીક્ષા ગેઝેટ જાહેરનામું અને સત્તાવાર અભ્યાસક્રમ',
      documentRef: 'UPSC CSE Gazette Notification No. 05/2026-CSP',
      gazetteOrNotificationDate: 'Updated February 2026',
      officialUrl: 'https://www.upsc.gov.in/',
      notesEn: 'Verified strictly against the official UPSC Civil Services Examination gazette notification. Prelims consists of two objective papers (GS-1 200 marks determines merit cutoff; GS-2 CSAT 200 marks requires 33% qualifying). Mains has 9 papers (2 qualifying languages of 300 marks; 7 merit papers of 250 marks each = 1,750 marks + 275 Personality Test = 2,025 final score).',
      notesGu: 'UPSC ના સત્તાવાર ગેઝેટ નોટિફિકેશન મુજબ સચોટ. પ્રિલિમ્સમાં બે હેતુલક્ષી પેપર્સ (GS-૧ ૨૦૦ ગુણ મેરિટ કટઓફ નક્કી કરે છે; CSAT પેપર-૨ માં ૩૩% ક્વોલિફાઇંગ જરૂરી છે). મુખ્ય પરીક્ષામાં ૯ પેપર્સ (૨ ભાષાના પેપર્સ ૩૦૦ ગુણ ક્વોલિફાઇંગ; ૭ મેરિટ પેપર્સ દરેકના ૨૫૦ ગુણ = ૧,૭૫૦ ગુણ + ૨૭૫ ઇન્ટરવ્યુ = ૨,૦૨૫ ગુણ).',
    },
    scheme: {
      prelimsMarks: 400,
      prelimsDuration: '2 Papers x 2 Hours Each (400 Marks Total)',
      mainsMarks: 2350,
      mainsMeritMarks: 1750,
      interviewMarks: 275,
      finalMeritMarks: 2025,
      patternSummaryEn: 'Prelims: GS-1 (200 Marks, Merit cutoff) + CSAT (200 Marks, 33% Qualifying). Mains: 2 Qualifying Language Papers (300 each) + 7 Merit Papers (250 each = 1,750 Marks). Personality Test: 275 Marks.',
      patternSummaryGu: 'પ્રિલિમ્સ: GS-૧ (૨૦૦ ગુણ, કટઓફ મેરિટ) + CSAT (૨૦૦ ગુણ, ૩૩% પાસિંગ). મેઈન્સ: ૨ પાસિંગ ભાષા પેપર્સ (૩૦૦-૩૦૦) + ૭ મેરિટ પેપર્સ (દરેકના ૨૫૦ = ૧,૭૫૦ ગુણ). ઇન્ટરવ્યુ: ૨૭૫ ગુણ.',
    },
    prelimsPapers: [
      {
        id: 'upsc-pre-p1',
        paperCode: 'Paper 1 (GS)',
        titleEn: 'General Studies Paper I (Merit Ranking Paper)',
        titleGu: 'સામાન્ય અભ્યાસ પેપર-૧ (પ્રિલિમ્સ કટઓફ રેન્કિંગ પેપર)',
        stage: 'prelims',
        marks: 200,
        duration: '2 Hours (9:30 AM to 11:30 AM)',
        nature: 'Merit',
        officialDescriptionEn: '100 multiple choice questions carrying 200 marks. Negative marking of one-third (0.33) for wrong answers. The marks obtained in this paper determine qualification for the Civil Services Mains Examination.',
        officialDescriptionGu: '૧૦૦ હેતુલક્ષી પ્રશ્નો, ૨૦૦ ગુણ, ૨ કલાક. ખોટા જવાબ દીઠ એક-તૃતીયાંશ (૦.૬૬) નેગેટિવ માર્કિંગ. આ પેપરના ગુણના આધારે મેઈન્સ માટેનું કટઓફ નક્કી થાય છે.',
        subjects: [
          {
            id: 'upsc-subj-polity',
            subjectCode: 'UPSC-GS-POL',
            nameEn: 'Indian Polity & Governance',
            nameGu: 'ભારતીય રાજ્યવ્યવસ્થા અને બંધારણ',
            icon: 'Scale',
            officialWeightageEn: 'Approx. 30-36 Marks (15-18 Questions)',
            officialWeightageGu: 'આશરે ૩૦ થી ૩૬ ગુણ (૧૫ થી ૧૮ પ્રશ્નો)',
            chapters: [
              {
                id: 'upsc-ch-pol-const',
                chapterNumber: 1,
                titleEn: 'Constitutional Scheme, Federalism & Judiciary',
                titleGu: 'બંધારણીય વ્યવસ્થા, સંઘવાદ અને ન્યાયતંત્ર',
                topics: [
                  {
                    id: 'upsc-top-pol-const-gov',
                    code: 'UPSC-POL-01',
                    titleEn: 'Indian Constitution - Historical Underpinnings, Evolution & Federal Structure',
                    titleGu: 'ભારતીય બંધારણ - ઐતિહાસિક પૃષ્ઠભૂમિ, વિકાસ અને સંઘીય માળખું',
                    chapterId: 'upsc-ch-pol-const',
                    subjectId: 'upsc-subj-polity',
                    paperId: 'upsc-pre-p1',
                    examId: 'upsc-cse',
                    stage: 'prelims',
                    officialWordingEn: 'Indian Polity and Governance - Constitution, Political System, Panchayati Raj, Public Policy, Rights Issues, etc.',
                    officialWordingGu: 'ભારતીય રાજ્યવ્યવસ્થા અને શાસન - બંધારણ, રાજકીય પ્રણાલી, પંચાયતી રાજ, જાહેર નીતિ, અધિકારો સંબંધી મુદ્દાઓ વગેરે.',
                    sankalpExplanationEn: 'UPSC tests conceptual precision rather than rote memorization. Questions explore asymmetric federalism (Article 371), emergency provisions (Article 356 judicial review in S.R. Bommai case), and money bills vs financial bills.',
                    sankalpExplanationGu: 'UPSC માં કન્સેપ્ટ ક્લેરિટી સૌથી મહત્વની છે. સંઘીય માળખું, કલમ ૩૫૬ ની મર્યાદાઓ (એસ.આર. બોમ્માઇ કેસ), અને રાજ્યસભાની વિશિષ્ટ સત્તાઓ પર પ્રશ્નો પૂછાય છે.',
                    keySubtopicsEn: [
                      'Constitutional evolution: Regulating Act 1773 to Government of India Act 1935',
                      'Constituent Assembly debates and Drafting Committee role',
                      'Centre-State Relations: Legislative, Administrative, Financial (Finance Commission)',
                      'Judicial independence, collegium system, and basic structure guardrails'
                    ],
                    keySubtopicsGu: [
                      'બંધારણીય ઇતિહાસ: ૧૭૭૩ ના નિયામક ધારાથી ૧૯૩૫ ના ભારત શાસન અધિનિયમ સુધી',
                      'બંધારણ સભાની ચર્ચાઓ અને ડ્રાફ્ટિંગ કમિટી',
                      'કેન્દ્ર-રાજ્ય સંબંધો (નાણાકીય પંચ અને કર વહેંચણી)',
                      'ન્યાયતંત્રની સ્વાયત્તતા, કોલેજિયમ પદ્ધતિ અને મૂળભૂત માળખું'
                    ],
                    importance: 'Essential',
                    examFrequency: 'Every single year (15+ questions)',
                    linkedModuleTopicId: 'topic-f1',
                    linkedPracticeTag: 'polity',
                    recommendedReadings: [
                      { title: 'Indian Polity', source: 'M. Laxmikanth', isGovtFree: false },
                      { title: 'The Indian Constitution: Cornerstone of a Nation', source: 'Granville Austin', isGovtFree: false }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'upsc-subj-env',
            subjectCode: 'UPSC-GS-ENV',
            nameEn: 'Environment, Ecology & Climate Change',
            nameGu: 'પર્યાવરણ, પારિસ્થિતિકી અને જળવાયુ પરિવર્તન',
            icon: 'Leaf',
            officialWeightageEn: 'Approx. 30-40 Marks (15-20 Questions)',
            officialWeightageGu: 'આશરે ૩૦ થી ૪૦ ગુણ (૧૫ થી ૨૦ પ્રશ્નો)',
            chapters: [
              {
                id: 'upsc-ch-env-eco',
                chapterNumber: 1,
                titleEn: 'Ecosystem Dynamics, Biodiversity & Conservation Treaties',
                titleGu: 'ઇકોસિસ્ટમ, જૈવવિવિધતા અને આંતરરાષ્ટ્રીય પર્યાવરણીય સંધિઓ',
                topics: [
                  {
                    id: 'upsc-top-env-treaties',
                    code: 'UPSC-ENV-01',
                    titleEn: 'UNFCCC, COP Summits, CBD, CITES & National Protected Areas',
                    titleGu: 'UNFCCC, COP પરિષદો, જૈવવિવિધતા સંધિ (CBD), CITES અને રાષ્ટ્રીય ઉદ્યાનો',
                    chapterId: 'upsc-ch-env-eco',
                    subjectId: 'upsc-subj-env',
                    paperId: 'upsc-pre-p1',
                    examId: 'upsc-cse',
                    stage: 'prelims',
                    officialWordingEn: 'General issues on Environmental Ecology, Bio-diversity and Climate Change - that do not require subject specialization.',
                    officialWordingGu: 'પર્યાવરણીય પારિસ્થિતિકી, જૈવવિવિધતા અને જળવાયુ પરિવર્તન અંગેના સામાન્ય મુદ્દાઓ - જેમાં વિષય વિશેષજ્ઞતાની જરૂર નથી.',
                    sankalpExplanationEn: 'Combined with Indian Forest Service (IFoS) prelims screening, Environment accounts for nearly 20% of the paper. Focus on IUCN red list endangered flora/fauna, tiger reserves, Ramsar wetlands, and global carbon crediting mechanisms.',
                    sankalpExplanationGu: 'ઇન્ડિયન ફોરેસ્ટ સર્વિસ (IFoS) ની પ્રિલિમ્સ સાથે લેવાતી હોવાથી પર્યાવરણનો ભારાંશ ઘણો ઊંચો છે. લુપ્તપ્રાય વન્યજીવો, ટાઇગર રિઝર્વ અને વૈશ્વિક ક્લાઇમેટ એગ્રીમેન્ટ્સ મુખ્ય છે.',
                    keySubtopicsEn: [
                      'Ecosystem energetics: Food chains, trophic levels, ecological pyramids and biomagnification',
                      'UNFCCC Paris Agreement: Nationally Determined Contributions (NDCs) & Net Zero 2070',
                      'Wildlife Protection Act 1972 (amended schedules) and statutory bodies (NTCA, WCCB)',
                      'Biodiversity hotspots in India (Western Ghats, Indo-Burma, Himalayas, Sundaland)'
                    ],
                    keySubtopicsGu: [
                      'ઇકોસિસ્ટમ ઊર્જા પ્રવાહ અને બાયોમેગ્નિફિકેશન',
                      'પેરિસ કરાર અને ભારતનું ૨૦૭૦ સુધી નેટ ઝીરો લક્ષ્યાંક',
                      'વન્યજીવ સંરક્ષણ કાયદો ૧૯૭૨ અને પ્રોજેક્ટ ટાઇગર',
                      'ભારતના જૈવવિવિધતા હોટસ્પોટ્સ (પશ્ચિમ ઘાટ, હિમાલય)'
                    ],
                    importance: 'Essential',
                    examFrequency: 'Every year (16-20 MCQs)',
                    linkedModuleTopicId: 'topic-f9',
                    linkedPracticeTag: 'science_tech',
                    recommendedReadings: [
                      { title: 'Environment', source: 'Shankar IAS Academy', isGovtFree: false },
                      { title: 'State of Environment Report', source: 'MoEFCC, Government of India', isGovtFree: true }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'upsc-pre-p2',
        paperCode: 'Paper 2 (CSAT)',
        titleEn: 'General Studies Paper II (Civil Services Aptitude Test - CSAT)',
        titleGu: 'સામાન્ય અભ્યાસ પેપર-૨ (CSAT - યોગ્યતા કસોટી)',
        stage: 'prelims',
        marks: 200,
        duration: '2 Hours (2:30 PM to 4:30 PM)',
        nature: 'Qualifying',
        officialDescriptionEn: '80 objective multiple choice questions carrying 200 marks. Candidates must score a minimum of 33% (66 marks out of 200) to qualify for evaluation of GS Paper 1.',
        officialDescriptionGu: '૮૦ હેતુલક્ષી પ્રશ્નો, ૨૦૦ ગુણ. લઘુત્તમ ૩૩% (૬૬ ગુણ) મેળવવા ફરજિયાત છે. આ પેપરમાં પાસ થાઓ તો જ GS-૧ નું પેપર ચકાસાય છે.',
        subjects: [
          {
            id: 'upsc-subj-csat',
            subjectCode: 'UPSC-CSAT',
            nameEn: 'Comprehension, Reasoning & Basic Numeracy',
            nameGu: 'ગદ્ય સમીક્ષા, તાર્કિક ક્ષમતા અને ગણિત',
            icon: 'Calculator',
            officialWeightageEn: '200 Marks (33% Qualifying / 66 Marks)',
            officialWeightageGu: '૨૦૦ ગુણ (૩૩% પાસિંગ / ૬૬ ગુણ)',
            chapters: [
              {
                id: 'upsc-ch-csat-comp',
                chapterNumber: 1,
                titleEn: 'Reading Comprehension & Critical Inference',
                titleGu: 'વાંચન ગદ્ય સમીક્ષા અને તાત્વિક નિષ્કર્ષ',
                topics: [
                  {
                    id: 'upsc-top-csat-rc',
                    code: 'UPSC-CSAT-01',
                    titleEn: 'Reading Comprehension - Critical Assumption, Inference & Central Idea',
                    titleGu: 'રીડિંગ કોમ્પ્રીહેન્શન - પૂર્વધારણાઓ, ગર્ભિતાર્થ અને મુખ્ય વિચાર',
                    chapterId: 'upsc-ch-csat-comp',
                    subjectId: 'upsc-subj-csat',
                    paperId: 'upsc-pre-p2',
                    examId: 'upsc-cse',
                    stage: 'prelims',
                    officialWordingEn: 'Comprehension, Interpersonal skills including communication skills, Logical reasoning and analytical ability, Decision making and problem solving, General mental ability, Basic numeracy (Class X level), Data interpretation (Class X level).',
                    officialWordingGu: 'ગદ્ય સમીક્ષા, આંતરવૈયક્તિક કૌશલ્યો, તાર્કિક અને વિશ્લેષણાત્મક ક્ષમતા, નિર્ણય પ્રક્રિયા, સામાન્ય માનસિક ક્ષમતા, પ્રાથમિક ગણિત (ધોરણ ૧૦ સ્તર), માહિતી અર્થઘટન.',
                    sankalpExplanationEn: 'Over 25-28 questions every year are dense English reading comprehension passages based on climate change, philosophy, and economics. Beware of extreme word traps (Always, Never, Solely, Inevitable).',
                    sankalpExplanationGu: 'દર વર્ષે ૨૫ થી ૨૮ પ્રશ્નો કોમ્પ્રીહેન્શનના પૂછાય છે. નિષ્કર્ષ (Inference) અને પૂર્વધારણા (Assumption) વચ્ચેનો તફાવત સમજવો અનિવાર્ય છે.',
                    keySubtopicsEn: [
                      'Differentiating explicit statement vs implicit assumption in UPSC passages',
                      'Corroborating tone: critical, optimistic, analytical, didactic',
                      'Elimination strategy for extreme distractors (none, all, only)',
                      'Time management: 80 questions in 120 minutes strategy'
                    ],
                    keySubtopicsGu: [
                      'પેરેગ્રાફમાં સ્પષ્ટ વિધાન અને ગર્ભિત અનુમાન વચ્ચેનો ભેદ',
                      'લેખકના દ્રષ્ટિકોણનું મૂલ્યાંકન',
                      'અતિશયોક્તિભર્યા વિકલ્પોને બાકાત (Elimination) કરવાની રીત',
                      '૧૨૦ મિનિટમાં ૮૦ પ્રશ્નોનું ટાઇમ મેનેજમેન્ટ'
                    ],
                    importance: 'Essential',
                    examFrequency: '25-28 Questions every year (Approx 70 marks)',
                    linkedPracticeTag: 'csat',
                    recommendedReadings: [
                      { title: 'CSAT Manual for Civil Services Examination', source: 'Tata McGraw Hill / Arihant', isGovtFree: false }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    mainsPapers: [
      {
        id: 'upsc-mains-p1',
        paperCode: 'Paper I',
        titleEn: 'Essay (250 Merit Marks)',
        titleGu: 'નિબંધ (૨૫૦ મેરિટ ગુણ)',
        stage: 'mains',
        marks: 250,
        duration: '3 Hours',
        nature: 'Merit',
        officialDescriptionEn: 'Candidates must write two essays (one from Section A and one from Section B) in 1,000 to 1,200 words each. Total 250 marks counted for merit.',
        officialDescriptionGu: 'ઉમેદવારોએ બે નિબંધ લખવાના રહેશે (વિભાગ-A માંથી એક અને વિભાગ-B માંથી એક, દરેક ૧,૦૦૦ થી ૧,૨૦૦ શબ્દો). કુલ ૨૫૦ મેરિટ ગુણ.',
        subjects: [
          {
            id: 'upsc-mains-subj-essay',
            subjectCode: 'UPSC-ESSAY',
            nameEn: 'Philosophical & Socio-Economic Essays',
            nameGu: 'દાર્શનિક અને સામાજિક-આર્થિક નિબંધ',
            icon: 'PenTool',
            officialWeightageEn: '250 Merit Marks',
            officialWeightageGu: '૨૫૦ મેરિટ ગુણ',
            chapters: [
              {
                id: 'upsc-ch-essay-core',
                chapterNumber: 1,
                titleEn: 'Deep Intellectual & Philosophical Essay Construction',
                titleGu: 'બૌદ્ધિક અને દાર્શનિક નિબંધ રચના',
                topics: [
                  {
                    id: 'upsc-top-essay-phil',
                    code: 'UPSC-ESSAY-01',
                    titleEn: 'Philosophical & Epistemological Essay Writing',
                    titleGu: 'દાર્શનિક અને જ્ઞાનમીમાંસા આધારિત નિબંધ લેખન',
                    chapterId: 'upsc-ch-essay-core',
                    subjectId: 'upsc-mains-subj-essay',
                    paperId: 'upsc-mains-p1',
                    examId: 'upsc-cse',
                    stage: 'mains',
                    officialWordingEn: 'Candidates may be required to write essays on multiple topics. They will be expected to keep closely to the subject of the essay to arrange their ideas in orderly fashion, and to write concisely. Credit will be given for effective and exact expression.',
                    officialWordingGu: 'ઉમેદવારોએ આપેલા વિષયો પર સુસંગત અને વ્યવસ્થિત વિચારો સાથે સંક્ષિપ્ત અને પ્રભાવશાળી શૈલીમાં નિબંધ લખવાનો રહેશે. સચોટ અભિવ્યક્તિને વિશેષ શ્રેય આપવામાં આવશે.',
                    sankalpExplanationEn: 'Recent UPSC trends show both Section A and Section B dominated by philosophical proverbs (e.g., "Ships don’t sink because of the water around them; they sink because of water that gets into them"). Deconstruct literal, symbolic, psychological, and global dimensions.',
                    sankalpExplanationGu: 'તાજેતરના વર્ષોમાં બંને વિભાગોમાં દાર્શનિક વિષયો વધુ પૂછાય છે. વિષયના ગૂઢ અર્થનું સામાજિક, રાજકીય, માનસિક અને આંતરરાષ્ટ્રીય સ્તરે વિશ્લેષણ કરવું જરૂરી છે.',
                    keySubtopicsEn: [
                      'Deciphering abstract aphorisms into tangible real-world analogies',
                      'Bridging western and Indian philosophy (Aristotle, Kant, Upanishads, Gandhi)',
                      'Thesis, antithesis, and synthesis argumentative structure',
                      'Flow, coherence, and paragraph transitions without headings'
                    ],
                    keySubtopicsGu: [
                      'અમૂર્ત દાર્શનિક વિચારોનું વાસ્તવિક ઉદાહરણો સાથે જોડાણ',
                      'ભારતીય અને પશ્ચિમી દર્શનશાસ્ત્રના વિચારોનો વિનિયોગ',
                      'દલીલ, પ્રતિ-દલીલ અને સમન્વયનું સંતુલિત માળખું',
                      'શીર્ષકો વિના પ્રવાહી અને આકર્ષક શૈલીમાં પેરેગ્રાફ્સનું સંયોજન'
                    ],
                    importance: 'Essential',
                    examFrequency: 'Every Mains Examination (2 Essays)',
                    linkedPracticeTag: 'mains',
                    recommendedReadings: [
                      { title: 'Essays for Civil Services', source: 'Nishant Jain IAS', isGovtFree: false }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'upsc-mains-p2',
        paperCode: 'Paper II (GS-1)',
        titleEn: 'General Studies I (Heritage, History, Society & Geography)',
        titleGu: 'સામાન્ય અભ્યાસ ૧ (વારસો, ઇતિહાસ, સમાજ અને વિશ્વ ભૂગોળ)',
        stage: 'mains',
        marks: 250,
        duration: '3 Hours',
        nature: 'Merit',
        officialDescriptionEn: 'Indian Heritage and Culture, History and Geography of the World and Society. 250 merit marks (20 analytical questions).',
        officialDescriptionGu: 'ભારતીય વારસો અને સંસ્કૃતિ, વિશ્વનો ઇતિહાસ અને ભૂગોળ તથા ભારતીય સમાજ. ૨૫૦ ગુણ.',
        subjects: [
          {
            id: 'upsc-mains-subj-gs1',
            subjectCode: 'UPSC-GS1',
            nameEn: 'Indian Heritage, Society & World Geography',
            nameGu: 'વારસો, ભારતીય સમાજ અને વિશ્વ ભૂગોળ',
            icon: 'Globe2',
            officialWeightageEn: '250 Merit Marks',
            officialWeightageGu: '૨૫૦ મેરિટ ગુણ',
            chapters: [
              {
                id: 'upsc-ch-mains-soc',
                chapterNumber: 1,
                titleEn: 'Salient Features of Indian Society & Globalization',
                titleGu: 'ભારતીય સમાજના લક્ષણો અને વૈશ્વિકીકરણની અસરો',
                topics: [
                  {
                    id: 'upsc-top-mains-society',
                    code: 'UPSC-GS1-SOC',
                    titleEn: 'Diversity of India, Women’s Organizations, Urbanization & Secularism',
                    titleGu: 'ભારતની વિવિધતા, મહિલા સંગઠનો, શહેરીકરણ અને બિનસાંપ્રદાયિકતા',
                    chapterId: 'upsc-ch-mains-soc',
                    subjectId: 'upsc-mains-subj-gs1',
                    paperId: 'upsc-mains-p2',
                    examId: 'upsc-cse',
                    stage: 'mains',
                    officialWordingEn: 'Salient features of Indian Society, Diversity of India. Role of women and women’s organization, population and associated issues, poverty and developmental issues, urbanization, their problems and their remedies. Effects of globalization on Indian society. Social empowerment, communalism, regionalism & secularism.',
                    officialWordingGu: 'ભારતીય સમાજના મુખ્ય લક્ષણો, ભારતની વિવિધતા, મહિલાઓની ભૂમિકા અને મહિલા સંગઠનો, ગરીબી અને વસ્તીના પ્રશ્નો, શહેરીકરણની સમસ્યાઓ અને ઉપાયો. ભારતીય સમાજ પર વૈશ્વિકીકરણની અસરો. સામાજિક સશક્તિકરણ, કોમવાદ, પ્રાદેશિકતા અને ધર્મનિરપેક્ષતા.',
                    sankalpExplanationEn: 'Society covers 60-75 marks in GS-1. Address nuances such as feminization of agriculture, care economy, impacts of gig economy on traditional joint families, and caste census debates.',
                    sankalpExplanationGu: 'GS-૧ માં ભારતીય સમાજ પરથી ૬૦ થી ૭૫ ગુણના પ્રશ્નો પૂછાય છે. કૃષિમાં મહિલાઓનું યોગદાન, સંયુક્ત કુટુંબ વ્યવસ્થા પર શહેરીકરણની અસર, અને વિવિધતામાં એકતા ખાસ પૂછાય છે.',
                    keySubtopicsEn: [
                      'Impact of Westernization vs Sanskritization in contemporary India',
                      'Care economy and unpaid domestic labor recognition',
                      'Smart cities, urban sprawl, slums and informal sector challenges',
                      'Regionalism vs national integration dynamics'
                    ],
                    keySubtopicsGu: [
                      'સમકાલીન ભારતમાં પશ્ચિમીકરણ અને સંસ્કૃતિકરણની પ્રક્રિયા',
                      'મહિલાઓનું ઘરગથ્થુ અવેતન શ્રમ અને અર્થતંત્ર',
                      'શહેરી ઝૂંપડપટ્ટીઓ, પ્રદૂષણ અને સ્માર્ટ સિટી મિશન',
                      'પ્રાદેશિક અસ્મિતા અને રાષ્ટ્રીય એકતા'
                    ],
                    importance: 'Essential',
                    examFrequency: '5-6 Questions in Mains GS-1 every year',
                    linkedPracticeTag: 'mains',
                    recommendedReadings: [
                      { title: 'Indian Society (NCERT Class 12)', source: 'NCERT', isGovtFree: true },
                      { title: 'Social Problems in India', source: 'Ram Ahuja', isGovtFree: false }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'upsc-mains-p3',
        paperCode: 'Paper III (GS-2)',
        titleEn: 'General Studies II (Governance, Constitution, Polity & IR)',
        titleGu: 'સામાન્ય અભ્યાસ ૨ (શાસન, બંધારણ, રાજ્યવ્યવસ્થા અને આંતરરાષ્ટ્રીય સંબંધો)',
        stage: 'mains',
        marks: 250,
        duration: '3 Hours',
        nature: 'Merit',
        officialDescriptionEn: 'Governance, Constitution, Polity, Social Justice and International Relations. 250 merit marks.',
        officialDescriptionGu: 'શાસન, બંધારણ, રાજ્યવ્યવસ્થા, સામાજિક ન્યાય અને આંતરરાષ્ટ્રીય સંબંધો. ૨૫૦ ગુણ.',
        subjects: [
          {
            id: 'upsc-mains-subj-gs2',
            subjectCode: 'UPSC-GS2',
            nameEn: 'Polity, Governance & International Relations',
            nameGu: 'રાજ્યવ્યવસ્થા, શાસન અને આંતરરાષ્ટ્રીય સંબંધો',
            icon: 'Landmark',
            officialWeightageEn: '250 Merit Marks',
            officialWeightageGu: '૨૫૦ મેરિટ ગુણ',
            chapters: [
              {
                id: 'upsc-ch-mains-ir',
                chapterNumber: 1,
                titleEn: 'India’s Bilateral Relations & Global Groupings',
                titleGu: 'ભારતના દ્વિપક્ષીય સંબંધો અને વૈશ્વિક સંગઠનો',
                topics: [
                  {
                    id: 'upsc-top-mains-ir-quad',
                    code: 'UPSC-GS2-IR',
                    titleEn: 'Quad, I2U2, Global South Leadership & Indo-Pacific Strategy',
                    titleGu: 'ક્વાડ (Quad), I2U2, ગ્લોબલ સાઉથનું નેતૃત્વ અને ઇન્ડો-પેસિફિક વ્યૂહરચના',
                    chapterId: 'upsc-ch-mains-ir',
                    subjectId: 'upsc-mains-subj-gs2',
                    paperId: 'upsc-mains-p3',
                    examId: 'upsc-cse',
                    stage: 'mains',
                    officialWordingEn: 'India and its neighborhood-relations. Bilateral, regional and global groupings and agreements involving India and/or affecting India’s interests. Effect of policies and politics of developed and developing countries on India’s interests, Indian diaspora.',
                    officialWordingGu: 'ભારત અને તેના પડોશી દેશો વચ્ચેના સંબંધો. દ્વિપક્ષીય, પ્રાદેશિક અને વૈશ્વિક સંગઠનો તથા કરારો. વિકસિત અને વિકાસશીલ દેશોની નીતિઓની ભારત પર અસર, ભારતીય ડાયસ્પોરા.',
                    sankalpExplanationEn: 'Focus on strategic autonomy, multi-alignment diplomacy, G20 New Delhi Declaration legacy, Voice of Global South Summits, and supply chain resilience against geopolitical conflicts.',
                    sankalpExplanationGu: 'ભારતની વ્યૂહાત્મક સ્વાયત્તતા, ક્વાડ (Quad), આઇએમઇસી (IMEC કોરિડોર) અને ગ્લોબલ સાઉથના દેશોના અવાજ તરીકે ભારતની વધતી વૈશ્વિક ભૂમિકા પર પ્રશ્નો પૂછાય છે.',
                    keySubtopicsEn: [
                      'Quad (India, USA, Japan, Australia) maritime domain awareness in Indo-Pacific',
                      'India-Middle East-Europe Economic Corridor (IMEC) geopolitical significance',
                      'Neighborhood First policy vs Chinese String of Pearls infrastructure encirclement',
                      'Role and remittances of the 32 million strong Indian diaspora'
                    ],
                    keySubtopicsGu: [
                      'ઇન્ડો-પેસિફિક ક્ષેત્રમાં ક્વાડ (Quad) સંગઠનની ભૂમિકા',
                      'ઇન્ડિયા-મિડલ ઇસ્ટ-યુરોપ ઇકોનોમિક કોરિડોર (IMEC) નું મહત્વ',
                      'ભારતની પડોશી પ્રથમ (Neighborhood First) નીતિ',
                      'ભારતીય ડાયસ્પોરાનું યોગદાન અને વિદેશી હૂંડિયામણ'
                    ],
                    importance: 'Essential',
                    examFrequency: '4-5 Questions (50-60 Marks) in Mains GS-2',
                    linkedPracticeTag: 'mains',
                    recommendedReadings: [
                      { title: 'The India Way: Strategies for an Uncertain World', source: 'Dr. S. Jaishankar', isGovtFree: false },
                      { title: 'Ministry of External Affairs (MEA) Annual Briefs', source: 'mea.gov.in', isGovtFree: true }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'upsc-mains-p4',
        paperCode: 'Paper IV (GS-3)',
        titleEn: 'General Studies III (Economy, Tech, Environment & Security)',
        titleGu: 'સામાન્ય અભ્યાસ ૩ (અર્થતંત્ર, સાયન્સ-ટેક, પર્યાવરણ અને સુરક્ષા)',
        stage: 'mains',
        marks: 250,
        duration: '3 Hours',
        nature: 'Merit',
        officialDescriptionEn: 'Technology, Economic Development, Bio-diversity, Environment, Security and Disaster Management. 250 merit marks.',
        officialDescriptionGu: 'ટેકનોલોજી, આર્થિક વિકાસ, જૈવવિવિધતા, પર્યાવરણ, સુરક્ષા અને આપત્તિ વ્યવસ્થાપન. ૨૫૦ ગુણ.',
        subjects: [
          {
            id: 'upsc-mains-subj-gs3',
            subjectCode: 'UPSC-GS3',
            nameEn: 'Internal Security & Economic Growth',
            nameGu: 'આંતરિક સુરક્ષા અને આર્થિક વિકાસ',
            icon: 'Shield',
            officialWeightageEn: '250 Merit Marks',
            officialWeightageGu: '૨૫૦ મેરિટ ગુણ',
            chapters: [
              {
                id: 'upsc-ch-mains-sec',
                chapterNumber: 1,
                titleEn: 'Border Management, Cyber Warfare & Internal Threats',
                titleGu: 'સીમા સુરક્ષા વ્યવસ્થાપન, સાયબર યુદ્ધ અને આંતરિક પડકારો',
                topics: [
                  {
                    id: 'upsc-top-mains-security',
                    code: 'UPSC-GS3-SEC',
                    titleEn: 'Cybersecurity, Drone Warfare, Money Laundering & Border Security',
                    titleGu: 'સાયબર સુરક્ષા, ડ્રોન ટેકનોલોજીના ખતરા, મની લોન્ડરિંગ અને સરહદી સુરક્ષા',
                    chapterId: 'upsc-ch-mains-sec',
                    subjectId: 'upsc-mains-subj-gs3',
                    paperId: 'upsc-mains-p4',
                    examId: 'upsc-cse',
                    stage: 'mains',
                    officialWordingEn: 'Linkages between development and spread of extremism. Role of external state and non-state actors in creating challenges to internal security. Challenges to internal security through communication networks, role of media and social networking sites, basics of cyber security; money-laundering and its prevention. Security challenges and their management in border areas; linkages of organized crime with terrorism.',
                    officialWordingGu: 'વિકાસ અને ઉગ્રવાદના ફેલાવા વચ્ચેનો સંબંધ. આંતરિક સુરક્ષા સામે સરહદ પારના પડકારો. સાયબર સુરક્ષાના પાયાના ખ્યાલો, સોશિયલ મીડિયાનો દુરુપયોગ, મની લોન્ડરિંગ અને નાણાકીય આતંકવાદ. સરહદી વિસ્તારોમાં સુરક્ષા વ્યવસ્થાપન અને સંગઠિત ગુનાઓનું આતંકવાદ સાથે જોડાણ.',
                    sankalpExplanationEn: 'Internal security accounts for 50 marks in GS-3. Analyze non-kinetic warfare, weaponization of drones along the western border, CERT-In guidelines, and the role of PMLA and FATF grey/black listing.',
                    sankalpExplanationGu: 'GS-૩ માં આંતરિક સુરક્ષા પર ૫૦ ગુણના પ્રશ્નો આવે છે. ડ્રોન દ્વારા હથિયારો-ડ્રગ્સની દાણચોરી, સાયબર હુમલા અને સરહદી સ્માર્ટ ફેન્સિંગ (CIBMS) ખાસ તૈયાર કરવા.',
                    keySubtopicsEn: [
                      'Cross-border drone intrusions along Indo-Pak border & anti-drone counter measures',
                      'Critical Information Infrastructure protection & National Cyber Security Policy',
                      'Comprehensive Integrated Border Management System (CIBMS)',
                      'Prevention of Money Laundering Act (PMLA) & Enforcement Directorate powers'
                    ],
                    keySubtopicsGu: [
                      'સરહદ પર ડ્રોન હુમલા અને એન્ટી-ડ્રોન ટેકનોલોજી',
                      'સાયબર સિક્યોરિટી અને મહત્વના ડિજિટલ ઇન્ફ્રાસ્ટ્રક્ચરનું રક્ષણ',
                      'સ્માર્ટ સીમા વ્યવસ્થાપન (CIBMS પ્રોજેક્ટ)',
                      'મની લોન્ડરિંગ નિવારણ અધિનિયમ (PMLA) અને ED ની સત્તાઓ'
                    ],
                    importance: 'High',
                    examFrequency: '4 Questions (50 Marks) in Mains GS-3',
                    linkedPracticeTag: 'mains',
                    recommendedReadings: [
                      { title: 'Challenges to Internal Security of India', source: 'Ashok Kumar IPS', isGovtFree: false },
                      { title: 'Ministry of Home Affairs Annual Report', source: 'mha.gov.in', isGovtFree: true }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'upsc-mains-p5',
        paperCode: 'Paper V (GS-4)',
        titleEn: 'General Studies IV (Ethics, Integrity & Aptitude)',
        titleGu: 'સામાન્ય અભ્યાસ ૪ (નીતિશાસ્ત્ર, સત્યનિષ્ઠા અને યોગ્યતા)',
        stage: 'mains',
        marks: 250,
        duration: '3 Hours',
        nature: 'Merit',
        officialDescriptionEn: 'Ethics and Human Interface, Attitude, Aptitude, Emotional Intelligence, Contributions of Moral Thinkers, Probity in Governance, and Case Studies on ethical dilemmas. 250 merit marks.',
        officialDescriptionGu: 'નીતિશાસ્ત્ર, અભિરૂચિ, યોગ્યતા, ભાવનાત્મક બુદ્ધિમત્તા, ચિંતકોનું યોગદાન, સુશાસનમાં સત્યનિષ્ઠા અને કેસ સ્ટડીઝ. ૨૫૦ ગુણ.',
        subjects: [
          {
            id: 'upsc-mains-subj-gs4',
            subjectCode: 'UPSC-GS4',
            nameEn: 'Ethics, Integrity & Case Studies',
            nameGu: 'નીતિશાસ્ત્ર, સત્યનિષ્ઠા અને કેસ સ્ટડીઝ',
            icon: 'Award',
            officialWeightageEn: '250 Merit Marks (Rank Decider)',
            officialWeightageGu: '૨૫૦ મેરિટ ગુણ',
            chapters: [
              {
                id: 'upsc-ch-mains-eth-thinkers',
                chapterNumber: 1,
                titleEn: 'Moral Thinkers & Ethical Decision Making',
                titleGu: 'નૈતિક ચિંતકો અને નિર્ણય પ્રક્રિયા',
                topics: [
                  {
                    id: 'upsc-top-mains-eth-kant',
                    code: 'UPSC-GS4-01',
                    titleEn: 'Kantian Deontology, Utilitarianism, Aristotelian Virtue & Gandhi’s Talisman',
                    titleGu: 'કાન્ટનો કર્તવ્યવાદ, ઉપયોગિતાવાદ, સદ્ગુણ નીતિશાસ્ત્ર અને ગાંધીજીનું જંતર',
                    chapterId: 'upsc-ch-mains-eth-thinkers',
                    subjectId: 'upsc-mains-subj-gs4',
                    paperId: 'upsc-mains-p5',
                    examId: 'upsc-cse',
                    stage: 'mains',
                    officialWordingEn: 'Contributions of moral thinkers and philosophers from India and world. Ethics in public administration; status and problems; ethical concerns and dilemmas in government and private institutions; laws, rules, regulations and conscience as sources of ethical guidance; accountability and ethical governance; strengthening of ethical and moral values in governance; corporate governance.',
                    officialWordingGu: 'ભારત અને વિશ્વના નૈતિક ચિંતકો અને દાર્શનિકોનું યોગદાન. જાહેર વહીવટમાં નીતિશાસ્ત્ર; નિયમો, કાયદાઓ અને અંતરાત્માનો અવાજ; નૈતિક માર્ગદર્શનના સ્ત્રોતો; શાસનમાં નૈતિક મૂલ્યોનું સંવર્ધન; કોર્પોરેટ ગવર્નન્સ.',
                    sankalpExplanationEn: 'Aspirants must apply ethical theories directly to administrative problems. Use Kant’s Categorical Imperative to explain why corruption cannot be justified under any circumstances, and cite Gandhi’s Talisman for welfare decisions.',
                    sankalpExplanationGu: 'સિદ્ધાંતોને સીધા વહીવટી નિર્ણયો સાથે જોડવા જરૂરી છે. કોઈપણ નિર્ણય લેતી વખતે સમાજના છેવાડાના ગરીબ વ્યક્તિ પર શું અસર થશે (ગાંધીજીનું જંતર) તે દર્શાવવું.',
                    keySubtopicsEn: [
                      'Immanuel Kant Categorical Imperative vs Bentham/Mill Utilitarianism',
                      'Mahatma Gandhi: Seven Social Sins and doctrine of Trusteeship',
                      'John Rawls Theory of Justice: Veil of Ignorance application to affirmative action',
                      'Conflict of Interest management in government procurement and contracts'
                    ],
                    keySubtopicsGu: [
                      'ઇમેન્યુઅલ કાન્ટનો કર્તવ્યવાદ વિરુદ્ધ બેન્થામનો ઉપયોગિતાવાદ',
                      'મહાત્મા ગાંધીના ૭ સામાજિક પાપો અને ટ્રસ્ટીશીપનો સિદ્ધાંત',
                      'જ્હોન રોલ્સનો ન્યાયનો સિદ્ધાંત (અજ્ઞાનતાનો પડદો)',
                      'સરકારી કોન્ટ્રાક્ટ્સ અને ખરીદીમાં હિતોનો ટકરાવ (Conflict of Interest)'
                    ],
                    importance: 'Essential',
                    examFrequency: 'Every Mains Examination (125 Marks Theory + 125 Marks Case Studies)',
                    linkedPracticeTag: 'mains',
                    recommendedReadings: [
                      { title: 'Justice: What’s the Right Thing to Do?', source: 'Michael J. Sandel', isGovtFree: false },
                      { title: 'Ethics in Governance (2nd ARC 4th Report)', source: 'Government of India', isGovtFree: true }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};

/**
 * ---------------------------------------------------------------------------------
 * DATABASE REPOSITORY METHODS & HELPER APIS
 * (Allows administrators to retrieve and register new examinations seamlessly)
 * ---------------------------------------------------------------------------------
 */

export function getAllRegisteredExams(): ExamSyllabusRecord[] {
  return Object.values(SANKALP_EXAM_DATABASE);
}

export function getExamById(examId: string): ExamSyllabusRecord | undefined {
  return SANKALP_EXAM_DATABASE[examId];
}

export function getPapersForExamStage(examId: string, stage: ExamStageId) {
  const exam = getExamById(examId);
  if (!exam) return [];
  return stage === 'prelims' ? exam.prelimsPapers : exam.mainsPapers;
}

export function getAllTopicsForExamStage(examId: string, stage: ExamStageId): SyllabusTopic[] {
  const papers = getPapersForExamStage(examId, stage);
  const topics: SyllabusTopic[] = [];

  for (const paper of papers) {
    for (const subject of paper.subjects) {
      for (const chapter of subject.chapters) {
        for (const topic of chapter.topics) {
          topics.push(topic);
        }
      }
    }
  }

  return topics;
}

export function getSubjectStats(
  subject: SyllabusSubject, 
  studentStatuses: Record<string, TopicProgressStatus>
) {
  let total = 0;
  let completed = 0;
  let inProgress = 0;
  let notStarted = 0;

  for (const ch of subject.chapters) {
    for (const top of ch.topics) {
      total++;
      const st = studentStatuses[top.id] || 'not_started';
      if (st === 'completed') completed++;
      else if (st === 'in_progress') inProgress++;
      else notStarted++;
    }
  }

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { total, completed, inProgress, notStarted, percent };
}

export function getExamStageStats(
  examId: string,
  stage: ExamStageId,
  studentStatuses: Record<string, TopicProgressStatus>
) {
  const allTopics = getAllTopicsForExamStage(examId, stage);
  const total = allTopics.length;
  let completed = 0;
  let inProgress = 0;
  let notStarted = 0;

  for (const t of allTopics) {
    const st = studentStatuses[t.id] || 'not_started';
    if (st === 'completed') completed++;
    else if (st === 'in_progress') inProgress++;
    else notStarted++;
  }

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { total, completed, inProgress, notStarted, percent };
}
