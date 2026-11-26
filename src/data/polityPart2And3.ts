import type { PolityChapterContent } from '@/data/sankalpIndianPolityBook';

export const POLITY_PART2_AND_3_CHAPTERS: PolityChapterContent[] = [
  // ===========================================================================
  // PART II: SYSTEM OF GOVERNMENT (CHAPTERS 12-16)
  // ===========================================================================
  {
    id: 'polity-ch-12',
    chapterNumber: 12,
    partNumber: 2,
    partTitleEn: 'Part II: System of Government',
    partTitleGu: 'ભાગ ૨: શાસન પ્રણાલી',
    titleEn: '12. Parliamentary System',
    titleGu: '૧૨. સંસદીય શાસન પ્રણાલી',
    readingTimeMinutes: 10,
    status: 'published',
    examFocusEn:
      'Prelims & Mains: Articles 74–75 (Centre) & 163–164 (States), Collective Responsibility, Parliamentary vs Presidential system, and Swaran Singh Committee rejection of Presidential shift.',
    examFocusGu:
      'પ્રિલિમ્સ અને મેઈન્સ: અનુચ્છેદ ૭૪–૭૫ અને ૧૬૩–૧૬૪, સામૂહિક જવાબદારી, સંસદીય vs પ્રમુખશાહી પ્રણાલી.',
    sections: [
      {
        id: 'polity-ch-12-s1',
        headingEn: '12.1 Features of Parliamentary Government & Comparison with Presidential System',
        headingGu: '૧૨.૧ સંસદીય શાસનની વિશેષતાઓ અને પ્રમુખશાહી પ્રણાલી સાથે તુલના',
        simpleExplanationEn:
          'In a Parliamentary system (Cabinet/Westminster model), the Executive (PM & Ministers) is drawn from and stays accountable to the Legislature (Parliament). Unlike the US Presidential system where the President has a fixed 4-year term and is separate from Congress, an Indian Prime Minister stays in office only as long as the Council of Ministers enjoys majority support in the Lok Sabha.',
        simpleExplanationGu:
          'સંસદીય પ્રણાલીમાં કારોબારી (વડાપ્રધાન અને મંત્રીઓ) ધારાસભા (સંસદ) માંથી જ બને છે અને સંસદને જવાબદાર રહે છે. અમેરિકાની પ્રમુખશાહી પ્રણાલીથી વિપરીત, ભારતમાં સરકાર લોકસભાનો વિશ્વાસ હોય ત્યાં સુધી જ સત્તા પર રહે છે.',
        importantPointsEn: [
          'Constitutional Basis: Articles 74–75 (Centre) and Articles 163–164 (States).',
          'Key Features: Nominal (President) vs Real Executive (PM); Majority Party Rule; Collective Responsibility (Art. 75(3) to Lok Sabha); Double Membership (Ministers are MPs); Leadership of PM; Dissolution of Lok Sabha; Secrecy of procedure.',
          'Why India chose Parliamentary System (K.M. Munshi / Ambedkar): Familiarity from 1919/1935 Acts, preference for daily accountability over stability, and representation of India’s vast diversity.',
        ],
        importantPointsGu: [
          'બંધારણીય આધાર: અનુચ્છેદ ૭૪–૭૫ (કેન્દ્ર) અને ૧૬૩–૧૬૪ (રાજ્ય).',
          'મુખ્ય લક્ષણો: નામમાત્રના વડા (રાષ્ટ્રપતિ) અને વાસ્તવિક વડા (PM); બહુમતી પક્ષનું શાસન; લોકસભા પ્રત્યે સામૂહિક જવાબદારી (અનુ. ૭૫(૩)); લોકસભાનું વિસર્જન.',
          'શા માટે અપનાવી: ૧૯૧૯/૧૯૩૫ ના કાયદાઓનો અનુભવ, સ્થિરતા કરતાં જવાબદારીને પ્રાધાન્ય, અને વિવિધતાનું પ્રતિનિધિત્વ.',
        ],
        realLifeExampleEn:
          'When a No-Confidence Motion is passed in the Lok Sabha, the entire Council of Ministers—including ministers from Rajya Sabha—must resign together ("swim and sink together").',
        realLifeExampleGu:
          'લોકસભામાં અવિશ્વાસ પ્રસ્તાવ પસાર થાય ત્યારે સમગ્ર મંત્રી પરિષદે (રાજ્યસભાના મંત્રીઓ સહિત) એકસાથે રાજીનામું આપવું પડે છે.',
        keyTerms: ['Articles 74–75', 'Collective Responsibility', 'Westminster Model'],
      },
    ],
    comparisonTable: {
      titleEn: 'Parliamentary (India) vs Presidential (USA) System',
      titleGu: 'સંસદીય (ભારત) vs પ્રમુખશાહી (અમેરિકા) પ્રણાલી',
      headersEn: ['Basis', 'Parliamentary System', 'Presidential System'],
      headersGu: ['આધાર', 'સંસદીય પ્રણાલી', 'પ્રમુખશાહી પ્રણાલી'],
      rowsEn: [
        ['Executive', 'Dual (President nominal, PM real)', 'Single (President is Head of State & Govt)'],
        ['Accountability', 'Ministers accountable to Lok Sabha', 'President & Secretaries NOT accountable to Congress'],
        ['Tenure', 'Depends on majority in Lower House', 'Fixed 4-year term; Lower House cannot be dissolved'],
        ['Separation of Powers', 'Fusion of Executive & Legislature', 'Strict separation of powers'],
      ],
      rowsGu: [
        ['કારોબારી', 'બેવડી (રાષ્ટ્રપતિ નામમાત્ર, PM વાસ્તવિક)', 'એક જ (રાષ્ટ્રપતિ જ દેશ અને સરકારના વડા)'],
        ['જવાબદારી', 'મંત્રીઓ લોકસભાને જવાબદાર', 'રાષ્ટ્રપતિ સંસદ (કોંગ્રેસ) ને જવાબદાર નથી'],
        ['કાર્યકાળ', 'નીચલા ગૃહની બહુમતી પર આધારિત', 'નિશ્ચિત ૪ વર્ષ; નીચલું ગૃહ ભંગ થતું નથી'],
        ['સત્તા વિભાજન', 'કારોબારી અને ધારાસભા જોડાયેલા', 'સત્તાઓનું સ્પષ્ટ વિભાજન'],
      ],
    },
    summaryPointsEn: [
      'Art. 74–75 (Centre) & 163–164 (States): Collective responsibility is the bedrock of Parliamentary democracy.',
      'India preferred responsibility over rigid stability.',
    ],
    summaryPointsGu: [
      'અનુ. ૭૪–૭૫ અને ૧૬૩–૧૬૪: સામૂહિક જવાબદારી સંસદીય લોકશાહીનો પાયો છે.',
    ],
  },

  {
    id: 'polity-ch-13',
    chapterNumber: 13,
    partNumber: 2,
    partTitleEn: 'Part II: System of Government',
    partTitleGu: 'ભાગ ૨: શાસન પ્રણાલી',
    titleEn: '13. Federal System',
    titleGu: '૧૩. સંઘીય શાસન વ્યવસ્થા',
    readingTimeMinutes: 9,
    status: 'published',
    examFocusEn:
      'Prelims & Mains: Federal features vs Unitary features of India, and S.R. Bommai (1994) holding Federalism as Basic Structure.',
    examFocusGu:
      'પ્રિલિમ્સ અને મેઈન્સ: સંઘીય લક્ષણો vs એકાત્મક લક્ષણો, અને એસ.આર. બોમ્માઈ કેસ (૧૯૯૪).',
    sections: [
      {
        id: 'polity-ch-13-s1',
        headingEn: '13.1 Federal vs. Unitary Features of the Indian Constitution',
        headingGu: '૧૩.૧ ભારતીય બંધારણના સંઘીય અને એકાત્મક લક્ષણો',
        simpleExplanationEn:
          'A pure federation (like the USA) divides power equally between the Centre and States. India is federal in normal times—with two governments, a written Constitution, 7th Schedule power division, and an independent Supreme Court—but has a strong Centre (unitary bias) to protect national unity during crises.',
        simpleExplanationGu:
          'અમેરિકા શુદ્ધ સંઘીય છે, જ્યારે ભારત સામાન્ય સમયમાં સંઘીય છે (બે સરકારો, ૭મી અનુસૂચિમાં સત્તા વિભાજન, સ્વતંત્ર સુપ્રીમ કોર્ટ), પરંતુ દેશની એકતા જાળવવા કેન્દ્રને વધુ મજબૂત બનાવવામાં આવ્યું છે.',
        importantPointsEn: [
          'Federal Features: Dual Polity (Centre + States), Written Constitution, Division of Powers (7th Schedule), Supremacy of Constitution, Rigid Constitution (Art. 368 for federal provisions), Independent Judiciary, Bicameralism (Rajya Sabha represents states).',
          'Unitary Features: Strong Centre (more subjects & residuary powers Art. 248), States not indestructible (Art. 3), Single Constitution, Single Citizenship, Integrated Judiciary, All-India Services (IAS, IPS, IFoS under Art. 312), Governor appointed by Centre, Emergency Provisions, Veto over State Bills (Art. 201).',
          'S.R. Bommai Case (1994): SC declared Federalism is part of the Basic Structure of the Constitution.',
        ],
        importantPointsGu: [
          'સંઘીય લક્ષણો: બેવડું શાસન, લેખિત બંધારણ, સત્તાનું વિભાજન (૭મી અનુસૂચિ), બંધારણની સર્વોપરિતા, સ્વતંત્ર ન્યાયતંત્ર, દ્વિગૃહી સંસદ (રાજ્યસભા).',
          'એકાત્મક લક્ષણો: મજબૂત કેન્દ્ર (અવશિષ્ટ સત્તાઓ અનુ. ૨૪૮), એક બંધારણ, એકલ નાગરિકતા, એકીકૃત ન્યાયતંત્ર, અખિલ ભારતીય સેવાઓ (અનુ. ૩૧૨), કેન્દ્ર દ્વારા રાજ્યપાલની નિમણૂક, કટોકટીની જોગવાઈઓ.',
          'એસ.આર. બોમ્માઈ કેસ (૧૯૯૪): સુપ્રીમ કોર્ટે સંઘવાદને "મૂળભૂત માળખા" નો ભાગ જાહેર કર્યો.',
        ],
        realLifeExampleEn:
          'An IAS officer in Gujarat is recruited and trained by the Union (UPSC/DoPT) yet serves under the Gujarat State Government—an All-India Service mechanism unique to India’s cooperative federalism.',
        realLifeExampleGu:
          'ગુજરાતમાં ફરજ બજાવતા IAS અધિકારીની પસંદગી કેન્દ્ર (UPSC) દ્વારા થાય છે પરંતુ તેઓ રાજ્ય સરકાર હેઠળ કામ કરે છે—જે ભારતના સહકારી સંઘવાદનું અનોખું ઉદાહરણ છે.',
        keyTerms: ['7th Schedule', 'Art. 248 Residuary Powers', 'Art. 312 All-India Services', 'S.R. Bommai (1994)'],
      },
    ],
    summaryPointsEn: [
      'Federalism is part of Basic Structure (S.R. Bommai, 1994); India combines federal structure with a strong Centre.',
    ],
    summaryPointsGu: [
      'એસ.આર. બોમ્માઈ (૧૯૯૪): સંઘવાદ મૂળભૂત માળખું છે; ભારતમાં મજબૂત કેન્દ્ર સાથેનું સંઘીય માળખું છે.',
    ],
  },

  {
    id: 'polity-ch-14',
    chapterNumber: 14,
    partNumber: 2,
    partTitleEn: 'Part II: System of Government',
    partTitleGu: 'ભાગ ૨: શાસન પ્રણાલી',
    titleEn: '14. Centre–State Relations',
    titleGu: '૧૪. કેન્દ્ર–રાજ્ય સંબંધો',
    readingTimeMinutes: 14,
    status: 'published',
    examFocusEn:
      'High-yield for Mains & Prelims: Legislative (Art. 245–255, 7th Schedule), Administrative (256–263), Financial (268–293, GST Council Art. 279A), and Sarkaria (1983) + Punchhi (2007) Commissions.',
    examFocusGu:
      'મેઈન્સ અને પ્રિલિમ્સ: વિધાયી (૨૪૫–૨૫૫), વહીવટી (૨૫૬–૨૬૩), નાણાકીય (૨૬૮–૨૯૩, GST કાઉન્સિલ ૨૭૯A), સરકારિયા (૧૯૮૩) અને પુંછી (૨૦૦૭) આયોગ.',
    sections: [
      {
        id: 'polity-ch-14-s1',
        headingEn: '14.1 Legislative, Administrative & Financial Relations + Commissions',
        headingGu: '૧૪.૧ વિધાયી, વહીવટી, નાણાકીય સંબંધો અને સુધારા આયોગો',
        simpleExplanationEn:
          'Centre–State relations work across three pillars: (1) Legislative (who makes laws—Union, State, Concurrent Lists), (2) Administrative (who enforces laws—Centre can issue directions under Art. 256–257), and (3) Financial (who collects & shares taxes—Finance Commission Art. 280 & GST Council Art. 279A).',
        simpleExplanationGu:
          'કેન્દ્ર–રાજ્ય સંબંધો ત્રણ સ્તંભ પર ટકેલા છે: (૧) વિધાયી (કાયદા કોણ બનાવે—૭મી અનુસૂચિ), (૨) વહીવટી (અનુ. ૨૫૬–૨૫૭), અને (૩) નાણાકીય (નાણા પંચ અનુ. ૨૮૦ અને GST કાઉન્સિલ અનુ. ૨૭૯A).',
        importantPointsEn: [
          'Legislative Relations (Part XI, Art. 245–255): 7th Schedule — Union List (100 subjects, originally 97), State List (61, originally 66), Concurrent List (52, originally 47 — 42nd Amendment 1976 shifted 5 subjects: Education, Forests, Weights & Measures, Protection of Wild Animals & Birds, Administration of Justice). Residuary powers with Parliament (Art. 248).',
          'When Parliament Can Legislate on State List: Art. 249 (Rajya Sabha resolution by 2/3rd present & voting), Art. 250 (National Emergency), Art. 252 (two or more states request), Art. 253 (international treaties), Art. 356 (President’s Rule).',
          'Financial Relations (Part XII, Art. 268–293): GST Council (Art. 279A, 101st Amendment 2016 — chaired by Union Finance Minister; Centre 1/3rd weightage, States 2/3rd weightage, 3/4th majority needed); Finance Commission (Art. 280); Grants-in-aid (Art. 275 statutory, Art. 282 discretionary).',
          'Key Commissions: First ARC (1966), Rajamannar Committee (1969, Tamil Nadu), Sarkaria Commission (1983–88 — recommended permanent Inter-State Council), Punchhi Commission (2007–10 — recommended fixed 5-year tenure & impeachment-like removal for Governors).',
        ],
        importantPointsGu: [
          'વિધાયી સંબંધો (ભાગ ૧૧, અનુ. ૨૪૫–૨૫૫): સંઘ યાદી (૧૦૦), રાજ્ય યાદી (૬૧), સમવર્તી યાદી (૫૨ — ૪૨મા સુધારા ૧૯૭૬ થી શિક્ષણ, જંગલ વગેરે ૫ વિષયો રાજ્યમાંથી સમવર્તી યાદીમાં મુકાયા). અવશિષ્ટ સત્તા સંસદ પાસે (અનુ. ૨૪૮).',
          'રાજ્ય યાદી પર સંસદના કાયદા: અનુ. ૨૪૯ (રાજ્યસભા ૨/૩ ઠરાવ), ૨૫૦ (રાષ્ટ્રીય કટોકટી), ૨૫૨ (બે કે વધુ રાજ્યોની વિનંતી), ૨૫૩ (આંતરરાષ્ટ્રીય સંધિ), ૩૫૬ (રાષ્ટ્રપતિ શાસન).',
          'નાણાકીય સંબંધો: GST કાઉન્સિલ (અનુ. ૨૭૯A, ૧૦૧મો સુધારો — કેન્દ્રીય નાણામંત્રી અધ્યક્ષ, કેન્દ્રનો ૧/૩ અને રાજ્યોનો ૨/૩ મતભાર); નાણા પંચ (અનુ. ૨૮૦).',
          'મુખ્ય આયોગો: રાજમન્નાર સમિતિ (૧૯૬૯), સરકારિયા આયોગ (૧૯૮૩), પુંછી આયોગ (૨૦૦૭).',
        ],
        realLifeExampleEn:
          'Education is in the Concurrent List (moved in 1976), which is why both the Union (NEP 2020 / RTE) and States (Gujarat Board / GCERT) make education policies—with Central law prevailing in case of direct conflict (Art. 254).',
        realLifeExampleGu:
          'શિક્ષણ સમવર્તી યાદીમાં હોવાથી કેન્દ્ર (NEP 2020) અને ગુજરાત સરકાર (GCERT) બંને નીતિઓ બનાવી શકે છે—જો ટકરાવ થાય તો અનુચ્છેદ ૨૫૪ મુજબ કેન્દ્રનો કાયદો માન્ય રહે છે.',
        keyTerms: ['Art. 249 (Rajya Sabha)', '42nd Amend (5 Subjects)', 'GST Council Art. 279A', 'Sarkaria & Punchhi'],
      },
    ],
    summaryPointsEn: [
      '42nd Amendment (1976) moved 5 subjects (incl. Education, Forests) from State to Concurrent List.',
      'Parliament legislates on State List under Art. 249, 250, 252, 253, 356.',
      'GST Council (Art. 279A): 1/3rd Centre + 2/3rd States voting weight; 3/4th majority required.',
    ],
    summaryPointsGu: [
      '૪૨મો સુધારો (૧૯૭૬): શિક્ષણ, જંગલ સહિત ૫ વિષયો સમવર્તી યાદીમાં.',
      'GST કાઉન્સિલ (અનુ. ૨૭૯A): કેન્દ્ર ૧/૩ અને રાજ્યો ૨/૩ મતભાર; ૩/૪ બહુમતી જરૂરી.',
    ],
  },

  {
    id: 'polity-ch-15',
    chapterNumber: 15,
    partNumber: 2,
    partTitleEn: 'Part II: System of Government',
    partTitleGu: 'ભાગ ૨: શાસન પ્રણાલી',
    titleEn: '15. Inter-State Relations',
    titleGu: '૧૫. આંતર-રાજ્ય સંબંધો',
    readingTimeMinutes: 8,
    status: 'published',
    examFocusEn:
      'Prelims favourite: Art. 262 (Inter-State Water Disputes), Art. 263 (Inter-State Council, 1990), and Zonal Councils (statutory under States Reorganisation Act 1956, chaired by Union Home Minister).',
    examFocusGu:
      'પ્રિલિમ્સ માટે: અનુચ્છેદ ૨૬૨ (નદી જળ વિવાદ), અનુચ્છેદ ૨૬૩ (આંતર-રાજ્ય પરિષદ, ૧૯૯૦), અને પ્રાદેશિક પરિષદો (Zonal Councils — ગૃહમંત્રી અધ્યક્ષ).',
    sections: [
      {
        id: 'polity-ch-15-s1',
        headingEn: '15.1 Water Disputes (Art. 262), Inter-State Council (Art. 263) & Zonal Councils',
        headingGu: '૧૫.૧ જળ વિવાદ (અનુ. ૨૬૨), આંતર-રાજ્ય પરિષદ (અનુ. ૨૬૩) અને પ્રાદેશિક પરિષદો',
        simpleExplanationEn:
          'States share rivers, highways, and borders—so disputes happen. The Constitution provides special mechanisms to resolve them smoothly: Article 262 allows Parliament to bar Supreme Court jurisdiction over river water disputes via tribunals, Article 263 sets up the Inter-State Council (chaired by PM), and the 1956 Act created Zonal Councils (chaired by the Union Home Minister) for regional cooperation.',
        simpleExplanationGu:
          'રાજ્યો વચ્ચે નદીના પાણી, સરહદ કે વેપારના પ્રશ્નો ઉકેલવા બંધારણમાં ખાસ વ્યવસ્થા છે: અનુચ્છેદ ૨૬૨ (નદી જળ વિવાદ ટ્રિબ્યુનલ), અનુચ્છેદ ૨૬૩ (આંતર-રાજ્ય પરિષદ — અધ્યક્ષ: વડાપ્રધાન), અને ૧૯૫૬ ના કાયદા હેઠળ પ્રાદેશિક પરિષદો (અધ્યક્ષ: કેન્દ્રીય ગૃહમંત્રી).',
        importantPointsEn: [
          'Article 262: Parliament may provide for adjudication of inter-state river water disputes and bar Supreme Court jurisdiction (Inter-State Water Disputes Act, 1956 & River Boards Act, 1956).',
          'Article 263 (Inter-State Council): Established in 1990 (V.P. Singh Govt) on Sarkaria Commission’s recommendation; chaired by Prime Minister (all CMs + UT Administrators + 6 Union Cabinet Ministers).',
          'Zonal Councils: STATUTORY bodies (NOT constitutional) created by States Reorganisation Act, 1956 (5 Zonal Councils: Northern, Central, Eastern, Western — includes Gujarat, Southern) + North-Eastern Council (1971 Act). Chaired by Union Home Minister.',
          'Articles 301–307: Freedom of trade, commerce and intercourse throughout India.',
        ],
        importantPointsGu: [
          'અનુચ્છેદ ૨૬૨: આંતર-રાજ્ય નદી જળ વિવાદ (સંસદ સુપ્રીમ કોર્ટના અધિકારક્ષેત્રને પણ અટકાવી શકે છે; ૧૯૫૬ નો કાયદો).',
          'અનુચ્છેદ ૨૬૩ (આંતર-રાજ્ય પરિષદ): ૧૯૯૦ માં સરકારિયા આયોગની ભલામણથી સ્થાપના; અધ્યક્ષ = વડાપ્રધાન.',
          'પ્રાદેશિક પરિષદો (Zonal Councils): વૈધાનિક સંસ્થા (બંધારણીય નહીં) — ૧૯૫૬ ના કાયદાથી ૫ પરિષદો (ગુજરાત પશ્ચિમ પરિષદમાં) + ૧૯૭૧ થી ઉત્તર-પૂર્વ પરિષદ. અધ્યક્ષ = કેન્દ્રીય ગૃહમંત્રી.',
        ],
        realLifeExampleEn:
          'Gujarat belongs to the Western Zonal Council (along with Maharashtra, Goa, and Dadra & Nagar Haveli and Daman & Diu), and the Narmada Water Disputes Tribunal was set up under the 1956 Act backed by Article 262.',
        realLifeExampleGu:
          'ગુજરાત "પશ્ચિમ પ્રાદેશિક પરિષદ" (Western Zonal Council) નો ભાગ છે, અને નર્મદા જળ વિવાદ ટ્રિબ્યુનલની રચના અનુચ્છેદ ૨૬૨ હેઠળના કાયદાથી થઈ હતી.',
        keyTerms: ['Art. 262 Water Disputes', 'Art. 263 Inter-State Council', 'Zonal Councils (Home Minister)'],
      },
    ],
    summaryPointsEn: [
      'Inter-State Council (Art. 263): Constitutional, chaired by PM. Zonal Councils (1956 Act): Statutory, chaired by Union Home Minister.',
    ],
    summaryPointsGu: [
      'આંતર-રાજ્ય પરિષદ (અનુ. ૨૬૩): બંધારણીય, અધ્યક્ષ = PM. પ્રાદેશિક પરિષદ (૧૯૫૬): વૈધાનિક, અધ્યક્ષ = ગૃહમંત્રી.',
    ],
  },

  {
    id: 'polity-ch-16',
    chapterNumber: 16,
    partNumber: 2,
    partTitleEn: 'Part II: System of Government',
    partTitleGu: 'ભાગ ૨: શાસન પ્રણાલી',
    titleEn: '16. Emergency Provisions (Articles 352–360)',
    titleGu: '૧૬. કટોકટીની જોગવાઈઓ (અનુચ્છેદ ૩૫૨–૩૬૦)',
    readingTimeMinutes: 13,
    status: 'published',
    examFocusEn:
      'Must-know Prelims comparison: Art. 352 (National), Art. 356 (President’s Rule), Art. 360 (Financial) — approval timelines (1 month vs 2 months), majority type, effect on Art. 19/20/21, and 44th Amendment (1978).',
    examFocusGu:
      'પ્રિલિમ્સ માટે ખાસ: અનુ. ૩૫૨ (રાષ્ટ્રીય), ૩૫૬ (રાષ્ટ્રપતિ શાસન), ૩૬૦ (નાણાકીય) — મંજૂરી સમયમર્યાદા (૧ vs ૨ મહિના), બહુમતી, અનુ. ૧૯/૨૦/૨૧ પર અસર, અને ૪૪મો સુધારો (૧૯૭૮).',
    sections: [
      {
        id: 'polity-ch-16-s1',
        headingEn: '16.1 Three Types of Emergencies & 44th Amendment Safeguards',
        headingGu: '૧૬.૧ કટોકટીના ત્રણ પ્રકાર અને ૪૪મા સુધારાના રક્ષણાત્મક નિયમો',
        simpleExplanationEn:
          'Part XVIII (Articles 352–360) lets the Centre temporarily assume extraordinary powers during severe national crises: (1) National Emergency (war, external aggression, armed rebellion), (2) President’s Rule (failure of constitutional machinery in a state), and (3) Financial Emergency. After the 1975–77 Emergency, the 44th Amendment (1978) added strict safeguards so Emergency powers cannot be misused easily.',
        simpleExplanationGu:
          'ભાગ ૧૮ (અનુચ્છેદ ૩૫૨–૩૬૦) ગંભીર સંકટ સમયે કટોકટીની ૩ જોગવાઈ આપે છે: (૧) રાષ્ટ્રીય કટોકટી, (૨) રાષ્ટ્રપતિ શાસન, અને (૩) નાણાકીય કટોકટી. ૧૯૭૫ ની કટોકટી બાદ ૪૪મા સુધારા (૧૯૭૮) થી દુરુપયોગ રોકવા કડક નિયમો ઉમેરાયા.',
        importantPointsEn: [
          'Article 352 (National Emergency): Grounds — War, External Aggression, or "Armed Rebellion" (44th Amendment 1978 replaced "internal disturbance"). Needs written recommendation of Cabinet; Parliamentary approval within 1 MONTH by Special Majority; continues 6 months at a time (indefinitely). Proclaimed 3 times: 1962, 1971, 1975.',
          'Effect on FRs: Art. 358 automatically suspends Art. 19 ONLY on war/external aggression (NOT armed rebellion). Art. 359 suspends enforcement of other FRs EXCEPT Art. 20 & 21 (44th Amendment).',
          'Article 356 (President’s Rule / State Emergency): Parliamentary approval within 2 MONTHS by Simple Majority; max 3 years (beyond 1 year requires National Emergency or ECI certificate). S.R. Bommai (1994): Subject to Judicial Review.',
          'Article 360 (Financial Emergency): Parliamentary approval within 2 MONTHS by Simple Majority; continues indefinitely once approved; NEVER declared in India so far.',
        ],
        importantPointsGu: [
          'અનુચ્છેદ ૩૫૨ (રાષ્ટ્રીય કટોકટી): યુદ્ધ, બાહ્ય આક્રમણ કે "સશસ્ત્ર બળવો" (૪૪મા સુધારાથી "આંતરિક અશાંતિ" બદલાયું). કેબિનેટની લેખિત ભલામણ જરૂરી; ૧ મહિનામાં વિશેષ બહુમતીથી મંજૂરી. ભારતમાં ૩ વાર લાગુ (૧૯૬૨, ૧૯૭૧, ૧૯૭૫).',
          'મૂળભૂત અધિકારો પર અસર: અનુ. ૩૫૮ હેઠળ અનુ. ૧૯ માત્ર યુદ્ધ/બાહ્ય આક્રમણમાં જ મોકૂફ થાય (સશસ્ત્ર બળવામાં નહીં). અનુ. ૩૫૯ હેઠળ પણ અનુ. ૨૦ અને ૨૧ મોકૂફ થતા નથી.',
          'અનુચ્છેદ ૩૫૬ (રાષ્ટ્રપતિ શાસન): ૨ મહિનામાં સાદી બહુમતીથી મંજૂરી; મહત્તમ ૩ વર્ષ. એસ.આર. બોમ્માઈ કેસ (૧૯૯૪): ન્યાયિક સમીક્ષાને પાત્ર.',
          'અનુચ્છેદ ૩૬૦ (નાણાકીય કટોકટી): ૨ મહિનામાં સાદી બહુમતીથી મંજૂરી; ભારતમાં આજ સુધી ક્યારેય લાગુ થઈ નથી.',
        ],
        realLifeExampleEn:
          'Before 1978, a PM could advise the President alone to declare Emergency; after the 44th Amendment (1978), the President CANNOT declare National Emergency without the written recommendation of the entire Union Cabinet.',
        realLifeExampleGu:
          '૧૯૭૮ પહેલાં વડાપ્રધાન એકલાની સલાહથી કટોકટી જાહેર થઈ શકતી હતી; પરંતુ ૪૪મા સુધારા (૧૯૭૮) પછી સમગ્ર કેન્દ્રીય કેબિનેટની લેખિત ભલામણ ફરજિયાત છે.',
        keyTerms: ['Art. 352 (1 Month, Special)', 'Art. 356 (2 Months, Simple)', 'Art. 360 (Never Declared)', '44th Amendment'],
      },
    ],
    summaryPointsEn: [
      '352: 1 month, Special Majority, Cabinet written advice, Art. 20 & 21 never suspended.',
      '356: 2 months, Simple Majority, max 3 yrs. 360: 2 months, Simple Majority, never used.',
    ],
    summaryPointsGu: [
      '૩૫૨: ૧ મહિનો, વિશેષ બહુમતી; ૩૫૬ અને ૩૬૦: ૨ મહિના, સાદી બહુમતી.',
    ],
  },

  // ===========================================================================
  // PART III: CENTRAL GOVERNMENT (CHAPTERS 17-23)
  // ===========================================================================
  {
    id: 'polity-ch-17',
    chapterNumber: 17,
    partNumber: 3,
    partTitleEn: 'Part III: Central Government',
    partTitleGu: 'ભાગ ૩: કેન્દ્ર સરકાર',
    titleEn: '17. President of India',
    titleGu: '૧૭. ભારતના રાષ્ટ્રપતિ',
    readingTimeMinutes: 14,
    status: 'published',
    examFocusEn:
      'Top Prelims topic: Electoral College (Art. 54 — who votes vs who does NOT), Impeachment (Art. 61 — nominated MPs vote, MLAs do NOT), Veto powers (Art. 111), Ordinance (Art. 123), and Pardoning Power (Art. 72).',
    examFocusGu:
      'પ્રિલિમ્સ માટે અત્યંત મહત્વપૂર્ણ: મતદાર મંડળ (અનુ. ૫૪), મહાભિયોગ (અનુ. ૬૧ — કોણ ભાગ લે), વીટો સત્તા (અનુ. ૧૧૧), વટહુકમ (અનુ. ૧૨૩), અને માફીની સત્તા (અનુ. ૭૨).',
    sections: [
      {
        id: 'polity-ch-17-s1',
        headingEn: '17.1 Election (Art. 54–55), Impeachment (Art. 61) & Key Powers (Art. 72, 111, 123)',
        headingGu: '૧૭.૧ ચૂંટણી (૫૪–૫૫), મહાભિયોગ (૬૧) અને મુખ્ય સત્તાઓ (૭૨, ૧૧૧, ૧૨૩)',
        simpleExplanationEn:
          'The President (Part V, Articles 52–78) is India’s Head of State and First Citizen. They are elected indirectly by an Electoral College of elected MPs and elected MLAs (never nominated members). Under Article 74, the President normally acts on the aid and advice of the Council of Ministers, though they hold crucial constitutional powers like Veto, Ordinances (when Parliament is not in session), and Pardoning powers.',
        simpleExplanationGu:
          'રાષ્ટ્રપતિ (ભાગ ૫, અનુ. ૫૨–૭૮) દેશના પ્રથમ નાગરિક અને બંધારણીય વડા છે. તેમની ચૂંટણી ચૂંટાયેલા સાંસદો અને ચૂંટાયેલા ધારાસભ્યો દ્વારા પરોક્ષ રીતે થાય છે (નિયુક્ત સભ્યો મત આપતા નથી). અનુ. ૭૪ મુજબ તેઓ મંત્રી પરિષદની સલાહથી કાર્ય કરે છે.',
        importantPointsEn: [
          'Electoral College (Art. 54): ONLY Elected MPs (LS + RS) + Elected MLAs of States + Elected MLAs of Delhi & Puducherry (70th Amendment, 1992). Nominated MPs/MLAs and MLCs do NOT vote.',
          'Qualifications (Art. 58): Indian citizen, 35+ years, qualified for Lok Sabha election, no office of profit.',
          'Impeachment (Art. 61): Only ground = "Violation of the Constitution"; initiated in EITHER House (1/4th members sign + 14 days notice); passed by 2/3rd of TOTAL membership of each House. Nominated MPs participate in impeachment, while State MLAs do NOT.',
          'Veto Powers (Art. 111): Absolute Veto, Suspensive Veto (cannot be used on Money Bill; overridden by ordinary majority if returned once), Pocket Veto (no time limit in India, e.g., Zail Singh on Indian Post Office Bill 1986).',
          'Ordinance Power (Art. 123): Issued when either or both Houses are not in session; must be approved within 6 weeks of Parliament reassembly (max life = 6 months + 6 weeks).',
          'Pardoning Power (Art. 72): Pardon, Commutation, Remission, Respite, Reprieve — covers Union laws, Court Martial, AND Death Sentences (Governor under Art. 161 CANNOT pardon death sentence or court martial).',
        ],
        importantPointsGu: [
          'મતદાર મંડળ (અનુ. ૫૪): માત્ર ચૂંટાયેલા સાંસદો (LS + RS) અને રાજ્યો/દિલ્હી/પુડુચેરીના ચૂંટાયેલા ધારાસભ્યો (MLAs). નિયુક્ત સભ્યો અને MLC મત આપતા નથી.',
          'મહાભિયોગ (અનુ. ૬૧): માત્ર "બંધારણનો ભંગ" ના આધારે; કોઈપણ ગૃહમાં શરૂ થઈ શકે (૧/૪ સભ્યોની સહી + ૧૪ દિવસની નોટિસ); બંને ગૃહોના કુલ સભ્યોના ૨/૩ બહુમતીથી પસાર. નિયુક્ત સાંસદો ભાગ લે છે, MLAs નહીં.',
          'વીટો સત્તા (અનુ. ૧૧૧): સંપૂર્ણ વીટો, નિલંબનકારી વીટો (નાણાં બિલ પર નહીં), પોકેટ વીટો (કોઈ સમયમર્યાદા નથી).',
          'વટહુકમ (અનુ. ૧૨૩): સંસદ સત્રમાં ન હોય ત્યારે; સંસદ મળ્યાના ૬ અઠવાડિયામાં મંજૂરી જરૂરી (મહત્તમ આયુષ્ય = ૬ મહિના + ૬ અઠવાડિયા).',
          'માફીની સત્તા (અનુ. ૭૨): મૃત્યુદંડ અને કોર્ટ માર્શલની સજા માફ કરવાની સત્તા માત્ર રાષ્ટ્રપતિને છે (રાજ્યપાલ અનુ. ૧૬૧ હેઠળ મૃત્યુદંડ માફ કરી શકતા નથી).',
        ],
        realLifeExampleEn:
          'Notice the contrast: Nominated Rajya Sabha MPs CANNOT vote in the President’s election (Art. 54), yet they CAN vote in the President’s impeachment (Art. 61). State MLAs vote in the election, NOT in impeachment.',
        realLifeExampleGu:
          'ચૂંટણીમાં નિયુક્ત સાંસદો મત આપતા નથી પરંતુ મહાભિયોગમાં મત આપે છે; જ્યારે રાજ્યોના MLAs ચૂંટણીમાં મત આપે છે પરંતુ મહાભિયોગમાં ભાગ લેતા નથી.',
        keyTerms: ['Art. 54 Electoral College', 'Art. 61 Impeachment', 'Art. 123 Ordinance', 'Art. 72 Pardon'],
      },
    ],
    summaryPointsEn: [
      'Art. 54: Elected MPs + Elected MLAs only. Art. 61: 2/3rd of total strength of both Houses.',
      'Art. 123 Ordinance max life: 6 months + 6 weeks. Art. 72: President alone can pardon death sentences & court martial.',
    ],
    summaryPointsGu: [
      'અનુ. ૫૪: માત્ર ચૂંટાયેલા MPs + MLAs. અનુ. ૬૧: કુલ સભ્યસંખ્યાના ૨/૩ બહુમતી.',
      'અનુ. ૧૨૩ વટહુકમ: મહત્તમ ૬ મહિના + ૬ અઠવાડિયા. અનુ. ૭૨: મૃત્યુદંડ માત્ર રાષ્ટ્રપતિ માફ કરી શકે.',
    ],
  },

  {
    id: 'polity-ch-18',
    chapterNumber: 18,
    partNumber: 3,
    partTitleEn: 'Part III: Central Government',
    partTitleGu: 'ભાગ ૩: કેન્દ્ર સરકાર',
    titleEn: '18. Vice-President of India',
    titleGu: '૧૮. ભારતના ઉપરાષ્ટ્રપતિ',
    readingTimeMinutes: 7,
    status: 'published',
    examFocusEn:
      'Prelims comparison with President: Both elected & nominated MPs vote (NO MLAs), Ex-officio Chairman of Rajya Sabha (Art. 64), and removal by Rajya Sabha effective majority + Lok Sabha simple majority.',
    examFocusGu:
      'રાષ્ટ્રપતિ સાથે તુલના: ચૂંટાયેલા અને નિયુક્ત બંને સાંસદો મત આપે છે (MLAs નહીં), રાજ્યસભાના હોદ્દાની રૂએ સભાપતિ (અનુ. ૬૪).',
    sections: [
      {
        id: 'polity-ch-18-s1',
        headingEn: '18.1 Election, Removal & Role as Rajya Sabha Chairman (Art. 63–71)',
        headingGu: '૧૮.૧ ચૂંટણી, પદમુક્તિ અને રાજ્યસભાના સભાપતિ તરીકેની ભૂમિકા',
        simpleExplanationEn:
          'The Vice-President (Article 63) holds the second-highest office in India (inspired by the US Vice-President). Their main daily job is acting as the Ex-officio Chairman of the Rajya Sabha (Article 64), and stepping in as Acting President if the President’s office falls vacant (for max 6 months).',
        simpleExplanationGu:
          'ઉપરાષ્ટ્રપતિ (અનુચ્છેદ ૬૩) દેશનું બીજું સર્વોચ્ચ પદ છે. તેમનું મુખ્ય કાર્ય રાજ્યસભાના હોદ્દાની રૂએ સભાપતિ (અનુ. ૬૪) તરીકે કામ કરવાનું અને રાષ્ટ્રપતિનું પદ ખાલી પડે ત્યારે કાર્યકારી રાષ્ટ્રપતિ બનવાનું (મહત્તમ ૬ મહિના) છે.',
        importantPointsEn: [
          'Electoral College (Art. 66): BOTH Elected AND Nominated MPs (Lok Sabha + Rajya Sabha); State MLAs do NOT participate.',
          'Qualifications: Indian citizen, 35+ years, qualified for Rajya Sabha election.',
          'Removal (Art. 67(b)): No formal impeachment; resolution introduced ONLY in Rajya Sabha (14 days notice), passed by Effective Majority (majority of all then members) in Rajya Sabha and agreed to by Lok Sabha by Simple Majority.',
        ],
        importantPointsGu: [
          'મતદાર મંડળ (અનુ. ૬૬): સંસદના ચૂંટાયેલા અને નિયુક્ત બંને સભ્યો (MLAs ભાગ લેતા નથી).',
          'લાયકાત: ૩૫+ વર્ષ અને રાજ્યસભાના સભ્ય બનવાની લાયકાત.',
          'પદમુક્તિ (અનુ. ૬૭(b)): ઠરાવ માત્ર રાજ્યસભામાં જ રજૂ થઈ શકે (૧૪ દિવસની નોટિસ); રાજ્યસભાની તત્કાલીન બહુમતી (Effective Majority) અને લોકસભાની સાદી બહુમતીથી પસાર.',
        ],
        realLifeExampleEn:
          'The Vice-President receives salary in their capacity as Chairman of the Rajya Sabha, not as Vice-President.',
        realLifeExampleGu:
          'ઉપરાષ્ટ્રપતિને પગાર ઉપરાષ્ટ્રપતિ પદ માટે નહીં, પરંતુ રાજ્યસભાના સભાપતિ તરીકે મળે છે.',
        keyTerms: ['Art. 63–67', 'All MPs Vote', 'Ex-officio Chairman RS'],
      },
    ],
    summaryPointsEn: [
      'VP Election: All MPs (elected + nominated), no MLAs. Removal: Initiated ONLY in Rajya Sabha.',
    ],
    summaryPointsGu: [
      'ચૂંટણી: તમામ સાંસદો (MLAs નહીં). પદમુક્તિ: માત્ર રાજ્યસભામાં શરૂ થઈ શકે.',
    ],
  },

  {
    id: 'polity-ch-19',
    chapterNumber: 19,
    partNumber: 3,
    partTitleEn: 'Part III: Central Government',
    partTitleGu: 'ભાગ ૩: કેન્દ્ર સરકાર',
    titleEn: '19. Prime Minister & Central Council of Ministers',
    titleGu: '૧૯. વડાપ્રધાન અને કેન્દ્રીય મંત્રી પરિષદ',
    readingTimeMinutes: 10,
    status: 'published',
    examFocusEn:
      'Prelims & Mains: Art. 74 (advice binding after 42nd/44th Amendments), Art. 75 (91st Amendment 15% cap, 6-month non-MP rule), Art. 78 (PM duties), and Council of Ministers vs Cabinet.',
    examFocusGu:
      'પ્રિલિમ્સ અને મેઈન્સ: અનુ. ૭૪ (સલાહ બંધનકર્તા), અનુ. ૭૫ (૯૧મો સુધારો ૧૫% મર્યાદા), અનુ. ૭૮ (PM ની ફરજો), અને મંત્રી પરિષદ vs કેબિનેટ.',
    sections: [
      {
        id: 'polity-ch-19-s1',
        headingEn: '19.1 Articles 74, 75, 78 & 91st Amendment (15% Limit)',
        headingGu: '૧૯.૧ અનુચ્છેદ ૭૪, ૭૫, ૭૮ અને ૯૧મો સુધારો (૧૫% મર્યાદા)',
        simpleExplanationEn:
          'The President is the head of the state, while the Prime Minister is the head of the government. Under Article 74, the Council of Ministers headed by the PM aids and advises the President—and that advice is binding (the President can return it once for reconsideration under the 44th Amendment). A non-MP can become a minister, but must get elected to either House within 6 months.',
        simpleExplanationGu:
          'રાષ્ટ્રપતિ દેશના વડા છે, જ્યારે વડાપ્રધાન સરકારના વડા છે. અનુ. ૭૪ મુજબ PM ની આગેવાની હેઠળની મંત્રી પરિષદની સલાહ રાષ્ટ્રપતિ માટે બંધનકર્તા છે (૪૪મા સુધારા મુજબ ૧ વાર પુનર્વિચાર માટે પરત મોકલી શકે). સંસદના સભ્ય ન હોય તેવી વ્યક્તિ ૬ મહિના સુધી મંત્રી રહી શકે.',
        importantPointsEn: [
          'Article 74: Advice of Council of Ministers is binding on President (42nd Amendment 1976; 44th Amendment 1978 allowed sending back once).',
          'Article 75: PM appointed by President; other ministers appointed on PM’s advice; 91st Amendment Act (2003) capped total ministers (including PM) at 15% of total strength of Lok Sabha; Collective responsibility to Lok Sabha (75(3)); non-MP must become MP within 6 months (75(5)).',
          'Article 78: PM’s duty to communicate all Cabinet decisions and legislative proposals to the President.',
          'Council of Ministers (Art. 74/75 — 3 tiers: Cabinet, Ministers of State, Deputy Ministers) vs Cabinet (smaller core body; term "Cabinet" added only in Art. 352 by 44th Amendment 1978).',
        ],
        importantPointsGu: [
          'અનુચ્છેદ ૭૪: મંત્રી પરિષદની સલાહ બંધનકર્તા (૪૨મો સુધારો; ૪૪મા સુધારાથી ૧ વાર પુનર્વિચાર).',
          'અનુચ્છેદ ૭૫: ૯૧મો સુધારો (૨૦૦૩) — મંત્રી પરિષદની કુલ સંખ્યા (PM સહિત) લોકસભાના ૧૫% થી વધુ ન હોઈ શકે; ૬ મહિનામાં સાંસદ બનવું ફરજિયાત.',
          'અનુચ્છેદ ૭૮: વહીવટ અને કાયદાના નિર્ણયો રાષ્ટ્રપતિને જણાવવાની PM ની ફરજ.',
          'કેબિનેટ શબ્દ મૂળ બંધારણમાં નહોતો—૪૪મા સુધારા (૧૯૭૮) થી માત્ર અનુચ્છેદ ૩૫૨ માં ઉમેરાયો.',
        ],
        realLifeExampleEn:
          'When Dr. S. Jaishankar was appointed External Affairs Minister in May 2019, he was not an MP—he was subsequently elected to the Rajya Sabha from Gujarat within the 6-month window under Article 75(5).',
        realLifeExampleGu:
          'મે ૨૦૧૯ માં ડૉ. એસ. જયશંકર વિદેશ મંત્રી બન્યા ત્યારે તેઓ સાંસદ નહોતા—ત્યારબાદ ૬ મહિનામાં ગુજરાતમાંથી રાજ્યસભાના સાંસદ તરીકે ચૂંટાયા હતા.',
        keyTerms: ['Art. 74 Binding Advice', '91st Amendment (15%)', 'Art. 78 PM Duties', 'Cabinet in Art. 352'],
      },
    ],
    summaryPointsEn: [
      '91st Amendment (2003): Max 15% of Lok Sabha strength. "Cabinet" appears only in Art. 352 (44th Amend).',
    ],
    summaryPointsGu: [
      '૯૧મો સુધારો (૨૦૦૩): લોકસભાના મહત્તમ ૧૫% મંત્રીઓ. "કેબિનેટ" શબ્દ માત્ર અનુ. ૩૫૨ માં છે.',
    ],
  },

  {
    id: 'polity-ch-20',
    chapterNumber: 20,
    partNumber: 3,
    partTitleEn: 'Part III: Central Government',
    partTitleGu: 'ભાગ ૩: કેન્દ્ર સરકાર',
    titleEn: '20. Parliament (Lok Sabha, Rajya Sabha & Law-making)',
    titleGu: '૨૦. સંસદ (લોકસભા, રાજ્યસભા અને કાયદા ઘડતર)',
    readingTimeMinutes: 18,
    status: 'published',
    examFocusEn:
      'Highest-weightage Central Govt chapter: Art. 79–122, Speaker powers, Anti-Defection (10th Schedule), Ordinary vs Money Bill (Art. 110) vs Financial Bill (Art. 117), Joint Sitting (Art. 108), and Zero Hour/Motions.',
    examFocusGu:
      'કેન્દ્ર સરકારનું સૌથી મહત્વપૂર્ણ પ્રકરણ: અનુ. ૭૯–૧૨૨, સ્પીકરની સત્તા, પક્ષપલટા વિરોધી કાયદો (૧૦મી અનુસૂચિ), નાણાં બિલ (અનુ. ૧૧૦), સંયુક્ત બેઠક (અનુ. ૧૦૮).',
    sections: [
      {
        id: 'polity-ch-20-s1',
        headingEn: '20.1 Composition, Speaker, Anti-Defection & Legislative Procedures',
        headingGu: '૨૦.૧ રચના, સ્પીકર, પક્ષપલટા કાયદો અને બિલ પસાર કરવાની પ્રક્રિયા',
        simpleExplanationEn:
          'Under Article 79, Parliament has THREE parts: the President, Rajya Sabha (Council of States), and Lok Sabha (House of the People). Rajya Sabha is a permanent House (1/3rd retire every 2 years), while Lok Sabha has a normal 5-year term. Different bills follow different rules: Money Bills (Art. 110) can ONLY start in Lok Sabha and Rajya Sabha cannot reject or amend them (only 14 days to return).',
        simpleExplanationGu:
          'અનુચ્છેદ ૭૯ મુજબ સંસદના ત્રણ અંગ છે: રાષ્ટ્રપતિ, રાજ્યસભા અને લોકસભા. રાજ્યસભા કાયમી ગૃહ છે (દર ૨ વર્ષે ૧/૩ સભ્યો નિવૃત્ત થાય). નાણાં બિલ (અનુ. ૧૧૦) માત્ર લોકસભામાં જ રજૂ થઈ શકે છે અને રાજ્યસભા તેને ૧૪ દિવસથી વધુ રોકી શકતી નથી.',
        importantPointsEn: [
          'Composition: Rajya Sabha max 250 (present 245: 229 states + 4 UTs + 12 nominated by President). Lok Sabha max 550 (530 states + 20 UTs; 104th Amendment 2019 ended 2 Anglo-Indian nominations); present 543.',
          'Quorum: 1/10th of total strength of each House (including Presiding Officer).',
          'Anti-Defection Law (10th Schedule, 52nd Amendment 1985 & 91st Amendment 2003): Decided by Presiding Officer (Speaker/Chairman); subject to Judicial Review (Kihoto Hollohan 1992).',
          'Money Bill (Art. 110): Certified by Speaker (final); introduced ONLY in Lok Sabha with President’s prior recommendation; RS has max 14 days; NO joint sitting; President cannot return it.',
          'Joint Sitting (Art. 108): Summoned by President, presided over by Speaker of Lok Sabha; ONLY for Ordinary Bills and Financial Bills (NOT Money Bills or Constitutional Amendment Bills). Held only 3 times: Dowry Prohibition (1961), Banking Service Commission (1978), POTA (2002).',
          'Special Powers of Rajya Sabha: Art. 249 (State List law), Art. 312 (new All-India Service), and initiating VP removal.',
        ],
        importantPointsGu: [
          'રચના: રાજ્યસભા મહત્તમ ૨૫૦ (હાલ ૨૪૫, ૧૨ નિયુક્ત). લોકસભા મહત્તમ ૫૫૦ (હાલ ૫૪૩; ૧૦૪મા સુધારા ૨૦૧૯ થી ૨ એંગ્લો-ઈન્ડિયન નામાંકન સમાપ્ત).',
          'કોરમ (Quorum): કુલ સભ્યસંખ્યાના ૧/૧૦ ભાગ (પ્રમુખ સહિત).',
          'પક્ષપલટા વિરોધી કાયદો (૧૦મી અનુસૂચિ, ૫૨મો સુધારો ૧૯૮૫): નિર્ણય અધ્યક્ષ/સ્પીકર લે છે, જે ન્યાયિક સમીક્ષાને પાત્ર છે (કિહોટો હોલોહન કેસ ૧૯૯૨).',
          'નાણાં બિલ (અનુ. ૧૧૦): સ્પીકરનું પ્રમાણપત્ર અંતિમ; માત્ર લોકસભામાં જ રજૂ થાય; રાજ્યસભા પાસે ૧૪ દિવસ; સંયુક્ત બેઠક નહીં.',
          'સંયુક્ત બેઠક (અનુ. ૧૦૮): રાષ્ટ્રપતિ બોલાવે છે, અધ્યક્ષતા લોકસભા સ્પીકર કરે છે. માત્ર સામાન્ય/નાણાકીય બિલ માટે (નાણાં બિલ કે બંધારણીય સુધારા માટે નહીં). અત્યાર સુધી ૩ વાર મળી (૧૯૬૧, ૧૯૭૮, ૨૦૦૨).',
          'રાજ્યસભાની વિશેષ સત્તાઓ: અનુ. ૨૪૯ (રાજ્ય યાદી), અનુ. ૩૧૨ (નવી અખિલ ભારતીય સેવા).',
        ],
        realLifeExampleEn:
          'Zero Hour (12 noon, right after Question Hour) is an Indian parliamentary innovation—not mentioned in the Rules of Procedure—where MPs raise urgent matters without prior notice.',
        realLifeExampleGu:
          'શૂન્યકાળ (Zero Hour — બપોરે ૧૨ વાગ્યે) એ ભારતીય સંસદની મૌલિક દેન છે, જેનો ઉલ્લેખ બંધારણ કે નિયમોમાં નથી; તેમાં સાંસદો પૂર્વ સૂચના વિના તાત્કાલિક મુદ્દા ઉઠાવે છે.',
        keyTerms: ['Art. 110 Money Bill', 'Art. 108 Joint Sitting', '10th Schedule', 'Zero Hour'],
      },
    ],
    summaryPointsEn: [
      'Money Bill (Art. 110): LS only, 14 days RS, Speaker decides, no Joint Sitting.',
      'Joint Sitting (Art. 108): Presided by LS Speaker; held 3 times (1961, 1978, 2002).',
      '104th Amendment (2019): Removed 2 Anglo-Indian seats in Lok Sabha.',
    ],
    diagramTitleEn: 'How a Bill Becomes an Act in Parliament',
    diagramTitleGu: 'સંસદમાં બિલમાંથી કાયદો બનવાની પ્રક્રિયા',
    diagramNodes: [
      {
        id: 'bill-1',
        labelEn: '1. Introduction (First Reading)',
        labelGu: '૧. રજૂઆત (પ્રથમ વાંચન)',
        detailEn: 'Ordinary Bill: either House. Money Bill (Art. 110): ONLY Lok Sabha with President’s prior recommendation.',
        detailGu: 'સામાન્ય બિલ: કોઈપણ ગૃહમાં. નાણાં બિલ (અનુ. ૧૧૦): માત્ર લોકસભામાં રાષ્ટ્રપતિની પૂર્વ મંજૂરીથી.',
      },
      {
        id: 'bill-2',
        labelEn: '2. Debate & Voting (2nd & 3rd)',
        labelGu: '૨. ચર્ચા અને મતદાન',
        detailEn: 'Detailed clause-by-clause scrutiny (often via Standing/Select Committee) followed by voting in the originating House.',
        detailGu: 'સમિતિ દ્વારા વિગતવાર તપાસ અને કલમવાર ચર્ચા પછી મૂળ ગૃહમાં મતદાન.',
      },
      {
        id: 'bill-3',
        labelEn: '3. Second House / Deadlock',
        labelGu: '૩. બીજું ગૃહ / ગતિરોધ',
        detailEn: 'Money Bill: RS has max 14 days (cannot amend/reject). Ordinary Bill: deadlock (>6 months) can trigger Joint Sitting (Art. 108).',
        detailGu: 'નાણાં બિલ: RS પાસે મહત્તમ ૧૪ દિવસ. સામાન્ય બિલમાં ગતિરોધ થાય તો સંયુક્ત બેઠક (અનુ. ૧૦૮).',
      },
      {
        id: 'bill-4',
        labelEn: '4. President’s Assent (Art. 111)',
        labelGu: '૪. રાષ્ટ્રપતિની મંજૂરી (અનુ. ૧૧૧)',
        detailEn: 'President may give assent, withhold, or return an Ordinary Bill once; once re-passed, assent is obligatory.',
        detailGu: 'રાષ્ટ્રપતિ સામાન્ય બિલ ૧ વાર પરત મોકલી શકે; ફરી પસાર થાય તો સહી ફરજિયાત.',
      },
    ],
    summaryPointsGu: [
      'નાણાં બિલ (અનુ. ૧૧૦): માત્ર LS, RS ને ૧૪ દિવસ, સંયુક્ત બેઠક નહીં.',
      'સંયુક્ત બેઠક (અનુ. ૧૦૮): અધ્યક્ષતા LS સ્પીકર; ૩ વાર મળી (૧૯૬૧, ૧૯૭૮, ૨૦૦૨).',
    ],
  },

  {
    id: 'polity-ch-21',
    chapterNumber: 21,
    partNumber: 3,
    partTitleEn: 'Part III: Central Government',
    partTitleGu: 'ભાગ ૩: કેન્દ્ર સરકાર',
    titleEn: '21. Parliamentary Committees',
    titleGu: '૨૧. સંસદીય સમિતિઓ',
    readingTimeMinutes: 8,
    status: 'published',
    examFocusEn:
      'Prelims favourite: Public Accounts Committee (22 members: 15 LS + 7 RS, Opposition Chairman), Estimates Committee (30 members: ALL from Lok Sabha — largest), Public Undertakings (22: 15+7).',
    examFocusGu:
      'પ્રિલિમ્સ માટે: જાહેર હિસાબ સમિતિ — PAC (૨૨ સભ્યો: ૧૫ LS + ૭ RS), અંદાજ સમિતિ (૩૦ સભ્યો: તમામ લોકસભામાંથી — સૌથી મોટી), જાહેર સાહસ સમિતિ (૨૨: ૧૫+૭).',
    sections: [
      {
        id: 'polity-ch-21-s1',
        headingEn: '21.1 Financial Committees (PAC, Estimates, COPU) & DRSCs',
        headingGu: '૨૧.૧ નાણાકીય સમિતિઓ (PAC, અંદાજ, COPU) અને સ્થાયી સમિતિઓ',
        simpleExplanationEn:
          'Parliament has too much detailed work to check every ministry’s budget on the floor of the House. So it works through Standing Committees—especially the 3 Financial Committees (PAC, Estimates, Public Undertakings) and 24 Departmentally Related Standing Committees (DRSCs). Ministers CANNOT be members of these financial committees.',
        simpleExplanationGu:
          'સંસદના દરેક મંત્રાલયના હિસાબો અને બજેટની ઊંડાણપૂર્વક તપાસ કરવા સંસદીય સમિતિઓ કામ કરે છે. ત્રણ મુખ્ય નાણાકીય સમિતિઓ (PAC, અંદાજ સમિતિ, જાહેર સાહસ સમિતિ) માં કોઈ મંત્રી સભ્ય બની શકતા નથી.',
        importantPointsEn: [
          'Public Accounts Committee (PAC — est. 1921 under 1919 Act): 22 members (15 LS + 7 RS); 1-year term; NO minister; since 1967 Chairman is from Opposition; examines CAG reports.',
          'Estimates Committee (est. 1950): 30 members — ALL from Lok Sabha (largest parliamentary committee); 1-year term; NO minister; suggests economies in public expenditure.',
          'Committee on Public Undertakings (est. 1964, Krishna Menon Committee): 22 members (15 LS + 7 RS); 1-year term; NO minister.',
          '24 DRSCs (1993, expanded in 2004): 31 members each (21 LS + 10 RS); 16 under LS Speaker + 8 under RS Chairman.',
        ],
        importantPointsGu: [
          'જાહેર હિસાબ સમિતિ — PAC (૧૯૨૧): ૨૨ સભ્યો (૧૫ LS + ૭ RS); ૧ વર્ષ કાર્યકાળ; અધ્યક્ષ વિપક્ષમાંથી (૧૯૬૭ થી); CAG ના રિપોર્ટ તપાસે.',
          'અંદાજ સમિતિ (૧૯૫૦): ૩૦ સભ્યો — તમામ લોકસભામાંથી (સૌથી મોટી સમિતિ); બજેટમાં કરકસર સૂચવે.',
          'જાહેર સાહસ સમિતિ (૧૯૬૪, કૃષ્ણ મેનન સમિતિ): ૨૨ સભ્યો (૧૫ LS + ૭ RS).',
          '૨૪ વિભાગીય સ્થાયી સમિતિઓ (DRSCs): દરેકમાં ૩૧ સભ્યો (૨૧ LS + ૧૦ RS).',
        ],
        realLifeExampleEn:
          'When CAG audits government spending, the Public Accounts Committee (chaired by an Opposition MP) questions top IAS Secretaries of ministries to ensure accountability.',
        realLifeExampleGu:
          'CAG ના ઓડિટ રિપોર્ટ પર જાહેર હિસાબ સમિતિ (જેના અધ્યક્ષ વિપક્ષના સાંસદ હોય છે) મંત્રાલયોના ઉચ્ચ અધિકારીઓ પાસેથી હિસાબ માંગે છે.',
        keyTerms: ['PAC (15+7)', 'Estimates (30 LS only)', 'COPU (15+7)', '24 DRSCs (21+10)'],
      },
    ],
    summaryPointsEn: [
      'PAC: 22 (15+7), Opposition Chairman. Estimates: 30 (LS only). COPU: 22 (15+7). No ministers allowed.',
    ],
    summaryPointsGu: [
      'PAC: ૨૨ (૧૫+૭), વિપક્ષી અધ્યક્ષ. અંદાજ: ૩૦ (માત્ર LS). મંત્રીઓ સભ્ય ન બની શકે.',
    ],
  },

  {
    id: 'polity-ch-22',
    chapterNumber: 22,
    partNumber: 3,
    partTitleEn: 'Part III: Central Government',
    partTitleGu: 'ભાગ ૩: કેન્દ્ર સરકાર',
    titleEn: '22. Supreme Court of India',
    titleGu: '૨૨. ભારતની સર્વોચ્ચ અદાલત (સુપ્રીમ કોર્ટ)',
    readingTimeMinutes: 13,
    status: 'published',
    examFocusEn:
      'High-yield Prelims: Art. 124–147, Collegium (Third Judges Case 1998, NJAC struck down 2015), Original (Art. 131), Writ (32), SLP (136), Review (137), Advisory (Art. 143), Court of Record (129).',
    examFocusGu:
      'પ્રિલિમ્સ માટે: અનુ. ૧૨૪–૧૪૭, કોલેજિયમ, મૂળ ક્ષેત્રાધિકાર (૧૩૧), SLP (૧૩૬), પુનર્વિચાર (૧૩૭), સલાહકારી (૧૪૩), કોર્ટ ઓફ રેકોર્ડ (૧૨૯).',
    sections: [
      {
        id: 'polity-ch-22-s1',
        headingEn: '22.1 Judges, Collegium, Removal & Jurisdictions (Art. 124–147)',
        headingGu: '૨૨.૧ ન્યાયાધીશો, કોલેજિયમ, પદમુક્તિ અને ક્ષેત્રાધિકારો (અનુ. ૧૨૪–૧૪૭)',
        simpleExplanationEn:
          'Unlike the US (separate federal & state courts), India has a single integrated judiciary headed by the Supreme Court (inaugurated Jan 28, 1950). Judges are appointed by the President through the Collegium system (CJI + 4 senior-most SC judges) and can only be removed by a tough Parliamentary process (Special Majority in both Houses) to protect judicial independence.',
        simpleExplanationGu:
          'ભારતમાં એકીકૃત ન્યાયતંત્ર છે જેની ટોચ પર સુપ્રીમ કોર્ટ છે (સ્થાપના: ૨૮ જાન્યુઆરી ૧૯૫૦). ન્યાયાધીશોની નિમણૂક રાષ્ટ્રપતિ કોલેજિયમ સિસ્ટમ (CJI + ૪ વરિષ્ઠ જજ) ની ભલામણથી કરે છે.',
        importantPointsEn: [
          'Strength & Tenure: Currently 34 judges (1 CJI + 33 judges). Retirement age: 65 years (NO minimum age).',
          'Collegium System: Evolved through First (1981), Second (1993), and Third Judges Case (1998) — CJI + 4 senior-most SC judges. 99th Amendment (NJAC) struck down in 2015 (Fourth Judges Case).',
          'Removal (Art. 124(4)): Grounds — "Proved misbehaviour or incapacity"; Special Majority in both Houses in the same session (Judges Enquiry Act, 1968).',
          'Key Jurisdictions: Original (Art. 131 — Centre vs States / State vs State, excludes pre-Constitution treaties & Art. 262 water disputes); Writ (Art. 32); Appellate (132–134); Special Leave Petition — SLP (Art. 136); Review (Art. 137); Advisory (Art. 143 — advice NOT binding on President); Court of Record (Art. 129); Complete Justice (Art. 142).',
        ],
        importantPointsGu: [
          'સંખ્યા અને વયમર્યાદા: કુલ ૩૪ ન્યાયાધીશો (૧ CJI + ૩૩ જજ); નિવૃત્તિ વય: ૬૫ વર્ષ.',
          'કોલેજિયમ સિસ્ટમ: CJI + ૪ વરિષ્ઠ જજ. ૯૯મો સુધારો (NJAC) ૨૦૧૫ માં રદ થયો.',
          'પદમુક્તિ (અનુ. ૧૨૪(૪)): સાબિત થયેલ ગેરવર્તણૂક કે અક્ષમતાના આધારે બંને ગૃહોની વિશેષ બહુમતીથી.',
          'ક્ષેત્રાધિકારો: મૂળ (અનુ. ૧૩૧ — કેન્દ્ર vs રાજ્ય), રિટ (અનુ. ૩૨), SLP (અનુ. ૧૩૬), પુનર્વિચાર (અનુ. ૧૩૭), સલાહકારી (અનુ. ૧૪૩ — સલાહ બંધનકર્તા નથી), કોર્ટ ઓફ રેકોર્ડ (અનુ. ૧૨૯), સંપૂર્ણ ન્યાય (અનુ. ૧૪૨).',
        ],
        realLifeExampleEn:
          'When the Supreme Court decided the Ayodhya case (2019) or ordered compensation/relief in unique cases, it used Article 142 ("complete justice") alongside its appellate powers.',
        realLifeExampleGu:
          'સુપ્રીમ કોર્ટ અસાધારણ કેસોમાં "સંપૂર્ણ ન્યાય" (Complete Justice) કરવા માટે અનુચ્છેદ ૧૪૨ ની વિશેષ સત્તાનો ઉપયોગ કરે છે.',
        keyTerms: ['34 Judges (65 yrs)', 'Collegium & NJAC (2015)', 'Art. 131 Original', 'Art. 143 Advisory'],
      },
    ],
    summaryPointsEn: [
      'SC: 34 judges, retire at 65; Collegium (CJI + 4); Art. 131 (Federal disputes), Art. 143 (Advisory).',
    ],
    diagramTitleEn: 'India’s Single Integrated Judiciary Hierarchy',
    diagramTitleGu: 'ભારતનું એકીકૃત ન્યાયતંત્ર માળખું',
    diagramNodes: [
      {
        id: 'jud-1',
        labelEn: '1. Subordinate Courts',
        labelGu: '૧. તાબાની / જિલ્લા અદાલતો',
        detailEn: 'District & Sessions Judge (highest civil/criminal court in district) plus Civil Judges & Judicial Magistrates (Art. 233–237).',
        detailGu: 'જિલ્લા અને સેશન્સ ન્યાયાધીશ (જિલ્લાની સર્વોચ્ચ અદાલત) તથા સિવિલ/મેજિસ્ટ્રેટ કોર્ટ.',
      },
      {
        id: 'jud-2',
        labelEn: '2. High Courts (25 in India)',
        labelGu: '૨. વડી અદાલતો (૨૫ હાઈકોર્ટ)',
        detailEn: 'Head of state judiciary; issues Writs for FRs & legal rights (Art. 226) and supervises all lower courts/tribunals (Art. 227).',
        detailGu: 'રાજ્યની સર્વોચ્ચ અદાલત; અનુ. ૨૨૬ હેઠળ રિટ અને અનુ. ૨૨૭ હેઠળ દેખરેખ.',
      },
      {
        id: 'jud-3',
        labelEn: '3. Supreme Court (Apex)',
        labelGu: '૩. સર્વોચ્ચ અદાલત (સુપ્રીમ કોર્ટ)',
        detailEn: 'Final court of appeal (Art. 132–136), federal arbiter (Art. 131), guarantor of FRs (Art. 32), and guardian of Basic Structure.',
        detailGu: 'દેશની અંતિમ અપીલ અદાલત (અનુ. ૧૩૨–૧૩૬), સંઘીય વિવાદો (૧૩૧) અને મૂળભૂત અધિકારોની રક્ષક (૩૨).',
      },
      {
        id: 'jud-4',
        labelEn: '4. Binding Precedent (Art. 141)',
        labelGu: '૪. બંધનકર્તા ચુકાદો (અનુ. ૧૪૧)',
        detailEn: 'Law declared by the Supreme Court is binding on all courts within the territory of India (Art. 141).',
        detailGu: 'સુપ્રીમ કોર્ટે જાહેર કરેલો કાયદો ભારતની તમામ અદાલતો માટે બંધનકર્તા છે.',
      },
    ],
    summaryPointsGu: [
      'SC: ૩૪ જજ, ૬૫ વર્ષ નિવૃત્તિ; અનુ. ૧૩૧ (મૂળ), અનુ. ૧૪૩ (સલાહકારી), અનુ. ૧૪૨ (સંપૂર્ણ ન્યાય).',
    ],
  },

  {
    id: 'polity-ch-23',
    chapterNumber: 23,
    partNumber: 3,
    partTitleEn: 'Part III: Central Government',
    partTitleGu: 'ભાગ ૩: કેન્દ્ર સરકાર',
    titleEn: '23. Judicial Review, Judicial Activism & PIL',
    titleGu: '૨૩. ન્યાયિક સમીક્ષા, ન્યાયિક સક્રિયતા અને PIL',
    readingTimeMinutes: 8,
    status: 'published',
    examFocusEn:
      'Mains & Prelims: Judicial Review (borrowed from USA, Art. 13/32/131/226), Judicial Activism vs Overreach, and PIL pioneers (Justice P.N. Bhagwati & V.R. Krishna Iyer).',
    examFocusGu:
      'મેઈન્સ અને પ્રિલિમ્સ: ન્યાયિક સમીક્ષા (અમેરિકાથી પ્રેરિત), ન્યાયિક સક્રિયતા vs અતિરેક, અને PIL ના પ્રણેતા (જસ્ટિસ પી.એન. ભગવતી અને વી.આર. કૃષ્ણ અય્યર).',
    sections: [
      {
        id: 'polity-ch-23-s1',
        headingEn: '23.1 Judicial Review vs. Judicial Activism & Public Interest Litigation (PIL)',
        headingGu: '૨૩.૧ ન્યાયિક સમીક્ષા vs ન્યાયિક સક્રિયતા અને જાહેર હિતની અરજી (PIL)',
        simpleExplanationEn:
          'Judicial Review is the court’s constitutional power to strike down unconstitutional laws or executive actions. Judicial Activism is when judges proactively protect citizens’ rights and push governments to act. PIL (Public Interest Litigation), pioneered in India in the late 1970s–1980s by Justice P.N. Bhagwati and Justice V.R. Krishna Iyer, relaxed the strict "locus standi" rule so any public-spirited citizen can approach the court on behalf of the poor or disadvantaged.',
        simpleExplanationGu:
          'ન્યાયિક સમીક્ષા એટલે બંધારણ વિરોધી કાયદા રદ કરવાની કોર્ટની સત્તા. ન્યાયિક સક્રિયતા અને PIL (જાહેર હિતની અરજી — જસ્ટિસ પી.એન. ભગવતી અને વી.આર. કૃષ્ણ અય્યર) દ્વારા કોઈપણ નાગરિક ગરીબો કે જાહેર હિત માટે કોર્ટના દ્વાર ખટખટાવી શકે છે.',
        importantPointsEn: [
          'Judicial Review: Declared part of Basic Structure (Minerva Mills 1980); anchored in Art. 13, 32, 131–136, 226.',
          'PIL (Origin in USA, 1960s): Introduced in India by Justice V.R. Krishna Iyer & Justice P.N. Bhagwati; relaxes traditional "Locus Standi" rule.',
          'Judicial Overreach: When courts step into policy-making or executive/legislative domains beyond constitutional balance.',
        ],
        importantPointsGu: [
          'ન્યાયિક સમીક્ષા: મિનર્વા મિલ્સ (૧૯૮૦) મુજબ મૂળભૂત માળખું; અનુ. ૧૩, ૩૨, ૨૨૬ માં આધાર.',
          'PIL: ભારતમાં જસ્ટિસ વી.આર. કૃષ્ણ અય્યર અને જસ્ટિસ પી.એન. ભગવતી દ્વારા શરૂ; "લોકસ સ્ટેન્ડી" ના નિયમમાં છૂટછાટ.',
        ],
        realLifeExampleEn:
          'The Vishakha Guidelines (1997) against workplace sexual harassment and the Right to Clean Air/Water orders came out of PILs—even before Parliament passed dedicated laws.',
        realLifeExampleGu:
          'કાર્યસ્થળે મહિલા સુરક્ષા માટેની "વિશાખા માર્ગદર્શિકા" (૧૯૯૭) અને શુદ્ધ હવા-પાણીના ચુકાદાઓ PIL દ્વારા જ આવ્યા હતા.',
        keyTerms: ['Judicial Review (Art. 13)', 'PIL (P.N. Bhagwati)', 'Locus Standi'],
      },
    ],
    summaryPointsEn: [
      'Judicial Review = Basic Structure. PIL (Bhagwati & Krishna Iyer) relaxed Locus Standi for public welfare.',
    ],
    summaryPointsGu: [
      'ન્યાયિક સમીક્ષા = મૂળભૂત માળખું. PIL (પી.એન. ભગવતી) દ્વારા જાહેર હિતમાં સરળ ન્યાય.',
    ],
  },
];
