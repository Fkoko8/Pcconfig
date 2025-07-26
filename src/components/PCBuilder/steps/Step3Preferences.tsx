import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Cpu, 
  HardDrive, 
  Zap,
  Package,
  ArrowLeft,
  ArrowRight,
  Palette
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
  cpu: ['Intel', 'AMD', 'No Preference'],
  gpu: ['NVIDIA', 'AMD', 'No Preference'],
  motherboard: ['ASUS', 'MSI', 'Gigabyte', 'ASRock', 'No Preference'],
  ram: ['Corsair', 'G.Skill', 'Kingston', 'Crucial', 'No Preference'],
  storage: ['Samsung', 'Western Digital', 'Seagate', 'Crucial', 'No Preference'],
  psu: ['Corsair', 'EVGA', 'Seasonic', 'be quiet!', 'No Preference'],
  case: ['Corsair', 'NZXT', 'Fractal Design', 'Cooler Master', 'No Preference']
};

const formFactorOptions = [
  { value: 'atx', label: 'ATX Full Tower', description: 'Maximum expandability and cooling' },
  { value: 'mid-tower', label: 'Mid Tower', description: 'Best balance of size and features' },
  { value: 'mini-itx', label: 'Mini-ITX', description: 'Compact and space-efficient' },
  { value: 'micro-atx', label: 'Micro-ATX', description: 'Smaller with good features' }
];

const noiseLevelOptions = [
  { value: 'silent', label: 'Silent', description: 'Prioritize quiet operation' },
  { value: 'quiet', label: 'Quiet', description: 'Low noise levels' },
  { value: 'balanced', label: 'Balanced', description: 'Balance between noise and performance' },
  { value: 'performance', label: 'Performance', description: 'Maximum performance, noise acceptable' }
];

const powerEfficiencyOptions = [
  { value: 'eco', label: 'Eco-Friendly', description: 'Minimize power consumption' },
  { value: 'balanced', label: 'Balanced', description: 'Good efficiency with performance' },
  { value: 'performance', label: 'Performance', description: 'Maximum performance regardless of power' }
];

const rgbOptions = [
  { value: 'none', label: 'No RGB', description: 'Clean, professional look' },
  { value: 'minimal', label: 'Minimal RGB', description: 'Subtle accent lighting' },
  { value: 'moderate', label: 'Moderate RGB', description: 'Balanced RGB throughout' },
  { value: 'maximum', label: 'Maximum RGB', description: 'Full RGB light show' }
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
  const [upgradePath, setUpgradePath] = useState<boolean>(data.upgradePath !== undefined ? data.upgradePath : true);
  const [rgbLighting, setRgbLighting] = useState(data.rgbLighting || 'minimal');

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

  const handleBrandChange = (category: keyof typeof brandOptions, brand: string) => {
    setPreferredBrands(prev => ({
      ...prev,
      [category]: brand === 'No Preference' ? [] : [brand]
    }));
  };

  const getBrandValue = (category: keyof typeof brandOptions) => {
    const brands = preferredBrands[category];
    return brands && brands.length > 0 ? brands[0] : 'No Preference';
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Brand Preferences */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-primary" />
            Brand Preferences
          </CardTitle>
          <CardDescription>
            Choose your preferred brands for each component category. Select "No Preference" for best value recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(brandOptions).map(([category, brands]) => (
              <div key={category} className="space-y-3">
                <div className="font-semibold capitalize">
                  {category === 'gpu' ? 'Graphics Card' : 
                   category === 'psu' ? 'Power Supply' : 
                   category.replace('-', ' ')}
                </div>
                
                <Select 
                  value={getBrandValue(category as keyof typeof brandOptions)} 
                  onValueChange={(value) => handleBrandChange(category as keyof typeof brandOptions, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Preferences */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            System Preferences
          </CardTitle>
          <CardDescription>
            Configure your build preferences for size, noise, and aesthetics.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Form Factor */}
          <div className="space-y-3">
            <div>
              <div className="font-semibold">Case Size</div>
              <div className="text-sm text-muted-foreground">Choose based on your space and expansion needs</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formFactorOptions.map((option) => (
                <Card
                  key={option.value}
                  className={cn(
                    "cursor-pointer transition-smooth hover:scale-105 border",
                    formFactor === option.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-accent"
                  )}
                  onClick={() => setFormFactor(option.value)}
                >
                  <CardContent className="p-4">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Noise Level */}
          <div className="space-y-3">
            <div>
              <div className="font-semibold">Noise Level Preference</div>
              <div className="text-sm text-muted-foreground">Balance between quietness and performance</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {noiseLevelOptions.map((option) => (
                <Card
                  key={option.value}
                  className={cn(
                    "cursor-pointer transition-smooth hover:scale-105 border",
                    noiseLevel === option.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-accent"
                  )}
                  onClick={() => setNoiseLevel(option.value)}
                >
                  <CardContent className="p-4">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Power Efficiency */}
          <div className="space-y-3">
            <div>
              <div className="font-semibold">Power Efficiency</div>
              <div className="text-sm text-muted-foreground">Impact on electricity bills and environmental footprint</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {powerEfficiencyOptions.map((option) => (
                <Card
                  key={option.value}
                  className={cn(
                    "cursor-pointer transition-smooth hover:scale-105 border",
                    powerEfficiency === option.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-accent"
                  )}
                  onClick={() => setPowerEfficiency(option.value)}
                >
                  <CardContent className="p-4">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aesthetics & Features */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-6 h-6 text-primary" />
            Aesthetics & Features
          </CardTitle>
          <CardDescription>
            Customize the look and upgrade potential of your build.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* RGB Lighting */}
          <div className="space-y-3">
            <div>
              <div className="font-semibold">RGB Lighting</div>
              <div className="text-sm text-muted-foreground">Choose your lighting preference</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {rgbOptions.map((option) => (
                <Card
                  key={option.value}
                  className={cn(
                    "cursor-pointer transition-smooth hover:scale-105 border",
                    rgbLighting === option.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-accent"
                  )}
                  onClick={() => setRgbLighting(option.value)}
                >
                  <CardContent className="p-4">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Upgrade Path */}
          <div className="space-y-3">
            <div>
              <div className="font-semibold">Future Upgrade Considerations</div>
              <div className="text-sm text-muted-foreground">Plan for future component upgrades</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Card
                className={cn(
                  "cursor-pointer transition-smooth hover:scale-105 border",
                  upgradePath
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-accent"
                )}
                onClick={() => setUpgradePath(true)}
              >
                <CardContent className="p-4">
                  <div className="font-medium">Upgrade-Friendly</div>
                  <div className="text-sm text-muted-foreground">Plan for future component upgrades</div>
                </CardContent>
              </Card>
              
              <Card
                className={cn(
                  "cursor-pointer transition-smooth hover:scale-105 border",
                  !upgradePath
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-accent"
                )}
                onClick={() => setUpgradePath(false)}
              >
                <CardContent className="p-4">
                  <div className="font-medium">Current Needs Only</div>
                  <div className="text-sm text-muted-foreground">Optimize for current requirements</div>
                </CardContent>
              </Card>
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