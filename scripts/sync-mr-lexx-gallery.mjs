import fs from 'node:fs/promises';
import path from 'node:path';

const urls = [
  'https://img77.uenicdn.com/image/upload/v1665605448/business/ca7fd4a5-bdb1-4858-99bc-bffd356898c6.jpg',
  'https://img77.uenicdn.com/image/upload/v1662298627/business/540b4c5a-16a9-4f39-9e99-2a31aea0afdb.jpg',
  'https://img77.uenicdn.com/image/upload/v1662298507/business/f9ed5366-3c67-4e38-8d99-f28115169d4e.jpg',
  'https://img77.uenicdn.com/image/upload/v1662298506/business/bde8ea34-e25e-4437-b141-915c5b25ece6.jpg',
  'https://img77.uenicdn.com/image/upload/v1662298505/business/3671f974-2526-4a78-ad21-1c5cde14f3fd.jpg',
  'https://img77.uenicdn.com/image/upload/v1662298504/business/b84233f2-11ae-47d2-981f-462408c88088.jpg',
  'https://img77.uenicdn.com/image/upload/v1662298504/business/31555323-ba94-4f6f-bf14-a23b24eb23fb.jpg',
  'https://img77.uenicdn.com/image/upload/v1662298503/business/3013131f-0819-43ec-bd24-f256f19196b3.jpg',
  'https://img77.uenicdn.com/image/upload/v1662298503/business/07f6c62a-85d9-445b-80fe-02441c9a913b.jpg',
  'https://img77.uenicdn.com/image/upload/v1662298503/business/314cf2c0-779e-4c06-946d-cbecee811228.jpg',
  'https://img77.uenicdn.com/image/upload/v1662298502/business/bb14ec29-fea5-4d7d-9b54-53811880cfba.jpg',
  'https://img77.uenicdn.com/image/upload/v1662298501/business/5be92350-b810-4f59-a138-1a0bc6214e44.jpg',
  'https://img77.uenicdn.com/image/upload/v1662298501/business/dd647717-2899-4514-bee0-beca6a6b6500.jpg',
  'https://img77.uenicdn.com/image/upload/v1662298501/business/5c2c5dd6-6323-4064-a2f3-984da3178dff.jpg',
  'https://img77.uenicdn.com/image/upload/v1662298501/business/4225778b-9d4c-455d-9c98-7a1f9711ff91.jpg',
  'https://img77.uenicdn.com/image/upload/v1662298501/business/4db1f1be-64e4-44d3-9316-2fff3a6d6b35.jpg',
  'https://img77.uenicdn.com/image/upload/v1662298500/business/367f768b-47c1-4901-bf74-c8031cdde2c1.jpg',
  'https://img77.uenicdn.com/image/upload/v1660854575/business/4eaf420ce9f248488493aea38690f259.jpg',
  'https://img77.uenicdn.com/image/upload/v1660396919/business/a81f216f-0236-4668-a0b4-634900793919/Lexx1JPG.jpg',
  'https://img77.uenicdn.com/image/upload/v1660396933/business/a81f216f-0236-4668-a0b4-634900793919/Lexx2JPG.jpg',
  'https://img77.uenicdn.com/image/upload/v1663711774/business/cca20823-526f-4f5b-9365-981795fd68ff.jpg'
];

const out = path.resolve('public/media/mr-lexx');
await fs.mkdir(out, { recursive: true });

const manifest = [];
for (let i = 0; i < urls.length; i++) {
  const url = urls[i];
  const response = await fetch(url, { headers: { 'user-agent': 'DiggyNationMigration/1.0', accept: 'image/*' } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  const type = response.headers.get('content-type') || 'image/jpeg';
  const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg';
  const filename = `mr-lexx-gallery-${String(i + 1).padStart(2, '0')}.${ext}`;
  const bytes = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(path.join(out, filename), bytes);
  manifest.push({ index: i + 1, sourceUrl: url, localPath: `/media/mr-lexx/${filename}`, bytes: bytes.length, contentType: type });
  console.log(`✓ ${filename} (${bytes.length} bytes)`);
}
await fs.writeFile(path.join(out, 'gallery-manifest.json'), JSON.stringify({ sourcePage: 'https://diggynation.com/mr-lexx-media/mr-lexx-media-gallery', recoveredAt: new Date().toISOString(), count: manifest.length, images: manifest }, null, 2) + '\n');
console.log(`Mirrored ${manifest.length} rendered Mr. Lexx gallery originals.`);
