
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCheck, AlertCircle, Clock, Edit, Camera, Save, User, Phone, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// KYC status types
type KYCStatus = 'pending' | 'approved' | 'rejected';

const Profile = () => {
  const { toast } = useToast();
  
  // Mock user data
  const [user, setUser] = useState({
    fullName: 'Demo User',
    username: 'demouser',
    phone: '+260123456789',
    profileImage: null as string | null,
    kycStatus: 'pending' as KYCStatus,
    kycType: 'nrc' as 'nrc' | 'passport' | 'drivers-license',
    kycDocuments: {
      front: '/placeholder.svg',
      back: '/placeholder.svg',
      selfie: '/placeholder.svg'
    }
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    phone: user.phone
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSaveProfile = () => {
    // This would update the user profile in a real app
    setUser({
      ...user,
      fullName: formData.fullName,
      phone: formData.phone
    });
    
    setIsEditing(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
      variant: "default",
    });
  };
  
  const handleUploadProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // This would upload the image to storage in a real app
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setUser({
        ...user,
        profileImage: imageUrl
      });
      
      toast({
        title: "Profile image updated",
        description: "Your profile image has been updated successfully.",
        variant: "default",
      });
    }
  };
  
  const getKYCStatusDisplay = () => {
    switch (user.kycStatus) {
      case 'approved':
        return (
          <div className="flex items-center text-map-verified">
            <BadgeCheck className="mr-2 h-5 w-5" />
            <span>Approved</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center text-map-rejected">
            <AlertCircle className="mr-2 h-5 w-5" />
            <span>Rejected</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-map-pending">
            <Clock className="mr-2 h-5 w-5" />
            <span>Pending Approval</span>
          </div>
        );
    }
  };
  
  const getKYCTypeDisplay = () => {
    switch (user.kycType) {
      case 'nrc':
        return 'National Registration Card (NRC)';
      case 'passport':
        return 'Passport';
      case 'drivers-license':
        return 'Driver\'s License';
      default:
        return 'Unknown';
    }
  };
  
  return (
    <Layout>
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Information */}
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xl">Profile Information</CardTitle>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                ) : (
                  <Button variant="default" size="sm" onClick={handleSaveProfile}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-start gap-6">
                  {/* Profile image */}
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center overflow-hidden border border-border/50">
                      {user.profileImage ? (
                        <img 
                          src={user.profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-12 w-12 text-muted-foreground/50" />
                      )}
                    </div>
                    
                    <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                      <Camera className="h-4 w-4" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUploadProfileImage}
                      />
                    </label>
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-muted-foreground">Username</p>
                    <p className="font-medium">{user.username}</p>
                  </div>
                </div>
                
                <div className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    {isEditing ? (
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-md">
                        <User className="text-muted-foreground h-4 w-4" />
                        <span>{user.fullName}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-md">
                        <Phone className="text-muted-foreground h-4 w-4" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* KYC Verification Status */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-xl">KYC Verification</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted/30 rounded-md">
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  {getKYCStatusDisplay()}
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">ID Type</p>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{getKYCTypeDisplay()}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">ID Documents</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <div className="aspect-square bg-muted/30 rounded-md overflow-hidden border border-border/50">
                        <img 
                          src={user.kycDocuments.front} 
                          alt="ID Front" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-center text-muted-foreground">Front</p>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="aspect-square bg-muted/30 rounded-md overflow-hidden border border-border/50">
                        <img 
                          src={user.kycDocuments.back} 
                          alt="ID Back" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-center text-muted-foreground">Back</p>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="aspect-square bg-muted/30 rounded-md overflow-hidden border border-border/50">
                        <img 
                          src={user.kycDocuments.selfie} 
                          alt="Selfie with ID" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-center text-muted-foreground">Selfie</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                {user.kycStatus === 'rejected' && (
                  <Button variant="outline" className="w-full">
                    Upload New Documents
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
          
          {/* Settings Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Account Settings</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline">
                  Change Password
                </Button>
                
                <Button variant="outline">
                  Notification Preferences
                </Button>
                
                <Button variant="outline">
                  Privacy Settings
                </Button>
                
                <Button variant="outline">
                  Connected Accounts
                </Button>
              </div>
            </CardContent>
            
            <CardFooter className="border-t border-border/50 mt-2 pt-4">
              <Button variant="destructive" className="w-full">
                Permanently Delete My Account
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DashboardLayout>
    </Layout>
  );
};

export default Profile;
