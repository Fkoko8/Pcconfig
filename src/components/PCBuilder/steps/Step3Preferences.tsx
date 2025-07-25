import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Cpu, 
  Zap, 
  HardDrive, 
  MonitorSpeaker,
  Gamepad,
  Settings,
  Palette,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PCBuildFormData } from '../types';

interface Step3Props {
  data: Partial<PCBuildFormData>;
  onUpdate: (data: Partial<PCBuildFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  className?: string;
}

const brandOptions = {
  cpu: ['Intel', 'AMD', 'No preference'],
  gpu: ['NVIDIA', 'AMD', 'Intel Arc', 'No preference'],
  motherboard: ['ASUS', 'MSI', 'Gigabyte', 'ASRock', 'EVGA', 'No preference'],
  ram: ['Corsair', 'G.Skill', 'Kingston', 'Crucial', 'Patriot', 'No preference'],
  storage: ['Samsung', 'Western Digital', 'Seagate', 'Crucial', 'Kingston', 'No preference'],
  psu: ['Corsair', 'EVGA', 'Seasonic', 'be quiet!', 'Thermaltake', 'No preference'],
  case: ['Fractal Design', 'NZXT', 'Corsair', 'Cooler Master', 'Lian Li', 'No preference']
};

const formFactorOptions = [
  { value: 'full-tower', label: 'Full Tower', description: 'Maximum space, best cooling, multiple GPUs' },
  { value: 'mid-tower', label: 'Mid Tower', description: 'Perfect balance of size and features' },
  { value: 'mini-itx', label: 'Mini-ITX', description: 'Compact build, great for desks' },
  { value: 'micro-atx', label: 'Micro-ATX', description: 'Small but expandable' }
];

const noiseLevelOptions = [
  { value: 'silent', label: 'Silent', description: 'Nearly inaudible operation' },
  { value: 'quiet', label: 'Quiet', description: 'Minimal noise during normal use' },
  { value: 'balanced', label: 'Balanced', description: 'Good performance-to-noise ratio' },
  { value: 'performance', label: 'Performance First', description: 'Maximum performance, noise not a concern' }
];

const powerOptions = [
  { value: 'efficient', label: 'Maximum Efficiency', description: 'Lower power consumption, eco-friendly' },
  { value: 'balanced', label: 'Balanced', description: 'Good efficiency with strong performance' },
  { value: 'performance', label: 'Performance First', description: 'Maximum performance regardless of power' }
];

const rgbOptions = [
  { value: 'none', label: 'No RGB', description: 'Clean, professional look' },
  { value: 'subtle', label: 'Subtle RGB', description: 'Minimal accent lighting' },
  { value: 'moderate', label: 'Moderate RGB', description: 'Balanced lighting effects' },
  { value: 'full', label: 'Full RGB Setup', description: 'Maximum RGB customization' }
];

export const Step3Preferences: React.FC<Step3Props> = ({
  data,
  onUpdate,
  onNext,
  onPrev,
  className
}) => {
  const [preferredBrands, setPreferredBrands] = useState(data.preferredBrands || {
    cpu: [],
    gpu: [],
    motherboard: [],
    ram: [],
    storage: [],
    psu: [],
    case: []
  });
  
  const [formFactor, setFormFactor] = useState(data.formFactor || 'mid-tower');
  const [noiseLevel, setNoiseLevel] = useState(data.noiseLevel || 'balanced');
  const [powerEfficiency, setPowerEfficiency] = useState(data.powerEfficiency || 'balanced');
  const [upgradePath, setUpgradePath] = useState<boolean>(data.upgradePath ?? true);
  const [rgbLighting, setRgbLighting] = useState(data.rgbLighting || 'moderate');

  useEffect(() => {
    onUpdate({
      ...data,
      preferredBrands,
      formFactor,
      noiseLevel,
      powerEfficiency,
      upgradePath,
      rgbLighting
    });
  }, [preferredBrands, formFactor, noiseLevel, powerEfficiency, upgradePath, rgbLighting]);

  const handleBrandToggle = (category: keyof typeof preferredBrands, brand: string) => {
    setPreferredBrands(prev => ({
      ...prev,
      [category]: prev[category].includes(brand)
        ? prev[category].filter(b => b !== brand)
        : [...prev[category], brand]
    }));
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Component Brand Preferences */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Brand Preferences
          </CardTitle>
          <CardDescription>
            Do you have preferred brands? This is optional - we'll recommend the best value regardless.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(brandOptions).map(([category, brands]) => (
            <div key={category} className="space-y-3">
              <div className="flex items-center gap-2">
                {category === 'cpu' && <Cpu className="w-5 h-5 text-accent" />}
                {category === 'gpu' && <Zap className="w-5 h-5 text-accent" />}
                {category === 'storage' && <HardDrive className="w-5 h-5 text-accent" />}
                {!['cpu', 'gpu', 'storage'].includes(category) && <Settings className="w-5 h-5 text-accent" />}
                <label className="font-semibold capitalize">{category === 'psu' ? 'Power Supply' : category.replace('-', ' ')}</label>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <Badge
                    key={brand}
                    variant={preferredBrands[category as keyof typeof preferredBrands].includes(brand) ? "default" : "outline"}
                    className="cursor-pointer transition-smooth hover:scale-105"
                    onClick={() => handleBrandToggle(category as keyof typeof preferredBrands, brand)}
                  >
                    {brand}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* System Preferences */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary" />
            System Preferences
          </CardTitle>
          <CardDescription>
            These preferences help us choose components that match your environment and needs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Form Factor */}
          <div className="space-y-3">
            <label className="font-semibold">Case Size & Form Factor</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formFactorOptions.map((option) => (
                <Card
                  key={option.value}
                  className={cn(
                    "cursor-pointer transition-smooth hover:scale-105",
                    formFactor === option.value
                      ? "border-primary bg-primary/10 shadow-primary"
                      : "hover:border-accent"
                  )}
                  onClick={() => setFormFactor(option.value)}
                >
                  <CardContent className="p-4">
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Noise Level */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MonitorSpeaker className="w-5 h-5 text-accent" />
              <label className="font-semibold">Noise Level Preference</label>
            </div>
            <Select value={noiseLevel} onValueChange={setNoiseLevel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select noise preference" />
              </SelectTrigger>
              <SelectContent>
                {noiseLevelOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Power Efficiency */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              <label className="font-semibold">Power Efficiency Priority</label>
            </div>
            <Select value={powerEfficiency} onValueChange={setPowerEfficiency}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select power preference" />
              </SelectTrigger>
              <SelectContent>
                {powerOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* RGB Lighting */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-accent" />
              <label className="font-semibold">RGB Lighting Preference</label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {rgbOptions.map((option) => (
                <Card
                  key={option.value}
                  className={cn(
                    "cursor-pointer transition-smooth hover:scale-105",
                    rgbLighting === option.value
                      ? "border-primary bg-primary/10 shadow-primary"
                      : "hover:border-accent"
                  )}
                  onClick={() => setRgbLighting(option.value)}
                >
                  <CardContent className="p-3 text-center">
                    <div className="font-semibold text-sm">{option.label}</div>
                    <div className="text-xs text-muted-foreground leading-tight mt-1">
                      {option.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Future Upgrade Path */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="upgradePath"
                checked={upgradePath}
                onCheckedChange={(checked) => setUpgradePath(!!checked)}
              />
              <label htmlFor="upgradePath" className="font-semibold">
                Plan for future upgrades
              </label>
            </div>
            <p className="text-sm text-muted-foreground">
              Prioritize components that allow easy upgrades (extra RAM slots, PSU headroom, etc.)
            </p>
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