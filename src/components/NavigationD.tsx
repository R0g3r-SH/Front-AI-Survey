
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const NavigationD = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [,
    {path: "/directores", label: "Inicio Directores" },
    { path: "/directores-responses", label: "Respuestas" },
    { path: "/directores-dashboard", label: "Dashboard" },
    { path: "/directores-analysis", label: "Análisis" },
    { path: "/directores-recommendations", label: "Recomendaciones" }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-purple-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <img 
              src="/lovable-uploads/5130394b-4425-4061-9f3d-88450b3f3831.png" 
              alt="Pulpura AI" 
              className="h-10 w-auto transition-transform duration-200 group-hover:scale-105"
            />
          </div>
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "default" : "ghost"}
                onClick={() => navigate(item.path)}
                className={`text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path 
                    ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg" 
                    : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationD;
