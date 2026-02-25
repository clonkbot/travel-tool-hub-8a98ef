export interface CountryData {
  name: string;
  code: string;
  currency: string;
  rent: {
    room: [number, number];
    studio: [number, number];
    "1br": [number, number];
    "2br": [number, number];
  };
  food: {
    budget: [number, number];
    comfortable: [number, number];
    premium: [number, number];
  };
  transport: [number, number];
  utilities: [number, number];
  internet: [number, number];
  health: [number, number];
  fun: {
    budget: [number, number];
    comfortable: [number, number];
    premium: [number, number];
  };
  confidence: "low" | "medium" | "high";
}

export const costData: Record<string, CountryData> = {
  thailand: {
    name: "Thailand",
    code: "TH",
    currency: "USD",
    rent: {
      room: [150, 300],
      studio: [300, 500],
      "1br": [400, 800],
      "2br": [600, 1200],
    },
    food: {
      budget: [150, 250],
      comfortable: [300, 450],
      premium: [500, 800],
    },
    transport: [30, 100],
    utilities: [30, 80],
    internet: [20, 40],
    health: [50, 150],
    fun: {
      budget: [50, 100],
      comfortable: [150, 300],
      premium: [400, 800],
    },
    confidence: "high",
  },
  vietnam: {
    name: "Vietnam",
    code: "VN",
    currency: "USD",
    rent: {
      room: [100, 200],
      studio: [200, 400],
      "1br": [350, 600],
      "2br": [500, 900],
    },
    food: {
      budget: [100, 200],
      comfortable: [250, 400],
      premium: [450, 700],
    },
    transport: [20, 60],
    utilities: [25, 60],
    internet: [15, 30],
    health: [40, 120],
    fun: {
      budget: [40, 80],
      comfortable: [120, 250],
      premium: [350, 600],
    },
    confidence: "high",
  },
  portugal: {
    name: "Portugal",
    code: "PT",
    currency: "USD",
    rent: {
      room: [400, 600],
      studio: [600, 900],
      "1br": [800, 1300],
      "2br": [1100, 1800],
    },
    food: {
      budget: [200, 350],
      comfortable: [400, 600],
      premium: [700, 1000],
    },
    transport: [40, 80],
    utilities: [80, 150],
    internet: [30, 50],
    health: [80, 200],
    fun: {
      budget: [80, 150],
      comfortable: [200, 400],
      premium: [500, 900],
    },
    confidence: "high",
  },
  spain: {
    name: "Spain",
    code: "ES",
    currency: "USD",
    rent: {
      room: [350, 550],
      studio: [550, 850],
      "1br": [750, 1200],
      "2br": [1000, 1700],
    },
    food: {
      budget: [200, 350],
      comfortable: [400, 600],
      premium: [700, 1000],
    },
    transport: [50, 100],
    utilities: [80, 150],
    internet: [30, 50],
    health: [80, 200],
    fun: {
      budget: [100, 180],
      comfortable: [250, 450],
      premium: [550, 950],
    },
    confidence: "high",
  },
  mexico: {
    name: "Mexico",
    code: "MX",
    currency: "USD",
    rent: {
      room: [200, 350],
      studio: [350, 550],
      "1br": [500, 900],
      "2br": [700, 1300],
    },
    food: {
      budget: [150, 280],
      comfortable: [320, 500],
      premium: [550, 850],
    },
    transport: [30, 80],
    utilities: [40, 90],
    internet: [25, 45],
    health: [50, 150],
    fun: {
      budget: [60, 120],
      comfortable: [180, 350],
      premium: [450, 800],
    },
    confidence: "high",
  },
  canada: {
    name: "Canada",
    code: "CA",
    currency: "USD",
    rent: {
      room: [600, 900],
      studio: [1000, 1500],
      "1br": [1400, 2200],
      "2br": [1800, 3000],
    },
    food: {
      budget: [300, 450],
      comfortable: [500, 750],
      premium: [850, 1200],
    },
    transport: [80, 150],
    utilities: [100, 200],
    internet: [50, 80],
    health: [100, 250],
    fun: {
      budget: [100, 200],
      comfortable: [300, 500],
      premium: [600, 1000],
    },
    confidence: "high",
  },
  japan: {
    name: "Japan",
    code: "JP",
    currency: "USD",
    rent: {
      room: [400, 600],
      studio: [600, 1000],
      "1br": [900, 1500],
      "2br": [1300, 2200],
    },
    food: {
      budget: [250, 400],
      comfortable: [450, 700],
      premium: [800, 1200],
    },
    transport: [80, 150],
    utilities: [80, 150],
    internet: [40, 60],
    health: [80, 200],
    fun: {
      budget: [80, 150],
      comfortable: [250, 450],
      premium: [550, 950],
    },
    confidence: "high",
  },
  uae: {
    name: "UAE",
    code: "AE",
    currency: "USD",
    rent: {
      room: [500, 800],
      studio: [900, 1400],
      "1br": [1300, 2000],
      "2br": [1800, 3000],
    },
    food: {
      budget: [300, 500],
      comfortable: [550, 850],
      premium: [950, 1400],
    },
    transport: [100, 200],
    utilities: [100, 200],
    internet: [60, 100],
    health: [150, 350],
    fun: {
      budget: [150, 300],
      comfortable: [400, 700],
      premium: [900, 1500],
    },
    confidence: "medium",
  },
  estonia: {
    name: "Estonia",
    code: "EE",
    currency: "USD",
    rent: {
      room: [300, 450],
      studio: [450, 700],
      "1br": [650, 1000],
      "2br": [900, 1400],
    },
    food: {
      budget: [200, 320],
      comfortable: [380, 550],
      premium: [650, 900],
    },
    transport: [40, 80],
    utilities: [100, 180],
    internet: [25, 45],
    health: [60, 150],
    fun: {
      budget: [70, 140],
      comfortable: [200, 380],
      premium: [480, 800],
    },
    confidence: "medium",
  },
  indonesia: {
    name: "Indonesia",
    code: "ID",
    currency: "USD",
    rent: {
      room: [100, 200],
      studio: [200, 400],
      "1br": [300, 600],
      "2br": [450, 900],
    },
    food: {
      budget: [100, 180],
      comfortable: [220, 380],
      premium: [420, 700],
    },
    transport: [20, 50],
    utilities: [30, 70],
    internet: [20, 40],
    health: [40, 120],
    fun: {
      budget: [50, 100],
      comfortable: [150, 300],
      premium: [400, 750],
    },
    confidence: "high",
  },
  colombia: {
    name: "Colombia",
    code: "CO",
    currency: "USD",
    rent: {
      room: [150, 280],
      studio: [280, 450],
      "1br": [400, 700],
      "2br": [600, 1100],
    },
    food: {
      budget: [120, 220],
      comfortable: [280, 450],
      premium: [500, 800],
    },
    transport: [25, 60],
    utilities: [40, 90],
    internet: [25, 45],
    health: [50, 140],
    fun: {
      budget: [60, 120],
      comfortable: [180, 350],
      premium: [450, 800],
    },
    confidence: "medium",
  },
  germany: {
    name: "Germany",
    code: "DE",
    currency: "USD",
    rent: {
      room: [500, 750],
      studio: [750, 1100],
      "1br": [1000, 1600],
      "2br": [1400, 2200],
    },
    food: {
      budget: [250, 400],
      comfortable: [450, 700],
      premium: [800, 1150],
    },
    transport: [80, 130],
    utilities: [150, 250],
    internet: [35, 55],
    health: [200, 400],
    fun: {
      budget: [100, 200],
      comfortable: [280, 500],
      premium: [600, 1000],
    },
    confidence: "high",
  },
};

export const dataVersion = "1.0.0";

export type Lifestyle = "budget" | "comfortable" | "premium";
export type HousingType = "room" | "studio" | "1br" | "2br";
export type TravelerType = "solo" | "couple";
export type WorkStyle = "remote" | "local" | "student";

export interface CostBreakdown {
  rent: number;
  food: number;
  transport: number;
  utilities: number;
  internet: number;
  health: number;
  fun: number;
  total: number;
}

export function calculateCosts(
  country: string,
  lifestyle: Lifestyle,
  stayLength: number,
  housingType: HousingType,
  travelerType: TravelerType,
  _workStyle: WorkStyle
): CostBreakdown {
  const data = costData[country.toLowerCase()];
  if (!data) {
    throw new Error("Country not found");
  }

  const lifestyleMultiplier = {
    budget: 0.85,
    comfortable: 1.0,
    premium: 1.35,
  }[lifestyle];

  const getMidpoint = (range: [number, number]) => (range[0] + range[1]) / 2;

  // Base calculations
  let rent = getMidpoint(data.rent[housingType]);
  let food = getMidpoint(data.food[lifestyle]);
  let transport = getMidpoint(data.transport);
  let utilities = getMidpoint(data.utilities);
  let internet = getMidpoint(data.internet);
  let health = getMidpoint(data.health);
  let fun = getMidpoint(data.fun[lifestyle]);

  // Short-term premium for rent (1-2 months)
  if (stayLength <= 2) {
    rent *= 1.1;
  }

  // Couple adjustments
  if (travelerType === "couple") {
    food *= 1.65;
    fun *= 1.65;
    transport *= 1.25;
  }

  // Apply lifestyle multiplier to variable costs
  food *= lifestyleMultiplier;
  fun *= lifestyleMultiplier;

  const breakdown: CostBreakdown = {
    rent: Math.round(rent),
    food: Math.round(food),
    transport: Math.round(transport),
    utilities: Math.round(utilities),
    internet: Math.round(internet),
    health: Math.round(health),
    fun: Math.round(fun),
    total: 0,
  };

  breakdown.total =
    breakdown.rent +
    breakdown.food +
    breakdown.transport +
    breakdown.utilities +
    breakdown.internet +
    breakdown.health +
    breakdown.fun;

  return breakdown;
}
