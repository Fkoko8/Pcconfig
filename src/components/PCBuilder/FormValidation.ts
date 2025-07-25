// Form validation utilities with security measures

import { ValidationError, PCBuildFormData } from './types';

// Input sanitization to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 1000); // Limit length to prevent DoS
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate budget range
export const validateBudget = (min: number, max: number): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (min < 300) {
    errors.push({
      field: 'budget.min',
      message: 'Minimum budget should be at least $300'
    });
  }
  
  if (max > 50000) {
    errors.push({
      field: 'budget.max',
      message: 'Maximum budget seems unrealistic. Please contact us for enterprise builds.'
    });
  }
  
  if (min >= max) {
    errors.push({
      field: 'budget',
      message: 'Maximum budget must be higher than minimum budget'
    });
  }
  
  return errors;
};

// Validate step 1 - Budget & Primary Use
export const validateStep1 = (data: Partial<PCBuildFormData>): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (!data.budget) {
    errors.push({
      field: 'budget',
      message: 'Budget range is required'
    });
  } else {
    errors.push(...validateBudget(data.budget.min, data.budget.max));
  }
  
  if (!data.primaryUse || data.primaryUse.length === 0) {
    errors.push({
      field: 'primaryUse',
      message: 'Please select at least one primary use case'
    });
  }
  
  return errors;
};

// Validate step 2 - Performance Requirements
export const validateStep2 = (data: Partial<PCBuildFormData>): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (data.primaryUse?.includes('gaming') && !data.gamingPerformance) {
    errors.push({
      field: 'gamingPerformance',
      message: 'Gaming performance requirements are needed for gaming builds'
    });
  }
  
  if (data.gamingPerformance?.targetFPS && (data.gamingPerformance.targetFPS < 30 || data.gamingPerformance.targetFPS > 240)) {
    errors.push({
      field: 'gamingPerformance.targetFPS',
      message: 'Target FPS should be between 30 and 240'
    });
  }
  
  return errors;
};

// Validate step 6 - Contact Information
export const validateStep6 = (data: Partial<PCBuildFormData>): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (data.email && !isValidEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Please enter a valid email address'
    });
  }
  
  if (!data.experienceLevel) {
    errors.push({
      field: 'experienceLevel',
      message: 'Please select your PC building experience level'
    });
  }
  
  // Sanitize text inputs
  if (data.additionalNotes) {
    data.additionalNotes = sanitizeInput(data.additionalNotes);
  }
  
  return errors;
};

// Main validation function
export const validateFormData = (data: Partial<PCBuildFormData>, step: number): ValidationError[] => {
  switch (step) {
    case 1:
      return validateStep1(data);
    case 2:
      return validateStep2(data);
    case 3:
    case 4:
    case 5:
      return []; // No validation required for these steps
    case 6:
      return validateStep6(data);
    default:
      return [];
  }
};

// Rate limiting helper (for client-side protection)
export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  const requests: number[] = [];
  
  return (): boolean => {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Remove old requests
    while (requests.length > 0 && requests[0] < windowStart) {
      requests.shift();
    }
    
    if (requests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }
    
    requests.push(now);
    return true;
  };
};