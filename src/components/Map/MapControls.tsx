
import React, { useState } from 'react';
import { Layers, X, Check, Building2, Route, Landmark, UserCheck, Clock, AlertTriangle, Search, User } from 'lucide-react';
import { MapFilters, LocationCategory, LocationStatus } from '@/hooks/useMap';

interface MapControlsProps {
  filters: MapFilters;
  updateFilters: (filters: Partial<MapFilters>) => void;
  centerOnUserLocation: () => void;
  isAdminView?: boolean;
  isDashboardView?: boolean;
}

const MapControls: React.FC<MapControlsProps> = ({
  filters,
  updateFilters,
  centerOnUserLocation,
  isAdminView = false,
  isDashboardView = false
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Toggle category in filters
  const toggleCategory = (category: LocationCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    updateFilters({ categories: newCategories });
  };
  
  // Toggle status in filters
  const toggleStatus = (status: LocationStatus) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    
    updateFilters({ status: newStatus });
  };
  
  // Toggle "Only Mine" filter
  const toggleOnlyMine = () => {
    updateFilters({ onlyMine: !filters.onlyMine });
  };
  
  // Handle search (mock functionality, would connect to a geocoding service in real app)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Would connect to a geocoding service in a real app
      alert(`Search functionality would connect to OSM Nominatim API.\nSearched for: ${searchQuery}`);
    }
  };
  
  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="map-controls p-2 w-10 h-10 flex items-center justify-center"
        aria-label="Open filters"
      >
        <Layers size={20} />
      </button>
    );
  }
  
  return (
    <div className="map-controls w-64 animate-fade-in">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium">Map Controls</h3>
        <button 
          onClick={() => setIsOpen(false)}
          className="p-1 rounded-full hover:bg-muted/50 transition-colors"
          aria-label="Close filters"
        >
          <X size={16} />
        </button>
      </div>
      
      {/* Search (would connect to OSM Nominatim API in real implementation) */}
      <form onSubmit={handleSearch} className="mb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search locations..."
            className="w-full py-1.5 pl-8 pr-3 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </form>
      
      {/* Category Filters */}
      <div className="mb-3">
        <h4 className="text-xs font-medium mb-2">Categories</h4>
        <div className="grid grid-cols-3 gap-1">
          <CategoryFilterButton 
            icon={<Building2 size={14} />}
            label="Business"
            isActive={filters.categories.includes('business')}
            onClick={() => toggleCategory('business')}
          />
          <CategoryFilterButton 
            icon={<Route size={14} />}
            label="Road"
            isActive={filters.categories.includes('road')}
            onClick={() => toggleCategory('road')}
          />
          <CategoryFilterButton 
            icon={<Landmark size={14} />}
            label="Landmark"
            isActive={filters.categories.includes('landmark')}
            onClick={() => toggleCategory('landmark')}
          />
        </div>
      </div>
      
      {/* Status Filters */}
      <div className="mb-3">
        <h4 className="text-xs font-medium mb-2">Status</h4>
        <div className="grid grid-cols-3 gap-1">
          <StatusFilterButton 
            icon={<Check size={14} />}
            label="Verified"
            color="bg-map-verified"
            isActive={filters.status.includes('verified')}
            onClick={() => toggleStatus('verified')}
          />
          <StatusFilterButton 
            icon={<Clock size={14} />}
            label="Pending"
            color="bg-map-pending"
            isActive={filters.status.includes('pending')}
            onClick={() => toggleStatus('pending')}
          />
          <StatusFilterButton 
            icon={<AlertTriangle size={14} />}
            label="Rejected"
            color="bg-map-rejected"
            isActive={filters.status.includes('rejected')}
            onClick={() => toggleStatus('rejected')}
          />
        </div>
      </div>
      
      {/* User Filter - Only show on main map, not on dashboard/admin */}
      {!isDashboardView && !isAdminView && (
        <div className="mb-3">
          <button 
            className={`flex items-center justify-center w-full px-3 py-1.5 rounded-md text-sm ${
              filters.onlyMine 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            } transition-colors`}
            onClick={toggleOnlyMine}
          >
            <User size={14} className="mr-1.5" />
            {filters.onlyMine ? 'Showing My Locations' : 'Show Only My Locations'}
          </button>
        </div>
      )}
      
      <div className="text-xs text-muted-foreground mt-1">
        <p>Double-click on map to add a new location</p>
      </div>
    </div>
  );
};

// Category filter button component
interface CategoryFilterButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoryFilterButton: React.FC<CategoryFilterButtonProps> = ({ 
  icon, 
  label, 
  isActive, 
  onClick 
}) => {
  return (
    <button
      className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md transition-colors ${
        isActive 
          ? 'bg-primary/10 text-primary' 
          : 'bg-muted/50 text-muted-foreground hover:bg-muted/80'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

// Status filter button component
interface StatusFilterButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
}

const StatusFilterButton: React.FC<StatusFilterButtonProps> = ({
  icon,
  label,
  color,
  isActive,
  onClick
}) => {
  return (
    <button
      className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md transition-colors ${
        isActive 
          ? `${color} text-white` 
          : 'bg-muted/50 text-muted-foreground hover:bg-muted/80'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

export default MapControls;
