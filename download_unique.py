import requests
import json
import os

products = [
    "phantom-oversized-tee", "ghost-drop-tee", "midnight-crop-top", "raw-edge-tank",
    "stealth-hoodie", "cloud-nine-pullover", "neon-zip-hoodie", "crew-neck-sweatshirt",
    "urban-cargo-jogger", "tech-fleece-pant", "slim-track-pant", "wide-leg-cargo",
    "drift-training-shorts", "mesh-basketball-short", "compression-liner-short", "cargo-utility-short",
    "shadow-windbreaker", "puffer-vest", "coach-jacket", "track-jacket",
    "snapback-cap", "bucket-hat", "crossbody-bag", "crew-socks-3-pack",
    "duffle-bag", "beanie", "performance-gloves", "logo-belt",
    "oversized-graphic-tee", "ribbed-long-sleeve", "washed-henley", "zip-cargo-pant"
]

urls = [
    "https://i.imgur.com/QkIa5tT.jpeg", "https://i.imgur.com/jb5Yu0h.jpeg", "https://i.imgur.com/UlxxXyG.jpeg",
    "https://i.imgur.com/1twoaDy.jpeg", "https://i.imgur.com/FDwQgLy.jpeg", "https://i.imgur.com/kg1ZhhH.jpeg",
    "https://i.imgur.com/cHddUCu.jpeg", "https://i.imgur.com/CFOjAgK.jpeg", "https://i.imgur.com/wbIMMme.jpeg",
    "https://i.imgur.com/R2PN9Wq.jpeg", "https://i.imgur.com/IvxMPFr.jpeg", "https://i.imgur.com/7eW9nXP.jpeg",
    "https://i.imgur.com/cSytoSD.jpeg", "https://i.imgur.com/WwKucXb.jpeg", "https://i.imgur.com/cE2Dxh9.jpeg",
    "https://i.imgur.com/ZKGofuB.jpeg", "https://i.imgur.com/GJi73H0.jpeg", "https://i.imgur.com/633Fqrz.jpeg",
    "https://i.imgur.com/mp3rUty.jpeg", "https://i.imgur.com/JQRGIc2.jpeg", "https://i.imgur.com/9LFjwpI.jpeg",
    "https://i.imgur.com/vzrTgUR.jpeg", "https://i.imgur.com/p5NdI6n.jpeg", "https://i.imgur.com/R3iobJA.jpeg",
    "https://i.imgur.com/Wv2KTsf.jpeg", "https://i.imgur.com/76HAxcA.jpeg", "https://i.imgur.com/wXuQ7bm.jpeg",
    "https://i.imgur.com/BZrIEmb.jpeg", "https://i.imgur.com/KcT6BE0.jpeg", "https://i.imgur.com/cBuLvBi.jpeg",
    "https://i.imgur.com/N1GkCIR.jpeg", "https://i.imgur.com/kKc9A5p.jpeg"
]

output_dir = "public/images/products"
os.makedirs(output_dir, exist_ok=True)

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Referer": "https://imgur.com/"
}

print(f"Downloading {len(products)} images...")

for i, product in enumerate(products):
    url = urls[i]
    dest = os.path.join(output_dir, f"{product}.jpg")
    print(f"Downloading {product}...")
    try:
        img_res = requests.get(url, headers=headers, timeout=10)
        if img_res.status_code == 200:
            with open(dest, 'wb') as f:
                f.write(img_res.content)
            print(f"  Saved {len(img_res.content)} bytes.")
        else:
            print(f"  Failed status: {img_res.status_code}")
    except Exception as e:
        print(f"Failed to download {product}: {e}")
        
print("Done downloading unique images!")
