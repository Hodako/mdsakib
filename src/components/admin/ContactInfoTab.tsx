import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface ContactInfo {
  id: string;
  phone: string;
  email: string;
  location: string;
  university: string;
  cgpa: string;
  experience_years: number;
  upwork_url: string;
  fiverr_url: string;
  behance_url: string;
}

const ContactInfoTab = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    location: '',
    university: '',
    cgpa: '',
    experience_years: 0,
    upwork_url: '',
    fiverr_url: '',
    behance_url: '',
  });

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
      
      setContactInfo(data);
      setFormData({
        phone: data.phone,
        email: data.email,
        location: data.location,
        university: data.university,
        cgpa: data.cgpa,
        experience_years: data.experience_years,
        upwork_url: data.upwork_url || '',
        fiverr_url: data.fiverr_url || '',
        behance_url: data.behance_url || '',
      });
    } catch (error) {
      console.error('Error fetching contact info:', error);
      toast({
        title: "Error",
        description: "Failed to fetch contact information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('contact_info')
        .update(formData)
        .eq('id', contactInfo?.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Contact information updated successfully",
      });
    } catch (error) {
      console.error('Error updating contact info:', error);
      toast({
        title: "Error",
        description: "Failed to update contact information",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading contact information...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Contact Information</h2>

      <Card>
        <CardHeader>
          <CardTitle>Update Contact Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  value={formData.university}
                  onChange={(e) => setFormData({...formData, university: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cgpa">CGPA</Label>
                <Input
                  id="cgpa"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({...formData, cgpa: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="experience_years">Experience (Years)</Label>
                <Input
                  id="experience_years"
                  type="number"
                  value={formData.experience_years}
                  onChange={(e) => setFormData({...formData, experience_years: parseInt(e.target.value) || 0})}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Social Media & Portfolio URLs</h3>
              
              <div>
                <Label htmlFor="upwork_url">Upwork Profile URL</Label>
                <Input
                  id="upwork_url"
                  type="url"
                  value={formData.upwork_url}
                  onChange={(e) => setFormData({...formData, upwork_url: e.target.value})}
                  placeholder="https://www.upwork.com/freelancers/..."
                />
              </div>

              <div>
                <Label htmlFor="fiverr_url">Fiverr Profile URL</Label>
                <Input
                  id="fiverr_url"
                  type="url"
                  value={formData.fiverr_url}
                  onChange={(e) => setFormData({...formData, fiverr_url: e.target.value})}
                  placeholder="https://www.fiverr.com/..."
                />
              </div>

              <div>
                <Label htmlFor="behance_url">Behance Profile URL</Label>
                <Input
                  id="behance_url"
                  type="url"
                  value={formData.behance_url}
                  onChange={(e) => setFormData({...formData, behance_url: e.target.value})}
                  placeholder="https://www.behance.net/..."
                />
              </div>
            </div>

            <Button type="submit" disabled={saving} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactInfoTab;