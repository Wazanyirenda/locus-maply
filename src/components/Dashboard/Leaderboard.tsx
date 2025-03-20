
import React, { useState } from 'react';
import { Trophy, Medal, Star, ChevronUp, ChevronDown, Search } from 'lucide-react';

// Mock leaderboard data
const mockLeaderboardData = [
  { id: 1, username: 'MapMaster', points: 1248, verified: 36, rank: 1 },
  { id: 2, username: 'GeoTracker', points: 958, verified: 28, rank: 2 },
  { id: 3, username: 'StreetMapper', points: 875, verified: 25, rank: 3 },
  { id: 4, username: 'GeoExplorer', points: 792, verified: 22, rank: 4 },
  { id: 5, username: 'LocationHunter', points: 687, verified: 18, rank: 5 },
  { id: 6, username: 'PlaceFinder', points: 654, verified: 17, rank: 6 },
  { id: 7, username: 'MapWizard', points: 579, verified: 16, rank: 7 },
  { id: 8, username: 'RouteExpert', points: 512, verified: 14, rank: 8 },
  { id: 9, username: 'StreetSage', points: 487, verified: 13, rank: 9 },
  { id: 10, username: 'LandmarkPro', points: 453, verified: 12, rank: 10 },
  { id: 11, username: 'BizLocator', points: 421, verified: 11, rank: 11 },
  { id: 12, username: 'RoadRanger', points: 387, verified: 10, rank: 12 },
  { id: 13, username: 'SpotFinder', points: 352, verified: 9, rank: 13 },
  { id: 14, username: 'Demo User', points: 320, verified: 8, rank: 14, isCurrentUser: true },
  { id: 15, username: 'MapExplorer', points: 298, verified: 7, rank: 15 }
];

const Leaderboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'points' | 'verified'>('points');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Handle sort change
  const handleSort = (field: 'points' | 'verified') => {
    if (sortBy === field) {
      // Toggle order if same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to descending for new field
      setSortBy(field);
      setSortOrder('desc');
    }
  };
  
  // Filter and sort data
  const filteredAndSortedData = mockLeaderboardData
    .filter(user => 
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      return multiplier * (a[sortBy] - b[sortBy]);
    });
  
  return (
    <div className="glass-card animate-fade-in">
      <div className="p-5 border-b border-border/50">
        <h2 className="text-xl font-semibold mb-1">Leaderboard</h2>
        <p className="text-sm text-muted-foreground">
          Top contributors to Locus
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="p-4 border-b border-border/50">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full py-2 pl-9 pr-3 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-muted-foreground">
              <th className="font-medium px-4 py-3 text-left">Rank</th>
              <th className="font-medium px-4 py-3 text-left">User</th>
              <th className="font-medium px-4 py-3 text-right cursor-pointer" onClick={() => handleSort('points')}>
                <div className="flex items-center justify-end gap-1">
                  Points
                  {sortBy === 'points' && (
                    sortOrder === 'desc' ? <ChevronDown size={14} /> : <ChevronUp size={14} />
                  )}
                </div>
              </th>
              <th className="font-medium px-4 py-3 text-right cursor-pointer" onClick={() => handleSort('verified')}>
                <div className="flex items-center justify-end gap-1">
                  Verified
                  {sortBy === 'verified' && (
                    sortOrder === 'desc' ? <ChevronDown size={14} /> : <ChevronUp size={14} />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.map((user) => (
              <tr key={user.id} className={`border-t border-border/50 text-sm ${user.isCurrentUser ? 'bg-primary/5' : ''}`}>
                <td className="px-4 py-3">
                  {user.rank <= 3 ? (
                    <div className="flex items-center">
                      {user.rank === 1 && <Trophy size={16} className="text-amber-500" />}
                      {user.rank === 2 && <Medal size={16} className="text-gray-400" />}
                      {user.rank === 3 && <Medal size={16} className="text-amber-700" />}
                      <span className="ml-1.5">{user.rank}</span>
                    </div>
                  ) : (
                    user.rank
                  )}
                </td>
                <td className="px-4 py-3 font-medium">
                  {user.username}
                  {user.isCurrentUser && <span className="ml-2 text-xs text-primary">(You)</span>}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Star size={14} className="text-amber-500" />
                    {user.points.toLocaleString()}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  {user.verified}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-border/50 text-xs text-muted-foreground">
        Updated in real-time as users contribute
      </div>
    </div>
  );
};

export default Leaderboard;
