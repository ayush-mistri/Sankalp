import { PYQQuestion } from '@/types';

export const UPSC_2023_GS1_QUESTIONS: PYQQuestion[] = [
  // =========================================================================
  // SECTION 1: INDIAN POLITY & CONSTITUTION
  // =========================================================================
  {
    id: 'upsc-2023-pol-01',
    topicId: 'topic-f1',
    examAgency: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2023',
    examYear: 2023,
    paperType: 'Prelims GS-1',
    subject: 'polity',
    cognitiveType: 'conceptual',
    questionEn: 'In essence, what does "Due Process of Law" (કાયદાની યોગ્ય પ્રક્રિયા) mean in constitutional jurisprudence as interpreted by the Supreme Court of India?',
    questionGu: 'ભારતના સર્વોચ્ચ ન્યાયાલયના અર્થઘટન મુજબ, સંવિધાનીક કાયદાશાસ્ત્રમાં "કાયદાની યોગ્ય પ્રક્રિયા" (Due Process of Law) નો મૂળભૂત અર્થ શું થાય છે?',
    options: [
      { id: 'opt-a', textEn: 'The principle of natural justice', textGu: 'કુદરતી ન્યાયનો સિદ્ધાંત (Principle of natural justice)', isCorrect: false, whyWrongEn: 'While natural justice is an ingredient, the core essence is ensuring fairness and non-arbitrariness.' },
      { id: 'opt-b', textEn: 'The procedure established by law', textGu: 'કાયદા દ્વારા સ્થાપિત પ્રક્રિયા', isCorrect: false, whyWrongEn: 'Procedure Established by Law is a British doctrine checking only enactment legality, whereas Due Process checks fairness of the law itself.' },
      { id: 'opt-c', textEn: 'Fair application of law', textGu: 'કાયદાનો ન્યાયી અને વાજબી અમલ (Fair application of law)', isCorrect: true },
      { id: 'opt-d', textEn: 'Equality before law', textGu: 'કાયદા સમક્ષ સમાનતા', isCorrect: false, whyWrongEn: 'Equality before law is Article 14.' }
    ],
    explanationEn: 'In Maneka Gandhi v. Union of India (1978), the Supreme Court integrated the American doctrine of "Due Process of Law" into Article 21 ("Procedure Established by Law"). Under this doctrine, any law depriving life or personal liberty must not only follow formal legislative procedure but must also be just, fair, reasonable, and non-arbitrary (fair application of law).',
    explanationGu: 'મેનકા ગાંધી કેસ (૧૯૭૮) માં સુપ્રીમ કોર્ટે ઠરાવ્યું કે અનુચ્છેદ ૨૧ માં માત્ર "કાયદા દ્વારા સ્થાપિત પ્રક્રિયા" પૂરતી નથી, પરંતુ તે કાયદો ન્યાયી, વાજબી અને વ્યાજબી (Fair, Just and Reasonable) હોવો જોઈએ. આથી કાયદાનો ન્યાયી અમલ (Fair application of law) એ ડ્યુ પ્રોસેસ ઓફ લો નો હાર્દ છે.',
    sourceConceptEn: 'Indian Polity -> Fundamental Rights -> Article 21 Due Process of Law',
    sourceConceptGu: 'ભારતીય બંધારણ -> મૂળભૂત અધિકારો -> અનુચ્છેદ ૨૧ અને કાયદાની યોગ્ય પ્રક્રિયા'
  },
  {
    id: 'upsc-2023-pol-02',
    topicId: 'topic-f1',
    examAgency: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2023',
    examYear: 2023,
    paperType: 'Prelims GS-1',
    subject: 'polity',
    cognitiveType: 'multi_statement',
    questionEn: 'With reference to the Finance Bill and Money Bill in the Indian Parliament, consider the following statements:\n1. When the Lok Sabha transmits Finance Bill to the Rajya Sabha, the Rajya Sabha can amend or reject the Bill.\n2. When the Lok Sabha transmits Money Bill to the Rajya Sabha, the Rajya Sabha cannot amend or reject the Bill, it can only make recommendations.\n3. In the case of disagreement between the Lok Sabha and the Rajya Sabha, there is no joint sitting for Money Bill, but a joint sitting can be summoned for Finance Bill (Category I & II).\nWhich of the statements given above are correct?',
    questionGu: 'ભારતીય સંસદમાં નાણાં વિધેયક (Finance Bill) અને ધન વિધેયક (Money Bill) ના સંદર્ભમાં નીચેના વિધાનો ધ્યાને લો:\n૧. જ્યારે લોકસભા ફાઇનાન્સ બિલ રાજ્યસભાને મોકલે છે, ત્યારે રાજ્યસભા તેમાં સુધારો કરી શકે છે અથવા તેને નકારી શકે છે.\n૨. જ્યારે લોકસભા મની બિલ રાજ્યસભાને મોકલે છે, ત્યારે રાજ્યસભા તેમાં સુધારો કરી શકતી નથી કે નકારી શકતી નથી, માત્ર ભલામણો કરી શકે છે.\n૩. બંને ગૃહો વચ્ચે અસંમતિના કિસ્સામાં, મની બિલ માટે સંયુક્ત બેઠકની જોગવાઈ નથી, પરંતુ સામાન્ય ફાઇનાન્સ બિલ માટે સંયુક્ત બેઠક (Joint Sitting) બોલાવી શકાય છે.\nઉપર્યુક્ત પૈકી કયા વિધાનો સાચાં છે?',
    options: [
      { id: 'opt-a', textEn: '1 and 2 only', textGu: 'માત્ર ૧ અને ૨', isCorrect: false, whyWrongEn: 'Statement 3 is also correct under Articles 108, 109, and 117.' },
      { id: 'opt-b', textEn: '2 and 3 only', textGu: 'માત્ર ૨ અને ૩', isCorrect: false, whyWrongEn: 'Statement 1 is also correct.' },
      { id: 'opt-c', textEn: '1, 2 and 3', textGu: '૧, ૨ અને ૩ તમામ', isCorrect: true },
      { id: 'opt-d', textEn: '1 and 3 only', textGu: 'માત્ર ૧ અને ૩', isCorrect: false, whyWrongEn: 'Statement 2 is also valid.' }
    ],
    explanationEn: 'Under Article 110, Money Bills are subject to Article 109: Rajya Sabha cannot reject or amend them and has only 14 days to recommend changes, with no joint sitting possible under Article 108. Conversely, ordinary Financial Bills under Article 117(1) & 117(3) follow the legislative route of ordinary bills once introduced, meaning Rajya Sabha has co-equal amending/rejection powers and a joint sitting can resolve deadlocks.',
    explanationGu: 'અનુચ્છેદ ૧૧૦ ના મની બિલ માટે રાજ્યસભા પાસે કોઈ સંશોધન કે નકારવાની સત્તા નથી (માત્ર ૧૪ દિવસમાં ભલામણ મોકલી શકે) અને સંયુક્ત બેઠક થઈ શકતી નથી. જ્યારે અનુચ્છેદ ૧૧૭ હેઠળના ફાઇનાન્સ બિલ (કેટેગરી ૧ અને ૨) માટે રાજ્યસભા સુધારો કરી શકે છે અને અસંમતિના સંજોગોમાં અનુચ્છેદ ૧૦૮ હેઠળ રાષ્ટ્રપતિ સંયુક્ત બેઠક બોલાવી શકે છે. ત્રણેય વિધાનો સાચાં છે.',
    sourceConceptEn: 'Indian Polity -> Parliament -> Money Bill (Art 110) vs Finance Bill (Art 117)',
    sourceConceptGu: 'ભારતીય બંધારણ -> સંસદીય પ્રક્રિયા -> ધન વિધેયક અને નાણાકીય વિધેયક'
  },

  // =========================================================================
  // SECTION 2: ENVIRONMENT & ECOLOGY
  // =========================================================================
  {
    id: 'upsc-2023-env-01',
    topicId: 'topic-f3',
    examAgency: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2023',
    examYear: 2023,
    paperType: 'Prelims GS-1',
    subject: 'environment',
    cognitiveType: 'multi_statement',
    questionEn: 'With reference to "Green Hydrogen" (ગ્રીન હાઇડ્રોજન), consider the following statements:\n1. It can be used directly as a fuel for internal combustion engines or fuel cells for heavy-duty long-distance transport.\n2. It can be blended with natural gas and fed into existing city gas distribution pipelines.\n3. It can be used as a zero-carbon feedstock in petroleum refineries and for the synthesis of green ammonia for chemical fertilizers.\nHow many of the above statements are correct?',
    questionGu: '"ગ્રીન હાઇડ્રોજન" ના સંદર્ભમાં નીચેના વિધાનો ધ્યાને લો:\n૧. તેનો સીધો ઉપયોગ ભારે વ્યાપારી વાહનોના ફ્યુઅલ સેલ અથવા આંતરિક દહન એન્જિનમાં બળતણ તરીકે થઈ શકે છે.\n૨. તેને કુદરતી ગેસ (CNG/PNG) સાથે મિશ્રિત કરીને હાલના સિટી ગેસ પાઇપલાઇન નેટવર્કમાં સપ્લાય કરી શકાય છે.\n૩. પેટ્રોલિયમ રિફાઇનરીઓમાં હાઇડ્રોટ્રીટિંગ માટે અને ખાતર ઉદ્યોગમાં ગ્રીન એમોનિયા બનાવવા માટે ફીડસ્ટોક તરીકે તેનો ઉપયોગ થઈ શકે છે.\nઉપર્યુક્ત પૈકી કેટલા વિધાનો સાચાં છે?',
    options: [
      { id: 'opt-a', textEn: 'Only one', textGu: 'માત્ર એક', isCorrect: false, whyWrongEn: 'All three applications are scientifically established and part of India’s National Green Hydrogen Mission.' },
      { id: 'opt-b', textEn: 'Only two', textGu: 'માત્ર બે', isCorrect: false, whyWrongEn: 'All three statements are correct.' },
      { id: 'opt-c', textEn: 'All three', textGu: 'તમામ ત્રણ', isCorrect: true },
      { id: 'opt-d', textEn: 'None', textGu: 'એક પણ નહીં', isCorrect: false, whyWrongEn: 'Statements are technologically accurate.' }
    ],
    explanationEn: 'Under India’s National Green Hydrogen Mission (2023):\n1. Hydrogen Fuel Cell Electric Vehicles (FCEVs) and adapted IC engines offer decarbonization for long-haul trucking and shipping.\n2. NTPC and GAIL have successfully piloted blending green hydrogen (up to 5–10%) into PNG grids in Kawas, Gujarat.\n3. Green Hydrogen is directly replacing grey hydrogen produced from naphtha in ammonia synthesis (urea manufacturing) and petroleum desulfurization. All three statements are correct.',
    explanationGu: 'રાષ્ટ્રીય ગ્રીન હાઇડ્રોજન મિશન હેઠળ:\n૧. ભારે ટ્રકો અને શિપિંગમાં ફ્યુઅલ સેલ દ્વારા વાપરી શકાય છે.\n૨. ગુજરાતના કવાસ ખાતે NTPC એ PNG ગેસ પાઇપલાઇનમાં ગ્રીન હાઇડ્રોજનનું સફળ મિશ્રણ કર્યું છે.\n૩. રિફાઇનરીઓ અને રાસાયણિક ખાતરોમાં ગ્રીન એમોનિયા બનાવવા કાર્બન-મુક્ત ફીડસ્ટોક તરીકે ઉપયોગ થાય છે. ત્રણેય વિધાનો સાચાં છે.',
    sourceConceptEn: 'Environment & Renewable Energy -> National Green Hydrogen Mission Applications',
    sourceConceptGu: 'પર્યાવરણ અને પુનઃપ્રાપ્ય ઊર્જા -> ગ્રીન હાઇડ્રોજન મિશન અને ઔદ્યોગિક ઉપયોગ'
  },
  {
    id: 'upsc-2023-env-02',
    topicId: 'topic-f3',
    examAgency: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2023',
    examYear: 2023,
    paperType: 'Prelims GS-1',
    subject: 'environment',
    cognitiveType: 'conceptual',
    questionEn: 'Which one of the following tree species, introduced into India from Central America, has become an aggressive invasive alien plant across Indian arid and semi-arid tracts, depleting groundwater tables and suppressing native flora?',
    questionGu: 'મધ્ય અમેરિકામાંથી ભારતમાં લવાયેલી નીચેના પૈકી કઈ વૃક્ષ પ્રજાતિ ભારતના શુષ્ક અને અર્ધ-શુષ્ક પ્રદેશો (જેમ કે કચ્છ અને સૌરાષ્ટ્ર) માં એક આક્રમક વિદેશી વનસ્પતિ (Invasive Alien Species) બનીને ભૂગર્ભજળ ઘટાડી રહી છે અને સ્થાનિક વનસ્પતિને નષ્ટ કરી રહી છે?',
    options: [
      { id: 'opt-a', textEn: 'Prosopis juliflora (ગાંડો બાવળ)', textGu: 'પ્રોસોપિસ જૂલીફ્લોરા (ગાંડો બાવળ)', isCorrect: true },
      { id: 'opt-b', textEn: 'Azadirachta indica (લીમડો)', textGu: 'લીમડો (Azadirachta indica)', isCorrect: false, whyWrongEn: 'Neem is a beneficial indigenous tree native to the Indian subcontinent.' },
      { id: 'opt-c', textEn: 'Pterocarpus santalinus (લાલ ચંદન)', textGu: 'લાલ ચંદન (Red Sanders)', isCorrect: false, whyWrongEn: 'Red Sanders is an endemic timber species of the Eastern Ghats.' },
      { id: 'opt-d', textEn: 'Ficus benghalensis (વડ)', textGu: 'વડલો (Ficus benghalensis)', isCorrect: false, whyWrongEn: 'Banyan is India’s national tree and a keystone species.' }
    ],
    explanationEn: 'Prosopis juliflora (locally known as "Gando Baval" in Gujarat and "Vilayati Kikar" in North India) was introduced in the late 19th and early 20th century from Mexico and Central America to arrest desertification. With its extensive root system, high seed viability, and allelopathic toxins that inhibit neighboring plants, it has overrun native grasslands such as the Banni grasslands of Kutch.',
    explanationGu: 'પ્રોસોપિસ જૂલીફ્લોરા (જેને ગુજરાતમાં "ગાંડો બાવળ" કહે છે) મૂળ મધ્ય અમેરિકાનું છે. રણ આગળ વધતું અટકાવવા તે લાવવામાં આવ્યું હતું, પરંતુ તેની આક્રમક ફેલાવાની ક્ષમતા અને ઊંડા મૂળિયાં દ્વારા ભૂગર્ભજળ ચૂસી લેવાની પ્રકૃતિથી કચ્છના બન્ની ઘાસના મેદાનો અને દેશી દેશી બાવળ (Acacia nilotica) ને મોટો ખતરો પહોંચ્યો છે.',
    sourceConceptEn: 'Environment & Biodiversity -> Invasive Alien Species -> Prosopis Juliflora',
    sourceConceptGu: 'પર્યાવરણ અને જૈવવિવિધતા -> આક્રમક વિદેશી પ્રજાતિઓ -> ગાંડો બાવળ (પ્રોસોપિસ જૂલીફ્લોરા)'
  },

  // =========================================================================
  // SECTION 3: ECONOMY & DEVELOPMENT
  // =========================================================================
  {
    id: 'upsc-2023-eco-01',
    topicId: 'topic-f3',
    examAgency: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2023',
    examYear: 2023,
    paperType: 'Prelims GS-1',
    subject: 'economy',
    cognitiveType: 'multi_statement',
    questionEn: 'With reference to the Central Bank Digital Currency (CBDC) launched by the Reserve Bank of India, consider the following statements:\n1. It is a sovereign digital currency issued by the RBI that appears as a liability on the RBI’s balance sheet.\n2. Unlike private cryptocurrencies, CBDC is legal tender backed by sovereign guarantee and holds parity with physical cash.\n3. The currency cannot be held or transacted offline without active internet connectivity under any circumstances.\nWhich of the statements given above are correct?',
    questionGu: 'રિઝર્વ બેંક ઓફ ઇન્ડિયા (RBI) દ્વારા શરૂ કરવામાં આવેલ સેન્ટ્રલ બેંક ડિજિટલ કરન્સી (CBDC - e₹) ના સંદર્ભમાં નીચેના વિધાનો ધ્યાને લો:\n૧. તે RBI દ્વારા જારી કરાયેલ સાર્વભૌમ ડિજિટલ ચલણ છે જે RBI ની બેલેન્સ શીટ પર જવાબદારી (Liability) તરીકે દેખાય છે.\n૨. ખાનગી ક્રિપ્ટોકરન્સીથી વિપરીત, CBDC કાનૂની માન્યતા ધરાવતું ચલણ (Legal Tender) છે અને ભૌતિક રોકડ જેટલું જ મૂલ્ય ધરાવે છે.\n૩. કોઈપણ સંજોગોમાં સક્રિય ઇન્ટરનેટ કનેક્ટિવિટી વગર આ ચલણ રાખી કે ઑફલાઇન ટ્રાન્ઝેક્શન કરી શકાતું નથી.\nઉપર્યુક્ત પૈકી કયા વિધાનો સાચાં છે?',
    options: [
      { id: 'opt-a', textEn: '1 and 2 only', textGu: 'માત્ર ૧ અને ૨', isCorrect: true },
      { id: 'opt-b', textEn: '2 and 3 only', textGu: 'માત્ર ૨ અને ૩', isCorrect: false, whyWrongEn: 'Statement 3 is incorrect because RBI has developed offline peer-to-peer NFC/Bluetooth functionality.' },
      { id: 'opt-c', textEn: '1, 2 and 3', textGu: '૧, ૨ અને ૩ તમામ', isCorrect: false, whyWrongEn: 'Offline CBDC architecture is specifically supported.' },
      { id: 'opt-d', textEn: '1 and 3 only', textGu: 'માત્ર ૧ અને ૩', isCorrect: false, whyWrongEn: 'Statement 3 is incorrect.' }
    ],
    explanationEn: 'The e-Rupee (CBDC) is the digital form of sovereign legal currency issued under the amended RBI Act, 1934. It is directly convertible 1:1 with physical currency and appears on RBI\'s balance sheet as legal money liabilities. Furthermore, RBI specifically architected offline transaction mechanisms using secure elements and near-field communication (NFC) for remote areas with poor internet.',
    explanationGu: 'રિઝર્વ બેંકની ડિજિટલ કરન્સી (CBDC - e₹) એ રોકડની જેમ જ સાર્વભૌમ ચલણ છે અને RBI ની બેલેન્સ શીટમાં દેવાદારી દર્શાવે છે. ખાનગી ક્રિપ્ટો જેવી અસ્થિરતા વગર તેનું ૧:૧ રોકડ સમકક્ષ મૂલ્ય છે. દૂરદરાજના વિસ્તારો માટે RBI એ NFC અને સુરક્ષિત હાર્ડવેર ચિપ્સ દ્વારા ઑફલાઇન લેવડદેવડની સુવિધા પણ વિકસાવી છે. આથી માત્ર ૧ અને ૨ સાચાં છે.',
    sourceConceptEn: 'Indian Economy -> Banking & Currency -> Central Bank Digital Currency (CBDC)',
    sourceConceptGu: 'ભારતીય અર્થતંત્ર -> બેંકિંગ અને ચલણ વ્યવસ્થા -> સેન્ટ્રલ બેંક ડિજિટલ કરન્સી (CBDC)'
  },
  {
    id: 'upsc-2023-eco-02',
    topicId: 'topic-f3',
    examAgency: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2023',
    examYear: 2023,
    paperType: 'Prelims GS-1',
    subject: 'economy',
    cognitiveType: 'conceptual',
    questionEn: 'With reference to "Infrastructure Investment Trusts" (InvITs) regulated by SEBI in India, which one of the following statements is correct?',
    questionGu: 'ભારતમાં SEBI દ્વારા નિયંત્રિત "ઇન્ફ્રાસ્ટ્રક્ચર ઇન્વેસ્ટમેન્ટ ટ્રસ્ટ્સ" (InvITs) ના સંદર્ભમાં નીચેના પૈકી કયું વિધાન સાચું છે?',
    options: [
      { id: 'opt-a', textEn: 'InvITs can invest only in completed and revenue-generating infrastructure assets and cannot invest in under-construction projects under any condition.', textGu: 'InvITs માત્ર પૂર્ણ થયેલ આવક પેદા કરતા પ્રોજેક્ટ્સમાં જ રોકાણ કરી શકે છે અને અંડર-કન્સ્ટ્રક્શન પ્રોજેક્ટ્સમાં બિલકુલ રોકાણ કરી શકતા નથી.', isCorrect: false, whyWrongEn: 'Public InvITs must invest at least 80% in completed assets, but up to 20% can be invested in under-construction projects.' },
      { id: 'opt-b', textEn: 'They allow retail and institutional investors to pool small sums to invest in large income-generating infrastructure projects (such as toll roads and power transmission lines) similar to mutual funds.', textGu: 'તે મ્યુચ્યુઅલ ફંડની જેમ નાના અને સંસ્થાકીય રોકાણકારોને એકત્રિત કરીને ટોલ રોડ અને પાવર ગ્રીડ જેવા મોટા ઇન્ફ્રાસ્ટ્રક્ચર પ્રોજેક્ટ્સમાં રોકાણ કરવાની તક આપે છે.', isCorrect: true },
      { id: 'opt-c', textEn: 'The dividend income distributed by InvITs to investors is completely exempt from tax in all hands.', textGu: 'રોકાણકારોને વહેંચવામાં આવતી તમામ ડિવિડન્ડ આવક સંપૂર્ણપણે કરમુક્ત છે.', isCorrect: false, whyWrongEn: 'Taxability depends on the SPV tax regime chosen (Section 115BAA).' },
      { id: 'opt-d', textEn: 'InvITs cannot raise debt capital by issuing bonds or debentures.', textGu: 'InvITs બોન્ડ બહાર પાડીને દેવું એકત્ર કરી શકતા નથી.', isCorrect: false, whyWrongEn: 'InvITs routinely issue listed bonds and debt securities within SEBI leverage caps.' }
    ],
    explanationEn: 'Infrastructure Investment Trusts (InvITs) pool collective investment from individuals and institutions to directly invest in operational, revenue-generating infrastructure assets (toll highways, power transmission grids, gas pipelines). Units are listed on stock exchanges, providing liquidity and regular distribution of cash flows, mirroring REITs in real estate.',
    explanationGu: 'InvITs એ મ્યુચ્યુઅલ ફંડ જેવું માળખું છે જે રોકાણકારો પાસેથી ભંડોળ એકઠું કરીને ટોલ હાઇવે, પાવર ટ્રાન્સમિશન નેટવર્ક અને ગેસ પાઇપલાઇન જેવા સ્થિર આવક આપતા ઇન્ફ્રાસ્ટ્રક્ચર પ્રોજેક્ટ્સમાં રોકાણ કરે છે. તેના શેર/યુનિટ્સ સ્ટોક એક્સચેન્જ પર ટ્રેડ થાય છે.',
    sourceConceptEn: 'Indian Economy -> Capital Markets -> InvITs & REITs Regulations',
    sourceConceptGu: 'ભારતીય અર્થતંત્ર -> મૂડીબજાર -> ઇન્ફ્રાસ્ટ્રક્ચર ઇન્વેસ્ટમેન્ટ ટ્રસ્ટ્સ (InvITs)'
  },

  // =========================================================================
  // SECTION 4: HISTORY & ANCIENT CULTURE
  // =========================================================================
  {
    id: 'upsc-2023-hist-01',
    topicId: 'topic-f1',
    examAgency: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2023',
    examYear: 2023,
    paperType: 'Prelims GS-1',
    subject: 'history',
    cognitiveType: 'conceptual',
    questionEn: 'In ancient India, the renowned Buddhist cultural center "Dhanyakataka" (ધાન્યકટક), which flourished as a pre-eminent seat of learning and sacred Mahastupa under the Mahasanghikas, was located in which of the following regions?',
    questionGu: 'પ્રાચીન ભારતમાં, મહાસાંઘિક બૌદ્ધ સંપ્રદાય હેઠળ અગ્રણી વિદ્યાકેન્દ્ર અને પવિત્ર મહાસ્તૂપ તરીકે ખ્યાતિ પામેલું બૌદ્ધ કેન્દ્ર "ધાન્યકટક" નીચેના પૈકી કયા પ્રદેશમાં આવેલું હતું?',
    options: [
      { id: 'opt-a', textEn: 'Andhra (Krishna river valley / Amaravati)', textGu: 'આંધ્ર (કૃષ્ણા નદીની ખીણ / અમરાવતી)', isCorrect: true },
      { id: 'opt-b', textEn: 'Gandhara (Taxila)', textGu: 'ગાંધાર (તક્ષશિલા)', isCorrect: false, whyWrongEn: 'Gandhara was dominated by Sarvastivada in northwestern Pakistan.' },
      { id: 'opt-c', textEn: 'Kalinga (Bhubaneswar)', textGu: 'કલિંગ (ઓડિશા)', isCorrect: false, whyWrongEn: 'Kalinga sites include Dhauli, Lalitgiri and Ratnagiri.' },
      { id: 'opt-d', textEn: 'Magadha (Rajgir)', textGu: 'મગધ (રાજગૃહ)', isCorrect: false, whyWrongEn: 'Magadha featured Nalanda and Odantapuri.' }
    ],
    explanationEn: 'Dhanyakataka (modern Dharanikota/Amaravati in Guntur district, Andhra Pradesh on the banks of the Krishna River) served as the grand southern capital of the Satavahana dynasty. It emerged as the principal center of the Mahasanghika school and Caityaka sect, home to the magnificent Amaravati Stupa renowned for white marble reliefs.',
    explanationGu: 'ધાન્યકટક (આધુનિક ધરણીકોટ/અમરાવતી, ગુંટુર જિલ્લો, આંધ્રપ્રદેશ) કૃષ્ણા નદીના કિનારે સાતવાહન વંશની દક્ષિણી રાજધાની અને મહાસાંઘિક સંપ્રદાયનું મુખ્ય બૌદ્ધ કેન્દ્ર હતું. અહીં આવેલો અમરાવતી મહાસ્તૂપ શ્વેત આરસપહાણની કલાત્મક કોતરણી માટે જગવિખ્યાત છે.',
    sourceConceptEn: 'Ancient Indian History -> Buddhism -> Dhanyakataka & Amaravati School of Art',
    sourceConceptGu: 'પ્રાચીન ભારતનો ઇતિહાસ -> બૌદ્ધ ધર્મ -> ધાન્યકટક અને અમરાવતી કળા'
  },
  {
    id: 'upsc-2023-hist-02',
    topicId: 'topic-f1',
    examAgency: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2023',
    examYear: 2023,
    paperType: 'Prelims GS-1',
    subject: 'history',
    cognitiveType: 'conceptual',
    questionEn: 'The historic Besnagar pillar inscription near Vidisha (Madhya Pradesh) is dedicated to which deity and commemorates which Indo-Greek envoy who embraced Bhagavata Vaishnavism?',
    questionGu: 'વિદિશા (મધ્યપ્રદેશ) નજીક આવેલો ઐતિહાસિક બેસનગર ગરુડ સ્તંભ શિલાલેખ કયા દેવને સમર્પિત છે અને કયા ઈન્ડો-ગ્રીક રાજદૂતના ભાગવત વૈષ્ણવ ધર્મ સ્વીકારવાની સ્મૃતિ દર્શાવે છે?',
    options: [
      { id: 'opt-a', textEn: 'Dedicated to Vasudeva; commemorates Heliodorus, ambassador of king Antialcidas', textGu: 'વાસુદેવ (વિષ્ણુ) ને સમર્પિત; એન્ટિઆલ્કિદાસના ગ્રીક રાજદૂત હેલિયોડોરસની સ્મૃતિમાં', isCorrect: true },
      { id: 'opt-b', textEn: 'Dedicated to Gautama Buddha; commemorates Menander (Milinda)', textGu: 'ગૌતમ બુદ્ધને સમર્પિત; રાજા મિલિંદની સ્મૃતિમાં', isCorrect: false, whyWrongEn: 'Milinda embraced Buddhism through discussions with Nagasena (Milinda Panha).' },
      { id: 'opt-c', textEn: 'Dedicated to Shiva; commemorates Megasthenes', textGu: 'શિવજીને સમર્પિત; મેગસ્થનીઝની સ્મૃતિમાં', isCorrect: false, whyWrongEn: 'Megasthenes was ambassador of Seleucus to Chandragupta Maurya.' },
      { id: 'opt-d', textEn: 'Dedicated to Surya; commemorates Seleucus Nicator', textGu: 'સૂર્યદેવને સમર્પિત; સેલ્યુકસની સ્મૃતિમાં', isCorrect: false, whyWrongEn: 'Seleucus never erected a Bhagavata Garuda pillar at Vidisha.' }
    ],
    explanationEn: 'The Besnagar pillar at Vidisha was erected around 113 BCE by Heliodorus, an ambassador sent from the Indo-Greek King Antialcidas of Taxila to the court of Shunga King Kasiputra Bhagabhadra. The Prakrit inscription in Brahmi script honors "Devadeva Vasudeva" and proclaims Heliodorus as a devoted "Paramabhagavata".',
    explanationGu: 'વિદિશા (મધ્યપ્રદેશ) ખાતેનો ગરુડ સ્તંભ ઈ.સ.પૂર્વે ૧૧૩ માં તક્ષશિલાના ગ્રીક રાજા એન્ટિઆલ્કિદાસના રાજદૂત હેલિયોડોરસ દ્વારા ઊભો કરવામાં આવ્યો હતો. બ્રાહ્મી લિપિના આ શિલાલેખમાં તેણે પોતાને "પરમ ભાગવત" ગણાવી દેવાધિદેવ વાસુદેવ (વિષ્ણુ) ના સન્માનમાં સ્તંભ બનાવ્યાનો ઉલ્લેખ કર્યો છે.',
    sourceConceptEn: 'Ancient Indian History -> Post-Mauryan Period -> Besnagar Garuda Pillar Inscription',
    sourceConceptGu: 'પ્રાચીન ભારતનો ઇતિહાસ -> મૌર્યોત્તર કાળ -> બેસનગર ગરુડ સ્તંભ અને ભાગવત ધર્મ'
  }
];
