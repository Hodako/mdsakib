import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut, MessageSquare, Briefcase, Settings, User, FileText } from 'lucide-react';
import ContactMessagesTab from '@/components/admin/ContactMessagesTab';
import PortfolioManagementTab from '@/components/admin/PortfolioManagementTab';
import ServicesManagementTab from '@/components/admin/ServicesManagementTab';
import ContactInfoTab from '@/components/admin/ContactInfoTab';
import AdminSettingsTab from '@/components/admin/AdminSettingsTab';

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAdmin();
  const [activeTab, setActiveTab] = useState('messages');

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button onClick={logout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Contact Info
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages">
            <ContactMessagesTab />
          </TabsContent>

          <TabsContent value="portfolio">
            <PortfolioManagementTab />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManagementTab />
          </TabsContent>

          <TabsContent value="contact">
            <ContactInfoTab />
          </TabsContent>

          <TabsContent value="settings">
            <AdminSettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;