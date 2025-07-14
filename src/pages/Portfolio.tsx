import { useState } from "react";
import { ExternalLink, Eye, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = ["All", "Branding", "Web Design", "Print", "Social Media", "Packaging"];

const portfolioItems = [
  {
    id: 1,
    title: "TechFlow Brand Identity",
    category: "Branding",
    description: "Complete brand identity package for a tech startup including logo, business cards, and brand guidelines.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    tags: ["Logo Design", "Brand Guidelines", "Stationery"],
    featured: true
  },
  {
    id: 2,
    title: "EcoLife Website Design",
    category: "Web Design", 
    description: "Modern, responsive website design for an environmental organization focused on sustainability.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    tags: ["UI/UX", "Responsive", "Environmental"],
    featured: true
  },
  {
    id: 3,
    title: "Coffee Culture Packaging",
    category: "Packaging",
    description: "Premium coffee packaging design that captures the artisanal quality and brand essence.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=400&fit=crop",
    tags: ["Package Design", "Coffee", "Premium"],
    featured: false
  },
  {
    id: 4,
    title: "Social Campaign Graphics",
    category: "Social Media",
    description: "Engaging social media graphics series for a fitness brand's awareness campaign.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    tags: ["Social Media", "Campaign", "Fitness"],
    featured: false
  },
  {
    id: 5,
    title: "Annual Report Design",
    category: "Print",
    description: "Clean and professional annual report design for a financial services company.",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop",
    tags: ["Print Design", "Corporate", "Annual Report"],
    featured: true
  },
  {
    id: 6,
    title: "Restaurant Menu Design",
    category: "Print",
    description: "Elegant menu design for a fine dining restaurant with focus on typography and layout.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
    tags: ["Menu Design", "Restaurant", "Typography"],
    featured: false
  },
  {
    id: 7,
    title: "Mobile App Interface",
    category: "Web Design",
    description: "User-centered mobile app design for a productivity tool with clean, intuitive interface.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    tags: ["Mobile App", "UI/UX", "Productivity"],
    featured: false
  },
  {
    id: 8,
    title: "Fashion Brand Identity",
    category: "Branding",
    description: "Sophisticated brand identity for a luxury fashion brand including logo and brand collateral.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    tags: ["Fashion", "Luxury", "Brand Identity"],
    featured: true
  }
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const filteredItems = selectedCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const featuredItems = portfolioItems.filter(item => item.featured);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
            My <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A showcase of my creative work spanning brand identity, web design, print materials, 
            and digital graphics. Each project represents a unique solution crafted with passion and precision.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item, index) => (
              <Card 
                key={item.id} 
                className="glass-card hover-lift group cursor-pointer overflow-hidden"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white space-y-2">
                      <Eye className="w-6 h-6 mx-auto" />
                      <p className="text-sm font-medium">View Project</p>
                    </div>
                  </div>
                  <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                    Featured
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <Badge variant="secondary" className="text-xs mb-2">
                    {item.category}
                  </Badge>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`transition-all duration-300 ${
                selectedCategory === category 
                  ? "gradient-primary shadow-elegant" 
                  : "hover-lift"
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <Card 
              key={item.id}
              className="glass-card hover-lift group cursor-pointer overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white space-y-4">
                    <Eye className="w-8 h-8 mx-auto" />
                    <p className="font-medium">View Details</p>
                    <Button size="sm" variant="secondary" className="opacity-90 hover:opacity-100">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open
                    </Button>
                  </div>
                </div>
                {item.featured && (
                  <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                    Featured
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <Badge variant="outline" className="border-accent/20 text-accent">
                    {item.category}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="glass-card">
            <CardContent className="p-12">
              <h3 className="text-3xl font-display font-bold mb-4">
                Like What You See?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Ready to create something amazing together? Let's discuss your project 
                and bring your vision to life with exceptional design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gradient-primary hover:shadow-elegant transition-all duration-300">
                  Start Your Project
                </Button>
                <Button size="lg" variant="outline" className="hover-lift">
                  View More Work
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}