export const company = {
  name: "Antlar",
  fullName: "Antlar Elite Services",
  tagline: "Cleaner Spaces | Healthier Lives | A Greener Tomorrow",
  intro:
    "We provide professional cleaning services at homes, offices, warehouses and hospitals.",
  phone: "0795 086 333",
  phoneHref: "tel:+254795086333",
  whatsappHref: "https://wa.me/254795086333",
  email: "antlareliteservices@gmail.com",
  address: "P.O. Box 10, Nairobi, Kenya",
  social: {
    facebook: "https://facebook.com/antlareliteservices",
    instagram: "https://instagram.com/antlareliteservices",
    twitter: "https://twitter.com/antlarelite",
    linkedin: "https://linkedin.com/company/antlareliteservices",
  },
};

// Central place to manage every real photo used on the site.
// Drop your photos into /public named exactly as below (1.jpg ... 11.jpg),
// or change these paths to whatever filenames you used.
export const images = {
  homeHero: "/1.jpg",
  homeAbout: "/2.jpg",
  homeService: "/3.jpg",
  // Used for the About page's story section AND the repeating
  // "Join Hundreds of Happy Clients" banner on About/Services/Portfolio/Blog/Contact.
  aboutAndCta: "/4.jpg",
  portfolio: ["/5.jpg", "/6.jpg", "/7.jpg", "/8.jpg", "/9.jpg", "/10.jpg"],
  contactHero: "/11.jpg",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  {
    slug: "residential-cleaning",
    number: "01",
    title: "Residential Cleaning",
    short: "Regular and one-off home cleaning that keeps every room fresh.",
    description:
      "From single rooms to full households, our vetted cleaners handle dusting, mopping, kitchens and bathrooms so you come home to a spotless space every time.",
    bullets: ["Weekly, bi-weekly or monthly visits", "Kitchen & bathroom sanitising", "Dusting, mopping & vacuuming"],
  },
  {
    slug: "commercial-office-cleaning",
    number: "02",
    title: "Commercial & Office Cleaning",
    short: "Create a healthier, more productive workplace.",
    description:
      "We provide professional cleaning services at homes, offices, warehouses and hospitals — ensuring every workplace stays presentable, hygienic and safe for staff, patients and clients.",
    bullets: ["Daily, weekly or after-hours cleaning", "Reception, workstation & washroom care", "Waste management & sanitising"],
  },
  {
    slug: "deep-cleaning",
    number: "03",
    title: "Deep Cleaning",
    short: "A thorough, top-to-bottom reset for homes and offices.",
    description:
      "Deep cleaning tackles the spots regular cleaning misses — grout, appliances, baseboards and skirting — leaving your space genuinely spotless.",
    bullets: ["Kitchen appliance deep clean", "Bathroom scrubbing & disinfecting", "Baseboards, sills & hidden corners"],
  },
  {
    slug: "move-in-move-out-cleaning",
    number: "04",
    title: "Move-In / Move-Out Cleaning",
    short: "Hand over or receive a home that is truly move-in ready.",
    description:
      "Moving is stressful enough. We deep clean the entire unit so tenants get their deposit back and new homeowners start on a spotless slate.",
    bullets: ["Full unit clean, top to bottom", "Cupboards, wardrobes & drawers", "Ready for handover or move-in"],
  },
  {
    slug: "window-glass-cleaning",
    number: "05",
    title: "Window & Glass Cleaning",
    short: "Streak-free windows, glass doors and partitions.",
    description:
      "Our team cleans interior and exterior glass safely, including office partitions and storefronts, leaving a clear, streak-free shine.",
    bullets: ["Interior & exterior glass", "Office partitions & storefronts", "Streak-free finish"],
  },
  {
    slug: "post-construction-cleaning",
    number: "06",
    title: "Post-Construction Cleaning",
    short: "Dust and debris removal after renovation or building work.",
    description:
      "After the builders leave, we clear dust, paint splatter and debris so your new or renovated space is ready to use immediately.",
    bullets: ["Dust & debris removal", "Paint splatter clean-up", "Final polish before handover"],
  },
  {
    slug: "fumigation",
    number: "07",
    title: "Fumigation Services",
    short: "Pest and insect control for homes, offices and warehouses.",
    description:
      "Our trained team safely fumigates against pests and insects using approved chemicals, protecting your family, staff or stock with minimal disruption.",
    bullets: ["Safe, approved chemicals", "Homes, offices & warehouses", "Pre- and post-treatment advice"],
  },
  {
    slug: "janitorial-bin-provision",
    number: "08",
    title: "Janitorial Bin Provision & Emptying",
    short: "Bin supply and scheduled emptying for busy premises.",
    description:
      "We supply, place and regularly empty sanitary and waste bins across offices, washrooms and common areas, keeping your premises hygienic year-round.",
    bullets: ["Bin supply & placement", "Scheduled emptying & liners", "Washroom & common-area coverage"],
  },
  {
    slug: "landscaping",
    number: "09",
    title: "Landscaping & Grounds Maintenance",
    short: "Keep compounds, gardens and grounds neat and presentable.",
    description:
      "From lawn mowing to hedge trimming and general grounds tidy-up, we help homes, offices and institutions maintain an inviting outdoor look.",
    bullets: ["Lawn mowing & hedge trimming", "General compound tidy-up", "Homes, offices & institutions"],
  },
  {
    slug: "seats-upholstery-cleaning",
    number: "10",
    title: "Seats & Upholstery Cleaning",
    short: "Deep cleaning for sofas, chairs and office seats.",
    description:
      "We shampoo and steam-clean fabric and leather seats, sofas and office chairs, lifting stains, dust and odours to leave them fresh and hygienic.",
    bullets: ["Sofas, chairs & office seats", "Fabric & leather care", "Stain & odour removal"],
  },
  {
    slug: "mattress-cleaning",
    number: "11",
    title: "Mattress Cleaning",
    short: "Deep sanitising for a healthier night's sleep.",
    description:
      "Our team deep-cleans mattresses to remove dust, allergens, stains and odours, using safe methods that leave them fresh, dry and ready to use.",
    bullets: ["Deep sanitising & stain removal", "Allergen & dust mite treatment", "Safe for homes & hotels"],
  },
];

export const pricingPlans = [
  {
    name: "Bronze Plan",
    tier: "bronze",
    description: "Perfect for a quick refresh of your home.",
    features: [
      "Dusting & vacuuming all rooms",
      "Kitchen & bathroom wipe-down",
      "Trash removal",
      "Light mopping",
      "Up to 2 hours of service",
    ],
    highlighted: false,
  },
  {
    name: "Silver Plan",
    tier: "silver",
    description: "Ideal for a deeper, more thorough clean.",
    features: [
      "Includes all Bronze Plan services",
      "Deep cleaning of kitchen appliances",
      "Bathroom scrubbing & disinfecting",
      "Baseboards and window sills",
      "Up to 3 hours of service",
    ],
    highlighted: true,
  },
  {
    name: "Gold Plan",
    tier: "gold",
    description: "Comprehensive, spotless, top-to-bottom cleaning.",
    features: [
      "Includes all Silver Plan services",
      "Carpet & upholstery vacuuming",
      "Inside window cleaning",
      "Closet organising & light tidying",
      "Up to 4 hours of service",
    ],
    highlighted: false,
  },
];

export const testimonials = [
  {
    quote:
      "I couldn't be happier with the service! My apartment has never looked so clean, and the team was professional and punctual. Highly recommend!",
    name: "Achieng Otieno",
    role: "Homeowner, Kiambu",
  },
  {
    quote:
      "They did an amazing job with our office cleaning. The staff are thorough, reliable and detail-oriented. Our workspace feels brand new every week.",
    name: "Brian Kiptoo",
    role: "Office Manager, Nakuru",
  },
  {
    quote:
      "We booked a deep clean before hosting a family event, and it was perfect. Every corner was spotless, and the team was friendly and efficient.",
    name: "Wanjiru Mwangi",
    role: "Homeowner, Nyeri",
  },
  {
    quote:
      "Fantastic service! The cleaners were careful, respectful, and left everything sparkling. We'll definitely be scheduling regular visits.",
    name: "Kevin Otieno",
    role: "Apartment Resident, Eldoret",
  },
  {
    quote:
      "Moving out was stressful, but this team made it easy. The move-out cleaning was thorough, and we got our deposit back without any issues.",
    name: "Faith Njeri",
    role: "Renter, Kisumu",
  },
  {
    quote:
      "Reliable, professional and always on time. I love that they use safe products around my kids while still leaving the house sparkling clean.",
    name: "Grace Wambui",
    role: "Mother & Homeowner, Meru",
  },
];

export const areasServed = [
  { name: "Nairobi", description: "Homes, offices and institutions across Nairobi County." },
  { name: "Kiambu", description: "Homes, offices and institutions across Kiambu County." },
  { name: "Embu", description: "Homes and business premises across Embu town." },
  { name: "Nyeri", description: "Family homes and offices across Nyeri town." },
  { name: "Nanyuki", description: "Homes, lodges and offices around Nanyuki." },
  { name: "Nakuru", description: "Residential and commercial cleaning across Nakuru town." },
  { name: "Kisumu", description: "Homes and offices across Kisumu city." },
  { name: "Eldoret", description: "Residential and commercial cleaning across Eldoret town." },
];

export const blogPosts = [
  {
    slug: "deep-cleaning-kitchen-guide",
    date: "Oct 11, 2025",
    author: "Patricia Wanjiku",
    title: "The Ultimate Guide to Deep Cleaning Your Kitchen",
    excerpt:
      "Grease, grime and forgotten corners — here's how our team tackles a full kitchen deep clean, room by room.",
  },
  {
    slug: "eco-friendly-cleaning-family",
    date: "Oct 5, 2025",
    author: "Brian Odhiambo",
    title: "Eco-Friendly Cleaning: Safe for Your Home and Family",
    excerpt:
      "Why we choose plant-based, non-toxic products for every job — and how it protects your kids, pets and the environment.",
  },
  {
    slug: "seasonal-cleaning-checklist",
    date: "Oct 7, 2025",
    author: "Jerameel Kimani",
    title: "Seasonal Cleaning Checklist for a Healthier Home",
    excerpt:
      "A simple, room-by-room checklist to keep your home healthy and organised throughout the year.",
  },
];

export const portfolioItems = [
  { title: "3-Bedroom Apartment Deep Clean", category: "Residential Cleaning", location: "Kiambu" },
  { title: "Corporate Office Fit-Out Clean", category: "Commercial Cleaning", location: "Nakuru" },
  { title: "Move-Out Clean for Rental Handover", category: "Move-In / Move-Out", location: "Kisumu" },
  { title: "Storefront Glass & Window Detailing", category: "Window & Glass Cleaning", location: "Eldoret" },
  { title: "Post-Renovation Villa Clean-Up", category: "Post-Construction", location: "Nyeri" },
  { title: "Hospital Ward Sanitation Contract", category: "Commercial Cleaning", location: "Meru" },
];

export const stats = [
  { label: "Happy Families Served", value: "500+" },
  { label: "Customer Satisfaction", value: "99%" },
  { label: "Homes & Offices Cleaned", value: "1,000+" },
  { label: "Satisfaction Guarantee", value: "100%" },
];
