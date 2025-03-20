import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define types for location data
export type LocationStatus = 'verified' | 'pending' | 'rejected';
export type LocationCategory = 'business' | 'road' | 'landmark';

export interface Location {
  id: string;
  name: string;
  category: LocationCategory;
  status: LocationStatus;
  lat: number;
  lng: number;
  contributor: string;
  contributorId: string;
  dateAdded: string;
  description?: string;
  images?: string[];
}

// Mock data for demo purposes
const MOCK_LOCATIONS: Location[] = [
  {
    id: '1',
    name: 'Cosmopolitan Mall',
    category: 'business',
    status: 'verified',
    lat: -15.4075,
    lng: 28.2678,
    contributor: 'John Doe',
    contributorId: 'user1',
    dateAdded: '2023-05-15',
    description: 'Modern shopping mall in Lusaka',
    images: []
  },
  {
    id: '2',
    name: 'Cairo Road',
    category: 'road',
    status: 'verified',
    lat: -15.4167,
    lng: 28.2833,
    contributor: 'Jane Smith',
    contributorId: 'user2',
    dateAdded: '2023-06-02',
    description: 'Main commercial road in Lusaka CBD',
    images: []
  },
  {
    id: '3',
    name: 'National Museum',
    category: 'landmark',
    status: 'pending',
    lat: -15.3981,
    lng: 28.3066,
    contributor: 'Sam Wilson',
    contributorId: 'user3',
    dateAdded: '2023-07-10',
    description: 'Cultural heritage museum',
    images: []
  },
  {
    id: '4',
    name: 'New Shopping Center',
    category: 'business',
    status: 'pending',
    lat: -15.4254,
    lng: 28.2911,
    contributor: 'User',
    contributorId: 'currentUser',
    dateAdded: '2023-08-01',
    description: 'Under construction shopping center',
    images: []
  },
  {
    id: '5',
    name: 'Rejected Business',
    category: 'business',
    status: 'rejected',
    lat: -15.4119,
    lng: 28.3051,
    contributor: 'User',
    contributorId: 'currentUser',
    dateAdded: '2023-07-20',
    description: 'Duplicate entry',
    images: []
  }
];

// Filter types
export interface MapFilters {
  categories: LocationCategory[];
  status: LocationStatus[];
  onlyMine: boolean;
}

interface UseMapProps {
  userId?: string;
  isAdminView?: boolean;
  isDashboardView?: boolean;
}

// Custom hook for the map
export const useMap = ({
  userId = 'currentUser',
  isAdminView = false,
  isDashboardView = false
}: UseMapProps = {}) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [locations, setLocations] = useState<Location[]>(MOCK_LOCATIONS);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const markersRef = useRef<{[key: string]: L.Marker}>({});
  
  const [filters, setFilters] = useState<MapFilters>({
    categories: ['business', 'road', 'landmark'],
    status: ['verified', 'pending', 'rejected'],
    onlyMine: false
  });
  
  // Initialize map
  const initializeMap = (container: HTMLElement) => {
    if (!map) {
      // Create the map instance
      const newMap = L.map(container, {
        center: [-15.4167, 28.2833], // Default center on Lusaka, Zambia
        zoom: 13,
        zoomControl: false, // We'll add custom zoom controls
        attributionControl: true
      });
      
      // Check if we should use dark mode tiles
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      // Add the OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(newMap);
      
      // Add zoom control to bottom right
      L.control.zoom({
        position: 'bottomright'
      }).addTo(newMap);
      
      // Set the map instance
      setMap(newMap);
      
      // Try to get user location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          newMap.setView([latitude, longitude], 15);
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Keep default location
        }
      );
      
      setIsLoading(false);
    }
  };
  
  // Clean up map on unmount
  useEffect(() => {
    return () => {
      if (map) {
        map.remove();
        setMap(null);
      }
    };
  }, [map]);
  
  // Function to get marker icon based on location category and status
  const getMarkerIcon = (location: Location) => {
    const getColorByStatus = (status: LocationStatus) => {
      switch (status) {
        case 'verified': return 'bg-map-verified';
        case 'pending': return 'bg-map-pending';
        case 'rejected': return 'bg-map-rejected';
        default: return 'bg-gray-500';
      }
    };
    
    const getIconByCategory = (category: LocationCategory) => {
      switch (category) {
        case 'business': return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"></path><path d="M19 7v14"></path><path d="M3 7v14"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path><path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"></path></svg>';
        case 'road': return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19L7.5 5L12 19L16.5 5L20 19"></path></svg>';
        case 'landmark': return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>';
        default: return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>';
      }
    };
    
    // Get the SVG icon
    const svg = getIconByCategory(location.category);
    const colorClass = getColorByStatus(location.status);
    
    // Create a custom div icon with the SVG
    return L.divIcon({
      html: `
        <div class="relative group">
          <div class="absolute -top-1 -right-1 w-3 h-3 ${colorClass} rounded-full border border-white"></div>
          <div class="flex items-center justify-center w-8 h-8 rounded-full bg-card text-foreground shadow-md border border-border/50 transition-transform group-hover:scale-110">
            ${svg}
          </div>
        </div>
      `,
      className: 'custom-marker',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };
  
  // Apply filters to locations
  const filteredLocations = locations.filter(location => {
    // Filter by category
    if (!filters.categories.includes(location.category)) return false;
    
    // Filter by status
    if (!filters.status.includes(location.status)) return false;
    
    // Filter by user's contributions
    if (filters.onlyMine && location.contributorId !== userId) return false;
    
    // In dashboard view, only show user's contributions
    if (isDashboardView && location.contributorId !== userId) return false;
    
    // In admin view, only show pending locations by default
    if (isAdminView && location.status !== 'pending') return false;
    
    return true;
  });
  
  // Update markers when map or filtered locations change
  useEffect(() => {
    if (!map) return;
    
    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => {
      marker.remove();
    });
    markersRef.current = {};
    
    // Add filtered markers to the map
    filteredLocations.forEach(location => {
      const marker = L.marker([location.lat, location.lng], {
        icon: getMarkerIcon(location),
        title: location.name
      });
      
      // Create popup content with dynamic elements based on the view type
      const popupContent = document.createElement('div');
      popupContent.className = 'location-popup p-2 min-w-[200px]';
      
      // Status badge
      const statusBadge = document.createElement('span');
      statusBadge.className = `status-${location.status} absolute top-2 right-2`;
      statusBadge.textContent = location.status.charAt(0).toUpperCase() + location.status.slice(1);
      popupContent.appendChild(statusBadge);
      
      // Title
      const title = document.createElement('h3');
      title.className = 'text-sm font-semibold mt-4';
      title.textContent = location.name;
      popupContent.appendChild(title);
      
      // Category
      const category = document.createElement('p');
      category.className = 'text-xs text-muted-foreground';
      category.textContent = `${location.category.charAt(0).toUpperCase() + location.category.slice(1)}`;
      popupContent.appendChild(category);
      
      // Description if available
      if (location.description) {
        const description = document.createElement('p');
        description.className = 'text-xs mt-2';
        description.textContent = location.description;
        popupContent.appendChild(description);
      }
      
      // Contributor info
      const contributor = document.createElement('p');
      contributor.className = 'text-xs text-muted-foreground mt-2';
      contributor.textContent = `Added by: ${location.contributor}`;
      popupContent.appendChild(contributor);
      
      // Buttons for actions (only show in specific views)
      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = 'flex gap-2 mt-3';
      
      // View details button for all views
      const viewButton = document.createElement('button');
      viewButton.className = 'button-secondary text-xs py-1 px-2 flex-1';
      viewButton.textContent = 'Details';
      viewButton.onclick = () => setSelectedLocation(location);
      buttonsContainer.appendChild(viewButton);
      
      // Admin specific buttons
      if (isAdminView && location.status === 'pending') {
        const approveButton = document.createElement('button');
        approveButton.className = 'bg-map-verified text-white text-xs py-1 px-2 rounded-md hover:bg-opacity-90 transition-colors flex-1';
        approveButton.textContent = 'Approve';
        approveButton.onclick = () => {
          // Would connect to backend in real app
          console.log('Approving location:', location.id);
          // Update locally for demo
          setLocations(prev => 
            prev.map(loc => 
              loc.id === location.id ? { ...loc, status: 'verified' } : loc
            )
          );
          marker.closePopup();
        };
        buttonsContainer.appendChild(approveButton);
        
        const rejectButton = document.createElement('button');
        rejectButton.className = 'bg-map-rejected text-white text-xs py-1 px-2 rounded-md hover:bg-opacity-90 transition-colors flex-1';
        rejectButton.textContent = 'Reject';
        rejectButton.onclick = () => {
          // Would connect to backend in real app
          console.log('Rejecting location:', location.id);
          // Update locally for demo
          setLocations(prev => 
            prev.map(loc => 
              loc.id === location.id ? { ...loc, status: 'rejected' } : loc
            )
          );
          marker.closePopup();
        };
        buttonsContainer.appendChild(rejectButton);
      }
      
      // Dashboard specific buttons for user's own locations
      if (isDashboardView && location.contributorId === userId) {
        const editButton = document.createElement('button');
        editButton.className = 'bg-blue-500 text-white text-xs py-1 px-2 rounded-md hover:bg-opacity-90 transition-colors flex-1';
        editButton.textContent = 'Edit';
        editButton.onclick = () => {
          console.log('Editing location:', location.id);
          // Would open edit form in real app
        };
        buttonsContainer.appendChild(editButton);
        
        // Only show delete for pending or rejected
        if (location.status !== 'verified') {
          const deleteButton = document.createElement('button');
          deleteButton.className = 'bg-map-rejected text-white text-xs py-1 px-2 rounded-md hover:bg-opacity-90 transition-colors flex-1';
          deleteButton.textContent = 'Delete';
          deleteButton.onclick = () => {
            console.log('Deleting location:', location.id);
            // Would connect to backend in real app
            // Update locally for demo
            setLocations(prev => prev.filter(loc => loc.id !== location.id));
            marker.closePopup();
          };
          buttonsContainer.appendChild(deleteButton);
        }
      }
      
      popupContent.appendChild(buttonsContainer);
      
      // Create popup with the custom content
      const popup = L.popup({
        className: 'custom-popup',
        closeButton: true,
        autoClose: true,
        closeOnEscapeKey: true,
        closeOnClick: true,
      }).setContent(popupContent);
      
      marker.bindPopup(popup);
      marker.addTo(map);
      markersRef.current[location.id] = marker;
    });
    
  }, [map, filteredLocations, isAdminView, isDashboardView, userId]);
  
  // Handle adding a new location at a specific point
  const addLocation = (latlng: L.LatLng) => {
    console.log('Adding new location at:', latlng);
    // This would open a form in a real app
    // For demo, we'll add a mock location
    const newId = `temp-${Date.now()}`;
    const newLocation: Location = {
      id: newId,
      name: 'New Location',
      category: 'business',
      status: 'pending',
      lat: latlng.lat,
      lng: latlng.lng,
      contributor: 'You',
      contributorId: userId,
      dateAdded: new Date().toISOString().split('T')[0],
      description: 'Click to edit details'
    };
    
    setLocations(prev => [...prev, newLocation]);
    setSelectedLocation(newLocation);
  };
  
  // Handle updating a location
  const updateLocation = (updatedLocation: Location) => {
    setLocations(prev => 
      prev.map(loc => 
        loc.id === updatedLocation.id ? updatedLocation : loc
      )
    );
    setSelectedLocation(null);
  };
  
  // Handle deleting a location
  const deleteLocation = (id: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== id));
    setSelectedLocation(null);
  };
  
  // Center map on user location
  const centerOnUserLocation = () => {
    if (!map || !userLocation) return;
    map.setView(userLocation, 15, { animate: true });
  };
  
  // Center map on a specific location
  const centerOnLocation = (location: Location) => {
    if (!map) return;
    map.setView([location.lat, location.lng], 17, { animate: true });
    
    // Open popup for the location
    const marker = markersRef.current[location.id];
    if (marker) {
      marker.openPopup();
    }
  };
  
  // Update filters
  const updateFilters = (newFilters: Partial<MapFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };
  
  return {
    map,
    initializeMap,
    locations: filteredLocations,
    selectedLocation,
    setSelectedLocation,
    userLocation,
    isLoading,
    error,
    filters,
    updateFilters,
    addLocation,
    updateLocation,
    deleteLocation,
    centerOnUserLocation,
    centerOnLocation
  };
};

export default useMap;
