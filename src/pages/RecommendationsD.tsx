import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, Settings, BarChart } from "lucide-react";
import NavigationD from "@/components/NavigationD";
import { useEffect, useState } from "react";
import { companyService } from "@/services/companyService"; // Asegúrate de que este servicio esté configurado correctamente
import { analysisService } from "@/services/analisysService";
import { recomendationsService } from "@/services/recomendationsService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/Spinner";
import { ToastContainer, toast } from "react-toastify";
const RecommendationsD = () => {
  const [roadmapData, setRoadmapData] = useState({
    roadmap_phases: [],
    training: [],
    total_budget: "",
    overall_timeline: "",
    key_risks: [],
    expected_roi: "",
    techStack: [],
  });
  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState("todas");
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);
  const [loadingTraining, setLoadingTraining] = useState(false);
  const [loadingTechStack, setLoadingTechStack] = useState(false);
  // Cargar empresas disponibles
  useEffect(() => {
    const fetchData = async () => {
      const companiesData = await companyService.getAllCompanies();
      if (companiesData) {
        console.log(companiesData);
        setCompanies(companiesData);
      }
    };

    fetchData();
  }, []);

  const roadmapPhases = [
    {
      phase: "Fase 1: Fundamentos Google + OpenAI",
      duration: "Meses 1-3",
      progress: 0,
      status: "Pendiente",
      budget: "$85,000",
      objectives: [
        "Implementar Google Workspace con Gemini para todos los usuarios",
        "Desplegar ChatGPT Enterprise para equipos creativos y análisis",
        "Configurar Google Cloud AI Platform para casos básicos",
        "Programa de entrenamiento en Gemini y ChatGPT",
      ],
      deliverables: [
        "120 usuarios con Gemini en Workspace activo",
        "ChatGPT Enterprise configurado para 85 usuarios",
        "15 casos de uso automatizados con Google AI",
        "Políticas de uso y governance establecidas",
      ],
      risks: ["Adopción inicial", "Integración con sistemas existentes"],
    },
    {
      phase: "Fase 2: Escalamiento con Vertex AI",
      duration: "Meses 4-6",
      progress: 0,
      status: "Pendiente",
      budget: "$140,000",
      objectives: [
        "Implementar Vertex AI para modelos personalizados",
        "Desplegar Firebase con extensiones de IA",
        "Integrar Google Cloud Functions con OpenAI API",
        "Desarrollar aplicaciones con Gemini Pro API",
      ],
      deliverables: [
        "3 modelos personalizados en Vertex AI",
        "Firebase con IA integrado en procesos clave",
        "API Gateway configurado para OpenAI",
        "Centro de excelencia Google AI establecido",
      ],
      risks: ["Complejidad técnica", "Costos de compute"],
    },
    {
      phase: "Fase 3: IA Avanzada y Optimización",
      duration: "Meses 7-12",
      progress: 0,
      status: "Pendiente",
      budget: "$220,000",
      objectives: [
        "Implementar Gemini Ultra para casos complejos",
        "Vertex AI Search y conversational AI",
        "OpenAI GPT-4 Turbo para aplicaciones críticas",
        "Google Cloud AI Platform completo",
      ],
      deliverables: [
        "IA conversacional enterprise desplegada",
        "Búsqueda inteligente en toda la organización",
        "Automatización de 60+ procesos con IA",
        "ROI demostrado de 350%+",
      ],
      risks: ["Evolución de modelos", "Escalabilidad"],
    },
  ];

  const trainingPrograms = [
    {
      name: "Google Workspace + Gemini Básico",
      target: "Todos los empleados",
      duration: "6 horas",
      format: "E-learning + Hands-on",
      content: [
        "Google Workspace con Gemini integrado",
        "Gmail, Docs, Sheets con IA",
        "Google Meet con transcripción inteligente",
        "Mejores prácticas de prompting en Gemini",
      ],
      schedule: "Semana 1-3",
      participants: 240,
      costPerParticipant: 3800,
      totalCost: 240 * 3800,
    },
    {
      name: "ChatGPT Enterprise Avanzado",
      target: "Equipos creativos y análisis",
      duration: "8 horas",
      format: "Workshop presencial",
      content: [
        "ChatGPT Enterprise features",
        "Integración con workflows existentes",
        "Análisis de datos con GPT-4",
        "Creación de contenido profesional",
      ],
      schedule: "Mes 1-2",
      participants: 85,
      costPerParticipant: 5900,
      totalCost: 85 * 5900,
    },
    {
      name: "Google Cloud AI + Vertex AI",
      target: "Desarrolladores y Data Scientists",
      duration: "16 horas",
      format: "Certificación técnica",
      content: [
        "Vertex AI Studio y Model Garden",
        "AutoML y custom models",
        "Gemini API integration",
        "MLOps con Google Cloud",
      ],
      schedule: "Mes 2-4",
      participants: 35,
      costPerParticipant: 9000,
      totalCost: 35 * 9000,
    },
    {
      name: "Estrategia Google AI Enterprise",
      target: "Liderazgo ejecutivo",
      duration: "4 horas",
      format: "Executive briefing",
      content: [
        "Google AI roadmap y visión",
        "ROI de Google Cloud AI Platform",
        "Casos de éxito empresariales",
        "Governance y compliance en Google AI",
      ],
      schedule: "Mes 1",
      participants: 25,
      costPerParticipant: 4500,
      totalCost: 25 * 4500,
    },
  ];

  // Calculate total training investment
  const totalParticipants = trainingPrograms.reduce(
    (sum, program) => sum + program.participants,
    0
  );
  const totalTrainingInvestment = trainingPrograms.reduce(
    (sum, program) => sum + program.totalCost,
    0
  );

  const technologies = [
    {
      category: "Google Workspace + IA",
      tools: [
        {
          name: "Google Workspace con Gemini",
          priority: "Crítico",
          timeline: "Mes 1",
          cost: "$4,800/mes",
          users: 240,
          implementation: "Google Cloud Partner",
          benefits: [
            "IA nativa en todas las apps",
            "Seguridad Google",
            "Colaboración mejorada",
          ],
        },
        {
          name: "Google Cloud AI Platform",
          priority: "Crítico",
          timeline: "Mes 1",
          cost: "$2,200/mes",
          users: 120,
          implementation: "Google Cloud setup",
          benefits: [
            "Infraestructura escalable",
            "Modelos pre-entrenados",
            "Integración nativa",
          ],
        },
      ],
    },
    {
      category: "OpenAI Stack",
      tools: [
        {
          name: "ChatGPT Enterprise",
          priority: "Alto",
          timeline: "Mes 1",
          cost: "$2,550/mes",
          users: 85,
          implementation: "OpenAI Enterprise",
          benefits: ["GPT-4 unlimited", "Datos privados", "Admin controls"],
        },
        {
          name: "OpenAI API Enterprise",
          priority: "Alto",
          timeline: "Mes 2",
          cost: "$1,800/mes",
          users: 60,
          implementation: "API integration",
          benefits: ["Custom applications", "High throughput", "Fine-tuning"],
        },
      ],
    },
    {
      category: "Google AI Avanzado",
      tools: [
        {
          name: "Vertex AI Platform",
          priority: "Alto",
          timeline: "Mes 3",
          cost: "$3,200/mes",
          users: 35,
          implementation: "Google AI specialist",
          benefits: ["ML personalizado", "AutoML", "Model monitoring"],
        },
        {
          name: "Firebase + IA Extensions",
          priority: "Medio",
          timeline: "Mes 4",
          cost: "$1,400/mes",
          users: 40,
          implementation: "Firebase + Google AI",
          benefits: ["Apps inteligentes", "Real-time AI", "Scaling automático"],
        },
        {
          name: "Google AI Search",
          priority: "Medio",
          timeline: "Mes 5",
          cost: "$1,900/mes",
          users: 180,
          implementation: "Google Cloud Search",
          benefits: [
            "Búsqueda inteligente",
            "Enterprise search",
            "Insights automáticos",
          ],
        },
      ],
    },
  ];

  const successMetrics = [
    {
      category: "Adopción Google + OpenAI",
      metrics: [
        { name: "Usuarios activos Gemini", target: "95%", current: "0%" },
        { name: "Casos de uso ChatGPT", target: "150", current: "0" },
        { name: "Modelos Vertex AI desplegados", target: "8", current: "0" },
      ],
    },
    {
      category: "Productividad",
      metrics: [
        {
          name: "Ahorro tiempo Google Workspace",
          target: "6h/semana",
          current: "0",
        },
        {
          name: "Automatización con Google AI",
          target: "40 procesos",
          current: "0",
        },
        { name: "Mejora calidad contenido", target: "70%", current: "0%" },
      ],
    },
    {
      category: "ROI Google Stack",
      metrics: [
        { name: "ROI Google Cloud AI", target: "320%", current: "0%" },
        { name: "Ahorro anual total", target: "$650K", current: "$0" },
        {
          name: "Costo por usuario Google+OpenAI",
          target: "$52",
          current: "$0",
        },
      ],
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Crítico":
        return "bg-red-100 text-red-800";
      case "Alto":
        return "bg-orange-100 text-orange-800";
      case "Medio":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Helper function to format currency in Mexican pesos
  const formatPesos = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const fetchRecomendationsData = async (companyId: string) => {
    try {
      const response = await recomendationsService.getRecomendationsByCompanyId(
        companyId
      );

      console.log("Response from recommendations service:", response);

      if (!response) {
        console.error(
          "No recommendations data found for the selected company."
        );
        return;
      }

      if (response.recomendations.roadmap.roadmap_phases) {
        setRoadmapData((prevState) => ({
          ...prevState, // Mantener todas las propiedades anteriores
          roadmap_phases: response.recomendations.roadmap.roadmap_phases || [],
          training: response.recomendations.training || [],
          techStack: response.recomendations.techStack || [],
        }));
      }

      console.log("Recommendations data:", response);
    } catch (error) {
      setRoadmapData({
        roadmap_phases: [],
        training: [],
        total_budget: "",
        overall_timeline: "",
        key_risks: [],
        expected_roi: "",
        techStack: [],
      });
      console.error("Error fetching recommendations data:", error);
    }
  };

  const handleCompanyChange = async (companyId: string) => {
    setSelectedCompany(companyId);
    // Aquí podrías filtrar los datos del roadmap según la empresa seleccionada

    if (companyId !== "todas") {
      await fetchRecomendationsData(companyId);
    } else {
      // Si se selecciona "todas", reiniciar el roadmapData
      setRoadmapData({
        roadmap_phases: [],
        training: [],
        total_budget: "",
        overall_timeline: "",
        key_risks: [],
        expected_roi: "",
        techStack: [],
      });
    }
  };

  const notify = () => toast.info("Generando RoadMap AI...");

  const generateAIRoadmap = async () => {
    if (selectedCompany === "todas") {
      toast.error(
        "Por favor, selecciona una empresa específica para generar el Roadmap."
      );
      return;
    }
    notify();
    setLoadingRoadmap(true);
    try {
      const response = await recomendationsService.generateAIRoadmap(
        selectedCompany
      );
      console.log("Generated AI Roadmap:", response);
      setRoadmapData((prevState) => ({
        ...prevState,
        roadmap_phases: response.roadmap.roadmap_phases || [],
      }));
      setLoadingRoadmap(false);
      toast.success("Roadmap AI generado exitosamente.");
    } catch (error) {
      setLoadingRoadmap(false);
      console.error("Error generating AI roadmap:", error);
      // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
      toast.error(
        "No hay datos suficientes para generar el Roadmap AI. Por favor, inténtalo de nuevo."
      );
    }
  };

  const notifyTraining = () => toast.info("Generando Entrenamiento AI...");

  const generateAITraining = async () => {
    if (selectedCompany === "todas") {
      toast.error(
        "Por favor, selecciona una empresa específica para generar el entrenamiento."
      );

      return;
    }

    //validate if roadmapData.roadmap_phases is empty
    if (
      roadmapData.roadmap_phases.length === 0 ||
      !roadmapData.roadmap_phases ||
      !roadmapData.roadmap_phases.length
    ) {
      toast.error(
        "No se ha generado un RoadMap AI. Por favor, genera primero el RoadMap."
      );
      return;
    }

    notifyTraining();
    setLoadingTraining(true);
    try {
      const response = await recomendationsService.generateAITraining(
        selectedCompany
      );
      console.log("Generated AI Training:", response);
      // Aquí podrías manejar la respuesta del entrenamiento, por ejemplo, actualizando el estado
      toast.success("Entrenamiento AI generado exitosamente.");
      setRoadmapData((prevState) => ({
        ...prevState,
        training: response.training || [],
      }));
      setLoadingTraining(false);
    } catch (error) {
      console.error("Error generating AI training:", error);
      // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
      toast.error(
        "No hhay datos suficientes para generar el entrenamiento AI. Por favor, inténtalo de nuevo."
      );
      setLoadingTraining(false);
    }
  };

  const generateAITechStack = async () => {
    if (selectedCompany === "todas") {
      toast.error(
        "Por favor, selecciona una empresa específica para generar el stack tecnológico."
      );
      return;
    }

    //validate if roadmapData.training is empty
    if (roadmapData.training.length === 0 || !roadmapData.training || !roadmapData.training.length) {
      toast.error(
        "No se ha generado un entrenamiento AI. Por favor, genera primero el entrenamiento."
      );
      return;
    }

    toast.info("Generando Stack Tecnológico AI...");
    setLoadingTechStack(true);
    try {
      const response = await recomendationsService.generateTechStack(
        selectedCompany
      );
      console.log("Generated AI Tech Stack:", response);

      // Aquí podrías manejar la respuesta del stack tecnológico, por ejemplo, actualizando el estado
      setRoadmapData((prevState) => ({
        ...prevState,
        techStack: response.techStack || [],
      }));
      setLoadingTechStack(false);

      toast.success("Stack tecnológico AI generado exitosamente.");
    } catch (error) {
      setLoadingTechStack(false);
      console.error("Error generating AI tech stack:", error);
      toast.error(
        "Ocurrió un error al generar el stack tecnológico AI. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-gray-50 to-purple-100">
      <NavigationD />
      <ToastContainer />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Roadmap Estratégico Google AI + OpenAI
          </h1>
          <p className="text-gray-600 text-lg">
            Plan de implementación especializado en el ecosistema Google y
            OpenAI para tu organización
          </p>
        </div>

        {/* Filtro por empresa */}
        <Card className="mb-6 bg-white shadow-md rounded-lg">
          <CardContent className="p-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Filrar Recomendaciones por Empresa:
              </label>
              <Select
                value={selectedCompany}
                onValueChange={handleCompanyChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar empresa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">
                    📊 Selecione una empresa
                  </SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company._id} value={company._id}>
                      🏢 {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="roadmap" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="roadmap">Roadmap Google AI</TabsTrigger>
            <TabsTrigger value="training">Entrenamiento</TabsTrigger>
            <TabsTrigger value="technology">Stack Tecnológico</TabsTrigger>
            <TabsTrigger value="metrics">Métricas</TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap" className="space-y-6">
            {selectedCompany !== "todas" && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-purple-800 mb-3">
                  🚀 Estrategia Google + OpenAI
                </h2>
                <p className="text-gray-700">
                  Implementación progresiva comenzando con Google Workspace +
                  Gemini y ChatGPT Enterprise, escalando hacia Vertex AI y
                  soluciones avanzadas de Google Cloud AI Platform.
                </p>
              </div>
            )}
            {selectedCompany !== "todas" && !loadingRoadmap && (
              <Button style={{ width: "100%" }} onClick={generateAIRoadmap}>
                {roadmapData?.roadmap_phases?.length > 0
                  ? "🔁 Regenerar RoadMap AI"
                  : "⚙️ Generar RoadMap AI"}
              </Button>
            )}

            {loadingRoadmap && (
              <div className="flex justify-center items-center py-6">
                <Spinner message="Generando RoadMap AI..." />
              </div>
            )}
            {!loadingRoadmap && (
              <div className="grid gap-6">
                {roadmapData.roadmap_phases.map((phase, index) => (
                  <Card
                    key={index}
                    className="relative overflow-hidden border-l-4 border-l-purple-500"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2 text-purple-800">
                            {phase.phase}
                          </CardTitle>
                          <div className="flex items-center gap-4">
                            <Badge
                              variant="outline"
                              className="border-purple-300"
                            >
                              {phase.duration}
                            </Badge>
                            <Badge className="bg-purple-100 text-purple-800">
                              {phase.status}
                            </Badge>
                            <span className="text-lg font-semibold text-purple-600">
                              {phase.budget}
                            </span>
                          </div>
                        </div>
                        <Progress value={phase.progress} className="w-32" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            Objetivos Clave
                          </h4>
                          <ul className="space-y-2">
                            {phase.objectives.map((objective, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-600 flex items-start gap-2"
                              >
                                <span className="text-blue-500 mt-1">•</span>
                                {objective}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <BarChart className="h-4 w-4" />
                            Entregables
                          </h4>
                          <ul className="space-y-2">
                            {phase.deliverables.map((deliverable, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-600 flex items-start gap-2"
                              >
                                <span className="text-green-500 mt-1">✓</span>
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2">
                          Riesgos Identificados
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {phase.risks.map((risk, idx) => (
                            <Badge
                              key={idx}
                              className="bg-orange-100 text-orange-700"
                            >
                              {risk}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {roadmapData.roadmap_phases.length == 0 &&
              !loadingRoadmap &&
              selectedCompany !== "todas" && (
                <div className="text-center text-gray-500">
                  No se han generado un RoadMap para la empresa seleccionada.
                </div>
              )}
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            {selectedCompany !== "todas" && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-6">
                <h2 className="text-2xl font-bold text-purple-800 mb-3">
                  📚 Programa de Entrenamiento Google AI
                </h2>
                <p className="text-gray-700">
                  Capacitación especializada en herramientas Google y OpenAI,
                  desde básico hasta avanzado.
                  <br />
                  <span className="font-semibold text-purple-800">
                    Tarifas segmentadas por duración: 6h - {formatPesos(3800)},
                    8h - {formatPesos(5900)}, 16h - {formatPesos(9000)}, 4h -{" "}
                    {formatPesos(4500)}
                  </span>
                </p>
              </div>
            )}

            {selectedCompany !== "todas" && !loadingTraining && (
              <Button style={{ width: "100%" }} onClick={generateAITraining}>
                {roadmapData?.training?.length > 0
                  ? "🔁 Regenerar Training AI en base al RoadMap "
                  : "⚙️ Generar Training AI en base al RoadMap"}
              </Button>
            )}
            {loadingTraining && (
              <div className="flex justify-center items-center py-6">
                <Spinner message="Generando Entrenamiento AI..." />
              </div>
            )}

            {!loadingTraining && 
              roadmapData?.training?.length > 0 &&
            (
              <div className="grid gap-6">
                {roadmapData.training.map((program, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2 text-blue-800">
                            {program.name}
                          </CardTitle>
                          <div className="flex items-center gap-4">
                            <Badge
                              variant="outline"
                              className="border-blue-300"
                            >
                              {program.target}
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-800">
                              {program.duration}
                            </Badge>
                            <Badge className="bg-green-100 text-green-800">
                              {program.format}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-600">
                            {program.participants}
                          </div>
                          <div className="text-sm text-gray-500">
                            participantes
                          </div>
                          <div className="text-lg font-semibold text-green-600 mt-1">
                            {formatPesos(program.totalCost)}
                          </div>
                          <div className="text-xs text-gray-500">
                            ({formatPesos(program.costPerParticipant)} c/u)
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Contenido del Programa
                          </h4>
                          <ul className="space-y-2">
                            {program.content.map((item, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-600 flex items-start gap-2"
                              >
                                <span className="text-blue-500 mt-1">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Cronograma
                          </h4>
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <span className="text-blue-800 font-semibold">
                              {program.schedule}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {roadmapData?.training?.length > 0 && !loadingTraining && (
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800">
                    Resumen del Programa Google AI + OpenAI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {totalParticipants}
                      </div>
                      <div className="text-gray-600">Total Participantes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        34h
                      </div>
                      <div className="text-gray-600">
                        Horas de Entrenamiento
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {formatPesos(totalTrainingInvestment)}
                      </div>
                      <div className="text-gray-600">Inversión Total</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Tarifas segmentadas por duración
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {roadmapData.training.length == 0 &&
              !loadingTraining &&
              selectedCompany !== "todas" && (
                <div className="text-center text-gray-500">
                  No se han generado programas de entrenamiento AI para la
                  empresa seleccionada.
                </div>
              )}
          </TabsContent>

          <TabsContent value="technology" className="space-y-6">
            {selectedCompany !== "todas" && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-6">
                <h2 className="text-2xl font-bold text-purple-800 mb-3">
                  🔧 Stack Tecnológico Google + OpenAI
                </h2>
                <p className="text-gray-700">
                  Herramientas especializadas del ecosistema Google Cloud AI y
                  OpenAI Enterprise.
                </p>
              </div>
            )}

            {selectedCompany !== "todas" && !loadingTechStack && (
              <Button style={{ width: "100%" }} onClick={generateAITechStack}>
                {roadmapData?.techStack?.length > 0
                  ? "🔁 Regenerar Tech Stack"
                  : "⚙️ Generar Tech Stack"}
              </Button>
            )}

            {loadingTechStack && (
              <div className="flex justify-center items-center py-6">
                <Spinner message="Generando Stack Tecnológico AI..." />
              </div>
            )}

            {!loadingTechStack &&  roadmapData?.techStack?.length > 0 && (
              <div className="grid gap-6">
                {roadmapData.techStack.map((category) => (
                  <Card
                    key={category.category}
                    className="border-l-4 border-l-purple-500"
                  >
                    <CardHeader>
                      <CardTitle className="text-purple-800">
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.tools.map((tool, index) => (
                          <div
                            key={index}
                            className="p-4 border border-purple-200 rounded-lg bg-purple-50/30"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="font-semibold text-lg mb-2">
                                  {tool.name}
                                </h4>
                                <div className="flex items-center gap-3">
                                  <Badge
                                    className={getPriorityColor(tool.priority)}
                                  >
                                    {tool.priority}
                                  </Badge>
                                  <Badge variant="outline">
                                    {tool.timeline}
                                  </Badge>
                                  <span className="text-sm text-gray-600">
                                    {tool.users} usuarios
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-green-600">
                                  {tool.cost}
                                </div>
                                <div className="text-sm text-gray-500">
                                  costo mensual
                                </div>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h5 className="font-medium mb-2">
                                  Implementación:
                                </h5>
                                <p className="text-sm text-gray-600">
                                  {tool.implementation}
                                </p>
                              </div>
                              <div>
                                <h5 className="font-medium mb-2">
                                  Beneficios clave:
                                </h5>
                                <div className="flex flex-wrap gap-1">
                                  {tool.benefits.map((benefit, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {benefit}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {roadmapData.techStack.length == 0 &&
              !loadingTechStack &&
              selectedCompany !== "todas" && (
                <div className="text-center text-gray-500">
                  No se ha generado un stack tecnológico AI.
                </div>
              )}

            {selectedCompany !== "todas" &&  !loadingTechStack &&
              roadmapData.techStack.length > 0 && (
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-800">
                      Costo Total del Stack Google + OpenAI
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold mb-4 text-purple-800">
                          Costos Mensuales por Categoría
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span>Google Workspace + IA:</span>
                            <span className="font-semibold text-purple-600">
                              $7,000/mes
                            </span>
                          </li>
                          <li className="flex justify-between">
                            <span>OpenAI Enterprise:</span>
                            <span className="font-semibold text-blue-600">
                              $4,350/mes
                            </span>
                          </li>
                          <li className="flex justify-between">
                            <span>Google Cloud AI avanzado:</span>
                            <span className="font-semibold text-green-600">
                              $6,500/mes
                            </span>
                          </li>
                          <li className="flex justify-between border-t pt-2">
                            <span className="font-bold">Total mensual:</span>
                            <span className="font-bold text-purple-800">
                              $17,850/mes
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-4 text-purple-800">
                          Beneficios del Stack
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>
                            • Integración nativa entre todas las herramientas
                            Google
                          </li>
                          <li>
                            • Seguridad y compliance enterprise de Google Cloud
                          </li>
                          <li>• Modelos más avanzados de OpenAI</li>
                          <li>• Escalabilidad automática en Google Cloud</li>
                          <li>• Soporte técnico especializado</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            {selectedCompany != "todas" && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-6">
                <h2 className="text-2xl font-bold text-purple-800 mb-3">
                  📊 Métricas de Éxito Google AI
                </h2>
                <p className="text-gray-700">
                  KPIs específicos para medir el éxito de la implementación del
                  stack Google + OpenAI.
                </p>
              </div>
            )}{" "}
            {selectedCompany != "todas" && (
              <div className="grid gap-6">
                {successMetrics.map((category) => (
                  <Card
                    key={category.category}
                    className="border-l-4 border-l-purple-500"
                  >
                    <CardHeader>
                      <CardTitle className="text-purple-800">
                        Métricas de {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.metrics.map((metric, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-4 border rounded-lg"
                          >
                            <div>
                              <h4 className="font-semibold">{metric.name}</h4>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-sm text-gray-500">
                                  Actual: {metric.current}
                                </span>
                                <span className="text-sm text-green-600 font-medium">
                                  Meta: {metric.target}
                                </span>
                              </div>
                            </div>
                            <Progress value={0} className="w-32" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {selectedCompany != "todas" && (
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">
                    Proyección de Impacto Google AI + OpenAI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-4 text-green-800">
                        Beneficios Cuantitativos (12 meses)
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span>Ahorro Google Workspace + IA:</span>
                          <span className="font-semibold text-green-600">
                            $320,000
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>Productividad con ChatGPT:</span>
                          <span className="font-semibold text-green-600">
                            $180,000
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>Eficiencia Vertex AI:</span>
                          <span className="font-semibold text-green-600">
                            $150,000
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>ROI stack completo:</span>
                          <span className="font-semibold text-green-600">
                            350%
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4 text-green-800">
                        Beneficios Estratégicos
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>
                          • Ecosistema integrado Google para máxima eficiencia
                        </li>
                        <li>
                          • Acceso a los modelos más avanzados (Gemini Ultra +
                          GPT-4)
                        </li>
                        <li>• Capacidades de ML personalizado con Vertex AI</li>
                        <li>• Infraestructura enterprise con Google Cloud</li>
                        <li>• Ventaja competitiva en adopción de IA</li>
                        <li>
                          • Preparación para futuras innovaciones Google AI
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {selectedCompany == "todas" && (
          <Card className=" mx-auto mb-8 text-center">
            <CardContent className="pt-6">
              <p className="text-gray-600">
                Seleccione una empresa para ver sus recomendaciones específicas.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Si no hay recomendaciones disponibles, considere generar un
                nuevo RoadMap AI.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RecommendationsD;
