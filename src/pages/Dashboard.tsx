
import React from 'react';
import Layout from '@/components/Layout';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import UserStats from '@/components/Dashboard/UserStats';
import Leaderboard from '@/components/Dashboard/Leaderboard';
import { Link } from 'react-router-dom';
import { MapPin, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  // Mock recent contributions
  const recentContributions = [
    { id: 1, name: 'Northmead Shopping Center', category: 'business', status: 'verified', date: '2023-09-15' },
    { id: 2, name: 'Cairo Road', category: 'road', status: 'verified', date: '2023-09-10' },
    { id: 3, name: 'New Business Park', category: 'business', status: 'pending', date: '2023-09-05' }
  ];
  
  return (
    <Layout>
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          
          {/* User Stats Section */}
          <UserStats />
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/dashboard/map" 
              className="glass-card p-5 hover:bg-primary/5 transition-colors group"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">My Map</h3>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2 flex-grow">
                  View and manage your location contributions
                </p>
                <div className="mt-4 text-primary text-sm font-medium group-hover:underline">
                  View My Map
                </div>
              </div>
            </Link>
            
            <Link 
              to="/dashboard/leaderboard" 
              className="glass-card p-5 hover:bg-primary/5 transition-colors group"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Leaderboard</h3>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2 flex-grow">
                  See top contributors and your rank
                </p>
                <div className="mt-4 text-primary text-sm font-medium group-hover:underline">
                  View Leaderboard
                </div>
              </div>
            </Link>
            
            <Link 
              to="/map" 
              className="glass-card p-5 hover:bg-primary/5 transition-colors group"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Add Location</h3>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2 flex-grow">
                  Submit a new location to the map
                </p>
                <div className="mt-4 text-primary text-sm font-medium group-hover:underline">
                  Add New Location
                </div>
              </div>
            </Link>
          </div>
          
          {/* Recent Contributions */}
          <div className="glass-card">
            <div className="p-5 border-b border-border/50">
              <h2 className="text-xl font-medium">Recent Contributions</h2>
            </div>
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-muted-foreground">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentContributions.map((contribution) => (
                    <tr key={contribution.id} className="border-t border-border/50">
                      <td className="px-4 py-3 text-sm font-medium">{contribution.name}</td>
                      <td className="px-4 py-3 text-sm capitalize">{contribution.category}</td>
                      <td className="px-4 py-3">
                        <span className={`status-${contribution.status}`}>
                          {contribution.status.charAt(0).toUpperCase() + contribution.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{contribution.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-border/50 text-right">
              <Link to="/dashboard/map" className="text-sm text-primary hover:underline">
                View All Contributions
              </Link>
            </div>
          </div>
          
          {/* Mini Leaderboard */}
          <Leaderboard />
        </div>
      </DashboardLayout>
    </Layout>
  );
};

export default Dashboard;
