import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Cpu, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

import { PCBuildFormData, FormStep, ValidationError } from './types';
import { FormStepIndicator } from './FormStepIndicator';
import { validateFormData, createRateLimiter } from './FormValidation';

import { Step1BudgetAndUse } from './steps/Step1BudgetAndUse';
import { Step2Performance } from './steps/Step2Performance';
import { Step3Preferences } from './steps/Step3Preferences';
import { Step4Peripherals } from './steps/Step4Peripherals';
import { Step5Summary } from './steps/Step5Summary';

interface PCBuilderWizardProps {
  onComplete?: (data: PCBuildFormData) => void;
  onBack?: () => void;
  className?: string;
}

const TOTAL_STEPS = 5;

// Rate limiter for form submissions (max 3 submissions per minute)
const submitRateLimit = createRateLimiter(3, 60000);

export const PCBuilderWizard: React.FC<PCBuilderWizardProps> = ({
  onComplete,
  onBack,
  className
}) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<PCBuildFormData>>({});
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize steps
  const [steps, setSteps] = useState<FormStep[]>([
    { id: 1, title: 'Budget & Use', description: 'Budget and primary use cases', isCompleted: false, isActive: true },
    { id: 2, title: 'Performance', description: 'Performance requirements', isCompleted: false, isActive: false },
    { id: 3, title: 'Preferences', description: 'Component preferences', isCompleted: false, isActive: false },
    { id: 4, title: 'Peripherals', description: 'Accessories and extras', isCompleted: false, isActive: false },
    { id: 5, title: 'Summary', description: 'Review and submit', isCompleted: false, isActive: false }
  ]);

  // Update step states when current step changes
  useEffect(() => {
    setSteps(prevSteps => 
      prevSteps.map(step => ({
        ...step,
        isActive: step.id === currentStep,
        isCompleted: step.id < currentStep
      }))
    );
  }, [currentStep]);

  // Save form data to localStorage for persistence
  useEffect(() => {
    try {
      localStorage.setItem('pcBuilderFormData', JSON.stringify(formData));
    } catch (error) {
      console.warn('Failed to save form data to localStorage:', error);
    }
  }, [formData]);

  // Load saved form data on component mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('pcBuilderFormData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        toast({
          title: "Progress Restored",
          description: "Your previous progress has been restored.",
          duration: 3000,
        });
      }
    } catch (error) {
      console.warn('Failed to load saved form data:', error);
    }
  }, []);

  const updateFormData = useCallback((newData: Partial<PCBuildFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
    // Clear validation errors when data is updated
    setValidationErrors([]);
  }, []);

  const validateCurrentStep = useCallback(() => {
    const errors = validateFormData(formData, currentStep);
    setValidationErrors(errors);
    return errors.length === 0;
  }, [formData, currentStep]);

  const goToNextStep = useCallback(() => {
    if (!validateCurrentStep()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
      // Scroll to top of the wizard
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, validateCurrentStep, toast]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setValidationErrors([]);
      // Scroll to top of the wizard
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  const handleSubmit = useCallback(async () => {
    // Rate limiting check
    if (!submitRateLimit()) {
      toast({
        title: "Rate Limit Exceeded",
        description: "Please wait before submitting again.",
        variant: "destructive",
      });
      return;
    }

    if (!validateCurrentStep()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear saved data on successful submission
      localStorage.removeItem('pcBuilderFormData');

      toast({
        title: "Success! 🎉",
        description: "Your PC build recommendations are being generated. Check your email shortly!",
        duration: 5000,
      });

      // Call the completion callback if provided
      if (onComplete) {
        onComplete(formData as PCBuildFormData);
      }

    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateCurrentStep, onComplete, toast]);

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BudgetAndUse
            data={formData}
            onUpdate={updateFormData}
            onNext={goToNextStep}
          />
        );
      case 2:
        return (
          <Step2Performance
            data={formData}
            onUpdate={updateFormData}
            onNext={goToNextStep}
            onPrev={goToPreviousStep}
          />
        );
      case 3:
        return (
          <Step3Preferences
            data={formData}
            onUpdate={updateFormData}
            onNext={goToNextStep}
            onPrev={goToPreviousStep}
          />
        );
      case 4:
        return (
          <Step4Peripherals
            data={formData}
            onUpdate={updateFormData}
            onNext={goToNextStep}
            onPrev={goToPreviousStep}
          />
        );
      case 5:
        return (
          <Step5Summary
            data={formData}
            onUpdate={updateFormData}
            onSubmit={handleSubmit}
            onPrev={goToPreviousStep}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button
                  onClick={onBack}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              )}
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">PC Builder Wizard</h1>
                  <p className="text-sm text-muted-foreground">Step {currentStep} of {TOTAL_STEPS}</p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-muted-foreground">Progress</div>
              <div className="text-lg font-semibold text-primary">{Math.round(progress)}%</div>
            </div>
          </div>

          {/* Progress Bar */}
          <Progress value={progress} className="h-2 mb-4" />

          {/* Step Indicator */}
          <FormStepIndicator steps={steps} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <Card className="mb-6 border-destructive bg-destructive/10">
              <CardContent className="p-4">
                <div className="text-destructive font-semibold mb-2">Please fix the following errors:</div>
                <ul className="list-disc list-inside space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-sm text-destructive">
                      {error.message}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Step Content */}
          <div className="form-step active">
            {renderCurrentStep()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Zap className="w-4 h-4" />
            <span>Powered by AI-driven component matching • Secure & Private</span>
          </div>
        </div>
      </footer>
    </div>
  );
};