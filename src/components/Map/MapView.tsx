import React, { useEffect, useRef } from 'react';
import useMap, { MapFilters } from '@/hooks/useMap';
import MapControls from './MapControls';
import { MapPin, Layers, Plus } from 'lucide-react';
import LocationForm from '../LocationForm';

interface MapViewProps {
  isAdminView?: boolean;
  isDashboardView?: boolean;
}

const MapView: React.FC<MapViewProps> = ({ 
  isAdminView = false, 
  isDashboardView = false 
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const {
    initializeMap,
    map,
    locations,
    selectedLocation,
    setSelectedLocation,
    filters,
    updateFilters,
    addLocation,
    updateLocation,
    deleteLocation,
    centerOnUserLocation,
    isLoading
  } = useMap({
    isAdminView,
    isDashboardView
  });
  
  // Initialize map when component mounts
  useEffect(() => {
    if (mapContainerRef.current) {
      initializeMap(mapContainerRef.current);
    }
  }, [initializeMap]);
  
  // Handle map click for adding locations
  useEffect(() => {
    if (!map) return;
    
    const handleMapClick = (e: L.LeafletMouseEvent) => {
      // Only allow adding locations in standard view and dashboard view
      if (!isAdminView) {
        addLocation(e.latlng);
      }
    };
    
    // Add click event listener
    map.on('dblclick', handleMapClick);
    
    // Clean up
    return () => {
      map.off('dblclick', handleMapClick);
    };
  }, [map, addLocation, isAdminView]);
  
  // Get view title
  const getViewTitle = () => {
    if (isAdminView) return 'Admin Map View';
    if (isDashboardView) return 'Your Contributions Map';
    return 'Explore Locations';
  };
  
  // Determine button text based on view
  const getAddButtonText = () => {
    if (isAdminView) return 'View Pending';
    if (isDashboardView) return 'Add Location';
    return 'Add New Place';
  };
  
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center space-y-3">
            <div className="h-10 w-10 animate-rotate-center">
              <Layers className="h-10 w-10 text-primary opacity-80" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Loading map...</p>
          </div>
        </div>
      ) : null}
      
      {/* Map Container */}
      <div ref={mapContainerRef} className="map-container" />
      
      {/* Map Controls */}
      <MapControls 
        filters={filters} 
        updateFilters={updateFilters} 
        centerOnUserLocation={centerOnUserLocation}
        isAdminView={isAdminView}
        isDashboardView={isDashboardView}
      />
      
      {/* Stats Panel */}
      <div className="absolute top-4 left-4 glass-panel px-4 py-3 z-10 max-w-xs animate-fade-in">
        <h3 className="text-sm font-medium">{getViewTitle()}</h3>
        <p className="text-xs text-muted-foreground mt-1">
          {locations.length} location{locations.length !== 1 ? 's' : ''} shown
        </p>
      </div>
      
      {/* Add New Location Button */}
      <button 
        className="absolute bottom-6 right-6 flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-full shadow-lg hover:bg-primary/90 transition-all z-10"
        onClick={() => {
          // If admin view, center on a random pending location
          if (isAdminView && locations.length > 0) {
            const randomLocation = locations[Math.floor(Math.random() * locations.length)];
            centerOnUserLocation();
          } else {
            // Otherwise show form for new location
            centerOnUserLocation();
          }
        }}
      >
        <Plus size={18} />
        <span className="text-sm font-medium">{getAddButtonText()}</span>
      </button>
      
      {/* My Location Button */}
      <button 
        className="absolute bottom-6 left-6 glass-panel p-3 rounded-full shadow-lg hover:bg-accent/80 transition-all z-10"
        onClick={centerOnUserLocation}
        aria-label="Center on my location"
      >
        <MapPin size={18} />
      </button>
      
      {/* Location Form Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 p-4 animate-fade-in">
          <div className="bg-card rounded-lg shadow-xl max-w-md w-full animate-scale-in overflow-hidden">
            <LocationForm 
              location={selectedLocation}
              onSave={updateLocation}
              onDelete={deleteLocation}
              onCancel={() => setSelectedLocation(null)}
              isAdminView={isAdminView}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
