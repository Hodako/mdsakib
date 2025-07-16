
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  client: string;
  completion_date: string;
  blog_content: string;
  featured: boolean;
  created_at: string;
}

export default function PortfolioBlog() {
  const { id } = useParams();
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPortfolioItem();
    }
  }, [id]);

  const fetchPortfolioItem = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setItem(data);
    } catch (error) {
      console.error('Error fetching portfolio item:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Portfolio item not found</h1>
          <Button asChild>
            <Link to="/portfolio">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/portfolio">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>
          </Button>

          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary">{item.category}</Badge>
              {item.featured && <Badge variant="default">Featured</Badge>}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              {item.title}
            </h1>
            
            <p className="text-xl text-muted-foreground">{item.description}</p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              {item.client && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Client: {item.client}</span>
                </div>
              )}
              {item.completion_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Completed: {new Date(item.completion_date).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{item.category}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Image */}
        <Card className="mb-12 overflow-hidden">
          <CardContent className="p-0">
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-auto object-cover"
              style={{ maxHeight: '600px' }}
            />
          </CardContent>
        </Card>

        {/* Blog Content */}
        {item.blog_content && (
          <div className="prose prose-lg max-w-none">
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {item.blog_content}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="glass-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-display font-bold mb-4">
                Interested in Similar Work?
              </h3>
              <p className="text-muted-foreground mb-6">
                Let's collaborate to bring your vision to life with exceptional design solutions.
              </p>
              <Button asChild size="lg" className="gradient-primary hover:shadow-elegant transition-all duration-300">
                <Link to="/contact">
                  Get In Touch
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
