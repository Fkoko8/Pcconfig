import React from 'react';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormStep } from './types';

interface FormStepIndicatorProps {
  steps: FormStep[];
  className?: string;
}

export const FormStepIndicator: React.FC<FormStepIndicatorProps> = ({
  steps,
  className
}) => {
  return (
    <div className={cn("flex items-center justify-between w-full max-w-4xl mx-auto px-4", className)}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center space-y-2">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-smooth",
                step.isCompleted
                  ? "bg-primary text-primary-foreground glow-primary"
                  : step.isActive
                  ? "bg-accent text-accent-foreground animate-pulse-glow"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {step.isCompleted ? (
                <Check className="w-6 h-6" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </div>
            
            <div className="text-center">
              <div
                className={cn(
                  "text-sm font-medium transition-smooth",
                  step.isCompleted || step.isActive
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.title}
              </div>
              <div className="text-xs text-muted-foreground max-w-24 leading-tight">
                {step.description}
              </div>
            </div>
          </div>
          
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-0.5 mx-4 transition-smooth",
                step.isCompleted
                  ? "bg-primary"
                  : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};