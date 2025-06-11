
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CompanyLinkGenerator from "@/components/CompanyLinkGenerator";


const DirectorDashboard = () => {
  const navigate = useNavigate();

  const copyToClipboard = async () => {
    const surveyUrl = `${window.location.origin}/cuestionario`;
    try {
      await navigator.clipboard.writeText(surveyUrl);
      alert('¡Enlace copiado al portapapeles!');
    } catch (err) {
      console.error('Error al copiar:', err);
      alert(`Enlace del cuestionario: ${surveyUrl}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Panel de Control - Directores</h1>
            <p className="text-xl text-gray-600">
              Gestiona el proceso de diagnóstico de IA para múltiples organizaciones
            </p>
          </div>

          {/* Sección de generación de enlaces */}
          <Card className="mb-8 bg-emerald-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-800 flex items-center gap-2">
                🏢 Gestión Multi-empresa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-emerald-700 mb-4">
                Genera enlaces únicos para cada empresa y mantén sus respuestas organizadas por separado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CompanyLinkGenerator />
                <Button 
                  onClick={copyToClipboard}
                  variant="outline"
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                >
                  📎 Enlace General (Sin Empresa)
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📋 Distribuir Cuestionario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Comparte enlaces del cuestionario con empleados de diferentes empresas para recopilar información específica de cada organización.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">
                    💡 Usa el generador de enlaces de arriba para crear enlaces específicos por empresa
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📊 Ver Respuestas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Revisa las respuestas recopiladas filtradas por empresa y analiza los patrones identificados.
                </p>
                <Button 
                  onClick={() => navigate('/responses')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Ver Respuestas por Empresa
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📈 Dashboard Analítico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Visualiza métricas por empresa, tendencias y oportunidades de automatización identificadas.
                </p>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Ir al Dashboard Multi-empresa
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎯 Recomendaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Accede a planes de adopción de IA personalizados por empresa con roadmap, costos y estrategia.
                </p>
                <Button 
                  onClick={() => navigate('/recommendations')}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  Ver Recomendaciones por Empresa
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">💡 Instrucciones para Directores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-blue-700">
                <div className="flex items-start gap-2">
                  <span className="font-bold">1.</span>
                  <span>Genera enlaces específicos para cada empresa usando el botón "Generar Enlace por Empresa"</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold">2.</span>
                  <span>Comparte el enlace específico con los empleados de cada empresa</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold">3.</span>
                  <span>Monitorea las respuestas organizadas por empresa en "Ver Respuestas"</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold">4.</span>
                  <span>Analiza datos específicos por empresa en el Dashboard</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold">5.</span>
                  <span>Revisa recomendaciones personalizadas para cada organización</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DirectorDashboard;
