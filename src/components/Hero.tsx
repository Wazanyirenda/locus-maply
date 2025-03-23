
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Globe2 } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const Hero = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('user') !== null;
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleExploreClick = () => {
    // Navigate to login if not logged in, otherwise to explore
    isLoggedIn ? navigate('/map') : navigate('/auth/login');
  };

  const handleContributeClick = () => {
    // Navigate to login if not logged in, otherwise to contribution page
    isLoggedIn ? navigate('/contribute') : navigate('/auth/login');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px]"></div>
      </div>

      {/* Main content */}
      <div className="container relative z-10 px-4 py-32 mt-20 mx-auto text-center">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full blur-xl bg-primary/20 opacity-70 animate-pulse"></div>
          <div className="h-24 w-24 mx-auto mb-8 relative text-5xl font-bold text-primary animate-float">
            <Globe2 className="h-full w-full" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
          The World, Flowing In Real-Time.
        </h1>
        
        <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto mb-12">
          Join our platform to map and discover locations across Africa. 
          Every contribution helps build a more connected continent.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="text-lg px-8"
            onClick={handleContributeClick}
          >
            Start Contributing
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8"
            onClick={handleExploreClick}
          >
            Explore Map
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
