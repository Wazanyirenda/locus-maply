
import React from 'react';
import { MapPin, Award, Star, TrendingUp } from 'lucide-react';

// Mock user stats for the demo
const userStats = {
  username: 'Demo User',
  points: 320,
  rank: 14,
  level: 3,
  contributions: {
    total: 8,
    verified: 5,
    pending: 2,
    rejected: 1
  },
  badges: [
    { name: 'Pioneer', description: 'First 10 locations submitted', icon: <MapPin size={16} /> },
    { name: 'Quality Mapper', description: '5 verified locations', icon: <Award size={16} /> }
  ],
  nextLevel: {
    current: 320,
    required: 500
  }
};

const UserStats: React.FC = () => {
  // Calculate percentage for level progress
  const levelProgress = Math.min(
    Math.round((userStats.nextLevel.current / userStats.nextLevel.required) * 100), 
    100
  );
  
  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h2 className="text-xl font-semibold">{userStats.username}</h2>
          <p className="text-muted-foreground">Level {userStats.level} Mapper</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 text-amber-500">
            <Star size={18} className="fill-amber-500" />
            <span className="text-lg font-semibold">{userStats.points}</span>
          </div>
          <p className="text-xs text-muted-foreground">Rank #{userStats.rank}</p>
        </div>
      </div>
      
      {/* Level Progress */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm">Level Progress</span>
          <span className="text-xs text-muted-foreground">
            {userStats.nextLevel.current} / {userStats.nextLevel.required} points
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">
          {userStats.nextLevel.required - userStats.nextLevel.current} points to Level {userStats.level + 1}
        </p>
      </div>
      
      {/* Contribution Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <StatCard
          label="Total"
          value={userStats.contributions.total}
          icon={<MapPin size={18} />}
          color="bg-primary"
        />
        <StatCard
          label="Verified"
          value={userStats.contributions.verified}
          icon={<TrendingUp size={18} />}
          color="bg-map-verified"
        />
        <StatCard
          label="Pending"
          value={userStats.contributions.pending}
          icon={<TrendingUp size={18} />}
          color="bg-map-pending"
        />
        <StatCard
          label="Rejected"
          value={userStats.contributions.rejected}
          icon={<TrendingUp size={18} />}
          color="bg-map-rejected"
        />
      </div>
      
      {/* Badges */}
      <div>
        <h3 className="text-sm font-medium mb-3">Earned Badges</h3>
        <div className="grid grid-cols-2 gap-3">
          {userStats.badges.map((badge, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 p-3 rounded-md border border-border/50 bg-card/50"
            >
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
                {badge.icon}
              </div>
              <div>
                <p className="text-sm font-medium">{badge.name}</p>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Stat card component
interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  color
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-md border border-border/50 bg-card/50">
      <div className={`flex items-center justify-center h-8 w-8 rounded-full ${color} text-white mb-2`}>
        {icon}
      </div>
      <span className="text-lg font-semibold">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
};

export default UserStats;
