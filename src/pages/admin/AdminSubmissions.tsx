
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import AdminLayout from '@/components/Admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, CheckCircle, XCircle, Eye, Building2, Route, Landmark, FileText, User, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock KYC submissions
const mockKycSubmissions = [
  { 
    id: 1, 
    userId: 4, 
    userName: 'Sarah Williams', 
    idType: 'nrc', 
    dateSubmitted: '2023-07-10', 
    status: 'pending' 
  },
  { 
    id: 2, 
    userId: 6, 
    userName: 'David Miller', 
    idType: 'drivers-license', 
    dateSubmitted: '2023-07-22', 
    status: 'pending' 
  },
  { 
    id: 3, 
    userId: 9, 
    userName: 'Emily Davis', 
    idType: 'passport', 
    dateSubmitted: '2023-07-25', 
    status: 'pending' 
  }
];

// Mock location submissions
const mockLocationSubmissions = [
  { 
    id: 1, 
    name: 'Central Market', 
    category: 'business', 
    submitter: 'John Doe', 
    dateSubmitted: '2023-07-18', 
    status: 'pending' 
  },
  { 
    id: 2, 
    name: 'Freedom Road', 
    category: 'road', 
    submitter: 'Jane Smith', 
    dateSubmitted: '2023-07-20', 
    status: 'pending' 
  },
  { 
    id: 3, 
    name: 'National Museum', 
    category: 'landmark', 
    submitter: 'Michael Johnson', 
    dateSubmitted: '2023-07-21', 
    status: 'pending' 
  },
  { 
    id: 4, 
    name: 'City Hospital', 
    category: 'business', 
    submitter: 'Jane Smith', 
    dateSubmitted: '2023-07-23', 
    status: 'pending' 
  },
  { 
    id: 5, 
    name: 'Independence Avenue', 
    category: 'road', 
    submitter: 'John Doe', 
    dateSubmitted: '2023-07-24', 
    status: 'pending' 
  }
];

const AdminSubmissions = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [kycSubmissions, setKycSubmissions] = useState(mockKycSubmissions);
  const [locationSubmissions, setLocationSubmissions] = useState(mockLocationSubmissions);
  const [activeTab, setActiveTab] = useState('kyc');
  
  const handleKycAction = (submissionId: number, action: 'approve' | 'reject') => {
    // In a real app, this would make an API call
    setKycSubmissions(kycSubmissions.map(submission => 
      submission.id === submissionId ? { ...submission, status: action === 'approve' ? 'approved' : 'rejected' } : submission
    ));
    
    toast({
      title: `KYC submission ${action === 'approve' ? 'approved' : 'rejected'}`,
      description: `The KYC submission has been ${action === 'approve' ? 'approved' : 'rejected'} successfully.`,
      variant: "default",
    });
  };
  
  const handleLocationAction = (submissionId: number, action: 'approve' | 'reject') => {
    // In a real app, this would make an API call
    setLocationSubmissions(locationSubmissions.map(submission => 
      submission.id === submissionId ? { ...submission, status: action === 'approve' ? 'approved' : 'rejected' } : submission
    ));
    
    toast({
      title: `Location submission ${action === 'approve' ? 'approved' : 'rejected'}`,
      description: `The location submission has been ${action === 'approve' ? 'approved' : 'rejected'} successfully.`,
      variant: "default",
    });
  };
  
  // Filter submissions based on search
  const filteredKycSubmissions = kycSubmissions.filter(submission => 
    submission.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.idType.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(submission => submission.status === 'pending');
  
  const filteredLocationSubmissions = locationSubmissions.filter(submission => 
    submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.submitter.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(submission => submission.status === 'pending');
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'business':
        return <Building2 className="h-4 w-4" />;
      case 'road':
        return <Route className="h-4 w-4" />;
      case 'landmark':
        return <Landmark className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getIdTypeDisplay = (idType: string) => {
    switch (idType) {
      case 'nrc':
        return 'National Registration Card';
      case 'drivers-license':
        return 'Driver\'s License';
      case 'passport':
        return 'Passport';
      default:
        return idType;
    }
  };
  
  return (
    <Layout>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold">Submission Review</h1>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search submissions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="kyc" onValueChange={setActiveTab}>
            <TabsList className="grid w-full md:w-[400px] grid-cols-2">
              <TabsTrigger value="kyc" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>KYC Submissions</span>
                <Badge className="ml-1 bg-map-pending">{filteredKycSubmissions.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="locations" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Location Submissions</span>
                <Badge className="ml-1 bg-map-pending">{filteredLocationSubmissions.length}</Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="kyc" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending KYC Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>ID Type</TableHead>
                        <TableHead>Date Submitted</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredKycSubmissions.map(submission => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">{submission.userName}</TableCell>
                          <TableCell className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            {getIdTypeDisplay(submission.idType)}
                          </TableCell>
                          <TableCell>{submission.dateSubmitted}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <Eye className="h-3 w-3" />
                                View
                              </Button>
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => handleKycAction(submission.id, 'approve')}
                                className="flex items-center gap-1 bg-map-verified hover:bg-map-verified/90"
                              >
                                <CheckCircle className="h-3 w-3" />
                                Approve
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleKycAction(submission.id, 'reject')}
                                className="flex items-center gap-1"
                              >
                                <XCircle className="h-3 w-3" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {filteredKycSubmissions.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                            No pending KYC submissions found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="locations" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Location Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Submitted By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLocationSubmissions.map(submission => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">{submission.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(submission.category)}
                              <span className="capitalize">{submission.category}</span>
                            </div>
                          </TableCell>
                          <TableCell>{submission.submitter}</TableCell>
                          <TableCell>{submission.dateSubmitted}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <Eye className="h-3 w-3" />
                                View
                              </Button>
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => handleLocationAction(submission.id, 'approve')}
                                className="flex items-center gap-1 bg-map-verified hover:bg-map-verified/90"
                              >
                                <CheckCircle className="h-3 w-3" />
                                Approve
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleLocationAction(submission.id, 'reject')}
                                className="flex items-center gap-1"
                              >
                                <XCircle className="h-3 w-3" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {filteredLocationSubmissions.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            No pending location submissions found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </Layout>
  );
};

export default AdminSubmissions;
