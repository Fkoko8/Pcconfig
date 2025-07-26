import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle,
  DollarSign,
  Cpu,
  Monitor,
  Zap,
  Clock,
  ArrowLeft,
  Send,
  Star,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PCBuildFormData } from '../types';

interface Step5Props {
  data: Partial<PCBuildFormData>;
  onUpdate: (data: Partial<PCBuildFormData>) => void;
  onSubmit: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
  className?: string;
}

export const Step5Summary: React.FC<Step5Props> = ({
  data,
  onUpdate,
  onSubmit,
  onPrev,
  isSubmitting,
  className
}) => {
  const budgetRange = data.budget ? `$${data.budget.min} - $${data.budget.max}` : 'Not specified';
  const primaryUses = data.primaryUse || [];
  const selectedPeripherals = data.peripheralNeeds ? 
    Object.entries(data.peripheralNeeds)
      .filter(([_, selected]) => selected)
      .map(([name]) => name) : [];

  const getUseCaseLabel = (useCase: string) => {
    const labels: Record<string, string> = {
      'gaming': 'Gaming',
      'content-creation': 'Content Creation',
      'programming': 'Programming',
      'ai-ml': 'AI/Machine Learning',
      'office-work': 'Office & Productivity',
      'design': '3D Design & CAD',
      'streaming': 'Live Streaming',
      'workstation': 'Professional Workstation'
    };
    return labels[useCase] || useCase;
  };

  const getPeripheralLabel = (peripheral: string) => {
    const labels: Record<string, string> = {
      'monitor': 'Monitor',
      'keyboard': 'Keyboard',
      'mouse': 'Gaming Mouse',
      'headset': 'Headset',
      'speakers': 'Speakers',
      'webcam': 'Webcam',
      'vr': 'VR Headset'
    };
    return labels[peripheral] || peripheral;
  };

  const summaryItems = [
    {
      icon: DollarSign,
      title: 'Budget Range',
      value: budgetRange,
      color: 'text-green-400'
    },
    {
      icon: Cpu,
      title: 'Primary Uses',
      value: primaryUses.length > 0 ? `${primaryUses.length} selected` : 'None specified',
      color: 'text-blue-400'
    },
    {
      icon: Monitor,
      title: 'Peripherals',
      value: selectedPeripherals.length > 0 ? `${selectedPeripherals.length} items` : 'None needed',
      color: 'text-purple-400'
    },
    {
      icon: Zap,
      title: 'Form Factor',
      value: data.formFactor ? data.formFactor.replace('-', ' ').toUpperCase() : 'Not specified',
      color: 'text-orange-400'
    }
  ];

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">
          Final Step
        </Badge>
        <div>
          <h2 className="text-3xl font-bold">Review Your Requirements</h2>
          <p className="text-muted-foreground mt-2">
            Confirm your build requirements before we generate your personalized PC recommendations.
          </p>
        </div>
      </div>

      {/* Summary Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="glass-card">
              <CardContent className="p-6 text-center">
                <Icon className={cn("w-8 h-8 mx-auto mb-3", item.color)} />
                <div className="font-semibold text-sm text-muted-foreground mb-1">
                  {item.title}
                </div>
                <div className="font-bold">{item.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Summary */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-primary" />
            Build Requirements Summary
          </CardTitle>
          <CardDescription>
            Review all your specifications before submitting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Budget */}
          <div>
            <div className="font-semibold flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              Budget Range
            </div>
            <div className="text-muted-foreground">{budgetRange}</div>
          </div>

          <Separator />

          {/* Primary Use Cases */}
          <div>
            <div className="font-semibold flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-blue-400" />
              Primary Use Cases
            </div>
            {primaryUses.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {primaryUses.map((useCase) => (
                  <Badge key={useCase} variant="secondary">
                    {getUseCaseLabel(useCase)}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground">None specified</div>
            )}
          </div>

          {/* Gaming Performance (if applicable) */}
          {data.gamingPerformance && (
            <>
              <Separator />
              <div>
                <div className="font-semibold flex items-center gap-2 mb-3">
                  <Monitor className="w-4 h-4 text-purple-400" />
                  Gaming Performance
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Target FPS:</span>
                    <span>{data.gamingPerformance.targetFPS} FPS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Resolution:</span>
                    <span>{data.gamingPerformance.resolution}</span>
                  </div>
                  {data.gamingPerformance.games.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Games:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {data.gamingPerformance.games.slice(0, 3).map((game) => (
                          <Badge key={game} variant="outline" className="text-xs">
                            {game}
                          </Badge>
                        ))}
                        {data.gamingPerformance.games.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{data.gamingPerformance.games.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* System Preferences */}
          {data.formFactor && (
            <>
              <Separator />
              <div>
                <div className="font-semibold flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-orange-400" />
                  System Preferences
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Form Factor:</span>
                    <span className="capitalize">{data.formFactor?.replace('-', ' ')}</span>
                  </div>
                  {data.noiseLevel && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Noise Level:</span>
                      <span className="capitalize">{data.noiseLevel}</span>
                    </div>
                  )}
                  {data.rgbLighting && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">RGB Lighting:</span>
                      <span className="capitalize">{data.rgbLighting}</span>
                    </div>
                  )}
                  {data.powerEfficiency && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Power Efficiency:</span>
                      <span className="capitalize">{data.powerEfficiency}</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Peripherals */}
          {selectedPeripherals.length > 0 && (
            <>
              <Separator />
              <div>
                <div className="font-semibold flex items-center gap-2 mb-3">
                  <Monitor className="w-4 h-4 text-purple-400" />
                  Peripheral Recommendations
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPeripherals.map((peripheral) => (
                    <Badge key={peripheral} variant="secondary">
                      {getPeripheralLabel(peripheral)}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* What Happens Next */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-primary" />
            What Happens Next?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-bold text-sm">1</span>
              </div>
              <div>
                <div className="font-semibold">Instant Analysis</div>
                <div className="text-sm text-muted-foreground">
                  Our AI analyzes your requirements and generates optimized build recommendations
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-accent-foreground font-bold text-sm">2</span>
              </div>
              <div>
                <div className="font-semibold">Detailed Results</div>
                <div className="text-sm text-muted-foreground">
                  Get component lists, pricing, compatibility checks, and assembly guides
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 pt-4 text-sm text-muted-foreground border-t border-border">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-accent" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              <span>Expert Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>No Registration Required</span>
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
          disabled={isSubmitting}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <Button
          onClick={onSubmit}
          variant="premium"
          size="lg"
          className="min-w-48"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Generating Recommendations...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Get My PC Build Recommendations
            </>
          )}
        </Button>
      </div>
    </div>
  );
};