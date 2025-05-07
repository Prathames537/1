
import { useState } from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { 
  User, Camera, CreditCard, Upload, Languages, Bell, Shield, 
  Settings as SettingsIcon, CheckCircle, ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Button>Save Changes</Button>
      </div>

      <Tabs defaultValue="profile">
        <div className="flex overflow-auto pb-2">
          <TabsList className="inline-flex h-auto p-1 gap-x-1">
            <TabsTrigger value="profile" className="flex items-center gap-1.5 px-3">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-1.5 px-3">
              <SettingsIcon className="h-4 w-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-1.5 px-3">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-1.5 px-3">
              <CreditCard className="h-4 w-4" />
              <span>Payment</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-1.5 px-3">
              <Shield className="h-4 w-4" />
              <span>Privacy</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and profile picture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile picture */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </div>
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 bg-welli-main text-white rounded-full p-1.5 cursor-pointer"
                  >
                    <Camera className="h-4 w-4" />
                  </label>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
                
                <div>
                  <h3 className="font-medium">Profile Picture</h3>
                  <p className="text-sm text-welli-textSecondary mt-1">
                    Upload a clear photo of yourself. This will be visible to patients.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              {/* Personal information */}
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input id="full-name" defaultValue="Sarah Johnson" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue="sarah.j@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+1 (555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue="New York, NY" />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile}>
                        Save Changes
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-welli-textSecondary">Full Name</p>
                        <p className="font-medium">Sarah Johnson</p>
                      </div>
                      <div>
                        <p className="text-sm text-welli-textSecondary">Email</p>
                        <p className="font-medium">sarah.j@example.com</p>
                      </div>
                      <div>
                        <p className="text-sm text-welli-textSecondary">Phone Number</p>
                        <p className="font-medium">+1 (555) 123-4567</p>
                      </div>
                      <div>
                        <p className="text-sm text-welli-textSecondary">Location</p>
                        <p className="font-medium">New York, NY</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    </div>
                  </>
                )}
              </div>
              
              <Separator />
              
              {/* Professional information */}
              <div>
                <h3 className="font-medium mb-4">Professional Information</h3>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-md">
                    <div>
                      <p className="font-medium">Medical Assistant License</p>
                      <p className="text-sm text-welli-textSecondary mt-1">
                        License #MA12345 • Expires: Jan 15, 2026
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 w-fit">
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-md">
                    <div>
                      <p className="font-medium">CPR Certification</p>
                      <p className="text-sm text-welli-textSecondary mt-1">
                        Expires: Mar 22, 2026
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 w-fit">
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-md">
                    <div>
                      <p className="font-medium">ID Verification</p>
                      <p className="text-sm text-welli-textSecondary mt-1">
                        Government-issued photo ID
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 w-fit">
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-md border-dashed">
                    <div>
                      <p className="font-medium">Upload New Credential</p>
                      <p className="text-sm text-welli-textSecondary mt-1">
                        Add any additional certifications or licenses
                      </p>
                    </div>
                    <Button variant="outline" className="flex items-center gap-1.5">
                      <Upload className="h-4 w-4" />
                      <span>Upload</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Skills & Experience</CardTitle>
              <CardDescription>
                Update your professional skills and experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="specialties">Medical Specialties</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge>Blood Collection</Badge>
                  <Badge>X-Ray Assistant</Badge>
                  <Badge>Vital Monitoring</Badge>
                  <Badge>Geriatric Care</Badge>
                  <Button variant="outline" size="sm" className="h-6">
                    + Add
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="languages">Languages Spoken</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge>English (Fluent)</Badge>
                  <Badge>Spanish (Intermediate)</Badge>
                  <Button variant="outline" size="sm" className="h-6">
                    + Add
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select defaultValue="3-5">
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Account Tab */}
        <TabsContent value="account" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-welli-textSecondary mt-1">
                      Update your password for enhanced security
                    </p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-welli-textSecondary mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Language Preferences</p>
                    <p className="text-sm text-welli-textSecondary mt-1">
                      Set your preferred language for the application
                    </p>
                  </div>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">
                        <div className="flex items-center">
                          <Languages className="h-4 w-4 mr-2" />
                          <span>English</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="es">
                        <div className="flex items-center">
                          <Languages className="h-4 w-4 mr-2" />
                          <span>Spanish</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="fr">
                        <div className="flex items-center">
                          <Languages className="h-4 w-4 mr-2" />
                          <span>French</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Account Status</p>
                    <p className="text-sm text-welli-textSecondary mt-1">
                      Your account is active and in good standing
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions for your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Deactivate Account</p>
                  <p className="text-sm text-welli-textSecondary mt-1">
                    Temporarily disable your account
                  </p>
                </div>
                <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                  Deactivate
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">App Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p>New Visit Assignments</p>
                        <p className="text-sm text-welli-textSecondary">
                          Get notified when you're assigned a new visit
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Visit Reminders</p>
                        <p className="text-sm text-welli-textSecondary">
                          Receive reminders before scheduled visits
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Payment Updates</p>
                        <p className="text-sm text-welli-textSecondary">
                          Notifications about your earnings and payments
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Learning Updates</p>
                        <p className="text-sm text-welli-textSecondary">
                          New modules and learning resources
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Weekly Summary</p>
                        <p className="text-sm text-welli-textSecondary">
                          Get a weekly report of your visits and earnings
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Promotional Emails</p>
                        <p className="text-sm text-welli-textSecondary">
                          Receive updates about bonuses and special offers
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">SMS Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Urgent Visit Updates</p>
                        <p className="text-sm text-welli-textSecondary">
                          Receive SMS for urgent or high-priority visits
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Schedule Changes</p>
                        <p className="text-sm text-welli-textSecondary">
                          Get notified when your schedule is modified
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Payment Tab */}
        <TabsContent value="payment" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment options for receiving earnings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-md bg-welli-background">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-md">
                      <CreditCard className="h-6 w-6 text-welli-accent" />
                    </div>
                    <div>
                      <p className="font-medium">HDFC Bank</p>
                      <p className="text-sm text-welli-textSecondary">
                        Account ending in ****6789
                      </p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <CreditCard className="h-6 w-6 text-welli-textSecondary" />
                    </div>
                    <div>
                      <p className="font-medium">UPI</p>
                      <p className="text-sm text-welli-textSecondary">
                        user@upi
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Set Default
                  </Button>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Add New Payment Method
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tax Information</CardTitle>
              <CardDescription>
                Manage your tax documents and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <p className="font-medium">W-9 Form</p>
                  <p className="text-sm text-welli-textSecondary mt-1">
                    Required for tax reporting
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  Submitted
                </Badge>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-md">
                <div>
                  <p className="font-medium">Tax Documents</p>
                  <p className="text-sm text-welli-textSecondary mt-1">
                    View and download your tax forms
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <a href="/earnings" className="flex items-center">
                    <ChevronRight className="h-4 w-4" />
                    <span>View Tax Forms</span>
                  </a>
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-md">
                <div>
                  <p className="font-medium">Tax Identification Number</p>
                  <p className="text-sm text-welli-textSecondary mt-1">
                    Your SSN or EIN is securely stored
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  Verified
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Privacy Tab */}
        <TabsContent value="privacy" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your data and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Profile Visibility</p>
                    <p className="text-sm text-welli-textSecondary mt-1">
                      Control who can see your profile information
                    </p>
                  </div>
                  <Select defaultValue="patients">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patients">Patients Only</SelectItem>
                      <SelectItem value="welli">Welli Staff Only</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Collection</p>
                    <p className="text-sm text-welli-textSecondary mt-1">
                      Allow Welli to collect app usage data for improvement
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Location Services</p>
                    <p className="text-sm text-welli-textSecondary mt-1">
                      Enable location for visit navigation and optimization
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Contact Sharing</p>
                    <p className="text-sm text-welli-textSecondary mt-1">
                      Share your contact details with patients
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="text-sm text-welli-textSecondary bg-welli-background p-4 rounded-md mt-4">
                <p>
                  Your privacy is important to us. Read our{" "}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>{" "}
                  for more information about how we handle your data.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Control and manage your personal data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <p className="font-medium">Download Your Data</p>
                  <p className="text-sm text-welli-textSecondary mt-1">
                    Get a copy of your personal data
                  </p>
                </div>
                <Button variant="outline">Request Data</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md border-destructive/30">
                <div>
                  <p className="font-medium text-destructive">Delete Account Data</p>
                  <p className="text-sm text-welli-textSecondary mt-1">
                    Permanently remove all your personal information
                  </p>
                </div>
                <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                  Request Deletion
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
