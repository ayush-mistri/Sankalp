const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        results = results.concat(walk(fullPath));
      }
    } else if (/\.(ts|tsx|js|jsx|json|md)$/.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('./src');

let urlMap = {};

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const urlRegex = /https?:\/\/[^\s'"<>`\)\]]+/g;
  const matches = content.match(urlRegex) || [];
  matches.forEach(m => {
    // clean trailing characters
    let clean = m.replace(/[,\.;\)]+$/, '');
    if (clean.includes('localhost') || clean.includes('127.0.0.1')) return;
    if (clean === 'https://fonts.googleapis.com' || clean === 'https://fonts.gstatic.com') return;
    if (!urlMap[clean]) urlMap[clean] = new Set();
    urlMap[clean].add(f.replace(/\\/g, '/'));
  });
});

const uniqueUrls = Object.keys(urlMap);
console.log(`Discovered ${uniqueUrls.length} unique URLs across ${files.length} source files.\n`);

function checkUrl(url, redirectCount = 0) {
  return new Promise((resolve) => {
    if (redirectCount > 5) {
      return resolve({ url, status: 'TOO_MANY_REDIRECTS', ok: false });
    }

    try {
      const parsed = new URL(url);
      const mod = parsed.protocol === 'https:' ? https : http;
      
      const options = {
        method: 'GET',
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9'
        },
        rejectUnauthorized: false
      };

      const req = mod.request(url, options, (res) => {
        // Follow redirects
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          let nextUrl = res.headers.location;
          if (nextUrl.startsWith('/')) {
            nextUrl = `${parsed.protocol}//${parsed.host}${nextUrl}`;
          }
          req.destroy();
          return resolve(checkUrl(nextUrl, redirectCount + 1).then(r => ({
            ...r,
            originalUrl: url,
            redirectedTo: nextUrl,
            status: res.statusCode === 301 ? `301 -> ${r.status}` : `302 -> ${r.status}`,
            ok: r.ok
          })));
        }

        res.destroy(); // We only needed headers
        const isOk = res.statusCode >= 200 && res.statusCode < 400;
        resolve({ url, status: res.statusCode, ok: isOk });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({ url, status: 'TIMEOUT', ok: false });
      });

      req.on('error', (err) => {
        resolve({ url, status: err.code || err.message, ok: false });
      });

      req.end();
    } catch (e) {
      resolve({ url, status: 'INVALID_URL', ok: false });
    }
  });
}

async function run() {
  const results = [];
  
  // Test in batches of 4
  for (let i = 0; i < uniqueUrls.length; i += 4) {
    const batch = uniqueUrls.slice(i, i + 4);
    const batchResults = await Promise.all(batch.map(u => checkUrl(u)));
    for (const r of batchResults) {
      const callingFiles = Array.from(urlMap[r.originalUrl || r.url]).map(f => path.basename(f)).join(', ');
      const symbol = r.ok ? '✅' : (r.status === 403 ? '⚠️ 403 (Protected/WAF)' : '❌');
      console.log(`${symbol} [${r.status}] ${r.originalUrl || r.url}`);
      if (r.redirectedTo) console.log(`    ↳ Redirects to: ${r.redirectedTo}`);
      console.log(`    ↳ Found in: ${callingFiles}`);
      results.push({ ...r, files: Array.from(urlMap[r.originalUrl || r.url]) });
    }
  }

  const failed = results.filter(r => !r.ok);
  console.log(`\n========================================`);
  console.log(`AUDIT COMPLETE`);
  console.log(`Total URLs: ${results.length}`);
  console.log(`Operational: ${results.length - failed.length}`);
  console.log(`Issues / Needs Attention: ${failed.length}`);
  console.log(`========================================\n`);

  fs.writeFileSync('C:/Users/pca64/.gemini/antigravity/brain/053890eb-06a8-4b7a-ba84-82e8f4b5910a/url_check_results.json', JSON.stringify(results, null, 2));
}

run().catch(console.error);
