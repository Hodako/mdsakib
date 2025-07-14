import { useEffect, useState } from "react";
import { ArrowRight, Download, Star, Users, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const statsData = [
  { icon: Users, label: "Happy Clients", value: "150+" },
  { icon: Award, label: "Projects Completed", value: "300+" },
  { icon: Star, label: "5-Star Reviews", value: "98%" },
  { icon: Clock, label: "Years Experience", value: "3+" },
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background" />
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className={`space-y-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
                  <Star className="w-4 h-4 mr-2" />
                  Professional Graphics Designer
                </div>
                
                <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight">
                  I am
                  <span className="block text-gradient animate-glow">
                    a Designer
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  Creating visual experiences that captivate audiences and drive business growth. 
                  With 3+ years of expertise on Fiverr and Upwork, I transform ideas into stunning visual realities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="group gradient-primary hover:shadow-elegant transition-all duration-300"
                >
                  View Portfolio
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="group hover-lift"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download CV
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {statsData.map((stat, index) => (
                  <div 
                    key={stat.label}
                    className={`text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 gradient-accent rounded-lg mb-2">
                      <stat.icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Designer Image */}
            <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="relative">
                {/* Floating elements */}
                <div className="absolute -top-10 -left-10 w-20 h-20 gradient-primary rounded-full animate-float opacity-20" />
                <div className="absolute -bottom-10 -right-10 w-32 h-32 gradient-accent rounded-full animate-float opacity-20" style={{ animationDelay: '1s' }} />
                
                {/* Main image container */}
                <div className="relative glass-card p-8 hover-glow transition-all duration-500">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3d/Sakib_Shariar.png"
                      alt="MD Sakib - Graphics Designer"
                      className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                      style={{ maxHeight: '600px' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                  
                  {/* Floating info card */}
                  <Card className="absolute -bottom-6 -right-6 glass-card border-accent/20 hover-lift">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <div>
                          <p className="font-semibold text-sm">Available for work</p>
                          <p className="text-xs text-muted-foreground">Cumilla, Bangladesh</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-display font-bold text-foreground">
                  Crafting Digital Excellence
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  As a graduate from North South University with a perfect CGPA of 4.00 in Graphics Design, 
                  I bring academic excellence and real-world experience to every project. My journey spans 
                  across multiple platforms, delivering exceptional results for clients worldwide.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card className="glass-card hover-lift">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">4.00</div>
                    <div className="text-sm text-muted-foreground">CGPA</div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card hover-lift">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-accent mb-2">NSU</div>
                    <div className="text-sm text-muted-foreground">Graduate</div>
                  </CardContent>
                </Card>
              </div>

              <Button className="group gradient-primary hover:shadow-elegant transition-all duration-300">
                Learn More About Me
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="relative">
              <div className="glass-card p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span className="text-muted-foreground">Specialized in Brand Identity</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-muted-foreground">Web & Mobile UI/UX Design</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span className="text-muted-foreground">Print & Digital Marketing Materials</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-muted-foreground">Social Media Graphics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}