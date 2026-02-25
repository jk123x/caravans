export type TierName = "weekender" | "tourer" | "fulltimer";

export interface QuizAnswers {
  q1: number;
  q2: number;
  q3: number;
  q4: number[];
  q5: number;
  q6: number;
  q7: number;
  q8: number[];
}

export interface QuizResult {
  tier: TierName;
  tierLabel: string;
  headline: string;
  copy: string;
  system: string[];
  budget: string;
  dailyWh: number;
  sunHours: string;
  concernNote: string;
  existingSetupNote: string;
  budgetNote: string;
  hasAirCon: boolean;
}

// --- Question data ---

export interface QuizOption {
  label: string;
  value: number;
}

export interface QuizQuestion {
  id: keyof QuizAnswers;
  title: string;
  subtitle?: string;
  multiSelect?: boolean;
  options: QuizOption[];
}

export const questions: QuizQuestion[] = [
  {
    id: "q1",
    title: "What type of caravan do you have?",
    options: [
      { label: "Popup camper / camper trailer", value: 0 },
      { label: "Standard caravan (under 20ft)", value: 1 },
      { label: "Large caravan (20ft+) or fifth wheeler", value: 2 },
      { label: "Motorhome / bus conversion", value: 3 },
    ],
  },
  {
    id: "q2",
    title: "How do you mainly travel?",
    options: [
      { label: "Weekends and long weekends", value: 1 },
      { label: "Week-long trips, a few times a year", value: 2 },
      { label: "Months at a time (big trips, grey nomad lifestyle)", value: 3 },
      { label: "Full-time on the road", value: 4 },
    ],
  },
  {
    id: "q3",
    title: "What's your camping style?",
    options: [
      { label: "Mostly caravan parks (powered sites)", value: 0 },
      { label: "Mix of parks and free camping", value: 1 },
      { label: "Mostly free camping", value: 2 },
      { label: "Off-grid as much as possible", value: 3 },
    ],
  },
  {
    id: "q4",
    title: "Which appliances do you need to run off-grid?",
    subtitle: "Select all that apply",
    multiSelect: true,
    options: [
      { label: "Fridge (compressor, 12V)", value: 0 },
      { label: "LED lights", value: 1 },
      { label: "Phone/tablet chargers", value: 2 },
      { label: "TV (12V)", value: 3 },
      { label: "Laptop", value: 4 },
      { label: "Diesel heater", value: 5 },
      { label: "CPAP machine", value: 6 },
      { label: "Coffee machine (via inverter)", value: 7 },
      { label: "Microwave (via inverter)", value: 8 },
      { label: "Hair dryer (via inverter)", value: 9 },
      { label: "Air conditioning", value: 10 },
    ],
  },
  {
    id: "q5",
    title: "Do you already have any solar or battery setup?",
    options: [
      { label: "Nothing \u2014 starting from scratch", value: 0 },
      { label: "Basic factory setup (small AGM battery, maybe a small panel)", value: 1 },
      { label: "Some aftermarket upgrades but it's not enough", value: 2 },
      { label: "Full system that's not performing well", value: 3 },
    ],
  },
  {
    id: "q6",
    title: "What's your biggest concern?",
    options: [
      { label: "Wasting money on the wrong gear", value: 0 },
      { label: "Not having enough power off-grid", value: 1 },
      { label: "The wiring and installation side of things", value: 2 },
      { label: "Understanding what I actually need (I'm overwhelmed)", value: 3 },
    ],
  },
  {
    id: "q7",
    title: "What's your budget range for the full solar system?",
    options: [
      { label: "Under $2,000", value: 0 },
      { label: "$2,000 \u2013 $5,000", value: 1 },
      { label: "$5,000 \u2013 $10,000", value: 2 },
      { label: "Whatever it takes to get it right", value: 3 },
    ],
  },
  {
    id: "q8",
    title: "Where in Australia do you mainly travel?",
    subtitle: "Select all that apply",
    multiSelect: true,
    options: [
      { label: "Northern Australia (NT, Top End, FNQ)", value: 0 },
      { label: "Central Australia (Red Centre, Outback)", value: 1 },
      { label: "Eastern seaboard (QLD, NSW, VIC coast)", value: 2 },
      { label: "Western Australia", value: 3 },
      { label: "South Australia", value: 4 },
      { label: "Tasmania", value: 5 },
      { label: "All over (doing a lap!)", value: 6 },
    ],
  },
];

// --- Scoring ---

const applianceWh: Record<number, number> = {
  0: 1440, // Fridge
  1: 150,  // LED lights
  2: 90,   // Phone/tablet chargers
  3: 180,  // TV
  4: 130,  // Laptop
  5: 180,  // Diesel heater
  6: 360,  // CPAP
  7: 150,  // Coffee machine
  8: 200,  // Microwave
  9: 200,  // Hair dryer
  10: 8000, // Air conditioning
};

const sunHoursMap: Record<number, number> = {
  0: 5.75, // Northern
  1: 6.25, // Central
  2: 4.75, // Eastern seaboard
  3: 5.25, // WA
  4: 5.25, // SA
  5: 3.75, // Tassie
  6: 5.0,  // All over
};

export function calculateDailyWh(appliances: number[]): number {
  return appliances.reduce((sum, id) => sum + (applianceWh[id] || 0), 0);
}

export function hasAirConditioning(appliances: number[]): boolean {
  return appliances.includes(10);
}

export function calculateTier(q2Score: number, q3Score: number): TierName {
  const total = q2Score + q3Score;
  if (total <= 2) return "weekender";
  if (total <= 5) return "tourer";
  return "fulltimer";
}

export function calculateSunHours(regions: number[]): string {
  if (regions.length === 0) return "5.0";
  if (regions.includes(6)) return "5.0"; // "All over"
  const avg = regions.reduce((sum, r) => sum + (sunHoursMap[r] || 5.0), 0) / regions.length;
  return avg.toFixed(1);
}

// --- Concern copy ---

const concernNotes: Record<number, string> = {
  0: "The guide's brand comparison tables and shopping lists make sure every dollar goes to the right gear.",
  1: "The power audit worksheet and system sizing tools make sure your setup keeps up with your actual usage.",
  2: "The guide covers the decisions, not the installation. But you'll know exactly what to brief an installer on.",
  3: "The guide walks through every decision step by step. No background knowledge needed.",
};

// --- Existing setup copy ---

const existingSetupNotes: Record<number, string> = {
  0: "You're starting fresh, which is actually the easiest position. No compromises, no working around old gear.",
  1: "Your factory setup is a starting point. The guide shows you what to keep and what to replace.",
  2: "You've got some pieces in place. The guide helps you identify the gaps and fill them properly.",
  3: "If your system isn't performing, the guide's sizing worksheets will show you exactly what's undersized.",
};

// --- Budget copy ---

const budgetNotes: Record<number, string> = {
  0: "At this budget, Renogy and Enerdrive give you the best value. The guide's shopping lists have specific recommendations.",
  1: "This is the sweet spot. You've got room for quality components without overspending. The guide covers your best options.",
  2: "You can go premium here. The guide compares Victron and REDARC so you know exactly where the extra money goes.",
  3: "With budget flexibility, the guide helps you invest where it matters and avoid paying for features you won't use.",
};

// --- Tier results ---

const tierResults: Record<TierName, { label: string; headline: string; copy: string; system: string[]; budget: string }> = {
  weekender: {
    label: "Weekender",
    headline: "You're a Weekender",
    copy: "Good news. Your setup is straightforward. A modest solar panel and a decent lithium battery will keep you comfortable for 2-3 nights off-grid. The DC-DC charger tops you up on driving days. This is the most cost-effective tier to get right.",
    system: [
      "200W fixed solar panel",
      "100-200Ah lithium battery",
      "PWM or 20A MPPT charge controller",
      "20A DC-DC charger",
      "1000W pure sine wave inverter (optional)",
      "Battery monitor",
    ],
    budget: "$1,500 \u2013 $2,500",
  },
  tourer: {
    label: "Tourer",
    headline: "You're a Regular Tourer",
    copy: "This is the sweet spot for most Australian caravanners. Enough solar and battery to free camp indefinitely in good weather, with a portable panel for flexibility. The 2000W inverter runs everything except heavy appliances like air con.",
    system: [
      "300-400W fixed solar + 160-200W portable panel",
      "200-300Ah lithium battery",
      "30-40A MPPT charge controller",
      "40A DC-DC charger",
      "2000W pure sine wave inverter",
      "Bluetooth battery monitor",
    ],
    budget: "$3,000 \u2013 $5,000",
  },
  fulltimer: {
    label: "Full-timer",
    headline: "You're a Full-timer",
    copy: "You need a serious system for full-time living. The good news is it's a solved problem. Plenty of full-timers run exactly this setup across Australia. The 3000W inverter handles your microwave and coffee machine (one at a time), and 400W+ of solar keeps the batteries topped up.",
    system: [
      "400-600W fixed solar + 200W+ portable panel",
      "300-400Ah lithium battery",
      "40-50A MPPT charge controller",
      "40-60A DC-DC charger",
      "3000W pure sine wave inverter",
      "Bluetooth battery monitor with history",
    ],
    budget: "$5,000 \u2013 $8,000+",
  },
};

// --- Main result calculator ---

export function calculateResult(answers: QuizAnswers): QuizResult {
  const tier = calculateTier(answers.q2, answers.q3);
  const dailyWh = calculateDailyWh(answers.q4);
  const airCon = hasAirConditioning(answers.q4);
  const sunHours = calculateSunHours(answers.q8);
  const result = tierResults[tier];

  return {
    tier,
    tierLabel: result.label,
    headline: result.headline,
    copy: result.copy,
    system: result.system,
    budget: result.budget,
    dailyWh,
    sunHours,
    concernNote: concernNotes[answers.q6] || "",
    existingSetupNote: existingSetupNotes[answers.q5] || "",
    budgetNote: budgetNotes[answers.q7] || "",
    hasAirCon: airCon,
  };
}

// --- Kit tag helpers ---

const concernTags: Record<number, string> = {
  0: "concern:wasting-money",
  1: "concern:not-enough-power",
  2: "concern:wiring",
  3: "concern:overwhelmed",
};

export function getQuizTags(answers: QuizAnswers): string[] {
  const tier = calculateTier(answers.q2, answers.q3);
  return [
    "source:quiz",
    `tier:${tier}`,
    concernTags[answers.q6] || "",
  ].filter(Boolean);
}
