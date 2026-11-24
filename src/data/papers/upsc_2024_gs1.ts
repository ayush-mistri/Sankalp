import { PYQQuestion } from '@/types';

export const UPSC_2024_GS1_QUESTIONS: PYQQuestion[] = [
  {
    id: 'upsc-2024-q1',
    topicId: 'topic-f2',
    examAgency: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2024',
    examYear: 2024,
    paperType: 'Prelims GS-1',
    subject: 'polity',
    cognitiveType: 'multi_statement',
    questionEn: 'With reference to the Lok Sabha Speaker, consider the following statements:\n1. As per the Rules of Procedure and Conduct of Business in Lok Sabha, the election of the Speaker shall be held on such date as the President may fix.\n2. The Speaker may be removed from office by a resolution of the House of the People passed by a majority of all the then members of the House.\nWhich of the statements given above is/are correct?',
    questionGu: 'લોકસભાના અધ્યક્ષ (સ્પીકર) ના સંદર્ભમાં નીચેના વિધાનો ધ્યાને લો:\n૧. લોકસભાના કાર્ય સંચાલન નિયમો મુજબ, સ્પીકરની ચૂંટણી રાષ્ટ્રપતિ દ્વારા નક્કી કરવામાં આવેલી તારીખે યોજાશે.\n૨. લોકસભાના સ્પીકરને તે સમયના તમામ સભ્યોની બહુમતી (ઇફેક્ટિવ બહુમતી) દ્વારા પસાર કરાયેલા ઠરાવથી પદ પરથી દૂર કરી શકાય છે.\nઉપર્યુક્ત પૈકી કયું/કયા વિધાન સાચું/સાચાં છે?',
    options: [
      { id: 'opt-a', textEn: '1 only', textGu: 'માત્ર ૧', isCorrect: false, whyWrongEn: 'Statement 2 is also correct under Article 94(c).' },
      { id: 'opt-b', textEn: '2 only', textGu: 'માત્ર ૨', isCorrect: false, whyWrongEn: 'Statement 1 is also correct under Lok Sabha Rule 7.' },
      { id: 'opt-c', textEn: 'Both 1 and 2', textGu: '૧ અને ૨ બંને', isCorrect: true },
      { id: 'opt-d', textEn: 'Neither 1 nor 2', textGu: 'ન તો ૧ ન તો ૨', isCorrect: false, whyWrongEn: 'Both statements are factually accurate.' }
    ],
    explanationEn: 'Under Rule 7 of the Rules of Procedure and Conduct of Business in Lok Sabha, the election date of the Speaker is fixed by the President. Under Article 94(c), the Speaker can be removed by a resolution passed by a majority of all the then members of the Lok Sabha (Effective Majority). Hence, both statements are correct.',
    explanationGu: 'લોકસભાના નિયમ ૭ મુજબ સ્પીકરની ચૂંટણીની તારીખ રાષ્ટ્રપતિ નક્કી કરે છે. અનુચ્છેદ ૯૪(c) મુજબ સ્પીકરને હોદ્દા પરથી દૂર કરવા માટે લોકસભાના તત્કાલીન તમામ સભ્યોની બહુમતી (ઇફેક્ટિવ મેજોરિટી) જરૂરી છે. આથી બંને વિધાનો સત્ય છે.',
    sourceConceptEn: 'Polity -> Parliament -> Speaker Election & Removal',
    sourceConceptGu: 'બંધારણ -> સંસદ -> સ્પીકરની ચૂંટણી અને હોદ્દા પરથી મુક્તિ'
  },
  {
    id: 'upsc-2024-q2',
    topicId: 'topic-a1',
    examAgency: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2024',
    examYear: 2024,
    paperType: 'Prelims GS-1',
    subject: 'polity',
    cognitiveType: 'multi_statement',
    questionEn: 'With reference to the 106th Constitutional Amendment Act, 2023 (Nari Shakti Vandan Adhiniyam), consider the following statements:\n1. It reserves one-third of all seats for women in the Lok Sabha and State Legislative Assemblies.\n2. The reservation will come into effect immediately after the commencement of the Act without requiring census or delimitation.\nWhich of the statements given above is/are correct?',
    questionGu: '૧૦૬મા બંધારણીય સુધારા અધિનિયમ, ૨૦૨૩ (નારી શક્તિ વંદન અધિનિયમ) ના સંદર્ભમાં નીચેના વિધાનો ધ્યાને લો:\n૧. તે લોકસભા અને રાજ્ય વિધાનસભાઓમાં મહિલાઓ માટે એક તૃતીયાંશ (૧/૩) બેઠકો અનામત રાખે છે.\n૨. આ અનામત વસ્તી ગણતરી કે સીમાંકન (Delimitation) ની રાહ જોયા વગર અધિનિયમ અમલમાં આવતાં જ તાત્કાલિક લાગુ થશે.\nઉપર્યુક્ત પૈકી કયું/કયા વિધાન સાચું/સાચાં છે?',
    options: [
      { id: 'opt-a', textEn: '1 only', textGu: 'માત્ર ૧', isCorrect: true },
      { id: 'opt-b', textEn: '2 only', textGu: 'માત્ર ૨', isCorrect: false, whyWrongEn: 'Statement 2 is wrong: The Act explicitly specifies that reservation shall take effect after an exercise of delimitation is undertaken based on the relevant figures of the first Census conducted after the commencement of this Act.' },
      { id: 'opt-c', textEn: 'Both 1 and 2', textGu: '૧ અને ૨ બંને', isCorrect: false, whyWrongEn: 'Statement 2 is incorrect regarding immediate implementation.' },
      { id: 'opt-d', textEn: 'Neither 1 nor 2', textGu: 'ન તો ૧ ન તો ૨', isCorrect: false, whyWrongEn: 'Statement 1 is the core provision of the 106th Amendment Act (Articles 330A, 332A).' }
    ],
    explanationEn: 'Statement 1 is correct: The Act inserts Articles 330A and 332A providing 33% (1/3rd) horizontal reservation for women in Lok Sabha, State Legislative Assemblies, and Delhi Assembly. Statement 2 is incorrect because Article 334A states the reservation shall take effect only after delimitation is undertaken based on the first Census conducted after the Act.',
    explanationGu: 'વિધાન ૧ સાચું છે: આ સુધારા દ્વારા લોકસભા, વિધાનસભાઓ અને દિલ્હી વિધાનસભામાં મહિલાઓ માટે ૩૩% (૧/૩) બેઠકો અનામત રાખવાની જોગવાઈ કરાઈ છે. વિધાન ૨ ખોટું છે: કલમ ૩૩૪A મુજબ આ અનામત અધિનિયમ પછી યોજાનારી પ્રથમ વસ્તી ગણતરી અને ત્યારપછીના સીમાંકન (Delimitation) પછી જ અમલમાં આવશે. તેથી માત્ર ૧ સાચું છે.',
    sourceConceptEn: 'Polity -> Constitutional Amendments -> 106th Amendment (Women Reservation)',
    sourceConceptGu: 'બંધારણ -> બંધારણીય સુધારાઓ -> ૧૦૬મો સુધારો (મહિલા અનામત)'
  },
  {
    id: 'upsc-2024-q3',
    topicId: 'topic-f3',
    examAgency: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2024',
    examYear: 2024,
    paperType: 'Prelims GS-1',
    subject: 'economy',
    cognitiveType: 'conceptual',
    questionEn: 'With reference to Sovereign Green Bonds (SGrBs) issued in India, consider the following statements:\n1. The proceeds from these bonds are exclusively used for public sector projects that foster green infrastructure and reduce carbon intensity.\n2. The interest earned and capital gains on Sovereign Green Bonds are completely exempt from Income Tax in India.\nWhich of the statements given above is/are correct?',
    questionGu: 'ભારતમાં બહાર પાડવામાં આવતા સોવરેન ગ્રીન બોન્ડ્સ (SGrBs) ના સંદર્ભમાં નીચેના વિધાનો ધ્યાને લો:\n૧. આ બોન્ડ્સમાંથી મળેલ રકમનો ઉપયોગ માત્ર જાહેર ક્ષેત્રના એવા પ્રોજેક્ટ્સ માટે જ થાય છે જે ગ્રીન ઇન્ફ્રાસ્ટ્રક્ચર વધારે અને કાર્બન ઉત્સર્જન ઘટાડે છે.\n૨. સોવરેન ગ્રીન બોન્ડ્સ પર મળતું વ્યાજ અને કેપિટલ ગેઈન ભારતમાં ઇન્કમ ટેક્સમાંથી સંપૂર્ણપણે મુક્ત છે.\nઉપર્યુક્ત પૈકી કયું/કયા વિધાન સાચું/સાચાં છે?',
    options: [
      { id: 'opt-a', textEn: '1 only', textGu: 'માત્ર ૧', isCorrect: true },
      { id: 'opt-b', textEn: '2 only', textGu: 'માત્ર ૨', isCorrect: false, whyWrongEn: 'Statement 2 is false: Sovereign Green Bonds carry standard tax treatment like ordinary Government Securities (G-Secs); interest is taxable.' },
      { id: 'opt-c', textEn: 'Both 1 and 2', textGu: '૧ અને ૨ બંને', isCorrect: false, whyWrongEn: 'Tax exemption is a classic exam distractor.' },
      { id: 'opt-d', textEn: 'Neither 1 nor 2', textGu: 'ન તો ૧ ન તો ૨', isCorrect: false, whyWrongEn: 'Statement 1 is accurate per the Ministry of Finance Green Bond Framework.' }
    ],
    explanationEn: 'Statement 1 is correct: Sovereign Green Bonds raise funds for environmentally sustainable projects defined under the Sovereign Green Bond Framework (solar, wind, afforestation, clean transportation). Statement 2 is incorrect: The Ministry of Finance clarified that SGrBs have no special tax exemption; interest earned is taxable under the Income Tax Act.',
    explanationGu: 'વિધાન ૧ સાચું છે: ગ્રીન બોન્ડ્સમાંથી એકત્ર કરાયેલા ભંડોળનો ઉપયોગ સૌર ઊર્જા, પવન ઊર્જા અને ગ્રીન ટ્રાન્સપોર્ટ જેવા પર્યાવરણીય પ્રોજેક્ટ્સ માટે જ થાય છે. વિધાન ૨ ખોટું છે: સામાન્ય સરકારી જામીનગીરીઓ (G-Secs) ની જેમ સોવરેન ગ્રીન બોન્ડ્સના વ્યાજ પર કોઈ વિશેષ કરમુક્તિ (Tax Exemption) ઉપલબ્ધ નથી.',
    sourceConceptEn: 'Economy -> Public Finance -> Sovereign Green Bonds & ESG',
    sourceConceptGu: 'અર્થતંત્ર -> જાહેર નાણાં -> સોવરેન ગ્રીન બોન્ડ્સ'
  },
  {
    id: 'upsc-2024-q4',
    topicId: 'topic-f3',
    examAgency: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2024',
    examYear: 2024,
    paperType: 'Prelims GS-1',
    subject: 'geography',
    cognitiveType: 'conceptual',
    questionEn: 'Why does pumice (ચિચોળિયો/પ્યુમિસ પથ્થર), a type of volcanic igneous rock, float on water?',
    questionGu: 'જ્વાળામુખીય અગ્નિકૃત ખડક પ્યુમિસ (Pumice) પાણી પર કેમ તરે છે?',
    options: [
      { id: 'opt-a', textEn: 'It has a chemical composition identical to ice', textGu: 'તેનું રાસાયણિક બંધારણ બરફ જેવું હોય છે', isCorrect: false, whyWrongEn: 'Pumice is composed of silicate glass, not frozen water.' },
      { id: 'opt-b', textEn: 'Rapid depressurization during volcanic eruption traps gaseous bubbles within solidified froth, making its bulk density lower than water', textGu: 'જ્વાળામુખી વિસ્ફોટ દરમિયાન વાયુના પરપોટા અંદર પુરાઈ જતાં તેમાં છિદ્રાળુ ફીણ જેવી રચના બને છે, જેથી તેની ઘનતા પાણી કરતાં ઘટી જાય છે', isCorrect: true },
      { id: 'opt-c', textEn: 'It reacts with water to release hydrogen gas which creates buoyancy', textGu: 'તે પાણી સાથે પ્રક્રિયા કરીને હાઇડ્રોજન વાયુ મુક્ત કરે છે', isCorrect: false, whyWrongEn: 'Pumice is chemically inert in water.' },
      { id: 'opt-d', textEn: 'It contains magnetic repulsion minerals against water molecules', textGu: 'તે પાણીના અણુઓ સામે ચુંબકીય અપાકર્ષણ ધરાવે છે', isCorrect: false, whyWrongEn: 'Absurd distractor.' }
    ],
    explanationEn: 'Pumice forms when extremely hot, highly pressurized magma is ejected violently from a volcano. The sudden release of pressure causes dissolved gases to expand rapidly, forming a solidified frothy matrix full of interconnected vesicles (pores). This spongy vesicular texture gives it a bulk density less than 1.0 g/cm³, allowing it to float.',
    explanationGu: 'પ્યુમિસ ત્યારે બને છે જ્યારે જ્વાળામુખી વિસ્ફોટ સમયે ઊંચા દબાણવાળા મેગ્મામાંથી ઓગળેલા વાયુઓ ઝડપથી છૂટા પડે છે. આ પરપોટા ઠરી જતાં ખડક અત્યંત છિદ્રાળુ (Vesicular) બની જાય છે. પરિણામે તેની ઘનતા પાણીની ઘનતા કરતાં ઓછી થઈ જાય છે અને તે પાણી પર તરવા લાગે છે.',
    sourceConceptEn: 'Geography -> Geomorphology -> Igneous Rocks & Volcanism',
    sourceConceptGu: 'ભૂગોળ -> ભૂરચનાશાસ્ત્ર -> જ્વાળામુખીય ખડકો અને પ્યુમિસ'
  },
  {
    id: 'upsc-2024-q5',
    topicId: 'topic-f1',
    examAgency: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2024',
    examYear: 2024,
    paperType: 'Prelims GS-1',
    subject: 'geography',
    cognitiveType: 'multi_statement',
    questionEn: 'Which of the following bodies of water connects the Red Sea to the Gulf of Aden and the Arabian Sea?',
    questionGu: 'નીચેના પૈકી કઈ સામુદ્રધુની (Strait) લાલ સમુદ્ર (Red Sea) ને એડનની ખાડી (Gulf of Aden) અને અરબી સમુદ્ર સાથે જોડે છે?',
    options: [
      { id: 'opt-a', textEn: 'Strait of Hormuz', textGu: 'હોર્મુઝની સામુદ્રધુની', isCorrect: false, whyWrongEn: 'Strait of Hormuz connects the Persian Gulf with the Gulf of Oman.' },
      { id: 'opt-b', textEn: 'Bab-el-Mandeb Strait', textGu: 'બાબ-અલ-મંદેબ સામુદ્રધુની', isCorrect: true },
      { id: 'opt-c', textEn: 'Bosphorus Strait', textGu: 'બોસ્ફોરસ સામુદ્રધુની', isCorrect: false, whyWrongEn: 'Bosphorus connects the Black Sea to the Sea of Marmara.' },
      { id: 'opt-d', textEn: 'Strait of Malacca', textGu: 'મલાક્કાની સામુદ્રધુની', isCorrect: false, whyWrongEn: 'Connects the Indian Ocean to the South China Sea.' }
    ],
    explanationEn: 'Bab-el-Mandeb ("Gate of Tears") is a crucial maritime chokepoint between the Arabian Peninsula (Yemen) and the Horn of Africa (Djibouti and Eritrea). It connects the Red Sea to the Gulf of Aden and the Indian Ocean, and was in international news due to geopolitical maritime security incidents.',
    explanationGu: 'બાબ-અલ-મંદેબ સામુદ્રધુની યમન (અરબ દ્વીપકલ્પ) અને જીબુટી-એરિટ્રિયા (આફ્રિકા) વચ્ચે આવેલી છે, જે લાલ સમુદ્રને એડનની ખાડી અને અરબી સમુદ્ર સાથે જોડે છે. આ વૈશ્વિક વેપાર અને સુએઝ કેનાલ તરફ જતા જહાજો માટે વ્યૂહાત્મક ચોકપોઇન્ટ છે.',
    sourceConceptEn: 'Geography -> World Geography -> Strategic Straits & Maritime Corridors',
    sourceConceptGu: 'ભૂગોળ -> વિશ્વ ભૂગોળ -> વ્યૂહાત્મક સામુદ્રધુનીઓ અને બાબ-અલ-મંદેબ'
  },
  {
    id: 'upsc-2024-q6',
    topicId: 'topic-f2',
    examAgency: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2024',
    examYear: 2024,
    paperType: 'Prelims GS-1',
    subject: 'polity',
    cognitiveType: 'conceptual',
    questionEn: 'Consider the following statements regarding the Proclamation of National Emergency under Article 352 of the Indian Constitution:\n1. A proclamation of emergency must be approved by both Houses of Parliament within one month from the date of its issue.\n2. The resolution approving the proclamation must be passed by a special majority in either House.\nWhich of the statements given above is/are correct?',
    questionGu: 'ભારતીય બંધારણના અનુચ્છેદ ૩૫૨ હેઠળ રાષ્ટ્રીય કટોકટીની ઉદ્ઘોષણા સંદર્ભે નીચેના વિધાનો ધ્યાને લો:\n૧. કટોકટીની ઉદ્ઘોષણા બહાર પાડ્યાની તારીખથી એક મહિનાની અંદર સંસદના બંને ગૃહો દ્વારા માન્ય થવી અનિવાર્ય છે.\n૨. ઉદ્ઘોષણાને મંજૂરી આપતો ઠરાવ બંને ગૃહોમાં વિશેષ બહુમતી (Special Majority) થી પસાર થવો જરૂરી છે.\nઉપર્યુક્ત પૈકી કયું/કયા વિધાન સાચું/સાચાં છે?',
    options: [
      { id: 'opt-a', textEn: '1 only', textGu: 'માત્ર ૧', isCorrect: false, whyWrongEn: 'Statement 2 is also correct as per the 44th Constitutional Amendment Act 1978.' },
      { id: 'opt-b', textEn: '2 only', textGu: 'માત્ર ૨', isCorrect: false, whyWrongEn: 'Statement 1 is also correct under Article 352(4).' },
      { id: 'opt-c', textEn: 'Both 1 and 2', textGu: '૧ અને ૨ બંને', isCorrect: true },
      { id: 'opt-d', textEn: 'Neither 1 nor 2', textGu: 'ન તો ૧ ન તો ૨', isCorrect: false, whyWrongEn: 'Both statements are exact constitutional provisions.' }
    ],
    explanationEn: 'The 44th Amendment Act 1978 reduced the approval period from two months to one month (Article 352(4)) and introduced the requirement that the approval resolution must be passed by a Special Majority (majority of the total membership of that House and by a majority of not less than two-thirds of the members present and voting). Hence both are correct.',
    explanationGu: '૪૪મા બંધારણીય સુધારા ૧૯૭૮ દ્વારા કટોકટીની મંજૂરીનો સમયગાળો ૨ મહિનાથી ઘટાડીને ૧ મહિનો કરવામાં આવ્યો હતો (અનુચ્છેદ ૩૫૨(૪)), અને સામાન્ય બહુમતીને બદલે બંને ગૃહોમાં વિશેષ બહુમતી (કુલ સભ્ય સંખ્યાની બહુમતી + હાજર રહી મતદાન કરનારાની ૨/૩ બહુમતી) ફરજિયાત બનાવવામાં આવી હતી. આથી બંને વિધાનો સાચાં છે.',
    sourceConceptEn: 'Polity -> Emergency Provisions -> Article 352 Parliamentary Approval',
    sourceConceptGu: 'બંધારણ -> કટોકટીની જોગવાઈઓ -> અનુચ્છેદ ૩૫૨ અને સંસદીય મંજૂરી'
  },
  {
    id: 'upsc-2024-q7',
    topicId: 'topic-f3',
    examAgency: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2024',
    examYear: 2024,
    paperType: 'Prelims GS-1',
    subject: 'current_affairs',
    cognitiveType: 'conceptual',
    questionEn: 'Which of the following countries recently became the 31st and 32nd members of the North Atlantic Treaty Organization (NATO)?',
    questionGu: 'તાજેતરમાં નીચેના પૈકી કયા દેશો ઉત્તર એટલાન્ટિક સંધિ સંગઠન (NATO) ના ૩૧મા અને ૩૨મા સભ્ય દેશ બન્યા છે?',
    options: [
      { id: 'opt-a', textEn: 'Ukraine and Georgia', textGu: 'યુક્રેન અને જ્યોર્જિયા', isCorrect: false, whyWrongEn: 'Neither has achieved full NATO accession.' },
      { id: 'opt-b', textEn: 'Finland and Sweden', textGu: 'ફિનલેન્ડ અને સ્વીડન', isCorrect: true },
      { id: 'opt-c', textEn: 'Austria and Switzerland', textGu: 'ઓસ્ટ્રિયા અને સ્વિટ્ઝર્લેન્ડ', isCorrect: false, whyWrongEn: 'Both maintain permanent neutral status.' },
      { id: 'opt-d', textEn: 'Cyprus and Malta', textGu: 'સાયપ્રસ અને માલ્ટા', isCorrect: false, whyWrongEn: 'Non-NATO members.' }
    ],
    explanationEn: 'Following the Russia-Ukraine conflict, Finland officially joined NATO in April 2023 as the 31st member, followed by Sweden in March 2024 as the 32nd member, marking a historic end to their long-standing military non-alignment policies.',
    explanationGu: 'રશિયા-યુક્રેન યુદ્ધ બાદ ફિનલેન્ડ એપ્રિલ ૨૦૨૩ માં નાટોનું ૩૧મું અને સ્વીડન માર્ચ ૨૦૨૪ માં ૩૨મું સભ્ય બન્યું. આ સાથે બંને નોર્ડિક દેશોની દાયકાઓ જૂની સૈન્ય તટસ્થતા (Military Non-alignment) નો અંત આવ્યો.',
    sourceConceptEn: 'International Relations -> Global Treaties -> NATO Expansion',
    sourceConceptGu: 'આંતરરાષ્ટ્રીય સંબંધો -> વૈશ્વિક સંગઠનો -> નાટો વિસ્તરણ'
  },
  {
    id: 'upsc-2024-q8',
    topicId: 'topic-gh1',
    examAgency: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2024',
    examYear: 2024,
    paperType: 'Prelims GS-1',
    subject: 'history',
    cognitiveType: 'factual',
    questionEn: 'Rani Durgavati, whose 500th birth anniversary was commemorated nationally, was the valiant queen regent of which historical kingdom?',
    questionGu: 'રાણી દુર્ગાવતી, જેમની ૫૦૦મી જન્મજયંતિ રાષ્ટ્રીય સ્તરે ઉજવવામાં આવી, તેઓ કયા ઐતિહાસિક સામ્રાજ્યના શૂરવીર રાજમાતા/શાસક હતા?',
    options: [
      { id: 'opt-a', textEn: 'Garha-Katanga (Gondwana)', textGu: 'ગઢા-કટંગા (ગોંડવાના)', isCorrect: true },
      { id: 'opt-b', textEn: 'Ahom Kingdom', textGu: 'અહોમ સામ્રાજ્ય (આસામ)', isCorrect: false, whyWrongEn: 'Ahom dynasty was ruled by monarchs like Sukaphaa and Lachit Borphukan.' },
      { id: 'opt-c', textEn: 'Kakatiya Kingdom', textGu: 'કાકતીય સામ્રાજ્ય (વારંગલ)', isCorrect: false, whyWrongEn: 'Rudrama Devi was the famous queen of Kakatiya.' },
      { id: 'opt-d', textEn: 'Maratha Kingdom of Thanjavur', textGu: 'તંજાવુરનું મરાઠા રાજ્ય', isCorrect: false, whyWrongEn: 'Governed by Venkoji and his successors.' }
    ],
    explanationEn: 'Rani Durgavati (born in the Chandela dynasty) was married to Dalpat Shah, ruler of Garha-Katanga (Gondwana kingdom in modern Madhya Pradesh). After her husband’s demise, she acted as regent for her minor son Bir Narayan and bravely fought against Mughal Emperor Akbar’s general Asaf Khan in 1564.',
    explanationGu: 'રાણી દુર્ગાવતી ચંદેલ રાજપૂત રાજકુમારી હતા અને ગઢા-કટંગા (ગોંડવાના, મધ્યપ્રદેશ) ના શાસક દલપત શાહ સાથે પરણ્યા હતા. પતિના અવસાન બાદ સગીર પુત્ર વીર નારાયણના નામે શાસન સંભાળ્યું અને ૧૫૬૪ માં મુઘલ સેનાપતિ આસફ ખાન સામે લડતાં શહીદ થયા.',
    sourceConceptEn: 'Medieval Indian History -> Regional Dynasties -> Rani Durgavati & Gondwana',
    sourceConceptGu: 'મધ્યકાલીન ભારતનો ઇતિહાસ -> ગોંડવાના અને રાણી દુર્ગાવતી'
  }
];
