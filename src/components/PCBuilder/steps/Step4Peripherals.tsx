import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Monitor, 
  Keyboard, 
  Mouse, 
  Headphones,
  Volume2,
  Camera,
  Gamepad2,
  Smartphone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PCBuildFormData } from '../types';

interface Step4Props {
  data: Partial<PCBuildFormData>;
  onUpdate: (data: Partial<PCBuildFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  className?: string;
}

const peripheralOptions = [
  {
    id: 'monitor',
    label: 'Monitor',
    description: 'Display for your new PC',
    icon: Monitor,
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'keyboard',
    label: 'Keyboard',
    description: 'Mechanical or membrane keyboard',
    icon: Keyboard,
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'mouse',
    label: 'Gaming Mouse',
    description: 'High-precision gaming mouse',
    icon: Mouse,
    color: 'from-green-500 to-teal-600'
  },
  {
    id: 'headset',
    label: 'Headset',
    description: 'Gaming or professional headset',
    icon: Headphones,
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'speakers',
    label: 'Speakers',
    description: 'Desktop speakers or sound system',
    icon: Volume2,
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'webcam',
    label: 'Webcam',
    description: 'For streaming or video calls',
    icon: Camera,
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'vr',
    label: 'VR Headset',
    description: 'Virtual reality gaming setup',
    icon: Gamepad2,
    color: 'from-cyan-500 to-blue-600'
  }
];

const specialRequirementOptions = [
  'Silent/Quiet Operation',
  'Small Form Factor (Mini-ITX)',
  'Multiple Monitor Support (3+)',
  'VR Ready Build',
  'Streaming Setup',
  'Content Creation Focused',
  'Server/NAS Capabilities',
  'Portable/LAN Party Build',
  'Energy Efficient Build',
  'Future-Proof/Upgradeable',
  'Budget Constraint Priority',
  'Specific Color Theme'
];

export const Step4Peripherals: React.FC<Step4Props> = ({
  data,
  onUpdate,
  onNext,
  onPrev,
  className
}) => {
  const [peripheralNeeds, setPeripheralNeeds] = useState(data.peripheralNeeds || {
    monitor: false,
    keyboard: false,
    mouse: false,
    headset: false,
    speakers: false,
    webcam: false,
    vr: false
  });
  
  const [specialRequirements, setSpecialRequirements] = useState<string[]>(
    data.specialRequirements || []
  );
  
  const [additionalNotes, setAdditionalNotes] = useState(data.additionalNotes || '');

  useEffect(() => {
    onUpdate({
      ...data,
      peripheralNeeds,
      specialRequirements,
      additionalNotes
    });
  }, [peripheralNeeds, specialRequirements, additionalNotes]);

  const handlePeripheralToggle = (peripheralId: string) => {
    setPeripheralNeeds(prev => ({
      ...prev,
      [peripheralId]: !prev[peripheralId as keyof typeof prev]
    }));
  };

  const handleSpecialRequirementToggle = (requirement: string) => {
    setSpecialRequirements(prev =>
      prev.includes(requirement)
        ? prev.filter(r => r !== requirement)
        : [...prev, requirement]
    );
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Peripheral Needs */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-primary" />
            Peripherals & Accessories
          </CardTitle>
          <CardDescription>
            Do you need any peripherals included in your budget? Select what you need recommendations for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {peripheralOptions.map((peripheral) => {
              const Icon = peripheral.icon;
              const isSelected = peripheralNeeds[peripheral.id as keyof typeof peripheralNeeds];
              
              return (
                <Card
                  key={peripheral.id}
                  className={cn(
                    "cursor-pointer transition-smooth hover:scale-105 relative overflow-hidden",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-primary glow-primary"
                      : "hover:border-accent"
                  )}
                  onClick={() => handlePeripheralToggle(peripheral.id)}
                >
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-10",
                    peripheral.color
                  )} />
                  
                  <CardContent className="p-4 text-center space-y-2 relative z-10">
                    <div className={cn(
                      "w-12 h-12 mx-auto rounded-full flex items-center justify-center transition-smooth",
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div>
                      <div className="font-semibold text-sm">{peripheral.label}</div>
                      <div className="text-xs text-muted-foreground leading-tight">
                        {peripheral.description}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handlePeripheralToggle(peripheral.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="text-xs text-muted-foreground">Include in budget</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Special Requirements */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Special Requirements</CardTitle>
          <CardDescription>
            Any specific needs or constraints for your build? Select all that apply.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {specialRequirementOptions.map((requirement) => (
              <div
                key={requirement}
                className={cn(
                  "flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-smooth hover:bg-accent/10",
                  specialRequirements.includes(requirement)
                    ? "border-primary bg-primary/10"
                    : "border-border"
                )}
                onClick={() => handleSpecialRequirementToggle(requirement)}
              >
                <Checkbox
                  checked={specialRequirements.includes(requirement)}
                  onCheckedChange={() => handleSpecialRequirementToggle(requirement)}
                  onClick={(e) => e.stopPropagation()}
                />
                <label className="text-sm font-medium cursor-pointer">
                  {requirement}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
          <CardDescription>
            Anything else you'd like us to know about your build requirements?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <textarea
            className="w-full h-32 p-3 rounded-lg border border-border bg-card text-card-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            placeholder="e.g., Specific games you want to run, workspace constraints, aesthetic preferences, or any other requirements..."
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            maxLength={1000}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground">
              Share any specific details that will help us create your perfect build
            </p>
            <span className="text-xs text-muted-foreground">
              {additionalNotes.length}/1000
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline" size="lg">
          Previous
        </Button>
        
        <Button
          onClick={onNext}
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