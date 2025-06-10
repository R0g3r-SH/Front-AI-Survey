
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ClipboardList, BarChart, Users, Settings, Star, ArrowUp, ArrowDown } from "lucide-react";
import Navigation from "@/components/Navigation";

const Index = () => {
  const navigate = useNavigate();

  const googleEcosystem = [
    { name: "Google Workspace", description: "Colaboración y productividad empresarial" },
    { name: "Gemini", description: "IA generativa avanzada de Google" },
    { name: "Vertex AI", description: "Plataforma de machine learning empresarial" },
    { name: "Firebase", description: "Desarrollo de aplicaciones en la nube" },
    { name: "AI Labs", description: "Investigación e innovación en IA" },
    { name: "ChatGPT", description: "IA conversacional open source" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-gray-50 to-purple-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/5130394b-4425-4061-9f3d-88450b3f3831.png" 
              alt="Pulpura AI" 
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-8">
            Diagnóstico de Madurez en IA
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Consultora especializada en evaluar, analizar y optimizar la implementación de 
            inteligencia artificial generativa en organizaciones modernas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-105 group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-6 p-4 bg-purple-100 rounded-2xl w-20 h-20 flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                <ClipboardList className="h-10 w-10 text-purple-600" />
              </div>
              <CardTitle className="text-xl text-gray-800">Cuestionario</CardTitle>
              <CardDescription className="text-gray-600">
                Evalúa tareas y procesos automatizables
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/survey')} 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Iniciar Evaluación
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-105 group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-6 p-4 bg-gray-100 rounded-2xl w-20 h-20 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                <BarChart className="h-10 w-10 text-gray-600" />
              </div>
              <CardTitle className="text-xl text-gray-800">Dashboard</CardTitle>
              <CardDescription className="text-gray-600">
                Visualiza resultados y métricas clave
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/dashboard')} 
                variant="outline"
                className="w-full border-2 border-gray-400 text-gray-600 hover:bg-gray-50 hover:border-gray-500 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Ver Resultados
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-105 group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-6 p-4 bg-purple-100 rounded-2xl w-20 h-20 flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                <Users className="h-10 w-10 text-purple-600" />
              </div>
              <CardTitle className="text-xl text-gray-800">Análisis</CardTitle>
              <CardDescription className="text-gray-600">
                Clusters y segmentación de casos de uso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/analysis')} 
                variant="outline"
                className="w-full border-2 border-purple-400 text-purple-600 hover:bg-purple-50 hover:border-purple-500 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Analizar Datos
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-105 group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-6 p-4 bg-gray-100 rounded-2xl w-20 h-20 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                <Settings className="h-10 w-10 text-gray-600" />
              </div>
              <CardTitle className="text-xl text-gray-800">Recomendaciones</CardTitle>
              <CardDescription className="text-gray-600">
                Roadmap y estrategias de implementación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/recommendations')} 
                variant="outline"
                className="w-full border-2 border-gray-400 text-gray-600 hover:bg-gray-50 hover:border-gray-500 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Ver Roadmap
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Nueva sección Quiénes Somos */}
        <div className="mb-16">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-purple-100">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-gray-800 mb-6">
                ¿Qué somos? <span className="text-gray-500 font-normal">| Data & AI Tech Agency</span>
              </h2>
              <div className="max-w-5xl mx-auto">
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-300 rounded-2xl p-8 mb-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    Firma boutique de tecnología y consultoría que ayuda a transformar a las empresas en <span className="text-purple-600">AI Driven</span>
                  </h3>
                </div>
                
                <div className="bg-purple-600 text-white rounded-2xl p-6 mb-8">
                  <h4 className="text-2xl font-bold mb-4">¿Qué quiere decir esto?</h4>
                </div>
                
                <div className="text-left bg-gray-50 rounded-2xl p-8 mb-8">
                  <h4 className="text-2xl font-bold text-purple-600 mb-4">AI Driven:</h4>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Tener una organización con la capacidad de tomar las mejores decisiones posibles a cualquier nivel, 
                    con datos limpios, estandarizados, confiables y fáciles de entender.
                  </p>
                  <div className="mt-4 p-4 bg-purple-600 text-white rounded-lg">
                    <p className="text-lg font-semibold">
                      Donde la I.A. facilita los análisis, procesos y tareas en forma natural y sencilla.
                    </p>
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-purple-600 mb-8">Nosotros buscamos:</h3>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-2xl w-16 h-16 flex items-center justify-center">
                        <ArrowDown className="h-8 w-8 text-purple-600" />
                      </div>
                      <CardTitle className="text-lg text-purple-600 mb-2">Implementar</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-700">
                        Ayudar a <span className="font-semibold text-purple-600">implementar en forma eficiente</span> la mejor tecnología IA, 
                        para aumentar la operación de los negocios.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-2xl w-16 h-16 flex items-center justify-center">
                        <Star className="h-8 w-8 text-purple-600" />
                      </div>
                      <CardTitle className="text-lg text-purple-600 mb-2">Desarrollar</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-700">
                        Desarrollar <span className="font-semibold text-purple-600">capacidades internas</span> para aprovechar al máximo 
                        el talento y la inversión en tecnología.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-2xl w-16 h-16 flex items-center justify-center">
                        <ArrowUp className="h-8 w-8 text-purple-600" />
                      </div>
                      <CardTitle className="text-lg text-purple-600 mb-2">Acelerar</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-700">
                        Acelerar la <span className="font-semibold text-purple-600">adopción cultural con sentido de negocio</span> de la 
                        inteligencia artificial en las empresas.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Ecosistema Google */}
        <div className="mb-16">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-purple-100">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
              Tecnologías que Recomendamos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {googleEcosystem.map((tech, index) => (
                <Card key={index} className="border-2 border-gray-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg group">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg text-purple-600 group-hover:text-purple-700">
                      {tech.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 text-sm">
                      {tech.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-600 text-lg">
                Especializados en el <span className="font-semibold text-purple-600">ecosistema Google</span> y 
                herramientas <span className="font-semibold text-gray-700">open source</span> como ChatGPT
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-purple-100">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            ¿Cómo funciona nuestra metodología?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="text-5xl font-bold text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">01</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Diagnóstico</h3>
              <p className="text-gray-600 leading-relaxed">
                Cada empleado completa un cuestionario personalizado según su rol y funciones específicas
              </p>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">02</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Análisis</h3>
              <p className="text-gray-600 leading-relaxed">
                IA analiza las respuestas, identifica patrones y crea clusters de casos de uso prioritarios
              </p>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">03</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Roadmap</h3>
              <p className="text-gray-600 leading-relaxed">
                Genera recomendaciones estratégicas y un plan de implementación personalizado y priorizado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
