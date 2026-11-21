import { SITE_IMAGES } from '@/src/config/images';

export interface ServiceCardData {
  id: 'rooftop' | 'ground-mounted';
  title: string;
  description: string;
  benefits: string[];
  mountingSummary: string;
  image: string;
  serviceValue: 'Rooftop' | 'Ground Mounted';
}

export interface ProcessStep {
  number: string;
  title: string;
  detail: string;
}

export interface CapabilityItem {
  title: string;
  detail: string;
}

export interface ProjectRecord {
  id: string;
  name: string;
  capacity: string;
  type: 'Ground Mounted' | 'Rooftop';
  location: string;
  image: string;
}

export interface GalleryRecord {
  id: string;
  title: string;
  category: 'Rooftop' | 'Ground Mounted';
  location: string;
  capacity: string;
  image: string;
  aspectClass: string;
}

export const SITE_DATA = {
  brand: {
    shortName: 'Jerry John Powers',
    legalName: 'Jerry John Powers Pvt. Ltd.',
    copyright: '© 2026 Jerry John Powers Private Limited',
  },

  navLinks: [
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ],

  navCtaLabel: 'Get an Instant Quote',

  hero: {
    line1: 'Designed. Built.',
    line2: 'Powered on.',
    modes: {
      morning: {
        label: 'Morning',
        subtext: 'Rooftop generating power',
        description:
          'Your rooftop turns daylight into power for your plant, cutting what you draw from the grid.',
        shortDescription:
          'Your rooftop turns daylight into power for your plant, cutting grid draw.',
      },
      night: {
        label: 'Night',
        subtext: 'Lower grid dependence',
        description:
          'Pair solar with the grid or storage and keep your energy costs predictable after sunset.',
        shortDescription:
          'Keep your energy costs predictable after sunset.',
      },
    },
    primaryCta: 'Book a free consultation',
    secondaryCta: 'Explore services',
  },

  trustStrip: {
    highlights: [
      { numeric: 250, suffix: ' MW', text: 'Reliance Power project' },
      { numeric: 500, suffix: '+', text: 'team across the state' },
      { numeric: null, suffix: '', text: 'End-to-end: design to O&M' },
    ],
    partners: [
      'Reliance Power',
      'Shapoorji Pallonji',
      'L&T',
      'Tata Power Solar',
    ],
  },

  services: {
    eyebrow: 'Services',
    headline: 'Engineered for rooftops and utility terrain',
    items: [
      {
        id: 'rooftop',
        title: 'Rooftop Solar',
        description:
          'Turn industrial sheds, IT campuses and institutional roofs into clean power assets without acquiring land.',
        benefits: [
          'Works efficiently in compact roof spaces at lower installation cost than ground mounts',
          'Frees up industrial land while shielding roof surfaces from thermal wear',
          'Available with ballasted or attached racking, grid-connected or battery-backed',
        ],
        mountingSummary: 'Ballasted & attached racking · Grid-tied & battery-backed',
        image: SITE_IMAGES.services.rooftop,
        serviceValue: 'Rooftop',
      },
      {
        id: 'ground-mounted',
        title: 'Ground-Mounted Solar',
        description:
          'Megawatt-scale captive and utility plants built for optimal tilt, easy maintenance and future expansion.',
        benefits: [
          'Substantially lowers enterprise carbon emissions with flexible solar tilt angles',
          'Clear row spacing for effortless cleaning, diagnostics and ongoing maintenance',
          'Modular site layouts that make capacity expansion straightforward',
        ],
        mountingSummary: 'Concrete, pillar, ground screw & ground anchor mounts',
        image: SITE_IMAGES.services.groundMounted,
        serviceValue: 'Ground Mounted',
      },
    ] as ServiceCardData[],
  },

  process: {
    eyebrow: 'Process',
    headline: 'Five clear steps from site study to steady generation',
    steps: [
      {
        number: '01',
        title: 'Pre-study and land identification',
        detail: 'Irradiation assessment, roof or land scouting, and legal title review.',
      },
      {
        number: '02',
        title: 'Engineering and design',
        detail: 'Structural wind-load validation, string layout, and electrical SLD design.',
      },
      {
        number: '03',
        title: 'Approvals (TANGEDCO and statutory)',
        detail: 'Feasibility clearances, CEIG safety inspections, and grid paperwork.',
      },
      {
        number: '04',
        title: 'Installation and commissioning',
        detail: 'Mounting structures, BOS cabling, substations, and grid synchronization.',
      },
      {
        number: '05',
        title: 'Operations and maintenance',
        detail: 'Preventive diagnostics, module upkeep, and long-term yield monitoring.',
      },
    ] as ProcessStep[],
  },

  capabilities: {
    eyebrow: 'What we handle',
    headline: 'Every technical, statutory and grid detail under one roof',
    items: [
      {
        title: 'Transmission lines and substations (11 kV to 110 kV)',
        detail: 'High-voltage bay extensions, switchyards, and power evacuation infrastructure.',
      },
      {
        title: 'Approvals and licensing',
        detail: 'Complete regulatory coordination across state and central energy authorities.',
      },
      {
        title: 'BOS installation',
        detail: 'Balance of System cabling, earthing, lightning protection, and SCADA telemetry.',
      },
      {
        title: 'Statutory licensing',
        detail: 'Electrical inspectorate filings and mandatory statutory certifications.',
      },
      {
        title: 'Land identification with legal opinion',
        detail: 'Contiguous parcel evaluation supported by verified legal due diligence.',
      },
      {
        title: 'TANGEDCO feasibility and paperwork',
        detail: 'Grid connectivity feasibility studies, open-access, and wheeling documentation.',
      },
      {
        title: 'Safety approvals',
        detail: 'Structural safety validation, fire compliance, and site HSE clearance.',
      },
    ] as CapabilityItem[],
  },

  projects: {
    eyebrow: 'Featured projects',
    headline: 'Selected installations across Tamil Nadu and India',
    items: [
      {
        id: 'reliance-power',
        name: 'Reliance Power',
        capacity: '250 MW',
        type: 'Ground Mounted',
        location: 'Utility Scale · India',
        image: SITE_IMAGES.projects.reliance,
      },
      {
        id: 'shapoorji-pallonji',
        name: 'Shapoorji Pallonji Group',
        capacity: '134 MW',
        type: 'Ground Mounted',
        location: 'Tamil Nadu',
        image: SITE_IMAGES.projects.shapoorji,
      },
      {
        id: 'nhpc-lt',
        name: 'NHPC Limited (through L&T)',
        capacity: '50 MW',
        type: 'Ground Mounted',
        location: 'Tamil Nadu',
        image: SITE_IMAGES.projects.nhpc,
      },
      {
        id: 'grt-jewellers',
        name: 'GRT Jewellers',
        capacity: '44 MW',
        type: 'Ground Mounted',
        location: 'Tamil Nadu',
        image: SITE_IMAGES.projects.grt,
      },
      {
        id: 'ashok-leyland',
        name: 'Ashok Leyland',
        capacity: '3 MW',
        type: 'Rooftop',
        location: 'Industrial Facility · Tamil Nadu',
        image: SITE_IMAGES.projects.ashokLeyland,
      },
      {
        id: 'ascendas-it-park',
        name: 'Ascendas IT Park',
        capacity: '3 MW',
        type: 'Rooftop',
        location: 'Chennai, Tamil Nadu',
        image: SITE_IMAGES.projects.ascendas,
      },
      {
        id: 'sastra-university',
        name: 'SASTRA University',
        capacity: '2 MW',
        type: 'Rooftop',
        location: 'Thanjavur, Tamil Nadu',
        image: SITE_IMAGES.projects.sastra,
      },
      {
        id: 'dell-vertical',
        name: 'Dell (Vertical Solar Power Farm)',
        capacity: '120 kW',
        type: 'Rooftop',
        location: 'Sriperumbudur, Tamil Nadu',
        image: SITE_IMAGES.projects.dell,
      },
    ] as ProjectRecord[],
  },

  clients: [
    'Amway',
    'Exide',
    'NHPC',
    'KG Fabrics',
    'SRM',
    'SIECHEM',
    'GRT',
    'Ashok Leyland',
    'Danfoss',
    'Madura Coats',
  ],

  about: {
    eyebrow: 'About & leadership',
    quote:
      'To make our customers and employees happy, with a delightful experience at an affordable price.',
    director: 'Arul John, Director',
    storyHeading: 'Chennai-headquartered EPC precision',
    story: [
      'From our headquarters in Nandanam, Chennai, Jerry John Powers Pvt. Ltd. brings engineering, civil execution, and statutory grid expertise together for commercial, industrial, and utility clients across Tamil Nadu and India.',
      'Whether equipping factory roofs in Sriperumbudur or commissioning multi-megawatt ground-mounted plants and 110 kV substations across the state, our focus stays constant: transparent timelines, dependable hardware, and long-term generation.',
    ],
    stats: [
      { value: 15, suffix: '+', label: 'Enterprise companies served' },
      { value: 500, suffix: '+', label: 'Team members on the ground' },
      { value: 250, suffix: ' MW', label: 'Largest single project delivered' },
    ],
  },

  gallery: {
    eyebrow: 'Gallery',
    headline: 'Built across roofs, campuses and solar parks',
    videoSlot: {
      title: 'Tamil Nadu Solar EPC Field Walkthrough',
      duration: '02:18 · Video slot',
      description:
        'Overview of module mounting, inverter stations, and 110 kV switchyard commissioning across our active project sites.',
      poster: SITE_IMAGES.gallery.videoPoster,
    },
    items: [
      {
        id: 'g-1',
        title: 'Utility Ground-Mounted Array at Dusk',
        category: 'Ground Mounted',
        location: 'Southern Tamil Nadu',
        capacity: '134 MW Corridor',
        image: SITE_IMAGES.gallery.ground1,
        aspectClass: 'aspect-[16/10]',
      },
      {
        id: 'g-2',
        title: 'Industrial Factory Rooftop Plant',
        category: 'Rooftop',
        location: 'Chennai Industrial Belt',
        capacity: '3 MW Attached Racking',
        image: SITE_IMAGES.gallery.rooftop1,
        aspectClass: 'aspect-[4/5]',
      },
      {
        id: 'g-3',
        title: '110 kV Grid Evacuation Switchyard',
        category: 'Ground Mounted',
        location: 'Tamil Nadu Grid',
        capacity: '11 kV – 110 kV Substation',
        image: SITE_IMAGES.gallery.ground2,
        aspectClass: 'aspect-[4/3]',
      },
      {
        id: 'g-4',
        title: 'Corporate IT Park & Vertical Solar Farm',
        category: 'Rooftop',
        location: 'Chennai, Tamil Nadu',
        capacity: '3 MW / 120 kW',
        image: SITE_IMAGES.gallery.rooftop2,
        aspectClass: 'aspect-[4/3]',
      },
      {
        id: 'g-5',
        title: 'Architectural Commercial Rooftop',
        category: 'Rooftop',
        location: 'Chennai, Tamil Nadu',
        capacity: '2 MW Campus Array',
        image: SITE_IMAGES.gallery.rooftop3,
        aspectClass: 'aspect-[16/10]',
      },
      {
        id: 'g-6',
        title: 'Captive Open-Access Solar Park',
        category: 'Ground Mounted',
        location: 'Tamil Nadu',
        capacity: '44 MW Ground Array',
        image: SITE_IMAGES.gallery.ground3,
        aspectClass: 'aspect-[4/5]',
      },
    ] as GalleryRecord[],
  },

  contact: {
    eyebrow: 'Contact',
    headline: "Let's put your roof to work",
    subtext:
      'Share your roof area, land parcel, or target capacity. Our Chennai engineering team will prepare a feasibility and TANGEDCO approval roadmap.',
    email: 'aruljohn@jerryjohnpowers.com',
    phoneDisplay: '+91 96772 09406',
    phoneHref: 'tel:+919677209406',
    address:
      '34, Swathi Complex, First Floor, Venkata Narayana Road, Nandanam, Chennai - 600035',
    serviceOptions: ['Ground Mounted', 'Rooftop', 'Others'] as const,
  },

  footer: {
    summary:
      'Jerry John Powers Pvt. Ltd. is a Chennai-based solar EPC engineering company delivering turnkey rooftop, ground-mounted, and substation infrastructure across Tamil Nadu and India.',
    talkToUsLabel: 'Talk to us',
    columns: [
      {
        heading: 'Solutions',
        links: [
          { label: 'Rooftop Solar EPC', href: '#services' },
          { label: 'Ground-Mounted Plants', href: '#services' },
          { label: '11 kV – 110 kV Substations', href: '#capabilities' },
          { label: 'BOS & Grid Evacuation', href: '#capabilities' },
        ],
      },
      {
        heading: 'Applications',
        links: [
          { label: 'Commercial & Industrial', href: '#projects' },
          { label: 'IT Parks & Campuses', href: '#projects' },
          { label: 'Institutional Roofs', href: '#projects' },
          { label: 'Utility Scale Solar', href: '#projects' },
        ],
      },
      {
        heading: 'Company',
        links: [
          { label: 'About Us', href: '#about' },
          { label: 'Our Process', href: '#process' },
          { label: 'Featured Projects', href: '#projects' },
          { label: 'Project Gallery', href: '#gallery' },
          { label: 'Contact Us', href: '#contact' },
        ],
      },
      {
        heading: 'Quick Links',
        links: [
          { label: 'TANGEDCO Approvals', href: '#capabilities' },
          { label: 'Statutory Licensing', href: '#capabilities' },
          { label: 'Land Legal Due Diligence', href: '#capabilities' },
          { label: 'Safety & CEIG Clearances', href: '#capabilities' },
          { label: 'Operations & O&M', href: '#process' },
          { label: 'Get an Instant Quote', href: '#contact' },
        ],
      },
    ],
  },
};
