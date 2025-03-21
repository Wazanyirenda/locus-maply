
import React from 'react';
import { BarChart3, UserCheck, Clock, CheckCircle, XCircle, MapPin } from 'lucide-react';

// Mock statistics for demo purposes
const adminStats = {
  totalUsers: 842,
  pendingKyc: 27,
  pendingLocations: 53,
  verifiedLocations: 1287,
  rejectedLocations: 95,
  activeUsersToday: 124
};

const AdminStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="glass-card p-5 animate-fade-in">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Total Users</h3>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <UserCheck size={20} />
          </div>
        </div>
        <p className="text-3xl font-bold">{adminStats.totalUsers}</p>
        <p className="text-sm text-muted-foreground mt-1">
          <span className="text-map-verified">+12</span> in the last 7 days
        </p>
      </div>
      
      <div className="glass-card p-5 animate-fade-in">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Pending KYC</h3>
          <div className="h-10 w-10 rounded-full bg-map-pending/10 flex items-center justify-center text-map-pending">
            <Clock size={20} />
          </div>
        </div>
        <p className="text-3xl font-bold">{adminStats.pendingKyc}</p>
        <p className="text-sm text-muted-foreground mt-1">
          Awaiting verification
        </p>
      </div>
      
      <div className="glass-card p-5 animate-fade-in">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Active Today</h3>
          <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
            <UserCheck size={20} />
          </div>
        </div>
        <p className="text-3xl font-bold">{adminStats.activeUsersToday}</p>
        <p className="text-sm text-muted-foreground mt-1">
          <span className="text-map-verified">+8%</span> from yesterday
        </p>
      </div>
      
      <div className="glass-card p-5 animate-fade-in">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Pending Locations</h3>
          <div className="h-10 w-10 rounded-full bg-map-pending/10 flex items-center justify-center text-map-pending">
            <MapPin size={20} />
          </div>
        </div>
        <p className="text-3xl font-bold">{adminStats.pendingLocations}</p>
        <p className="text-sm text-muted-foreground mt-1">
          Awaiting moderation
        </p>
      </div>
      
      <div className="glass-card p-5 animate-fade-in">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Verified Locations</h3>
          <div className="h-10 w-10 rounded-full bg-map-verified/10 flex items-center justify-center text-map-verified">
            <CheckCircle size={20} />
          </div>
        </div>
        <p className="text-3xl font-bold">{adminStats.verifiedLocations}</p>
        <p className="text-sm text-muted-foreground mt-1">
          <span className="text-map-verified">+42</span> in the last 7 days
        </p>
      </div>
      
      <div className="glass-card p-5 animate-fade-in">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Rejected Locations</h3>
          <div className="h-10 w-10 rounded-full bg-map-rejected/10 flex items-center justify-center text-map-rejected">
            <XCircle size={20} />
          </div>
        </div>
        <p className="text-3xl font-bold">{adminStats.rejectedLocations}</p>
        <p className="text-sm text-muted-foreground mt-1">
          Didn't meet requirements
        </p>
      </div>
    </div>
  );
};

export default AdminStats;
