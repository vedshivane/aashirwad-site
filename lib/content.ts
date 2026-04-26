import type { ProductFamily, ProductSlug } from "@/lib/types";

export const contactEmail = "aashirwadwpcsales@gmail.com";

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/products/doors", label: "Doors" },
  { href: "/products/frames", label: "Frames" },
  { href: "/products/boards", label: "Boards" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const homeHero = {
  eyebrow: "Over a decade of experience",
  title: "Built for strength. Built to last.",
  description:
    "At ECOAashirwad WPC, we don't just deliver products; we deliver peace of mind. For over a decade, our entire focus has been on perfecting the balance between elegant design and extreme strength. We make WPC solutions that are built to outlast traditional materials, ensuring a premium experience that stands the test of time.",
  proofPoints: [
    { label: "Vision", value: "To set standards in the unorganised market of WPC" },
    { label: "Core", value: "High-density resin bond" },
    { label: "Protection", value: "Waterproof, termite-proof, fire-retardant" },
  ],
};

export const standardsBlock = {
  eyebrow: "Standards",
  title: "Premium WPC setting a higher quality benchmark in the Indian market.",
  body: "For over a decade, our focus has stayed on dense resin bonding, strong screw holding, and long service life.",
  points: ["Resin-led density", "Strong screw holding", "Long service life"],
};

export const featuresBlock = [
  {
    title: "100% Waterproof & Termite Proof",
    description: "Never rots, swells, or gets eaten by pests.",
  },
  {
    title: "Fire Retardant",
    description: "Naturally self-extinguishing for maximum safety.",
  },
  {
    title: "Weather Resistant",
    description: "Won’t warp, crack, or bend in extreme heat or humidity.",
  },
  {
    title: "Maintenance-Free",
    description: "No seasonal painting, polishing, or varnishing required.",
  },
  {
    title: "Eco-Friendly",
    description: "100% recyclable and Lead-free—we make it safe for your family.",
  },
  {
    title: "Sound & Heat Insulation",
    description: "High-density core blocks noise and maintains room temperature.",
  },
];

export const frameColors = [
  {
    name: "Sandalwood Ivory",
    tone: "Warm honey beige",
    brands: "WPC Moulding, WPC Square",
    description: "Available across the WPC moulding and square profiles.",
    hex: "#d9b48f",
  },
  {
    name: "EcoTeak",
    tone: "Balanced natural teak",
    brands: "WPC Moulding, Solaris Square",
    description: "Available in WPC moulding and Solaris square sections.",
    hex: "#b4733b",
  },
  {
    name: "Coffee Black",
    tone: "Deep roasted brown",
    brands: "WPC Moulding, WPC Square",
    description: "Available across the WPC moulding and square profiles.",
    hex: "#4d2b23",
  },
] as const;

const inquiryCta = {
  title: "Send your category, quantity, city, and size requirement.",
  description:
    "We will match the right door, frame, or board detail for the requirement you share.",
  primaryLabel: "Contact us",
  primaryHref: "/contact",
  secondaryLabel: "Email us",
  secondaryHref: `mailto:${contactEmail}`,
} as const;

export const productFamilies: ProductFamily[] = [
  {
    slug: "doors",
    name: "WPC Doors",
    navLabel: "Doors",
    strap: "WPC doors for strong, low-upkeep interiors.",
    homeSummary:
      "For rooms, offices, and utility openings where strength and lower upkeep matter more than traditional timber materials.",
    summary:
      "Straight WPC doors with dense internal bonding for stable fitting and everyday use.",
    materialPromise: "High-density resin bond for straight, durable door performance.",
    bullets: [
      "Used across bedrooms, bathrooms, offices, and utility openings.",
      "Built to reduce swelling, refinishing, and routine maintenance work.",
    ],
    specs: [
      {
        title: "Door details",
        note: "Thickness availability differs by finish. Standard sizes and finish availability are listed below.",
        items: [
          { label: "Availability", value: "WPC door shutters" },
          { label: "26 mm designs", value: "Ivory, Grey, EcoTeak 501, Teak, Zigzag Wood" },
          { label: "30 mm designs", value: "Ivory, Grey, EcoTeak 501" },
          { label: "Heights", value: "72 in, 75 in, 78 in, 81 in, 84 in, 87 in, 90 in, 93 in, 96 in" },
          { label: "Widths", value: "26 in, 28 in, 30 in, 32 in, 34 in, 36 in, 38 in" },
          { label: "Use", value: "Residential and commercial interior openings" },
        ],
      },
    ],
    colors: [],
    applications: [
      {
        name: "Interior openings",
        description: "Bedrooms, bathrooms, offices, and utility areas where dense, low-upkeep doors are preferred.",
      },
      {
        name: "Residential projects",
        description: "Homes and villas that want a clean WPC look with better long-term stability.",
      },
      {
        name: "Commercial interiors",
        description: "Office and project interiors where repeated use and lower maintenance matter.",
      },
    ],
    cta: { ...inquiryCta },
    media: {
      alt: "WPC door illustration with warm timber finish and upright architectural proportions.",
      caption: "Dense, straight, and built for daily use.",
      kind: "illustration",
    },
    rangeIntro: {
      eyebrow: "Door Ranges",
      title: "Aashirwad doors, designer finishes, and practical options for every interior.",
      body:
        "Our door collection includes the premium Aashirwad range, routed designer patterns, and additional options for projects that need a different finish or budget direction.",
      availabilityNote:
        "Sizes, routed designs, textures, and colours vary by range.",
      featured: {
        label: "Signature range",
        name: "Aashirwad Doors",
        description:
          "Premium WPC door shutters with clean profiles, strong internal bonding, and a refined finish for residential and commercial interiors.",
      },
      supporting: [
        {
          label: "Design range",
          name: "Designer Finishes",
          description:
            "EcoTeak, zigzag, teak, and routed surface designs add more visual character while keeping the durability and low-upkeep advantages of WPC.",
        },
        {
          label: "Additional range",
          name: "Omniwud Doors",
          description:
            "A practical option for projects that need reliable WPC doors in a more value-focused segment.",
          logoSrc: "/images/brands/omniwud.jpeg",
          logoAlt: "Omniwud logo",
        },
      ],
    },
    rangeShowcases: [
      {
        eyebrow: "Flagship Door Range",
        title: "Aashirwad Doors with a high-density core for stronger daily performance.",
        body:
          "Aashirwad doors are positioned as the premium door range, built around a denser internal core for more stable fitting, better holding strength, and a stronger finished feel in residential and commercial interiors.",
        imageSrc: "/images/doors/door-bathroom-waterproof.png",
        imageAlt: "Aashirwad WPC door installed in a premium bathroom interior with visible water resistance cues.",
        imageFit: "cover",
        badge: "Flagship",
        facts: [
          "High-density core. Stronger holding.",
          "Built for daily use.",
          "Premium door range.",
        ],
      },
      {
        eyebrow: "Texture Doors",
        title: "Texture doors using Aashirwad core materials with added surface character.",
        body:
          "The texture door range adds more designer character while retaining the internal strength of Aashirwad core materials, making it suitable for projects that want both durability and a more decorative face finish.",
        imageSrc: "/images/doors/zigzag-wood.png",
        imageAlt: "Textured zigzag WPC door finish.",
        imageFit: "contain",
        facts: [
          "Aashirwad core. Designer finish.",
          "Extra texture. More surface shine.",
          "Decorative look. Low upkeep.",
        ],
      },
    ],
  },
  {
    slug: "frames",
    name: "WPC Frames",
    navLabel: "Frames",
    strap: "WPC frames with strong screw holding.",
    homeSummary:
      "Dense frame sections for stable fitting, cleaner finish quality, and daily use.",
    summary:
      "Frame sections made for strong screw holding, clean fitting, and long-term stability.",
    materialPromise: "High-density frame sections built for hardware holding and long-term stability.",
    bullets: [
      "Designed for hinges, screws, and repeated movement where density matters.",
      "Available across section sizes, mouldings, and three finish options.",
    ],
    specs: [
      {
        title: "Frame sizes",
        note: "Cross-sections below reflect the corrected handwritten product note shared on April 24, 2026.",
        items: [
          { label: "Lengths", value: "6 ft, 6.5 ft, 7 ft, 8 ft, 10 ft" },
          { label: "WPC moulding", value: `Coffee Black: 4" x 2 1/2"; Sandalwood Ivory: 3" x 2", 4" x 2 1/2"; EcoTeak: 3" x 2", 4" x 2 1/2"` },
          { label: "WPC square", value: `Coffee Black: 4" x 2 1/2", 5" x 2 1/2"; Sandalwood Ivory: 4" x 2 1/2", 5" x 2 1/2"` },
          { label: "Solaris square", value: `EcoTeak: 4" x 2 1/2", 5" x 2 1/2"` },
        ],
      },
      {
        title: "Profile details",
        items: [
          { label: "Core range", value: "EcoAashirwad WPC frames with high-density frame construction" },
          { label: "Premium range", value: "EcoAashirwad Solaris, positioned as the Highbond flagship frame line" },
          { label: "Profiles shown", value: "Moulding and Square graphic cross-sections" },
          { label: "Other sizes", value: "Enquire for other size needs" },
          { label: "Use", value: "Main openings, room entries, villas, offices, and commercial interiors" },
          { label: "Strength", value: "Built for stable fitting and strong hardware holding" },
        ],
      },
    ],
    colors: [...frameColors],
    applications: [
      {
        name: "Main openings",
        description: "Frame sections for room entries and larger openings where holding strength comes first.",
      },
      {
        name: "Residential projects",
        description: "Homes and villas that want stronger frame performance with a cleaner finished look.",
      },
      {
        name: "Commercial interiors",
        description: "Offices and projects where section stability and repeatable fitting matter.",
      },
    ],
    cta: { ...inquiryCta },
    media: {
      alt: "Nested WPC frame stack in three warm finishes.",
      caption: "Section depth, stability, and finish options.",
      kind: "illustration",
    },
    rangeIntro: {
      eyebrow: "Frame Ranges",
      title: "WPC and Solaris frame options with moulding and square cross-sections.",
      body:
        "Our frame range covers EcoAashirwad WPC frames for high-density daily-use openings and EcoAashirwad Solaris as the Highbond flagship option for more premium finish-led work.",
      availabilityNote:
        "Section sizes, mouldings, and finish colours vary across ranges.",
      featured: {
        label: "Featured range",
        name: "Solaris",
        description:
          "A premium frame range with strong visual appeal, refined finishes, and section options suited to polished residential and commercial work.",
        logoSrc: "/images/brands/solaris.jpeg",
        logoAlt: "Solaris logo",
      },
      supporting: [
        {
          label: "Core range",
          name: "EcoAashirwad WPC",
          description:
            "High-density WPC frames available in moulding and square sections for stable fitting and strong hardware holding.",
        },
        {
          label: "Profile options",
          name: "Moulding and Square",
          description:
            "The current frame sheet focuses on moulding and square cross-sections, with finish availability changing by profile and range.",
        },
      ],
    },
    rangeShowcases: [
      {
        eyebrow: "Solaris Range",
        title: "Solaris frames for a more premium finish-led frame presentation.",
        body:
          "Solaris sits at the premium end of the frame range, bringing together refined finish presentation, strong section feel, and a more polished visual result for villas, homes, and quality-focused interior projects.",
        imageSrc: "/images/frames/frame-ecoteak.png",
        imageAlt: "Solaris premium WPC frame in EcoTeak finish.",
        imageFit: "contain",
        badge: "Premium Frame Range",
        logoSrc: "/images/brands/solaris.jpeg",
        logoAlt: "Solaris logo",
        facts: [
          "Premium finish. Strong frame feel.",
          "Stable fitting. Reliable hardware holding.",
          "Made for visible frame interiors.",
        ],
      },
    ],
    showFinishes: true,
  },
  {
    slug: "boards",
    name: "PVC & WPC Boards",
    navLabel: "Boards",
    strap: "WPC and PVC boards for fitted interiors.",
    homeSummary:
      "For wardrobes, kitchens, partitions, ceilings, and panel work that needs lower upkeep across PVC and premium WPC options.",
    summary:
      "Board stock for fitted interior work across PVC and premium WPC ranges.",
    materialPromise: "PVC and WPC boards made for fitted interiors, cabinetry, and panel work.",
    bullets: [
      "Suitable for wardrobes, kitchens, partitions, panelling, ceilings, and utility surfaces.",
      "Available in multiple thicknesses across PVC and premium WPC ranges.",
    ],
    specs: [
      {
        title: "Board sizes",
        note: "Board standard size now needs to be shown in feet. Thicknesses below reflect the latest handwritten sheet.",
        items: [
          { label: "Standard size", value: "8 ft x 4 ft" },
          { label: "Omniwud PVC board", value: "Economical range, ivory, 18 mm, 12 mm, 8 mm, 6 mm" },
          { label: "Aashirwad PVC board", value: "Better quality, ivory, 18 mm, 12 mm, 8 mm" },
          { label: "Aashirwad hybrid board", value: "Best PVC board, ivory with yellow note on sheet, 18 mm, 12 mm, 8 mm" },
          { label: "Aashirwad WPC board", value: "High density, high strength, 18 mm, 12 mm, 8 mm" },
          { label: "Use", value: "Wardrobes, kitchens, partitions, panelling, LCD units" },
        ],
      },
      {
        title: "Board use",
        items: [
          { label: "Fabrication", value: "Cabinetry, fitted work, and surface applications" },
          { label: "Projects", value: "Residential and commercial interiors" },
        ],
        imageSrc: "/images/boards/board-vanity-waterproof.png",
        imageAlt: "Moisture-resistant interior board use shown in a premium bathroom vanity application.",
        imageFit: "cover",
      },
    ],
    colors: [],
    applications: [
      {
        name: "Wardrobes and kitchens",
        description: "Board stock for fitted furniture and utility cabinetry in demanding interiors.",
      },
      {
        name: "Partitions and panels",
        description: "Useful for partitioning, panelling, and surface-led interior work.",
      },
      {
        name: "Commercial interiors",
        description: "A practical board option for repeatable, lower-upkeep fit-out work.",
      },
    ],
    cta: { ...inquiryCta },
    media: {
      alt: "Layered PVC and WPC board stack for fitted interior work.",
      caption: "Board solutions from PVC to premium WPC.",
      kind: "illustration",
    },
    rangeIntro: {
      eyebrow: "Board Ranges",
      title: "Omniwud, Aashirwad PVC, hybrid, and WPC board options for fitted interiors.",
      body:
        "Our board range covers economical Omniwud PVC boards, better-quality Aashirwad PVC boards, the hybrid board line, and premium Aashirwad WPC boards for wardrobes, kitchens, partitions, panelling, and utility interiors.",
      availabilityNote:
        "Board thicknesses, colours, and material type differ by range.",
      featured: {
        label: "Featured range",
        name: "WPC Aashirwad Board",
        description:
          "A premium WPC board range for wardrobes, kitchens, partitions, and fitted interior work that needs strength, stability, and a richer finished feel.",
      },
      supporting: [
        {
          label: "Second range",
          name: "PVC and Hybrid Boards",
          description:
            "Aashirwad PVC boards cover the main PVC range, with the hybrid gold board positioned above it for better board quality.",
        },
        {
          label: "Additional ranges",
          name: "Omniwud",
          description:
            "Omniwud covers the economical PVC tier for more budget-led board requirements.",
          logoSrc: "/images/brands/omniwud.jpeg",
          logoAlt: "Omniwud logo",
        },
      ],
    },
    rangeShowcases: [
      {
        eyebrow: "Flagship Board Range",
        title: "WPC Aashirwad Board as the premium strength-led board in the range.",
        body:
          "WPC Aashirwad Board is the flagship board range for fitted interiors where a stronger, richer-feel board is preferred. It is positioned as the premium option in the line and is intended for projects that want better strength perception and more confidence in long-term use.",
        imageSrc: "/images/boards/wpc-aashirwad-board.png",
        imageAlt: "WPC Aashirwad board finish graphic.",
        imageFit: "contain",
        badge: "Flagship",
        facts: [
          "Flagship board range.",
          "Stronger feel for fitted interiors.",
          "Above PVC, hybrid, and Omniwud.",
        ],
      },
      {
        eyebrow: "PVC Aashirwad",
        title: "PVC Aashirwad boards for practical fitted interiors and repeatable fabrication.",
        body:
          "PVC Aashirwad boards cover the practical middle of the range for cabinetry, partitions, ceilings, panel work, and other fitted interior applications where clean fabrication and lower upkeep remain the priority.",
        imageSrc: "/images/boards/pvc-aashirwad-board.png",
        imageAlt: "PVC Aashirwad board finish graphic.",
        imageFit: "contain",
        facts: [
          "Made for wardrobes and kitchens.",
          "Practical PVC board range.",
          "Good for repeat fabrication.",
        ],
      },
      {
        eyebrow: "Value Range",
        title: "Omniwud as the economical PVC tier for more budget-led board requirements.",
        body:
          "Omniwud sits as the economical PVC tier in the board line, giving projects a more budget-focused option when the requirement is practical coverage rather than the premium WPC positioning of the Aashirwad flagship boards.",
        imageSrc: "/images/boards/omni-board.png",
        imageAlt: "Omniwud board finish graphic.",
        imageFit: "contain",
        facts: [
          "Economical PVC tier.",
          "Best for budget-led jobs.",
          "For practical board work.",
        ],
      },
    ],
  },
];

export const productFamilyLookup = productFamilies.reduce<Record<ProductSlug, ProductFamily>>(
  (map, family) => {
    map[family.slug] = family;
    return map;
  },
  {} as Record<ProductSlug, ProductFamily>,
);

export const contactPanels = [
  {
    title: "Email",
    description: "Send the requirement directly for the fastest response.",
    value: contactEmail,
    href: `mailto:${contactEmail}`,
  },
  {
    title: "Send",
    description: "Category, quantity, finish, current operations in South India, and any drawing, section, or thickness detail you already have.",
    value: "Doors / Frames / Boards + size + quantity",
  },
  {
    title: "Projects",
    description: "For dealers, builders, fabricators, architects, and project buyers.",
    value: "Homes, villas, offices, and commercial interiors",
  },
] as const;

export const aboutValues = [
  {
    title: "Resin bond",
    body: "A dense internal bond helps sections stay stable under hardware and daily use.",
  },
  {
    title: "Holding strength",
    body: "Doors, frames, and boards are made for strong screw holding and long service life.",
  },
  {
    title: "Over a decade",
    body: "The focus has stayed on premium WPC for demanding interior work.",
  },
];
