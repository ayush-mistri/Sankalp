import fs from 'fs';
import path from 'path';

const filePath = 'src/data/learningModules.ts';
let content = fs.readFileSync(filePath, 'utf-8');

const replacements = [
  {
    target: "url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Preamble_to_the_Constitution_of_India.jpg/800px-Preamble_to_the_Constitution_of_India.jpg',",
    replacement: "url: '/images/modules/preamble-constitution.jpg',",
  },
  {
    target: "url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Reservoir_at_Dholavira.jpg/800px-Reservoir_at_Dholavira.jpg',",
    replacement: "url: '/images/modules/dholavira-lothal.jpg',",
  },
  {
    target: "url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Supreme_Court_of_India_01.jpg/800px-Supreme_Court_of_India_01.jpg',",
    replacement: "url: '/images/modules/fundamental-rights.jpg',",
  },
  {
    target: "url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Dr._Babasaheb_Ambedkar_delivering_a_speech_to_the_Constituent_Assembly.jpg/800px-Dr._Babasaheb_Ambedkar_delivering_a_speech_to_the_Constituent_Assembly.jpg',",
    replacement: "url: '/images/modules/dpsp-duties.jpg',",
  },
  {
    target: "url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Uparkot_Buddhist_Caves%2C_Junagadh.jpg/800px-Uparkot_Buddhist_Caves%2C_Junagadh.jpg',",
    replacement: "url: '/images/modules/gujarat-sultanate.jpg',",
  },
  {
    target: "url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Sun_Temple_Modhera_Gujarat.jpg/800px-Sun_Temple_Modhera_Gujarat.jpg',",
    replacement: "url: '/images/modules/solanki-modhera.jpg',",
  },
  {
    target: "url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/New_Parliament_House%2C_New_Delhi_01.jpg/800px-New_Parliament_House%2C_New_Delhi_01.jpg',",
    replacement: "url: '/images/modules/parliament-procedures.jpg',",
  },
  {
    target: "url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Sabarmati_Ashram_Ahmedabad_Gujarat.jpg/800px-Sabarmati_Ashram_Ahmedabad_Gujarat.jpg',",
    replacement: "url: '/images/modules/mahagujarat-movement.jpg',",
  },
  {
    target: "url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/800px-Emblem_of_India.svg.png',",
    replacement: "url: '/images/modules/basic-structure-judiciary.jpg',",
  },
];

for (const r of replacements) {
  if (!content.includes(r.target)) {
    console.error(`Target not found: ${r.target.slice(0, 40)}`);
  } else {
    content = content.replace(r.target, r.replacement);
    console.log(`Replaced: ${r.replacement}`);
  }
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully updated learningModules.ts with local images!');
