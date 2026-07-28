export type CatalogItem = {
  slug: string
  name: string
  image: string
  alt: string
  rentalPrice: number
  purchasePrice: number
  sizes: string[]
  description: string
}

export type Collection = {
  slug: string
  name: string
  sub: string
  image: string
  alt: string
  tagline: string
  description: string
  items: CatalogItem[]
}

export const COLLECTIONS: Collection[] = [
  {
    slug: 'edo',
    name: 'EDO',
    sub: 'COLLECTION',
    image: '/images/e.jpg',
    alt: 'Edo bride in coral bead crown and purple attire',
    tagline: 'Regal coral, royal heritage',
    description:
      'Ceremonial Edo attire defined by dense coral beadwork, sculptural crowns and rich velvet wrappers — the unmistakable language of Benin royalty.',
    items: [
      {
        slug: 'edo-royal-coral-ensemble',
        name: 'Edo Royal Coral Ensemble',
        image: '/images/collection-edo.png',
        alt: 'Edo bride wearing a coral bead crown with purple velvet wrapper',
        rentalPrice: 220,
        purchasePrice: 1150,
        sizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16'],
        description:
          'A complete bridal ensemble with coral bead crown, beaded corset, purple velvet wrapper and matching hand fan.',
      },
      {
        slug: 'edo-bridal-velvet-set',
        name: 'Edo Bridal Velvet Set',
        image: '/images/edo-bridal.png',
        alt: 'Edo bride in red velvet wrapper with coral bead corset and crown',
        rentalPrice: 245,
        purchasePrice: 1290,
        sizes: ['UK 10', 'UK 12', 'UK 14', 'UK 16'],
        description:
          'Deep red velvet wrapper paired with a full coral bead corset, crown and beaded fan for traditional engagement ceremonies.',
      },
      {
        slug: 'edo-groom-coral-attire',
        name: 'Edo Groom Coral Attire',
        image: '/images/edo-groom.png',
        alt: 'Edo groom in white wrapper with layered coral bead necklaces',
        rentalPrice: 195,
        purchasePrice: 980,
        sizes: ['M', 'L', 'XL', 'XXL'],
        description:
          'Crisp white wrapper with layered coral necklaces, coral cap and gold bracelets — styled for the groom.',
      },
    ],
  },
  {
    slug: 'aso-oke',
    name: 'ASO OKE',
    sub: 'COLLECTION',
    image: '/images/q.jpg',
    alt: 'Woman in teal and gold Aso Oke with gele headwrap',
    tagline: 'Handwoven Yoruba luxury',
    description:
      'Handwoven Aso Oke in rich jewel tones and metallic threads, tailored into iro and buba, agbada and sculptural gele.',
    items: [
      {
        slug: 'teal-gold-aso-oke',
        name: 'Teal & Gold Aso Oke',
        image: '/images/collection-asooke.png',
        alt: 'Woman in teal and gold Aso Oke with ornate gele headwrap',
        rentalPrice: 180,
        purchasePrice: 890,
        sizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14'],
        description:
          'Teal handwoven iro and buba with gold metallic thread, finished with a pre-tied gele and ipele shoulder sash.',
      },
      {
        slug: 'purple-royal-aso-oke',
        name: 'Purple Royal Aso Oke',
        image: '/images/asooke-purple.png',
        alt: 'Woman in deep purple and gold Aso Oke with sculptural gele',
        rentalPrice: 210,
        purchasePrice: 1050,
        sizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16'],
        description:
          'Our signature deep purple weave with heavy gold shimmer, styled with a sculptural gele for standout wedding entrances.',
      },
      {
        slug: 'ivory-gold-agbada',
        name: 'Ivory & Gold Agbada',
        image: '/images/asooke-ivory.png',
        alt: 'Man in ivory and gold embroidered agbada with fila cap',
        rentalPrice: 200,
        purchasePrice: 1020,
        sizes: ['M', 'L', 'XL', 'XXL'],
        description:
          'Three-piece ivory agbada with hand-finished gold embroidery, matching fila cap and coral bead accents.',
      },
    ],
  },
  {
    slug: 'esan',
    name: 'ESAN',
    sub: 'COLLECTION',
    image: '/images/collection-esan.png',
    alt: 'Woman in red Esan traditional attire with coral beads',
    tagline: 'Bold reds and gold ornament',
    description:
      'Esan ceremonial dress in commanding reds and burgundies, layered with coral chokers, beaded headpieces and gold ornaments.',
    items: [
      {
        slug: 'esan-red-coral-ensemble',
        name: 'Esan Red Coral Ensemble',
        image: '/images/collection-esan.png',
        alt: 'Woman in red Esan attire with coral bead headpiece',
        rentalPrice: 205,
        purchasePrice: 1080,
        sizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14'],
        description:
          'Red ceremonial wrapper with coral bead headpiece and multi-strand necklaces, complete with gold cuffs.',
      },
      {
        slug: 'esan-ceremonial-set',
        name: 'Esan Ceremonial Set',
        image: '/images/esan-ceremonial.png',
        alt: 'Woman in burgundy and gold Esan ceremonial attire',
        rentalPrice: 190,
        purchasePrice: 950,
        sizes: ['UK 10', 'UK 12', 'UK 14', 'UK 16'],
        description:
          'Burgundy and gold wrapper set with coral choker, beaded headpiece, anklets and bracelets.',
      },
    ],
  },
  {
    slug: 'coral-beads',
    name: 'CORAL BEADS',
    sub: '& ACCESSORIES',
    image: '/images/n.jpg',
    alt: 'Traditional coral bead necklace sets',
    tagline: 'The finishing touch',
    description:
      'Coral necklaces, crowns, cuffs and earring sets available on their own or as add-ons to any attire rental.',
    items: [
      {
        slug: 'coral-necklace-set',
        name: 'Coral Necklace Set',
        image: '/images/collection-beads.png',
        alt: 'Layered traditional coral bead necklace sets',
        rentalPrice: 65,
        purchasePrice: 320,
        sizes: ['One size'],
        description:
          'Multi-strand coral necklace set with gold spacers — the classic finish for Edo and Esan looks.',
      },
      {
        slug: 'coral-bracelet-earring-set',
        name: 'Coral Bracelet & Earring Set',
        image: '/images/beads-bracelets.png',
        alt: 'Coral bead bracelet and earring sets on velvet',
        rentalPrice: 45,
        purchasePrice: 210,
        sizes: ['One size'],
        description:
          'Matching coral bracelets and statement earrings with gold detailing, presented in a gift box.',
      },
      {
        slug: 'coral-crown-headpiece',
        name: 'Coral Crown Headpiece',
        image: '/images/beads-crown.png',
        alt: 'Ornate coral bead crown headpiece on a stand',
        rentalPrice: 85,
        purchasePrice: 460,
        sizes: ['One size'],
        description:
          'Structured coral bead crown with gold trim, adjustable interior band for a secure all-day fit.',
      },
    ],
  },
  {
    slug: 'kids',
    name: 'KIDS',
    sub: 'COLLECTION',
    image: '/images/b.jpg',
    alt: 'Child wearing cream and gold traditional agbada',
    tagline: 'Little ones, big heritage',
    description:
      'Scaled-down traditional attire for children aged 2–12, tailored for comfort through long celebration days.',
    items: [
      {
        slug: 'kids-cream-agbada',
        name: 'Kids Cream Agbada',
        image: '/images/r.jpg',
        alt: 'Child in cream and gold traditional agbada with cap',
        rentalPrice: 85,
        purchasePrice: 340,
        sizes: ['2-3 yrs', '4-5 yrs', '6-7 yrs', '8-9 yrs', '10-12 yrs'],
        description:
          'Soft cream agbada with gold embroidery and matching cap, lined for comfort on long ceremony days.',
      },
      {
        slug: 'kids-purple-aso-oke',
        name: 'Kids Purple Aso Oke',
        image: '/images/l.jpg',
        alt: 'Young girl in purple and gold Aso Oke with small gele',
        rentalPrice: 95,
        purchasePrice: 380,
        sizes: ['2-3 yrs', '4-5 yrs', '6-7 yrs', '8-9 yrs'],
        description:
          'Purple and gold Aso Oke set with a small pre-tied gele and a delicate coral bead necklace.',
      },
    ],
  },
]

export function getCollection(slug: string) {
  return COLLECTIONS.find((c) => c.slug === slug)
}

export const ALL_ITEMS = COLLECTIONS.flatMap((c) =>
  c.items.map((item) => ({ ...item, collection: c.name, collectionSlug: c.slug })),
)
