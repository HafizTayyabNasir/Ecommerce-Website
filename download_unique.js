const fs = require('fs');
const https = require('https');
const path = require('path');

const products = [
    { name: "Phantom Oversized Tee", slug: "phantom-oversized-tee", q: "t-shirt fashion" },
    { name: "Ghost Drop Tee", slug: "ghost-drop-tee", q: "t-shirt fashion" },
    { name: "Midnight Crop Top", slug: "midnight-crop-top", q: "crop top fashion" },
    { name: "Raw Edge Tank", slug: "raw-edge-tank", q: "tank top fashion" },
    { name: "Stealth Hoodie", slug: "stealth-hoodie", q: "hoodie streetwear" },
    { name: "Cloud Nine Pullover", slug: "cloud-nine-pullover", q: "pullover sweatshirt" },
    { name: "Neon Zip Hoodie", slug: "neon-zip-hoodie", q: "zip hoodie" },
    { name: "Crew Neck Sweatshirt", slug: "crew-neck-sweatshirt", q: "crew neck sweatshirt" },
    { name: "Urban Cargo Jogger", slug: "urban-cargo-jogger", q: "cargo pants streetwear" },
    { name: "Tech Fleece Pant", slug: "tech-fleece-pant", q: "fleece pants fashion" },
    { name: "Slim Track Pant", slug: "slim-track-pant", q: "track pants" },
    { name: "Wide Leg Cargo", slug: "wide-leg-cargo", q: "wide leg cargo pants" },
    { name: "Drift Training Shorts", slug: "drift-training-shorts", q: "training shorts" },
    { name: "Mesh Basketball Short", slug: "mesh-basketball-short", q: "basketball shorts" },
    { name: "Compression Liner Short", slug: "compression-liner-short", q: "compression shorts" },
    { name: "Cargo Utility Short", slug: "cargo-utility-short", q: "cargo shorts" },
    { name: "Shadow Windbreaker", slug: "shadow-windbreaker", q: "windbreaker jacket" },
    { name: "Puffer Vest", slug: "puffer-vest", q: "puffer vest" },
    { name: "Coach Jacket", slug: "coach-jacket", q: "coach jacket" },
    { name: "Track Jacket", slug: "track-jacket", q: "track jacket" },
    { name: "Snapback Cap", slug: "snapback-cap", q: "snapback cap" },
    { name: "Bucket Hat", slug: "bucket-hat", q: "bucket hat fashion" },
    { name: "Crossbody Bag", slug: "crossbody-bag", q: "crossbody bag" },
    { name: "Crew Socks (3-Pack)", slug: "crew-socks-3-pack", q: "crew socks" },
    { name: "Duffle Bag", slug: "duffle-bag", q: "duffle bag" },
    { name: "Beanie", slug: "beanie", q: "beanie hat" },
    { name: "Performance Gloves", slug: "performance-gloves", q: "winter gloves" },
    { name: "Logo Belt", slug: "logo-belt", q: "fashion belt" },
    { name: "Oversized Graphic Tee", slug: "oversized-graphic-tee", q: "graphic tee streetwear" },
    { name: "Ribbed Long Sleeve", slug: "ribbed-long-sleeve", q: "long sleeve shirt" },
    { name: "Washed Henley", slug: "washed-henley", q: "henley shirt" },
    { name: "Zip Cargo Pant", slug: "zip-cargo-pant", q: "cargo pants black" }
];

const collections = [
    { slug: "tees", q: "t-shirts rack" },
    { slug: "hoodies", q: "hoodies streetwear" },
    { slug: "joggers", q: "pants streetwear" },
    { slug: "accessories", q: "fashion accessories" }
];

const outputDir = path.join(__dirname, 'public', 'images', 'products');
const collectionsDir = path.join(__dirname, 'public', 'images', 'collections');
const rootImagesDir = path.join(__dirname, 'public', 'images');

[outputDir, collectionsDir, rootImagesDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

function fetchUnsplashURL(query) {
  return new Promise((resolve, reject) => {
    https.get(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=1&page=1`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0) {
            resolve(json.results[0].urls.regular);
          } else {
            resolve("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"); // fallback
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => fs.unlink(dest, () => reject(err)));
  });
}

async function run() {
  console.log("Downloading unique images...");
  for (const p of products) {
    const dest = path.join(outputDir, `${p.slug}.jpg`);
    console.log(`Fetching ${p.name}...`);
    try {
      const url = await fetchUnsplashURL(p.q);
      await download(url, dest);
    } catch (e) {
      console.error(`Error on ${p.slug}`, e.message);
    }
  }

  console.log("Downloading collection images...");
  for (const c of collections) {
    const dest = path.join(collectionsDir, `${c.slug}.jpg`);
    console.log(`Fetching collection ${c.slug}...`);
    try {
      const url = await fetchUnsplashURL(c.q);
      await download(url, dest);
    } catch (e) {
      console.error(`Error on ${c.slug}`, e.message);
    }
  }

  console.log("Downloading Hero banner...");
  const heroDest = path.join(rootImagesDir, "hero.jpg");
  const heroUrl = await fetchUnsplashURL("streetwear model banner landscape");
  await download(heroUrl, heroDest);

  console.log("Finished generating unique images!");
}

run();
