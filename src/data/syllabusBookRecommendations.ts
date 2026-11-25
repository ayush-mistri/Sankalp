import { getChaptersForBook } from '@/data/bookChaptersData';
import type { BookChapter, DigitalBookResource } from '@/types/books';
import type { SyllabusTopic } from '@/types/syllabus';

export interface SyllabusBookRecommendation {
  resource: DigitalBookResource;
  chapters: BookChapter[];
}

const IGNORED_MATCH_WORDS = new Set([
  'about', 'across', 'also', 'among', 'and', 'area', 'areas', 'aspect', 'aspects',
  'basic', 'based', 'between', 'chapter', 'course', 'development', 'different',
  'features', 'from', 'general', 'including', 'india', 'indian', 'introduction',
  'issues', 'major', 'overview', 'part', 'principles', 'related', 'section',
  'study', 'syllabus', 'theme', 'topics', 'understanding', 'with', 'administration',
  'administrative', 'ancient', 'century', 'civilisation', 'civilization', 'economy',
  'economic', 'history', 'historical', 'literature', 'medieval', 'modern', 'period',
  'polity', 'society', 'world', 'architecture', 'art', 'belief', 'culture', 'early',
  'king', 'movement', 'religion', 'religious', 'rule',
]);

const MATCH_WORD_ALIASES: Record<string, string[]> = {
  buddhism: ['buddhist'],
  buddhist: ['buddhism'],
  civilization: ['civilisation'],
  civilisation: ['civilization'],
  british: ['colonialism', 'raj'],
  colonialism: ['british'],
  economic: ['economy'],
  economy: ['economic'],
  freedom: ['nationalist'],
  nationalist: ['freedom'],
  harappan: ['indus'],
  indus: ['harappan'],
  jainism: ['jain'],
  jain: ['jainism'],
  maurya: ['mauryan'],
  mauryan: ['maurya'],
  vedas: ['vedic'],
  vedic: ['vedas'],
};

const getTopicText = (topic: SyllabusTopic): string =>
  [
    topic.titleEn,
    topic.officialWordingEn,
    ...topic.keySubtopicsEn,
  ].join(' ');

const getMatchWords = (text: string): Set<string> => {
  const words = text.toLowerCase().match(/[a-z0-9]+/g) || [];
  const normalized = words.map((word) => {
    if (word.endsWith('ies') && word.length > 5) return `${word.slice(0, -3)}y`;
    if (word.endsWith('s') && word.length > 4 && !word.endsWith('us')) {
      return word.slice(0, -1);
    }
    return word;
  });

  return new Set(
    normalized.filter((word) => word.length > 3 && !IGNORED_MATCH_WORDS.has(word)),
  );
};

const findRelevantChapters = (
  topic: SyllabusTopic,
  chapters: BookChapter[],
): BookChapter[] => {
  const topicWords = getMatchWords(getTopicText(topic));
  const topicFocusWords = getMatchWords(topic.titleEn.split(':', 1)[0]);

  const matches = chapters
    .map((chapter) => {
      const titleWords = getMatchWords(chapter.titleEn);
      const supportingText = [
        ...chapter.sections.flatMap((section) => [section.headingEn, ...(section.keyTerms || [])]),
        ...chapter.summaryPointsEn,
      ].join(' ');
      const supportingWords = getMatchWords(supportingText);
      let titleMatches = 0;
      let supportingMatches = 0;
      let focusMatches = 0;

      topicWords.forEach((word) => {
        const aliases = MATCH_WORD_ALIASES[word] || [];
        if ([word, ...aliases].some((candidate) => titleWords.has(candidate))) {
          titleMatches += 1;
        } else if ([word, ...aliases].some((candidate) => supportingWords.has(candidate))) {
          supportingMatches += 1;
        }
      });

      topicFocusWords.forEach((word) => {
        const aliases = MATCH_WORD_ALIASES[word] || [];
        if ([word, ...aliases].some((candidate) =>
          titleWords.has(candidate) || supportingWords.has(candidate),
        )) {
          focusMatches += 1;
        }
      });

      return {
        chapter,
        score: titleMatches * 3 + supportingMatches,
        titleMatches,
        supportingMatches,
        focusMatches,
      };
    });

  const focusedMatches = matches.filter(({ focusMatches }) => focusMatches > 0);
  const relevantMatches = topic.titleEn.includes(':') && topicFocusWords.size > 0
    ? focusedMatches
    : matches.filter(({ titleMatches, supportingMatches }) =>
      titleMatches > 0 || supportingMatches > 0,
    );

  return relevantMatches
    .sort((left, right) => right.score - left.score)
    .map(({ chapter }) => chapter);
};

export const getSyllabusBookRecommendations = (
  topic: SyllabusTopic,
  resources: DigitalBookResource[],
): SyllabusBookRecommendation[] => {
  return resources.flatMap((resource) => {
    if (!resource.syllabusTopicIds?.includes(topic.id)) return [];
    const availableChapters = getChaptersForBook(resource.id);
    const chapters = findRelevantChapters(topic, availableChapters);
    return [{ resource, chapters }];
  });
};
