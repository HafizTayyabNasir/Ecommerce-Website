const fs = require('fs');
const https = require('https');
const path = require('path');

const imageMap = {
  "tees-tops": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
  "hoodies-sweats": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
  "joggers-pants": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
  "shorts": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
  "outerwear": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
  "accessories": "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80"
};

const products = [
    { name: "Phantom Oversized Tee", slug: "phantom-oversized-tee", category: "tees-tops" },
    { name: "Ghost Drop Tee", slug: "ghost-drop-tee", category: "tees-tops" },
    { name: "Midnight Crop Top", slug: "midnight-crop-top", category: "tees-tops" },
    { name: "Raw Edge Tank", slug: "raw-edge-tank", category: "tees-tops" },
    { name: "Stealth Hoodie", slug: "stealth-hoodie", category: "hoodies-sweats" },
    { name: "Cloud Nine Pullover", slug: "cloud-nine-pullover", category: "hoodies-sweats" },
    { name: "Neon Zip Hoodie", slug: "neon-zip-hoodie", category: "hoodies-sweats" },
    { name: "Crew Neck Sweatshirt", slug: "crew-neck-sweatshirt", category: "hoodies-sweats" },
    { name: "Urban Cargo Jogger", slug: "urban-cargo-jogger", category: "joggers-pants" },
    { name: "Tech Fleece Pant", slug: "tech-fleece-pant", category: "joggers-pants" },
    { name: "Slim Track Pant", slug: "slim-track-pant", category: "joggers-pants" },
    { name: "Wide Leg Cargo", slug: "wide-leg-cargo", category: "joggers-pants" },
    { name: "Drift Training Shorts", slug: "drift-training-shorts", category: "shorts" },
    { name: "Mesh Basketball Short", slug: "mesh-basketball-short", category: "shorts" },
    { name: "Compression Liner Short", slug: "compression-liner-short", category: "shorts" },
    { name: "Cargo Utility Short", slug: "cargo-utility-short", category: "shorts" },
    { name: "Shadow Windbreaker", slug: "shadow-windbreaker", category: "outerwear" },
    { name: "Puffer Vest", slug: "puffer-vest", category: "outerwear" },
    { name: "Coach Jacket", slug: "coach-jacket", category: "outerwear" },
    { name: "Track Jacket", slug: "track-jacket", category: "outerwear" },
    { name: "Snapback Cap", slug: "snapback-cap", category: "accessories" },
    { name: "Bucket Hat", slug: "bucket-hat", category: "accessories" },
    { name: "Crossbody Bag", slug: "crossbody-bag", category: "accessories" },
    { name: "Crew Socks (3-Pack)", slug: "crew-socks-3-pack", category: "accessories" },
    { name: "Duffle Bag", "slug": "duffle-bag", category: "accessories" },
    { name: "Beanie", slug: "beanie", category: "accessories" },
    { name: "Performance Gloves", slug: "performance-gloves", category: "accessories" },
    { name: "Logo Belt", slug: "logo-belt", category: "accessories" },
    { name: "Oversized Graphic Tee", "slug": "oversized-graphic-tee", category: "tees-tops" },
    { name: "Ribbed Long Sleeve", "slug": "ribbed-long-sleeve", category: "tees-tops" },
    { name: "Washed Henley", "slug": "washed-henley", category: "tees-tops" },
    { name: "Zip Cargo Pant", "slug": "zip-cargo-pant", category: "joggers-pants" }
];

const outputDir = path.join(__dirname, 'public', 'images', 'products');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  console.log("Downloading placeholder images...");
  for (const product of products) {
    const imageUrl = imageMap[product.category];
    const filepath = path.join(outputDir, `${product.slug}.jpg`);
    
    if (fs.existsSync(filepath)) {
      console.log(`Exists: ${product.slug}.jpg`);
      continue;
    }
    
    try {
      await download(imageUrl, filepath);
      console.log(`Downloaded: ${product.slug}.jpg`);
    } catch (err) {
      console.error(`Error downloading ${product.slug}.jpg:`, err.message);
    }
  }
  console.log("All done!");
}

run();
