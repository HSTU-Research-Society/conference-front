export interface ConferenceTrack {
  id: string;
  number: number;
  name: string;
  icon: string;
  description: string;
  topics: string[];
  chairs: string[];
}

export interface KeynoteSpeaker {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  country: string;
  photoUrl: string;
  speechTitle: string;
  speechAbstract: string;
  bio: string;
}

export interface ImportantDate {
  id: string;
  title: string;
  dateStr: string;
  isoDate: string;
  status: 'passed' | 'active' | 'upcoming';
  description: string;
  isSubmissionMilestone?: boolean;
}

export interface ConferenceEdition {
  year: number;
  editionName: string;
  acronym: string;
  theme: string;
  dates: string;
  status: 'current' | 'archived';
  location: string;
  venue: string;
  totalSubmissions?: number;
  acceptedPapers?: number;
  acceptanceRate?: string;
  proceedingsDoi?: string;
  proceedingsPublisher?: string;
  highlightSummary: string;
}

export const ANNUAL_EDITIONS: ConferenceEdition[] = [
  {
    year: 2026,
    editionName: '4th International Conference on Scientific Research, AI & Sustainable Innovation',
    acronym: 'HSTU-ICSRIT 2026',
    theme: 'Pioneering Sustainable Futures: Multidisciplinary Science, Artificial Intelligence, and Deep Tech Innovations',
    dates: 'October 16–18, 2026',
    status: 'current',
    location: 'Dinajpur, Bangladesh',
    venue: 'HSTU Central Auditorium & Hybrid Virtual Platform',
    highlightSummary: 'Now accepting submissions via Microsoft CMT across 6 specialized research tracks. Double-blind peer review with indexed proceedings.',
  },
  {
    year: 2025,
    editionName: '3rd International Conference on Emerging Technologies & Sustainable Agriculture',
    acronym: 'HSTU-ICSRIT 2025',
    theme: 'Data-Driven Science, Agro-Tech Robotics, and Renewable Energy for Global Resilience',
    dates: 'November 14–16, 2025',
    status: 'archived',
    location: 'Dinajpur, Bangladesh',
    venue: 'Dr. M. A. Wazed Miah Satellite Center & Virtual',
    totalSubmissions: 312,
    acceptedPapers: 124,
    acceptanceRate: '39.7%',
    proceedingsDoi: '10.1109/ICSRIT.2025.1089201',
    proceedingsPublisher: 'IEEE Xplore / Springer LNCS',
    highlightSummary: 'Featured 124 peer-reviewed publications from 18 countries, 4 plenary keynotes, and 12 best paper awards.',
  },
  {
    year: 2024,
    editionName: '2nd International Conference on Computational Science & Applied Engineering',
    acronym: 'HSTU-ICSRIT 2024',
    theme: 'Advancing Smart Automation, Bioinformatics, and Clean Energy Ecosystems',
    dates: 'October 25–27, 2024',
    status: 'archived',
    location: 'Dinajpur, Bangladesh',
    venue: 'HSTU Academic Complex',
    totalSubmissions: 248,
    acceptedPapers: 98,
    acceptanceRate: '39.5%',
    proceedingsDoi: '10.1109/ICSRIT.2024.1045239',
    proceedingsPublisher: 'Scopus Indexed Proceedings',
    highlightSummary: 'Included participants from over 14 nations with keynote addresses by renowned researchers from Asia, Europe, and North America.',
  },
  {
    year: 2023,
    editionName: 'Inaugural National Conference on Scientific Research & Innovation',
    acronym: 'HSTU-NCSRI 2023',
    theme: 'Catalyzing University Research and Youth Innovation in Bangladesh',
    dates: 'December 08–09, 2023',
    status: 'archived',
    location: 'Dinajpur, Bangladesh',
    venue: 'HSTU Central Auditorium',
    totalSubmissions: 175,
    acceptedPapers: 72,
    acceptanceRate: '41.1%',
    proceedingsDoi: '10.1109/NCSRI.2023.1011400',
    proceedingsPublisher: 'HSTU Research Press',
    highlightSummary: 'The founding edition that inaugurated the annual conference series, establishing Microsoft CMT peer-review workflows.',
  },
];

export const CURRENT_EDITION = ANNUAL_EDITIONS[0];

export const CMT_CONFIG = {
  portalUrl: 'https://cmt3.research.microsoft.com/HSTUCONF2026',
  conferenceCode: 'HSTUCONF2026',
  conferenceFullName: '4th International Conference on Scientific Research, AI & Sustainable Innovation (HSTU-ICSRIT 2026)',
  supportEmail: 'cmt-support@hsturs.org',
  maxPages: '6 to 8 pages (IEEE 2-column format including references)',
  maxFileSize: '20 MB PDF',
  formatTemplates: {
    latex: 'https://www.ieee.org/content/dam/ieee-org/ieee/web/org/conferences/conference-template-latex.zip',
    word: 'https://www.ieee.org/content/dam/ieee-org/ieee/web/org/conferences/conference-template-a4.doc',
  },
  plagiarismThreshold: 'Below 15% overall similarity (single source < 3%) verified via Turnitin / CrossCheck',
};

export const IMPORTANT_DATES: ImportantDate[] = [
  {
    id: 'd-1',
    title: 'Call for Papers Release',
    dateStr: 'March 15, 2026',
    isoDate: '2026-03-15',
    status: 'passed',
    description: 'Official call for papers and track topics announced.',
  },
  {
    id: 'd-2',
    title: 'Microsoft CMT Submission System Opens',
    dateStr: 'April 01, 2026',
    isoDate: '2026-04-01',
    status: 'passed',
    description: 'Portal open for author account creation and draft submissions.',
    isSubmissionMilestone: true,
  },
  {
    id: 'd-3',
    title: 'Full Paper Submission Deadline (Strict)',
    dateStr: 'July 25, 2026, 23:59 GMT+6',
    isoDate: '2026-07-25',
    status: 'active',
    description: 'Final deadline to upload anonymized PDFs to Microsoft CMT portal.',
    isSubmissionMilestone: true,
  },
  {
    id: 'd-4',
    title: 'Double-Blind Peer Review Period',
    dateStr: 'August 01 – August 25, 2026',
    isoDate: '2026-08-25',
    status: 'upcoming',
    description: 'TPC and international peer reviewers complete scoring on CMT.',
  },
  {
    id: 'd-5',
    title: 'Acceptance / Rejection Notification',
    dateStr: 'September 05, 2026',
    isoDate: '2026-09-05',
    status: 'upcoming',
    description: 'Official meta-reviews and decisions broadcast via Microsoft CMT.',
    isSubmissionMilestone: true,
  },
  {
    id: 'd-6',
    title: 'Camera-Ready Paper & Copyright Form',
    dateStr: 'September 25, 2026',
    isoDate: '2026-09-25',
    status: 'upcoming',
    description: 'Final revised paper upload with author details and IEEE copyright.',
  },
  {
    id: 'd-7',
    title: 'Author Registration Deadline',
    dateStr: 'October 02, 2026',
    isoDate: '2026-10-02',
    status: 'upcoming',
    description: 'At least one author must register to ensure inclusion in proceedings.',
  },
  {
    id: 'd-8',
    title: 'Conference Presentation Days',
    dateStr: 'October 16–18, 2026',
    isoDate: '2026-10-16',
    status: 'upcoming',
    description: 'Oral technical sessions, keynotes, posters, and gala awards ceremony.',
    isSubmissionMilestone: true,
  },
];

export const RESEARCH_TRACKS: ConferenceTrack[] = [
  {
    id: 'track-1',
    number: 1,
    name: 'Artificial Intelligence, Machine Learning & Robotics',
    icon: 'Cpu',
    description: 'Theoretical foundations and real-world deployments of modern intelligent systems, autonomous machines, and foundation models.',
    topics: [
      'Deep Learning Architectures & Transformer Optimization',
      'Computer Vision, Scene Understanding & Generative Media',
      'Natural Language Processing & Low-Resource Language Tech',
      'Autonomous Aerial & Ground Robotics, Control Theory',
      'Edge AI, TinyML & Hardware Accelerators',
      'Explainable, Ethical & Safe AI Architectures',
    ],
    chairs: ['Dr. Tanvir Rahman (HSTU)', 'Prof. Elena Rostova (TU Munich)'],
  },
  {
    id: 'track-2',
    number: 2,
    name: 'Smart Agriculture, Food Security & Biotechnology',
    icon: 'Wheat',
    description: 'Advanced technological innovations transforming agro-ecosystems, crop health monitoring, and food safety standards.',
    topics: [
      'Precision Agriculture & Satellite-based Crop Phenotyping',
      'IoT Sensor Networks for Soil & Microclimate Analytics',
      'Drone Surveillance & Automated Weed / Disease Detection',
      'Post-Harvest Processing & Smart Supply Chain Tracking',
      'Genomics, Bioinformatics & Crop Breeding Modeling',
      'Hydroponics, Controlled-Environment Agriculture (CEA)',
    ],
    chairs: ['Prof. Md. Asaduzzaman (HSTU)', 'Dr. Kenji Takahashi (Kyoto Univ)'],
  },
  {
    id: 'track-3',
    number: 3,
    name: 'Renewable Energy, Smart Grids & Environmental Engineering',
    icon: 'Zap',
    description: 'Sustainable energy transitions, high-efficiency power electronics, and atmospheric/environmental conservation technologies.',
    topics: [
      'Solar Photovoltaic, Perovskite & Hybrid Cells',
      'Next-Gen Battery Storage & Energy Management Systems',
      'Smart Grid Stability, Microgrids & EV Infrastructure',
      'Carbon Capture, Climate Modeling & Remote Sensing',
      'Wastewater Treatment & Industrial Bio-Remediation',
      'Circular Economy & Electronic Waste Recycling',
    ],
    chairs: ['Dr. Fahmida Haque (HSTU)', 'Prof. David Sterling (Univ of Manchester)'],
  },
  {
    id: 'track-4',
    number: 4,
    name: 'IoT, Cybersecurity & Next-Gen Networking',
    icon: 'Shield',
    description: 'Resilient network architectures, cryptography, wireless protocols, and decentralized computing paradigms.',
    topics: [
      '5G/6G Wireless Communications & MIMO Standards',
      'Zero-Trust Cybersecurity & Threat Telemetry',
      'Blockchain, Distributed Ledgers & Smart Contracts',
      'Secure Cyber-Physical Systems (SCADA / Critical Infra)',
      'Cloud, Fog & Mobile Edge Computing Platforms',
      'Quantum Key Distribution & Post-Quantum Cryptography',
    ],
    chairs: ['Dr. SM Mahbubur Rahman (HSTU)', 'Prof. Sanjay Banerjee (IIT Kharagpur)'],
  },
  {
    id: 'track-5',
    number: 5,
    name: 'Biomedical Engineering & Health Informatics',
    icon: 'Activity',
    description: 'Cross-cutting computational medicine, wearable medical telemetry, diagnostics, and physiological signal modeling.',
    topics: [
      'Medical Image Analysis (MRI, CT, Histopathology AI)',
      'Wearable Biosensors & Continuous Health Monitoring',
      'Telemedicine, Electronic Health Record (EHR) Security',
      'Prosthetics, Neural Interfaces & Rehabilitation Tech',
      'Drug Discovery Acceleration via Graph Neural Networks',
      'Epidemiological Spread Modeling & Pandemic Preparedness',
    ],
    chairs: ['Dr. Nazrul Islam (HSTU)', 'Dr. Linda Van Der Meer (Erasmus MC)'],
  },
  {
    id: 'track-6',
    number: 6,
    name: 'Materials Science, Nanotech & Applied Sciences',
    icon: 'Sparkles',
    description: 'Fundamental and synthetic material discoveries, quantum devices, and industrial chemical synthesis techniques.',
    topics: [
      '2D Nanomaterials, Graphene & MXene Synthesis',
      'Semiconductor Device Physics & Optoelectronics',
      'Polymer Nanocomposites for Structural Engineering',
      'Computational Fluid Dynamics (CFD) & Solid Mechanics',
      'Catalysis & Green Chemical Synthesis Methods',
      'Acoustic, Ultrasonic & Laser Sensor Devices',
    ],
    chairs: ['Prof. Golam Sarwar (HSTU)', 'Dr. Arthur Pendelton (NUS Singapore)'],
  },
];

export const KEYNOTE_SPEAKERS: KeynoteSpeaker[] = [
  {
    id: 'spk-1',
    name: 'Prof. Dr. Hiroshi Tanaka',
    title: 'Director of Machine Intelligence & Robotics Institute',
    affiliation: 'Tokyo Institute of Technology, Japan',
    country: 'Japan',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    speechTitle: 'Embodied Physical AI: From Autonomous Micro-Drones to Deep Field Agricultural Robots',
    speechAbstract: 'Examining recent breakthroughs in transformer-driven visual-motor policies deployed across physical robotics in GPS-denied environments.',
    bio: 'IEEE Fellow, recipient of the 2024 Asian Robotics Pioneer Award, with over 200 high-impact papers and 30 international patents.',
  },
  {
    id: 'spk-2',
    name: 'Prof. Dr. Sarah Jenkins',
    title: 'Chair of Clean Energy Technologies',
    affiliation: 'Imperial College London, United Kingdom',
    country: 'United Kingdom',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    speechTitle: 'Decarbonizing Developing Megacities: Next-Gen Solid State Storage and Distributed Microgrids',
    speechAbstract: 'A holistic framework connecting intermittent renewable generation with regional distributed storage to stabilize municipal grid infrastructure.',
    bio: 'Lead Author for the IPCC Working Group III on Energy Systems, Senior Member of IEEE, and Chair of European Green Energy Taskforce.',
  },
  {
    id: 'spk-3',
    name: 'Prof. Dr. M. Rafiqul Islam',
    title: 'Professor & Dean of Engineering Sciences',
    affiliation: 'Hajee Mohammad Danesh Science and Technology University (HSTU)',
    country: 'Bangladesh',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    speechTitle: 'Empowering South Asian Academic Research: Bridging Classroom Theory and High-Impact Innovation',
    speechAbstract: 'Strategic imperatives for university-led research societies, international open-science partnerships, and ethical publication pipelines.',
    bio: 'Renowned researcher with 28 years of academic leadership, recipient of National Science & Technology Gold Medal, and Patron of HSTURS.',
  },
  {
    id: 'spk-4',
    name: 'Dr. Aris Thorne',
    title: 'Senior Principal Scientist & Head of Biomedical AI',
    affiliation: 'Broad Institute of MIT & Harvard, USA',
    country: 'United States',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    speechTitle: 'Graph Representation Learning for Precision Oncology and Rapid Vaccine Formulations',
    speechAbstract: 'How structural graph networks and generative foundation models are collapsing drug discovery timelines from years into weeks.',
    bio: 'Published in Nature Medicine and Science Robotics; co-founder of two computational biopharma startups.',
  },
];

export const CMT_SUBMISSION_STEPS = [
  {
    stepNumber: 1,
    title: 'Register or Sign In to Microsoft CMT',
    description: 'Visit the official Microsoft CMT portal for HSTU-ICSRIT 2026. Use your institutional email address (.edu / university domain) for seamless affiliation mapping.',
    tip: 'If you already have a Microsoft CMT account from other conferences, you can log in directly without registering a new profile.',
  },
  {
    stepNumber: 2,
    title: 'Check Conflict of Interest (COI)',
    description: 'Before creating a submission, navigate to your Author Profile on CMT and confirm your declared institutional domains, past co-authors, and advisor relationships.',
    tip: 'CMT automatically prevents conflicts from being assigned as your paper reviewers.',
  },
  {
    stepNumber: 3,
    title: 'Create Submission & Select Track',
    description: 'Click "+ Create new submission" and choose the exact Research Track (Tracks 1 through 6) matching your paper\'s primary contribution.',
    tip: 'Selecting the most accurate primary and secondary subject areas ensures optimal reviewer expertise.',
  },
  {
    stepNumber: 4,
    title: 'Anonymize Manuscript (Strict Double-Blind)',
    description: 'Ensure ALL author names, emails, affiliations, acknowledgments, and self-referencing citations (e.g., replace "our system [2]" with "the system in [2]") are removed.',
    tip: 'Also sanitize document PDF metadata (Title/Author fields) in Word / Acrobat before exporting.',
  },
  {
    stepNumber: 5,
    title: 'Upload PDF & Receive CMT Paper ID',
    description: 'Upload your IEEE-standard formatted PDF (6 to 8 pages, max 20MB). Submit and record your official 4-digit Paper ID (e.g., #0142) for future tracking.',
    tip: 'You can update and replace the uploaded file on CMT anytime prior to the July 25 deadline.',
  },
];

export const CMT_POLICIES = [
  {
    title: 'Strict Double-Blind Review Policy',
    category: 'Review Process',
    summary: 'Authors and reviewers are mutually anonymous throughout the evaluation cycle.',
    rules: [
      'Do NOT include author names, affiliations, or institutional contact details anywhere in the body or header.',
      'Omit funding acknowledgments or grant numbers in initial submission (these may be restored in the camera-ready version).',
      'Cite previous work in the third person: write "Smith et al. [1] previously demonstrated..." instead of "In our previous study [1]..."',
      'Clean PDF properties and metadata: ensure the author field in PDF document properties does not reveal the author name.',
    ],
  },
  {
    title: 'Plagiarism & Dual-Submission Rules',
    category: 'Academic Ethics',
    summary: 'Papers must present original, unpublished research not currently under review elsewhere.',
    rules: [
      'All submissions will be evaluated through Turnitin and IEEE CrossCheck / iThenticate screening.',
      'The overall similarity index must be strictly below 15%, with no single source exceeding 3%.',
      'Concurrent or simultaneous submission of identical or substantially overlapping manuscripts to other conferences or journals is strictly prohibited.',
      'Plagiarized submissions will trigger immediate desk rejection and an official notification to the author\'s institution.',
    ],
  },
  {
    title: 'Formatting & Length Specifications',
    category: 'Camera-Ready Requirements',
    summary: 'Standard IEEE Conference two-column layout on standard A4 / US Letter paper.',
    rules: [
      'Length: Minimum 6 pages, maximum 8 pages including all figures, tables, and bibliographic citations.',
      'Up to 2 additional pages may be purchased at registration time ($30 USD / ৳2,000 BDT per page).',
      'Fonts must be embedded in the PDF, with standard Type 1 or TrueType fonts.',
      'High-resolution figures (minimum 300 DPI for raster images, vector SVG/PDF preferred).',
    ],
  },
  {
    title: 'Registration & Presentation Mandate',
    category: 'Conference Policy',
    summary: 'Accepted papers require authenticated registration and scheduled presentation.',
    rules: [
      'At least one author must complete full registration by October 02, 2026.',
      'Each paper must be presented by an author during its assigned technical oral session (in-person or live hybrid virtual stream).',
      'Papers with "No-Show" status will be excluded from final inclusion in the digital library proceedings.',
    ],
  },
];

export const PREFLIGHT_CHECKLIST_ITEMS = [
  { id: 'blind', label: 'All author names and institutional affiliations have been removed from the title and header blocks.' },
  { id: 'meta', label: 'PDF file metadata properties (Author, Company, Title) have been cleared and sanitized.' },
  { id: 'cites', label: 'Self-citations are written strictly in the third person without self-identifying phrasing.' },
  { id: 'length', label: 'The paper is between 6 and 8 pages conforming to standard IEEE two-column format.' },
  { id: 'plag', label: 'The manuscript has been scanned for plagiarism and is verified to be under 15% similarity.' },
  { id: 'fonts', label: 'All fonts are embedded and figures are high resolution (≥ 300 DPI).' },
  { id: 'coi', label: 'I have logged into Microsoft CMT and verified that my Conflict of Interest (COI) domains are up to date.' },
  { id: 'single', label: 'This paper is not currently submitted, accepted, or under concurrent review at any other venue.' },
];

export const REGISTRATION_TIERS = [
  {
    id: 'reg-student-local',
    tierName: 'Student Author (Local)',
    price: '৳3,500 BDT',
    subtext: 'Requires valid student ID from recognized Bangladeshi institution',
    badge: 'Popular',
    includes: [
      '1 Accepted Paper in Proceedings',
      'Access to all Plenary & Technical Sessions',
      'Conference Kit, Lunch & Coffee Breaks (3 Days)',
      'Presentation Certificate & Proceedings Access',
      'Gala Dinner & Cultural Evening Ticket',
    ],
  },
  {
    id: 'reg-regular-local',
    tierName: 'Academic / Regular (Local)',
    price: '৳6,000 BDT',
    subtext: 'Faculty, university researchers & corporate delegates',
    badge: 'Standard',
    includes: [
      '1 Accepted Paper in Proceedings',
      'Full Access to all Sessions, Keynotes & Workshops',
      'Premium Conference Kit & Hardcopy Program Book',
      'Buffet Lunches, Refreshments & Gala Dinner',
      'Official Author Presentation Plaque / Certificate',
    ],
  },
  {
    id: 'reg-international',
    tierName: 'International Author',
    price: '$180 USD',
    subtext: 'Authors affiliated outside Bangladesh (Hybrid/In-person)',
    badge: 'Global',
    includes: [
      '1 Accepted Paper in Proceedings & Digital DOI',
      'Hybrid Virtual Oral Presentation Slot',
      'Digital Proceedings + High-Res Electronic Certificate',
      'In-person attendance & hospitality if traveling to venue',
      'Airport shuttle assistance from Syedpur Airport',
    ],
  },
  {
    id: 'reg-listener',
    tierName: 'Attendee / Listener (Non-Author)',
    price: '৳1,500 BDT / $40 USD',
    subtext: 'Students and researchers attending without paper presentation',
    badge: 'Open Access',
    includes: [
      'Access to Keynote Lectures & Technical Tracks',
      'Attendance Certificate & Program Schedule',
      'Lunch & Networking Refreshments',
      'Participation in Poster Sessions',
    ],
  },
];

export const PROGRAM_SCHEDULE = [
  {
    day: 'Day 1 — Friday, October 16, 2026',
    date: '2026-10-16',
    sessions: [
      { time: '08:30 – 09:30', title: 'Registration & Morning Welcome Coffee', venue: 'Auditorium Foyer' },
      { time: '09:30 – 11:00', title: 'Grand Inaugural Ceremony & Welcome Addresses', venue: 'Main Hall', highlight: 'Chief Patron Address & Conference Overview' },
      { time: '11:00 – 12:00', title: 'Keynote 1: Prof. Dr. Hiroshi Tanaka (Tokyo Tech)', venue: 'Main Hall', highlight: 'Embodied Physical AI in Agriculture & Industry' },
      { time: '12:00 – 13:30', title: 'Parallel Technical Session 1A (Track 1) & 1B (Track 2)', venue: 'Rooms A & B' },
      { time: '13:30 – 14:30', title: 'Networking Lunch & Poster Exhibition Opening', venue: 'Exhibition Hall' },
      { time: '14:30 – 16:30', title: 'Parallel Technical Session 2A (Track 3) & 2B (Track 4)', venue: 'Rooms A & B' },
      { time: '16:30 – 18:00', title: 'Industry-Academia Panel on Commercializing Research', venue: 'Main Hall' },
    ],
  },
  {
    day: 'Day 2 — Saturday, October 17, 2026',
    date: '2026-10-17',
    sessions: [
      { time: '09:00 – 10:00', title: 'Keynote 2: Prof. Dr. Sarah Jenkins (Imperial College)', venue: 'Main Hall', highlight: 'Decarbonizing Energy Systems & Microgrids' },
      { time: '10:00 – 11:30', title: 'Technical Session 3A (Track 5: Biomedical) & 3B (Track 6)', venue: 'Rooms A & B' },
      { time: '11:30 – 12:00', title: 'Tea Break & Interactive Poster Presentations', venue: 'Exhibition Hall' },
      { time: '12:00 – 13:00', title: 'Keynote 3: Dr. Aris Thorne (MIT / Harvard)', venue: 'Main Hall', highlight: 'Graph Neural Networks in Precision Medicine' },
      { time: '13:00 – 14:00', title: 'Buffet Lunch & Research Society Fellowship Meet', venue: 'Dining Hall' },
      { time: '14:00 – 16:00', title: 'Hybrid Virtual Technical Presentations (Global Authors)', venue: 'Virtual Room 1 & 2' },
      { time: '18:30 – 21:00', title: 'Grand Cultural Banquet & Gala Dinner', venue: 'HSTU Botanical Lawn' },
    ],
  },
  {
    day: 'Day 3 — Sunday, October 18, 2026',
    date: '2026-10-18',
    sessions: [
      { time: '09:30 – 10:30', title: 'Keynote 4: Prof. Dr. M. Rafiqul Islam (HSTU Patron)', venue: 'Main Hall' },
      { time: '10:30 – 12:30', title: 'Best Paper Presentation Finals (Top Ranked Submissions)', venue: 'Main Hall', highlight: 'Chaired by International Advisory Board' },
      { time: '12:30 – 13:30', title: 'Lunch Break & Networking', venue: 'Dining Hall' },
      { time: '13:30 – 15:30', title: 'Valedictory Session, Best Paper Awards & Series Closing', venue: 'Main Hall', highlight: 'Announcement of HSTU-ICSRIT 2027 Host Committee' },
    ],
  },
];

export const COMMITTEE_MEMBERS = {
  chiefPatron: {
    name: 'Prof. Dr. M. Kamruzzaman',
    title: 'Honorable Vice-Chancellor',
    affiliation: 'Hajee Mohammad Danesh Science and Technology University (HSTU)',
  },
  generalChairs: [
    {
      name: 'Prof. Dr. Md. Tariqul Hasan',
      title: 'Professor & Dean',
      affiliation: 'Faculty of Computer Science and Engineering, HSTU',
    },
    {
      name: 'Prof. Dr. Eleanor Vance',
      title: 'Distinguished Professor',
      affiliation: 'School of Electrical & Computer Engineering, Univ of Sydney',
    },
  ],
  tpcChairs: [
    {
      name: 'Dr. SM Mahbubur Rahman',
      title: 'Associate Professor & Research Chair',
      affiliation: 'HSTU Research Society / Dept of CSE',
    },
    {
      name: 'Dr. Klaus Weidmann',
      title: 'Principal Research Scientist',
      affiliation: 'Max Planck Institute for Informatics, Germany',
    },
  ],
  cmtManagers: [
    {
      name: 'Engr. K. M. Saiful Islam',
      title: 'Microsoft CMT Administrator & Lead Tech Chair',
      affiliation: 'HSTU Research Society',
      email: 'cmt-admin@hsturs.org',
    },
    {
      name: 'Ms. Nusrat Jahan',
      title: 'Peer Review & Plagiarism Audit Coordinator',
      affiliation: 'HSTU Research Society',
      email: 'audit@hsturs.org',
    },
  ],
};
