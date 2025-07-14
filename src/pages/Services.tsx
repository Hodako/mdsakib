import { Check, Palette, Monitor, FileText, Share2, Package, Zap, Clock, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    icon: Palette,
    title: "Brand Identity Design",
    description: "Complete brand identity packages including logo design, color palettes, typography, and brand guidelines.",
    features: [
      "Logo Design & Variations",
      "Color Palette & Typography", 
      "Brand Guidelines Document",
      "Business Card Design",
      "Letterhead & Stationery"
    ],
    price: "Starting at $299",
    popular: true
  },
  {
    icon: Monitor,
    title: "Web & Mobile Design",
    description: "User-centered web and mobile interface designs that are both beautiful and functional.",
    features: [
      "Responsive Web Design",
      "Mobile App Interface",
      "User Experience (UX) Design",
      "Prototyping & Wireframes",
      "Design System Creation"
    ],
    price: "Starting at $499",
    popular: false
  },
  {
    icon: FileText,
    title: "Print Design",
    description: "Professional print materials that make a lasting impression on your audience.",
    features: [
      "Brochures & Flyers",
      "Business Cards & Stationery",
      "Posters & Banners",
      "Annual Reports",
      "Menu & Catalog Design"
    ],
    price: "Starting at $149",
    popular: false
  },
  {
    icon: Share2,
    title: "Social Media Graphics",
    description: "Eye-catching social media visuals that boost engagement and brand awareness.",
    features: [
      "Social Media Templates",
      "Instagram Story Design",
      "Facebook Cover & Posts",
      "LinkedIn Graphics",
      "Social Media Strategy"
    ],
    price: "Starting at $99",
    popular: false
  },
  {
    icon: Package,
    title: "Packaging Design",
    description: "Innovative packaging solutions that enhance product appeal and shelf presence.",
    features: [
      "Product Packaging",
      "Label Design",
      "Box & Container Design",
      "3D Mockups",
      "Print-Ready Files"
    ],
    price: "Starting at $399",
    popular: false
  },
  {
    icon: Zap,
    title: "Express Design",
    description: "Quick turnaround design solutions for urgent projects without compromising quality.",
    features: [
      "24-48 Hour Delivery",
      "Logo Design",
      "Social Media Graphics",
      "Basic Print Materials",
      "Priority Support"
    ],
    price: "Starting at $199",
    popular: true
  }
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Brief",
    description: "We start with understanding your vision, goals, and requirements through detailed discussion."
  },
  {
    step: "02", 
    title: "Research & Strategy",
    description: "Market research and competitor analysis to ensure your design stands out effectively."
  },
  {
    step: "03",
    title: "Design & Creation",
    description: "Crafting your design with attention to detail, creativity, and brand alignment."
  },
  {
    step: "04",
    title: "Review & Refinement", 
    description: "Collaborative review process with revisions to ensure perfect final output."
  },
  {
    step: "05",
    title: "Delivery & Support",
    description: "Final files delivery with ongoing support and any additional materials needed."
  }
];

const whyChooseMe = [
  {
    icon: Award,
    title: "Proven Excellence",
    description: "Perfect 4.00 CGPA graduate with 3+ years of professional experience"
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "Consistent on-time delivery with 98% project completion rate"
  },
  {
    icon: Zap,
    title: "Creative Innovation",
    description: "Fresh, modern designs that capture attention and drive results"
  }
];

export default function Services() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
            My <span className="text-gradient">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Professional design services tailored to elevate your brand and achieve your business goals. 
            From concept to completion, I deliver excellence at every step.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className={`glass-card hover-lift group relative overflow-hidden animate-fade-in ${
                service.popular ? 'ring-2 ring-accent ring-opacity-50' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {service.popular && (
                <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground z-10">
                  Popular
                </Badge>
              )}
              
              <CardHeader className="relative">
                <div className="w-16 h-16 gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl font-display group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                  </div>
                  <Button 
                    className={`w-full transition-all duration-300 ${
                      service.popular 
                        ? 'gradient-accent hover:shadow-glow' 
                        : 'gradient-primary hover:shadow-elegant'
                    }`}
                  >
                    Get Started
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">
              My Design <span className="text-gradient">Process</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A systematic approach that ensures every project delivers exceptional results 
              and exceeds client expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <Card 
                key={step.step}
                className="glass-card hover-lift text-center animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 text-accent-foreground font-bold text-xl">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-3 font-display">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Me Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">
              Why Choose <span className="text-gradient">Me</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the difference of working with a dedicated professional 
              who puts your success first.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseMe.map((item, index) => (
              <Card 
                key={item.title}
                className="glass-card hover-lift text-center animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="glass-card">
            <CardContent className="p-12">
              <h3 className="text-4xl font-display font-bold mb-6">
                Ready to Start Your <span className="text-gradient">Project</span>?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Let's discuss your design needs and create something extraordinary together. 
                Get in touch today for a free consultation and project quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gradient-primary hover:shadow-elegant transition-all duration-300">
                  Get Free Quote
                </Button>
                <Button size="lg" variant="outline" className="hover-lift">
                  Schedule Consultation
                </Button>
              </div>
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  🚀 <strong>Quick Turnaround:</strong> Most projects delivered within 3-7 days<br/>
                  🎯 <strong>Satisfaction Guaranteed:</strong> Unlimited revisions until you're 100% happy<br/>
                  📞 <strong>Direct Communication:</strong> Work directly with me, no middlemen
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}