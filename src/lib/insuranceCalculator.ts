// Insurance calculator logic for eligibility and premium

export interface InsuranceResult {
  eligible: boolean;
  premium: number | null;
  reason?: string;
}

export interface UserProfile {
  uid?: string;
  name: string;
  age: number;
  email?: string;
  phone?: string;
  weight: number;
  height: number;
  smoker: boolean;
  chronicDiseases?: string[];
}

export function calculateInsurance(profile: UserProfile): InsuranceResult {
  // Example rules (customize as needed)
  if (!profile.age || !profile.weight || !profile.height) {
    return { eligible: false, premium: null, reason: "Incomplete health data" };
  }
  const bmi = profile.weight / ((profile.height / 100) ** 2);
  if (profile.smoker || (profile.chronicDiseases && profile.chronicDiseases.length > 0)) {
    return { eligible: false, premium: null, reason: "High risk: smoker or chronic disease" };
  }
  if (bmi < 18.5 || bmi > 30) {
    return { eligible: false, premium: null, reason: "BMI not in eligible range (18.5-30)" };
  }
  // Calculate premium based on age and BMI
  let premium = 5000;
  if (profile.age > 40) premium += 2000;
  if (bmi > 25) premium += 1000;
  return { eligible: true, premium };
}
