import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Lock, Calendar, FileText, Video, MessageCircle, Globe, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });
  const [availability, setAvailability] = useState({
    monday: { start: '09:00', end: '17:00' },
    tuesday: { start: '09:00', end: '17:00' },
    wednesday: { start: '09:00', end: '17:00' },
    thursday: { start: '09:00', end: '17:00' },
    friday: { start: '09:00', end: '17:00' },
    saturday: { start: '10:00', end: '14:00' },
    sunday: { start: '', end: '' },
  });
  const [consultationSettings, setConsultationSettings] = useState({
    videoDuration: 30,
    audioDuration: 15,
    chatResponseTime: 2,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-welli-gray-800">Settings</h1>
        <Button variant="outline" className="gap-2">
          <SettingsIcon size={16} />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User size={16} /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell size={16} /> Notifications
          </TabsTrigger>
          <TabsTrigger value="availability" className="gap-2">
            <Calendar size={16} /> Availability
          </TabsTrigger>
          <TabsTrigger value="consultation" className="gap-2">
            <Video size={16} /> Consultation
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock size={16} /> Security
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <Globe size={16} /> Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-card space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-welli-light-green flex items-center justify-center">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Doctor" className="rounded-full w-20 h-20" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-welli-gray-800">Dr. Alex</h3>
                <p className="text-welli-gray-600">Primary Care Physician</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Change Photo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input defaultValue="Alex" />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input defaultValue="Smith" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue="alex.smith@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input defaultValue="+1 (555) 123-4567" type="tel" />
              </div>
              <div className="space-y-2">
                <Label>Specialization</Label>
                <Select defaultValue="primary-care">
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary-care">Primary Care</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>License Number</Label>
                <Input defaultValue="MD123456" />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-card space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-welli-gray-600">Receive notifications via email</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-welli-gray-600">Receive push notifications on your devices</p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">SMS Notifications</h3>
                  <p className="text-sm text-welli-gray-600">Receive notifications via SMS</p>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="availability" className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-card space-y-6">
            <div className="space-y-4">
              {Object.entries(availability).map(([day, times]) => (
                <div key={day} className="flex items-center justify-between">
                  <div className="w-32">
                    <h3 className="font-medium capitalize">{day}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={times.start}
                      onChange={(e) => setAvailability({
                        ...availability,
                        [day]: { ...times, start: e.target.value }
                      })}
                      className="w-32"
                    />
                    <span>to</span>
                    <Input
                      type="time"
                      value={times.end}
                      onChange={(e) => setAvailability({
                        ...availability,
                        [day]: { ...times, end: e.target.value }
                      })}
                      className="w-32"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="consultation" className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-card space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Video Consultation Duration</h3>
                  <p className="text-sm text-welli-gray-600">Default duration for video consultations</p>
                </div>
                <Select
                  value={consultationSettings.videoDuration.toString()}
                  onValueChange={(value) => setConsultationSettings({
                    ...consultationSettings,
                    videoDuration: parseInt(value)
                  })}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Audio Consultation Duration</h3>
                  <p className="text-sm text-welli-gray-600">Default duration for audio consultations</p>
                </div>
                <Select
                  value={consultationSettings.audioDuration.toString()}
                  onValueChange={(value) => setConsultationSettings({
                    ...consultationSettings,
                    audioDuration: parseInt(value)
                  })}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Chat Response Time</h3>
                  <p className="text-sm text-welli-gray-600">Expected response time for chat messages</p>
                </div>
                <Select
                  value={consultationSettings.chatResponseTime.toString()}
                  onValueChange={(value) => setConsultationSettings({
                    ...consultationSettings,
                    chatResponseTime: parseInt(value)
                  })}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                    <SelectItem value="8">8 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-card space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" />
              </div>
              <Button className="w-full">Update Password</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-card space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-welli-gray-600">Enable dark mode for the application</p>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Language</h3>
                  <p className="text-sm text-welli-gray-600">Select your preferred language</p>
                </div>
                <Select defaultValue="en">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Time Zone</h3>
                  <p className="text-sm text-welli-gray-600">Set your local time zone</p>
                </div>
                <Select defaultValue="est">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">EST</SelectItem>
                    <SelectItem value="pst">PST</SelectItem>
                    <SelectItem value="cst">CST</SelectItem>
                    <SelectItem value="mst">MST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
