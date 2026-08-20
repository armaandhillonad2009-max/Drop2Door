export const SITE = {
  name: "Drop2Door Water Delivery Services",
  short: "Drop2Door",
  tagline: "Pure Water. Delivered to Your Door.",
  since: "January 2026",
  phoneDisplay: "(647) 375-3572",
  phoneHref: "tel:+16473753572",
  whatsapp: "https://wa.me/16473753572",
  email: "drop2doorwater@gmail.com",
  instagram: "https://www.instagram.com/drop2door_water_delivery/",
  tiktok: "https://www.tiktok.com/@drop2door",
  googleProfile: "https://share.google/1D8J9XGPycYiCzVYl",
  areaShort: "Greater Toronto Area and surrounding GTA communities",
};

export const waChat = (message) =>
  `${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

export const WA_MESSAGES = {
  general: "Hi Drop2Door, I'd like to get a quote for a water delivery.",
  business: "Hi Drop2Door, I'd like information about business water delivery.",
  event: "Hi Drop2Door, I'd like to request a quote for a bulk/event water delivery.",
  areaOk: "Hi Drop2Door, I confirmed my area on your website and I'd like to place an order.",
  areaOut: "Hi Drop2Door, my area may be outside your regular service area. Can you help with a delivery?",
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Water", to: "/water" },
  { label: "Delivery Areas", to: "/delivery-areas" },
  { label: "Events & Bulk", to: "/events-bulk" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Contact & FAQ", to: "/contact" },
];

export const PRODUCTS = [
  {
    name: "Kirkland Signature",
    type: "Natural Spring Water",
    note: "A GTA favourite. Crisp spring water in case packs, ready for homes, offices and events.",
    tag: "Case packs",
    image: "/images/product-kirkland.webp",
    alt: "Kirkland Signature natural spring water 40-pack case",
  },
  {
    name: "Eska",
    type: "Natural Spring Water",
    note: "Quebec spring water with a clean finish. Available in 35-pack cases only.",
    tag: "35-pack cases only",
    image: "/images/product-eska.webp",
    alt: "Eska natural spring water 35-pack case",
  },
  {
    name: "Compliments",
    type: "Spring, Distilled & Sparkling",
    note: "Flexible options depending on availability. Ask us what is in stock this week.",
    tag: "Ask availability",
    image: "/images/product-compliments.webp",
    alt: "Compliments natural spring water case pack",
  },
];

export const WATER_TYPES = [
  {
    name: "Spring Water",
    desc: "Naturally sourced and refreshing. Our most requested option for everyday drinking.",
  },
  {
    name: "Distilled Water",
    desc: "Purified by distillation. Popular for appliances, equipment and specialty uses.",
  },
  {
    name: "Sparkling Water",
    desc: "Crisp carbonation for restaurants, events and anyone who likes a little sparkle.",
  },
];

export const ORDER_RULES = [
  { k: "Minimum order", v: "10 packs / cases per delivery" },
  { k: "Eska", v: "Available in 35-pack cases only" },
  { k: "Pricing", v: "Quote-based, varies by location and order size" },
  { k: "Delivery", v: "Open 24 hours, scheduled around you" },
];

export const REVIEWS = [
  {
    name: "Suhail Singh",
    text: "Amazing people and on time deliveries every time. I recommend everyone to get water from them!!!",
    stars: 5,
  },
  {
    name: "Gursewak Singh",
    text: "Absolutely fantastic service! They are always punctual, courteous, and very professional. The delivery process is seamless, and the staff goes above and beyond to make sure we never run out of fresh, clean water. Truly a 5-star experience every single time!",
    stars: 5,
  },
  {
    name: "Jasmeet Kaur",
    text: "I'm really happy with this delivery service. They provide proper door-step delivery, and the delivery person who dropped the water was very helpful and polite. I have a small baby, and he really helped me a lot by carrying the bottles inside and placing them where I needed, it made my day much easier. The service saves a lot of time compared to going and buying water myself, and the charges are also very good and reasonable. Highly recommended for families, especially those with small kids or elderly people at home. Will definitely continue using this service.",
    stars: 5,
  },
  {
    name: "Kushal Sharma",
    text: "Excellent service and more convenient.",
    stars: 5,
  },
  {
    name: "Harvardaan Sran",
    text: "Excellent water delivery service! The ordering process was easy, the delivery was prompt, and the driver was friendly and professional. The water arrived in perfect condition, and the convenience of having it delivered right to my door has been wonderful. I highly recommend this service to anyone looking for reliable, high-quality water delivery.",
    stars: 5,
  },
  {
    name: "Ajay Johal",
    text: "Great service great people",
    stars: 5,
  },
  {
    name: "Armaan",
    text: "Great service from start to finish. Delivery was on time, the water was exactly what I ordered, and the whole process was really easy. They also offer great prices and have friendly customer service. Will definitely be ordering again.",
    stars: 5,
  },
  {
    name: "Sartaj Sidhu",
    text: "Great service",
    stars: 5,
  },
];

export const CITIES = [
  "Brampton",
  "Mississauga",
  "Toronto",
  "Caledon",
  "Malton",
  "Milton",
  "Etobicoke",
  "Scarborough",
  "North York",
  "Vaughan",
  "Woodbridge",
  "Maple",
  "Thornhill",
  "Richmond Hill",
  "Markham",
  "Newmarket",
  "Aurora",
  "King City",
  "Bolton",
  "Oakville",
  "Burlington",
  "Halton Hills",
  "Georgetown",
  "Pickering",
  "Ajax",
  "Whitby",
  "Oshawa",
  "Peel Region",
];

// Forward sortation areas (the first three characters of a postal code) inside our
// regular delivery rotation, mapped to the community each one covers. Every Toronto
// code starts with "M" and is matched by rule, so only the surrounding "L" codes are
// listed here. Add a code here to extend coverage; see checkArea in AreaChecker.jsx.
export const SERVICE_FSAS = {
  // Brampton
  L6P: "Brampton", L6R: "Brampton", L6S: "Brampton", L6T: "Brampton", L6V: "Brampton",
  L6W: "Brampton", L6X: "Brampton", L6Y: "Brampton", L6Z: "Brampton", L7A: "Brampton",
  // Mississauga (L4T is Malton)
  L4T: "Malton", L4V: "Mississauga", L4W: "Mississauga", L4X: "Mississauga",
  L4Y: "Mississauga", L4Z: "Mississauga", L5A: "Mississauga", L5B: "Mississauga",
  L5C: "Mississauga", L5E: "Mississauga", L5G: "Mississauga", L5H: "Mississauga",
  L5J: "Mississauga", L5K: "Mississauga", L5L: "Mississauga", L5M: "Mississauga",
  L5N: "Mississauga", L5P: "Mississauga", L5R: "Mississauga", L5S: "Mississauga",
  L5T: "Mississauga", L5V: "Mississauga", L5W: "Mississauga",
  // Caledon and Bolton
  L7C: "Caledon", L7K: "Caledon", L0N: "Caledon", L0P: "Caledon", L7E: "Bolton",
  // Milton
  L9E: "Milton", L9T: "Milton",
  // Vaughan, Woodbridge, Maple, Thornhill
  L4H: "Woodbridge", L4L: "Woodbridge", L4K: "Vaughan", L4J: "Thornhill",
  L3T: "Thornhill", L6A: "Maple",
  // Richmond Hill
  L4B: "Richmond Hill", L4C: "Richmond Hill", L4E: "Richmond Hill", L4S: "Richmond Hill",
  // Markham
  L3P: "Markham", L3R: "Markham", L3S: "Markham", L6B: "Markham", L6C: "Markham",
  L6E: "Markham", L6G: "Markham",
  // Newmarket, Aurora, King City
  L3X: "Newmarket", L3Y: "Newmarket", L4G: "Aurora", L7B: "King City",
  // Oakville, Burlington, Halton Hills
  L6H: "Oakville", L6J: "Oakville", L6K: "Oakville", L6L: "Oakville", L6M: "Oakville",
  L7L: "Burlington", L7M: "Burlington", L7N: "Burlington", L7P: "Burlington",
  L7R: "Burlington", L7S: "Burlington", L7T: "Burlington",
  L7G: "Georgetown", L7J: "Halton Hills",
  // Durham
  L1V: "Pickering", L1W: "Pickering", L1X: "Pickering", L1Y: "Pickering",
  L1S: "Ajax", L1T: "Ajax", L1Z: "Ajax",
  L1M: "Whitby", L1N: "Whitby", L1P: "Whitby", L1R: "Whitby",
  L1G: "Oshawa", L1H: "Oshawa", L1J: "Oshawa", L1K: "Oshawa", L1L: "Oshawa",
};

// Shown as the accordion on the Contact & FAQ page. Edit questions and answers here.
export const FAQS = [
  {
    q: "Is there a minimum order?",
    a: "Yes. The minimum delivery order is 10 packs or cases. Eska is available in 35-pack cases only. There is no maximum, and we regularly handle full loads for events, restaurants and offices.",
  },
  {
    q: "How much does delivery cost?",
    a: "Pricing is quote-based and depends on your location and order size, and it is very reasonably priced. Send us your address and what you need, and we will confirm the exact price before anything is scheduled.",
  },
  {
    q: "What is the fastest way to order?",
    a: "WhatsApp. One message with your address and what you need is all it takes, and we answer around the clock. You can also send a request form on this site and we will contact you.",
  },
  {
    q: "How does scheduling work?",
    a: "We are open 24 hours for delivery. You pick the day and the time window, we confirm it, and we show up. Deliveries are always scheduled in advance since we do not run a public storefront.",
  },
  {
    q: "Do I have to sign up for a subscription?",
    a: "No. There are no subscriptions and no lock-in. Order when you need water, as often or as rarely as you like.",
  },
  {
    q: "Can I cancel a delivery?",
    a: "Yes, with at least 24 hours notice before your confirmed delivery time, by WhatsApp, phone or email. We do not accept returns or offer refunds on water that has already been delivered, but if something is wrong with your order, contact us and we will review it.",
  },
];

export const MANIFESTO = [
  {
    n: "01",
    title: "Real brands, zero hassle",
    body: "Kirkland, Eska and Compliments. Spring, distilled and sparkling. The water you already trust, stocked and handled with care.",
    image: "/images/water5.webp",
    alt: "Drop2Door stock of Eska and Kirkland water cases",
  },
  {
    n: "02",
    title: "Scheduled around you",
    body: "We are open 24 hours for delivery. You pick the day and the window, we show up. No subscriptions, no lock-in, just water when you need it.",
    image: "/images/water7.webp",
    alt: "Drop2Door delivery stacked outside a customer door",
  },
  {
    n: "03",
    title: "Built for big orders",
    body: "From ten cases for the house to full loads for weddings, restaurants and offices. Our staff and vehicles handle volume so you never lift a case.",
    image: "/images/vehicle.webp",
    alt: "Drop2Door delivery vehicle loaded with Kirkland water cases",
  },
  {
    n: "04",
    title: "Across the GTA",
    body: "Brampton, Mississauga, Toronto, Caledon, Milton and the wider GTA. Not sure if we reach you? Ask us on WhatsApp and we will figure it out.",
    image: "/images/manifesto-gta.webp",
    alt: "Drop2Door water cases stacked for a GTA delivery",
  },
];

export const EVENT_TYPES = [
  "Wedding",
  "Private Party",
  "Corporate Event",
  "Community Event",
  "Restaurant",
  "Hotel",
  "Office",
  "Business / Organization",
  "Other Large Gathering",
];

export const GALLERY = [
  {
    src: "/images/vehicle.webp",
    alt: "Drop2Door delivery vehicle loaded with cases of Kirkland water",
    cap: "Loaded and route-ready",
    cls: "row-span-2 h-full min-h-[420px] lg:col-start-1 lg:row-start-1",
  },
  {
    src: "/images/delivery-stack.webp",
    alt: "Stacked Kirkland and Eska water cases from a Drop2Door delivery",
    cap: "Stacked and staged for handoff",
    cls: "h-72 sm:h-80 lg:col-start-2 lg:row-start-1",
  },
  {
    src: "/images/van-interior.webp",
    alt: "Full skid of bottled water cases staged curbside for a bulk Drop2Door delivery",
    cap: "Bulk drops, curbside and on time",
    cls: "sm:col-span-2 h-72 sm:h-80 lg:col-start-1 lg:col-span-2 lg:row-start-3",
  },
  {
    src: "/images/sidewalk.webp",
    alt: "Drop2Door vehicle interior with water cases stacked under a delivery dolly",
    cap: "Every load strapped and organized",
    cls: "sm:col-span-2 h-72 sm:h-80 lg:col-start-3 lg:col-span-2 lg:row-start-1",
  },
  {
    src: "/images/water7.webp",
    alt: "Cases of water delivered to a customer door with a dolly",
    cap: "Doorstep delivery, no heavy lifting",
    cls: "sm:col-span-2 h-72 sm:h-80 lg:col-start-2 lg:col-span-2 lg:row-start-2",
  },
  {
    src: "/images/water5.webp",
    alt: "Drop2Door warehouse stock of Eska and Kirkland cases",
    cap: "Stocked deep for big orders",
    cls: "sm:col-span-2 h-72 sm:h-80 lg:col-start-4 lg:row-start-2",
  },
  {
    src: "/images/brand-card.webp",
    alt: "Drop2Door Water Delivery Services brand card with red phoenix logo",
    cap: "",
    cls: "sm:col-span-2 h-72 sm:h-80 lg:col-start-1 lg:col-span-2 lg:row-start-4",
  },
  {
    type: "video",
    src: "/videos/delivery.mp4",
    poster: "/images/delivery-poster.webp",
    alt: "Real Drop2Door delivery video clip",
    cap: "Real delivery run, on the clock",
    cls: "sm:col-span-2 h-96 lg:col-start-3 lg:col-span-2 lg:row-start-3 lg:row-span-2 lg:h-full",
  },
];

export const PRODUCT_OPTIONS = [
  "Kirkland Signature Spring Water",
  "Eska Natural Spring Water (35-pack case)",
  "Compliments Water",
  "Distilled Water",
  "Sparkling Water",
  "Not sure yet, help me choose",
];

export const TIME_SLOTS = [
  "Morning (8 AM to 12 PM)",
  "Afternoon (12 PM to 4 PM)",
  "Evening (4 PM to 8 PM)",
  "Late night",
  "Flexible",
];

export const FIELD_CLS =
  "w-full rounded-xl border border-cyan-400/15 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20";

export const LABEL_CLS =
  "mb-1.5 block font-mono2 text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-300/70";
