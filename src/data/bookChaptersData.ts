import { BookChapter } from '@/types/books';

export const BOOK_CHAPTERS_BY_BOOK_ID: Record<string, BookChapter[]> = {
  // =========================================================================
  // 1. NCERT THEMES IN INDIAN HISTORY (PART I, II & III)
  // =========================================================================
  'ncert-history-themes': [
    {
      id: 'ncert-hist-ch1',
      bookId: 'ncert-history-themes',
      chapterNumber: 1,
      partLabelEn: 'Part I — Ancient Indian History (115 Pages · 4 Chapters)',
      partLabelGu: 'ભાગ ૧ — પ્રાચીન ભારતીય ઇતિહાસ (૧૧૫ પાના · ૪ પ્રકરણ)',
      titleEn: 'Theme 1: Bricks, Beads and Bones (The Harappan Civilisation)',
      titleGu: 'પ્રકરણ ૧: ઈંટો, મણકા અને અસ્થિઓ (હડપ્પીય સભ્યતા)',
      readingTimeMinutes: 12,
      sourceAttribution: 'NCERT Class 12 Themes in Indian History — Part I (Official Open Textbook)',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/lehs101.pdf',
      sections: [
        {
          id: 'ncert-hist-ch1-s1',
          headingEn: '1.1 Urban Planning, Mohenjodaro & Gujarat Harappan Sites',
          headingGu: '૧.૧ નગર આયોજન, મોહેંજોદડો અને ગુજરાતના હડપ્પીય સ્થળો',
          bodyEn:
            'The Mature Harappan culture (c. 2600–1900 BCE) is renowned for planned urban centres divided into two distinct sections: a smaller, higher Citadel and a larger, lower town. Streets and lanes were laid out along an approximate grid pattern, intersecting at right angles. Every house had at least one wall along a street so domestic wastewater could flow directly into covered brick drains lined with mortar and gypsum. In Gujarat, Dholavira (Kutch) stands out with its unique three-part division (Citadel, Middle Town, Lower Town) and monumental stone-lined water reservoirs, while Lothal (Bhal region) functioned as a crucial maritime port with an engineered tidal brick dockyard and bead-making factory.',
          bodyGu:
            'પરિપક્વ હડપ્પીય સંસ્કૃતિ (આશરે ઈ.પૂ. ૨૬૦૦–૧૯૦૦) તેના સુનિયોજિત નગર આયોજન માટે પ્રસિદ્ધ છે, જે ઊંચાઈ પર આવેલ નાનો ગઢ (Citadel) અને વિશાળ નીચલા નગર એમ બે ભાગમાં વહેંચાયેલું હતું. શેરીઓ અને રસ્તાઓ ગ્રીડ પદ્ધતિ (Grid Pattern) મુજબ એકબીજાને કાટખૂણે છેદતા હતા. ગુજરાતમાં કચ્છના ધોળાવીરામાં નગરનું ત્રણ સ્તરીય વિભાજન (ગઢ, મધ્ય નગર અને નીચલું નગર) તથા પથ્થરના વિશાળ જળાશયો મળી આવ્યા છે, જ્યારે લોથલ ખાતે ઈંટોની બનેલી ભરતી-ઓટ આધારિત ગોદી (Dockyard) અને મણકા બનાવવાના કારખાના હતા.',
          keyTerms: ['Grid Pattern', 'Citadel', 'Dholavira Reservoirs', 'Lothal Dockyard'],
        },
        {
          id: 'ncert-hist-ch1-s2',
          headingEn: '1.2 Craft Production, Trade Networks & Standardised Weights',
          headingGu: '૧.૨ હસ્તકલા ઉત્પાદન, વેપાર વ્યવસ્થા અને પ્રમાણિત તોલમાપ',
          bodyEn:
            'Chanhudaro was almost exclusively devoted to craft production, including bead-making (using carnelian, jasper, crystal, steatite), shell-cutting, metal-working, and seal-making. Coastal settlements like Nageshwar and Balakot (near the Gujarat/Sindh coast) were specialised centres for shell objects like bangles and ladles. Long-distance exchanges reached Oman (Magan) for copper and Mesopotamia (Meluhha). Exchanges were regulated by precise cubical chert weights without markings: lower denominations were binary (1, 2, 4, 8, 16, 32...) while higher denominations followed the decimal system.',
          bodyGu:
            'ચન્હુદડો લગભગ સંપૂર્ણપણે મણકા બનાવવા (કાર્નેલિયન, સ્ટીટાઈટ, સ્ફટિક), શંખ-કામ, ધાતુકામ અને મુદ્રા બનાવવા જેવા હસ્તકલા ઉદ્યોગો માટે જાણીતું હતું. ગુજરાત નજીક નાગેશ્વર અને બાલાકોટ શંખની વસ્તુઓના વિશિષ્ટ કેન્દ્રો હતા. ઓમાન (મગન) અને મેસોપોટેમિયા (મેલુહા) સાથે દરિયાઈ વેપાર થતો હતો. વ્યાપારિક વ્યવહારો માટે ચર્ટ (Chert) પથ્થરના ઘનાકાર તોલમાપ વપરાતા હતા, જેમાં નાના એકમો દ્વિ-આધારી (1, 2, 4, 8, 16...) અને મોટા એકમો દશાંશ પદ્ધતિમાં હતા.',
          keyTerms: ['Carnelian Beads', 'Nageshwar', 'Meluhha', 'Chert Weights'],
        },
      ],
      summaryPointsEn: [
        'Dholavira (Rann of Kutch) features a three-tier layout and advanced rainwater harvesting reservoirs.',
        'Lothal served as the premier Harappan bead-making and maritime dockyard centre in Gujarat.',
        'Harappan seals were predominantly carved from steatite and carried an undeciphered script of ~375–400 signs.',
      ],
      summaryPointsGu: [
        'ધોળાવીરામાં ત્રણ સ્તરીય નગર રચના અને વરસાદી જળ સંગ્રહ માટે અદ્યતન જળાશયો હતા.',
        'લોથલ ગુજરાતનું મુખ્ય દરિયાઈ બંદર અને મણકા ઉદ્યોગનું કેન્દ્ર હતું.',
        'હડપ્પીય મુદ્રાઓ મુખ્યત્વે સ્ટીટાઈટ પથ્થરની બનેલી હતી.',
      ],
    },
    {
      id: 'ncert-hist-ch2',
      bookId: 'ncert-history-themes',
      chapterNumber: 2,
      partLabelEn: 'Part I — Ancient Indian History (115 Pages · 4 Chapters)',
      partLabelGu: 'ભાગ ૧ — પ્રાચીન ભારતીય ઇતિહાસ (૧૧૫ પાના · ૪ પ્રકરણ)',
      titleEn: 'Theme 2: Kings, Farmers and Towns (c. 600 BCE – 600 CE)',
      titleGu: 'પ્રકરણ ૨: રાજાઓ, ખેડૂતો અને નગરો (ઈ.પૂ. ૬૦૦ – ઈ.સ. ૬૦૦)',
      readingTimeMinutes: 11,
      sourceAttribution: 'NCERT Class 12 Themes in Indian History — Part I (Official Open Textbook)',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/lehs102.pdf',
      sections: [
        {
          id: 'ncert-hist-ch2-s1',
          headingEn: '2.1 Mahajanapadas, Magadha & Mauryan Epigraphy',
          headingGu: '૨.૧ મહાજનપદ, મગધ સામ્રાજ્ય અને મૌર્ય અભિલેખો',
          bodyEn:
            'The sixth century BCE marks a major turning point in early Indian history, associated with early states, cities, growing use of iron, and punch-marked coinage. Sixteen Mahajanapadas emerged, with Magadha becoming the most powerful due to fertile alluvial plains, iron mines in Jharkhand, elephants, and Ganga river communications. In the 1830s, James Prinsep deciphered Brahmi and Kharosthi scripts, unlocking Ashokan inscriptions mentioning "Devanampiya Piyadassi". In Gujarat, Ashoka’s 14 Major Rock Edicts at Girnar (Junagadh) and the Sudarshana Lake records of Rudradaman (150 CE) and Skandagupta (457 CE) provide direct statecraft evidence.',
          bodyGu:
            'ઈ.પૂ. છઠ્ઠી સદી પ્રાચીન ભારતીય ઇતિહાસમાં મહત્વપૂર્ણ વળાંક ગણાય છે, જેમાં લોખંડનો વધતો ઉપયોગ, આહત સિક્કાઓ અને ૧૬ મહાજનપદોનો ઉદય થયો. ઈ.સ. ૧૮૩૦ના દાયકામાં જેમ્સ પ્રિન્સેપે બ્રાહ્મી અને ખરોષ્ઠી લિપિ ઉકેલી અશોકના શિલાલેખો વાંચ્યા. ગુજરાતના જૂનાગઢ (ગિરનાર) ખાતે અશોકના ૧૪ મુખ્ય શિલાલેખો તેમજ રુદ્રદામન (ઈ.સ. ૧૫૦) અને સ્કંદગુપ્તના અભિલેખો સુદર્શન તળાવના ઇતિહાસનો સીધો પુરાવો આપે છે.',
          keyTerms: ['James Prinsep', 'Brahmi Script', 'Girnar Rock Edict', 'Sudarshana Lake'],
        },
      ],
      summaryPointsEn: [
        'James Prinsep deciphered Brahmi and Kharosthi in 1838, identifying King Piyadassi with Ashoka.',
        'Girnar Rock Edict at Junagadh contains inscriptions of Ashoka, Rudradaman I, and Skandagupta.',
        'Prashastis like Harishena’s Prayaga Prashasti document Gupta imperial polity.',
      ],
      summaryPointsGu: [
        '૧૮૩૮માં જેમ્સ પ્રિન્સેપે બ્રાહ્મી અને ખરોષ્ઠી લિપિ ઉકેલી.',
        'જૂનાગઢના ગિરનાર શિલાલેખમાં અશોક, રુદ્રદામન અને સ્કંદગુપ્ત ત્રણેયના લેખો છે.',
      ],
    },
    {
      id: 'ncert-hist-theme3',
      bookId: 'ncert-history-themes',
      chapterNumber: 3,
      partLabelEn: 'Part I — Ancient Indian History (115 Pages · 4 Chapters)',
      partLabelGu: 'ભાગ ૧ — પ્રાચીન ભારતીય ઇતિહાસ (૧૧૫ પાના · ૪ પ્રકરણ)',
      titleEn: 'Theme 3: Kinship, Caste and Class (Early Societies c. 600 BCE – 600 CE)',
      titleGu: 'પ્રકરણ ૩: બંધુત્વ, જાતિ અને વર્ગ (પ્રારંભિક સમાજ)',
      readingTimeMinutes: 10,
      sourceAttribution: 'NCERT Class 12 Themes in Indian History — Part I (Original Sankalp Study Guide)',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/lehs103.pdf',
      sections: [
        {
          id: 'ncert-hist-theme3-s1',
          headingEn: '3.1 Critical Edition of Mahabharata, Kinship Rules & Stridhana',
          headingGu: '૩.૧ મહાભારતની સમીક્ષિત આવૃત્તિ, કુટુંબ વ્યવસ્થા અને સ્ત્રીધન',
          bodyEn:
            'Between 1919 and 1966, Sanskritist V.S. Sukthankar led a team at the Bhandarkar Oriental Research Institute (Pune) to compile the Critical Edition of the Mahabharata spanning 13,000 pages by comparing manuscripts from Kashmir to Kerala. Dharmasutras and Dharmashastras (like Manusmriti) codified patriliny, eight forms of marriage, exogamy (gotra rules), and social categories (Varna vs Jati). While women generally did not hold independent claim over paternal land, Manusmriti recognised Stridhana — gifts received at marriage — as a woman’s exclusive property.',
          bodyGu:
            '૧૯૧૯ થી ૧૯૬૬ દરમિયાન વી.એસ. સુખટણકરના નેતૃત્વમાં મહાભારતની ૧૩,૦૦૦ પાનાની સમીક્ષિત આવૃત્તિ તૈયાર થઈ. ધર્મસૂત્રો અને મનુસ્મૃતિમાં પિતૃવંશીયતા, ગોત્ર નિયમો, વર્ણ-જાતિ વ્યવસ્થા અને સ્ત્રીધન (લગ્ન સમયે મળેલી ભેટ પર સ્ત્રીનો અધિકાર) જેવી સામાજિક વ્યવસ્થાઓનો ઉલ્લેખ મળે છે.',
          keyTerms: ['V.S. Sukthankar', 'Patriliny & Exogamy', 'Varna vs Jati', 'Stridhana'],
        },
      ],
      summaryPointsEn: [
        'V.S. Sukthankar’s Critical Edition showed both pan-Indian shared core verses and regional variations.',
        'Jatis multiplied as new occupational and forest groups integrated into Brahmanical society.',
      ],
      summaryPointsGu: [
        'મહાભારતની સમીક્ષિત આવૃત્તિએ સમગ્ર ભારતમાં વહેંચાયેલ સાંસ્કૃતિક સાતત્ય અને પ્રાદેશિક વિવિધતા દર્શાવી.',
      ],
    },
    {
      id: 'ncert-hist-theme4',
      bookId: 'ncert-history-themes',
      chapterNumber: 4,
      partLabelEn: 'Part I — Ancient Indian History (115 Pages · 4 Chapters)',
      partLabelGu: 'ભાગ ૧ — પ્રાચીન ભારતીય ઇતિહાસ (૧૧૫ પાના · ૪ પ્રકરણ)',
      titleEn: 'Theme 4: Thinkers, Beliefs and Buildings (Cultural Developments)',
      titleGu: 'પ્રકરણ ૪: વિચારકો, વિશ્વાસ અને ઇમારતો (સાંસ્કૃતિક વિકાસ)',
      readingTimeMinutes: 11,
      sourceAttribution: 'NCERT Class 12 Themes in Indian History — Part I (Original Sankalp Study Guide)',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/lehs104.pdf',
      sections: [
        {
          id: 'ncert-hist-theme4-s1',
          headingEn: '4.1 Stupas at Sanchi, Jain Philosophy & Mahayana Buddhism',
          headingGu: '૪.૧ સાંચી સ્તૂપ, જૈન દર્શન અને મહાયાન બૌદ્ધ ધર્મ',
          bodyEn:
            'The mid-first millennium BCE witnessed intense intellectual ferment led by Mahavira (24th Jain Tirthankara) and Siddhartha Gautama (Buddha). Jainism taught that the entire world is animated (even stones and water possess life) and emphasized Ahimsa, non-stealing, and ascetic liberation. Buddhist sanghas recorded teachings in the Tripitaka (Vinaya, Sutta, Abhidhamma Pitakas). Structurally, Stupas (like Sanchi preserved by Begums of Bhopal) comprise a hemispherical Anda dome, square Harmika balcony, central Yashti mast with Chhatri umbrella, and carved Torana gateways. Later Mahayana introduced Bodhisattva veneration alongside Hinayana/Theravada.',
          bodyGu:
            'ઈ.પૂ. પ્રથમ સહસ્રાબ્દીમાં મહાવીર સ્વામી (૨૪મા તીર્થંકર) અને ગૌતમ બુદ્ધે અહિંસા અને કર્મના સિદ્ધાંતો આપ્યા. બૌદ્ધ ઉપદેશો ત્રિપિટક (વિનય, સુત્ત અને અભિધમ્મ પિટક) માં સંગ્રહિત છે. સાંચી જેવા સ્તૂપોમાં અંડ, હર્મિકા, યષ્ટિ, છત્ર અને તોરણ દ્વાર મુખ્ય અંગો છે.',
          keyTerms: ['Tripitaka', 'Sanchi Stupa', 'Bodhisattva', 'Begums of Bhopal'],
        },
      ],
      summaryPointsEn: [
        'Sanchi Stupa survived intact largely due to conservation grants by Shahjehan Begum and Sultan Jehan Begum of Bhopal.',
        'Mahayana Buddhism developed Buddha/Bodhisattva imagery, whereas Theravada upheld early monastic ideals.',
      ],
      summaryPointsGu: [
        'ભોપાલની બેગમોના આર્થિક સહયોગથી સાંચીનો સ્તૂપ સુરક્ષિત રહી શક્યો.',
      ],
    },
    {
      id: 'ncert-hist-theme5',
      bookId: 'ncert-history-themes',
      chapterNumber: 5,
      partLabelEn: 'Part II — Medieval Indian History (112 Pages · 4 Chapters)',
      partLabelGu: 'ભાગ ૨ — મધ્યકાલીન ભારતીય ઇતિહાસ (૧૧૨ પાના · ૪ પ્રકરણ)',
      titleEn: 'Theme 5: Through the Eyes of Travellers (10th – 17th Century)',
      titleGu: 'પ્રકરણ ૫: મુસાફરોની નજરે ભારત (૧૦મી – ૧૭મી સદી)',
      readingTimeMinutes: 10,
      sourceAttribution: 'NCERT Class 12 Themes in Indian History — Part II (Original Sankalp Study Guide)',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/lehs201.pdf',
      sections: [
        {
          id: 'ncert-hist-theme5-s1',
          headingEn: '5.1 Al-Biruni (Kitab-ul-Hind), Ibn Battuta (Rihla) & Francois Bernier',
          headingGu: '૫.૧ અલ-બિરુની (કિતાબ-ઉલ-હિંદ), ઇબ્ન બતૂતા (રિહલા) અને બર્નિયર',
          bodyEn:
            'Three foreign observers offer critical windows into medieval Indian society: (1) Al-Biruni (from Khwarizm, 11th century) wrote Kitab-ul-Hind in Arabic across 80 chapters using a rigorous geometric structure comparing Sanskrit texts and Indian philosophy; (2) Ibn Battuta (Moroccan globetrotter, 14th century) recorded Delhi Sultanate cities, efficient postal relays (Uluq horse-post & Dawa foot-post), and maritime ports like Khambhat in his Rihla; (3) French physician Francois Bernier (17th century) contrasted Mughal crown ownership of land with European private property, influencing Montesquieu’s "Oriental Despotism" thesis.',
          bodyGu:
            'મધ્યકાલીન ભારત અંગે ત્રણ વિદેશી મુસાફરોના વૃત્તાંત મહત્વપૂર્ણ છે: (૧) અલ-બિરુનીએ અરબીમાં "કિતાબ-ઉલ-હિંદ" લખી; (૨) ઇબ્ન બતૂતાએ "રિહલા" માં દિલ્હી સલ્તનતની ટપાલ વ્યવસ્થા (ઉલુક અને દાવા) તથા ખંભાત જેવા બંદરોનું વર્ણન કર્યું; (૩) ફ્રાંકોઇસ બર્નિયરે મુઘલ જમીન માલિકી અંગે "ટ્રાવેલ્સ ઇન ધ મુઘલ એમ્પાયર" લખ્યું.',
          keyTerms: ['Al-Biruni Kitab-ul-Hind', 'Ibn Battuta Rihla', 'Uluq & Dawa', 'Francois Bernier'],
        },
      ],
      summaryPointsEn: [
        'Ibn Battuta praised Delhi and Daulatabad as vibrant urban centres connected via rapid Uluq/Dawa postal relays.',
        'Bernier’s claim of zero private landownership in Mughal India was later refuted by Abu’l Fazl’s Ain-i-Akbari records.',
      ],
      summaryPointsGu: [
        'અલ-બિરુનીએ ભારતીય ગણિત, ખગોળ અને જાતિ વ્યવસ્થાનો તુલનાત્મક અભ્યાસ કર્યો.',
      ],
    },
    {
      id: 'ncert-hist-ch3',
      bookId: 'ncert-history-themes',
      chapterNumber: 6,
      partLabelEn: 'Part II — Medieval Indian History (112 Pages · 4 Chapters)',
      partLabelGu: 'ભાગ ૨ — મધ્યકાલીન ભારતીય ઇતિહાસ (૧૧૨ પાના · ૪ પ્રકરણ)',
      titleEn: 'Theme 6: Bhakti-Sufi Traditions (8th – 18th Century)',
      titleGu: 'પ્રકરણ ૬: ભક્તિ અને સૂફી પરંપરાઓ (૮મી થી ૧૮મી સદી)',
      readingTimeMinutes: 10,
      sourceAttribution: 'NCERT Class 12 Themes in Indian History — Part II (Original Sankalp Study Guide)',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/lehs202.pdf',
      sections: [
        {
          id: 'ncert-hist-ch3-s1',
          headingEn: '6.1 Saguna, Nirguna Bhakti & Gujarat Devotional Poets',
          headingGu: '૬.૧ સગુણ-નિર્ગુણ ભક્તિ અને ગુજરાતના સંત કવિઓ',
          bodyEn:
            'Historians classify Bhakti traditions into Saguna (worship of deities with attributes such as Shiva, Vishnu, Devi) and Nirguna (worship of an abstract formless God). Earlier Tamil poet-saints — Alvars (Vishnu devotees, Nalayira Divyaprabandham) and Nayanars (Shiva devotees) — democratised devotion using vernacular speech. In the twelfth century, Basavanna led the Virashaiva (Lingayat) movement in Karnataka challenging caste hierarchy. In Western India, Mirabai’s bhajans in Mewar/Dwarka and Narsinh Mehta’s Prabhatiyas in Junagadh anchored vernacular Krishna devotion, while Akho used sharp Chhappa verses to critique orthodoxy.',
          bodyGu:
            'ભક્તિ પરંપરાને સગુણ (મૂર્તિ અને સ્વરૂપ સહિત) અને નિર્ગુણ (નિરાકાર) એવા બે પ્રવાહોમાં વહેંચવામાં આવે છે. દક્ષિણ ભારતમાં અલ્વાર (વૈષ્ણવ) અને નયનાર (શૈવ) સંતોએ લોકભાષામાં ભક્તિનો પ્રચાર કર્યો. ગુજરાતમાં જૂનાગઢના આદિકવિ નરસિંહ મહેતાના પ્રભાતિયાં, મીરાંબાઈના પદો અને અખાના છપ્પાઓએ ભક્તિ અને સમાજ સુધારણાને લોકભોગ્ય બનાવ્યા.',
          keyTerms: ['Alvars & Nayanars', 'Virashaiva', 'Narsinh Mehta', 'Mirabai'],
        },
        {
          id: 'ncert-hist-ch3-s2',
          headingEn: '6.2 The Chishti Silsila & Khanqah Tradition',
          headingGu: '૬.૨ ચિશ્તી સિલસિલા અને ખાનકાહ પરંપરા',
          bodyEn:
            'Sufi mystics organised around khanqahs (hospices) led by a Shaikh or Pir. The Chishti order, established in India by Khwaja Moinuddin Chishti (Ajmer) and strengthened by Shaikh Nizamuddin Auliya (Delhi), emphasised austerity, communal langar (charity kitchen), and samā (devotional music/qawwali). Amir Khusrau composed Hindavi verses and pioneered Qawwali traditions bridging Persian and Indian cultural idioms.',
          bodyGu:
            'સૂફી સંતો ખાનકાહ (આશ્રમ) કેન્દ્રિત વ્યવસ્થામાં રહેતા હતા. ભારતમાં ખ્વાજા મોઈનુદ્દીન ચિશ્તી (અજમેર) અને નિઝામુદ્દીન ઓલિયાએ ચિશ્તી સિલસિલાને લોકપ્રિય બનાવ્યો, જેમાં લંગર, સાદગી અને સંગીત (સમા/કવ્વાલી) નું વિશેષ મહત્વ હતું. ગુજરાતમાં સરખેજ રોજા (શેખ અહમદ ખટ્ટુ ગંજબક્ષ) સૂફી પરંપરાનું મહત્વનું કેન્દ્ર રહ્યું છે.',
          keyTerms: ['Khanqah', 'Chishti Order', 'Nizamuddin Auliya', 'Amir Khusrau'],
        },
      ],
      summaryPointsEn: [
        'Alvars (Nalayira Divyaprabandham) and Nayanars spearheaded early Tamil Bhakti reform.',
        'Chishti Sufis practiced open-door langars and samā devotional music.',
        'Kabir, Guru Nanak, and Mirabai used vernacular idioms to challenge social hierarchy.',
      ],
      summaryPointsGu: [
        'દક્ષિણમાં અલ્વાર અને નયનાર સંતોએ લોકભાષામાં ભક્તિ આંદોલનની શરૂઆત કરી.',
        'ચિશ્તી સૂફી પરંપરાએ સાદગી, લંગર અને સર્વધર્મ સમભાવ પર ભાર મૂક્યો.',
      ],
    },
    {
      id: 'ncert-hist-ch4',
      bookId: 'ncert-history-themes',
      chapterNumber: 7,
      partLabelEn: 'Part II — Medieval Indian History (112 Pages · 4 Chapters)',
      partLabelGu: 'ભાગ ૨ — મધ્યકાલીન ભારતીય ઇતિહાસ (૧૧૨ પાના · ૪ પ્રકરણ)',
      titleEn: 'Theme 7: An Imperial Capital — Vijayanagara (14th – 16th Century)',
      titleGu: 'પ્રકરણ ૭: એક સામ્રાજ્યની રાજધાની: વિજયનગર (૧૪મી – ૧૬મી સદી)',
      readingTimeMinutes: 9,
      sourceAttribution: 'NCERT Class 12 Themes in Indian History — Part II (Original Sankalp Study Guide)',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/lehs203.pdf',
      sections: [
        {
          id: 'ncert-hist-ch4-s1',
          headingEn: '7.1 Amara-Nayaka System, Water Works & Hampi Architecture',
          headingGu: '૭.૧ અમર-નાયક વ્યવસ્થા, જળ સંચય અને હમ્પી સ્થાપત્ય',
          bodyEn:
            'Founded in 1336 by Harihara and Bukka, the Vijayanagara Empire reached its zenith under Krishnadevaraya (Tuluva dynasty, author of Amuktamalyada). Its distinctive military-administrative innovation was the Amara-nayaka system, inspired by the Delhi Sultanate iqta system, where military commanders governed territories, collected revenue, and maintained armed contingents. Because Hampi lies in an arid zone of the Tungabhadra basin, rulers constructed monumental reservoirs like Kamalapuram Tank and the Hiriya Canal. Sacred architecture featured towering Raya Gopurams and pillared Kalyanamandapas at the Virupaksha and Vitthala temples.',
          bodyGu:
            'ઈ.સ. ૧૩૩૬માં હરિહર અને બુક્કા દ્વારા સ્થપાયેલું વિજયનગર સામ્રાજ્ય કૃષ્ણદેવરાય (તુલુવ વંશ) ના શાસનમાં શિખર પર પહોંચ્યું. તેની વિશિષ્ટ લશ્કરી-વહીવટી પદ્ધતિ "અમર-નાયક વ્યવસ્થા" હતી, જે દિલ્હી સલ્તનતની ઇક્તા પદ્ધતિથી પ્રેરિત હતી. તુંગભદ્રા નદીના કિનારે આવેલા હમ્પીમાં કમલાપુરમ તળાવ અને હિરિયા નહેર જેવી જળ વ્યવસ્થા તથા વિઠ્ઠલ અને વિરુપાક્ષ મંદિરોના ભવ્ય રાય ગોપુરમ પ્રસિદ્ધ છે.',
          keyTerms: ['Krishnadevaraya', 'Amara-nayaka', 'Raya Gopuram', 'Colin Mackenzie'],
        },
      ],
      summaryPointsEn: [
        'Colin Mackenzie surveyed Hampi ruins in 1800 as the first Surveyor General of India.',
        'Amara-nayakas were military commanders granted territories in exchange for troops and tribute.',
      ],
      summaryPointsGu: [
        '૧૮૦૦માં કોલિન મેકેન્ઝીએ હમ્પીના અવશેષોનો પ્રથમ સર્વે તૈયાર કર્યો.',
        'કૃષ્ણદેવરાયે તેલુગુમાં "આમુક્તમાલ્યદા" ગ્રંથની રચના કરી.',
      ],
    },
    {
      id: 'ncert-hist-theme8',
      bookId: 'ncert-history-themes',
      chapterNumber: 8,
      partLabelEn: 'Part II — Medieval Indian History (112 Pages · 4 Chapters)',
      partLabelGu: 'ભાગ ૨ — મધ્યકાલીન ભારતીય ઇતિહાસ (૧૧૨ પાના · ૪ પ્રકરણ)',
      titleEn: 'Theme 8: Peasants, Zamindars and the State (Mughal Agrarian Society)',
      titleGu: 'પ્રકરણ ૮: ખેડૂતો, જમીનદારો અને રાજ્ય (મુઘલ કૃષિ સમાજ)',
      readingTimeMinutes: 10,
      sourceAttribution: 'NCERT Class 12 Themes in Indian History — Part II (Original Sankalp Study Guide)',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/lehs204.pdf',
      sections: [
        {
          id: 'ncert-hist-theme8-s1',
          headingEn: '8.1 Khud-Kashta, Pahi-Kashta, Ain-i-Akbari & Mansabdari',
          headingGu: '૮.૧ ખુદ-કાશ્ત, પાહી-કાશ્ત, આઇન-એ-અકબરી અને મનસબદારી',
          bodyEn:
            'Abu’l Fazl’s Ain-i-Akbari (third volume of Akbarnama) documents Mughal rural society across five books. Peasants were classified as Khud-kashta (resident cultivators cultivating their own village land) and Pahi-kashta (non-resident cultivators working elsewhere on contract). Commercial crops (Jins-i-kamil) such as cotton and sugarcane thrived alongside Kharif and Rabi harvests. Revenue assessment involved Jama (assessed demand) and Hasil (actual collection), payable in cash or kind (Kankut, Batai), while Zamindars retained hereditary milkiyat estates and armed militias.',
          bodyGu:
            'અબુલ ફઝલના "આઇન-એ-અકબરી" માં મુઘલ ગ્રામીણ અર્થતંત્રનું વિસ્તૃત વર્ણન મળે છે. ખેડૂતોમાં ખુદ-કાશ્ત (પોતાના ગામની જમીન ખેડતા) અને પાહી-કાશ્ત (બીજા ગામમાં જઈને ખેતી કરતા) બે વર્ગો હતા. કપાસ અને શેરડી જેવા રોકડિયા પાકોને "જિન્સ-એ-કામિલ" કહેવાતા. મહેસૂલમાં "જમા" (અંદાજિત રકમ) અને "હાસિલ" (વાસ્તવિક વસૂલાત) નો સમાવેશ થતો.',
          keyTerms: ['Ain-i-Akbari', 'Khud-kashta vs Pahi-kashta', 'Jins-i-kamil', 'Jama & Hasil'],
        },
      ],
      summaryPointsEn: [
        'Mansabdari combined Zat (personal rank/salary) and Sawar (cavalry contingent) under Akbar.',
        'Silver influx from global maritime trade stabilised Mughal silver Rupya currency.',
      ],
      summaryPointsGu: [
        'મનસબદારી પદ્ધતિમાં "જાત" (હોદ્દો/પગાર) અને "સવાર" (ઘોડેસવાર ટુકડી) બે આંક હતા.',
      ],
    },
    {
      id: 'ncert-hist-theme9',
      bookId: 'ncert-history-themes',
      chapterNumber: 9,
      partLabelEn: 'Part III — Modern Indian History (118 Pages · 4 Chapters)',
      partLabelGu: 'ભાગ ૩ — આધુનિક ભારત ઇતિહાસ (૧૧૮ પાના · ૪ પ્રકરણ)',
      titleEn: 'Theme 9: Colonialism and the Countryside (Official Archives)',
      titleGu: 'પ્રકરણ ૯: સંસ્થાનવાદ અને ગ્રામીણ સમાજ (સત્તાવાર દસ્તાવેજો)',
      readingTimeMinutes: 10,
      sourceAttribution: 'NCERT Class 12 Themes in Indian History — Part III (Original Sankalp Study Guide)',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/lehs301.pdf',
      sections: [
        {
          id: 'ncert-hist-theme9-s1',
          headingEn: '9.1 Permanent Settlement, Santhal Rebellion & Deccan Riots',
          headingGu: '૯.૧ કાયમી જમાબંધી, સંથાલ વિદ્રોહ અને દખ્ખણના રમખાણો',
          bodyEn:
            'Introduced by Charles Cornwallis in Bengal (1793), the Permanent Settlement fixed Zamindari revenue permanently with a rigid Sunset Law — causing widespread estate auctions (like Burdwan 1797) and the rise of rich village Jotedars. In the Rajmahal hills, conflicts pitted Paharias (hoe cultivation) against settled Santhals (plough agriculture), culminating in the Santhal Rebellion (1855–56) led by Sidhu and Kanhu. Later, in Western India under the Ryotwari system, soaring debt led peasants to burn sahukar debt bonds during the Deccan Riots of 1875 (documented by the Deccan Riots Commission).',
          bodyGu:
            '૧૭૯૩માં કોર્નવોલિસે બંગાળમાં કાયમી જમાબંધી અને સૂર્યાસ્ત કાયદો લાગુ કર્યો, જેનાથી "જોતદારો" નો પ્રભાવ વધ્યો. રાજમહલની ટેકરીઓમાં સિદ્ધુ અને કાન્હુના નેતૃત્વમાં ૧૮૫૫-૫૬નો સંથાલ વિદ્રોહ થયો. પશ્ચિમ ભારતમાં રૈયતવારી હેઠળ વધતા દેવા સામે ૧૮૭૫ના દખ્ખણના ખેડૂત રમખાણો થયા.',
          keyTerms: ['Sunset Law 1793', 'Jotedars', 'Santhal Hool 1855', 'Deccan Riots 1875'],
        },
      ],
      summaryPointsEn: [
        'Fifth Report (1813) submitted to British Parliament shaped early debates on East India Company rule.',
        'Limitation Law (1859) restricted moneylender loan bonds to 3 years, though frequently bypassed.',
      ],
      summaryPointsGu: [
        '૧૮૧૩નો પાંચમો અહેવાલ (Fifth Report) ઈસ્ટ ઇન્ડિયા કંપનીના વહીવટ પર મહત્વપૂર્ણ સંસદીય દસ્તાવેજ હતો.',
      ],
    },
    {
      id: 'ncert-hist-theme10',
      bookId: 'ncert-history-themes',
      chapterNumber: 10,
      partLabelEn: 'Part III — Modern Indian History (118 Pages · 4 Chapters)',
      partLabelGu: 'ભાગ ૩ — આધુનિક ભારત ઇતિહાસ (૧૧૮ પાના · ૪ પ્રકરણ)',
      titleEn: 'Theme 10: Rebels and the Raj (The Revolt of 1857)',
      titleGu: 'પ્રકરણ ૧૦: બળવાખોરો અને બ્રિટિશ રાજ (૧૮૫૭નો સંગ્રામ)',
      readingTimeMinutes: 11,
      sourceAttribution: 'NCERT Class 12 Themes in Indian History — Part III (Original Sankalp Study Guide)',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/lehs302.pdf',
      sections: [
        {
          id: 'ncert-hist-theme10-s1',
          headingEn: '10.1 Meerut Mutiny, Subsidiary Alliance of Awadh & Azamgarh Proclamation',
          headingGu: '૧૦.૧ મેરઠ સૈન્ય વિપ્લવ, અવધનો વિલય અને આઝમગઢ ઘોષણાપત્ર',
          bodyEn:
            'Triggered on 10 May 1857 at Meerut over Enfield rifle cartridges and deeper grievances, sepoys marched to Delhi proclaiming Mughal Emperor Bahadur Shah Zafar as leader. Key centres included Kanpur (Nana Sahib), Jhansi (Rani Lakshmibai), Arrah (Kunwar Singh), and Lucknow (Begum Hazrat Mahal, after Lord Dalhousie’s 1856 annexation of Awadh on charges of misgovernance). Rebel unity was articulated in the Azamgarh Proclamation (25 August 1857) calling Hindus and Muslims to unite against firingi raj. In Gujarat, Okhamandal Waghers (Jodha Manek, Mulu Manek), Kheda/Anand garasias, and Panchmahal Bhils sustained intense local resistance.',
          bodyGu:
            '૧૦ મે ૧૮૫૭ના રોજ મેરઠથી શરૂ થયેલા સૈન્ય વિપ્લવે દિલ્હી (બહાદુર શાહ ઝફર), કાનપુર (નાના સાહેબ), ઝાંસી (રાણી લક્ષ્મીબાઈ) અને લખનઉ (બેગમ હઝરત મહલ) માં વ્યાપક સ્વરૂપ લીધું. ૨૫ ઓગસ્ટ ૧૮૫૭ના આઝમગઢ ઘોષણાપત્રમાં હિન્દુ-મુસ્લિમ એકતાનું આહ્વાન કરાયું. ગુજરાતમાં ઓખામંડળના વાઘેરો (જોધા માણેક, મૂળુ માણેક), પંચમહાલ અને આણંદ પંથકમાં નોંધપાત્ર પ્રતિકાર થયો.',
          keyTerms: ['10 May 1857 Meerut', 'Awadh Annexation 1856', 'Azamgarh Proclamation', 'Okhamandal Waghers'],
        },
      ],
      summaryPointsEn: [
        'Awadh became the epicentre after Subsidiary Alliance (1801) and complete annexation (1856) displaced taluqdars and sepoys.',
        'Summary Trials and Relief of Lucknow paintings reflected British counter-insurgency propaganda.',
      ],
      summaryPointsGu: [
        '૧૮૫૬માં અવધના વિલય બાદ અવધ ૧૮૫૭ના સંગ્રામનું મુખ્ય કેન્દ્ર બન્યું.',
      ],
    },
    {
      id: 'ncert-hist-ch5',
      bookId: 'ncert-history-themes',
      chapterNumber: 11,
      partLabelEn: 'Part III — Modern Indian History (118 Pages · 4 Chapters)',
      partLabelGu: 'ભાગ ૩ — આધુનિક ભારત ઇતિહાસ (૧૧૮ પાના · ૪ પ્રકરણ)',
      titleEn: 'Theme 11: Mahatma Gandhi and the Nationalist Movement',
      titleGu: 'પ્રકરણ ૧૧: મહાત્મા ગાંધી અને રાષ્ટ્રીય આંદોલન',
      readingTimeMinutes: 13,
      sourceAttribution: 'NCERT Class 12 Themes in Indian History — Part III (Original Sankalp Study Guide)',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/lehs303.pdf',
      sections: [
        {
          id: 'ncert-hist-ch5-s1',
          headingEn: '11.1 From Kheda & Ahmedabad (1918) to Non-Cooperation (1920-22)',
          headingGu: '૧૧.૧ ખેડા અને અમદાવાદ સત્યાગ્રહ (૧૯૧૮) થી અસહકાર આંદોલન (૧૯૨૦-૨૨)',
          bodyEn:
            'After returning from South Africa in 1915, Mahatma Gandhi anchored his political work in India through local struggles: Champaran (1917, indigo cultivators in Bihar), Ahmedabad Mill Workers Strike (1918, plague bonus dispute where Gandhi undertook his first hunger strike), and Kheda Satyagraha (1918, demanding tax remission after crop failure alongside Sardar Vallabhbhai Patel). Following the 1919 Rowlatt Act and Jallianwala Bagh massacre, Gandhi launched the Non-Cooperation Movement coupled with Khilafat, turning nationalism into a broad mass movement of peasants, students, and artisans before withdrawing it after Chauri Chaura (1922).',
          bodyGu:
            '૧૯૧૫માં દક્ષિણ આફ્રિકાથી પરત ફર્યા બાદ ગાંધીજીએ ચંપારણ (૧૯૧૭), અમદાવાદ મિલ મજૂર આંદોલન (૧૯૧૮ - પ્રથમ ભૂખ હડતાળ) અને સરદાર પટેલ સાથે ખેડા સત્યાગ્રહ (૧૯૧૮ - મહેસૂલ માફી) દ્વારા સત્યાગ્રહનો પ્રયોગ કર્યો. ૧૯૧૯ના રોલેટ એક્ટ અને જલિયાંવાલા બાગ હત્યાકાંડ બાદ અસહકાર અને ખિલાફત આંદોલન શરૂ થયું, જેણે ભારતીય રાષ્ટ્રવાદને જનઆંદોલનમાં ફેરવી દીધું.',
          keyTerms: ['Champaran 1917', 'Kheda Satyagraha', 'Ahmedabad Mill Strike', 'Non-Cooperation'],
        },
        {
          id: 'ncert-hist-ch5-s2',
          headingEn: '11.2 The Salt March (Dandi Yatra 1930) & Quit India (1942)',
          headingGu: '૧૧.૨ દાંડી કૂચ (મીઠાનો સત્યાગ્રહ ૧૯૩૦) અને ભારત છોડો આંદોલન (૧૯૪૨)',
          bodyEn:
            'On 12 March 1930, Gandhi walked from Sabarmati Ashram in Ahmedabad with 78 satyagrahis over 24 days (240 miles) to Dandi in Navsari, breaking the British salt monopoly on 6 April 1930. Salt was chosen brilliantly as an everyday necessity taxed by the colonial state, uniting rich and poor across regions. Simultaneous salt raids occurred at Dharasana (led by Sarojini Naidu and Imam Saheb). Later, after the failure of the Cripps Mission in 1942, the Quit India resolution ("Do or Die") triggered nationwide underground resistance and parallel governments (Prati Sarkar in Satara, Tamluk).',
          bodyGu:
            '૧૨ માર્ચ ૧૯૩૦ના રોજ ગાંધીજીએ અમદાવાદના સાબરમતી આશ્રમથી ૭૮ સત્યાગ્રહીઓ સાથે ૨૪૦ માઈલની ઐતિહાસિક દાંડી કૂચ શરૂ કરી અને ૬ એપ્રિલ ૧૯૩૦ના રોજ દાંડી (નવસારી) ખાતે મીઠાનો કાનૂન તોડ્યો. ત્યારબાદ ધરાસણા સત્યાગ્રહનું નેતૃત્વ સરોજિની નાયડુએ કર્યું. ૧૯૪૨માં ક્રિપ્સ મિશનની નિષ્ફળતા બાદ "કરો યા મરો" ના સૂત્ર સાથે ભારત છોડો આંદોલન શરૂ થયું.',
          keyTerms: ['Dandi March 1930', 'Sabarmati Ashram', 'Dharasana Raid', 'Quit India 1942'],
        },
      ],
      summaryPointsEn: [
        'Kheda and Ahmedabad (1918) established Gujarat as a central laboratory of Gandhian Satyagraha.',
        'Dandi March (12 March – 6 April 1930) transformed an everyday commodity (salt) into an international symbol against colonial rule.',
      ],
      summaryPointsGu: [
        'ખેડા અને અમદાવાદ સત્યાગ્રહે ગુજરાતને ગાંધીજીના સત્યાગ્રહની પ્રયોગશાળા બનાવ્યું.',
        'દાંડી કૂચ (૧૨ માર્ચ – ૬ એપ્રિલ ૧૯૩૦) એ વૈશ્વિક સ્તરે બ્રિટિશ શાસનનો નૈતિક પાયો હલાવી દીધો.',
      ],
    },
    {
      id: 'ncert-hist-ch6',
      bookId: 'ncert-history-themes',
      chapterNumber: 12,
      partLabelEn: 'Part III — Modern Indian History (118 Pages · 4 Chapters)',
      partLabelGu: 'ભાગ ૩ — આધુનિક ભારત ઇતિહાસ (૧૧૮ પાના · ૪ પ્રકરણ)',
      titleEn: 'Theme 12: Framing the Constitution (Beginning of a New Era)',
      titleGu: 'પ્રકરણ ૧૨: બંધારણનું ઘડતર (નવા યુગની શરૂઆત)',
      readingTimeMinutes: 10,
      sourceAttribution: 'NCERT Class 12 Themes in Indian History — Part III (Original Sankalp Study Guide)',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/lehs304.pdf',
      sections: [
        {
          id: 'ncert-hist-ch6-s1',
          headingEn: '12.1 Constituent Assembly Debates, Objectives Resolution & Key Architects',
          headingGu: '૧૨.૧ બંધારણ સભાની ચર્ચાઓ, ઉદ્દેશ્ય પ્રસ્તાવ અને મુખ્ય ઘડવૈયાઓ',
          bodyEn:
            'Formed under the Cabinet Mission Plan of 1946, the Constituent Assembly met for 165 days over nearly three years. Jawaharlal Nehru introduced the historic Objectives Resolution on 13 December 1946, defining India as an "Independent Sovereign Republic" guaranteeing social, economic, and political justice. Six key figures shaped the process: Rajendra Prasad (President), Jawaharlal Nehru, Vallabhbhai Patel (chairing Fundamental Rights & Minorities Committee), B.R. Ambedkar (Chairman, Drafting Committee), K.M. Munshi (Gujarat jurist), and Alladi Krishnaswamy Aiyar, assisted by Constitutional Advisor B.N. Rau.',
          bodyGu:
            '૧૯૪૬ની કેબિનેટ મિશન યોજના હેઠળ રચાયેલી બંધારણ સભાની ૧૬૫ દિવસ બેઠકો ચાલી. ૧૩ ડિસેમ્બર ૧૯૪૬ના રોજ જવાહરલાલ નેહરુએ ઐતિહાસિક ઉદ્દેશ્ય પ્રસ્તાવ રજૂ કર્યો. ડો. રાજેન્દ્ર પ્રસાદ (અધ્યક્ષ), ડો. બી.આર. આંબેડકર (મુસદ્દા સમિતિના અધ્યક્ષ), સરદાર વલ્લભભાઈ પટેલ (મૂળભૂત અધિકાર સમિતિ) અને કનૈયાલાલ મુનશી જેવા દિગ્ગજોએ બંધારણ ઘડવામાં મહત્વપૂર્ણ યોગદાન આપ્યું.',
          keyTerms: ['Objectives Resolution', 'Dr. B.R. Ambedkar', 'Sardar Patel', 'K.M. Munshi', 'B.N. Rau'],
        },
      ],
      summaryPointsEn: [
        'Objectives Resolution (13 Dec 1946) later formed the philosophical foundation of the Preamble.',
        'Sardar Vallabhbhai Patel chaired the Advisory Committee on Fundamental Rights and Minorities.',
      ],
      summaryPointsGu: [
        '૧૩ ડિસેમ્બર ૧૯૪૬નો ઉદ્દેશ્ય પ્રસ્તાવ ભારતીય બંધારણના આમુખનો આધાર બન્યો.',
        'સરદાર પટેલે મૂળભૂત અધિકારો અને લઘુમતી સમિતિનું નેતૃત્વ કર્યું.',
      ],
    },
  ],

  // =========================================================================
  // 2. NCERT INDIAN CONSTITUTION AT WORK
  // =========================================================================
  'ncert-indian-polity-constitution': [
    {
      id: 'ncert-pol-ch1',
      bookId: 'ncert-indian-polity-constitution',
      chapterNumber: 1,
      partLabelEn: 'Class 11 — Indian Constitution at Work (10 Chapters)',
      partLabelGu: 'ધોરણ ૧૧ — ભારતીય બંધારણ: સિદ્ધાંત અને વ્યવહાર (૧૦ પ્રકરણ)',
      titleEn: 'Chapter 1: Constitution — Why and How?',
      titleGu: 'પ્રકરણ ૧: બંધારણ — શા માટે અને કેવી રીતે?',
      readingTimeMinutes: 9,
      sourceAttribution: 'NCERT Class 11 Political Science — Indian Constitution at Work',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/keps201.pdf',
      sections: [
        {
          id: 'ncert-pol-ch1-s1',
          headingEn: '1.1 Functions of a Constitution & Constituent Assembly Authority',
          headingGu: '૧.૧ બંધારણના કાર્યો અને બંધારણ સભાની સત્તા',
          bodyEn:
            'A constitution coordinates diverse social groups by providing basic enforceable rules, specifies who holds decision-making authority, sets limits on what a government can impose on citizens, and enables the state to fulfill societal aspirations. Formed under the Cabinet Mission Plan (1946) with 389 seats (292 from British Indian provinces, 93 from Princely States, 4 from Chief Commissioners provinces), the Constituent Assembly drew moral authority from public reason, consensus, and borrowed best practices globally (British parliamentary system, US Bill of Rights, Irish DPSPs, Canadian quasi-federalism).',
          bodyGu:
            'બંધારણ સમાજમાં મૂળભૂત નિયમો, નિર્ણય લેવાની સત્તાની વહેંચણી, સરકાર પર મર્યાદા અને લોકકલ્યાણના આદર્શો પૂરા પાડે છે. ૧૯૪૬ની કેબિનેટ મિશન યોજના હેઠળ બંધારણ સભાની રચના થઈ હતી.',
          keyTerms: ['Cabinet Mission 1946', 'Coordination Rules', 'Borrowed Features'],
        },
      ],
      summaryPointsEn: ['Constituent Assembly took 2 years, 11 months, and 18 days across 166 sessions.'],
      summaryPointsGu: ['બંધારણ નિર્માણમાં ૨ વર્ષ, ૧૧ મહિના અને ૧૮ દિવસનો સમય લાગ્યો.'],
    },
    {
      id: 'ncert-pol-ch2',
      bookId: 'ncert-indian-polity-constitution',
      chapterNumber: 2,
      partLabelEn: 'Class 11 — Indian Constitution at Work (10 Chapters)',
      partLabelGu: 'ધોરણ ૧૧ — ભારતીય બંધારણ: સિદ્ધાંત અને વ્યવહાર (૧૦ પ્રકરણ)',
      titleEn: 'Chapter 2: Rights in the Indian Constitution',
      titleGu: 'પ્રકરણ ૨: ભારતીય બંધારણમાં મૂળભૂત અધિકારો',
      readingTimeMinutes: 11,
      sourceAttribution: 'NCERT Class 11 Political Science — Indian Constitution at Work',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/keps202.pdf',
      sections: [
        {
          id: 'ncert-pol-ch2-s1',
          headingEn: '2.1 Fundamental Rights (Part III), Article 32 Writs & DPSPs',
          headingGu: '૨.૧ મૂળભૂત અધિકારો, કલમ ૩૨ રિટ્સ અને રાજ્યનીતિના સિદ્ધાંતો',
          bodyEn:
            'Part III (Articles 12–35) guarantees six Fundamental Rights: Equality (14–18), Freedom (19–22), Against Exploitation (23–24), Freedom of Religion (25–28), Cultural & Educational Rights (29–30), and Constitutional Remedies (32). Dr. Ambedkar called Article 32 the "heart and soul of the Constitution" empowering courts to issue five writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto. Part IV (DPSP) outlines non-justiciable socio-economic goals while Article 51A lists Fundamental Duties.',
          bodyGu:
            'ભાગ-૩ (કલમ ૧૨ થી ૩૫) છ મૂળભૂત અધિકારો આપે છે. કલમ ૩૨ હેઠળ સુપ્રીમ કોર્ટ પાંચ રિટ્સ (બંદી પ્રત્યક્ષીકરણ, પરમાદેશ, પ્રતિષેધ, ઉત્પ્રેષણ અને અધિકાર પૃચ્છા) જારી કરી શકે છે.',
          keyTerms: ['Article 32 Writs', 'Article 21 Life', 'DPSP Part IV', 'Fundamental Duties Art 51A'],
        },
      ],
      summaryPointsEn: ['44th Amendment (1978) shifted Right to Property from Art 31 to Art 300A.'],
      summaryPointsGu: ['૪૪મા સુધારાથી મિલકતનો અધિકાર કલમ ૩૦૦A માં મૂકાયો.'],
    },
    {
      id: 'ncert-pol-ch3',
      bookId: 'ncert-indian-polity-constitution',
      chapterNumber: 3,
      partLabelEn: 'Class 11 — Indian Constitution at Work (10 Chapters)',
      partLabelGu: 'ધોરણ ૧૧ — ભારતીય બંધારણ: સિદ્ધાંત અને વ્યવહાર (૧૦ પ્રકરણ)',
      titleEn: 'Chapter 3: Election and Representation',
      titleGu: 'પ્રકરણ ૩: ચૂંટણી અને પ્રતિનિધિત્વ',
      readingTimeMinutes: 9,
      sourceAttribution: 'NCERT Class 11 Political Science — Indian Constitution at Work',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/keps203.pdf',
      sections: [
        {
          id: 'ncert-pol-ch3-s1',
          headingEn: '3.1 FPTP vs Proportional Representation & Election Commission (Art 324)',
          headingGu: '૩.૧ FPTP પદ્ધતિ, પ્રમાણસર પ્રતિનિધિત્વ અને ચૂંટણી પંચ',
          bodyEn:
            'India uses the First Past the Post (FPTP) system for Lok Sabha and Vidhan Sabha elections for its simplicity and constituency accountability, while employing Proportional Representation (Single Transferable Vote) for Rajya Sabha, President, and Vice-President. Article 324 vests superintendence, direction, and control of elections in an independent Election Commission of India alongside Delimitation Commissions and reserved constituencies for SCs and STs.',
          bodyGu:
            'ભારતે લોકસભા અને વિધાનસભા માટે FPTP (સૌથી વધુ મત મેળવનાર વિજેતા) પદ્ધતિ, જ્યારે રાષ્ટ્રપતિ અને રાજ્યસભા માટે પ્રમાણસર પ્રતિનિધિત્વ પદ્ધતિ અપનાવી છે. કલમ ૩૨૪ સ્વતંત્ર ચૂંટણી પંચની જોગવાઈ કરે છે.',
          keyTerms: ['FPTP System', 'Proportional Representation', 'Article 324 ECI', '61st Amendment Voting Age'],
        },
      ],
      summaryPointsEn: ['61st Amendment (1989) lowered the voting age from 21 to 18 years.'],
      summaryPointsGu: ['૬૧મા સુધારા (૧૯૮૯) થી મતદાનની વય ૨૧ થી ઘટાડી ૧૮ વર્ષ કરાઈ.'],
    },
    {
      id: 'ncert-pol-ch4',
      bookId: 'ncert-indian-polity-constitution',
      chapterNumber: 4,
      partLabelEn: 'Class 11 — Indian Constitution at Work (10 Chapters)',
      partLabelGu: 'ધોરણ ૧૧ — ભારતીય બંધારણ: સિદ્ધાંત અને વ્યવહાર (૧૦ પ્રકરણ)',
      titleEn: 'Chapter 4: Executive',
      titleGu: 'પ્રકરણ ૪: કારોબારી (રાષ્ટ્રપતિ, વડાપ્રધાન અને સનદી સેવા)',
      readingTimeMinutes: 10,
      sourceAttribution: 'NCERT Class 11 Political Science — Indian Constitution at Work',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/keps204.pdf',
      sections: [
        {
          id: 'ncert-pol-ch4-s1',
          headingEn: '4.1 Parliamentary Executive, Presidential Discretion & Bureaucracy',
          headingGu: '૪.૧ સંસદીય કારોબારી, રાષ્ટ્રપતિની સત્તા અને કાયમી કારોબારી',
          bodyEn:
            'Article 74 binds the President to act on the aid and advice of the Council of Ministers headed by the Prime Minister, though the President retains limited situational discretion (suspensive veto under Art 111, hung Parliament appointment). Permanent executive comprises politically neutral All India Services (IAS, IPS, IFoS under Art 312) and State Civil Services (GPSC).',
          bodyGu:
            'કલમ ૭૪ મુજબ રાષ્ટ્રપતિ વડાપ્રધાનની અધ્યક્ષતામાં મંત્રીપરિષદની સલાહ મુજબ કાર્ય કરે છે. કાયમી કારોબારીમાં અખિલ ભારતીય સેવાઓ (IAS, IPS, IFoS) અને રાજ્ય સેવાઓનો સમાવેશ થાય છે.',
          keyTerms: ['Article 74 & 75', 'Pocket Veto', '91st Amendment 15% Cap', 'UPSC & GPSC'],
        },
      ],
      summaryPointsEn: ['91st Amendment (2003) capped the Council of Ministers at 15% of Lok Sabha / Assembly strength.'],
      summaryPointsGu: ['૯૧મા સુધારા મુજબ મંત્રીમંડળનું કદ કુલ સભ્ય સંખ્યાના ૧૫% થી વધુ ન હોઈ શકે.'],
    },
    {
      id: 'ncert-pol-ch5',
      bookId: 'ncert-indian-polity-constitution',
      chapterNumber: 5,
      partLabelEn: 'Class 11 — Indian Constitution at Work (10 Chapters)',
      partLabelGu: 'ધોરણ ૧૧ — ભારતીય બંધારણ: સિદ્ધાંત અને વ્યવહાર (૧૦ પ્રકરણ)',
      titleEn: 'Chapter 5: Legislature',
      titleGu: 'પ્રકરણ ૫: ધારાસભા (સંસદ અને રાજ્ય વિધાનમંડળ)',
      readingTimeMinutes: 10,
      sourceAttribution: 'NCERT Class 11 Political Science — Indian Constitution at Work',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/keps205.pdf',
      sections: [
        {
          id: 'ncert-pol-ch5-s1',
          headingEn: '5.1 Bicameral Parliament, Money Bills & Anti-Defection Law',
          headingGu: '૫.૧ દ્વિગૃહી સંસદ, નાણા ખરડો અને પક્ષપલટા વિરોધી કાયદો',
          bodyEn:
            'Lok Sabha exercises decisive authority over Money Bills (Art 110; Rajya Sabha can only delay 14 days) and Confidence Motions, while Rajya Sabha holds special federal powers (Art 249 and Art 312). Parliamentary control relies on Question Hour, Zero Hour, Standing Committees, and the 10th Schedule Anti-Defection Law (52nd Amendment 1985).',
          bodyGu:
            'નાણા ખરડા (કલમ ૧૧૦) પર લોકસભાની સર્વોપરિતા હોય છે. રાજ્યસભા કલમ ૨૪૯ અને ૩૧૨ હેઠળ વિશેષ સંઘીય સત્તા ધરાવે છે. ૫૨મા સુધારા (૧૦મી અનુસૂચિ) દ્વારા પક્ષપલટા વિરોધી કાયદો લવાયો.',
          keyTerms: ['Money Bill Art 110', 'Joint Sitting Art 108', '10th Schedule', 'Article 249'],
        },
      ],
      summaryPointsEn: ['There is no Joint Sitting (Art 108) for Money Bills or Constitutional Amendment Bills.'],
      summaryPointsGu: ['નાણા ખરડા કે બંધારણીય સુધારા ખરડા માટે સંયુક્ત બેઠક (કલમ ૧૦૮) બોલાવી શકાતી નથી.'],
    },
    {
      id: 'ncert-pol-ch6',
      bookId: 'ncert-indian-polity-constitution',
      chapterNumber: 6,
      partLabelEn: 'Class 11 — Indian Constitution at Work (10 Chapters)',
      partLabelGu: 'ધોરણ ૧૧ — ભારતીય બંધારણ: સિદ્ધાંત અને વ્યવહાર (૧૦ પ્રકરણ)',
      titleEn: 'Chapter 6: Judiciary',
      titleGu: 'પ્રકરણ ૬: ન્યાયતંત્ર અને ન્યાયિક સમીક્ષા',
      readingTimeMinutes: 10,
      sourceAttribution: 'NCERT Class 11 Political Science — Indian Constitution at Work',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/keps206.pdf',
      sections: [
        {
          id: 'ncert-pol-ch6-s1',
          headingEn: '6.1 Single Integrated Judiciary, PIL & Judicial Review',
          headingGu: '૬.૧ એકીકૃત ન્યાયતંત્ર, જાહેર હિતની અરજી (PIL) અને ન્યાયિક સક્રિયતા',
          bodyEn:
            'India has a single integrated judicial hierarchy with the Supreme Court (Art 124) at the apex, holding Original (Art 131), Appellate, and Advisory (Art 143) jurisdictions. Public Interest Litigation (PIL, pioneered by Justices P.N. Bhagwati and V.R. Krishna Iyer) expanded locus standi for marginalized citizens, while Judicial Review safeguards Fundamental Rights and federalism.',
          bodyGu:
            'ભારતમાં સુપ્રીમ કોર્ટ (કલમ ૧૨૪) ના નેતૃત્વમાં એકીકૃત ન્યાય વ્યવસ્થા છે. જસ્ટિસ પી.એન. ભગવતી દ્વારા લોકપ્રિય થયેલ જાહેર હિતની અરજી (PIL) એ ન્યાય સુધીની પહોંચ સરળ બનાવી.',
          keyTerms: ['Original Jurisdiction Art 131', 'Advisory Art 143', 'PIL', 'Judicial Review'],
        },
      ],
      summaryPointsEn: ['Supreme Court Judges hold office until age 65; High Court Judges until age 62.'],
      summaryPointsGu: ['સુપ્રીમ કોર્ટના ન્યાયાધીશની નિવૃત્તિ વય ૬૫ વર્ષ અને હાઈકોર્ટના ૬૨ વર્ષ છે.'],
    },
    {
      id: 'ncert-pol-ch7',
      bookId: 'ncert-indian-polity-constitution',
      chapterNumber: 7,
      partLabelEn: 'Class 11 — Indian Constitution at Work (10 Chapters)',
      partLabelGu: 'ધોરણ ૧૧ — ભારતીય બંધારણ: સિદ્ધાંત અને વ્યવહાર (૧૦ પ્રકરણ)',
      titleEn: 'Chapter 7: Federalism',
      titleGu: 'પ્રકરણ ૭: સમવાયતંત્ર (કેન્દ્ર-રાજ્ય સંબંધો)',
      readingTimeMinutes: 9,
      sourceAttribution: 'NCERT Class 11 Political Science — Indian Constitution at Work',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/keps207.pdf',
      sections: [
        {
          id: 'ncert-pol-ch7-s1',
          headingEn: '7.1 Seventh Schedule Lists, Sarkaria Commission & Article 356',
          headingGu: '૭.૧ સાતમી અનુસૂચિ, સરકારિયા પંચ અને કલમ ૩૫૬',
          bodyEn:
            'Article 1 describes India as a "Union of States". Legislative powers are divided across Union, State, and Concurrent Lists (7th Schedule), with residuary subjects vested in Parliament. Cooperative federalism tensions center around Governor roles, President’s Rule (Art 356 — checked by S.R. Bommai v. Union of India 1994), and asymmetrical provisions like Article 371 (including 371(2) for Gujarat/Maharashtra).',
          bodyGu:
            'કલમ ૧ ભારતને "રાજ્યોનો સંઘ" જાહેર કરે છે. ૭મી અનુસૂચિમાં સંઘ, રાજ્ય અને સમવર્તી યાદી દ્વારા સત્તાનું વિભાજન છે. એસ.આર. બોમ્માઈ કેસ (૧૯૯૪) માં કલમ ૩૫૬ ના દુરુપયોગ પર રોક લગાવાઈ.',
          keyTerms: ['7th Schedule', 'S.R. Bommai 1994', 'Sarkaria Commission', 'Article 371'],
        },
      ],
      summaryPointsEn: ['Residuary powers belong to the Union Parliament under Article 248.'],
      summaryPointsGu: ['શેષ સત્તાઓ (Residuary Powers) કલમ ૨૪૮ હેઠળ સંસદ પાસે છે.'],
    },
    {
      id: 'ncert-pol-ch8',
      bookId: 'ncert-indian-polity-constitution',
      chapterNumber: 8,
      partLabelEn: 'Class 11 — Indian Constitution at Work (10 Chapters)',
      partLabelGu: 'ધોરણ ૧૧ — ભારતીય બંધારણ: સિદ્ધાંત અને વ્યવહાર (૧૦ પ્રકરણ)',
      titleEn: 'Chapter 8: Local Governments',
      titleGu: 'પ્રકરણ ૮: સ્થાનિક સરકારો (૭૩મો અને ૭૪મો સુધારો)',
      readingTimeMinutes: 9,
      sourceAttribution: 'NCERT Class 11 Political Science — Indian Constitution at Work',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/keps208.pdf',
      sections: [
        {
          id: 'ncert-pol-ch8-s1',
          headingEn: '8.1 73rd & 74th Amendments, Gram Sabha & PESA Act',
          headingGu: '૮.૧ ૭૩મો અને ૭૪મો બંધારણીય સુધારો, ગ્રામસભા અને PESA',
          bodyEn:
            'Enacted in 1992 (effective 1993), the 73rd Amendment (Part IX, 11th Schedule — 29 rural functions) and 74th Amendment (Part IX-A, 12th Schedule — 18 urban functions) established uniform three-tier Panchayati Raj, 5-year direct elections, State Election Commissions, State Finance Commissions, and 1/3rd minimum reservation for women (50% in Gujarat).',
          bodyGu:
            '૭૩મા સુધારા (૧૧મી અનુસૂચિ - ૨૯ વિષયો) અને ૭૪મા સુધારા (૧૨મી અનુસૂચિ - ૧૮ વિષયો) દ્વારા સ્થાનિક સ્વરાજ્યની સંસ્થાઓને બંધારણીય દરજ્જો અપાયો.',
          keyTerms: ['73rd & 74th Amendments', '11th & 12th Schedules', 'State Finance Commission'],
        },
      ],
      summaryPointsEn: ['P.K. Thungon Committee (1989) recommended constitutional recognition for local bodies.'],
      summaryPointsGu: ['પી.કે. થુંગન સમિતિએ સ્થાનિક સંસ્થાઓને બંધારણીય દરજ્જાની ભલામણ કરી હતી.'],
    },
    {
      id: 'ncert-pol-ch9',
      bookId: 'ncert-indian-polity-constitution',
      chapterNumber: 9,
      partLabelEn: 'Class 11 — Indian Constitution at Work (10 Chapters)',
      partLabelGu: 'ધોરણ ૧૧ — ભારતીય બંધારણ: સિદ્ધાંત અને વ્યવહાર (૧૦ પ્રકરણ)',
      titleEn: 'Chapter 9: Constitution as a Living Document',
      titleGu: 'પ્રકરણ ૯: બંધારણ — એક જીવંત દસ્તાવેજ',
      readingTimeMinutes: 9,
      sourceAttribution: 'NCERT Class 11 Political Science — Indian Constitution at Work',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/keps209.pdf',
      sections: [
        {
          id: 'ncert-pol-ch9-s1',
          headingEn: '9.1 Article 368 Amendment Procedure & Kesavananda Bharati Ruling',
          headingGu: '૯.૧ કલમ ૩૬૮ સુધારા પ્રક્રિયા અને કેશવાનંદ ભારતી ચુકાદો',
          bodyEn:
            'Balancing flexibility and rigidity, Article 368 provides three amendment routes: simple majority (outside Art 368, e.g., Art 2 & 3 state reorganization), special majority of Parliament, and special majority plus ratification by half the States (federal provisions). In Kesavananda Bharati (1973), the Supreme Court held that no amendment can destroy the Basic Structure.',
          bodyGu:
            'કલમ ૩૬૮ સુધારાની પ્રક્રિયા જણાવે છે. કેશવાનંદ ભારતી કેસ (૧૯૭૩) મુજબ સંસદ બંધારણના મૂળભૂત માળખામાં ફેરફાર કરી શકતી નથી.',
          keyTerms: ['Article 368', 'Special Majority', 'Basic Structure Doctrine'],
        },
      ],
      summaryPointsEn: ['42nd Amendment (1976) is known as the "Mini-Constitution"; 44th restored judicial checks.'],
      summaryPointsGu: ['૪૨મા સુધારાને "મિની બંધારણ" તરીકે ઓળખવામાં આવે છે.'],
    },
    {
      id: 'ncert-pol-ch10',
      bookId: 'ncert-indian-polity-constitution',
      chapterNumber: 10,
      partLabelEn: 'Class 11 — Indian Constitution at Work (10 Chapters)',
      partLabelGu: 'ધોરણ ૧૧ — ભારતીય બંધારણ: સિદ્ધાંત અને વ્યવહાર (૧૦ પ્રકરણ)',
      titleEn: 'Chapter 10: The Philosophy of the Constitution',
      titleGu: 'પ્રકરણ ૧૦: બંધારણનું રાજકીય દર્શન',
      readingTimeMinutes: 8,
      sourceAttribution: 'NCERT Class 11 Political Science — Indian Constitution at Work',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/keps210.pdf',
      sections: [
        {
          id: 'ncert-pol-ch10-s1',
          headingEn: '10.1 Principled Distance Secularism, Social Justice & Liberalism',
          headingGu: '૧૦.૧ સિદ્ધાંતનિષ્ઠ અંતર (Secularism), સામાજિક ન્યાય અને બંધુત્વ',
          bodyEn:
            'Indian constitutional philosophy integrates individual freedom with community equality and social justice (affirmative action for SCs, STs, SEBCs). Unlike strict Western wall-of-separation secularism, Indian secularism practices "principled distance" — allowing state reform of oppressive social practices alongside equal protection of minority rights (Articles 29–30).',
          bodyGu:
            'ભારતીય બંધારણીય દર્શન વ્યક્તિગત સ્વતંત્રતા સાથે સામાજિક ન્યાય, સમાનતા અને લઘુમતી અધિકારો (કલમ ૨૯-૩૦) નો સુમેળ સાધે છે.',
          keyTerms: ['Principled Distance', 'Social Justice', 'Universal Adult Franchise'],
        },
      ],
      summaryPointsEn: ['Universal Adult Franchise was adopted from Day 1 in 1950 without literacy or property qualifications.'],
      summaryPointsGu: ['૧૯૫૦ થી જ કોઈપણ ભેદભાવ વિના સાર્વત્રિક પુખ્ત મતાધિકાર અપનાવાયો.'],
    },
  ],

  // =========================================================================
  // 3. NCERT PHYSICAL GEOGRAPHY & INDIA ENVIRONMENT (ALL 20 CHAPTERS)
  // =========================================================================
  'ncert-geography-physical-human': [
    {
      id: 'ncert-geo-b1-ch1',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 1,
      partLabelEn: 'Book 1 — Fundamentals of Physical Geography (14 Chapters)',
      partLabelGu: 'પુસ્તક ૧ — ભૌતિક ભૂગોળના સિદ્ધાંતો (૧૪ પ્રકરણ)',
      titleEn: 'Ch 1: Geography as a Discipline',
      titleGu: 'પ્રકરણ ૧: એક વિષય તરીકે ભૂગોળ',
      readingTimeMinutes: 6,
      sourceAttribution: 'NCERT Class 11 Fundamentals of Physical Geography',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy201.pdf',
      sections: [{
        id: 'ncert-geo-b1-ch1-s1',
        headingEn: '1.1 Systematic vs Regional Geography',
        headingGu: '૧.૧ ક્રમબદ્ધ અને પ્રાદેશિક અભિગમ',
        bodyEn: 'Geography integrates natural and social sciences as a spatial discipline using Systematic (Alexander von Humboldt) and Regional (Karl Ritter) approaches, covering geomorphology, climatology, hydrology, and GIS/remote sensing.',
        bodyGu: 'ભૂગોળ એ પ્રાકૃતિક અને સામાજિક વિજ્ઞાનનો અવકાશી અભ્યાસ છે, જેમાં ક્રમબદ્ધ (હમ્બોલ્ટ) અને પ્રાદેશિક (કાર્લ રિટર) અભિગમ મુખ્ય છે.',
        keyTerms: ['Systematic Approach', 'Regional Approach', 'Spatial Synthesis'],
      }],
      summaryPointsEn: ['Eratosthenes coined the term "Geography" (geo = earth, graphos = description).'],
      summaryPointsGu: ['ઈરેટોસ્થિનિસે સૌપ્રથમ "જ્યોગ્રાફી" શબ્દનો ઉપયોગ કર્યો.'],
    },
    {
      id: 'ncert-geo-b1-ch2',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 2,
      partLabelEn: 'Book 1 — Fundamentals of Physical Geography (14 Chapters)',
      partLabelGu: 'પુસ્તક ૧ — ભૌતિક ભૂગોળના સિદ્ધાંતો (૧૪ પ્રકરણ)',
      titleEn: 'Ch 2: The Origin and Evolution of the Earth',
      titleGu: 'પ્રકરણ ૨: પૃથ્વીની ઉત્પત્તિ અને વિકાસ',
      readingTimeMinutes: 8,
      sourceAttribution: 'NCERT Class 11 Fundamentals of Physical Geography',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy202.pdf',
      sections: [{
        id: 'ncert-geo-b1-ch2-s1',
        headingEn: '2.1 Nebular Hypothesis, Big Bang & Geological Time Scale',
        headingGu: '૨.૧ નિહારિકા સિદ્ધાંત, બિગ બેંગ અને ભૂવૈજ્ઞાનિક સમયપત્રક',
        bodyEn: 'Edwin Hubble (1920) proved the expanding universe supporting the Big Bang Theory (13.7 billion years ago). Earth formed ~4.6 billion years ago via planetary accretion and differentiation of iron/nickel into the core, followed by degassing that created the early atmosphere and oceans.',
        bodyGu: 'એડવિન હબલે વિસ્તરતા બ્રહ્માંડનો સિદ્ધાંત આપ્યો (બિગ બેંગ ૧૩.૭ અબજ વર્ષ પહેલાં). પૃથ્વીની રચના ~૪.૬ અબજ વર્ષ પહેલાં થઈ.',
        keyTerms: ['Big Bang 13.7 Bya', 'Nebular Hypothesis', 'Differentiation', 'Degassing'],
      }],
      summaryPointsEn: ['Inner planets (Mercury–Mars) are terrestrial; outer planets (Jupiter–Neptune) are Jovian gas giants.'],
      summaryPointsGu: ['બુધ થી મંગળ પાર્થિવ ગ્રહો છે જ્યારે ગુરુ થી નેપ્ચ્યુન વાયુમય જોવિયન ગ્રહો છે.'],
    },
    {
      id: 'ncert-geo-b1-ch3',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 3,
      partLabelEn: 'Book 1 — Fundamentals of Physical Geography (14 Chapters)',
      partLabelGu: 'પુસ્તક ૧ — ભૌતિક ભૂગોળના સિદ્ધાંતો (૧૪ પ્રકરણ)',
      titleEn: 'Ch 3: Interior of the Earth',
      titleGu: 'પ્રકરણ ૩: પૃથ્વીનું આંતરિક બંધારણ',
      readingTimeMinutes: 9,
      sourceAttribution: 'NCERT Class 11 Fundamentals of Physical Geography',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy203.pdf',
      sections: [{
        id: 'ncert-geo-b1-ch3-s1',
        headingEn: '3.1 Seismic P-Waves, S-Waves & Crust-Mantle-Core',
        headingGu: '૩.૧ ભૂકંપના P-તરંગો, S-તરંગો અને પોપડો-મેન્ટલ-ગર્ભ',
        bodyEn: 'Body waves include P-waves (travel through solid, liquid, gas) and S-waves (travel only through solids, creating a shadow zone beyond 105° proving the liquid outer core). Discontinuities separate Crust/Mantle (Moho) and Mantle/Core (Gutenberg). Volcanic landforms include batholiths, laccoliths, dykes, and Deccan Trap flood basalts.',
        bodyGu: 'P-તરંગો ઘન-પ્રવાહી-વાયુ ત્રણેયમાંથી પસાર થાય છે જ્યારે S-તરંગો માત્ર ઘન માધ્યમમાંથી પસાર થાય છે. મોહો અને ગુટેનબર્ગ અસતતતા સ્તરોને અલગ પાડે છે.',
        keyTerms: ['P & S Shadow Zones', 'Asthenosphere', 'Moho Discontinuity', 'Deccan Traps'],
      }],
      summaryPointsEn: ['Asthenosphere (upper mantle) is the primary source of magma during volcanic eruptions.'],
      summaryPointsGu: ['ઉપલા મેન્ટલનો એસ્થેનોસ્ફિયર સ્તર જ્વાળામુખી મેગ્માનો મુખ્ય સ્ત્રોત છે.'],
    },
    {
      id: 'ncert-geo-b1-ch4',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 4,
      partLabelEn: 'Book 1 — Fundamentals of Physical Geography (14 Chapters)',
      partLabelGu: 'પુસ્તક ૧ — ભૌતિક ભૂગોળના સિદ્ધાંતો (૧૪ પ્રકરણ)',
      titleEn: 'Ch 4: Distribution of Oceans and Continents',
      titleGu: 'પ્રકરણ ૪: મહાસાગરો અને ખંડોનું વિતરણ',
      readingTimeMinutes: 9,
      sourceAttribution: 'NCERT Class 11 Fundamentals of Physical Geography',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy204.pdf',
      sections: [{
        id: 'ncert-geo-b1-ch4-s1',
        headingEn: '4.1 Continental Drift (Wegener), Sea Floor Spreading & Plate Tectonics',
        headingGu: '૪.૧ ખંડપ્રવહન સિદ્ધાંત (વેગનર), સમુદ્રતળ વિસ્તરણ અને પ્લેટ ટેક્ટોનિક્સ',
        bodyEn: 'Alfred Wegener (1912) proposed supercontinent Pangaea surrounded by Panthalassa. Harry Hess (1961) formulated Sea Floor Spreading along mid-oceanic ridges, leading to Plate Tectonics (McKenzie, Parker, Morgan, 1967) defining 7 major plates with divergent, convergent, and transform boundaries.',
        bodyGu: 'આલ્ફ્રેડ વેગનરે ૧૯૧૨માં પેન્જિયા અને પેન્થાલાસાનો ખંડપ્રવહન સિદ્ધાંત આપ્યો, જે આગળ જતાં હેરી હેસ અને પ્લેટ ટેક્ટોનિક્સમાં પરિણમ્યો.',
        keyTerms: ['Pangaea & Panthalassa', 'Alfred Wegener', 'Harry Hess', 'Plate Boundaries'],
      }],
      summaryPointsEn: ['Indian Plate collided with the Eurasian Plate along the Himalayan convergent zone.'],
      summaryPointsGu: ['ભારતીય પ્લેટ અને યુરેશિયન પ્લેટના ટકરાવથી હિમાલયનું નિર્માણ થયું.'],
    },
    {
      id: 'ncert-geo-b1-ch5',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 5,
      partLabelEn: 'Book 1 — Fundamentals of Physical Geography (14 Chapters)',
      partLabelGu: 'પુસ્તક ૧ — ભૌતિક ભૂગોળના સિદ્ધાંતો (૧૪ પ્રકરણ)',
      titleEn: 'Ch 5: Geomorphic Processes',
      titleGu: 'પ્રકરણ ૫: ભૂ-આકૃતિક પ્રક્રિયાઓ',
      readingTimeMinutes: 8,
      sourceAttribution: 'NCERT Class 11 Fundamentals of Physical Geography',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy205.pdf',
      sections: [{
        id: 'ncert-geo-b1-ch5-s1',
        headingEn: '5.1 Endogenic Diastrophism & Exogenic Weathering',
        headingGu: '૫.૧ આંતરિક ભૂસંચલન અને બાહ્ય ખવાણ-ધોવાણ પ્રક્રિયાઓ',
        bodyEn: 'Endogenic forces (orogeny/mountain-building and epeirogeny/continent-building) build relief, while exogenic denudation (weathering, mass wasting, erosion, deposition) wears it down. Soil formation (pedogenesis) depends on parent material, topography, climate, biological activity, and time.',
        bodyGu: 'આંતરિક બળો પર્વતો અને ખંડોનું નિર્માણ કરે છે, જ્યારે બાહ્ય બળો (ખવાણ, ધોવાણ, નિક્ષેપણ) સમતલીકરણ કરે છે.',
        keyTerms: ['Orogeny vs Epeirogeny', 'Chemical Weathering', 'Pedogenesis'],
      }],
      summaryPointsEn: ['Chemical weathering (solution, carbonation, oxidation) dominates warm humid climates.'],
      summaryPointsGu: ['ગરમ અને ભેજવાળી આબોહવામાં રાસાયણિક ખવાણ સૌથી વધુ થાય છે.'],
    },
    {
      id: 'ncert-geo-b1-ch6',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 6,
      partLabelEn: 'Book 1 — Fundamentals of Physical Geography (14 Chapters)',
      partLabelGu: 'પુસ્તક ૧ — ભૌતિક ભૂગોળના સિદ્ધાંતો (૧૪ પ્રકરણ)',
      titleEn: 'Ch 6: Landforms and their Evolution',
      titleGu: 'પ્રકરણ ૬: ભૂમિસ્વરૂપો અને તેમનો વિકાસ',
      readingTimeMinutes: 9,
      sourceAttribution: 'NCERT Class 11 Fundamentals of Physical Geography',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy206.pdf',
      sections: [{
        id: 'ncert-geo-b1-ch6-s1',
        headingEn: '6.1 Fluvial, Karst, Glacial, Coastal & Aeolian Landforms',
        headingGu: '૬.૧ નદી, કાર્સ્ટ, હિમનદી, દરિયાઈ અને પવન દ્વારા રચાતા ભૂમિસ્વરૂપો',
        bodyEn: 'Running water carves V-shaped valleys, gorges, meanders, ox-bow lakes, and deltas. Groundwater in limestone produces karst caves, stalactites, and stalagmites. Glaciers carve cirques, horns, and U-shaped valleys, while wind shapes mushroom rocks and barchans.',
        bodyGu: 'નદી દ્વારા કોતર, મેન્ડર, ગોખુર તળાવ અને મુખત્રિકોણ પ્રદેશ, હિમનદી દ્વારા U-આકારની ખીણ અને પવન દ્વારા બરખાન ઢુવા રચાય છે.',
        keyTerms: ['Ox-bow Lake', 'Stalactite & Stalagmite', 'Cirque & Moraine', 'Barchans'],
      }],
      summaryPointsEn: ['Meanders are depositional-erosional features typical of mature river floodplains.'],
      summaryPointsGu: ['સર્પાકાર વળાંક (Meander) અને ગોખુર તળાવ નદીની પ્રૌઢાવસ્થાની નિશાની છે.'],
    },
    {
      id: 'ncert-geo-b1-ch7',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 7,
      partLabelEn: 'Book 1 — Fundamentals of Physical Geography (14 Chapters)',
      partLabelGu: 'પુસ્તક ૧ — ભૌતિક ભૂગોળના સિદ્ધાંતો (૧૪ પ્રકરણ)',
      titleEn: 'Ch 7: Composition and Structure of Atmosphere',
      titleGu: 'પ્રકરણ ૭: વાતાવરણનું બંધારણ અને સંરચના',
      readingTimeMinutes: 7,
      sourceAttribution: 'NCERT Class 11 Fundamentals of Physical Geography',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy207.pdf',
      sections: [{
        id: 'ncert-geo-b1-ch7-s1',
        headingEn: '7.1 Atmospheric Gases & Five Vertical Layers',
        headingGu: '૭.૧ વાતાવરણીય વાયુઓ અને પાંચ ઊર્ધ્વ સ્તરો',
        bodyEn: 'Nitrogen (78.08%) and Oxygen (20.95%) make up 99% of dry air, while CO2 and water vapour absorb terrestrial infrared radiation. Atmospheric layers from bottom up are Troposphere (all weather phenomena), Stratosphere (Ozone layer), Mesosphere (coldest), Thermosphere/Ionosphere (radio wave reflection), and Exosphere.',
        bodyGu: 'વાતાવરણમાં નાઈટ્રોજન (૭૮%) અને ઓક્સિજન (૨૧%) મુખ્ય વાયુઓ છે. સ્તરો: ક્ષોભઆવરણ (હવામાન), સમતાપ આવરણ (ઓઝોન), મધ્યાવરણ, આયનાવરણ અને બાહ્યાવરણ.',
        keyTerms: ['Troposphere', 'Stratosphere Ozone', 'Ionosphere'],
      }],
      summaryPointsEn: ['Normal lapse rate drops temperature by 1°C per 165 m (6.5°C/km) in the Troposphere.'],
      summaryPointsGu: ['ક્ષોભઆવરણમાં દર ૧૬૫ મીટરની ઊંચાઈએ તાપમાન ૧°C ઘટે છે.'],
    },
    {
      id: 'ncert-geo-b1-ch8',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 8,
      partLabelEn: 'Book 1 — Fundamentals of Physical Geography (14 Chapters)',
      partLabelGu: 'પુસ્તક ૧ — ભૌતિક ભૂગોળના સિદ્ધાંતો (૧૪ પ્રકરણ)',
      titleEn: 'Ch 8: Solar Radiation, Heat Balance and Temperature',
      titleGu: 'પ્રકરણ ૮: સૂર્યાઘાત, ઉષ્મા સંતુલન અને તાપમાન',
      readingTimeMinutes: 8,
      sourceAttribution: 'NCERT Class 11 Fundamentals of Physical Geography',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy208.pdf',
      sections: [{
        id: 'ncert-geo-b1-ch8-s1',
        headingEn: '8.1 Insolation, Albedo (~35%) & Temperature Inversion',
        headingGu: '૮.૧ સૂર્યાઘાત, આલ્બેડો (~૩૫%) અને તાપમાન વ્યૂત્ક્રમણ',
        bodyEn: 'Of 100 units of incoming solar insolation, roughly 35 units are reflected back as Earth’s Albedo. Earth maintains radiative equilibrium through terrestrial long-wave radiation and greenhouse trapping. Temperature inversion occurs during long winter nights with clear skies and calm air.',
        bodyGu: 'પૃથ્વી પર આવતા ૧૦૦ એકમ સૂર્યાઘાતમાંથી ~૩૫ એકમ પરાવર્તિત થાય છે જેને "આલ્બેડો" કહે છે. શાંત શિયાળુ રાત્રે તાપમાન વ્યૂત્ક્રમણ જોવા મળે છે.',
        keyTerms: ['Albedo 35%', 'Heat Budget', 'Temperature Inversion'],
      }],
      summaryPointsEn: ['Perihelion occurs on 3 January (~147M km); Aphelion on 4 July (~152M km).'],
      summaryPointsGu: ['પૃથ્વી ૩ જાન્યુઆરીએ સૂર્યની સૌથી નજીક (Perihelion) હોય છે.'],
    },
    {
      id: 'ncert-geo-b1-ch9',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 9,
      partLabelEn: 'Book 1 — Fundamentals of Physical Geography (14 Chapters)',
      partLabelGu: 'પુસ્તક ૧ — ભૌતિક ભૂગોળના સિદ્ધાંતો (૧૪ પ્રકરણ)',
      titleEn: 'Ch 9: Atmospheric Circulation and Weather Systems',
      titleGu: 'પ્રકરણ ૯: વાતાવરણીય પરિભ્રમણ અને હવામાન પ્રણાલીઓ',
      readingTimeMinutes: 9,
      sourceAttribution: 'NCERT Class 11 Fundamentals of Physical Geography',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy209.pdf',
      sections: [{
        id: 'ncert-geo-b1-ch9-s1',
        headingEn: '9.1 Coriolis Force, Tri-Cellular Circulation & Cyclones',
        headingGu: '૯.૧ કોરિઓલિસ બળ, ત્રિકોષીય પરિભ્રમણ અને ચક્રવાત',
        bodyEn: 'Coriolis force deflects winds right in the Northern Hemisphere and left in the Southern Hemisphere (zero at the Equator). General circulation spans Hadley, Ferrel, and Polar cells. Tropical cyclones originate over warm oceans (>27°C) with low vertical wind shear and an eye of calm descent.',
        bodyGu: 'કોરિઓલિસ બળ ઉત્તર ગોળાર્ધમાં પવનોને જમણી તરફ વાળે છે (વિષુવવૃત્ત પર શૂન્ય). ઉષ્ણકટિબંધીય ચક્રવાત >૨૭°C સમુદ્ર સપાટી પર ઉદ્ભવે છે.',
        keyTerms: ['Coriolis Force', 'Hadley & Ferrel Cells', 'Tropical Cyclones'],
      }],
      summaryPointsEn: ['ITCZ convergence near the Equator creates the calm Doldrums belt.'],
      summaryPointsGu: ['વિષુવવૃત્ત નજીક ITCZ વિસ્તાર શાંત પવનનો પટ્ટો (Doldrums) બનાવે છે.'],
    },
    {
      id: 'ncert-geo-b1-ch10',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 10,
      partLabelEn: 'Book 1 — Fundamentals of Physical Geography (14 Chapters)',
      partLabelGu: 'પુસ્તક ૧ — ભૌતિક ભૂગોળના સિદ્ધાંતો (૧૪ પ્રકરણ)',
      titleEn: 'Ch 10: Water in the Atmosphere',
      titleGu: 'પ્રકરણ ૧૦: વાતાવરણમાં પાણી (ભેજ, વાદળો અને વરસાદ)',
      readingTimeMinutes: 7,
      sourceAttribution: 'NCERT Class 11 Fundamentals of Physical Geography',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy210.pdf',
      sections: [{
        id: 'ncert-geo-b1-ch10-s1',
        headingEn: '10.1 Humidity, Cloud Types & Types of Rainfall',
        headingGu: '૧૦.૧ સાપેક્ષ ભેજ, વાદળોના પ્રકાર અને વરસાદના પ્રકારો',
        bodyEn: 'Relative humidity increases as air cools until reaching the Dew Point. Clouds fall into Cirrus (high feathery), Cumulus (cotton-wool), Stratus (layered), and Nimbus (rain-bearing). Rainfall types include Convectional, Orographic (relief/windward Western Ghats), and Cyclonic.',
        bodyGu: 'સાપેક્ષ ભેજ ૧૦૦% થતાં ઠારબિંદુ (Dew Point) આવે છે. પશ્ચિમ ઘાટ અને ગિરનાર જેવા વિસ્તારોમાં ભૌગોલિક/પર્વતીય (Orographic) વરસાદ મુખ્ય છે.',
        keyTerms: ['Relative Humidity', 'Dew Point', 'Orographic Rain', 'Cumulonimbus'],
      }],
      summaryPointsEn: ['Leeward slopes of mountains experience dry rain-shadow conditions.'],
      summaryPointsGu: ['પર્વતોના પવનવિમુખ ઢોળાવ પર વૃષ્ટિછાયા (Rain Shadow) નો વિસ્તાર બને છે.'],
    },
    {
      id: 'ncert-geo-b1-ch11',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 11,
      partLabelEn: 'Book 1 — Fundamentals of Physical Geography (14 Chapters)',
      partLabelGu: 'પુસ્તક ૧ — ભૌતિક ભૂગોળના સિદ્ધાંતો (૧૪ પ્રકરણ)',
      titleEn: 'Ch 11: World Climate and Climate Change',
      titleGu: 'પ્રકરણ ૧૧: વિશ્વની આબોહવા અને આબોહવા પરિવર્તન',
      readingTimeMinutes: 8,
      sourceAttribution: 'NCERT Class 11 Fundamentals of Physical Geography',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy211.pdf',
      sections: [{
        id: 'ncert-geo-b1-ch11-s1',
        headingEn: '11.1 Koeppen Classification & Greenhouse Warming',
        headingGu: '૧૧.૧ કોપેનનું આબોહવા વર્ગીકરણ અને ગ્લોબલ વોર્મિંગ',
        bodyEn: 'Wladimir Koeppen grouped world climates using temperature/precipitation letters: A (Tropical), B (Dry — BWh/BSh in Kutch/Saurashtra), C (Warm Temperate), D (Cold Snow Forest), and E (Polar). Human greenhouse emissions (CO2, CH4, N2O, CFCs) intensify radiative forcing.',
        bodyGu: 'વ્લાદિમીર કોપેને આબોહવાને A, B, C, D, E જૂથોમાં વહેંચી. ગુજરાતના કચ્છ અને સૌરાષ્ટ્રના ભાગોમાં BWhw / BShw શુષ્ક-અર્ધશુષ્ક આબોહવા જોવા મળે છે.',
        keyTerms: ['Koeppen Scheme', 'Greenhouse Gases', 'Kyoto & Paris'],
      }],
      summaryPointsEn: ['Most of Peninsular India falls under Koeppen Aw (Tropical Savanna) or Amw (Monsoon).'],
      summaryPointsGu: ['કોપેન મુજબ ભારતના મોટા ભાગમાં Aw અને Amw પ્રકારની આબોહવા છે.'],
    },
    {
      id: 'ncert-geo-b1-ch12',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 12,
      partLabelEn: 'Book 1 — Fundamentals of Physical Geography (14 Chapters)',
      partLabelGu: 'પુસ્તક ૧ — ભૌતિક ભૂગોળના સિદ્ધાંતો (૧૪ પ્રકરણ)',
      titleEn: 'Ch 12: Water (Oceans)',
      titleGu: 'પ્રકરણ ૧૨: મહાસાગરો (તળ ભૂપૃષ્ઠ, તાપમાન અને ક્ષારતા)',
      readingTimeMinutes: 8,
      sourceAttribution: 'NCERT Class 11 Fundamentals of Physical Geography',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy212.pdf',
      sections: [{
        id: 'ncert-geo-b1-ch12-s1',
        headingEn: '12.1 Ocean Floor Divisions, Thermocline & Salinity',
        headingGu: '૧૨.૧ સમુદ્રતળના વિભાગો, થર્મોક્લાઇન અને ક્ષારતા',
        bodyEn: 'Ocean bottom comprises Continental Shelf, Continental Slope, Deep Sea Plain, and Oceanic Deeps (Trenches like Mariana). Temperature drops sharply in the Thermocline zone (100–1,000m). Average ocean salinity is 35 parts per thousand (‰), peaking in subtropical high-pressure belts.',
        bodyGu: 'સમુદ્રતળમાં ખંડીય છાજલી, ખંડીય ઢોળાવ, ઊંડા મેદાનો અને ખાઈ (Trenches) આવેલા છે. સમુદ્રની સરેરાશ ક્ષારતા ૩૫‰ છે.',
        keyTerms: ['Continental Shelf', 'Thermocline', 'Halocline', '35‰ Salinity'],
      }],
      summaryPointsEn: ['Arabian Sea exhibits higher surface salinity than the Bay of Bengal due to lower river inflow and higher evaporation.'],
      summaryPointsGu: ['બંગાળની ખાડી કરતાં અરબ સાગરમાં ક્ષારતા વધુ જોવા મળે છે.'],
    },
    {
      id: 'ncert-geo-b1-ch13',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 13,
      partLabelEn: 'Book 1 — Fundamentals of Physical Geography (14 Chapters)',
      partLabelGu: 'પુસ્તક ૧ — ભૌતિક ભૂગોળના સિદ્ધાંતો (૧૪ પ્રકરણ)',
      titleEn: 'Ch 13: Movements of Ocean Water',
      titleGu: 'પ્રકરણ ૧૩: મહાસાગરીય જળનું હલનચલન (મોજાં, ભરતી અને પ્રવાહો)',
      readingTimeMinutes: 8,
      sourceAttribution: 'NCERT Class 11 Fundamentals of Physical Geography',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy213.pdf',
      sections: [{
        id: 'ncert-geo-b1-ch13-s1',
        headingEn: '13.1 Spring/Neap Tides & Warm/Cold Ocean Currents',
        headingGu: '૧૩.૧ ગુરુ-લઘુ ભરતી અને ગરમ-ઠંડા મહાસાગરીય પ્રવાહો',
        bodyEn: 'Tides result from lunar and solar gravitational pull plus centrifugal force: Spring Tides occur at Full/New Moon (Syzygy), Neap Tides at Quadrature. Warm currents (Gulf Stream, Kuroshio) meet cold currents (Labrador, Oyashio) to form rich fishing grounds.',
        bodyGu: 'પૂનમ અને અમાસે ગુરુ ભરતી (Spring Tide) અને સુદ-વદ આઠમે લઘુ ભરતી (Neap Tide) આવે છે. ગુજરાતના ખંભાતના અખાતમાં દેશની સૌથી ઊંચી ભરતી જોવા મળે છે.',
        keyTerms: ['Spring & Neap Tides', 'Gulf of Khambhat Tides', 'Warm & Cold Currents'],
      }],
      summaryPointsEn: ['Gulf of Khambhat and Gulf of Kutch hold India’s highest tidal energy potential.'],
      summaryPointsGu: ['ખંભાત અને કચ્છનો અખાત ભારતમાં ભરતી ઊર્જા માટે શ્રેષ્ઠ ક્ષમતા ધરાવે છે.'],
    },
    {
      id: 'ncert-geo-b1-ch14',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 14,
      partLabelEn: 'Book 1 — Fundamentals of Physical Geography (14 Chapters)',
      partLabelGu: 'પુસ્તક ૧ — ભૌતિક ભૂગોળના સિદ્ધાંતો (૧૪ પ્રકરણ)',
      titleEn: 'Ch 14: Biodiversity and Conservation',
      titleGu: 'પ્રકરણ ૧૪: જૈવવિવિધતા અને સંરક્ષણ',
      readingTimeMinutes: 7,
      sourceAttribution: 'NCERT Class 11 Fundamentals of Physical Geography',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy214.pdf',
      sections: [{
        id: 'ncert-geo-b1-ch14-s1',
        headingEn: '14.1 Genetic, Species & Ecosystem Diversity & IUCN Categories',
        headingGu: '૧૪.૧ જનીનિક, પ્રજાતિ અને નિવસનતંત્ર વિવિધતા તથા IUCN શ્રેણીઓ',
        bodyEn: 'Biodiversity encompasses genetic, species, and ecosystem levels, concentrating in tropical hotspots. Conservation involves In-situ (National Parks like Gir & Marine NP Jamnagar, Biosphere Reserves like Kachchh) and Ex-situ methods alongside IUCN Red List monitoring.',
        bodyGu: 'જૈવવિવિધતાના સંરક્ષણમાં સ્વસ્થાને (In-situ: ગીર, વેળાવદર, કચ્છ બાયોસ્ફિયર રિઝર્વ) અને પરસ્થાને (Ex-situ) પદ્ધતિઓ વપરાય છે.',
        keyTerms: ['In-situ Conservation', 'Biodiversity Hotspots', 'IUCN Red List'],
      }],
      summaryPointsEn: ['India is one of 17 global Mega-Diverse countries with 4 biodiversity hotspots.'],
      summaryPointsGu: ['ભારત વિશ્વના ૧૭ મેગા-ડાયવર્સ દેશોમાંનો એક છે.'],
    },
    {
      id: 'ncert-geo-b2-ch1',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 15,
      partLabelEn: 'Book 2 — India: Physical Environment (6 Chapters)',
      partLabelGu: 'પુસ્તક ૨ — ભારત: ભૌતિક પર્યાવરણ (૬ પ્રકરણ)',
      titleEn: 'India Ch 1: India — Location',
      titleGu: 'ભારત પ્રકરણ ૧: ભારત — સ્થાન, સીમા અને પડોશી દેશો',
      readingTimeMinutes: 7,
      sourceAttribution: 'NCERT Class 11 India: Physical Environment',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy101.pdf',
      sections: [{
        id: 'ncert-geo-b2-ch1-s1',
        headingEn: '15.1 Latitudinal/Longitudinal Extent & IST (82°30′ E)',
        headingGu: '૧૫.૧ અક્ષાંશીય-રેખાંશીય વિસ્તાર અને ભારતીય પ્રમાણ સમય (82°30′ પૂર્વ)',
        bodyEn: 'India extends from 8°4′ N to 37°6′ N and 68°7′ E (Guhar Moti, Kutch, Gujarat — westernmost point of India!) to 97°25′ E (Kibithu, Arunachal Pradesh). The 82°30′ E Standard Meridian sets IST (UTC+5:30). India has a 7,516.6 km coastline, with Gujarat having the longest state coastline (~1,600+ km).',
        bodyGu: 'ભારતનો સૌથી પશ્ચિમી છેડો ગુજરાતના કચ્છ જિલ્લામાં ગુહાર મોતી (68°7′ E) ખાતે છે. ભારતનો પ્રમાણ સમય 82°30′ પૂર્વ રેખાંશથી નક્કી થાય છે. ગુજરાત દેશનો સૌથી લાંબો દરિયાકિનારો ધરાવે છે.',
        keyTerms: ['Guhar Moti Gujarat', '82°30′ E IST', 'Tropic of Cancer Gujarat'],
      }],
      summaryPointsEn: ['Tropic of Cancer (23°30′ N) passes through 8 Indian states including Gujarat (Kutch, Patan, Mehsana, Gandhinagar, Sabarkantha, Aravalli).'],
      summaryPointsGu: ['કર્કવૃત્ત ગુજરાત સહિત ભારતના ૮ રાજ્યોમાંથી પસાર થાય છે.'],
    },
    {
      id: 'ncert-geo-b2-ch2',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 16,
      partLabelEn: 'Book 2 — India: Physical Environment (6 Chapters)',
      partLabelGu: 'પુસ્તક ૨ — ભારત: ભૌતિક પર્યાવરણ (૬ પ્રકરણ)',
      titleEn: 'India Ch 2: Structure and Physiography',
      titleGu: 'ભારત પ્રકરણ ૨: ભૂસ્તરીય રચના અને ભૂપૃષ્ઠ',
      readingTimeMinutes: 10,
      sourceAttribution: 'NCERT Class 11 India: Physical Environment',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy102.pdf',
      sections: [{
        id: 'ncert-geo-b2-ch2-s1',
        headingEn: '16.1 Physiographic Divisions: Himalayas, Plains, Peninsular Plateau & Gujarat',
        headingGu: '૧૬.૧ હિમાલય, ઉત્તર મેદાન, દ્વીપકલ્પીય ઉચ્ચપ્રદેશ અને ગુજરાતનું ભૂપૃષ્ઠ',
        bodyEn: 'Six physiographic divisions shape India: Northern Mountains (Himalayas — Himadri, Himachal, Shiwalik; Karewa formations), Indo-Gangetic Plains (Bhabar, Terai, Bhangar, Khadar), Peninsular Plateau, Indian Desert (Thar), Coastal Plains (Kutch & Kathiawar Peninsula), and Islands (Andaman-Nicobar, Lakshadweep).',
        bodyGu: 'ભારતના ૬ પ્રાકૃતિક વિભાગો: ઉત્તરના પર્વતો, ઉત્તરના મેદાનો (ભાબર, તરાઈ, ભાંગર, ખદર), દ્વીપકલ્પીય ઉચ્ચપ્રદેશ, થરનું રણ, તટીય મેદાનો (કચ્છ-કાઠિયાવાડ) અને દ્વીપસમૂહો.',
        keyTerms: ['Bhabar & Terai', 'Bhangar & Khadar', 'Western Ghats', 'Kutch & Kathiawar'],
      }],
      summaryPointsEn: ['Gorakhnath Peak (1,117 m) in Girnar is the highest point in Gujarat; Anamudi (2,695 m) is the highest in Peninsular India.'],
      summaryPointsGu: ['ગિરનારનું ગોરખનાથ શિખર (૧,૧૧૭ મીટર) ગુજરાતનું સર્વોચ્ચ શિખર છે.'],
    },
    {
      id: 'ncert-geo-b2-ch3',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 17,
      partLabelEn: 'Book 2 — India: Physical Environment (6 Chapters)',
      partLabelGu: 'પુસ્તક ૨ — ભારત: ભૌતિક પર્યાવરણ (૬ પ્રકરણ)',
      titleEn: 'India Ch 3: Drainage System',
      titleGu: 'ભારત પ્રકરણ ૩: ભારત અને ગુજરાતનું નદી તંત્ર',
      readingTimeMinutes: 10,
      sourceAttribution: 'NCERT Class 11 India: Physical Environment',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy103.pdf',
      sections: [{
        id: 'ncert-geo-b2-ch3-s1',
        headingEn: '17.1 Himalayan vs Peninsular Rivers & Gujarat River Basins',
        headingGu: '૧૭.૧ હિમાલયન વિરુદ્ધ દ્વીપકલ્પીય નદીઓ અને ગુજરાતની નદીઓ',
        bodyEn: 'Unlike east-flowing Peninsular rivers forming deltas in the Bay of Bengal, Narmada and Tapi flow west through structural rift valleys into the Gulf of Khambhat forming estuaries. In Gujarat, Sabarmati, Mahi (crosses Tropic of Cancer twice), Narmada, Tapi, Bhadar, and Shetrunji support agriculture alongside Kutch inland seasonal streams.',
        bodyGu: 'નર્મદા અને તાપી ફાટ ખીણમાંથી વહીને ખંભાતના અખાતને મળે છે, જ્યારે મહી નદી કર્કવૃત્તને બે વાર ઓળંગે છે.',
        keyTerms: ['Narmada & Tapi Rift', 'Mahi Twice Tropic', 'Panch Prayag', 'Radial Drainage'],
      }],
      summaryPointsEn: ['Narmada originates at Amarkantak Plateau; Tapi at Multai (Betul); Sabarmati near Dhebar Lake (Aravallis).'],
      summaryPointsGu: ['નર્મદા અમરકંટક, તાપી મુલતાઈ અને સાબરમતી ઢેબર તળાવ પાસેથી નીકળે છે.'],
    },
    {
      id: 'ncert-geo-b2-ch4',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 18,
      partLabelEn: 'Book 2 — India: Physical Environment (6 Chapters)',
      partLabelGu: 'પુસ્તક ૨ — ભારત: ભૌતિક પર્યાવરણ (૬ પ્રકરણ)',
      titleEn: 'India Ch 4: Climate',
      titleGu: 'ભારત પ્રકરણ ૪: ભારતની આબોહવા અને ચોમાસું',
      readingTimeMinutes: 10,
      sourceAttribution: 'NCERT Class 11 India: Physical Environment',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy104.pdf',
      sections: [{
        id: 'ncert-geo-b2-ch4-s1',
        headingEn: '18.1 Mechanism of Indian Monsoon, ITCZ, Jet Streams & ENSO',
        headingGu: '૧૮.૧ ભારતીય ચોમાસાનું તંત્ર, ITCZ, જેટ સ્ટ્રીમ અને અલ-નીનો',
        bodyEn: 'The Southwest Monsoon is triggered by northward ITCZ shift, intense Tibetan Plateau heating, Tropical Easterly Jet Stream, and Mascarene High pressure. Pre-monsoon storms include Mango Showers (Kerala/Karnataka) and Kalbaisakhi (Bengal/Assam), while Northeast Monsoon brings winter rains to Tamil Nadu.',
        bodyGu: 'ભારતીય ચોમાસું ITCZ ના ઉત્તર તરફના ખસવા, તિબેટની ગરમી અને પૂર્વીય જેટ સ્ટ્રીમ પર આધારિત છે. અલ-નીનો અને IOD તેની તીવ્રતાને અસર કરે છે.',
        keyTerms: ['ITCZ Migration', 'Mascarene High', 'ENSO & IOD', 'Kalbaisakhi'],
      }],
      summaryPointsEn: ['Western Disturbances originating over the Mediterranean bring winter rabi-crop rains to NW India and North Gujarat.'],
      summaryPointsGu: ['પશ્ચિમી વિક્ષોભ (Western Disturbances) શિયાળામાં ઉત્તર ભારતમાં માવઠું લાવે છે.'],
    },
    {
      id: 'ncert-geo-b2-ch5',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 19,
      partLabelEn: 'Book 2 — India: Physical Environment (6 Chapters)',
      partLabelGu: 'પુસ્તક ૨ — ભારત: ભૌતિક પર્યાવરણ (૬ પ્રકરણ)',
      titleEn: 'India Ch 5: Natural Vegetation',
      titleGu: 'ભારત પ્રકરણ ૫: કુદરતી વનસ્પતિ અને જંગલો',
      readingTimeMinutes: 8,
      sourceAttribution: 'NCERT Class 11 India: Physical Environment',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy105.pdf',
      sections: [{
        id: 'ncert-geo-b2-ch5-s1',
        headingEn: '19.1 Five Major Forest Types & Mangrove Ecosystems',
        headingGu: '૧૯.૧ ભારતના પાંચ મુખ્ય જંગલ પ્રકારો અને મેન્ગ્રૂવ્સ',
        bodyEn: 'India’s forests span Tropical Evergreen (>200 cm rain), Tropical Deciduous (Moist & Dry Teak/Sal — most widespread, including Gir & Dangs in Gujarat), Tropical Thorn (Kutch/Saurashtra Babul/Khejri), Montane, and Littoral/Swamp Mangroves (Sundarbans & Gulf of Kutch — second largest mangrove cover in India!).',
        bodyGu: 'ભારતમાં ઉષ્ણકટિબંધીય પાનખર જંગલો સૌથી વધુ છે (ગીર અને ડાંગ). મેન્ગ્રૂવ્સ (ચેરના જંગલો) માં ગુજરાત દેશમાં બીજા ક્રમે છે.',
        keyTerms: ['Tropical Deciduous', 'Kutch Mangroves', 'MISHTI Scheme'],
      }],
      summaryPointsEn: ['Gujarat holds India’s second-largest Mangrove cover (after West Bengal Sundarbans).'],
      summaryPointsGu: ['પશ્ચિમ બંગાળ પછી ગુજરાત દેશમાં સૌથી વધુ મેન્ગ્રૂવ્સ (ચેર) વિસ્તાર ધરાવે છે.'],
    },
    {
      id: 'ncert-geo-b2-ch6',
      bookId: 'ncert-geography-physical-human',
      chapterNumber: 20,
      partLabelEn: 'Book 2 — India: Physical Environment (6 Chapters)',
      partLabelGu: 'પુસ્તક ૨ — ભારત: ભૌતિક પર્યાવરણ (૬ પ્રકરણ)',
      titleEn: 'India Ch 6: Natural Hazards and Disasters',
      titleGu: 'ભારત પ્રકરણ ૬: કુદરતી આપત્તિઓ અને આપત્તિ વ્યવસ્થાપન',
      readingTimeMinutes: 8,
      sourceAttribution: 'NCERT Class 11 India: Physical Environment',
      officialChapterPdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy106.pdf',
      sections: [{
        id: 'ncert-geo-b2-ch6-s1',
        headingEn: '20.1 Seismic Zones (Kutch Zone V), Cyclones & NDMA/GSDMA',
        headingGu: '૨૦.૧ ભૂકંપ ઝોન (કચ્છ ઝોન-૫), ચક્રવાત અને GSDMA',
        bodyEn: 'India classifies seismic risk into Zones II–V, with Kutch (site of the 2001 Bhuj earthquake) falling in high-risk Zone V. Following the 2001 earthquake, Gujarat pioneered India’s first State Disaster Management Authority (GSDMA, 2003), predating the National Disaster Management Act of 2005.',
        bodyGu: 'કચ્છ વિસ્તાર અતિ-જોખમી ભૂકંપ ઝોન-૫ માં આવે છે. ૨૦૦૧ના કચ્છ ભૂકંપ પછી ગુજરાતે ૨૦૦૩માં દેશનું પ્રથમ રાજ્ય આપત્તિ વ્યવસ્થાપન તંત્ર (GSDMA) સ્થાપ્યું.',
        keyTerms: ['Seismic Zone V Kutch', 'GSDMA 2003', 'NDMA Act 2005', 'Sendai Framework'],
      }],
      summaryPointsEn: ['Gujarat State Disaster Management Act (2003) served as a model for the Central NDMA Act (2005).'],
      summaryPointsGu: ['ગુજરાતનો GSDMA કાયદો (૨૦૦૩) રાષ્ટ્રીય NDMA કાયદા (૨૦૦૫) માટે આદર્શ બન્યો.'],
    },
  ],

  // =========================================================================
  // 4. GSSTB SOCIAL SCIENCE (CLASSES 9 & 10)
  // =========================================================================
  'gsstb-social-science-std9-10': [
    {
      id: 'gsstb-ss-ch1',
      bookId: 'gsstb-social-science-std9-10',
      chapterNumber: 1,
      partLabelEn: 'Unit 1 — Cultural Heritage of Gujarat',
      partLabelGu: 'એકમ ૧ — ગુજરાતનો સાંસ્કૃતિક વારસો',
      titleEn: 'Architecture, Stepwells, Handicrafts & Folk Traditions of Gujarat',
      titleGu: 'ગુજરાતનું સ્થાપત્ય, વાવ, હસ્તકળા અને લોકપરંપરા',
      readingTimeMinutes: 10,
      sourceAttribution: 'Gujarat State Board of School Textbooks (GSSTB) — Social Science Std 10',
      sections: [
        {
          id: 'gsstb-ss-ch1-s1',
          headingEn: '1.1 Stepwells (Vavs), Modhera Sun Temple & Rani ki Vav',
          headingGu: '૧.૧ ગુજરાતની વાવ, મોઢેરા સૂર્યમંદિર અને રાણીની વાવ',
          bodyEn:
            'Gujarat possesses India’s richest heritage of subterranean stepwells (Vavs), categorized architecturally into Nanda (1 entrance), Bhadra (2), Jaya (3), and Vijaya (4). Rani ki Vav at Patan — a 7-storey Maru-Gurjara subterranean monument commissioned by Queen Udayamati in memory of Bhima I — was inscribed as a UNESCO World Heritage Site in 2014. Similarly, the Modhera Sun Temple (1026–27 CE, Pushpavati river) exemplifies Solanki mastery with its Surya Kund and 52-pillared Sabhamandapa.',
          bodyGu:
            'ગુજરાતમાં જળ સંચય અને સ્થાપત્યનો અદભુત સંગમ "વાવ" ના સ્વરૂપે જોવા મળે છે, જેના પ્રવેશદ્વાર મુજબ નંદા (૧), ભદ્રા (૨), જયા (૩) અને વિજયા (૪) એમ ચાર પ્રકાર છે. પાટણની સાત માળની રાણીની વાવ (રાણી ઉદયમતી દ્વારા ભીમદેવ પહેલાની યાદમાં નિર્મિત) ને ૨૦૧૪માં UNESCO વર્લ્ડ હેરિટેજ સાઇટનો દરજ્જો મળ્યો.',
          keyTerms: ['Rani ki Vav', 'Modhera Sun Temple', 'Nanda Bhadra Jaya Vijaya', 'Patola Patan'],
        },
      ],
      summaryPointsEn: [
        'UNESCO Sites in Gujarat: Champaner-Pavagadh (2004), Rani ki Vav Patan (2014), Historic City of Ahmadabad (2017), Dholavira (2021).',
        'Double-ikkat Patan Patola silk weaving and Bhavai (founded by Asait Thakar) are flagship cultural traditions.',
      ],
      summaryPointsGu: [
        'ગુજરાતની ૪ UNESCO વર્લ્ડ હેરિટેજ સાઇટ્સ: ચાંપાનેર (૨૦૦૪), રાણીની વાવ (૨૦૧૪), અમદાવાદ (૨૦૧૭), ધોળાવીરા (૨૦૨૧).',
      ],
    },
    {
      id: 'gsstb-ss-ch2',
      bookId: 'gsstb-social-science-std9-10',
      chapterNumber: 2,
      partLabelEn: 'Unit 2 — Gujarat Freedom Struggle',
      partLabelGu: 'એકમ ૨ — ગુજરાતનો સ્વાતંત્ર્ય સંગ્રામ',
      titleEn: 'Borsad, Bardoli (1928) & Mahagujarat Movement (1956–60)',
      titleGu: 'બોરસદ, બારડોલી સત્યાગ્રહ (૧૯૨૮) અને મહાગુજરાત આંદોલન',
      readingTimeMinutes: 9,
      sourceAttribution: 'Gujarat State Board of School Textbooks (GSSTB) — Social Science',
      sections: [
        {
          id: 'gsstb-ss-ch2-s1',
          headingEn: '2.1 Bardoli Satyagraha & Birth of Gujarat State',
          headingGu: '૨.૧ બારડોલી સત્યાગ્રહ અને ગુજરાત રાજ્યની સ્થાપના',
          bodyEn:
            'In 1928, when the Bombay Presidency raised land revenue in Bardoli taluka by 22%, Vallabhbhai Patel led peasants in peaceful non-payment. After the Broomfield-Maxwell inquiry slashed the hike to 6.03%, the women of Bardoli conferred the title "Sardar" upon Patel. Decades later, following the States Reorganisation Act of 1956, Indulal Yagnik led the Mahagujarat Janata Parishad, culminating in the bifurcation of Bombay State and inauguration of Gujarat by Ravi Shankar Maharaj on 1 May 1960.',
          bodyGu:
            '૧૯૨૮માં બ્રિટિશ સરકારે બારડોલીમાં મહેસૂલમાં ૨૨% નો વધારો કર્યો ત્યારે વલ્લભભાઈ પટેલે સત્યાગ્રહનું નેતૃત્વ કર્યું. સફળતા બાદ બારડોલીની બહેનોએ તેમને "સરદાર" નું બિરુદ આપ્યું. આઝાદી પછી ૧૯૫૬માં ઈન્દુલાલ યાજ્ઞિકના નેતૃત્વમાં મહાગુજરાત આંદોલન ચાલ્યું અને ૧ મે ૧૯૬૦ના રોજ રવિશંકર મહારાજના હસ્તે ગુજરાત રાજ્યની સ્થાપના થઈ.',
          keyTerms: ['Bardoli 1928', 'Sardar Title', 'Indulal Yagnik', '1 May 1960'],
        },
      ],
      summaryPointsEn: [
        'Borsad Satyagraha (1923) opposed the punitive Haidiya Vero (dacoit tax).',
        'Gujarat State was inaugurated on 1 May 1960 at Sabarmati Ashram by Ravi Shankar Maharaj.',
      ],
      summaryPointsGu: [
        '૧૯૨૩નો બોરસદ સત્યાગ્રહ "હૈડિયા વેરો" રદ કરાવવા માટે થયો હતો.',
      ],
    },
  ],

  // =========================================================================
  // 5. GSSTB GUJARATI SAHITYA (CLASSES 11 & 12)
  // =========================================================================
  'gsstb-gujarati-sahitya-std11-12': [
    {
      id: 'gsstb-guj-ch1',
      bookId: 'gsstb-gujarati-sahitya-std11-12',
      chapterNumber: 1,
      partLabelEn: 'Era I — Medieval to Sudharak Yug',
      partLabelGu: 'યુગ ૧ — મધ્યકાલીન થી સુધારક યુગ',
      titleEn: 'Narsinh, Akho, Premanand, Narmad & Dalpatram',
      titleGu: 'નરસિંહ, અખો, પ્રેમાનંદ, કવિ નર્મદ અને દલપતરામ',
      readingTimeMinutes: 9,
      sourceAttribution: 'GSSTB Gujarati First Language Textbooks (Std 11 & 12)',
      sections: [
        {
          id: 'gsstb-guj-ch1-s1',
          headingEn: '1.1 Pioneers of Gujarati Verse & Reformist Prose',
          headingGu: '૧.૧ ગુજરાતી પદ્ય અને સુધારક યુગના ગદ્યના પ્રણેતાઓ',
          bodyEn:
            'Narsinh Mehta (15th century, Talaja/Junagadh) is revered as the Adi Kavi of Gujarati literature; his "Vaishnav Jan To" encapsulates universal empathy. Akho pioneered philosophical six-line Chhappa verses attacking superstition, while Premanand perfected the Aakhyan narrative performed with brass pots (Manbhat). In the 19th-century Sudharak Yug, Kavi Narmad authored "Mari Hakikat" (first Gujarati autobiography) and "Narmakosh" (first dictionary), heralding modern prose alongside Dalpatram.',
          bodyGu:
            '૧૫મી સદીના નરસિંહ મહેતા ગુજરાતી સાહિત્યના આદિકવિ ગણાય છે. અખાના છપ્પા અને પ્રેમાનંદના આખ્યાન (માણભટ્ટ પરંપરા) મધ્યકાલીન સાહિત્યના શિખરો છે. અર્વાચીન સુધારક યુગમાં કવિ નર્મદે "મારી હકીકત" (પ્રથમ આત્મકથા) અને "નર્મકોશ" (પ્રથમ શબ્દકોશ) ની રચના કરી.',
          keyTerms: ['Adi Kavi Narsinh', 'Akho Chhappa', 'Premanand Aakhyan', 'Kavi Narmad'],
        },
      ],
      summaryPointsEn: [
        'Jnanpith Awardees in Gujarati: Umashankar Joshi (1967, Nishith), Pannalal Patel (1985, Manavini Bhavai), Rajendra Shah (2001, Dhvani), Raghuveer Chaudhari (2015, Amruta).',
      ],
      summaryPointsGu: [
        'ગુજરાતી જ્ઞાનપીઠ વિજેતાઓ: ઉમાશંકર જોશી (૧૯૬૭), પન્નાલાલ પટેલ (૧૯૮૫), રાજેન્દ્ર શાહ (૨૦૦૧), રઘુવીર ચૌધરી (૨૦૧૫).',
      ],
    },
  ],

  // =========================================================================
  // 6. DIKSHA OPEN DIGITAL REPOSITORY
  // =========================================================================
  'diksha-oer-social-studies': [
    {
      id: 'diksha-ch1',
      bookId: 'diksha-oer-social-studies',
      chapterNumber: 1,
      partLabelEn: 'Module 1 — Civics & Panchayati Raj',
      partLabelGu: 'મોડ્યુલ ૧ — નાગરિકશાસ્ત્ર અને પંચાયતી રાજ',
      titleEn: '73rd & 74th Constitutional Amendments & Local Governance in Gujarat',
      titleGu: '૭૩મો અને ૭૪મો બંધારણીય સુધારો અને ગુજરાતમાં સ્થાનિક સ્વરાજ્ય',
      readingTimeMinutes: 8,
      sourceAttribution: 'DIKSHA / GCERT Open Educational Resources — Ministry of Education',
      sections: [
        {
          id: 'diksha-ch1-s1',
          headingEn: '1.1 Three-Tier Panchayati Raj & Balwantrai Mehta Legacy',
          headingGu: '૧.૧ ત્રિ-સ્તરીય પંચાયતી રાજ અને બળવંતરાય મહેતા સમિતિ',
          bodyEn:
            'Gujarat enacted the Gujarat Panchayats Act in 1961 (effective 1 April 1963) following the Rasiklal Parikh committee based on the Balwantrai Mehta report. The 73rd Amendment Act (1992) gave constitutional status via Part IX (Articles 243–243O) and the 11th Schedule (29 subjects), mandating Gram Sabha, three tiers (Gram, Taluka, District Panchayat), State Election Commission, State Finance Commission, and women reservation (50% in Gujarat).',
          bodyGu:
            'બળવંતરાય મહેતા સમિતિના આધારે ગુજરાતમાં ૧ એપ્રિલ ૧૯૬૩ થી ત્રિ-સ્તરીય પંચાયતી રાજ અમલમાં આવ્યું. ૭૩મા બંધારણીય સુધારા (૧૯૯૨) દ્વારા ભાગ-૯ અને ૧૧મી અનુસૂચિ (૨૯ વિષયો) ઉમેરી બંધારણીય દરજ્જો અપાયો. ગુજરાતમાં પંચાયતોમાં મહિલાઓ માટે ૫૦% અનામતની જોગવાઈ છે.',
          keyTerms: ['73rd Amendment', '11th Schedule', 'Gram Sabha', '50% Women Reservation'],
        },
      ],
      summaryPointsEn: [
        'PESA Act 1996 extends Panchayati Raj safeguards to Scheduled V tribal areas in Gujarat.',
      ],
      summaryPointsGu: [
        'PESA અધિનિયમ ૧૯૯૬ અનુસૂચિત આદિજાતિ વિસ્તારોમાં ગ્રામસભાને વિશેષ અધિકારો આપે છે.',
      ],
    },
  ],

  // =========================================================================
  // 7. IGNOU eGYANKOSH — PUBLIC ADMINISTRATION
  // =========================================================================
  'ignou-egyankosh-public-admin': [
    {
      id: 'ignou-pa-ch1',
      bookId: 'ignou-egyankosh-public-admin',
      chapterNumber: 1,
      partLabelEn: 'Block 1 — Administrative Thinkers',
      partLabelGu: 'બ્લોક ૧ — વહીવટી ચિંતકો',
      titleEn: 'Classical Theory, Weberian Bureaucracy & Bounded Rationality',
      titleGu: 'પ્રશિષ્ટ સિદ્ધાંત, વેબરની નોકરશાહી અને સીમિત તર્કસંગતતા',
      readingTimeMinutes: 10,
      sourceAttribution: 'IGNOU eGyanKosh — School of Social Sciences (BPAE / MPA Open Courseware)',
      sections: [
        {
          id: 'ignou-pa-ch1-s1',
          headingEn: '1.1 Wilson, Taylor, Fayol, Weber & Herbert Simon',
          headingGu: '૧.૧ વુડ્રો વિલ્સન, ટેલર, ફેયોલ, વેબર અને હર્બર્ટ સાયમન',
          bodyEn:
            'Woodrow Wilson’s 1887 essay "The Study of Administration" articulated the politics-administration dichotomy. Luther Gulick condensed executive functions into POSDCORB (Planning, Organising, Staffing, Directing, Coordinating, Reporting, Budgeting). Max Weber formulated the Legal-Rational Bureaucracy ideal type featuring hierarchy, written rules, merit-based recruitment, and impersonality. Later, Herbert Simon critiqued classical "proverbs" and proposed Decision-Making based on "Bounded Rationality" and "Satisficing" decisions.',
          bodyGu:
            'વુડ્રો વિલ્સને ૧૮૮૭માં જાહેર વહીવટને રાજકારણથી અલગ શાખા તરીકે રજૂ કરી. લ્યુથર ગુલિકે POSDCORB નું સૂત્ર આપ્યું. મેક્સ વેબરે કાયદેસર-તર્કસંગત નોકરશાહી (નિયમબદ્ધતા, પદસોપાન, લાયકાત આધારિત ભરતી) નો આદર્શ આપ્યો, જ્યારે હર્બર્ટ સાયમને "સીમિત તર્કસંગતતા" (Bounded Rationality) નો સિદ્ધાંત આપ્યો.',
          keyTerms: ['POSDCORB', 'Weberian Bureaucracy', 'Bounded Rationality', 'Hawthorne Studies'],
        },
      ],
      summaryPointsEn: [
        'Elton Mayo’s Hawthorne Studies established the Human Relations school emphasizing informal groups.',
        'Citizen’s Charter and RTI Act 2005 operationalize citizen-centric governance.',
      ],
      summaryPointsGu: [
        'એલ્ટન મેયોના હોથોર્ન પ્રયોગોએ વહીવટમાં માનવ સંબંધોનું મહત્વ સ્થાપિત કર્યું.',
      ],
    },
  ],

  // =========================================================================
  // 8. IGNOU eGYANKOSH — MODERN INDIAN HISTORY
  // =========================================================================
  'ignou-egyankosh-modern-india-history': [
    {
      id: 'ignou-hist-ch1',
      bookId: 'ignou-egyankosh-modern-india-history',
      chapterNumber: 1,
      partLabelEn: 'Block 1 — Colonial Economy & Resistance',
      partLabelGu: 'બ્લોક ૧ — સંસ્થાનવાદી અર્થતંત્ર અને પ્રતિકાર',
      titleEn: 'Drain of Wealth, Land Revenue Systems & Tribal/Peasant Revolts',
      titleGu: 'સંપત્તિનું નિર્ગમન, મહેસૂલ પદ્ધતિઓ અને આદિવાસી-ખેડૂત બળવા',
      readingTimeMinutes: 11,
      sourceAttribution: 'IGNOU eGyanKosh — EHI-01 History of Modern India (Open Access)',
      sections: [
        {
          id: 'ignou-hist-ch1-s1',
          headingEn: '1.1 Permanent, Ryotwari, Mahalwari & Economic Critique',
          headingGu: '૧.૧ કાયમી જમાબંધી, રૈયતવારી, મહાલવારી અને આર્થિક શોષણ',
          bodyEn:
            'British agrarian exploitation operated through three settlements: Permanent Settlement (Cornwallis, 1793, Bengal/Bihar — created absentee Zamindars), Ryotwari System (Thomas Munro & Alexander Read, Madras & Bombay/Gujarat — direct assessment on cultivators), and Mahalwari System (Holt Mackenzie, NWFP/Punjab — village unit assessment). Early nationalists like Dadabhai Naoroji ("Poverty and Un-British Rule in India"), R.C. Dutt, and Mahadev Govind Ranade quantified the "Drain of Wealth" via Home Charges, military expenditure, and unrequited exports.',
          bodyGu:
            'બ્રિટિશરોએ કાયમી જમાબંધી (૧૭૯૩ - કોર્નવોલિસ), રૈયતવારી (મદ્રાસ અને બોમ્બે/ગુજરાત) અને મહાલવારી પદ્ધતિ દ્વારા ખેડૂતોનું શોષણ કર્યું. દાદાભાઈ નવરોજીએ "ધનના નિર્ગમન" (Drain of Wealth) નો સિદ્ધાંત આપી અંગ્રેજ શાસનના આર્થિક શોષણને ખુલ્લું પાડ્યું.',
          keyTerms: ['Permanent Settlement', 'Ryotwari', 'Drain of Wealth', 'Dadabhai Naoroji'],
        },
      ],
      summaryPointsEn: [
        'Dadabhai Naoroji estimated per capita income in 1867-68 at Rs 20 per annum.',
        'Okhamandal Waghers and Naikda uprisings mark notable early anti-colonial resistance in Gujarat.',
      ],
      summaryPointsGu: [
        'ઓખામંડળના વાઘેરોનો વિદ્રોહ ગુજરાતનો મહત્વપૂર્ણ પ્રારંભિક સ્વાતંત્ર્ય સંગ્રામ હતો.',
      ],
    },
  ],

  // =========================================================================
  // 9. e-PG PATHSHALA — INDIAN CULTURE
  // =========================================================================
  'epg-pathshala-indian-culture': [
    {
      id: 'epgp-cult-ch1',
      bookId: 'epg-pathshala-indian-culture',
      chapterNumber: 1,
      partLabelEn: 'Paper P-04 — Temple Architecture & Epigraphy',
      partLabelGu: 'પેપર P-૦૪ — મંદિર સ્થાપત્ય અને અભિલેખશાસ્ત્ર',
      titleEn: 'Nagara, Dravida, Vesara Styles & Maru-Gurjara Heritage',
      titleGu: 'નાગર, દ્રવિડ, વેસર શૈલીઓ અને મારુ-ગુર્જર સ્થાપત્ય',
      readingTimeMinutes: 10,
      sourceAttribution: 'e-PG Pathshala (UGC / INFLIBNET Centre Gandhinagar)',
      sections: [
        {
          id: 'epgp-cult-ch1-s1',
          headingEn: '1.1 Architectural Vocabulary of Indian Temples',
          headingGu: '૧.૧ ભારતીય મંદિર સ્થાપત્યની પરિભાષા અને પ્રાદેશિક શૈલીઓ',
          bodyEn:
            'Classical Indian temple architecture divides into three major styles: Nagara (Northern — curvilinear Rekha-prasada Shikhara crowned by Amalaka and Kalasha, elevated Jagati plinth), Dravida (Southern — stepped pyramid Vimana, enclosed walls with monumental Gopurams, Kalyani tank), and Vesara (Deccan hybrid championed by Chalukyas and Hoysalas using star-shaped stellate plans). In Gujarat, the Solanki (Maru-Gurjara) idiom flourishes at Modhera Sun Temple, Rudra Mahalaya, and the marble Dilwara/Taranga shrines.',
          bodyGu:
            'ભારતીય મંદિર સ્થાપત્યની ત્રણ મુખ્ય શૈલીઓ છે: નાગર (ઉત્તર ભારત - વળાંકવાળું શિખર, આમલક, કળશ), દ્રવિડ (દક્ષિણ ભારત - પિરામિડ આકારનું વિમાન અને ભવ્ય ગોપુરમ) અને વેસર (દખ્ખણની મિશ્ર શૈલી). ગુજરાતની સોલંકી (મારુ-ગુર્જર) શૈલી મોઢેરા સૂર્યમંદિર અને રુદ્ર મહાલયમાં શ્રેષ્ઠ રીતે પ્રગટ થાય છે.',
          keyTerms: ['Nagara Shikhara', 'Amalaka', 'Dravida Gopuram', 'Maru-Gurjara'],
        },
      ],
      summaryPointsEn: [
        'Nagara temples typically lack outer boundary walls and towering gateways, unlike Dravida complexes.',
        'INFLIBNET Gandhinagar hosts e-PG Pathshala open postgraduate e-text modules.',
      ],
      summaryPointsGu: [
        'મારુ-ગુર્જર શૈલીમાં સૂક્ષ્મ નકશીકામ, તોરણ અને સભામંડપની વિશિષ્ટ રચના હોય છે.',
      ],
    },
  ],

  // =========================================================================
  // 10. THE CONSTITUTION OF INDIA (OFFICIAL BARE ACT)
  // =========================================================================
  'govt-constitution-bare-act-2024': [
    {
      id: 'const-ch1',
      bookId: 'govt-constitution-bare-act-2024',
      chapterNumber: 1,
      partLabelEn: 'Preamble & Parts I – IV-A',
      partLabelGu: 'આમુખ અને ભાગ ૧ થી ૪-A',
      titleEn: 'The Preamble, Fundamental Rights (Part III), DPSP & Fundamental Duties',
      titleGu: 'આમુખ, મૂળભૂત અધિકારો (ભાગ-૩), રાજ્યનીતિના માર્ગદર્શક સિદ્ધાંતો અને ફરજો',
      readingTimeMinutes: 12,
      sourceAttribution: 'Legislative Department, Ministry of Law & Justice, Government of India',
      sections: [
        {
          id: 'const-ch1-s1',
          headingEn: '1.1 Authentic Text of the Preamble & Key Constitutional Amendments',
          headingGu: '૧.૧ આમુખનો સત્તાવાર પાઠ અને મહત્વના બંધારણીય સુધારા',
          bodyEn:
            'WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE (social, economic and political); LIBERTY (of thought, expression, belief, faith and worship); EQUALITY (of status and of opportunity); and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation. The terms "Socialist", "Secular", and "Integrity" were inserted by the 42nd Amendment Act, 1976.',
          bodyGu:
            'અમે, ભારતના લોકો, ભારતને એક સાર્વભૌમ, સમાજવાદી, બિનસાંપ્રદાયિક, લોકતંત્રાત્મક, પ્રજાસત્તાક તરીકે સંસ્થાપિત કરવાનો તથા તેના સર્વ નાગરિકોને સામાજિક, આર્થિક અને રાજકીય ન્યાય; વિચાર, અભિવ્યક્તિ, વિશ્વાસ, ધર્મ અને ઉપાસનાની સ્વતંત્રતા; પ્રતિષ્ઠા અને તકની સમાનતા પ્રાપ્ત કરાવવાનો સંકલ્પ કરીએ છીએ. ૪૨મા સુધારા (૧૯૭૬) દ્વારા "સમાજવાદી", "બિનસાંપ્રદાયિક" અને "અખંડિતતા" શબ્દો ઉમેરાયા.',
          keyTerms: ['Preamble 1949', '42nd Amendment 1976', '86th Amendment Art 21A', '106th Amendment Nari Shakti'],
        },
      ],
      summaryPointsEn: [
        '101st Amendment: GST; 102nd: NCBC Constitutional status; 103rd: 10% EWS reservation; 106th: 33% Women Reservation (Nari Shakti Vandan Adhiniyam).',
      ],
      summaryPointsGu: [
        '૧૦૧મો સુધારો (GST), ૧૦૩મો સુધારો (EWS), ૧૦૬મો સુધારો (નારી શક્તિ વંદન અધિનિયમ - ૩૩% મહિલા અનામત).',
      ],
    },
    {
      id: 'const-ch2',
      bookId: 'govt-constitution-bare-act-2024',
      chapterNumber: 2,
      partLabelEn: 'Schedules & Emergency Provisions',
      partLabelGu: 'અનુસૂચિઓ અને કટોકટીની જોગવાઈઓ',
      titleEn: 'Twelve Schedules & Articles 352, 356, 360',
      titleGu: 'બાર અનુસૂચિઓ અને કટોકટીની કલમો (૩૫૨, ૩૫૬, ૩૬૦)',
      readingTimeMinutes: 9,
      sourceAttribution: 'Legislative Department, Ministry of Law & Justice, Government of India',
      sections: [
        {
          id: 'const-ch2-s1',
          headingEn: '2.1 Quick Reference of Constitutional Schedules & Emergency Powers',
          headingGu: '૨.૧ બાર અનુસૂચિઓ અને કટોકટીના પ્રકારોની ઝડપી સમજૂતી',
          bodyEn:
            'The Constitution originally had 8 Schedules; today there are 12. Key Schedules frequently tested in GPSC include: 7th Schedule (Union/State/Concurrent Lists), 8th Schedule (22 Official Languages including Gujarati), 10th Schedule (Anti-Defection Law added by 52nd Amendment 1985), 11th Schedule (Panchayats), and 12th Schedule (Municipalities). Part XVIII covers Emergency Provisions: National Emergency (Art 352 — war, external aggression, or armed rebellion), President’s Rule (Art 356), and Financial Emergency (Art 360 — never imposed).',
          bodyGu:
            'મૂળ બંધારણમાં ૮ અનુસૂચિઓ હતી જે હાલમાં ૧૨ છે: ૭મી (સત્તા વિભાજન), ૮મી (૨૨ માન્ય ભાષાઓ - ગુજરાતી સહિત), ૧૦મી (પક્ષપલટા વિરોધી કાયદો - ૫૨મો સુધારો), ૧૧મી (પંચાયતો) અને ૧૨મી (નગરપાલિકાઓ). ભાગ-૧૮માં રાષ્ટ્રીય કટોકટી (કલમ ૩૫૨), રાષ્ટ્રપતિ શાસન (કલમ ૩૫૬) અને નાણાકીય કટોકટી (કલમ ૩૬૦) ની જોગવાઈ છે.',
          keyTerms: ['10th Schedule', '8th Schedule', 'Article 352', 'Article 356', 'Article 360'],
        },
      ],
      summaryPointsEn: [
        '44th Amendment replaced "internal disturbance" with "armed rebellion" in Article 352.',
        'Articles 20 and 21 can never be suspended even during a National Emergency.',
      ],
      summaryPointsGu: [
        'રાષ્ટ્રીય કટોકટી દરમિયાન પણ કલમ ૨૦ અને કલમ ૨૧ ક્યારેય સ્થગિત કરી શકાતી નથી.',
      ],
    },
  ],

  // =========================================================================
  // 11. GUJARAT SOCIO-ECONOMIC REVIEW
  // =========================================================================
  'govt-gujarat-socio-economic-review': [
    {
      id: 'guj-eco-ch1',
      bookId: 'govt-gujarat-socio-economic-review',
      chapterNumber: 1,
      partLabelEn: 'Macroeconomic Review & Infrastructure',
      partLabelGu: 'આર્થિક સમીક્ષા અને માળખાગત સુવિધાઓ',
      titleEn: 'GSDP Growth, Maritime Ports, Khavda Renewable Energy & Schemes',
      titleGu: 'GSDP વૃદ્ધિ, બંદરો, ખાવડા રિન્યુએબલ પાર્ક અને કલ્યાણકારી યોજનાઓ',
      readingTimeMinutes: 10,
      sourceAttribution: 'Directorate of Economics and Statistics, Finance Dept., Govt. of Gujarat',
      sections: [
        {
          id: 'guj-eco-ch1-s1',
          headingEn: '1.1 Industrial Corridors, Energy Transition & Irrigation',
          headingGu: '૧.૧ ઔદ્યોગિક કોરિડોર, હરિત ઊર્જા અને સિંચાઈ યોજનાઓ',
          bodyEn:
            'Gujarat accounts for ~8.3% of India’s GDP with a 1,600+ km coastline (longest among Indian states) where 48 non-major ports under the Gujarat Maritime Board handle over 40% of India’s non-major port cargo. In green energy, the Khavda Hybrid Renewable Energy Park (Kutch) targets 30 GW solar and wind capacity. Water infrastructure relies on the Sardar Sarovar Narmada Project, SAUNI Yojana (filling 115 Saurashtra reservoirs), and Sujalam Sufalam Jal Abhiyan.',
          bodyGu:
            'ભારતના જીડીપીમાં ગુજરાતનો હિસ્સો આશરે ૮.૩% છે. ૧૬૦૦+ કિમીના સૌથી લાંબા દરિયાકિનારા પર ગુજરાત મેરીટાઇમ બોર્ડ હેઠળ ૪૮ બંદરો છે. કચ્છના ખાવડા ખાતે વિશ્વનો સૌથી મોટો ૩૦ GW નો હાઇબ્રિડ રિન્યુએબલ એનર્જી પાર્ક નિર્માણાધીન છે, જ્યારે સૌની (SAUNI) યોજના અને સુજલામ સુફલામ જળ અભિયાન જળ સુરક્ષા પૂરી પાડે છે.',
          keyTerms: ['Dholera SIR', 'GIFT City IFSC', 'Khavda 30 GW', 'SAUNI Yojana'],
        },
      ],
      summaryPointsEn: [
        'Flagship welfare schemes: Namo Lakshmi (nutrition/education support for girls), Namo Saraswati (STEM support), Vhali Dikri Yojana.',
      ],
      summaryPointsGu: [
        'મુખ્ય યોજનાઓ: નમો લક્ષ્મી, નમો સરસ્વતી, વ્હાલી દીકરી યોજના અને PMJAY-MA કાર્ડ (૧૦ લાખ સુધીનું આરોગ્ય કવચ).',
      ],
    },
  ],

  // =========================================================================
  // 12. 2ND ARC REPORT 4 — ETHICS IN GOVERNANCE
  // =========================================================================
  'govt-2nd-arc-ethics-governance': [
    {
      id: 'arc-ch1',
      bookId: 'govt-2nd-arc-ethics-governance',
      chapterNumber: 1,
      partLabelEn: 'Report 4 — Administrative Ethics',
      partLabelGu: 'અહેવાલ ૪ — વહીવટમાં નૈતિકતા',
      titleEn: 'Nolan Principles, Code of Ethics & Anti-Corruption Safeguards',
      titleGu: 'નોલાન સિદ્ધાંતો, નૈતિક આચારસંહિતા અને ભ્રષ્ટાચાર નિવારણ',
      readingTimeMinutes: 9,
      sourceAttribution: 'Department of Administrative Reforms and Public Grievances (DARPG), GoI',
      sections: [
        {
          id: 'arc-ch1-s1',
          headingEn: '1.1 Seven Principles of Public Life & Institutional Integrity',
          headingGu: '૧.૧ જાહેર જીવનના સાત સિદ્ધાંતો અને સંસ્થાકીય પારદર્શિતા',
          bodyEn:
            'The Second Administrative Reforms Commission (chaired by Veerappa Moily) emphasised the Seven Nolan Principles of Public Life: Selflessness, Integrity, Objectivity, Accountability, Openness, Honesty, and Leadership. It recommended replacing mere negative "Code of Conduct" prohibitions with an affirmative "Code of Ethics" for civil servants and ministers, alongside strengthening the Prevention of Corruption Act, whistleblower protection, and independent Lokayuktas across states.',
          bodyGu:
            'દ્વિતીય વહીવટી સુધારણા પંચે જાહેર જીવનના ૭ નોલાન સિદ્ધાંતો (નિઃસ્વાર્થતા, સત્યનિષ્ઠા, વસ્તુનિષ્ઠતા, જવાબદેહિતા, ખુલ્લાપણું, પ્રામાણિકતા અને નેતૃત્વ) પર ભાર મૂક્યો. વ્હિસલબ્લોઅર સુરક્ષા અને મજબૂત લોકાયુક્ત સંસ્થાઓ ભ્રષ્ટાચાર મુક્ત વહીવટ માટે અનિવાર્ય છે.',
          keyTerms: ['Nolan Principles', 'Code of Ethics', 'Lokpal & Lokayukta', 'Whistleblower Protection'],
        },
      ],
      summaryPointsEn: [
        '2nd ARC advocates moving from rule-bound secrecy to citizen-centric transparency and social audits.',
      ],
      summaryPointsGu: [
        'નાગરિક સનદ (Citizen Charter) અને સોશિયલ ઓડિટ પારદર્શી શાસનના મુખ્ય સાધનો છે.',
      ],
    },
  ],

  // =========================================================================
  // 13. GUJARAT PAKSHIK GAZETTE
  // =========================================================================
  'govt-gujarat-pakshik-magazine': [
    {
      id: 'pakshik-ch1',
      bookId: 'govt-gujarat-pakshik-magazine',
      chapterNumber: 1,
      partLabelEn: 'Current Affairs & State Policy Digest',
      partLabelGu: 'વર્તમાન પ્રવાહો અને રાજ્ય નીતિ સાર',
      titleEn: 'Semiconductor Policy, Prakrutik Kheti & Viksit Gujarat @ 2047',
      titleGu: 'સેમિકન્ડક્ટર નીતિ, પ્રાકૃતિક ખેતી અને વિકસિત ગુજરાત @ ૨૦૪૭',
      readingTimeMinutes: 8,
      sourceAttribution: 'Directorate of Information, Government of Gujarat',
      sections: [
        {
          id: 'pakshik-ch1-s1',
          headingEn: '1.1 Strategic Policy Initiatives in Gujarat',
          headingGu: '૧.૧ ગુજરાતની વ્યૂહાત્મક નીતિગત પહેલો',
          bodyEn:
            'Gujarat became the first Indian state to launch a dedicated Semiconductor Policy (2022–27), attracting major fabrication and ATMP facilities at Dholera and Sanand. In sustainable agriculture, The Dang was declared India’s first 100% natural farming (Prakrutik Kheti) district. Tourism heritage expansion highlights the Vadnagar archaeological complex, Modhera (India’s first 24x7 solar-powered village), and the Okha–Beyt Dwarka Sudarshan Setu cable-stayed bridge.',
          bodyGu:
            'ગુજરાત સેમિકન્ડક્ટર નીતિ (૨૦૨૨-૨૭) જાહેર કરનાર દેશનું પ્રથમ રાજ્ય છે (ધોલેરા અને સાણંદ પ્રોજેક્ટ્સ). ડાંગ જિલ્લો ૧૦૦% પ્રાકૃતિક ખેતી ધરાવતો પ્રથમ જિલ્લો બન્યો છે, જ્યારે મોઢેરા ભારતનું પ્રથમ ૨૪x૭ સોલાર પાવર્ડ ગામ અને ઓખા-બેટ દ્વારકા વચ્ચેનો "સુદર્શન સેતુ" મુખ્ય માળખાગત સીમાચિહ્નો છે.',
          keyTerms: ['Semiconductor Policy', '100% Natural Farming Dang', 'Modhera Solar Village', 'Sudarshan Setu'],
        },
      ],
      summaryPointsEn: [
        'Modhera in Mehsana district operates as India’s first net-zero 24x7 solar-powered heritage village.',
      ],
      summaryPointsGu: [
        'મહેસાણાનું મોઢેરા ભારતનું પ્રથમ ૨૪x૭ સૌર ઊર્જા સંચાલિત ગામ બન્યું છે.',
      ],
    },
  ],

  // =========================================================================
  // 14. KAUTILYA'S ARTHASHASTRA (1915 PUBLIC DOMAIN)
  // =========================================================================
  'public-domain-kautilya-arthashastra': [
    {
      id: 'kautilya-ch1',
      bookId: 'public-domain-kautilya-arthashastra',
      chapterNumber: 1,
      partLabelEn: 'Books I & VI — Statecraft & Saptanga Theory',
      partLabelGu: 'અધિકરણ ૧ અને ૬ — રાજ્યશાસ્ત્ર અને સપ્તાંગ સિદ્ધાંત',
      titleEn: 'The Saptanga Theory of State & Raja-Dharma Welfare Ethic',
      titleGu: 'રાજ્યનો સપ્તાંગ સિદ્ધાંત અને પ્રજાકલ્યાણકારી રાજધર્મ',
      readingTimeMinutes: 9,
      sourceAttribution: 'Public Domain (Translated by Dr. R. Shamasastry, 1915)',
      sections: [
        {
          id: 'kautilya-ch1-s1',
          headingEn: '1.1 Seven Limbs of Sovereignty (Saptanga) & Mandala Diplomacy',
          headingGu: '૧.૧ સાર્વભૌમ રાજ્યના સાત અંગો અને મંડળ સિદ્ધાંત',
          bodyEn:
            'Kautilya defines the state organically through seven constituent elements (Prakritis / Saptanga): Swami (Ruler), Amatya (Ministers/Officials), Janapada (Territory & Population), Durga (Fortified Capital), Kosha (Treasury), Danda (Army/Law & Order), and Mitra (Allies). His welfare dictum states: "In the happiness of his subjects lies the king’s happiness; in their welfare his welfare." In foreign relations, the Mandala Theory outlines geopolitical alliances around the Vijigishu (aspirant king).',
          bodyGu:
            'કૌટિલ્યે રાજ્યના સાત અંગો (સપ્તાંગ) વર્ણવ્યા છે: સ્વામી (રાજા), અમાત્ય (મંત્રીઓ), જનપદ (પ્રદેશ અને પ્રજા), દુર્ગ (કિલ્લો), કોષ (ખજાનો), દંડ (સેના/ન્યાય) અને મિત્ર. તેમનું પ્રસિદ્ધ વચન છે: "પ્રજા સુખે સુખં રાજ્ઞઃ પ્રજાનાં ચ હિતે હિતમ્" (પ્રજાના સુખમાં જ રાજાનું સુખ છે).',
          keyTerms: ['Saptanga Theory', 'Mandala Diplomacy', 'Kosha Treasury', 'Raja-Dharma'],
        },
      ],
      summaryPointsEn: [
        'Arthashastra comprises 15 Adhikaranas (Books) spanning administration, law, finance, and diplomacy.',
      ],
      summaryPointsGu: [
        'અર્થશાસ્ત્રમાં ૧૫ અધિકરણો છે જે વહીવટ, કરવ્યવસ્થા, ન્યાય અને કૂટનીતિનું ઊંડાણપૂર્વક વિશ્લેષણ કરે છે.',
      ],
    },
  ],

  // =========================================================================
  // 15. HIND SWARAJ (MAHATMA GANDHI, 1909)
  // =========================================================================
  'public-domain-hind-swaraj-gandhi': [
    {
      id: 'hind-swaraj-ch1',
      bookId: 'public-domain-hind-swaraj-gandhi',
      chapterNumber: 1,
      partLabelEn: 'Chapters I – XX — Philosophical Dialogue',
      partLabelGu: 'પ્રકરણ ૧ થી ૨૦ — વૈચારિક સંવાદ',
      titleEn: 'True Civilization (Sudharo), Swaraj & Soul-Force (Satyagraha)',
      titleGu: 'સાચી સભ્યતા (સુધારો), સ્વરાજ અને સત્યાગ્રહ (આત્મબળ)',
      readingTimeMinutes: 10,
      sourceAttribution: 'Public Domain (Mahatma Gandhi, 1909 — Navajivan / Sevagram)',
      sections: [
        {
          id: 'hind-swaraj-ch1-s1',
          headingEn: '1.1 Self-Rule Over Mere Transfer of Power',
          headingGu: '૧.૧ માત્ર સત્તા પરિવર્તન નહીં, પરંતુ આત્મ-શાસન (સ્વરાજ)',
          bodyEn:
            'Written aboard SS Kildonan Castle in 1909 in Gujarati as a dialogue between "Reader" and "Editor", Hind Swaraj argues that true Home Rule (Swaraj) is not merely "English rule without the Englishman", but moral self-mastery and decentralized village self-reliance (Gram Swaraj). Gandhi defines civilization (Sudharo) in Gujarati as "good conduct that points out to man the path of duty" — making Means and Ends inseparable through non-violent Satyagraha.',
          bodyGu:
            '૧૯૦૯માં લખાયેલ "હિન્દ સ્વરાજ" માં ગાંધીજીએ વાચક અને તંત્રીના સંવાદ દ્વારા સ્પષ્ટ કર્યું કે સ્વરાજ એટલે માત્ર અંગ્રેજોની જગ્યાએ ભારતીય શાસકો નહીં, પરંતુ નૈતિક આત્મ-નિયંત્રણ અને ગ્રામ સ્વરાજ. તેમણે સાચી સભ્યતાને "સદવર્તન" (Good Conduct) તરીકે ઓળખાવી અને સાધન તથા સાધ્યની પવિત્રતા પર ભાર મૂક્યો.',
          keyTerms: ['Swaraj', 'Means and Ends', 'Satyagraha', 'Gram Swaraj'],
        },
      ],
      summaryPointsEn: [
        'Hind Swaraj anchors GPSC Mains Ethics (GS-4) discussions on Means vs Ends and Trusteeship.',
      ],
      summaryPointsGu: [
        'GPSC મેઈન્સ નીતિશાસ્ત્ર (Ethics) અને નિબંધમાં "સાધન-સાધ્યની પવિત્રતા" માટે અનિવાર્ય સંદર્ભ.',
      ],
    },
  ],

  // =========================================================================
  // 16. ENVIRONMENTAL ECOLOGY & CONSERVATION (CC BY-SA)
  // =========================================================================
  'cc-environmental-science-ecology': [
    {
      id: 'eco-ch1',
      bookId: 'cc-environmental-science-ecology',
      chapterNumber: 1,
      partLabelEn: 'Unit 1 — Biodiversity, Ramsar Sites & Climate Treaties',
      partLabelGu: 'એકમ ૧ — જૈવવિવિધતા, રામસર સ્થળો અને પર્યાવરણ સંધિઓ',
      titleEn: 'Biodiversity Hotspots, Ramsar Wetlands of Gujarat & Paris COP',
      titleGu: 'જૈવવિવિધતા હોટસ્પોટ્સ, ગુજરાતના રામસર સ્થળો અને આબોહવા કરારો',
      readingTimeMinutes: 10,
      sourceAttribution: 'Creative Commons CC BY-SA 4.0 — NROER / CIET & OpenStax Ecology Core',
      sections: [
        {
          id: 'eco-ch1-s1',
          headingEn: '1.1 India Hotspots & Gujarat Conservation Landscapes',
          headingGu: '૧.૧ ભારતના હોટસ્પોટ્સ અને ગુજરાતના રામસર વેટલેન્ડ્સ',
          bodyEn:
            'India hosts four global Biodiversity Hotspots: Himalayas, Indo-Burma, Western Ghats & Sri Lanka, and Sundaland (Nicobar). Gujarat protects iconic wildlife ecosystems: Gir National Park (sole natural habitat of Asiatic Lion), Velavadar Blackbuck National Park, Marine National Park (Jamnagar — India’s first marine park), and the Wild Ass Sanctuary (Little Rann of Kutch). Gujarat’s four Ramsar Wetlands of International Importance are Nalsarovar, Thol Lake, Wadhvana Wetland, and Khijadiya Bird Sanctuary.',
          bodyGu:
            'ભારતમાં ૪ વૈશ્વિક જૈવવિવિધતા હોટસ્પોટ્સ છે: હિમાલય, ઇન્ડો-બર્મા, પશ્ચિમ ઘાટ અને સુંદાલેન્ડ. ગુજરાતમાં એશિયાટિક સિંહનું એકમાત્ર નિવાસસ્થાન ગીર રાષ્ટ્રીય ઉદ્યાન, જામનગર મરીન નેશનલ પાર્ક અને ૪ રામસર સ્થળો (નળસરોવર, થોળ, વઢવાણા અને ખીજડિયા) આવેલા છે.',
          keyTerms: ['Gir Asiatic Lion', 'Marine NP Jamnagar', '4 Ramsar Sites Gujarat', 'Paris Agreement'],
        },
      ],
      summaryPointsEn: [
        'Four Ramsar Wetlands in Gujarat: Nalsarovar (2012), Thol, Wadhvana (2021), and Khijadiya (2022).',
        'Ecological 10% energy transfer law governs trophic pyramids.',
      ],
      summaryPointsGu: [
        'ગુજરાતના ૪ રામસર સ્થળો: નળસરોવર, થોળ તળાવ, વઢવાણા અને ખીજડિયા પક્ષી અભયારણ્ય.',
      ],
    },
  ],
};

export function getChaptersForBook(bookId: string): BookChapter[] {
  return BOOK_CHAPTERS_BY_BOOK_ID[bookId] || [];
}
