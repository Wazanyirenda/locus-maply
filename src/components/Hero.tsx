
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Globe2, Map, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

const Hero = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleExploreClick = () => {
    // Navigate to login first
    navigate('/auth/login');
  };

  const handleContributeClick = () => {
    // Navigate to login first
    navigate('/auth/login');
  };

  const isLoggedIn = localStorage.getItem('user') !== null;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Navigation Bar */}
      <div className="w-full absolute top-0 z-20">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Globe2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Locus</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/" className="text-foreground hover:text-primary transition-colors px-3 py-2">
                      Home
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/50 p-6 no-underline outline-none focus:shadow-md"
                              href="/auth/login"
                            >
                              <Globe2 className="h-6 w-6 text-foreground mb-2" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                Locus Mapping
                              </div>
                              <p className="text-sm leading-tight text-foreground/80">
                                Help map locations across Africa with our interactive tool.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <Link
                            to="/auth/login"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Map Explorer</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              View and explore locations on our interactive map.
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/auth/login"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Contributions</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Submit and track your location contributions.
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/auth/login" className="text-foreground hover:text-primary transition-colors px-3 py-2">
                      About
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            
            {/* Login/Dashboard Button */}
            <div className="hidden md:block">
              {isLoggedIn ? (
                <Button asChild>
                  <Link to="/mapboard">Dashboard</Link>
                </Button>
              ) : (
                <Button asChild>
                  <Link to="/auth/login">Login</Link>
                </Button>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 z-20 bg-background/95 backdrop-blur-md border-b border-border md:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-2">
              <Link 
                to="/" 
                className="px-4 py-2 hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/auth/login" 
                className="px-4 py-2 hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/auth/login" 
                className="px-4 py-2 hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              {isLoggedIn ? (
                <Link 
                  to="/mapboard" 
                  className="mt-2 bg-primary text-primary-foreground px-4 py-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <Link 
                  to="/auth/login" 
                  className="mt-2 bg-primary text-primary-foreground px-4 py-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

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
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
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
