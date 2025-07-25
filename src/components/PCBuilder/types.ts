// Type definitions for PC Builder form data and validation

export interface PCBuildFormData {
  // Step 1: Budget & Primary Use
  budget: {
    min: number;
    max: number;
  };
  primaryUse: string[];
  
  // Step 2: Performance Requirements
  gamingPerformance?: {
    targetFPS: number;
    resolution: string;
    games: string[];
  };
  workloadRequirements?: {
    software: string[];
    multitasking: boolean;
    renderingNeeds: boolean;
  };
  
  // Step 3: Component Preferences
  preferredBrands: {
    cpu: string[];
    gpu: string[];
    motherboard: string[];
    ram: string[];
    storage: string[];
    psu: string[];
    case: string[];
  };
  
  // Step 4: System Preferences
  formFactor: string;
  noiseLevel: string;
  powerEfficiency: string;
  upgradePath: boolean;
  rgbLighting: string;
  
  // Step 5: Peripherals & Extras
  peripheralNeeds: {
    monitor: boolean;
    keyboard: boolean;
    mouse: boolean;
    headset: boolean;
    speakers: boolean;
    webcam: boolean;
    vr: boolean;
  };
  
  // Step 6: Special Requirements
  specialRequirements: string[];
  additionalNotes: string;
  
  // User Information (optional)
  email?: string;
  experienceLevel: string;
}

export interface FormStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ComponentRecommendation {
  category: string;
  name: string;
  brand: string;
  price: number;
  performance: number;
  reason: string;
}

export interface PCBuildResult {
  totalPrice: number;
  components: ComponentRecommendation[];
  performanceScore: number;
  compatibilityScore: number;
  valueScore: number;
  warnings: string[];
  alternatives: ComponentRecommendation[];
}