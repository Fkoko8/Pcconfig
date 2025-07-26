import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, 
  Keyboard, 
  Mouse, 
  Headphones,
  Speaker,
  Camera,
  Headset,
  ArrowLeft,
  ArrowRight,
  ShoppingCart
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
    icon: Monitor,
    title: 'Monitor',
    description: 'Display for your PC setup',
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 'keyboard',
    icon: Keyboard,
    title: 'Keyboard',
    description: 'Mechanical or membrane keyboard',
    color: 'from-green-500 to-teal-600'
  },
  {
    id: 'mouse',
    icon: Mouse,
    title: 'Gaming Mouse',
    description: 'High-precision gaming mouse',
    color: 'from-red-500 to-pink-600'
  },
  {
    id: 'headset',
    icon: Headphones,
    title: 'Headset',
    description: 'Gaming or professional headset',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'speakers',
    icon: Speaker,
    title: 'Speakers',
    description: 'Desktop or studio speakers',
    color: 'from-orange-500 to-yellow-600'
  },
  {
    id: 'webcam',
    icon: Camera,
    title: 'Webcam',
    description: 'For streaming or video calls',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'vr',
    icon: Headset,
    title: 'VR Headset',
    description: 'Virtual reality gaming',
    color: 'from-cyan-500 to-blue-600'
  }
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

  useEffect(() => {
    onUpdate({
      ...data,
      peripheralNeeds
    });
  }, [peripheralNeeds]);

  const handlePeripheralToggle = (peripheral: keyof typeof peripheralNeeds) => {
    setPeripheralNeeds(prev => ({
      ...prev,
      [peripheral]: !prev[peripheral]
    }));
  };

  const selectedCount = Object.values(peripheralNeeds).filter(Boolean).length;

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">
          Step 4 of 5
        </Badge>
        <div>
          <h2 className="text-3xl font-bold">Peripherals & Accessories</h2>
          <p className="text-muted-foreground mt-2">
            Do you need any peripherals to complete your setup? We can include recommendations for these items.
          </p>
        </div>
      </div>

      {/* Peripherals Selection */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-primary" />
            Peripheral Needs
          </CardTitle>
          <CardDescription>
            Select any peripherals you need recommendations for. This is optional - you can skip this step if you already have everything.
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
                    "cursor-pointer transition-smooth hover:scale-105 relative overflow-hidden border",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-primary glow-primary"
                      : "border-border hover:border-accent"
                  )}
                  onClick={() => handlePeripheralToggle(peripheral.id as keyof typeof peripheralNeeds)}
                >
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-10",
                    peripheral.color
                  )} />
                  
                  <CardContent className="p-6 text-center space-y-4 relative z-10">
                    <div className={cn(
                      "w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-smooth",
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    <div>
                      <div className="font-semibold text-lg">{peripheral.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {peripheral.description}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => {}}
                        className="pointer-events-none"
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selection Summary */}
      {selectedCount > 0 && (
        <Card className="glass-card border-primary/20">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <div className="font-semibold text-primary">
                Selected {selectedCount} peripheral{selectedCount !== 1 ? 's' : ''}
              </div>
              <div className="text-sm text-muted-foreground">
                We'll include recommendations for these items in your final build summary.
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Information Card */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <div className="text-lg font-semibold">💡 Pro Tip</div>
            <div className="text-sm text-muted-foreground">
              Peripheral recommendations are optional and won't affect your core PC build. 
              You can always add peripherals later or skip this step entirely.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={onPrev}
          variant="outline"
          size="lg"
          className="min-w-32"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <Button
          onClick={onNext}
          variant="hero"
          size="lg"
          className="min-w-32"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};