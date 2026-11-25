import {
  GPSC_MAINS_SYLLABUS,
  GPSC_PRELIMS_SYLLABUS,
} from '@/data/gpscOfficialSyllabus2026';
import { SANKALP_EXAM_DATABASE, getSubjectStats } from '@/data/syllabusDatabase';
import type {
  ExamSyllabusRecord,
  ExamStageId,
  SyllabusChapter,
  SyllabusPaper,
  SyllabusSubject,
  SyllabusTopic,
  TopicProgressStatus,
} from '@/types/syllabus';

interface TopicSeed {
  titleEn: string;
  titleGu: string;
  scopeEn?: string;
  scopeGu?: string;
  legacyId?: string;
}

interface ChapterSeed {
  titleEn: string;
  titleGu: string;
  topics: TopicSeed[];
}

interface SubjectSeed {
  id: string;
  nameEn: string;
  nameGu: string;
  icon: string;
  chapters: ChapterSeed[];
}

const topic = (
  titleEn: string,
  titleGu: string,
  scopeEn?: string,
  scopeGu?: string,
  legacyId?: string,
): TopicSeed => ({ titleEn, titleGu, scopeEn, scopeGu, legacyId });

const collectTopics = (exam: ExamSyllabusRecord): SyllabusTopic[] => {
  const result: SyllabusTopic[] = [];
  for (const paper of [...exam.prelimsPapers, ...exam.mainsPapers]) {
    for (const subject of paper.subjects) {
      for (const chapter of subject.chapters) result.push(...chapter.topics);
    }
  }
  return result;
};

const legacyTopics = new Map(
  Object.values(SANKALP_EXAM_DATABASE)
    .flatMap(collectTopics)
    .map((item) => [item.id, item]),
);

const makeTopic = (
  seed: TopicSeed,
  ids: { id: string; code: string; chapterId: string; subjectId: string; paperId: string; examId: string; stage: ExamStageId },
): SyllabusTopic => {
  const legacy = seed.legacyId ? legacyTopics.get(seed.legacyId) : undefined;

  return {
    id: legacy?.id ?? ids.id,
    code: legacy?.code ?? ids.code,
    titleEn: seed.titleEn,
    titleGu: seed.titleGu,
    chapterId: ids.chapterId,
    subjectId: ids.subjectId,
    paperId: ids.paperId,
    examId: ids.examId,
    stage: ids.stage,
    officialWordingEn: seed.scopeEn ?? seed.titleEn,
    officialWordingGu: seed.scopeGu ?? seed.titleGu,
    wordingSource: 'summary',
    sankalpExplanationEn: legacy?.sankalpExplanationEn
      ?? 'Use this entry as a syllabus coverage check. Confirm year-specific wording and scope in the linked official notice.',
    sankalpExplanationGu: legacy?.sankalpExplanationGu
      ?? 'આ મુદ્દાને અભ્યાસક્રમની ચકાસણી તરીકે વાપરો. વર્ષવાર સત્તાવાર શબ્દાવલિ અને વ્યાપ માટે જોડેલી સૂચના તપાસો.',
    keySubtopicsEn: legacy?.keySubtopicsEn ?? [],
    keySubtopicsGu: legacy?.keySubtopicsGu ?? [],
    importance: legacy?.importance ?? 'Essential',
    examFrequency: legacy?.examFrequency ?? 'Core syllabus area; question frequency varies by year.',
    linkedModuleTopicId: legacy?.linkedModuleTopicId,
    linkedPracticeTag: legacy?.linkedPracticeTag,
    recommendedReadings: legacy?.recommendedReadings ?? [],
  };
};

const makeSubject = (
  seed: SubjectSeed,
  context: { examId: string; paperId: string; stage: ExamStageId },
  subjectNumber: number,
): SyllabusSubject => ({
  id: seed.id,
  subjectCode: `${context.examId.toUpperCase()}-${context.stage.toUpperCase()}-${subjectNumber}`,
  nameEn: seed.nameEn,
  nameGu: seed.nameGu,
  icon: seed.icon,
  officialWeightageEn: 'Coverage area; consult the current examination notification for weightage.',
  officialWeightageGu: 'અભ્યાસક્રમનો વિભાગ; ગુણભાર માટે વર્તમાન પરીક્ષા સૂચના તપાસો.',
  chapters: seed.chapters.map((chapter, chapterIndex) => {
    const chapterId = `${seed.id}-chapter-${chapterIndex + 1}`;
    const mappedChapter: SyllabusChapter = {
      id: chapterId,
      chapterNumber: chapterIndex + 1,
      titleEn: chapter.titleEn,
      titleGu: chapter.titleGu,
      topics: chapter.topics.map((entry, topicIndex) =>
        makeTopic(entry, {
          id: `${context.examId}-${context.paperId}-${subjectNumber}-${chapterIndex + 1}-${topicIndex + 1}`,
          code: `${context.examId.toUpperCase()}-${context.paperId.toUpperCase()}-${subjectNumber}-${chapterIndex + 1}-${topicIndex + 1}`,
          chapterId,
          subjectId: seed.id,
          paperId: context.paperId,
          examId: context.examId,
          stage: context.stage,
        }),
      ),
    };
    return mappedChapter;
  }),
});

const gpscPrelimLegacyIds: Array<[string, RegExp]> = [
  ['gpsc-top-hist-ivc', /indus valley civilization/i],
  ['gpsc-top-hist-dynasties', /maitraka|solanki/i],
  ['gpsc-top-hist-freedom', /freedom movement/i],
  ['gpsc-top-hist-mahagujarat', /maha.?gujarat/i],
  ['gpsc-top-pol-preamble', /preamble|basic structure/i],
  ['gpsc-top-pol-fr-dpsp', /fundamental rights|directive principles/i],
  ['gpsc-top-pol-panchayat', /panchayat|local self-government/i],
  ['gpsc-top-econ-gujarat', /gujarat.*economy|gujarat.*industrial/i],
  ['gpsc-top-geog-drainage', /rivers, dams|river systems/i],
  ['gpsc-top-sci-isro', /isro|space missions/i],
];

const gpscPrelimSeed = GPSC_PRELIMS_SYLLABUS.map((subject): SubjectSeed => ({
  id: `gpsc-pre-${subject.id}`,
  nameEn: subject.nameEn,
  nameGu: subject.nameGu,
  icon: 'BookOpen',
  chapters: subject.subcategories.map((category) => ({
    titleEn: category.titleEn,
    titleGu: category.titleGu,
    topics: category.topicsEn.map((titleEn, topicIndex) => {
      const titleGu = category.topicsGu[topicIndex];
      if (!titleGu) {
        throw new Error(`Missing Gujarati GPSC syllabus topic for ${subject.id}, ${category.titleEn}.`);
      }

      const matchingLegacy = gpscPrelimLegacyIds.find(([, pattern]) => pattern.test(titleEn));
      const legacyId = matchingLegacy?.[0];
      if (legacyId) {
        gpscPrelimLegacyIds.splice(gpscPrelimLegacyIds.indexOf(matchingLegacy), 1);
      }

      return topic(titleEn, titleGu, titleEn, titleGu, legacyId);
    }),
  })),
}));

const gpscMainsLegacyByPaper = [
  'gpsc-top-mains-guj-draft',
  'gpsc-top-mains-eng-draft',
  'gpsc-top-mains-essay-method',
  'gpsc-top-mains-gs1-art',
  'gpsc-top-mains-gs2-gov',
  'gpsc-top-mains-gs3-disaster',
  'gpsc-top-mains-gs4-casestudy',
];

const gpscBase = SANKALP_EXAM_DATABASE['gpsc-class-1-2'];
const gpscPrelimBase = gpscBase.prelimsPapers[0];
const gpscPrelims: SyllabusPaper[] = [{
  ...gpscPrelimBase,
  subjects: gpscPrelimSeed.map((seed, index) =>
    makeSubject(seed, { examId: gpscBase.id, paperId: gpscPrelimBase.id, stage: 'prelims' }, index + 1),
  ),
}];

const gpscMains: SyllabusPaper[] = GPSC_MAINS_SYLLABUS.map((paperSeed, paperIndex) => {
  const basePaper = gpscBase.mainsPapers[paperIndex];
  if (!basePaper) throw new Error(`Missing GPSC mains paper ${paperSeed.paperNumber}.`);

  const subjectId = `gpsc-main-${paperIndex + 1}-subject`;
  const chapterId = `${subjectId}-chapter-1`;
  const topics = paperSeed.topicsEn.map((titleEn, topicIndex) => {
    const titleGu = paperSeed.topicsGu[topicIndex];
    if (!titleGu) {
      throw new Error(`Missing Gujarati GPSC mains topic for ${paperSeed.titleEn}.`);
    }

    const legacyId = topicIndex === 0 ? gpscMainsLegacyByPaper[paperIndex] : undefined;

    return makeTopic(topic(titleEn, titleGu, titleEn, titleGu, legacyId), {
      id: `gpsc-mains-${paperIndex + 1}-${topicIndex + 1}`,
      code: `GPSC-MAINS-${paperIndex + 1}-${topicIndex + 1}`,
      chapterId,
      subjectId,
      paperId: basePaper.id,
      examId: gpscBase.id,
      stage: 'mains',
    });
  });

  return {
    ...basePaper,
    paperCode: paperSeed.paperNumber,
    titleEn: paperSeed.titleEn,
    titleGu: paperSeed.titleGu,
    marks: paperSeed.marks,
    nature: paperSeed.nature,
    officialDescriptionEn: paperSeed.overviewEn,
    officialDescriptionGu: paperSeed.overviewGu,
    subjects: [{
      id: subjectId,
      subjectCode: `GPSC-MAINS-${paperIndex + 1}`,
      nameEn: paperSeed.titleEn,
      nameGu: paperSeed.titleGu,
      icon: 'BookOpen',
      officialWeightageEn: `${paperSeed.marks} marks · ${paperSeed.nature}`,
      officialWeightageGu: `${paperSeed.marks} ગુણ · ${paperSeed.nature === 'Merit' ? 'મેરિટ' : 'ક્વોલિફાઇંગ'}`,
      chapters: [{
        id: chapterId,
        chapterNumber: 1,
        titleEn: `${paperSeed.titleEn} coverage`,
        titleGu: `${paperSeed.titleGu} અભ્યાસક્રમ`,
        topics,
      }],
    }],
  };
});

const upscPrelimsSubjects: SubjectSeed[] = [
  {
    id: 'upsc-pre-current-affairs',
    nameEn: 'Current Events',
    nameGu: 'વર્તમાન પ્રવાહો',
    icon: 'Globe',
    chapters: [{
      titleEn: 'National and International Developments',
      titleGu: 'રાષ્ટ્રીય અને આંતરરાષ્ટ્રીય વિકાસ',
      topics: [
        topic('Current events of national and international importance', 'રાષ્ટ્રીય અને આંતરરાષ્ટ્રીય મહત્ત્વની વર્તમાન ઘટનાઓ'),
      ],
    }],
  },
  {
    id: 'upsc-pre-history',
    nameEn: 'History of India and the National Movement',
    nameGu: 'ભારતનો ઇતિહાસ અને રાષ્ટ્રીય આંદોલન',
    icon: 'Landmark',
    chapters: [{
      titleEn: 'Indian History',
      titleGu: 'ભારતીય ઇતિહાસ',
      topics: [
        topic('Ancient and Medieval Indian History', 'પ્રાચીન અને મધ્યકાલીન ભારતીય ઇતિહાસ'),
        topic('Modern Indian History and the Indian National Movement', 'આધુનિક ભારતીય ઇતિહાસ અને ભારતીય રાષ્ટ્રીય આંદોલન'),
      ],
    }],
  },
  {
    id: 'upsc-pre-geography',
    nameEn: 'Indian and World Geography',
    nameGu: 'ભારત અને વિશ્વનું ભૂગોળ',
    icon: 'Globe',
    chapters: [{
      titleEn: 'Physical, Social and Economic Geography',
      titleGu: 'ભૌતિક, સામાજિક અને આર્થિક ભૂગોળ',
      topics: [
        topic(
          'Physical, social and economic geography of India and the world',
          'ભારત અને વિશ્વનું ભૌતિક, સામાજિક અને આર્થિક ભૂગોળ',
        ),
      ],
    }],
  },
  {
    id: 'upsc-pre-polity',
    nameEn: 'Indian Polity and Governance',
    nameGu: 'ભારતીય રાજ્યવ્યવસ્થા અને શાસન',
    icon: 'Scale',
    chapters: [{
      titleEn: 'Constitution and Public Governance',
      titleGu: 'બંધારણ અને જાહેર શાસન',
      topics: [
        topic(
          'Constitution, political system, Panchayati Raj, public policy and rights issues',
          'બંધારણ, રાજકીય વ્યવસ્થા, પંચાયતી રાજ, જાહેર નીતિ અને અધિકારોના મુદ્દાઓ',
          'Constitution, political system, Panchayati Raj, public policy, rights issues and related governance areas.',
          'બંધારણ, રાજકીય વ્યવસ્થા, પંચાયતી રાજ, જાહેર નીતિ, અધિકારોના મુદ્દાઓ અને સંબંધિત શાસન ક્ષેત્રો.',
          'upsc-top-pol-const-gov',
        ),
      ],
    }],
  },
  {
    id: 'upsc-pre-economy',
    nameEn: 'Economic and Social Development',
    nameGu: 'આર્થિક અને સામાજિક વિકાસ',
    icon: 'TrendingUp',
    chapters: [{
      titleEn: 'Development, Inclusion and Social Sector',
      titleGu: 'વિકાસ, સમાવેશ અને સામાજિક ક્ષેત્ર',
      topics: [
        topic(
          'Sustainable development, poverty, inclusion, demographics and social sector initiatives',
          'ટકાઉ વિકાસ, ગરીબી, સમાવેશ, વસ્તી વિષયક બાબતો અને સામાજિક ક્ષેત્રની પહેલ',
        ),
      ],
    }],
  },
  {
    id: 'upsc-pre-environment',
    nameEn: 'Environment, Ecology and Climate Change',
    nameGu: 'પર્યાવરણ, પારિસ્થિતિકી અને જળવાયુ પરિવર્તન',
    icon: 'Leaf',
    chapters: [{
      titleEn: 'Ecology and Conservation',
      titleGu: 'પારિસ્થિતિકી અને સંરક્ષણ',
      topics: [
        topic(
          'Environmental ecology, biodiversity and climate change without specialist-level assumptions',
          'વિષય નિષ્ણાત સ્તરની પૂર્વધારણા વિના પર્યાવરણીય પારિસ્થિતિકી, જૈવવિવિધતા અને જળવાયુ પરિવર્તન',
          'General issues in environmental ecology, biodiversity and climate change.',
          'પર્યાવરણીય પારિસ્થિતિકી, જૈવવિવિધતા અને જળવાયુ પરિવર્તનના સામાન્ય મુદ્દાઓ.',
          'upsc-top-env-treaties',
        ),
      ],
    }],
  },
  {
    id: 'upsc-pre-science',
    nameEn: 'General Science',
    nameGu: 'સામાન્ય વિજ્ઞાન',
    icon: 'Cpu',
    chapters: [{
      titleEn: 'Science and Technology Foundations',
      titleGu: 'વિજ્ઞાન અને ટેકનોલોજીના પાયાના વિષયો',
      topics: [
        topic('General Science', 'સામાન્ય વિજ્ઞાન'),
      ],
    }],
  },
];

const upscCsatSubjects: SubjectSeed[] = [
  {
    id: 'upsc-csat-comprehension',
    nameEn: 'Comprehension',
    nameGu: 'ગદ્યસમજ',
    icon: 'BookOpen',
    chapters: [{
      titleEn: 'Reading Comprehension',
      titleGu: 'વાંચન ગદ્યસમજ',
      topics: [
        topic('Comprehension of passages', 'આપેલા ગદ્યખંડોનું ગદ્યસમજણ', undefined, undefined, 'upsc-top-csat-rc'),
      ],
    }],
  },
  {
    id: 'upsc-csat-communication',
    nameEn: 'Interpersonal and Communication Skills',
    nameGu: 'આંતરવૈયક્તિક અને સંચાર કૌશલ્યો',
    icon: 'Languages',
    chapters: [{
      titleEn: 'Communication Skills',
      titleGu: 'સંચાર કૌશલ્યો',
      topics: [
        topic('Interpersonal skills, including communication skills', 'સંચાર કૌશલ્યો સહિત આંતરવૈયક્તિક કૌશલ્યો'),
      ],
    }],
  },
  {
    id: 'upsc-csat-reasoning',
    nameEn: 'Logical Reasoning and Analytical Ability',
    nameGu: 'તાર્કિક તર્ક અને વિશ્લેષણાત્મક ક્ષમતા',
    icon: 'Sparkles',
    chapters: [{
      titleEn: 'Reasoning and Analysis',
      titleGu: 'તર્ક અને વિશ્લેષણ',
      topics: [
        topic('Logical reasoning and analytical ability', 'તાર્કિક તર્ક અને વિશ્લેષણાત્મક ક્ષમતા'),
      ],
    }],
  },
  {
    id: 'upsc-csat-decision-making',
    nameEn: 'Decision Making and Problem Solving',
    nameGu: 'નિર્ણય લેવાની અને સમસ્યા ઉકેલવાની ક્ષમતા',
    icon: 'CheckCircle2',
    chapters: [{
      titleEn: 'Practical Decision Making',
      titleGu: 'વ્યવહારુ નિર્ણય પ્રક્રિયા',
      topics: [
        topic('Decision making and problem solving', 'નિર્ણય લેવાની અને સમસ્યા ઉકેલવાની ક્ષમતા'),
      ],
    }],
  },
  {
    id: 'upsc-csat-mental-ability',
    nameEn: 'General Mental Ability',
    nameGu: 'સામાન્ય માનસિક ક્ષમતા',
    icon: 'Brain',
    chapters: [{
      titleEn: 'General Mental Ability',
      titleGu: 'સામાન્ય માનસિક ક્ષમતા',
      topics: [
        topic('General mental ability', 'સામાન્ય માનસિક ક્ષમતા'),
      ],
    }],
  },
  {
    id: 'upsc-csat-numeracy',
    nameEn: 'Basic Numeracy',
    nameGu: 'મૂળભૂત સંખ્યાજ્ઞાન',
    icon: 'Calculator',
    chapters: [{
      titleEn: 'Class X Level Numeracy',
      titleGu: 'ધોરણ ૧૦ સ્તરનું સંખ્યાજ્ઞાન',
      topics: [
        topic('Basic numeracy at the Class X level', 'ધોરણ ૧૦ સ્તરનું મૂળભૂત સંખ્યાજ્ઞાન'),
      ],
    }],
  },
  {
    id: 'upsc-csat-data-interpretation',
    nameEn: 'Data Interpretation',
    nameGu: 'માહિતીનું અર્થઘટન',
    icon: 'BarChart3',
    chapters: [{
      titleEn: 'Class X Level Data Interpretation',
      titleGu: 'ધોરણ ૧૦ સ્તરનું માહિતી અર્થઘટન',
      topics: [
        topic('Data interpretation at the Class X level, including charts, graphs, tables and data sufficiency', 'ધોરણ ૧૦ સ્તરનું માહિતી અર્થઘટન, જેમાં આલેખ, ચાર્ટ, કોષ્ટક અને માહિતીની પૂરકતા સામેલ છે'),
      ],
    }],
  },
];

const upscMainsPaperSeeds: SubjectSeed[][] = [
  [{
    id: 'upsc-mains-essay-subject',
    nameEn: 'Essay',
    nameGu: 'નિબંધ',
    icon: 'PenTool',
    chapters: [{
      titleEn: 'Essay Writing',
      titleGu: 'નિબંધ લેખન',
      topics: [
        topic(
          'Essay writing: relevance, coherent organization, concision and effective expression',
          'નિબંધ લેખન: વિષયસંગતતા, સુસંગત ગોઠવણી, સંક્ષિપ્તતા અને અસરકારક અભિવ્યક્તિ',
          'Write on the assigned subject, organize ideas in an orderly way and express them concisely and effectively.',
          'આપેલા વિષય પર લખો, વિચારોને વ્યવસ્થિત રીતે ગોઠવો અને સંક્ષિપ્ત તથા અસરકારક રીતે રજૂ કરો.',
          'upsc-top-essay-phil',
        ),
      ],
    }],
  }],
  [{
    id: 'upsc-mains-gs1-subject',
    nameEn: 'Indian Heritage, History, Society and Geography',
    nameGu: 'ભારતીય વારસો, ઇતિહાસ, સમાજ અને ભૂગોળ',
    icon: 'Globe',
    chapters: [{
      titleEn: 'Culture, History and Society',
      titleGu: 'સંસ્કૃતિ, ઇતિહાસ અને સમાજ',
      topics: [
        topic('Indian culture: salient aspects of art forms, literature and architecture from ancient to modern times', 'ભારતીય સંસ્કૃતિ: પ્રાચીનથી આધુનિક સમય સુધીની કળાઓ, સાહિત્ય અને સ્થાપત્યનાં મુખ્ય પાસાં'),
        topic('Modern Indian history from the middle of the eighteenth century to the present, including significant events, personalities and issues', 'અઢારમી સદીના મધ્યભાગથી વર્તમાન સમય સુધીનો આધુનિક ભારતીય ઇતિહાસ, જેમાં મહત્ત્વની ઘટનાઓ, વ્યક્તિત્વો અને મુદ્દાઓનો સમાવેશ થાય છે'),
        topic('The Freedom Struggle: its various stages and important contributors from different parts of the country', 'સ્વાતંત્ર્ય સંગ્રામ: તેના વિવિધ તબક્કા અને દેશના વિવિધ ભાગોના મહત્ત્વના યોગદાનકર્તાઓ'),
        topic('Post-independence consolidation and reorganization within the country', 'સ્વાતંત્ર્ય પછી દેશનું એકીકરણ અને પુનર્ગઠન'),
        topic('World history from the eighteenth century: industrial revolution, world wars, colonization, decolonization and political philosophies', 'અઢારમી સદીથી વિશ્વ ઇતિહાસ: ઔદ્યોગિક ક્રાંતિ, વિશ્વયુદ્ધો, વસાહતીકરણ, વસાહતી મુક્તિ અને રાજકીય વિચારધારાઓ'),
        topic('Salient features of Indian society and the diversity of India', 'ભારતીય સમાજનાં મુખ્ય લક્ષણો અને ભારતની વિવિધતા', undefined, undefined, 'upsc-top-mains-society'),
        topic('Role of women and women’s organizations; population and associated issues; poverty and developmental issues', 'મહિલાઓ અને મહિલા સંગઠનોની ભૂમિકા; વસ્તી અને સંબંધિત મુદ્દાઓ; ગરીબી અને વિકાસલક્ષી પ્રશ્નો'),
        topic('Urbanization: problems and remedies; effects of globalization on Indian society; social empowerment, communalism, regionalism and secularism', 'શહેરીકરણ: સમસ્યાઓ અને ઉપાયો; ભારતીય સમાજ પર વૈશ્વિકીકરણની અસરો; સામાજિક સશક્તિકરણ, કોમવાદ, પ્રદેશવાદ અને ધર્મનિરપેક્ષતા'),
      ],
    }, {
      titleEn: 'Geography of the World and India',
      titleGu: 'વિશ્વ અને ભારતનું ભૂગોળ',
      topics: [
        topic('Salient features of the world’s physical geography', 'વિશ્વના ભૌતિક ભૂગોળનાં મુખ્ય લક્ષણો'),
        topic('Distribution of key natural resources across the world, including South Asia and India; factors responsible for the location of primary, secondary and tertiary sector industries', 'વિશ્વ, દક્ષિણ એશિયા અને ભારતમાં કુદરતી સંસાધનોનું વિતરણ; પ્રાથમિક, દ્વિતીય અને તૃતીય ક્ષેત્રના ઉદ્યોગોના સ્થાન માટે જવાબદાર પરિબળો'),
        topic('Important geophysical phenomena: earthquakes, tsunamis, volcanic activity, cyclones and changes in critical geographical features', 'મહત્ત્વની ભૂભૌતિક ઘટનાઓ: ધરતીકંપ, સુનામી, જ્વાળામુખી પ્રવૃત્તિ, ચક્રવાત અને મુખ્ય ભૌગોલિક લક્ષણોમાં ફેરફાર'),
      ],
    }],
  }],
  [{
    id: 'upsc-mains-gs2-subject',
    nameEn: 'Governance, Constitution, Polity, Social Justice and International Relations',
    nameGu: 'શાસન, બંધારણ, રાજ્યવ્યવસ્થા, સામાજિક ન્યાય અને આંતરરાષ્ટ્રીય સંબંધો',
    icon: 'Landmark',
    chapters: [{
      titleEn: 'Constitution and Political System',
      titleGu: 'બંધારણ અને રાજકીય વ્યવસ્થા',
      topics: [
        topic('Indian Constitution: historical underpinnings, evolution, features, amendments, significant provisions and the basic structure', 'ભારતીય બંધારણ: ઐતિહાસિક પૃષ્ઠભૂમિ, વિકાસ, લક્ષણો, સુધારા, મહત્ત્વની જોગવાઈઓ અને મૂળભૂત માળખું'),
        topic('Functions and responsibilities of the Union and the States; federal structure; devolution of powers and finances to local levels; challenges to federalism', 'કેન્દ્ર અને રાજ્યોનાં કાર્યો તથા જવાબદારીઓ; સંઘીય માળખું; સ્થાનિક સ્તરે સત્તા અને નાણાંનું વિકેન્દ્રીકરણ; સંઘવાદના પડકારો'),
        topic('Separation of powers; dispute redressal mechanisms and institutions', 'સત્તાનું વિભાજન; વિવાદ નિવારણની વ્યવસ્થાઓ અને સંસ્થાઓ'),
        topic('Comparison of the Indian constitutional scheme with that of other countries', 'ભારતીય બંધારણીય વ્યવસ્થાની અન્ય દેશોની વ્યવસ્થા સાથે તુલના'),
        topic('Parliament and State Legislatures: structure, functioning, conduct of business, powers and privileges, and related issues', 'સંસદ અને રાજ્ય વિધાનમંડળો: રચના, કામગીરી, કારોબાર, સત્તાઓ અને વિશેષાધિકારો તથા સંબંધિત મુદ્દાઓ'),
        topic('Structure, organization and functioning of the Executive and the Judiciary; Ministries and Departments; pressure groups and formal or informal associations', 'કારોબારી અને ન્યાયતંત્રની રચના, સંગઠન અને કામગીરી; મંત્રાલયો અને વિભાગો; દબાણ જૂથો તથા ઔપચારિક અને અનૌપચારિક સંગઠનો'),
        topic('Representation of the People Act and related electoral laws', 'લોક પ્રતિનિધિત્વ અધિનિયમ અને સંબંધિત ચૂંટણી કાયદાઓ'),
        topic('Appointment to constitutional posts and powers, functions and responsibilities of constitutional bodies', 'બંધારણીય પદો પર નિમણૂક તથા બંધારણીય સંસ્થાઓની સત્તાઓ, કાર્યો અને જવાબદારીઓ'),
        topic('Statutory, regulatory and quasi-judicial bodies: structure, mandate and functioning', 'વૈધાનિક, નિયમનકારી અને અર્ધન્યાયિક સંસ્થાઓ: રચના, કાર્યક્ષેત્ર અને કામગીરી'),
      ],
    }, {
      titleEn: 'Governance and Social Justice',
      titleGu: 'શાસન અને સામાજિક ન્યાય',
      topics: [
        topic('Government policies and interventions for development in different sectors; design and implementation issues', 'વિવિધ ક્ષેત્રોમાં વિકાસ માટેની સરકારી નીતિઓ અને હસ્તક્ષેપ; રચના અને અમલીકરણના મુદ્દાઓ'),
        topic('Development processes and the development industry: role of NGOs, SHGs, groups, donors, charities, institutional and other stakeholders', 'વિકાસ પ્રક્રિયાઓ અને વિકાસ ક્ષેત્ર: NGOs, SHGs, જૂથો, દાતાઓ, સેવાભાવી સંસ્થાઓ અને અન્ય હિતધારકોની ભૂમિકા'),
        topic('Welfare schemes for vulnerable sections; mechanisms, laws, institutions and bodies constituted for their protection and betterment', 'નબળા વર્ગો માટેની કલ્યાણ યોજનાઓ; તેમના રક્ષણ અને કલ્યાણ માટેની વ્યવસ્થાઓ, કાયદા અને સંસ્થાઓ'),
        topic('Issues relating to development and management of social sector services, including health, education and human resources', 'આરોગ્ય, શિક્ષણ અને માનવ સંસાધન સહિત સામાજિક ક્ષેત્રની સેવાઓના વિકાસ અને સંચાલન સંબંધિત મુદ્દાઓ'),
        topic('Issues relating to poverty and hunger', 'ગરીબી અને ભૂખમરા સંબંધિત મુદ્દાઓ'),
        topic('Important aspects of governance, transparency and accountability; e-governance; citizen charters; institutional measures and challenges', 'શાસન, પારદર્શિતા અને જવાબદારીનાં મહત્ત્વનાં પાસાં; ઈ-ગવર્નન્સ; નાગરિક અધિકારપત્ર; સંસ્થાકીય પગલાં અને પડકારો'),
        topic('Role of civil services in a democracy', 'લોકશાહીમાં સનદી સેવાઓની ભૂમિકા'),
      ],
    }, {
      titleEn: 'International Relations',
      titleGu: 'આંતરરાષ્ટ્રીય સંબંધો',
      topics: [
        topic('India and its neighbourhood: relations', 'ભારત અને તેના પડોશી દેશો: સંબંધો'),
        topic('Bilateral, regional and global groupings and agreements involving or affecting India’s interests', 'ભારતના હિતોને અસર કરતા અથવા ભારતને સામેલ કરતા દ્વિપક્ષીય, પ્રાદેશિક અને વૈશ્વિક સંગઠનો તથા કરારો', undefined, undefined, 'upsc-top-mains-ir-quad'),
        topic('Effect of policies and politics of developed and developing countries on India’s interests; the Indian diaspora', 'વિકસિત અને વિકાસશીલ દેશોની નીતિઓ તથા રાજકારણની ભારતના હિતો પર અસર; ભારતીય ડાયસ્પોરા'),
      ],
    }],
  }],
  [{
    id: 'upsc-mains-gs3-subject',
    nameEn: 'Technology, Economic Development, Biodiversity, Environment, Security and Disaster Management',
    nameGu: 'ટેકનોલોજી, આર્થિક વિકાસ, જૈવવિવિધતા, પર્યાવરણ, સુરક્ષા અને આપત્તિ વ્યવસ્થાપન',
    icon: 'Cpu',
    chapters: [{
      titleEn: 'Economy, Agriculture and Infrastructure',
      titleGu: 'અર્થતંત્ર, કૃષિ અને માળખાગત સુવિધાઓ',
      topics: [
        topic('Indian economy and issues relating to planning, mobilization of resources, growth, development and employment', 'ભારતીય અર્થતંત્ર અને આયોજન, સંસાધનોનું એકત્રીકરણ, વૃદ્ધિ, વિકાસ તથા રોજગાર સંબંધિત મુદ્દાઓ'),
        topic('Inclusive growth and issues arising from it', 'સમાવેશી વિકાસ અને તેમાંથી ઊભા થતા મુદ્દાઓ'),
        topic('Government budgeting', 'સરકારી અંદાજપત્ર'),
        topic('Major crops, cropping patterns, irrigation systems, storage, transport and marketing of agricultural produce; e-technology for farmers', 'મુખ્ય પાકો, પાક પદ્ધતિઓ, સિંચાઈ, સંગ્રહ, પરિવહન અને કૃષિ ઉત્પાદનનું માર્કેટિંગ; ખેડૂતો માટે ઈ-ટેકનોલોજી'),
        topic('Issues related to direct and indirect farm subsidies, minimum support prices, the Public Distribution System, buffer stocks and food security', 'પ્રત્યક્ષ અને પરોક્ષ કૃષિ સબસિડી, લઘુત્તમ ટેકાના ભાવ, જાહેર વિતરણ વ્યવસ્થા, બફર સ્ટોક અને ખાદ્ય સુરક્ષા'),
        topic('Technology missions; economics of animal-rearing; food processing and related industries in India', 'ટેકનોલોજી મિશન; પશુપાલનનું અર્થશાસ્ત્ર; ભારતમાં ખાદ્ય પ્રક્રિયા અને સંબંધિત ઉદ્યોગો'),
        topic('Land reforms in India', 'ભારતમાં જમીન સુધારા'),
        topic('Effects of liberalization on the economy; changes in industrial policy and their effects on industrial growth', 'અર્થતંત્ર પર ઉદારીકરણની અસરો; ઔદ્યોગિક નીતિમાં ફેરફાર અને ઔદ્યોગિક વૃદ્ધિ પર તેની અસર'),
        topic('Infrastructure: energy, ports, roads, airports, railways and related investment models', 'માળખાગત સુવિધાઓ: ઊર્જા, બંદરો, માર્ગો, હવાઈમથકો, રેલવે અને સંબંધિત રોકાણ મોડેલો'),
      ],
    }, {
      titleEn: 'Science, Technology and Environment',
      titleGu: 'વિજ્ઞાન, ટેકનોલોજી અને પર્યાવરણ',
      topics: [
        topic('Science and technology developments and their applications and effects in everyday life', 'વિજ્ઞાન અને ટેકનોલોજીના વિકાસ, તેમના ઉપયોગો અને રોજિંદા જીવન પરની અસરો'),
        topic('Achievements of Indians in science and technology; indigenization of technology and development of new technology', 'વિજ્ઞાન અને ટેકનોલોજીમાં ભારતીયોની સિદ્ધિઓ; ટેકનોલોજીનું સ્વદેશીકરણ અને નવી ટેકનોલોજીનો વિકાસ'),
        topic('Awareness in the fields of information technology, space, computers, robotics, nanotechnology, biotechnology and issues relating to intellectual property rights', 'માહિતી ટેકનોલોજી, અવકાશ, કમ્પ્યુટર, રોબોટિક્સ, નેનોટેકનોલોજી, બાયોટેકનોલોજી અને બૌદ્ધિક સંપદા અધિકારો અંગેની જાણકારી'),
        topic('Conservation, environmental pollution and degradation, and environmental impact assessment', 'સંરક્ષણ, પર્યાવરણીય પ્રદૂષણ અને અધોગતિ તથા પર્યાવરણીય અસરનું મૂલ્યાંકન'),
        topic('Disaster and disaster management', 'આપત્તિ અને આપત્તિ વ્યવસ્થાપન'),
      ],
    }, {
      titleEn: 'Internal Security',
      titleGu: 'આંતરિક સુરક્ષા',
      topics: [
        topic('Linkages between development and the spread of extremism', 'વિકાસ અને ઉગ્રવાદના ફેલાવા વચ્ચેના સંબંધો'),
        topic('Role of external state and non-state actors in creating challenges to internal security', 'આંતરિક સુરક્ષાના પડકારો ઊભા કરવામાં બાહ્ય રાજ્ય અને બિન-રાજ્ય ઘટકોની ભૂમિકા'),
        topic('Challenges to internal security through communication networks; role of media and social networking sites; basics of cyber security; money-laundering and its prevention', 'સંચાર નેટવર્ક દ્વારા આંતરિક સુરક્ષાના પડકારો; મીડિયા અને સામાજિક નેટવર્કિંગ સાઇટ્સની ભૂમિકા; સાયબર સુરક્ષાના પાયાના મુદ્દા; મની લોન્ડરિંગ અને તેનું નિવારણ', undefined, undefined, 'upsc-top-mains-security'),
        topic('Security challenges and their management in border areas; linkages of organized crime with terrorism', 'સરહદી વિસ્તારોના સુરક્ષા પડકારો અને તેમનું સંચાલન; સંગઠિત અપરાધ અને આતંકવાદ વચ્ચેના સંબંધો'),
        topic('Various security forces and agencies and their mandate', 'વિવિધ સુરક્ષા દળો અને એજન્સીઓ તથા તેમનું કાર્યક્ષેત્ર'),
      ],
    }],
  }],
  [{
    id: 'upsc-mains-gs4-subject',
    nameEn: 'Ethics, Integrity and Aptitude',
    nameGu: 'નીતિશાસ્ત્ર, સત્યનિષ્ઠા અને યોગ્યતા',
    icon: 'Award',
    chapters: [{
      titleEn: 'Ethics and Human Interface',
      titleGu: 'નીતિશાસ્ત્ર અને માનવીય સંબંધ',
      topics: [
        topic('Ethics and human interface: essence, determinants and consequences of ethics in human actions; dimensions of ethics', 'નીતિશાસ્ત્ર અને માનવીય સંબંધ: માનવીય ક્રિયાઓમાં નીતિનાં તત્ત્વો, નિર્ધારકો અને પરિણામો; નીતિનાં વિવિધ પરિમાણો'),
        topic('Human values: lessons from the lives and teachings of great leaders, reformers and administrators', 'માનવીય મૂલ્યો: મહાન નેતાઓ, સુધારકો અને વહીવટકર્તાઓના જીવન તથા ઉપદેશોમાંથી મળતા પાઠ'),
        topic('Role of family, society and educational institutions in inculcating values', 'મૂલ્યોના સંસ્કાર આપવામાં પરિવાર, સમાજ અને શૈક્ષણિક સંસ્થાઓની ભૂમિકા'),
        topic('Attitude: content, structure, function, influence and relation with thought and behaviour; moral and political attitudes; social influence and persuasion', 'અભિગમ: સ્વરૂપ, રચના, કાર્ય, પ્રભાવ અને વિચાર તથા વર્તન સાથેનો સંબંધ; નૈતિક અને રાજકીય અભિગમ; સામાજિક પ્રભાવ અને સમજાવટ'),
        topic('Aptitude and foundational values for civil service: integrity, impartiality, non-partisanship, objectivity, dedication to public service, empathy, tolerance and compassion', 'સનદી સેવા માટેની યોગ્યતા અને પાયાના મૂલ્યો: સત્યનિષ્ઠા, નિષ્પક્ષતા, બિનપક્ષપાત, વસ્તુનિષ્ઠતા, જાહેર સેવા પ્રત્યે સમર્પણ, સહાનુભૂતિ, સહિષ્ણુતા અને કરુણા'),
        topic('Emotional intelligence: concepts and their utilities and application in administration and governance', 'ભાવનાત્મક બુદ્ધિ: ખ્યાલો તથા વહીવટ અને શાસનમાં તેનો ઉપયોગ'),
      ],
    }, {
      titleEn: 'Ethics in Public Administration',
      titleGu: 'જાહેર વહીવટમાં નીતિશાસ્ત્ર',
      topics: [
        topic('Contributions of moral thinkers and philosophers from India and the world', 'ભારત અને વિશ્વના નૈતિક ચિંતકો તથા દાર્શનિકોનું યોગદાન', undefined, undefined, 'upsc-top-mains-eth-kant'),
        topic('Public service values and ethics in public administration; ethical concerns and dilemmas in government and private institutions', 'જાહેર સેવા મૂલ્યો અને જાહેર વહીવટમાં નૈતિકતા; સરકારી તથા ખાનગી સંસ્થાઓમાં નૈતિક ચિંતાઓ અને દ્વિધાઓ'),
        topic('Laws, rules, regulations and conscience as sources of ethical guidance; accountability and ethical governance', 'કાયદા, નિયમો, વિનિયમો અને અંતરાત્મા નૈતિક માર્ગદર્શનના સ્ત્રોત તરીકે; જવાબદારી અને નૈતિક શાસન'),
        topic('Probity in governance: public service, transparency, right to information, codes of ethics and conduct, citizen charters, work culture, quality of service delivery, public funds and corruption', 'શાસનમાં સત્યનિષ્ઠા: જાહેર સેવા, પારદર્શિતા, માહિતીનો અધિકાર, નૈતિકતા અને આચારસંહિતા, નાગરિક અધિકારપત્ર, કાર્યસંસ્કૃતિ, સેવા વિતરણની ગુણવત્તા, જાહેર નાણાં અને ભ્રષ્ટાચાર'),
      ],
    }, {
      titleEn: 'Case Studies',
      titleGu: 'કેસ સ્ટડીઝ',
      topics: [
        topic('Case studies on the above issues', 'ઉપરોક્ત મુદ્દાઓ પર આધારિત કેસ સ્ટડીઝ'),
      ],
    }],
  }],
];

const makeUPSCPaper = (
  basePaper: SyllabusPaper,
  subjectSeeds: SubjectSeed[],
  stage: ExamStageId,
): SyllabusPaper => ({
  ...basePaper,
  subjects: subjectSeeds.map((seed, index) =>
    makeSubject(seed, { examId: 'upsc-cse', paperId: basePaper.id, stage }, index + 1),
  ),
});

const upscBase = SANKALP_EXAM_DATABASE['upsc-cse'];
const upscLanguagePapers: SyllabusPaper[] = [
  {
    id: 'upsc-mains-language-a',
    paperCode: 'Paper A',
    titleEn: 'Indian Language (Qualifying)',
    titleGu: 'ભારતીય ભાષા (ક્વોલિફાઇંગ)',
    stage: 'mains',
    marks: 300,
    duration: '3 Hours',
    nature: 'Qualifying',
    officialDescriptionEn: 'Qualifying paper in one language included in the Eighth Schedule to the Constitution.',
    officialDescriptionGu: 'બંધારણની આઠમી અનુસૂચિમાં સમાવિષ્ટ ભાષાઓમાંથી એક ભાષાનું ક્વોલિફાઇંગ પેપર.',
    subjects: [makeSubject({
      id: 'upsc-mains-language-a-subject',
      nameEn: 'Indian Language Skills',
      nameGu: 'ભારતીય ભાષા કૌશલ્યો',
      icon: 'Languages',
      chapters: [{
        titleEn: 'Language Paper Coverage',
        titleGu: 'ભાષા પેપરનો અભ્યાસક્રમ',
        topics: [
          topic('Comprehension of passages', 'ગદ્યખંડોનું ગદ્યસમજણ'),
          topic('Precis writing', 'સંક્ષેપીકરણ'),
          topic('Usage and vocabulary', 'ભાષાનો ઉપયોગ અને શબ્દભંડોળ'),
          topic('Short essays', 'ટૂંકા નિબંધો'),
          topic('Translation between English and the selected Indian language', 'અંગ્રેજી અને પસંદ કરેલી ભારતીય ભાષા વચ્ચે ભાષાંતર'),
        ],
      }],
    }, { examId: 'upsc-cse', paperId: 'upsc-mains-language-a', stage: 'mains' }, 1)],
  },
  {
    id: 'upsc-mains-language-b',
    paperCode: 'Paper B',
    titleEn: 'English (Qualifying)',
    titleGu: 'અંગ્રેજી (ક્વોલિફાઇંગ)',
    stage: 'mains',
    marks: 300,
    duration: '3 Hours',
    nature: 'Qualifying',
    officialDescriptionEn: 'Qualifying English language paper.',
    officialDescriptionGu: 'ક્વોલિફાઇંગ અંગ્રેજી ભાષાનું પેપર.',
    subjects: [makeSubject({
      id: 'upsc-mains-language-b-subject',
      nameEn: 'English Language Skills',
      nameGu: 'અંગ્રેજી ભાષા કૌશલ્યો',
      icon: 'Languages',
      chapters: [{
        titleEn: 'Language Paper Coverage',
        titleGu: 'ભાષા પેપરનો અભ્યાસક્રમ',
        topics: [
          topic('Comprehension of passages', 'ગદ્યખંડોનું ગદ્યસમજણ'),
          topic('Precis writing', 'સંક્ષેપીકરણ'),
          topic('Usage and vocabulary', 'ભાષાનો ઉપયોગ અને શબ્દભંડોળ'),
          topic('Short essays', 'ટૂંકા નિબંધો'),
        ],
      }],
    }, { examId: 'upsc-cse', paperId: 'upsc-mains-language-b', stage: 'mains' }, 1)],
  },
];

const upscMainsPapers = [
  ...upscLanguagePapers,
  ...upscBase.mainsPapers.map((paper, index) => {
    const seed = upscMainsPaperSeeds[index];
    if (!seed) throw new Error(`Missing UPSC mains syllabus for ${paper.id}.`);
    const paperSummary = [
      {
        en: 'Essay paper: candidates are expected to stay on topic, organize ideas coherently and write concisely and effectively.',
        gu: 'નિબંધ પેપર: વિષય પર કેન્દ્રિત રહી વિચારોને સુસંગત રીતે ગોઠવી સંક્ષિપ્ત અને અસરકારક રીતે લખવાનું અપેક્ષિત છે.',
      },
      {
        en: 'Indian heritage and culture, history and geography of the world, and Indian society.',
        gu: 'ભારતીય વારસો અને સંસ્કૃતિ, વિશ્વનો ઇતિહાસ અને ભૂગોળ તથા ભારતીય સમાજ.',
      },
      {
        en: 'Governance, the Constitution, polity, social justice and international relations.',
        gu: 'શાસન, બંધારણ, રાજ્યવ્યવસ્થા, સામાજિક ન્યાય અને આંતરરાષ્ટ્રીય સંબંધો.',
      },
      {
        en: 'Technology, economic development, biodiversity, environment, security and disaster management.',
        gu: 'ટેકનોલોજી, આર્થિક વિકાસ, જૈવવિવિધતા, પર્યાવરણ, સુરક્ષા અને આપત્તિ વ્યવસ્થાપન.',
      },
      {
        en: 'Ethics, integrity and aptitude.',
        gu: 'નીતિશાસ્ત્ર, સત્યનિષ્ઠા અને યોગ્યતા.',
      },
    ][index];
    return {
      ...makeUPSCPaper(paper, seed, 'mains'),
      officialDescriptionEn: paperSummary.en,
      officialDescriptionGu: paperSummary.gu,
    };
  }),
];

const gpscCoverageNote = {
  en: 'This is Sankalp’s bilingual topic map, not a verbatim transcription or full lesson material. GPSC syllabus and examination details can vary by advertisement; confirm the current notice on the official portal.',
  gu: 'આ સંકલ્પ દ્વારા તૈયાર કરેલો દ્વિભાષી વિષયવાર અભ્યાસ નકશો છે, સત્તાવાર લખાણની શબ્દશઃ નકલ કે સંપૂર્ણ પાઠ્ય સામગ્રી નથી. GPSC નો અભ્યાસક્રમ અને પરીક્ષા વિગતો જાહેરાત પ્રમાણે બદલાઈ શકે છે; સત્તાવાર પોર્ટલ પર હાલની સૂચના તપાસો.',
};

const upscCoverageNote = {
  en: 'This phase covers Prelims GS and CSAT, the qualifying language papers, Essay and GS I–IV. UPSC optional-subject Papers VI–VII are not included yet. This is a syllabus map, not full lesson material; use the current UPSC notification for exact wording.',
  gu: 'આ તબક્કામાં પ્રિલિમ્સ GS અને CSAT, ક્વોલિફાઇંગ ભાષા પેપર્સ, નિબંધ અને GS I–IV આવરી લેવાયા છે. UPSC ના વૈકલ્પિક વિષયના પેપર VI–VII હજી સામેલ નથી. આ અભ્યાસક્રમનો નકશો છે, સંપૂર્ણ પાઠ્ય સામગ્રી નથી; ચોક્કસ શબ્દાવલિ માટે હાલની UPSC સૂચના તપાસો.',
};

const gpscRecord: ExamSyllabusRecord = {
  ...gpscBase,
  badgeEn: 'Sankalp Coverage Map · GPSC Class 1/2',
  badgeGu: 'સંકલ્પ અભ્યાસ નકશો · GPSC વર્ગ ૧/૨',
  officialSource: {
    ...gpscBase.officialSource,
    titleEn: 'GPSC advertisement-specific syllabus listing',
    titleGu: 'GPSC જાહેરાતવાર અભ્યાસક્રમની યાદી',
    documentRef: 'Advertisement 5/2026-27 · Mains syllabus listing',
    gazetteOrNotificationDate: 'Check the current advertisement',
    officialUrl: 'https://gpsc.gujarat.gov.in/StageDocument?name=syllabus',
    notesEn: gpscCoverageNote.en,
    notesGu: gpscCoverageNote.gu,
  },
  coverageNoteEn: gpscCoverageNote.en,
  coverageNoteGu: gpscCoverageNote.gu,
  prelimsPapers: gpscPrelims,
  mainsPapers: gpscMains,
};

const upscRecord: ExamSyllabusRecord = {
  ...upscBase,
  badgeEn: 'Sankalp Coverage Map · UPSC CSE',
  badgeGu: 'સંકલ્પ અભ્યાસ નકશો · UPSC CSE',
  officialSource: {
    ...upscBase.officialSource,
    titleEn: 'UPSC Civil Services Examination notifications',
    titleGu: 'UPSC સિવિલ સર્વિસીસ પરીક્ષાની સૂચનાઓ',
    documentRef: 'Annual notification · verify the current cycle',
    gazetteOrNotificationDate: 'Check the current notification',
    officialUrl: 'https://upsc.gov.in/examinations/Civil-Services-Examination',
    notesEn: upscCoverageNote.en,
    notesGu: upscCoverageNote.gu,
  },
  coverageNoteEn: upscCoverageNote.en,
  coverageNoteGu: upscCoverageNote.gu,
  prelimsPapers: [
    {
      ...makeUPSCPaper(upscBase.prelimsPapers[0], upscPrelimsSubjects, 'prelims'),
      duration: '2 Hours',
      officialDescriptionEn: 'Objective General Studies paper covering current events, history, geography, polity, economic and social development, environment and general science. Check the current notification for examination instructions.',
      officialDescriptionGu: 'વર્તમાન પ્રવાહો, ઇતિહાસ, ભૂગોળ, રાજ્યવ્યવસ્થા, આર્થિક અને સામાજિક વિકાસ, પર્યાવરણ તથા સામાન્ય વિજ્ઞાન આવરી લેતું હેતુલક્ષી સામાન્ય અભ્યાસ પેપર. પરીક્ષા સૂચનાઓ માટે હાલની જાહેરાત તપાસો.',
    },
    {
      ...makeUPSCPaper(upscBase.prelimsPapers[1], upscCsatSubjects, 'prelims'),
      duration: '2 Hours',
      officialDescriptionEn: 'Qualifying Civil Services Aptitude Test paper covering comprehension, communication, reasoning, decision making, problem solving, mental ability, numeracy and data interpretation.',
      officialDescriptionGu: 'ગદ્યસમજ, સંચાર, તર્ક, નિર્ણય લેવાની ક્ષમતા, સમસ્યા ઉકેલવાની ક્ષમતા, માનસિક ક્ષમતા, સંખ્યાજ્ઞાન અને માહિતી અર્થઘટન આવરી લેતું ક્વોલિફાઇંગ સિવિલ સર્વિસિસ એપ્ટિટ્યુડ ટેસ્ટ પેપર.',
    },
  ],
  mainsPapers: upscMainsPapers,
};

export const COMPREHENSIVE_EXAM_DATABASE: Record<string, ExamSyllabusRecord> = {
  'gpsc-class-1-2': gpscRecord,
  'upsc-cse': upscRecord,
};

export const getAllRegisteredExams = (): ExamSyllabusRecord[] =>
  Object.values(COMPREHENSIVE_EXAM_DATABASE);

export const getExamById = (examId: string): ExamSyllabusRecord | undefined =>
  COMPREHENSIVE_EXAM_DATABASE[examId];

export const getSubjectStatsForSyllabus = getSubjectStats;

export function getAllTopicsForExamStage(examId: string, stage: ExamStageId): SyllabusTopic[] {
  const exam = getExamById(examId);
  if (!exam) return [];

  const papers = stage === 'prelims' ? exam.prelimsPapers : exam.mainsPapers;
  return papers.flatMap((paper) =>
    paper.subjects.flatMap((subject) =>
      subject.chapters.flatMap((chapter) => chapter.topics),
    ),
  );
}

export function getExamStageStats(
  examId: string,
  stage: ExamStageId,
  studentStatuses: Record<string, TopicProgressStatus>,
) {
  const topics = getAllTopicsForExamStage(examId, stage);
  const total = topics.length;
  const completed = topics.filter((item) => studentStatuses[item.id] === 'completed').length;
  const inProgress = topics.filter((item) => studentStatuses[item.id] === 'in_progress').length;
  const notStarted = total - completed - inProgress;

  return {
    total,
    completed,
    inProgress,
    notStarted,
    percent: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}
