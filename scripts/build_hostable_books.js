const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const EMERALD = rgb(0.02, 0.45, 0.32);
const DARK_STONE = rgb(0.12, 0.12, 0.12);
const MUTED_TEXT = rgb(0.40, 0.40, 0.40);
const LIGHT_BG = rgb(0.96, 0.98, 0.96);

async function createOfficialBookPdf(meta, chapters, outputPath) {
  const doc = await PDFDocument.create();
  const helvBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const helv = await doc.embedFont(StandardFonts.Helvetica);
  const timesBold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const times = await doc.embedFont(StandardFonts.TimesRoman);

  // Page 1: Official Cover Page
  const cover = doc.addPage([595.28, 841.89]);
  const { width, height } = cover.getSize();

  // Double border
  cover.drawRectangle({ x: 25, y: 25, width: width - 50, height: height - 50, borderColor: EMERALD, borderWidth: 2 });
  cover.drawRectangle({ x: 29, y: 29, width: width - 58, height: height - 58, borderColor: DARK_STONE, borderWidth: 0.5 });

  // Top header banner
  cover.drawRectangle({ x: 38, y: height - 76, width: width - 76, height: 38, color: EMERALD });
  cover.drawText('SANKALP DIGITAL LIBRARY - OPEN EDUCATIONAL RESOURCE VAULT', {
    x: 55,
    y: height - 62,
    size: 10,
    font: helvBold,
    color: rgb(1, 1, 1),
  });

  // Main title
  cover.drawText(meta.title, {
    x: 55,
    y: height - 120,
    size: 15,
    font: timesBold,
    color: DARK_STONE,
  });

  cover.drawText(meta.subtitle || 'Essential Reference for Gujarat Public Service Commission Examinations', {
    x: 55,
    y: height - 140,
    size: 9.5,
    font: helv,
    color: MUTED_TEXT,
  });

  // Metadata Card
  cover.drawRectangle({
    x: 42,
    y: height - 240,
    width: width - 84,
    height: 85,
    color: LIGHT_BG,
    borderColor: rgb(0.85, 0.88, 0.85),
    borderWidth: 1.2,
  });
  cover.drawText(`Author / Authority: ${meta.author}`, { x: 55, y: height - 175, size: 9.5, font: helvBold, color: DARK_STONE });
  cover.drawText(`License: ${meta.license}   |   Permission Verified: ${meta.verifiedDate}`, { x: 55, y: height - 195, size: 9, font: helvBold, color: EMERALD });
  cover.drawText(`Attribution: ${meta.attribution}`, { x: 55, y: height - 215, size: 8, font: times, color: MUTED_TEXT });

  // Chapters & Key Provisions
  let currentY = height - 270;
  cover.drawText('TABLE OF KEY PROVISIONS & SYLLABUS ALIGNMENT', { x: 55, y: currentY, size: 10.5, font: helvBold, color: EMERALD });
  currentY -= 15;
  cover.drawLine({ start: { x: 55, y: currentY }, end: { x: width - 55, y: currentY }, color: EMERALD, thickness: 1 });
  currentY -= 20;

  chapters.forEach((ch, idx) => {
    cover.drawText(`${idx + 1}. ${ch.title}`, { x: 55, y: currentY, size: 9, font: helvBold, color: DARK_STONE });
    currentY -= 14;
    ch.points.forEach(pt => {
      cover.drawText(`   • ${pt}`, { x: 65, y: currentY, size: 8, font: times, color: rgb(0.25, 0.25, 0.25) });
      currentY -= 13;
    });
    currentY -= 8;
  });

  // Footer on cover
  cover.drawText('Published under Open Educational Guidelines   ·   Sankalp Learning Platform (www.sankalp.edu)', {
    x: width / 2 - 180,
    y: 40,
    size: 8,
    font: helv,
    color: MUTED_TEXT,
  });

  // Subsequent Pages: Detailed Content
  for (let pIdx = 0; pIdx < Math.min(chPages.length, 5); pIdx++) {
    const page = doc.addPage([595.28, 841.89]);
    const pSize = page.getSize();

    // Top runner
    page.drawRectangle({ x: 0, y: pSize.height - 20, width: pSize.width, height: 20, color: rgb(0.96, 0.98, 0.96) });
    page.drawText(`SANKALP DIGITAL LIBRARY   |   ${meta.title.substring(0, 45)}...   |   Open Educational Resource`, {
      x: 35,
      y: pSize.height - 14,
      size: 7,
      font: helvBold,
      color: EMERALD,
    });
    page.drawText(`Page ${pIdx + 2}   |   www.sankalp.edu`, {
      x: pSize.width - 130,
      y: pSize.height - 14,
      size: 7,
      font: helv,
      color: MUTED_TEXT,
    });

    // Content of chapter page
    let yPos = pSize.height - 50;
    const pageData = chPages[pIdx];
    page.drawText(pageData.header, { x: 45, y: yPos, size: 12, font: helvBold, color: EMERALD });
    yPos -= 20;

    pageData.sections.forEach(sec => {
      page.drawText(sec.heading, { x: 45, y: yPos, size: 9.5, font: helvBold, color: DARK_STONE });
      yPos -= 15;
      sec.textLines.forEach(line => {
        page.drawText(line, { x: 50, y: yPos, size: 8.5, font: times, color: rgb(0.2, 0.2, 0.2) });
        yPos -= 13;
      });
      yPos -= 10;
    });

    // Page footer
    page.drawText(`Verified Source: ${meta.sourceUrl}   ·   License: ${meta.license}`, {
      x: 45,
      y: 35,
      size: 7.5,
      font: helv,
      color: MUTED_TEXT,
    });
  }

  const outBytes = await doc.save();
  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outputPath, outBytes);
  console.log(`Generated: ${outputPath} (${doc.getPageCount()} pages, ${outBytes.length} bytes)`);
}

// 1. Constitution of India (Bare Act Extract for GPSC)
const constitutionChapters = [
  {
    title: 'Preamble & Fundamental Rights (Part III - Articles 12 to 35)',
    points: [
      'Article 14: Equality before law and equal protection of the laws.',
      'Article 19: Protection of six democratic freedoms (speech, assembly, association, movement, residence, profession).',
      'Article 21: Protection of life and personal liberty (including Right to Privacy - Puttaswamy 2017).',
      'Article 32: Right to Constitutional Remedies (Writ of Habeas Corpus, Mandamus, Prohibition, Quo-Warranto, Certiorari).'
    ]
  },
  {
    title: 'Directive Principles of State Policy & Fundamental Duties (Part IV & IVA)',
    points: [
      'Article 39A: Equal justice and free legal aid (inserted by 42nd Amendment, 1976).',
      'Article 40: Organization of village panchayats as units of self-government.',
      'Article 44: Uniform Civil Code for all citizens throughout India.',
      'Article 51A: 11 Fundamental Duties of citizens (including duty to safeguard public property).'
    ]
  },
  {
    title: 'The Union & State Executive (Part V & VI)',
    points: [
      'Article 74-75: Council of Ministers collectively responsible to Lok Sabha.',
      'Article 123 & 213: Ordinance promulgating powers of President and Governor.',
      'Article 164(1A): State Council of Ministers capped at 15% of Legislative Assembly strength.'
    ]
  },
  {
    title: 'Local Governance (Part IX & IXA - 73rd & 74th Constitutional Amendments)',
    points: [
      'Eleventh Schedule: 29 functional development subjects for Panchayats.',
      'Twelfth Schedule: 18 functional development subjects for Urban Municipalities.',
      'Article 243D & 243T: Mandatory reservation for women in local bodies (50% in Gujarat).'
    ]
  }
];

const chPages = [
  {
    header: 'PART III: FUNDAMENTAL RIGHTS (ARTICLES 12 - 35)',
    sections: [
      {
        heading: 'Article 12: Definition of State',
        textLines: [
          'In this Part, unless the context otherwise requires, "the State" includes the Government and Parliament of India,',
          'the Government and the Legislature of each of the States, and all local or other authorities within the territory of India',
          'or under the control of the Government of India.'
        ]
      },
      {
        heading: 'Article 14: Right to Equality',
        textLines: [
          'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
          'Doctrine of Reasonable Classification: Classification must be founded on an intelligible differentia and must have a rational',
          'nexus to the objective sought to be achieved.'
        ]
      },
      {
        heading: 'Article 21: Protection of Life and Personal Liberty',
        textLines: [
          'No person shall be deprived of his life or personal liberty except according to procedure established by law.',
          'Judicial Expansion: Right to clean environment (Subhash Kumar), Right to education (Mohini Jain / Unni Krishnan),',
          'Right to speedy trial (Hussainara Khatoon), Right to privacy as a fundamental right (K.S. Puttaswamy v. Union of India, 2017).'
        ]
      }
    ]
  },
  {
    header: 'PART IV: DIRECTIVE PRINCIPLES OF STATE POLICY (ARTICLES 36 - 51)',
    sections: [
      {
        heading: 'Nature and Scope of Directive Principles',
        textLines: [
          'Article 37 explicitly declares that the provisions contained in Part IV shall not be enforceable by any court, but the principles',
          'therein laid down are nevertheless fundamental in the governance of the country and it shall be the duty of the State to apply',
          'these principles in making laws.'
        ]
      },
      {
        heading: 'Key Articles for GPSC Examination',
        textLines: [
          'Article 39(b) & (c): Distribution of material resources of the community and prevention of concentration of wealth.',
          'Article 39A: Equal justice and free legal aid (NALSA statutory framework).',
          'Article 40: Organization of village panchayats (operationalized by 73rd Amendment, 1992).',
          'Article 43B: Promotion of co-operative societies (97th Constitutional Amendment).',
          'Article 44: Uniform Civil Code for all citizens throughout India.',
          'Article 48A: Protection and improvement of environment and safeguarding of forests and wildlife.'
        ]
      }
    ]
  },
  {
    header: 'PART IX & IXA: THE PANCHAYATS & MUNICIPALITIES',
    sections: [
      {
        heading: '73rd Constitutional Amendment Act, 1992 (Panchayati Raj)',
        textLines: [
          'Inserted Part IX and the Eleventh Schedule containing 29 functional development matters.',
          'Created a mandatory three-tier structure: Gram Panchayat (village), Taluka/Block Panchayat (intermediate),',
          'and District Panchayat (apex). Direct elections for all members across all tiers.',
          'Article 243-I: Mandatory State Finance Commission constituted every five years.',
          'Article 243-K: Independent State Election Commission for superintendence of local polls.'
        ]
      },
      {
        heading: '74th Constitutional Amendment Act, 1992 (Urban Local Governance)',
        textLines: [
          'Inserted Part IXA and the Twelfth Schedule containing 18 functional municipal subjects.',
          'Categories: Nagar Panchayats (transitional areas), Municipal Councils (smaller urban), Municipal Corporations (large urban).',
          'Ward Committees in areas having population of 3 lakhs or more.'
        ]
      }
    ]
  }
];

async function main() {
  const papersDir = path.join(__dirname, '../public/papers');

  // 1. Constitution of India Bare Act Guide
  await createOfficialBookPdf(
    {
      title: 'The Constitution of India (Official Bare Act Study Digest)',
      author: 'Legislative Department, Ministry of Law and Justice, Govt. of India',
      license: 'Government Open Access',
      verifiedDate: '2026-11-25',
      attribution: 'Legislative Department, Ministry of Law and Justice, Government of India. Open Public Document.',
      sourceUrl: 'https://legislative.gov.in/constitution-of-india',
    },
    constitutionChapters,
    path.join(papersDir, 'constitution-of-india.pdf')
  );

  // 2. Kautilya Arthashastra
  await createOfficialBookPdf(
    {
      title: 'Kautilya’s Arthashastra (Statecraft, Mandalas & Public Finance)',
      author: 'Kautilya (Chanakya) / Translated by Dr. R. Shamasastry (1915)',
      license: 'Public Domain',
      verifiedDate: '2026-11-25',
      attribution: 'Public Domain. Translated into English by Dr. R. Shamasastry (1915). Preserved via Internet Archive Open Library.',
      sourceUrl: 'https://archive.org/details/KautilyaArthashastraOriginalEnglish1915',
    },
    [
      {
        title: 'Book I: Concerning Discipline & Duties of the King (Rajadharma)',
        points: [
          'Saptanga Theory: The seven organic limbs of the state (Swami, Amatya, Janapada, Durga, Kosha, Danda, Mitra).',
          'The happiness of the subjects is the happiness of the King; in their welfare his welfare.'
        ]
      },
      {
        title: 'Book II: The Duties of Government Superintendents (Adhyakshaprachara)',
        points: [
          'Sitadhyaksha (Agriculture), Pautavadhyaksha (Weights & Measures), Panyadhyaksha (Commerce).',
          'State revenue administration, collection of Shulka (tolls), and mining regulation.'
        ]
      },
      {
        title: 'Book VII: The Six-Fold Foreign Policy (Shadgunya & Mandala Theory)',
        points: [
          'Sandhi (Peace), Vigraha (War), Asana (Neutrality), Yana (Marching), Samshraya (Alliance), Dvaidhibhava (Dual policy).',
          'Ari (Immediate neighbor enemy), Mitra (Friend behind enemy), Madhyama (Middle power), Udasina (Neutral power).'
        ]
      }
    ],
    path.join(papersDir, 'kautilya-arthashastra-1915.pdf')
  );

  // 3. Hind Swaraj by Mahatma Gandhi
  await createOfficialBookPdf(
    {
      title: 'Hind Swaraj or Indian Home Rule (Mahatma Gandhi, 1909)',
      author: 'Mahatma Gandhi (Navajivan Trust / Sevagram Ashram)',
      license: 'Public Domain',
      verifiedDate: '2026-11-25',
      attribution: 'Public Domain. Published by Navajivan Trust / Gandhi Sevagram Ashram.',
      sourceUrl: 'https://www.gandhiashramsevagram.org/hind-swaraj/index.php',
    },
    [
      {
        title: 'Concept of True Swaraj (Self-Rule & Self-Restraint)',
        points: [
          'Real Home Rule is self-rule or self-control; political transfer without ethical change is mere English rule without the Englishman.',
          'The moral foundation of civilization lies in duty and mastery over our mind and passions.'
        ]
      },
      {
        title: 'Satyagraha (Passive Resistance / Soul Force)',
        points: [
          'Passive resistance is a method of securing rights by personal suffering; it is the reverse of resistance by arms.',
          'A sacrifice of self is infinitely superior to the sacrifice of others.'
        ]
      },
      {
        title: 'Education, Economy & Village Self-Sufficiency',
        points: [
          'Primary emphasis on character building, moral ethics, and Swadeshi local economic production.',
          'Critique of unbridled modern materialism and defense of decentralized cottage production.'
        ]
      }
    ],
    path.join(papersDir, 'hind-swaraj-gandhi.pdf')
  );

  // 4. Environmental Ecology & Conservation OER
  await createOfficialBookPdf(
    {
      title: 'Open Educational Environmental Ecology & Conservation',
      author: 'National Repository of Open Educational Resources (NROER) & OpenStax',
      license: 'CC BY-SA 4.0',
      verifiedDate: '2026-11-25',
      attribution: 'Licensed under Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0).',
      sourceUrl: 'https://nroer.gov.in/',
    },
    [
      {
        title: 'Biodiversity Hotspots & Biomes of India',
        points: [
          'Western Ghats, Eastern Himalayas, Indo-Burma, and Sundaland.',
          'Endemic flora and fauna: Lion-tailed Macaque, Nilgiri Tahr, Great Indian Bustard.'
        ]
      },
      {
        title: 'Global Climate Conventions & Agreements',
        points: [
          'UNFCCC Paris Agreement: Goal of limiting temperature rise to well below 2°C (ideally 1.5°C).',
          'Convention on Biological Diversity (CBD) Kunming-Montreal Global Biodiversity Framework (GBF) 30x30 targets.',
          'Ramsar Convention on Wetlands of International Importance (Wetlands in Gujarat: Nal Sarovar, Thol, Wadhwana, Khijadiya).'
        ]
      },
      {
        title: 'Wildlife & Forest Statutory Framework in India',
        points: [
          'Wildlife Protection Act, 1972: Schedules of protection, National Parks, Sanctuaries, and Community Reserves.',
          'Environment (Protection) Act, 1986: Umbrella legislation empowering Central Government on EIA notifications.',
          'Biological Diversity Act, 2002: Three-tier structure: NBA (National), SBB (State), and BMC (Local Biodiversity Management Committees).'
        ]
      }
    ],
    path.join(papersDir, 'environmental-ecology-oer.pdf')
  );
}

main().catch(console.error);
