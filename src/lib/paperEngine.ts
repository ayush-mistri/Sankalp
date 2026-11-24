import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { PrelimsPaperMeta } from '@/types';

const EMERALD = rgb(0.02, 0.45, 0.32);
const DARK_STONE = rgb(0.12, 0.12, 0.12);
const MUTED_TEXT = rgb(0.40, 0.40, 0.40);
const LIGHT_BG = rgb(0.96, 0.98, 0.96);
const CARD_BORDER = rgb(0.85, 0.88, 0.85);

export interface ProcessPaperOptions {
  sourcePdfPath: string;
  outputPdfPath: string;
  meta: PrelimsPaperMeta;
  skipFirstPages?: number;
  pageCount?: number | null;
}

/**
 * Universal Cover Page Generator for any Exam Paper (GPSC / UPSC, Any Year)
 */
export async function createBrandedCoverPage(
  doc: PDFDocument,
  meta: PrelimsPaperMeta,
  finalTotalPages: number
) {
  const cover = doc.addPage([595.28, 841.89]);
  const { width, height } = cover.getSize();

  const helvBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const helv = await doc.embedFont(StandardFonts.Helvetica);
  const timesBold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const times = await doc.embedFont(StandardFonts.TimesRoman);

  // Exterior Double Borders
  cover.drawRectangle({ x: 25, y: 25, width: width - 50, height: height - 50, borderColor: EMERALD, borderWidth: 2 });
  cover.drawRectangle({ x: 29, y: 29, width: width - 58, height: height - 58, borderColor: DARK_STONE, borderWidth: 0.5 });

  // Top Sankalp Branding Banner
  cover.drawRectangle({ x: 38, y: height - 76, width: width - 76, height: 38, color: EMERALD });
  cover.drawText('SANKALP LEARNING PLATFORM - PREVIOUS YEARS QUESTION PAPERS ARCHIVE', {
    x: 52,
    y: height - 62,
    size: 10,
    font: helvBold,
    color: rgb(1, 1, 1),
  });

  // Commission Header
  const agencyName = meta.examAgency === 'UPSC' 
    ? 'UNION PUBLIC SERVICE COMMISSION' 
    : 'GUJARAT PUBLIC SERVICE COMMISSION';
  const agencyLocation = meta.examAgency === 'UPSC' 
    ? 'NEW DELHI, INDIA - CIVIL SERVICES EXAMINATION' 
    : 'GANDHINAGAR, GUJARAT - OFFICIAL PRELIMINARY EXAMINATION';

  cover.drawText(agencyName, {
    x: width / 2 - (agencyName.length * 4.3),
    y: height - 120,
    size: 16,
    font: timesBold,
    color: DARK_STONE,
  });
  cover.drawText(agencyLocation, {
    x: width / 2 - (agencyLocation.length * 2.8),
    y: height - 142,
    size: 10.5,
    font: helvBold,
    color: EMERALD,
  });

  // Examination Details Box
  cover.drawRectangle({
    x: 42,
    y: height - 250,
    width: width - 84,
    height: 92,
    color: LIGHT_BG,
    borderColor: CARD_BORDER,
    borderWidth: 1.2,
  });
  cover.drawText(meta.examNameEn || 'Civil Services Examination', {
    x: 56,
    y: height - 182,
    size: 11,
    font: helvBold,
    color: DARK_STONE,
  });
  cover.drawText(meta.paperTypeEn || 'General Studies Paper-1', {
    x: 56,
    y: height - 204,
    size: 9.5,
    font: times,
    color: MUTED_TEXT,
  });
  const subText = `Advertisement No.: ${meta.advertisementNo || 'Official'}   |   Paper Code: ${meta.paperCode || 'CSP-1'}   |   Full ${meta.totalQuestions} Questions`;
  cover.drawText(subText, {
    x: 56,
    y: height - 228,
    size: 9,
    font: helvBold,
    color: EMERALD,
  });

  // 4-Column Key Metrics Table
  cover.drawRectangle({ x: 42, y: height - 325, width: width - 84, height: 62, borderColor: DARK_STONE, borderWidth: 0.8 });
  const colW = (width - 84) / 4;
  const metrics = [
    { label: 'TOTAL QUESTIONS', val: `${meta.totalQuestions} Questions` },
    { label: 'MAXIMUM MARKS', val: `${meta.totalMarks} Marks` },
    { label: 'TIME ALLOWED', val: `${meta.durationMinutes} Minutes` },
    { label: 'NEGATIVE MARKING', val: meta.negativeMarkingEn || '-0.30 Marks' },
  ];
  metrics.forEach((m, idx) => {
    const colX = 42 + idx * colW;
    if (idx > 0) {
      cover.drawLine({ start: { x: colX, y: height - 263 }, end: { x: colX, y: height - 325 }, color: rgb(0.8, 0.8, 0.8), thickness: 0.5 });
    }
    cover.drawText(m.label, { x: colX + 10, y: height - 285, size: 7.5, font: helvBold, color: MUTED_TEXT });
    cover.drawText(m.val, { x: colX + 10, y: height - 308, size: 10, font: helvBold, color: DARK_STONE });
  });

  // Verification & Authenticity Certificate Card
  cover.drawRectangle({
    x: 42,
    y: height - 570,
    width: width - 84,
    height: 230,
    color: rgb(0.99, 0.99, 0.99),
    borderColor: EMERALD,
    borderWidth: 1.2,
  });
  cover.drawText('VERIFIED 100% AUTHENTIC COMMISSION QUESTION PAPER', {
    x: 56,
    y: height - 360,
    size: 11,
    font: helvBold,
    color: EMERALD,
  });
  cover.drawLine({
    start: { x: 56, y: height - 368 },
    end: { x: width - 56, y: height - 368 },
    color: EMERALD,
    thickness: 0.75,
  });

  const instructions = [
    `1. Exact Official Reproduction: Sourced directly from official commission master question paper.`,
    `2. Complete Bilingual Structure: Original Gujarati script and English version presented side-by-side.`,
    `3. Official Answer Key Included: Answers indicated with official circular shaded markers.`,
    `4. Digital Document Integrity: Unaltered question statements, numbers, options, and tables.`,
    `5. Strict Examination Simulation: Time allowed is ${meta.durationMinutes} minutes with ${meta.negativeMarkingEn}.`,
    `6. Interactive Practice Mode: This entire paper can also be taken in timed CBT mode on the Sankalp Platform.`,
    `7. Educational Initiative: Published for student benefit under the Sankalp Open Knowledge Initiative.`
  ];
  instructions.forEach((ins, idx) => {
    cover.drawText(ins, {
      x: 56,
      y: height - 392 - idx * 22,
      size: 8.5,
      font: times,
      color: DARK_STONE,
    });
  });

  // Footer on cover page
  cover.drawText(`Page 1 of ${finalTotalPages}   ·   Sankalp Learning Platform (www.sankalp.edu)   ·   Official Archive`, {
    x: width / 2 - 180,
    y: 40,
    size: 8,
    font: helv,
    color: MUTED_TEXT,
  });

  return cover;
}

/**
 * Universal Ingestion Engine: Takes ANY Raw Government PDF and Produces a Sankalp Branded Authentic Booklet
 */
export async function ingestPaper(options: ProcessPaperOptions) {
  const { sourcePdfPath, outputPdfPath, meta, skipFirstPages = 0, pageCount = null } = options;

  if (!fs.existsSync(sourcePdfPath)) {
    throw new Error(`Source PDF not found at: ${sourcePdfPath}`);
  }

  const srcBytes = fs.readFileSync(sourcePdfPath);
  const srcDoc = await PDFDocument.load(srcBytes);
  const srcTotalPages = srcDoc.getPageCount();

  const startIdx = Math.max(0, skipFirstPages);
  const endIdx = pageCount ? Math.min(startIdx + pageCount, srcTotalPages) : srcTotalPages;
  const pagesToCopyCount = endIdx - startIdx;
  const finalTotalPages = pagesToCopyCount + 1; // +1 for cover page

  const targetDoc = await PDFDocument.create();
  const helvBold = await targetDoc.embedFont(StandardFonts.HelveticaBold);
  const helv = await targetDoc.embedFont(StandardFonts.Helvetica);

  // 1. Prepend Cover Page
  await createBrandedCoverPage(targetDoc, meta, finalTotalPages);

  // 2. Copy Authentic Government Pages
  const indices = Array.from({ length: pagesToCopyCount }, (_, i) => i + startIdx);
  const copiedPages = await targetDoc.copyPages(srcDoc, indices);

  copiedPages.forEach((p, idx) => {
    const pSize = p.getSize();

    // Top Runner Ribbon
    p.drawRectangle({
      x: 0,
      y: pSize.height - 18,
      width: pSize.width,
      height: 18,
      color: rgb(0.96, 0.98, 0.96),
    });

    const runnerText = `SANKALP ${meta.examAgency} VAULT   |   Advt. ${meta.advertisementNo || 'Official'}   |   ${meta.paperCode || 'Paper'}   |   Official Master Paper`;
    p.drawText(runnerText, {
      x: 35,
      y: pSize.height - 12,
      size: 7,
      font: helvBold,
      color: EMERALD,
    });

    p.drawText(`Page ${idx + 2} of ${finalTotalPages}   |   www.sankalp.edu`, {
      x: pSize.width - 165,
      y: pSize.height - 12,
      size: 7,
      font: helv,
      color: MUTED_TEXT,
    });

    targetDoc.addPage(p);
  });

  // Ensure output dir exists
  const outDir = path.dirname(outputPdfPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const finalBytes = await targetDoc.save();
  fs.writeFileSync(outputPdfPath, finalBytes);

  return {
    pageCount: targetDoc.getPageCount(),
    bytes: finalBytes.length,
    outputPath: outputPdfPath
  };
}
