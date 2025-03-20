import React, { useState } from 'react';
import { Location, LocationCategory, LocationStatus } from '@/hooks/useMap';
import { X, Save, Trash, Building2, Route, Landmark, Check, Clock, AlertTriangle } from 'lucide-react';

interface LocationFormProps {
  location: Location;
  onSave: (location: Location) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
  isAdminView?: boolean;
}

const LocationForm: React.FC<LocationFormProps> = ({
  location,
  onSave,
  onDelete,
  onCancel,
  isAdminView = false
}) => {
  const [formData, setFormData] = useState<Location>(location);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const setCategory = (category: LocationCategory) => {
    setFormData(prev => ({
      ...prev,
      category
    }));
  };
  
  const setStatus = (status: LocationStatus) => {
    if (isAdminView) {
      setFormData(prev => ({
        ...prev,
        status
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.description || !formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };
  
  const confirmDelete = () => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      onDelete(location.id);
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-base font-medium">
          {location.id.startsWith('temp-') ? 'New Location' : 'Edit Location'}
        </h3>
        <button 
          onClick={onCancel}
          className="rounded-full p-1.5 hover:bg-muted/80 transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Location Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`input-field ${errors.name ? 'border-destructive' : ''}`}
            placeholder="Enter location name"
          />
          {errors.name && (
            <p className="text-xs text-destructive mt-1">{errors.name}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Category
          </label>
          <div className="grid grid-cols-3 gap-2">
            <CategoryButton 
              icon={<Building2 size={16} />}
              label="Business"
              isSelected={formData.category === 'business'}
              onClick={() => setCategory('business')}
            />
            <CategoryButton 
              icon={<Route size={16} />}
              label="Road"
              isSelected={formData.category === 'road'}
              onClick={() => setCategory('road')}
            />
            <CategoryButton 
              icon={<Landmark size={16} />}
              label="Landmark"
              isSelected={formData.category === 'landmark'}
              onClick={() => setCategory('landmark')}
            />
          </div>
        </div>
        
        {isAdminView && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              <StatusButton 
                icon={<Check size={16} />}
                label="Verified"
                color="bg-map-verified"
                isSelected={formData.status === 'verified'}
                onClick={() => setStatus('verified')}
              />
              <StatusButton 
                icon={<Clock size={16} />}
                label="Pending"
                color="bg-map-pending"
                isSelected={formData.status === 'pending'}
                onClick={() => setStatus('pending')}
              />
              <StatusButton 
                icon={<AlertTriangle size={16} />}
                label="Rejected"
                color="bg-map-rejected"
                isSelected={formData.status === 'rejected'}
                onClick={() => setStatus('rejected')}
              />
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            className={`input-field min-h-[100px] resize-y ${errors.description ? 'border-destructive' : ''}`}
            placeholder="Describe this location"
          />
          {errors.description && (
            <p className="text-xs text-destructive mt-1">{errors.description}</p>
          )}
        </div>
        
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="lat" className="block text-sm font-medium mb-1">
              Latitude
            </label>
            <input
              id="lat"
              type="text"
              value={formData.lat.toFixed(6)}
              readOnly
              className="input-field bg-muted/50 cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="lng" className="block text-sm font-medium mb-1">
              Longitude
            </label>
            <input
              id="lng"
              type="text"
              value={formData.lng.toFixed(6)}
              readOnly
              className="input-field bg-muted/50 cursor-not-allowed"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Images
          </label>
          <div className="border border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Image upload would be implemented here
            </p>
            <button 
              type="button" 
              className="mt-2 text-xs button-secondary"
              onClick={() => alert('Image upload functionality would be implemented in a real app')}
            >
              Upload Images
            </button>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={confirmDelete}
            className="flex items-center px-3 py-2 rounded-md bg-destructive text-destructive-foreground text-sm hover:bg-destructive/90 transition-colors"
          >
            <Trash size={16} className="mr-1.5" />
            Delete
          </button>
          
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-2 rounded-md bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
            >
              <Save size={16} className="mr-1.5" />
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

interface CategoryButtonProps {
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  icon,
  label,
  isSelected,
  onClick
}) => {
  return (
    <button
      type="button"
      className={`flex flex-col items-center justify-center p-2 rounded-md border transition-all ${
        isSelected 
          ? 'bg-primary/10 border-primary text-primary' 
          : 'bg-muted/30 border-transparent text-foreground hover:bg-muted/50'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

interface StatusButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

const StatusButton: React.FC<StatusButtonProps> = ({
  icon,
  label,
  color,
  isSelected,
  onClick
}) => {
  return (
    <button
      type="button"
      className={`flex flex-col items-center justify-center p-2 rounded-md border transition-all ${
        isSelected 
          ? `${color} border-transparent text-white` 
          : 'bg-muted/30 border-transparent text-foreground hover:bg-muted/50'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

export default LocationForm;
