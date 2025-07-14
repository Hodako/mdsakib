import { GraduationCap, MapPin, Phone, Star, Award, Target, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const skills = [
  "Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Figma", "Canva Pro",
  "Logo Design", "Brand Identity", "Web Design", "Print Design", "Typography",
  "Color Theory", "Layout Design", "Social Media Graphics", "Packaging Design"
];

const experiences = [
  {
    platform: "Fiverr",
    role: "Top Rated Seller",
    duration: "2021 - Present",
    description: "Maintaining a 98% positive rating with over 200 completed projects",
    highlights: ["200+ Projects", "98% Success Rate", "Level 2 Seller"]
  },
  {
    platform: "Upwork",
    role: "Freelance Designer",
    duration: "2022 - Present", 
    description: "Specialized in brand identity and digital marketing materials",
    highlights: ["100+ Jobs", "5-Star Rating", "Top Talent Badge"]
  }
];

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
            About <span className="text-gradient">Me</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Passionate graphics designer with a perfect academic record and proven track record 
            in delivering exceptional visual solutions for clients worldwide.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Personal Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="text-2xl font-display">Personal Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">Cumilla, Daudkandi, Bangladesh</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-sm text-muted-foreground">+880324324324</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium">Education</p>
                    <p className="text-sm text-muted-foreground">North South University</p>
                    <p className="text-xs text-muted-foreground">CGPA: 4.00/4.00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="text-xl font-display">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-semibold">3+ Years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Projects</span>
                  <span className="font-semibold">300+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.9/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* About Description */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-3xl font-display">My Journey</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  My passion for design began during my academic journey at North South University, 
                  where I graduated with a perfect 4.00 CGPA in Graphics Design. This strong foundation 
                  in design principles, combined with hands-on experience, has shaped my approach to 
                  creating visually compelling and strategically effective designs.
                </p>
                
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Over the past three years, I've had the privilege of working with diverse clients 
                  across Fiverr and Upwork, completing over 300 projects ranging from brand identity 
                  design to digital marketing materials. Each project has been an opportunity to push 
                  creative boundaries while delivering results that drive business success.
                </p>

                <div className="grid md:grid-cols-3 gap-6 pt-6">
                  <div className="text-center p-6 bg-gradient-primary rounded-lg text-primary-foreground">
                    <Target className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Mission</h3>
                    <p className="text-sm opacity-90">Transform ideas into powerful visual experiences</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-accent rounded-lg text-accent-foreground">
                    <Award className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Vision</h3>
                    <p className="text-sm opacity-90">Be the go-to designer for impactful brand solutions</p>
                  </div>
                  
                  <div className="text-center p-6 gradient-primary rounded-lg text-primary-foreground">
                    <Users className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Values</h3>
                    <p className="text-sm opacity-90">Quality, creativity, and client satisfaction first</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-display font-bold text-center mb-12">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          
          <Card className="glass-card">
            <CardContent className="p-8">
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="px-4 py-2 text-sm hover-lift"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Experience Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-display font-bold text-center mb-12">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {experiences.map((exp, index) => (
              <Card key={exp.platform} className="glass-card hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-display">{exp.platform}</CardTitle>
                    <Badge variant="outline" className="border-accent text-accent">
                      {exp.duration}
                    </Badge>
                  </div>
                  <p className="text-lg font-medium text-primary">{exp.role}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight) => (
                      <Badge key={highlight} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="glass-card">
            <CardContent className="p-12">
              <h3 className="text-3xl font-display font-bold mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's collaborate to bring your vision to life with exceptional design solutions 
                that make a lasting impact.
              </p>
              <Button size="lg" className="gradient-primary hover:shadow-elegant transition-all duration-300">
                Get In Touch
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}