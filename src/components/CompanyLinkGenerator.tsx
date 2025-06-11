
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Copy, Plus } from "lucide-react";
import { surveyService } from "@/services/surveyService";

const CompanyLinkGenerator = () => {
  const [companyName, setCompanyName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const generateLink = async () => {
    
    if (!companyName.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa el nombre de la empresa",
        variant: "destructive",
      });
      return;
    }

    // Crear un slug de la empresa para la URL  

    const url = await surveyService.createNewSurveyUrl(companyName);

    if (!url) {

      toast({
        title: "Error",
        description: "No se pudo generar el enlace. Inténtalo de nuevo.",
        variant: "destructive",
      });
      return;
    }

    setGeneratedLink(url);
  
  
    toast({
      title: "¡Enlace generado!",
      description: `Enlace creado para ${companyName}`,
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      toast({
        title: "¡Enlace copiado!",
        description: "El enlace ha sido copiado al portapapeles",
      });
    } catch (err) {
      console.error('Error al copiar:', err);
      toast({
        title: "Error",
        description: "No se pudo copiar el enlace",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setCompanyName("");
    setGeneratedLink("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Generar Enlace por Empresa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generar Enlace de Cuestionario</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">Nombre de la Empresa</Label>
            <Input
              id="company"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Ej: Acme Corporation"
            />
          </div>
          
          <Button 
            onClick={generateLink} 
            className="w-full"
            disabled={!companyName.trim()}
          >
            Generar Enlace
          </Button>
          
          {generatedLink && (
            <div className="space-y-3">
              <Label>Enlace Generado:</Label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 font-mono break-all">
                  {generatedLink}
                </p>
              </div>
              <Button 
                onClick={copyToClipboard}
                variant="outline"
                className="w-full"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar Enlace
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyLinkGenerator;
