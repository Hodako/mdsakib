
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, User, Lock, FileText } from 'lucide-react';

const AdminSettingsTab = () => {
  const [photo, setPhoto] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUrl, setCvUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin')
        .select('photo_url')
        .eq('username', 'sakib')
        .single();

      if (error) throw error;
      if (data?.photo_url) {
        setPhoto(data.photo_url);
      }

      // Fetch CV URL from contact_info or admin table
      const { data: contactData } = await supabase
        .from('contact_info')
        .select('*')
        .single();

      if (contactData) {
        // Assuming we add a cv_url field to contact_info table later
        setCvUrl(contactData.cv_url || '');
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const handlePhotoUpdate = async () => {
    if (!photo) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('admin')
        .update({ photo_url: photo })
        .eq('username', 'sakib');

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile photo updated successfully",
      });
    } catch (error) {
      console.error('Error updating photo:', error);
      toast({
        title: "Error",
        description: "Failed to update profile photo",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // In a real implementation, you would hash the password
      const { error } = await supabase
        .from('admin')
        .update({ password_hash: newPassword }) // In production, hash this!
        .eq('username', 'sakib');

      if (error) throw error;

      toast({
        title: "Success",
        description: "Password updated successfully",
      });

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCvUpload = async () => {
    if (!cvFile) return;

    setLoading(true);
    try {
      // Create a file name
      const fileExt = cvFile.name.split('.').pop();
      const fileName = `cv-${Date.now()}.${fileExt}`;

      // Upload to storage (you would need to create a storage bucket for this)
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, cvFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;

      // Update contact_info with CV URL
      const { error: updateError } = await supabase
        .from('contact_info')
        .update({ cv_url: publicUrl })
        .eq('id', (await supabase.from('contact_info').select('id').single()).data?.id);

      if (updateError) throw updateError;

      setCvUrl(publicUrl);
      setCvFile(null);

      toast({
        title: "Success",
        description: "CV uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading CV:', error);
      toast({
        title: "Error",
        description: "Failed to upload CV. Storage bucket may not be configured.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Settings</h2>
      </div>

      <div className="grid gap-6">
        {/* Profile Photo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Photo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              {photo && (
                <img
                  src={photo}
                  alt="Admin profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <Label htmlFor="photo">Photo URL</Label>
                <Input
                  id="photo"
                  type="url"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  placeholder="Enter photo URL"
                />
              </div>
            </div>
            <Button onClick={handlePhotoUpdate} disabled={loading}>
              Update Photo
            </Button>
          </CardContent>
        </Card>

        {/* CV Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              CV Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cv">Upload CV</Label>
              <Input
                id="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCvFile(e.target.files?.[0] || null)}
              />
            </div>
            {cvUrl && (
              <p className="text-sm text-muted-foreground">
                Current CV: <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View CV</a>
              </p>
            )}
            <Button onClick={handleCvUpload} disabled={loading || !cvFile}>
              <Upload className="h-4 w-4 mr-2" />
              Upload CV
            </Button>
          </CardContent>
        </Card>

        {/* Password Change */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button onClick={handlePasswordUpdate} disabled={loading}>
              Update Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettingsTab;
