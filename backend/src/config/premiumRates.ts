
export const PREMIUM_RATES = {
  HEALTH: 1.5,
  MOTOR: 2.0,
  FIRE: 0.15,
  MARINE: 0.25,
  ENGINEERING: 0.5,
  TRAVEL: 0.75,
  LIFE: 0.8,
  OTHER: 1.0,
} as const;

export const MINIMUM_PREMIUM = 500;

export const calculatePremium = (
  coverageAmount: number,
  insuranceType: keyof typeof PREMIUM_RATES
) => {
  const rate = PREMIUM_RATES[insuranceType];

  const calculatedPremium = (coverageAmount * rate) / 100;

  return {
    coverageAmount,
    rate,
    calculatedPremium: Math.max(
      calculatedPremium,
      MINIMUM_PREMIUM
    ),
    minimumPremium: MINIMUM_PREMIUM,
  };
};
