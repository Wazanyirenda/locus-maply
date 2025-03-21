
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BarChart3, Users, Shield, ArrowRight, Map, Activity } from 'lucide-react';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Animation on load
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Features section
  const features = [
    {
      icon: <MapPin className="h-8 w-8" />,
      title: 'Crowdsourced Mapping',
      description: 'Submit and verify locations across Africa, starting with Zambia and Lusaka.'
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: 'Gamified Experience',
      description: 'Earn points, badges, and climb the leaderboard as you contribute to the map.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community Verification',
      description: 'Ensure data accuracy through community-driven verification process.'
    }
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        ref={heroRef} 
        className="relative overflow-hidden py-20 md:py-28 px-6"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/0 z-10" />
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#4444_1px,transparent_1px)] [background-size:16px_16px] z-0" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            <div className={`bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium transform transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
              Crowdsourced Geospatial Mapping Platform
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold leading-tight tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent transform transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
              Map Africa Together with <span className="text-primary">Locus</span>
            </h1>
            
            <p className={`text-lg text-muted-foreground max-w-2xl transform transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
              Join our community to map businesses, roads, and landmarks across Africa. 
              Start with Zambia and earn rewards while contributing to a comprehensive map.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 mt-8 transform transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
              <Link to="/map" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Explore Map
              </Link>
              <Link to="/dashboard" className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                Join Now
              </Link>
            </div>
          </div>
          
          {/* Decorative Map Element */}
          <div className={`relative mt-16 w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-border/50 shadow-xl transform transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-background/0 z-10" />
            
            <img 
              src="https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/28.2833,-15.4167,11,0/1200x400?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw" 
              alt="Map of Lusaka" 
              className="w-full h-64 object-cover"
            />
            
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <Link to="/map" className="px-6 py-2.5 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-lg shadow-lg hover:bg-primary transition-colors group">
                <span className="flex items-center">
                  Open Interactive Map 
                  <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 px-6 bg-accent/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">How Locus Works</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Contribute to mapping Africa through our intuitive, gamified platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="glass-card p-6 transform transition-all duration-700"
                style={{ transitionDelay: `${i * 100 + 300}ms` }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Section: How to Get Started */}
      <div className="py-20 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Get Started in 3 Simple Steps</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary-foreground font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
                    <p className="text-muted-foreground">Sign up to start contributing to the map and earning points.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary-foreground font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Add Locations</h3>
                    <p className="text-muted-foreground">Submit businesses, roads, or landmarks to the map with details.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary-foreground font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Verify Others' Submissions</h3>
                    <p className="text-muted-foreground">Help verify existing submissions to earn additional points.</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Link to="/dashboard" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Start Mapping Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 glass-card p-6 rounded-xl">
              <div className="aspect-video rounded-lg overflow-hidden border border-border/50">
                <img 
                  src="https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-l+0078FF(28.2833,-15.4167)/28.2833,-15.4167,12,0/1000x500?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw" 
                  alt="Interactive mapping demo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-card/50 border border-border/50 rounded-md p-3 text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-xs text-muted-foreground">Points per Submission</div>
                </div>
                <div className="bg-card/50 border border-border/50 rounded-md p-3 text-center">
                  <div className="text-2xl font-bold text-primary">10+</div>
                  <div className="text-xs text-muted-foreground">Points per Verification</div>
                </div>
                <div className="bg-card/50 border border-border/50 rounded-md p-3 text-center">
                  <div className="text-2xl font-bold text-primary">15</div>
                  <div className="text-xs text-muted-foreground">Badges to Earn</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 px-6 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Locus Community</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Help us create the most accurate and comprehensive map of Africa, starting with Zambia
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/map" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <span className="flex items-center justify-center">
                <Map className="mr-2 h-5 w-5" />
                Explore Map
              </span>
            </Link>
            <Link to="/dashboard" className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
              <span className="flex items-center justify-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                View Dashboard
              </span>
            </Link>
            <Link to="/admin" className="px-6 py-3 bg-card text-card-foreground rounded-lg hover:bg-card/80 border border-border/50 transition-colors">
              <span className="flex items-center justify-center">
                <Shield className="mr-2 h-5 w-5" />
                Admin Panel
              </span>
            </Link>
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
