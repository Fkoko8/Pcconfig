import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Gamepad2, 
  Video, 
  Cpu, 
  Code, 
  Monitor, 
  Mic,
  Brain,
  Building,
  Palette
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PCBuildFormData } from '../types';

interface Step1Props {
  data: Partial<PCBuildFormData>;
  onUpdate: (data: Partial<PCBuildFormData>) => void;
  onNext: () => void;
  className?: string;
}

const useCaseOptions = [
  {
    id: 'gaming',
    label: 'Gaming',
    description: 'High-performance gaming at various resolutions',
    icon: Gamepad2,
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 'content-creation',
    label: 'Content Creation',
    description: 'Video editing, streaming, content production',
    icon: Video,
    color: 'from-red-500 to-pink-600'
  },
  {
    id: 'programming',
    label: 'Programming',
    description: 'Software development, coding, IDEs',
    icon: Code,
    color: 'from-green-500 to-teal-600'
  },
  {
    id: 'ai-ml',
    label: 'AI/Machine Learning',
    description: 'Deep learning, neural networks, data science',
    icon: Brain,
    color: 'from-orange-500 to-yellow-600'
  },
  {
    id: 'office-work',
    label: 'Office & Productivity',
    description: 'Documents, spreadsheets, web browsing',
    icon: Building,
    color: 'from-gray-500 to-slate-600'
  },
  {
    id: 'design',
    label: '3D Design & CAD',
    description: 'AutoCAD, Blender, 3D modeling',
    icon: Palette,
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'streaming',
    label: 'Live Streaming',
    description: 'Broadcasting, OBS, multi-cam setup',
    icon: Mic,
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'workstation',
    label: 'Professional Workstation',
    description: 'CAD, rendering, scientific computing',
    icon: Monitor,
    color: 'from-cyan-500 to-blue-600'
  }
];

const budgetPresets = [
  { label: 'Budget Build', min: 500, max: 800 },
  { label: 'Mid-Range', min: 800, max: 1500 },
  { label: 'High-End', min: 1500, max: 2500 },
  { label: 'Enthusiast', min: 2500, max: 4000 },
  { label: 'No Limits', min: 4000, max: 8000 }
];

export const Step1BudgetAndUse: React.FC<Step1Props> = ({
  data,
  onUpdate,
  onNext,
  className
}) => {
  const [budget, setBudget] = useState<[number, number]>([
    data.budget?.min || 1000,
    data.budget?.max || 2000
  ]);
  const [selectedUses, setSelectedUses] = useState<string[]>(data.primaryUse || []);

  useEffect(() => {
    onUpdate({
      ...data,
      budget: { min: budget[0], max: budget[1] },
      primaryUse: selectedUses
    });
  }, [budget, selectedUses]);

  const handleUseCaseToggle = (useCase: string) => {
    setSelectedUses(prev => 
      prev.includes(useCase)
        ? prev.filter(u => u !== useCase)
        : [...prev, useCase]
    );
  };

  const setBudgetPreset = (preset: { min: number; max: number }) => {
    setBudget([preset.min, preset.max]);
  };

  const canProceed = selectedUses.length > 0 && budget[0] < budget[1];

  return (
    <div className={cn("space-y-8", className)}>
      {/* Budget Section */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-primary" />
            What's your budget range?
          </CardTitle>
          <CardDescription>
            This helps us recommend components that fit your price range. You can always adjust later.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Budget Presets */}
          <div className="flex flex-wrap gap-2">
            {budgetPresets.map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                size="sm"
                onClick={() => setBudgetPreset(preset)}
                className="transition-bounce"
              >
                {preset.label}
              </Button>
            ))}
          </div>

          {/* Budget Slider */}
          <div className="space-y-4">
            <div className="px-4">
              <Slider
                value={budget}
                onValueChange={(value) => setBudget(value as [number, number])}
                max={8000}
                min={300}
                step={50}
                className="w-full"
              />
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <div className="text-center">
                <div className="font-semibold text-primary">${budget[0]}</div>
                <div className="text-muted-foreground">Minimum</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-accent">${budget[1]}</div>
                <div className="text-muted-foreground">Maximum</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Primary Use Cases */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>What will you primarily use this PC for?</CardTitle>
          <CardDescription>
            Select all that apply. This helps us prioritize the right components for your needs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {useCaseOptions.map((useCase) => {
              const Icon = useCase.icon;
              const isSelected = selectedUses.includes(useCase.id);
              
              return (
                <Card
                  key={useCase.id}
                  className={cn(
                    "cursor-pointer transition-smooth hover:scale-105 relative overflow-hidden",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-primary glow-primary"
                      : "hover:border-accent"
                  )}
                  onClick={() => handleUseCaseToggle(useCase.id)}
                >
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-10",
                    useCase.color
                  )} />
                  
                  <CardContent className="p-4 text-center space-y-2 relative z-10">
                    <div className={cn(
                      "w-12 h-12 mx-auto rounded-full flex items-center justify-center transition-smooth",
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div>
                      <div className="font-semibold text-sm">{useCase.label}</div>
                      <div className="text-xs text-muted-foreground leading-tight">
                        {useCase.description}
                      </div>
                    </div>
                    
                    {isSelected && (
                      <Badge variant="secondary" className="mt-2">
                        Selected
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Next Button */}
      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!canProceed}
          variant="hero"
          size="lg"
          className="min-w-32"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};