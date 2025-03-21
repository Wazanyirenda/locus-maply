
import React from 'react';
import Layout from '@/components/Layout';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import UserStats from '@/components/Dashboard/UserStats';
import Leaderboard from '@/components/Dashboard/Leaderboard';
import { Link } from 'react-router-dom';
import { MapPin, TrendingUp, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// User level types
interface Level {
  name: string;
  minPoints: number;
  maxPoints: number;
  color: string;
}

const levels: Level[] = [
  { name: 'Explorer', minPoints: 0, maxPoints: 100, color: 'bg-blue-500' },
  { name: 'Surveyor', minPoints: 100, maxPoints: 300, color: 'bg-green-500' },
  { name: 'Cartographer', minPoints: 300, maxPoints: 600, color: 'bg-purple-500' },
  { name: 'Navigator', minPoints: 600, maxPoints: 1000, color: 'bg-amber-500' },
  { name: 'Master Mapper', minPoints: 1000, maxPoints: Infinity, color: 'bg-red-500' }
];

// Mock user data for demo
const currentUserPoints = 320;

const Mapboard = () => {
  // Determine user's current level and next level
  const currentLevel = levels.find(level => 
    currentUserPoints >= level.minPoints && currentUserPoints < level.maxPoints
  ) || levels[0];
  
  const nextLevelIndex = levels.findIndex(level => level.name === currentLevel.name) + 1;
  const nextLevel = nextLevelIndex < levels.length ? levels[nextLevelIndex] : null;
  
  // Calculate progress percentage to next level
  const progressPercentage = nextLevel 
    ? Math.round(((currentUserPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100)
    : 100;
  
  // Points needed for next level
  const pointsNeeded = nextLevel ? nextLevel.minPoints - currentUserPoints : 0;
  
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold">Mapboard</h1>
            <div className="glass-card p-3 flex items-center gap-3">
              <Award className="h-5 w-5 text-primary" />
              <span>Welcome back, <span className="font-medium">Demo User</span>! Ready to map the world?</span>
            </div>
          </div>
          
          {/* Level Progress Section */}
          <div className="glass-card p-5 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-1">Your Mapping Level</h2>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${currentLevel.color}`}></div>
                  <p className="text-2xl font-bold">{currentLevel.name}</p>
                </div>
              </div>
              
              {nextLevel && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>Next Level:</span>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${nextLevel.color}`}></div>
                    <span className="font-medium">{nextLevel.name}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{currentUserPoints} points</span>
                {nextLevel && <span>{nextLevel.minPoints} points</span>}
              </div>
              <Progress value={progressPercentage} className="h-2" />
              
              {nextLevel ? (
                <p className="text-sm text-muted-foreground">
                  You're a {currentLevel.name}. Just {pointsNeeded} points away from {nextLevel.name}!
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Congratulations! You've reached the highest level: {currentLevel.name}!
                </p>
              )}
            </div>
          </div>
          
          {/* User Stats Section */}
          <UserStats />
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/mapboard/map" 
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
              to="/contribute" 
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
            
            <Link 
              to="/profile" 
              className="glass-card p-5 hover:bg-primary/5 transition-colors group"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">My Profile</h3>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2 flex-grow">
                  Manage your profile and KYC verification
                </p>
                <div className="mt-4 text-primary text-sm font-medium group-hover:underline">
                  View Profile
                </div>
              </div>
            </Link>
          </div>
          
          {/* Recent Contributions */}
          <div className="glass-card">
            <div className="p-5 border-b border-border/50">
              <h2 className="text-xl font-medium">Your Recent Submissions</h2>
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
              <Link to="/mapboard/map" className="text-sm text-primary hover:underline">
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

export default Mapboard;
