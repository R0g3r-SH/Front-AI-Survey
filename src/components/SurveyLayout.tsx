
import { ReactNode } from "react";

interface SurveyLayoutProps {
  children: ReactNode;
}

const SurveyLayout = ({ children }: SurveyLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/5130394b-4425-4061-9f3d-88450b3f3831.png" 
            alt="Pulpura AI" 
            className="h-12 w-auto"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default SurveyLayout;
