import os
import requests
import json
import time
from duckduckgo_search import DDGS

products = [
    { "name": "Phantom Oversized Tee", "slug": "phantom-oversized-tee" },
    { "name": "Ghost Drop Tee", "slug": "ghost-drop-tee" },
    { "name": "Midnight Crop Top", "slug": "midnight-crop-top" },
    { "name": "Raw Edge Tank", "slug": "raw-edge-tank" },
    { "name": "Stealth Hoodie", "slug": "stealth-hoodie" },
    { "name": "Cloud Nine Pullover", "slug": "cloud-nine-pullover" },
    { "name": "Neon Zip Hoodie", "slug": "neon-zip-hoodie" },
    { "name": "Crew Neck Sweatshirt", "slug": "crew-neck-sweatshirt" },
    { "name": "Urban Cargo Jogger", "slug": "urban-cargo-jogger" },
    { "name": "Tech Fleece Pant", "slug": "tech-fleece-pant" },
    { "name": "Slim Track Pant", "slug": "slim-track-pant" },
    { "name": "Wide Leg Cargo", "slug": "wide-leg-cargo" },
    { "name": "Drift Training Shorts", "slug": "drift-training-shorts" },
    { "name": "Mesh Basketball Short", "slug": "mesh-basketball-short" },
    { "name": "Compression Liner Short", "slug": "compression-liner-short" },
    { "name": "Cargo Utility Short", "slug": "cargo-utility-short" },
    { "name": "Shadow Windbreaker", "slug": "shadow-windbreaker" },
    { "name": "Puffer Vest", "slug": "puffer-vest" },
    { "name": "Coach Jacket", "slug": "coach-jacket" },
    { "name": "Track Jacket", "slug": "track-jacket" },
    { "name": "Snapback Cap", "slug": "snapback-cap" },
    { "name": "Bucket Hat", "slug": "bucket-hat" },
    { "name": "Crossbody Bag", "slug": "crossbody-bag" },
    { "name": "Crew Socks (3-Pack)", "slug": "crew-socks-3-pack" },
    { "name": "Duffle Bag", "slug": "duffle-bag" },
    { "name": "Beanie", "slug": "beanie" },
    { "name": "Performance Gloves", "slug": "performance-gloves" },
    { "name": "Logo Belt", "slug": "logo-belt" },
    { "name": "Oversized Graphic Tee", "slug": "oversized-graphic-tee" },
    { "name": "Ribbed Long Sleeve", "slug": "ribbed-long-sleeve" },
    { "name": "Washed Henley", "slug": "washed-henley" },
    { "name": "Zip Cargo Pant", "slug": "zip-cargo-pant" }
]

output_dir = "public/images/products"
os.makedirs(output_dir, exist_ok=True)

ddgs = DDGS()

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

print(f"Downloading {len(products)} images...")

for i, product in enumerate(products):
    filepath = os.path.join(output_dir, f"{product['slug']}.jpg")
    if os.path.exists(filepath):
        print(f"[{i+1}/{len(products)}] Already exists: {product['name']}")
        continue

    query = f"streetwear {product['name']} clothing aesthetic product shot"
    print(f"[{i+1}/{len(products)}] Searching for: {product['name']}...")
    
    try:
        results = ddgs.images(
            query,
            region="wt-wt",
            safesearch="off",
            size="Medium",
            type_image="photo",
            max_results=3,
        )
        
        success = False
        for r in results:
            url = r.get("image")
            if url:
                try:
                    response = requests.get(url, headers=headers, timeout=10)
                    if response.status_code == 200:
                        with open(filepath, 'wb') as f:
                            f.write(response.content)
                        print(f"  -> Downloaded from {url}")
                        success = True
                        break
                except Exception as e:
                    print(f"  -> Failed to download {url}: {e}")
                    
        if not success:
            print(f"  -> Could not download image for {product['name']}")
            
    except Exception as e:
        print(f"  -> Search failed for {product['name']}: {e}")
        
    time.sleep(1) # Be nice to the API

print("Done!")
