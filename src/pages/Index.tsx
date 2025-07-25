import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Cpu, 
  Zap, 
  Shield, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  Gamepad2,
  Video,
  Code,
  Palette,
  Building,
  Mic
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { HeroSection } from '@/components/Hero/HeroSection';
import { PCBuilderWizard } from '@/components/PCBuilder/PCBuilderWizard';
import { PCBuildFormData } from '@/components/PCBuilder/types';

const Index = () => {
  const [showWizard, setShowWizard] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [buildResults, setBuildResults] = useState<PCBuildFormData | null>(null);

  const handleStartBuilder = () => {
    setShowWizard(true);
  };

  const handleBackToHome = () => {
    setShowWizard(false);
    setShowResults(false);
  };

  const handleBuilderComplete = (data: PCBuildFormData) => {
    setBuildResults(data);
    setShowResults(true);
    setShowWizard(false);
  };

  if (showWizard) {
    return (
      <PCBuilderWizard
        onComplete={handleBuilderComplete}
        onBack={handleBackToHome}
      />
    );
  }

  if (showResults && buildResults) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <CheckCircle className="w-5 h-5 mr-2" />
                Build Complete!
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold">
                Your Perfect PC Build
                <span className="gradient-primary bg-clip-text text-transparent"> Awaits</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We've analyzed your requirements and created personalized recommendations. 
                Check your email for detailed component lists, pricing, and assembly guides.
              </p>
            </div>

            <Card className="glass-card max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
                <CardDescription>
                  Your comprehensive PC build guide is on the way
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-sm">1</span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Email Recommendations</div>
                      <div className="text-sm text-muted-foreground">Detailed component list with current pricing</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-accent-foreground font-bold text-sm">2</span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Assembly Guide</div>
                      <div className="text-sm text-muted-foreground">Step-by-step building instructions</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-secondary-foreground font-bold text-sm">3</span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Ongoing Support</div>
                      <div className="text-sm text-muted-foreground">Expert help throughout your build process</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => setShowWizard(true)}
                variant="outline"
                size="lg"
              >
                Build Another PC
              </Button>
              
              <Button
                onClick={handleBackToHome}
                variant="hero"
                size="lg"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection onStartBuilder={handleStartBuilder} />

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="text-sm">
              Why Choose Our Platform
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold">
              The Smartest Way to
              <span className="gradient-primary bg-clip-text text-transparent"> Build PCs</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our advanced platform combines expert knowledge with cutting-edge technology 
              to deliver personalized PC recommendations that perfectly match your needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="glass-card hover:scale-105 transition-bounce">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Cpu className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Intelligent Matching</CardTitle>
                <CardDescription>
                  Our AI analyzes thousands of component combinations to find the perfect match for your specific requirements.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover:scale-105 transition-bounce">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
                <CardTitle>Compatibility Verified</CardTitle>
                <CardDescription>
                  Every build is thoroughly tested for compatibility, ensuring all components work seamlessly together.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover:scale-105 transition-bounce">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/30 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-foreground" />
                </div>
                <CardTitle>Expert Guidance</CardTitle>
                <CardDescription>
                  Get recommendations from PC building experts with years of experience in system optimization.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary">Perfect For Every Need</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold">
              Built for
              <span className="gradient-primary bg-clip-text text-transparent"> Every Purpose</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Gamepad2, title: 'Gaming Builds', desc: 'High-performance gaming rigs for 1080p to 4K gaming', color: 'from-blue-500 to-purple-600' },
              { icon: Video, title: 'Content Creation', desc: 'Powerful workstations for video editing and streaming', color: 'from-red-500 to-pink-600' },
              { icon: Code, title: 'Development', desc: 'Developer-focused builds for coding and compilation', color: 'from-green-500 to-teal-600' },
              { icon: Palette, title: 'Design & CAD', desc: 'Professional workstations for 3D modeling and design', color: 'from-purple-500 to-indigo-600' },
              { icon: Building, title: 'Office & Business', desc: 'Efficient business computers for productivity', color: 'from-gray-500 to-slate-600' },
              { icon: Mic, title: 'Streaming Setup', desc: 'Complete streaming rigs with encoding power', color: 'from-pink-500 to-rose-600' }
            ].map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <Card key={index} className="glass-card group hover:scale-105 transition-bounce relative overflow-hidden">
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10", useCase.color)} />
                  <CardHeader className="relative z-10">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-smooth">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                    <CardDescription>{useCase.desc}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <Card className="glass-card max-w-4xl mx-auto">
            <CardContent className="p-12 text-center space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Award className="w-5 h-5 mr-2" />
                  Ready to Build?
                </Badge>
                
                <h2 className="text-3xl lg:text-5xl font-bold">
                  Start Building Your
                  <span className="gradient-primary bg-clip-text text-transparent"> Dream PC</span>
                </h2>
                
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of satisfied builders who found their perfect PC configuration through our platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleStartBuilder}
                  variant="premium"
                  size="xl"
                  className="text-lg px-12 py-4"
                >
                  Build Your PC Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button
                  variant="glass"
                  size="xl"
                  className="text-lg px-12 py-4"
                >
                  View Sample Builds
                </Button>
              </div>

              <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent" />
                  <span>4.9/5 Rating</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Free Forever</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent" />
                  <span>Expert Support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
