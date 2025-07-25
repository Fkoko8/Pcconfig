import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  DollarSign, 
  Target, 
  Monitor, 
  Settings,
  User,
  Mail,
  CheckCircle,
  Gamepad2,
  Cpu,
  HardDrive
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PCBuildFormData } from '../types';

interface Step5Props {
  data: Partial<PCBuildFormData>;
  onUpdate: (data: Partial<PCBuildFormData>) => void;
  onSubmit: () => void;
  onPrev: () => void;
  isSubmitting?: boolean;
  className?: string;
}

const experienceLevels = [
  { value: 'beginner', label: 'Beginner', description: 'First time building a PC' },
  { value: 'intermediate', label: 'Intermediate', description: 'Built 1-2 PCs before' },
  { value: 'advanced', label: 'Advanced', description: 'Experienced PC builder' },
  { value: 'expert', label: 'Expert', description: 'Professional/enthusiast level' }
];

export const Step5Summary: React.FC<Step5Props> = ({
  data,
  onUpdate,
  onSubmit,
  onPrev,
  isSubmitting = false,
  className
}) => {
  const [email, setEmail] = useState(data.email || '');
  const [experienceLevel, setExperienceLevel] = useState(data.experienceLevel || '');

  const handleSubmit = () => {
    onUpdate({
      ...data,
      email: email.trim(),
      experienceLevel
    });
    onSubmit();
  };

  const formatBudget = (budget: { min: number; max: number } | undefined) => {
    if (!budget) return 'Not specified';
    return `$${budget.min.toLocaleString()} - $${budget.max.toLocaleString()}`;
  };

  const formatUseCase = (useCase: string) => {
    return useCase.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const canSubmit = experienceLevel && email.includes('@');

  return (
    <div className={cn("space-y-8", className)}>
      {/* Build Summary */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-primary" />
            Build Summary
          </CardTitle>
          <CardDescription>
            Review your requirements before we generate your personalized PC build recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Budget */}
          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <div className="font-semibold">Budget Range</div>
              <div className="text-lg text-primary font-bold">{formatBudget(data.budget)}</div>
            </div>
          </div>

          <Separator />

          {/* Primary Use Cases */}
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-accent mt-0.5" />
            <div className="space-y-2">
              <div className="font-semibold">Primary Use Cases</div>
              <div className="flex flex-wrap gap-2">
                {data.primaryUse?.map(useCase => (
                  <Badge key={useCase} variant="secondary">
                    {formatUseCase(useCase)}
                  </Badge>
                )) || <span className="text-muted-foreground">None selected</span>}
              </div>
            </div>
          </div>

          <Separator />

          {/* Gaming Performance */}
          {data.gamingPerformance && (
            <>
              <div className="flex items-start gap-3">
                <Gamepad2 className="w-5 h-5 text-accent mt-0.5" />
                <div className="space-y-2">
                  <div className="font-semibold">Gaming Requirements</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Target FPS:</span>
                      <span className="ml-2 font-medium">{data.gamingPerformance.targetFPS}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Resolution:</span>
                      <span className="ml-2 font-medium">{data.gamingPerformance.resolution}</span>
                    </div>
                  </div>
                  {data.gamingPerformance.games && data.gamingPerformance.games.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {data.gamingPerformance.games.slice(0, 5).map(game => (
                        <Badge key={game} variant="outline" className="text-xs">
                          {game}
                        </Badge>
                      ))}
                      {data.gamingPerformance.games.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{data.gamingPerformance.games.length - 5} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* System Preferences */}
          <div className="flex items-start gap-3">
            <Settings className="w-5 h-5 text-accent mt-0.5" />
            <div className="space-y-2">
              <div className="font-semibold">System Preferences</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Form Factor:</span>
                  <span className="ml-2 font-medium">{data.formFactor || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Noise Level:</span>
                  <span className="ml-2 font-medium">{data.noiseLevel || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">RGB Lighting:</span>
                  <span className="ml-2 font-medium">{data.rgbLighting || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Future Upgrades:</span>
                  <span className="ml-2 font-medium">{data.upgradePath ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Peripherals */}
          {data.peripheralNeeds && Object.values(data.peripheralNeeds).some(Boolean) && (
            <>
              <div className="flex items-start gap-3">
                <Monitor className="w-5 h-5 text-accent mt-0.5" />
                <div className="space-y-2">
                  <div className="font-semibold">Peripheral Needs</div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(data.peripheralNeeds)
                      .filter(([_, needed]) => needed)
                      .map(([peripheral, _]) => (
                        <Badge key={peripheral} variant="secondary">
                          {peripheral.charAt(0).toUpperCase() + peripheral.slice(1)}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Special Requirements */}
          {data.specialRequirements && data.specialRequirements.length > 0 && (
            <div className="flex items-start gap-3">
              <HardDrive className="w-5 h-5 text-accent mt-0.5" />
              <div className="space-y-2">
                <div className="font-semibold">Special Requirements</div>
                <div className="flex flex-wrap gap-2">
                  {data.specialRequirements.map(req => (
                    <Badge key={req} variant="outline">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-6 h-6 text-primary" />
            Contact Information
          </CardTitle>
          <CardDescription>
            We'll send your personalized build recommendations to your email.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">PC Building Experience</label>
            <Select value={experienceLevel} onValueChange={setExperienceLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    <div>
                      <div className="font-medium">{level.label}</div>
                      <div className="text-xs text-muted-foreground">{level.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card className="glass-card border-accent/50">
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">
            <strong>Privacy Notice:</strong> Your information is used solely to generate personalized PC recommendations. 
            We don't share your data with third parties and you can unsubscribe at any time. 
            No payment information is collected at this stage.
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline" size="lg">
          Previous
        </Button>
        
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          variant="premium"
          size="xl"
          className="min-w-48"
        >
          {isSubmitting ? 'Generating Recommendations...' : 'Get My PC Build 🚀'}
        </Button>
      </div>
    </div>
  );
};