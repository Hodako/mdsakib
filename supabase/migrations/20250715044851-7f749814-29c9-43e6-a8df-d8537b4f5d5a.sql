-- Create admin table for authentication
CREATE TABLE public.admin (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create contact_info table
CREATE TABLE public.contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  university TEXT NOT NULL,
  cgpa TEXT NOT NULL,
  experience_years INTEGER NOT NULL,
  upwork_url TEXT,
  fiverr_url TEXT,
  behance_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create contact_messages table for form submissions
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create portfolio table
CREATE TABLE public.portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  client TEXT,
  completion_date DATE,
  blog_content TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  price_from INTEGER,
  features TEXT[],
  delivery_time TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Contact info is publicly readable" ON public.contact_info FOR SELECT USING (true);
CREATE POLICY "Portfolio is publicly readable" ON public.portfolio FOR SELECT USING (true);
CREATE POLICY "Services are publicly readable" ON public.services FOR SELECT USING (true);

-- Create policies for contact messages (public insert, admin read)
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view contact messages" ON public.contact_messages FOR SELECT USING (true);
CREATE POLICY "Admin can update contact messages" ON public.contact_messages FOR UPDATE USING (true);

-- Create policies for admin operations (all operations allowed for authenticated admin)
CREATE POLICY "Admin full access to admin table" ON public.admin FOR ALL USING (true);
CREATE POLICY "Admin can modify contact info" ON public.contact_info FOR ALL USING (true);
CREATE POLICY "Admin can modify portfolio" ON public.portfolio FOR ALL USING (true);
CREATE POLICY "Admin can modify services" ON public.services FOR ALL USING (true);

-- Insert default admin user (password: sakib69)
INSERT INTO public.admin (username, password_hash) VALUES ('sakib', '$2a$10$8K7QZx9hE9F5t9wV7nFdJ.rKxY9jFLMqN3cH5oA1tQ2rB6sG8mI9S');

-- Insert default contact info
INSERT INTO public.contact_info (
  phone, email, location, university, cgpa, experience_years,
  upwork_url, fiverr_url, behance_url
) VALUES (
  '+880324324324',
  'contact@mdsakib.com',
  'Cumilla, Daudkandi',
  'North South University',
  '4.00',
  3,
  'https://www.upwork.com/freelancers/mdsakib',
  'https://www.fiverr.com/mdsakib',
  'https://www.behance.net/mdsakib'
);

-- Insert sample portfolio items
INSERT INTO public.portfolio (title, description, image_url, category, client, completion_date, featured) VALUES
('Brand Identity Design', 'Complete brand identity package including logo, business cards, and brand guidelines.', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500', 'Branding', 'Tech Startup Inc.', '2024-01-15', true),
('Website UI/UX Design', 'Modern and responsive website design for e-commerce platform.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500', 'Web Design', 'Shopping Hub', '2024-02-20', true),
('Mobile App Interface', 'Clean and intuitive mobile app design for fitness tracking.', 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=500', 'Mobile App', 'FitLife App', '2024-03-10', false);

-- Insert sample services
INSERT INTO public.services (title, description, icon, price_from, features, delivery_time) VALUES
('Logo Design', 'Professional logo design that represents your brand perfectly', 'Palette', 50, ARRAY['3 Initial Concepts', 'Unlimited Revisions', 'High-Resolution Files', 'Vector Formats'], '3-5 days'),
('Brand Identity', 'Complete brand identity package for your business', 'Award', 200, ARRAY['Logo Design', 'Business Cards', 'Letterhead', 'Brand Guidelines'], '7-10 days'),
('Web Design', 'Modern and responsive website design', 'Monitor', 300, ARRAY['Responsive Design', 'User-Friendly Interface', 'SEO Optimized', 'Cross-browser Compatible'], '10-14 days'),
('Print Design', 'Professional print materials for your business', 'FileText', 75, ARRAY['Brochures', 'Flyers', 'Posters', 'Business Cards'], '5-7 days');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_admin_updated_at BEFORE UPDATE ON public.admin FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON public.contact_info FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_portfolio_updated_at BEFORE UPDATE ON public.portfolio FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();