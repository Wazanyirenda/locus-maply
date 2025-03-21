import React, { useState } from 'react';
import Layout from '@/components/Layout';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Building2, Route, Landmark, Camera, Upload, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface CategoryOption {
  value: string;
  label: string;
  subcategories: { value: string; label: string }[];
  icon: React.ReactNode;
}

const categories: CategoryOption[] = [
  {
    value: 'business',
    label: 'Business',
    icon: <Building2 className="h-5 w-5" />,
    subcategories: [
      { value: 'retail', label: 'Retail Store' },
      { value: 'restaurant', label: 'Restaurant' },
      { value: 'hotel', label: 'Hotel' },
      { value: 'office', label: 'Office' },
      { value: 'bank', label: 'Bank' },
      { value: 'market', label: 'Market' }
    ]
  },
  {
    value: 'road',
    label: 'Road',
    icon: <Route className="h-5 w-5" />,
    subcategories: [
      { value: 'main-road', label: 'Main Road' },
      { value: 'street', label: 'Street' },
      { value: 'highway', label: 'Highway' },
      { value: 'bridge', label: 'Bridge' },
      { value: 'junction', label: 'Junction' }
    ]
  },
  {
    value: 'landmark',
    label: 'Landmark',
    icon: <Landmark className="h-5 w-5" />,
    subcategories: [
      { value: 'government', label: 'Government Building' },
      { value: 'education', label: 'Educational Institution' },
      { value: 'health', label: 'Health Center' },
      { value: 'religious', label: 'Religious Place' },
      { value: 'park', label: 'Park' },
      { value: 'monument', label: 'Monument' },
      { value: 'cultural', label: 'Cultural Center' }
    ]
  }
];

const Contribute = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [images, setImages] = useState<File[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    description: ''
  });
  
  const availableSubcategories = categories.find(cat => cat.value === formData.category)?.subcategories || [];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
      subcategory: '' // Reset subcategory when category changes
    });
  };
  
  const handleSubcategoryChange = (value: string) => {
    setFormData({
      ...formData,
      subcategory: value
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages([...images, ...newFiles]);
    }
  };
  
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  
  const handleMapClick = () => {
    setSelectedLocation([-15.4167, 28.2833]);
    toast({
      title: "Location selected",
      description: "You've pinned a location on the map.",
      variant: "default",
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and pin a location on the map.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('Submitting contribution:', {
        ...formData,
        location: selectedLocation,
        images
      });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Contribution submitted successfully!",
        description: "Your location has been added and is pending approval.",
        variant: "default",
      });
      
      setFormData({
        name: '',
        category: '',
        subcategory: '',
        description: ''
      });
      setSelectedLocation(null);
      setImages([]);
      
    } catch (error) {
      console.error('Error submitting contribution:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your contribution. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const validateForm = () => {
    return (
      formData.name.trim() !== '' &&
      formData.category !== '' &&
      formData.subcategory !== '' &&
      selectedLocation !== null
    );
  };
  
  return (
    <Layout>
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Submit a Landmark or Building</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:order-2">
              <CardHeader>
                <CardTitle className="text-lg">Pin the exact location on the map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video bg-muted/50 rounded-md overflow-hidden border border-border/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground text-sm mb-4">
                      Interactive map would load here with Leaflet.js
                    </p>
                    
                    <Button onClick={handleMapClick} className="absolute z-10">
                      <MapPin className="mr-2 h-4 w-4" />
                      Click to Select Location
                    </Button>
                  </div>
                </div>
                
                {selectedLocation && (
                  <div className="mt-2 p-2 bg-primary/10 rounded-md text-sm">
                    <p className="font-medium text-center">
                      Selected coordinates: {selectedLocation[0].toFixed(6)}, {selectedLocation[1].toFixed(6)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="md:order-1">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name of Location</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Northmead Shopping Center"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Select the category that best describes this location</Label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {categories.map((category) => (
                      <Button
                        key={category.value}
                        type="button"
                        variant={formData.category === category.value ? "default" : "outline"}
                        className="flex flex-col h-20 gap-1"
                        onClick={() => handleCategoryChange(category.value)}
                      >
                        {category.icon}
                        <span>{category.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                {formData.category && (
                  <div className="space-y-2">
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <Select value={formData.subcategory} onValueChange={handleSubcategoryChange}>
                      <SelectTrigger id="subcategory">
                        <SelectValue placeholder="Select a subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSubcategories.map((sub) => (
                          <SelectItem key={sub.value} value={sub.value}>
                            {sub.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="description">Tell us more about this place</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide a detailed description of this location..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Upload images of this location</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square bg-muted/50 rounded-md overflow-hidden border border-border/50">
                        <img 
                          src={URL.createObjectURL(image)} 
                          alt={`Upload preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-background/80 p-1 rounded-full"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    
                    <label className="flex flex-col items-center justify-center aspect-square bg-muted/30 rounded-md border border-dashed border-border/70 cursor-pointer hover:bg-muted/50 transition-colors">
                      <Camera className="h-6 w-6 mb-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Add Photos</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        multiple
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
                
                <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">⏳</span> Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Upload className="mr-2 h-4 w-4" /> Add to the Map
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </Layout>
  );
};

export default Contribute;
