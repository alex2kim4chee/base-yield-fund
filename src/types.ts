export type RiskTier = 'Conservative' | 'Moderate' | 'Elevated' | 'Active';

export interface ProtocolInfo {
  id: string;
  name: string;
  strategy: string;
  expectedApy: number;
  tvl: string;
  riskTier: RiskTier;
  badgeColor: string;
  textColor: string;
  logoUrl?: string;
  description: string;
}

export interface BlendedAllocation {
  percentage: number;
  protocolName: string;
  apy: number;
  role: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type RiskProfileType = 'conservative' | 'balanced' | 'growth';

export interface RiskProfileData {
  name: string;
  description: string;
  expectedApyRange: [number, number];
  allocations: BlendedAllocation[];
  riskDiscussions: string;
}
