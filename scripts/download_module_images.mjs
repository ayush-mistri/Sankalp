const moduleImages = [
  { id: 'topic-f1', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80', name: 'preamble-constitution.jpg' },
  { id: 'topic-gh1', url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80', name: 'dholavira-lothal.jpg' },
  { id: 'topic-f2', url: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=1200&q=80', name: 'fundamental-rights.jpg' },
  { id: 'topic-f3', url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80', name: 'dpsp-duties.jpg' },
  { id: 'topic-gh2', url: 'https://images.unsplash.com/photo-1600100397608-f010f443834a?auto=format&fit=crop&w=1200&q=80', name: 'solanki-modhera.jpg' },
  { id: 'topic-gh3', url: 'https://images.unsplash.com/photo-1585130401366-fe05a8d813c4?auto=format&fit=crop&w=1200&q=80', name: 'gujarat-sultanate.jpg' },
  { id: 'topic-i1', url: 'https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=1200&q=80', name: 'parliament-procedures.jpg' },
  { id: 'topic-i2', url: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1200&q=80', name: 'mahagujarat-movement.jpg' },
  { id: 'topic-a1', url: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=1200&q=80', name: 'basic-structure-judiciary.jpg' },
];

import fs from 'fs';
import path from 'path';

const targetDir = 'public/images/modules';
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

async function run() {
  for (const m of moduleImages) {
    const dest = path.join(targetDir, m.name);
    console.log(`Fetching ${m.name}...`);
    const res = await fetch(m.url);
    if (!res.ok) {
      console.error(`Failed ${m.name}: ${res.status}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log(`Saved ${dest} (${(buf.length / 1024).toFixed(1)} KB)`);
  }
}

run();
