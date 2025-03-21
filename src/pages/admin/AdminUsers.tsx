
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import AdminLayout from '@/components/Admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, UserX, UserCheck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock user data
const mockUsers = [
  { 
    id: 1, 
    name: 'John Doe', 
    username: 'johndoe', 
    phone: '+260123456789', 
    status: 'active', 
    kycStatus: 'approved', 
    contributions: 27, 
    dateJoined: '2023-05-15' 
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    username: 'janesmith', 
    phone: '+260987654321', 
    status: 'active', 
    kycStatus: 'approved', 
    contributions: 15, 
    dateJoined: '2023-06-02' 
  },
  { 
    id: 3, 
    name: 'Michael Johnson', 
    username: 'michaelj', 
    phone: '+260567891234', 
    status: 'banned', 
    kycStatus: 'approved', 
    contributions: 5, 
    dateJoined: '2023-06-20' 
  },
  { 
    id: 4, 
    name: 'Sarah Williams', 
    username: 'sarahw', 
    phone: '+260345678912', 
    status: 'active', 
    kycStatus: 'pending', 
    contributions: 0, 
    dateJoined: '2023-07-10' 
  },
  { 
    id: 5, 
    name: 'Robert Brown', 
    username: 'robertb', 
    phone: '+260789123456', 
    status: 'active', 
    kycStatus: 'rejected', 
    contributions: 0, 
    dateJoined: '2023-07-15' 
  }
];

const AdminUsers = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState(mockUsers);
  
  // Filter users based on search
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  );
  
  const handleStatusChange = (userId: number, newStatus: 'active' | 'banned') => {
    // In a real app, this would make an API call
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    
    toast({
      title: `User ${newStatus === 'banned' ? 'banned' : 'activated'}`,
      description: `The user has been ${newStatus === 'banned' ? 'banned' : 'activated'} successfully.`,
      variant: "default",
    });
  };
  
  const getKYCStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-map-verified">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-map-rejected">Rejected</Badge>;
      default:
        return <Badge className="bg-map-pending">Pending</Badge>;
    }
  };
  
  return (
    <Layout>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold">User Management</h1>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-lg flex items-center">
                  <UserCheck className="mr-2 h-5 w-5 text-map-verified" />
                  Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {users.filter(user => user.status === 'active').length}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-lg flex items-center">
                  <UserX className="mr-2 h-5 w-5 text-map-rejected" />
                  Banned Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {users.filter(user => user.status === 'banned').length}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-lg flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-map-pending" />
                  Pending KYC
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {users.filter(user => user.kycStatus === 'pending').length}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>User List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>KYC Status</TableHead>
                    <TableHead>Contributions</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{getKYCStatusBadge(user.kycStatus)}</TableCell>
                      <TableCell>{user.contributions}</TableCell>
                      <TableCell>{user.dateJoined}</TableCell>
                      <TableCell>
                        {user.status === 'active' ? (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleStatusChange(user.id, 'banned')}
                          >
                            Ban
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleStatusChange(user.id, 'active')}
                          >
                            Activate
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredUsers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No users found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </Layout>
  );
};

export default AdminUsers;
