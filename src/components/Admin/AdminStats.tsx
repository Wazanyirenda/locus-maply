
import React from 'react';
import { Users, Map, CheckSquare, AlertTriangle, TrendingUp, Activity } from 'lucide-react';

// Mock stats data
const mockStats = {
  totalUsers: 214,
  activeToday: 45,
  pendingLocations: 12,
  locationsAdded: {
    today: 23,
    weekly: 178,
    monthly: 532
  },
  completionRate: 94.2,
  newUsersRate: 12.5,
  recentLocations: [
    { id: 1, name: 'Lusaka City Mall', status: 'pending', timestamp: '10 minutes ago' },
    { id: 2, name: 'Central Business District', status: 'verified', timestamp: '35 minutes ago' },
    { id: 3, name: 'Unity Road', status: 'rejected', timestamp: '1 hour ago' },
    { id: 4, name: 'Northmead Shopping Area', status: 'pending', timestamp: '2 hours ago' }
  ]
};

const AdminStats: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={mockStats.totalUsers}
          icon={<Users className="h-5 w-5" />}
          description={`${mockStats.activeToday} active today`}
          trend={+12.5}
        />
        <StatCard
          title="Pending Locations"
          value={mockStats.pendingLocations}
          icon={<Map className="h-5 w-5" />}
          description="Awaiting verification"
          color="bg-map-pending"
        />
        <StatCard
          title="Completion Rate"
          value={`${mockStats.completionRate}%`}
          icon={<CheckSquare className="h-5 w-5" />}
          description="Verification process"
          trend={+2.3}
        />
        <StatCard
          title="Added Today"
          value={mockStats.locationsAdded.today}
          icon={<TrendingUp className="h-5 w-5" />}
          description={`${mockStats.locationsAdded.weekly} this week`}
          trend={+5.7}
        />
      </div>
      
      {/* Recent Activity */}
      <div className="glass-card">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-medium">Recent Activity</h2>
        </div>
        <div className="p-2">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-muted-foreground">
                <th className="px-3 py-2 text-left">Location</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              {mockStats.recentLocations.map((location) => (
                <tr key={location.id} className="border-t border-border/50">
                  <td className="px-3 py-3 text-sm font-medium">{location.name}</td>
                  <td className="px-3 py-3">
                    <StatusBadge status={location.status as 'pending' | 'verified' | 'rejected'} />
                  </td>
                  <td className="px-3 py-3 text-sm text-right text-muted-foreground">{location.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border/50 text-right">
          <button className="text-sm text-primary hover:underline">View All Activity</button>
        </div>
      </div>
      
      {/* System Status */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">System Status</h2>
          <div className="flex items-center text-map-verified">
            <Activity className="h-4 w-4 mr-1.5" />
            <span className="text-sm">All systems operational</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard title="Database" value="12ms" desc="Response time" positive={true} />
          <MetricCard title="API Requests" value="1.2k/hr" desc="Current rate" positive={true} />
          <MetricCard title="Error Rate" value="0.05%" desc="Last 24 hours" positive={true} />
        </div>
      </div>
    </div>
  );
};

// Stat card component
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description: string;
  trend?: number;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  color = 'bg-primary'
}) => {
  return (
    <div className="glass-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className={`${color} text-white p-2 rounded-md`}>
          {icon}
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend !== undefined && (
          <div className={`flex items-center text-xs ${trend >= 0 ? 'text-map-verified' : 'text-map-rejected'}`}>
            {trend >= 0 ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <AlertTriangle className="h-3 w-3 mr-1" />
            )}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  );
};

// Status badge component
interface StatusBadgeProps {
  status: 'pending' | 'verified' | 'rejected';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusDetails = () => {
    switch (status) {
      case 'verified':
        return { class: 'status-verified', label: 'Verified' };
      case 'pending':
        return { class: 'status-pending', label: 'Pending' };
      case 'rejected':
        return { class: 'status-rejected', label: 'Rejected' };
      default:
        return { class: 'bg-gray-500 text-white px-2 py-0.5 rounded-full text-xs font-medium', label: 'Unknown' };
    }
  };
  
  const statusDetails = getStatusDetails();
  
  return (
    <span className={statusDetails.class}>
      {statusDetails.label}
    </span>
  );
};

// Metric card component
interface MetricCardProps {
  title: string;
  value: string;
  desc: string;
  positive: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  desc,
  positive
}) => {
  return (
    <div className="bg-card/50 border border-border/50 rounded-md p-4">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-muted-foreground">{desc}</p>
        <span className={`text-xs font-medium ${positive ? 'text-map-verified' : 'text-map-rejected'}`}>
          {positive ? 'Good' : 'Warning'}
        </span>
      </div>
    </div>
  );
};

export default AdminStats;
