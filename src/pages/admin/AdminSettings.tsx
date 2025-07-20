import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Settings, Bell, Shield, Palette, Globe, Mail, Database } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useToast } from '@/hooks/use-toast';

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: 'Travel Booking Platform',
    siteDescription: 'Your one-stop destination for hotel and flight bookings',
    supportEmail: 'support@example.com',
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: false,
    autoBookingConfirmation: true,
    allowGuestBooking: true,
    maxBookingDays: 365,
    cancellationPeriod: 24
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 lg:ml-64">
          <div className="p-4 lg:p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center space-x-3 mb-2">
                <Settings className="h-8 w-8 text-blue-600" />
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Settings</h1>
              </div>
              <p className="text-gray-600">
                Configure your platform settings and preferences
              </p>
            </motion.div>

            {/* Settings Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full lg:w-auto">
                  <TabsTrigger value="general" className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">General</span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <span className="hidden sm:inline">Notifications</span>
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span className="hidden sm:inline">Security</span>
                  </TabsTrigger>
                  <TabsTrigger value="system" className="flex items-center space-x-2">
                    <Database className="h-4 w-4" />
                    <span className="hidden sm:inline">System</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                      <CardTitle className="flex items-center space-x-2">
                        <Globe className="h-5 w-5" />
                        <span>Site Configuration</span>
                      </CardTitle>
                      <CardDescription className="text-blue-100">
                        Basic site settings and information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="siteName">Site Name</Label>
                          <Input
                            id="siteName"
                            value={settings.siteName}
                            onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="supportEmail">Support Email</Label>
                          <Input
                            id="supportEmail"
                            type="email"
                            value={settings.supportEmail}
                            onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="siteDescription">Site Description</Label>
                        <Textarea
                          id="siteDescription"
                          value={settings.siteDescription}
                          onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Maintenance Mode</Label>
                            <p className="text-sm text-gray-600">Enable to put the site under maintenance</p>
                          </div>
                          <Switch
                            checked={settings.maintenanceMode}
                            onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Allow Guest Booking</Label>
                            <p className="text-sm text-gray-600">Allow users to book without registration</p>
                          </div>
                          <Switch
                            checked={settings.allowGuestBooking}
                            onCheckedChange={(checked) => setSettings({...settings, allowGuestBooking: checked})}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                      <CardTitle className="flex items-center space-x-2">
                        <Bell className="h-5 w-5" />
                        <span>Notification Settings</span>
                      </CardTitle>
                      <CardDescription className="text-green-100">
                        Configure how and when to send notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-gray-600">Send booking confirmations via email</p>
                          </div>
                          <Switch
                            checked={settings.emailNotifications}
                            onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>SMS Notifications</Label>
                            <p className="text-sm text-gray-600">Send booking updates via SMS</p>
                          </div>
                          <Switch
                            checked={settings.smsNotifications}
                            onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Auto Booking Confirmation</Label>
                            <p className="text-sm text-gray-600">Automatically confirm bookings after payment</p>
                          </div>
                          <Switch
                            checked={settings.autoBookingConfirmation}
                            onCheckedChange={(checked) => setSettings({...settings, autoBookingConfirmation: checked})}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-t-lg">
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="h-5 w-5" />
                        <span>Security Settings</span>
                      </CardTitle>
                      <CardDescription className="text-red-100">
                        Configure security and access controls
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="maxBookingDays">Max Booking Days Ahead</Label>
                          <Input
                            id="maxBookingDays"
                            type="number"
                            value={settings.maxBookingDays}
                            onChange={(e) => setSettings({...settings, maxBookingDays: parseInt(e.target.value)})}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cancellationPeriod">Cancellation Period (hours)</Label>
                          <Input
                            id="cancellationPeriod"
                            type="number"
                            value={settings.cancellationPeriod}
                            onChange={(e) => setSettings({...settings, cancellationPeriod: parseInt(e.target.value)})}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Security Features</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <Card className="p-4">
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-600 mb-3">Add an extra layer of security</p>
                            <Button variant="outline" size="sm">Configure</Button>
                          </Card>
                          <Card className="p-4">
                            <h4 className="font-medium">API Rate Limiting</h4>
                            <p className="text-sm text-gray-600 mb-3">Protect against abuse</p>
                            <Button variant="outline" size="sm">Configure</Button>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="system" className="space-y-6">
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
                      <CardTitle className="flex items-center space-x-2">
                        <Database className="h-5 w-5" />
                        <span>System Settings</span>
                      </CardTitle>
                      <CardDescription className="text-purple-100">
                        Advanced system configuration and maintenance
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="p-4">
                          <h4 className="font-medium mb-2">Database Backup</h4>
                          <p className="text-sm text-gray-600 mb-3">Create a backup of your database</p>
                          <Button variant="outline" size="sm">Create Backup</Button>
                        </Card>
                        <Card className="p-4">
                          <h4 className="font-medium mb-2">Cache Management</h4>
                          <p className="text-sm text-gray-600 mb-3">Clear application cache</p>
                          <Button variant="outline" size="sm">Clear Cache</Button>
                        </Card>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">System Information</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Version</p>
                            <p className="font-semibold">1.0.0</p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Database</p>
                            <p className="font-semibold">PostgreSQL</p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Cache</p>
                            <p className="font-semibold">Redis</p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Storage</p>
                            <p className="font-semibold">S3</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;