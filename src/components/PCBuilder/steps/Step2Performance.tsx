import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Zap, 
  Monitor, 
  Gamepad2, 
  Video, 
  Brain,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PCBuildFormData } from '../types';

interface Step2Props {
  data: Partial<PCBuildFormData>;
  onUpdate: (data: Partial<PCBuildFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  className?: string;
}

const resolutionOptions = [
  { value: '1080p', label: '1080p (1920x1080)', description: 'Standard HD gaming' },
  { value: '1440p', label: '1440p (2560x1440)', description: 'High-resolution gaming' },
  { value: '4k', label: '4K (3840x2160)', description: 'Ultra high-resolution' },
  { value: 'ultrawide', label: 'Ultrawide (3440x1440)', description: 'Immersive widescreen' }
];

const popularGames = [
  'Cyberpunk 2077', 'Call of Duty', 'Valorant', 'Fortnite', 'Apex Legends',
  'League of Legends', 'Counter-Strike 2', 'Elden Ring', 'Hogwarts Legacy',
  'Microsoft Flight Simulator', 'Red Dead Redemption 2', 'GTA V'
];

const workloadSoftware = [
  'Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve', 'Blender',
  'AutoCAD', 'SolidWorks', 'Maya', 'Cinema 4D', 'Unity', 'Unreal Engine',
  'OBS Studio', 'Streamlabs', 'Visual Studio', 'PyTorch', 'TensorFlow'
];

export const Step2Performance: React.FC<Step2Props> = ({
  data,
  onUpdate,
  onNext,
  onPrev,
  className
}) => {
  const [targetFPS, setTargetFPS] = useState<[number]>([data.gamingPerformance?.targetFPS || 60]);
  const [resolution, setResolution] = useState(data.gamingPerformance?.resolution || '1080p');
  const [selectedGames, setSelectedGames] = useState<string[]>(data.gamingPerformance?.games || []);
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>(data.workloadRequirements?.software || []);
  const [multitasking, setMultitasking] = useState(data.workloadRequirements?.multitasking || false);
  const [renderingNeeds, setRenderingNeeds] = useState(data.workloadRequirements?.renderingNeeds || false);

  const isGamingUse = data.primaryUse?.includes('gaming');
  const isContentCreation = data.primaryUse?.includes('content-creation');
  const isAIML = data.primaryUse?.includes('ai-ml');
  const isProgramming = data.primaryUse?.includes('programming');

  useEffect(() => {
    const updateData: Partial<PCBuildFormData> = { ...data };
    
    if (isGamingUse) {
      updateData.gamingPerformance = {
        targetFPS: targetFPS[0],
        resolution,
        games: selectedGames
      };
    }
    
    if (isContentCreation || isAIML || isProgramming) {
      updateData.workloadRequirements = {
        software: selectedSoftware,
        multitasking,
        renderingNeeds
      };
    }
    
    onUpdate(updateData);
  }, [targetFPS, resolution, selectedGames, selectedSoftware, multitasking, renderingNeeds]);

  const handleGameToggle = (game: string) => {
    setSelectedGames(prev => 
      prev.includes(game)
        ? prev.filter(g => g !== game)
        : [...prev, game]
    );
  };

  const handleSoftwareToggle = (software: string) => {
    setSelectedSoftware(prev => 
      prev.includes(software)
        ? prev.filter(s => s !== software)
        : [...prev, software]
    );
  };

  const canProceed = isGamingUse ? selectedGames.length > 0 : true;

  return (
    <div className={cn("space-y-8", className)}>
      {/* Gaming Performance Requirements */}
      {isGamingUse && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-primary" />
              Gaming Performance Requirements
            </CardTitle>
            <CardDescription>
              Tell us about your gaming preferences so we can optimize your build.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Target FPS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Target Frame Rate</div>
                  <div className="text-sm text-muted-foreground">Higher FPS provides smoother gameplay</div>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {targetFPS[0]} FPS
                </Badge>
              </div>
              
              <Slider
                value={targetFPS}
                onValueChange={(value) => setTargetFPS(value as [number])}
                max={240}
                min={30}
                step={15}
                className="w-full"
              />
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>30 FPS</span>
                <span>60 FPS</span>
                <span>120 FPS</span>
                <span>240 FPS</span>
              </div>
            </div>

            {/* Resolution */}
            <div className="space-y-3">
              <div>
                <div className="font-semibold">Gaming Resolution</div>
                <div className="text-sm text-muted-foreground">Higher resolutions require more powerful graphics cards</div>
              </div>
              
              <Select value={resolution} onValueChange={setResolution}>
                <SelectTrigger>
                  <SelectValue placeholder="Select resolution" />
                </SelectTrigger>
                <SelectContent>
                  {resolutionOptions.map((option) => (
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

            {/* Game Selection */}
            <div className="space-y-4">
              <div>
                <div className="font-semibold">Games You Want to Play</div>
                <div className="text-sm text-muted-foreground">Select games to optimize performance recommendations</div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {popularGames.map((game) => (
                  <div
                    key={game}
                    onClick={() => handleGameToggle(game)}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-smooth hover:scale-105",
                      selectedGames.includes(game)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-accent"
                    )}
                  >
                    <div className="text-sm font-medium">{game}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Workload Requirements */}
      {(isContentCreation || isAIML || isProgramming) && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              Workload Requirements
            </CardTitle>
            <CardDescription>
              Help us understand your professional workflow needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Software Selection */}
            <div className="space-y-4">
              <div>
                <div className="font-semibold">Software You Use</div>
                <div className="text-sm text-muted-foreground">Select applications to optimize component recommendations</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {workloadSoftware.map((software) => (
                  <div
                    key={software}
                    onClick={() => handleSoftwareToggle(software)}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-smooth hover:scale-105",
                      selectedSoftware.includes(software)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-accent"
                    )}
                  >
                    <div className="text-sm font-medium">{software}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Requirements */}
            <div className="space-y-4">
              <div className="font-semibold">Additional Requirements</div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="multitasking"
                    checked={multitasking}
                    onCheckedChange={(checked) => setMultitasking(checked as boolean)}
                  />
                  <label htmlFor="multitasking" className="text-sm cursor-pointer">
                    <div className="font-medium">Heavy Multitasking</div>
                    <div className="text-muted-foreground">Multiple applications running simultaneously</div>
                  </label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="rendering"
                    checked={renderingNeeds}
                    onCheckedChange={(checked) => setRenderingNeeds(checked as boolean)}
                  />
                  <label htmlFor="rendering" className="text-sm cursor-pointer">
                    <div className="font-medium">3D Rendering & Simulation</div>
                    <div className="text-muted-foreground">Heavy computational workloads</div>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
          disabled={!canProceed}
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