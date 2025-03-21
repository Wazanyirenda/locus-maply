
import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Upload, Award, ArrowRight, Map, Globe, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Mock authentication state - replace with actual auth
  const isLoggedIn = window.isLoggedIn;
  
  // Animation on load
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Top contributors data (mock data)
  const topContributors = [
    { rank: 1, username: 'mapmaster', points: 450 },
    { rank: 2, username: 'geoguru', points: 392 },
    { rank: 3, username: 'explorerzm', points: 341 },
    { rank: 4, username: 'pathfinder', points: 289 },
    { rank: 5, username: 'wayfarer', points: 276 },
  ];
  
  // Handle authenticated routes
  const handleAuthenticatedRoute = (path: string) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate(`/auth/login?returnTo=${path}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        ref={heroRef} 
        className="relative overflow-hidden min-h-[90vh] flex items-center justify-center py-20 md:py-28 px-6"
      >
        <div className="absolute inset-0 z-0">
          {/* Grid background with topographic lines */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:75px_75px] z-0"></div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/70 z-1"></div>
          
          {/* Accent circles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 filter blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/10 filter blur-[100px] animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
            {/* Logo with floating animation */}
            <div className={`animate-float ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700 delay-100`}>
              <div className="relative flex items-center justify-center">
                <Globe className="h-16 w-16 text-blue-400" />
                <div className="absolute inset-0 bg-blue-400/20 rounded-full filter blur-xl"></div>
              </div>
            </div>
            
            {/* Tagline with gradient text */}
            <h1 className={`text-4xl md:text-6xl font-bold leading-tight tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              The World, Flowing In <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Real-Time</span>
            </h1>
            
            {/* Description */}
            <p className={`text-lg text-muted-foreground max-w-2xl transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Join our platform to map and discover locations across Africa. 
              Every contribution helps build a more connected continent.
            </p>
            
            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 mt-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Button
                onClick={() => handleAuthenticatedRoute('/contribute')}
                className="px-8 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                Start Contributing
              </Button>
              <Button
                onClick={() => handleAuthenticatedRoute('/map')}
                variant="outline"
                className="px-8 py-3 rounded-lg hover:bg-background/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                Explore Map
              </Button>
            </div>
          </div>
          
          {/* Decorative Map Element */}
          <div className={`relative mt-16 w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-border/50 shadow-xl transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30 z-10"></div>
            
            <img 
              src="https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/28.2833,-15.4167,11,0/1200x400?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw" 
              alt="Map of Lusaka" 
              className="w-full h-64 object-cover"
            />
            
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <Button
                onClick={() => handleAuthenticatedRoute('/map')}
                className="px-6 py-3 bg-blue-500/90 backdrop-blur-sm text-white rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
              >
                <span className="flex items-center">
                  Open Interactive Map 
                  <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="py-20 px-6 bg-accent/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Be one of many contributors helping to build the most accurate map of Africa.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Add Locations */}
            <div className="glass-card p-6 transform transition-all duration-700">
              <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 mb-5">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Add Locations</h3>
              <p className="text-muted-foreground">
                Submit businesses, landmarks, and roads you know across Africa.
              </p>
            </div>
            
            {/* Upload Photos */}
            <div className="glass-card p-6 transform transition-all duration-700" style={{ transitionDelay: '100ms' }}>
              <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 mb-5">
                <Upload className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Photos</h3>
              <p className="text-muted-foreground">
                Add photos to help others identify and find the location.
              </p>
            </div>
            
            {/* Earn Rewards */}
            <div className="glass-card p-6 transform transition-all duration-700" style={{ transitionDelay: '200ms' }}>
              <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 mb-5">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Earn Rewards</h3>
              <p className="text-muted-foreground">
                Get points and unlock rewards for your contributions.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Contributors Section */}
      <div className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Top Contributors</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              The most active mappers in our community. Join them and earn your place on the leaderboard!
            </p>
          </div>
          
          <div className="max-w-lg mx-auto">
            <div className="glass-card overflow-hidden rounded-xl">
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Award className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="ml-3 font-semibold">Leaderboard</h3>
                </div>
                <Link to="/mapboard" className="flex items-center text-sm text-blue-400 hover:text-blue-300">
                  View Full Rankings
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="divide-y divide-border/50">
                {topContributors.map((contributor) => (
                  <div key={contributor.rank} className="flex items-center justify-between p-4 hover:bg-accent/20 transition-colors">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-accent/50 flex items-center justify-center font-semibold text-sm">
                        {contributor.rank}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center ml-3">
                        <span className="text-sm">{contributor.username.charAt(0).toUpperCase()}</span>
                      </div>
                      <span className="ml-3 font-medium">{contributor.username}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-semibold text-blue-400">{contributor.points}</span>
                      <span className="ml-1 text-muted-foreground">pts</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {!isLoggedIn && (
                <div className="p-4 border-t border-border/50">
                  <Button 
                    onClick={() => navigate('/auth/login')} 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                  >
                    Join Now to Start Contributing
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-10 px-6 border-t border-border/50">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
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
