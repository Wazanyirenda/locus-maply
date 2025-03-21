
import React from 'react';
import Layout from '@/components/Layout';
import AdminLayout from '@/components/Admin/AdminLayout';
import AdminStats from '@/components/Admin/AdminStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Users, MapPin, ShieldCheck, Settings } from 'lucide-react';

const Admin = () => {
  return (
    <Layout>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Panel - Manage Locus</h1>
          </div>
          
          <AdminStats />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Link to="/admin/users" className="block">
              <Card className="h-full hover:bg-accent/10 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">View, Ban, or Unban Users</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/admin/submissions" className="block">
              <Card className="h-full hover:bg-accent/10 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    Submission Review
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Approve or Reject KYC & Contributions</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/admin/map" className="block">
              <Card className="h-full hover:bg-accent/10 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Moderation Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Review and manage location submissions</p>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-map-verified pl-4 py-2">
                  <p className="text-sm">
                    <span className="font-medium">Admin User</span> approved 5 location submissions
                  </p>
                  <p className="text-xs text-muted-foreground">Today at 10:45 AM</p>
                </div>
                
                <div className="border-l-4 border-map-rejected pl-4 py-2">
                  <p className="text-sm">
                    <span className="font-medium">Admin User</span> rejected 3 KYC submissions
                  </p>
                  <p className="text-xs text-muted-foreground">Today at 09:15 AM</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="text-sm">
                    <span className="font-medium">Admin User</span> banned user @spammer
                  </p>
                  <p className="text-xs text-muted-foreground">Yesterday at 03:22 PM</p>
                </div>
                
                <div className="border-l-4 border-map-verified pl-4 py-2">
                  <p className="text-sm">
                    <span className="font-medium">Admin User</span> approved 12 KYC submissions
                  </p>
                  <p className="text-xs text-muted-foreground">Yesterday at 11:30 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Reports &amp; Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Analytics charts and data visualization would go here
              </p>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </Layout>
  );
};

export default Admin;
