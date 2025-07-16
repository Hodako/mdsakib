import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, User, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Contact() {
  const [contactInfo, setContactInfo] = useState([
    {
      icon: MapPin,
      title: "Location",
      details: ["Cumilla, Daudkandi", "Bangladesh"],
      color: "text-primary"
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+880324324324", "Available 9 AM - 6 PM"],
      color: "text-accent"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["sakib@designer.com", "Response within 24 hours"],
      color: "text-primary"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Fri: 9 AM - 6 PM", "Weekend: By appointment"],
      color: "text-accent"
    }
  ]);

  const [socialLinks, setSocialLinks] = useState([
    { name: "Fiverr", url: "#", color: "bg-green-500" },
    { name: "Upwork", url: "#", color: "bg-green-600" },
    { name: "Behance", url: "#", color: "bg-blue-500" },
    { name: "Dribbble", url: "#", color: "bg-pink-500" }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .single();

      if (error) throw error;

      if (data) {
        setContactInfo([
          {
            icon: MapPin,
            title: "Location",
            details: [data.location, "Bangladesh"],
            color: "text-primary"
          },
          {
            icon: Phone,
            title: "Phone",
            details: [data.phone, "Available 9 AM - 6 PM"],
            color: "text-accent"
          },
          {
            icon: Mail,
            title: "Email",
            details: [data.email, "Response within 24 hours"],
            color: "text-primary"
          },
          {
            icon: Clock,
            title: "Working Hours",
            details: ["Mon - Fri: 9 AM - 6 PM", "Weekend: By appointment"],
            color: "text-accent"
          }
        ]);

        setSocialLinks([
          { name: "Fiverr", url: data.fiverr_url || "#", color: "bg-green-500" },
          { name: "Upwork", url: data.upwork_url || "#", color: "bg-green-600" },
          { name: "Behance", url: data.behance_url || "#", color: "bg-blue-500" }
        ]);
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          status: 'unread'
        }]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to bring your vision to life? Let's discuss your project and create something amazing together. 
            I'm here to help transform your ideas into stunning visual experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-3xl font-display flex items-center">
                  <MessageSquare className="w-8 h-8 text-primary mr-3" />
                  Send Me a Message
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Brief subject of your inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full gradient-primary hover:shadow-elegant transition-all duration-300 group"
                  >
                    <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl font-display">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={info.title} className="flex items-start space-x-4">
                    <div className={`w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <info.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl font-display">Find Me Online</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.name}
                      variant="outline"
                      className="hover-lift transition-all duration-300"
                      asChild
                    >
                      <a href={social.url && social.url !== "#" ? social.url : "#"} target="_blank" rel="noopener noreferrer">
                        <div className={`w-3 h-3 rounded-full ${social.color} mr-2`} />
                        {social.name}
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Quick Response</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    I typically respond to all inquiries within 24 hours during business days.
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-green-600 font-medium">Available for new projects</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <Card className="glass-card">
            <CardContent className="p-12">
              <h3 className="text-3xl font-display font-bold mb-6">
                Frequently Asked Questions
              </h3>
              <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                <div>
                  <h4 className="font-semibold text-lg mb-2">What's your typical turnaround time?</h4>
                  <p className="text-muted-foreground text-sm">
                    Most projects are completed within 3-7 business days, depending on complexity. 
                    Express services are available for urgent projects.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Do you offer revisions?</h4>
                  <p className="text-muted-foreground text-sm">
                    Yes! I include unlimited revisions until you're 100% satisfied with the final result. 
                    Your satisfaction is my priority.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">What file formats do you provide?</h4>
                  <p className="text-muted-foreground text-sm">
                    I provide all necessary file formats including PNG, JPG, PDF, AI, PSD, and any 
                    specific formats required for your project.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">How do we communicate during the project?</h4>
                  <p className="text-muted-foreground text-sm">
                    Direct communication via email, WhatsApp, or your preferred platform. 
                    Regular updates and quick responses guaranteed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}