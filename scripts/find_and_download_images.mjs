import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const targetFiles = [
  path.join(rootDir, 'src/data/learningModules.ts'),
  path.join(rootDir, 'src/data/gpscOfficialSyllabus2026.ts'),
  path.join(rootDir, 'src/data/currentAffairs.ts'),
];

// Ensure public directories exist
const imagesDir = path.join(rootDir, 'public/images');
const modulesDir = path.join(imagesDir, 'modules');
const booksDir = path.join(imagesDir, 'books');
const caDir = path.join(imagesDir, 'current_affairs');

[imagesDir, modulesDir, booksDir, caDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

async function downloadFile(url, destPath) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destPath, buffer);
    console.log(`Saved: ${destPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
    return true;
  } catch (err) {
    console.error(`Failed to download ${url}:`, err.message);
    return false;
  }
}

async function processFile(filePath, categoryFolder) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  // Regex to match Unsplash or Wikimedia or generic image URLs
  const urlRegex = /https:\/\/(images\.unsplash\.com\/[^\s'"`]+|upload\.wikimedia\.org\/[^\s'"`]+)/g;
  
  const matches = [...new Set(content.match(urlRegex) || [])];
  console.log(`Found ${matches.length} image URLs in ${path.basename(filePath)}`);

  let index = 1;
  for (const url of matches) {
    // Generate clean filename
    const ext = url.includes('.png') ? '.png' : '.jpg';
    const baseName = `${categoryFolder}-${index}${ext}`;
    const destPath = path.join(imagesDir, categoryFolder, baseName);
    const localUrlPath = `/images/${categoryFolder}/${baseName}`;

    console.log(`Downloading (${index}/${matches.length}): ${url.slice(0, 60)}... -> ${baseName}`);
    const success = await downloadFile(url, destPath);

    if (success) {
      // Replace all occurrences of this URL in file content
      content = content.replaceAll(url, localUrlPath);
    }
    index++;
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated ${path.basename(filePath)} with local image paths!\n`);
}

async function main() {
  console.log('--- Starting Image Downloader ---');
  await processFile(targetFiles[0], 'modules');
  await processFile(targetFiles[1], 'books');
  await processFile(targetFiles[2], 'current_affairs');
  console.log('--- Finished Image Downloading & Path Updating ---');
}

main();
