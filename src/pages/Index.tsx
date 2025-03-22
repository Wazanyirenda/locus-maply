
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Camera, Trophy, Users, ArrowRight, Plus } from 'lucide-react';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [showAllContributors, setShowAllContributors] = useState(false);
  
  // Sample top contributors data
  const topContributors = [
    { id: 1, name: "John Doe", points: 1250, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
    { id: 2, name: "Jane Smith", points: 980, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" },
    { id: 3, name: "Alex Johnson", points: 745, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
    { id: 4, name: "Maria Garcia", points: 690, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" },
    { id: 5, name: "David Kim", points: 530, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" },
    { id: 6, name: "Lisa Wang", points: 480, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa" },
    { id: 7, name: "Robert Chen", points: 460, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert" },
    { id: 8, name: "Sarah Miller", points: 410, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  ];
  
  // Features for "How It Works" section
  const features = [
    {
      icon: <MapPin className="h-10 w-10" />,
      title: 'Add Locations',
      description: 'Submit businesses, landmarks, and roads to help build a comprehensive map.'
    },
    {
      icon: <Camera className="h-10 w-10" />,
      title: 'Upload Photos',
      description: 'Contribute images to help others identify and verify locations.'
    },
    {
      icon: <Trophy className="h-10 w-10" />,
      title: 'Earn Rewards',
      description: 'Gain points and unlock achievements for your valuable contributions.'
    }
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* How It Works Section */}
      <div className="py-20 px-6 bg-accent/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Contribute to mapping Africa through these simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="bg-card/50 border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Top Contributors Section */}
      <div className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Top Contributors</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our community's most active mappers are helping build a better map for everyone
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-card/50 border border-border/50 rounded-xl p-6">
              <div className="grid grid-cols-1 gap-4">
                {topContributors.slice(0, showAllContributors ? topContributors.length : 5).map((contributor, index) => (
                  <div 
                    key={contributor.id}
                    className="flex items-center justify-between py-3 px-4 rounded-lg bg-background/50 hover:bg-background transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 overflow-hidden">
                        <img 
                          src={contributor.avatar} 
                          alt={contributor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{index + 1}.</span>
                        <span className="font-medium">{contributor.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{contributor.points.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground ml-1">pts</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {!showAllContributors && topContributors.length > 5 && (
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowAllContributors(true)}
                    className="text-sm"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    View Full Rankings
                  </Button>
                </div>
              )}
              
              <div className="mt-6 pt-6 border-t border-border/50 text-center">
                <Link to="/auth/login">
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Join Now to Start Contributing
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-10 px-6 border-t border-border/50">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Locus
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              A crowdsourced geospatial mapping platform for Africa, focusing on Zambia and Lusaka.
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              © {new Date().getFullYear()} Locus. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
