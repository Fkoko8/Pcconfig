import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, 
  Zap, 
  Target, 
  Settings,
  Gamepad2,
  Video,
  Cpu,
  HardDrive
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
  { value: '1080p', label: '1080p (1920×1080)', description: 'Full HD - Great for most gaming' },
  { value: '1440p', label: '1440p (2560×1440)', description: 'QHD - Perfect balance of quality and performance' },
  { value: '4k', label: '4K (3840×2160)', description: 'Ultra HD - Maximum visual quality' },
  { value: 'ultrawide', label: 'Ultrawide (3440×1440)', description: 'Immersive widescreen gaming' },
];

const popularGames = [
  'Cyberpunk 2077', 'Call of Duty: Modern Warfare', 'Fortnite', 'Apex Legends',
  'Valorant', 'League of Legends', 'Minecraft', 'GTA V', 'Red Dead Redemption 2',
  'The Witcher 3', 'Elden Ring', 'Counter-Strike 2', 'Overwatch 2', 'FIFA 24'
];

const softwareOptions = [
  'Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve', 'Blender',
  'AutoCAD', 'SolidWorks', 'Maya', 'Unity', 'Unreal Engine', 'OBS Studio',
  'Photoshop', 'Illustrator', 'Visual Studio', 'IntelliJ IDEA', 'Docker'
];

export const Step2Performance: React.FC<Step2Props> = ({
  data,
  onUpdate,
  onNext,
  onPrev,
  className
}) => {
  const [targetFPS, setTargetFPS] = useState(data.gamingPerformance?.targetFPS || 60);
  const [resolution, setResolution] = useState(data.gamingPerformance?.resolution || '1440p');
  const [selectedGames, setSelectedGames] = useState<string[]>(data.gamingPerformance?.games || []);
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>(data.workloadRequirements?.software || []);
  const [multitasking, setMultitasking] = useState(data.workloadRequirements?.multitasking || false);
  const [renderingNeeds, setRenderingNeeds] = useState(data.workloadRequirements?.renderingNeeds || false);

  const isGamingSelected = data.primaryUse?.includes('gaming');
  const isContentCreationSelected = data.primaryUse?.includes('content-creation') || 
                                   data.primaryUse?.includes('design') || 
                                   data.primaryUse?.includes('ai-ml');

  useEffect(() => {
    const updateData: Partial<PCBuildFormData> = { ...data };
    
    if (isGamingSelected) {
      updateData.gamingPerformance = {
        targetFPS,
        resolution,
        games: selectedGames
      };
    }
    
    if (isContentCreationSelected) {
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

  const getFpsRecommendation = (fps: number) => {
    if (fps >= 144) return { text: 'Competitive Gaming', color: 'text-accent' };
    if (fps >= 120) return { text: 'High Refresh Gaming', color: 'text-primary' };
    if (fps >= 60) return { text: 'Smooth Gaming', color: 'text-green-400' };
    return { text: 'Basic Gaming', color: 'text-yellow-400' };
  };

  const canProceed = !isGamingSelected || (targetFPS && resolution);

  return (
    <div className={cn("space-y-8", className)}>
      {/* Gaming Performance Section */}
      {isGamingSelected && (
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
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  <label className="font-semibold">Target FPS</label>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{targetFPS}</div>
                  <div className={cn("text-sm", getFpsRecommendation(targetFPS).color)}>
                    {getFpsRecommendation(targetFPS).text}
                  </div>
                </div>
              </div>
              
              <Slider
                value={[targetFPS]}
                onValueChange={(value) => setTargetFPS(value[0])}
                max={240}
                min={30}
                step={10}
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
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-accent" />
                <label className="font-semibold">Target Resolution</label>
              </div>
              
              <Select value={resolution} onValueChange={setResolution}>
                <SelectTrigger className="w-full">
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

            {/* Favorite Games */}
            <div className="space-y-3">
              <label className="font-semibold">Games you want to play (optional)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {popularGames.map((game) => (
                  <Badge
                    key={game}
                    variant={selectedGames.includes(game) ? "default" : "outline"}
                    className="cursor-pointer transition-smooth hover:scale-105 justify-center"
                    onClick={() => handleGameToggle(game)}
                  >
                    {game}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Workload Requirements */}
      {isContentCreationSelected && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-primary" />
              Workload Requirements
            </CardTitle>
            <CardDescription>
              What software and workflows will you be running?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Software Selection */}
            <div className="space-y-3">
              <label className="font-semibold">Primary Software</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {softwareOptions.map((software) => (
                  <Badge
                    key={software}
                    variant={selectedSoftware.includes(software) ? "default" : "outline"}
                    className="cursor-pointer transition-smooth hover:scale-105 justify-center"
                    onClick={() => handleSoftwareToggle(software)}
                  >
                    {software}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Workflow Requirements */}
            <div className="space-y-4">
              <label className="font-semibold">Workflow Requirements</label>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="multitasking"
                    checked={multitasking}
                    onCheckedChange={(checked) => setMultitasking(checked === true)}
                  />
                  <label htmlFor="multitasking" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Heavy multitasking (multiple applications running simultaneously)
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rendering"
                    checked={renderingNeeds}
                    onCheckedChange={(checked) => setRenderingNeeds(checked === true)}
                  />
                  <label htmlFor="rendering" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    3D rendering, video encoding, or AI training workloads
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline" size="lg">
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
        </Button>
      </div>
    </div>
  );
};