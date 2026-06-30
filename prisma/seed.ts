import { PrismaClient, UserRole, ProductStatus, OrderStatus, PaymentStatus, FulfillmentStatus, PageStatus, DiscountType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Admin User ─────────────────────────────────────────
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@suspended.store" },
    update: {},
    create: {
      email: "admin@suspended.store",
      name: "Store Admin",
      password: adminPassword,
      role: UserRole.OWNER,
      emailVerified: new Date(),
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // ─── Demo Customers ────────────────────────────────────
  const customerPassword = await bcrypt.hash("customer123", 12);
  const customers = [];
  const customerData = [
    { email: "john@example.com", name: "John Doe", referralCode: "JOHN10" },
    { email: "jane@example.com", name: "Jane Smith", referralCode: "JANE10" },
    { email: "mike@example.com", name: "Mike Wilson", referralCode: "MIKE10" },
  ];
  for (const c of customerData) {
    const customer = await prisma.user.upsert({
      where: { email: c.email },
      update: {},
      create: { ...c, password: customerPassword, role: UserRole.CUSTOMER, emailVerified: new Date(), loyaltyPoints: 150 },
    });
    customers.push(customer);
  }
  console.log("✅ Demo customers created");

  // ─── Categories ─────────────────────────────────────────
  const categoryData = [
    { name: "Tees & Tops", slug: "tees-tops", description: "Premium oversized tees and tank tops" },
    { name: "Hoodies & Sweats", slug: "hoodies-sweats", description: "Heavyweight hoodies and sweatshirts" },
    { name: "Joggers & Pants", slug: "joggers-pants", description: "Technical joggers and cargo pants" },
    { name: "Shorts", slug: "shorts", description: "Training and lifestyle shorts" },
    { name: "Outerwear", slug: "outerwear", description: "Jackets, windbreakers, and vests" },
    { name: "Accessories", slug: "accessories", description: "Caps, bags, socks, and more" },
  ];
  const categories: Record<string, { id: string }> = {};
  for (const cat of categoryData) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categories[cat.slug] = category;
  }
  console.log("✅ Categories created");

  // ─── Tags ───────────────────────────────────────────────
  const tagNames = ["summer", "bestseller", "new-arrival", "limited-edition", "sale", "essentials", "premium", "streetwear"];
  const tags: Record<string, { id: string }> = {};
  for (const t of tagNames) {
    const tag = await prisma.tag.upsert({
      where: { slug: t },
      update: {},
      create: { name: t.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()), slug: t },
    });
    tags[t] = tag;
  }
  console.log("✅ Tags created");

  // ─── Products ───────────────────────────────────────────
  const productData = [
    { name: "Phantom Oversized Tee", slug: "phantom-oversized-tee", price: 45, category: "tees-tops", tags: ["bestseller", "essentials"], colors: ["Black", "White", "Charcoal"], sizes: ["S", "M", "L", "XL", "XXL"] },
    { name: "Ghost Drop Tee", slug: "ghost-drop-tee", price: 42, compareAt: 55, category: "tees-tops", tags: ["sale", "summer"], colors: ["Cream", "Sage", "Dusty Rose"], sizes: ["S", "M", "L", "XL"] },
    { name: "Midnight Crop Top", slug: "midnight-crop-top", price: 38, category: "tees-tops", tags: ["new-arrival"], colors: ["Black", "White"], sizes: ["XS", "S", "M", "L"] },
    { name: "Raw Edge Tank", slug: "raw-edge-tank", price: 35, category: "tees-tops", tags: ["summer", "essentials"], colors: ["Black", "Gray", "White"], sizes: ["S", "M", "L", "XL"] },
    { name: "Stealth Hoodie", slug: "stealth-hoodie", price: 110, category: "hoodies-sweats", tags: ["bestseller", "premium"], colors: ["Gray", "Black", "Navy"], sizes: ["S", "M", "L", "XL", "XXL"] },
    { name: "Cloud Nine Pullover", slug: "cloud-nine-pullover", price: 95, category: "hoodies-sweats", tags: ["new-arrival"], colors: ["Oatmeal", "Slate", "Forest"], sizes: ["S", "M", "L", "XL"] },
    { name: "Neon Zip Hoodie", slug: "neon-zip-hoodie", price: 120, compareAt: 150, category: "hoodies-sweats", tags: ["sale", "limited-edition"], colors: ["Neon Green/Black", "Neon Orange/Black"], sizes: ["M", "L", "XL"] },
    { name: "Crew Neck Sweatshirt", slug: "crew-neck-sweatshirt", price: 85, category: "hoodies-sweats", tags: ["essentials"], colors: ["Black", "Gray", "Cream"], sizes: ["S", "M", "L", "XL", "XXL"] },
    { name: "Urban Cargo Jogger", slug: "urban-cargo-jogger", price: 89, compareAt: 120, category: "joggers-pants", tags: ["bestseller", "sale"], colors: ["Olive", "Black", "Khaki"], sizes: ["S", "M", "L", "XL"] },
    { name: "Tech Fleece Pant", slug: "tech-fleece-pant", price: 95, category: "joggers-pants", tags: ["premium"], colors: ["Charcoal", "Black"], sizes: ["S", "M", "L", "XL", "XXL"] },
    { name: "Slim Track Pant", slug: "slim-track-pant", price: 75, category: "joggers-pants", tags: ["essentials"], colors: ["Black", "Navy", "Gray"], sizes: ["S", "M", "L", "XL"] },
    { name: "Wide Leg Cargo", slug: "wide-leg-cargo", price: 98, category: "joggers-pants", tags: ["new-arrival", "streetwear"], colors: ["Washed Black", "Sand"], sizes: ["S", "M", "L", "XL"] },
    { name: "Drift Training Shorts", slug: "drift-training-shorts", price: 55, compareAt: 65, category: "shorts", tags: ["sale", "summer"], colors: ["Black", "Navy", "Gray"], sizes: ["S", "M", "L", "XL"] },
    { name: "Mesh Basketball Short", slug: "mesh-basketball-short", price: 60, category: "shorts", tags: ["summer", "streetwear"], colors: ["Black/White", "Red/Black"], sizes: ["S", "M", "L", "XL"] },
    { name: "Compression Liner Short", slug: "compression-liner-short", price: 48, category: "shorts", tags: ["essentials"], colors: ["Black", "Navy"], sizes: ["S", "M", "L", "XL"] },
    { name: "Cargo Utility Short", slug: "cargo-utility-short", price: 65, category: "shorts", tags: ["new-arrival"], colors: ["Olive", "Khaki", "Black"], sizes: ["S", "M", "L", "XL"] },
    { name: "Shadow Windbreaker", slug: "shadow-windbreaker", price: 135, category: "outerwear", tags: ["premium", "limited-edition"], colors: ["Black", "Reflective Silver"], sizes: ["S", "M", "L", "XL"] },
    { name: "Puffer Vest", slug: "puffer-vest", price: 120, compareAt: 160, category: "outerwear", tags: ["sale"], colors: ["Black", "Olive"], sizes: ["S", "M", "L", "XL"] },
    { name: "Coach Jacket", slug: "coach-jacket", price: 110, category: "outerwear", tags: ["streetwear", "essentials"], colors: ["Black", "Navy"], sizes: ["S", "M", "L", "XL"] },
    { name: "Track Jacket", slug: "track-jacket", price: 105, category: "outerwear", tags: ["new-arrival"], colors: ["Black/White", "Navy/Red"], sizes: ["S", "M", "L", "XL"] },
    { name: "Snapback Cap", slug: "snapback-cap", price: 32, category: "accessories", tags: ["streetwear", "essentials"], colors: ["Black", "White", "Camo"], sizes: ["One Size"] },
    { name: "Bucket Hat", slug: "bucket-hat", price: 35, category: "accessories", tags: ["summer", "new-arrival"], colors: ["Black", "Tan", "Olive"], sizes: ["S/M", "L/XL"] },
    { name: "Crossbody Bag", slug: "crossbody-bag", price: 45, category: "accessories", tags: ["bestseller"], colors: ["Black", "Gray"], sizes: ["One Size"] },
    { name: "Crew Socks (3-Pack)", slug: "crew-socks-3-pack", price: 22, category: "accessories", tags: ["essentials"], colors: ["Black", "White", "Mixed"], sizes: ["S/M", "L/XL"] },
    { name: "Duffle Bag", slug: "duffle-bag", price: 85, category: "accessories", tags: ["premium"], colors: ["Black", "Olive"], sizes: ["One Size"] },
    { name: "Beanie", slug: "beanie", price: 28, category: "accessories", tags: ["essentials"], colors: ["Black", "Gray", "Navy", "Cream"], sizes: ["One Size"] },
    { name: "Performance Gloves", slug: "performance-gloves", price: 38, category: "accessories", tags: ["new-arrival"], colors: ["Black"], sizes: ["S", "M", "L", "XL"] },
    { name: "Logo Belt", slug: "logo-belt", price: 40, category: "accessories", tags: ["streetwear"], colors: ["Black", "Brown"], sizes: ["S/M", "L/XL"] },
    { name: "Oversized Graphic Tee", slug: "oversized-graphic-tee", price: 50, category: "tees-tops", tags: ["limited-edition", "streetwear"], colors: ["Black", "Vintage White"], sizes: ["S", "M", "L", "XL", "XXL"] },
    { name: "Ribbed Long Sleeve", slug: "ribbed-long-sleeve", price: 55, category: "tees-tops", tags: ["new-arrival", "premium"], colors: ["Black", "Cream", "Olive"], sizes: ["S", "M", "L", "XL"] },
    { name: "Washed Henley", slug: "washed-henley", price: 48, category: "tees-tops", tags: ["essentials"], colors: ["Washed Black", "Sand"], sizes: ["S", "M", "L", "XL"] },
    { name: "Zip Cargo Pant", slug: "zip-cargo-pant", price: 105, category: "joggers-pants", tags: ["premium", "streetwear"], colors: ["Black", "Charcoal"], sizes: ["S", "M", "L", "XL"] },
  ];

  for (const p of productData) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        description: `Premium quality ${p.name.toLowerCase()} from the SUSPENDED collection. Crafted with attention to detail and built to last.`,
        status: ProductStatus.ACTIVE,
        price: p.price,
        compareAtPrice: p.compareAt || null,
        costPerItem: Math.round(p.price * 0.35),
        categoryId: categories[p.category].id,
        isFeatured: p.tags.includes("bestseller") || p.tags.includes("new-arrival"),
        trackInventory: true,
        quantity: 100,
        tags: { connect: p.tags.map(t => ({ id: tags[t].id })) },
        images: {
          create: [{ url: `/images/products/${p.slug}.jpg`, alt: p.name, isPrimary: true, sortOrder: 0 }],
        },
        variants: {
          create: p.colors.flatMap((color, ci) =>
            p.sizes.map((size, si) => ({
              name: `${size} / ${color}`,
              sku: `${p.slug.split("-").map(w => w[0]).join("").toUpperCase()}-${color.replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase()}-${size.replace("/", "")}`,
              price: p.price,
              compareAtPrice: p.compareAt || null,
              quantity: Math.floor(Math.random() * 20) + 5,
              options: { Size: size, Color: color },
              sortOrder: ci * p.sizes.length + si,
            }))
          ),
        },
      },
    });
  }
  console.log(`✅ ${productData.length} products with variants created`);

  // ─── Collections ────────────────────────────────────────
  const collectionData = [
    { name: "New Arrivals", slug: "new-arrivals", description: "Fresh drops, just landed.", isSmartCollection: true },
    { name: "Bestsellers", slug: "bestsellers", description: "Community favorites.", isSmartCollection: true },
    { name: "Summer Drop", slug: "summer-drop", description: "Lightweight essentials for the heat." },
    { name: "Sale", slug: "sale", description: "Deals you don't want to miss.", isSmartCollection: true },
  ];
  for (const col of collectionData) {
    await prisma.collection.upsert({ where: { slug: col.slug }, update: {}, create: col });
  }
  console.log("✅ Collections created");

  // ─── Discounts ──────────────────────────────────────────
  const discountData = [
    { code: "STREET25", type: DiscountType.PERCENTAGE, value: 25, description: "25% off first order" },
    { code: "SAVE10", type: DiscountType.FIXED_AMOUNT, value: 10, description: "$10 off orders over $50", minimumPurchaseAmount: 50 },
    { code: "FREESHIP", type: DiscountType.FREE_SHIPPING, value: 0, description: "Free shipping on any order" },
    { code: "SUMMER20", type: DiscountType.PERCENTAGE, value: 20, description: "20% off summer collection" },
    { code: "BOGOTEE", type: DiscountType.BUY_X_GET_Y, value: 50, description: "Buy 2 tees, get 50% off second" },
  ];
  for (const d of discountData) {
    await prisma.discount.upsert({ where: { code: d.code }, update: {}, create: { ...d, isActive: true, maxUsageCount: 100 } });
  }
  console.log("✅ Discount codes created");

  // ─── Demo Orders ────────────────────────────────────────
  const statuses: { status: OrderStatus; payment: PaymentStatus; fulfillment: FulfillmentStatus }[] = [
    { status: OrderStatus.DELIVERED, payment: PaymentStatus.PAID, fulfillment: FulfillmentStatus.DELIVERED },
    { status: OrderStatus.SHIPPED, payment: PaymentStatus.PAID, fulfillment: FulfillmentStatus.SHIPPED },
    { status: OrderStatus.PROCESSING, payment: PaymentStatus.PAID, fulfillment: FulfillmentStatus.UNFULFILLED },
    { status: OrderStatus.PAID, payment: PaymentStatus.PAID, fulfillment: FulfillmentStatus.UNFULFILLED },
    { status: OrderStatus.PENDING, payment: PaymentStatus.PENDING, fulfillment: FulfillmentStatus.UNFULFILLED },
  ];
  for (let i = 0; i < 5; i++) {
    const s = statuses[i];
    const subtotal = Math.floor(Math.random() * 200) + 50;
    await prisma.order.create({
      data: {
        orderNumber: `ORD-2025-${String(i + 1).padStart(4, "0")}`,
        userId: customers[i % customers.length].id,
        email: customers[i % customers.length].email!,
        status: s.status,
        paymentStatus: s.payment,
        fulfillmentStatus: s.fulfillment,
        subtotal,
        totalAmount: subtotal,
        currency: "USD",
        items: {
          create: [{ productId: (await prisma.product.findFirst())!.id, productName: "Demo Product", price: subtotal, quantity: 1, totalPrice: subtotal }],
        },
      },
    });
  }
  console.log("✅ Demo orders created");

  // ─── CMS Pages ──────────────────────────────────────────
  const pages = [
    { title: "About Us", slug: "about", content: "SUSPENDED is a premium streetwear brand built for those who move differently." },
    { title: "FAQ", slug: "faq", content: "Frequently asked questions about our products, shipping, and returns." },
    { title: "Shipping Policy", slug: "shipping", content: "We offer free standard shipping on all orders over $100." },
    { title: "Returns Policy", slug: "returns", content: "We accept returns within 30 days of purchase." },
    { title: "Privacy Policy", slug: "privacy", content: "Your privacy is important to us." },
    { title: "Terms of Service", slug: "terms", content: "By using our site, you agree to these terms." },
    { title: "Size Guide", slug: "size-guide", content: "Find your perfect fit with our comprehensive size guide." },
    { title: "Contact", slug: "contact", content: "Get in touch with us." },
  ];
  for (const page of pages) {
    await prisma.page.upsert({ where: { slug: page.slug }, update: {}, create: { ...page, status: PageStatus.PUBLISHED, publishedAt: new Date() } });
  }
  console.log("✅ CMS pages created");

  // ─── Banners ────────────────────────────────────────────
  await prisma.banner.createMany({
    data: [
      { title: "Summer Drop 2025", subtitle: "Lightweight essentials for the heat", buttonText: "Shop Now", link: "/collections/summer-drop", position: "hero", isActive: true },
      { title: "Free Shipping Over $100", subtitle: "No code needed", position: "promo_strip", isActive: true },
    ],
    skipDuplicates: true,
  });
  console.log("✅ Banners created");

  // ─── Shipping Zones ─────────────────────────────────────
  const usZone = await prisma.shippingZone.create({ data: { name: "United States", countries: ["US"] } });
  await prisma.shippingRate.createMany({
    data: [
      { shippingZoneId: usZone.id, name: "Standard Shipping", price: 7.99, freeAbove: 100, estimatedDays: "5-7 business days" },
      { shippingZoneId: usZone.id, name: "Express Shipping", price: 14.99, estimatedDays: "2-3 business days" },
    ],
  });
  console.log("✅ Shipping zones created");

  // ─── Store Settings ─────────────────────────────────────
  const settings = [
    { key: "store_name", value: "SUSPENDED" },
    { key: "store_currency", value: "USD" },
    { key: "store_email", value: "hello@suspended.store" },
    { key: "cod_enabled", value: true },
    { key: "gift_wrap_price", value: 5.00 },
    { key: "loyalty_points_per_dollar", value: 1 },
    { key: "loyalty_points_value", value: 0.01 },
  ];
  for (const s of settings) {
    await prisma.storeSetting.upsert({ where: { key: s.key }, update: {}, create: { key: s.key, value: s.value as unknown as object } });
  }
  console.log("✅ Store settings created");

  console.log("\n🎉 Seed completed successfully!");
  console.log("📧 Admin login: admin@suspended.store / admin123");
  console.log("📧 Customer login: john@example.com / customer123");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
