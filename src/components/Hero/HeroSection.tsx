import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Cpu, 
  Zap, 
  Shield, 
  Star,
  CheckCircle,
  Gamepad2,
  Monitor,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/hero-pc-setup.jpg';

interface HeroSectionProps {
  onStartBuilder: () => void;
  className?: string;
}

const features = [
  {
    icon: Cpu,
    title: 'AI-Powered Matching',
    description: 'Our advanced algorithm analyzes your needs and matches you with the perfect components.'
  },
  {
    icon: Shield,
    title: 'Compatibility Guaranteed',
    description: 'Every build is thoroughly validated for compatibility and performance optimization.'
  },
  {
    icon: Zap,
    title: 'Real-time Pricing',
    description: 'Get up-to-date pricing from multiple retailers to find the best deals.'
  }
];

const stats = [
  { label: 'Builds Created', value: '50K+' },
  { label: 'Happy Customers', value: '25K+' },
  { label: 'Components Analyzed', value: '100K+' },
  { label: 'Success Rate', value: '99.8%' }
];

const useCases = [
  { icon: Gamepad2, label: 'Gaming', color: 'text-blue-400' },
  { icon: Monitor, label: 'Content Creation', color: 'text-purple-400' },
  { icon: Settings, label: 'Workstation', color: 'text-green-400' },
  { icon: Cpu, label: 'AI/ML', color: 'text-orange-400' }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartBuilder,
  className
}) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm font-medium">
                <Star className="w-4 h-4 mr-2" />
                #1 PC Configuration Platform
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Build Your
                <span className="gradient-primary bg-clip-text text-transparent"> Perfect PC</span>
                <br />
                in Minutes
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Get personalized PC build recommendations tailored to your exact needs, budget, and performance requirements. 
                Our AI-powered wizard makes PC building accessible to everyone.
              </p>
            </div>

            {/* Use Cases */}
            <div className="flex flex-wrap gap-4">
              {useCases.map((useCase, index) => {
                const Icon = useCase.icon;
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Icon className={cn("w-5 h-5", useCase.color)} />
                    <span className="text-sm font-medium">{useCase.label}</span>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onStartBuilder}
                variant="hero"
                size="xl"
                className="text-lg px-8 py-4"
              >
                Start Building Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                variant="glass"
                size="xl"
                className="text-lg px-8 py-4"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>Expert verified</span>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Features */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="glass-card">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="glass-card hover:bg-card/90 transition-smooth">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};