import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavigationD from "@/components/NavigationD";
import { getAnswerText } from "../utils/surveyMaps";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import FullSpinner from "@/components/FullSpinner";
import {
  User,
  Building,
  Clock,
  Brain,
  Target,
  Lightbulb,
  Settings,
  GraduationCap,
} from "lucide-react";
import { companyService } from "@/services/companyService";

const Responses = () => {
  const [surveyData, setSurveyData] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState("todas");
  const [companies, setCompanies] = useState<any[]>([]);
  const [globalLoading, setGlobalLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setGlobalLoading(true);
      const companiesData = await companyService.getAllCompanies();

      if (companiesData) {
        setCompanies(companiesData);
      }
      setGlobalLoading(false);
    };

    fetchData();
  }, []);

  const fetchSurveyData = async (companyId: string) => {
    try {
      setGlobalLoading(true);
      const response = await companyService.getCompanyById(companyId);
      if (response && response.surveys) {
        setSurveyData(response.surveys);
      }
      setGlobalLoading(false);
    } catch (error) {
      setGlobalLoading(false);
      console.error("Error fetching survey data:", error);
      setSurveyData([]);
    }
  };

  const handleCompanyChange = async (companyId: string) => {
    setSelectedCompany(companyId);
    if (companyId !== "todas") {
      await fetchSurveyData(companyId);
    } else {
      setSurveyData([]);
    }
  };

  if (companies.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <NavigationD />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="pt-6">
              <p className="text-gray-600">
                No se encontraron respuestas de empresas.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Genere un enlace de cuestionario para comenzar a recopilar
                respuestas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <NavigationD />
      {globalLoading && <FullSpinner message="Cargando..." />}

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Respuestas del Cuestionario
          </h1>
          <p className="text-gray-600">
            Revisión detallada de todas las respuestas proporcionadas
          </p>
        </div>

        <CardContent className="max-w-6xl mx-auto mb-8" style={{ padding: "0px" }}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Filtrar por empresa / Encuesta General:
            </label>

            <Select value={selectedCompany} onValueChange={handleCompanyChange}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar empresa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">
                  📊 Selecciona Una Empresa o Encuesta
                </SelectItem>
                {(companies ?? []).map((company) => (
                  <SelectItem key={company._id} value={company._id}>
                    🏢 {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        {selectedCompany === "todas" && (
          <Card className="max-w-6xl mx-auto mb-8 text-center">
            <CardContent className="pt-6">
              <p className="text-gray-600">
                Seleccione una empresa para ver sus respuestas específicas.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                O explore las respuestas generales disponibles.
              </p>
            </CardContent>
          </Card>
        )}

        {surveyData.length === 0 && selectedCompany !== "todas" && (
          <Card className="max-w-6xl mx-auto mb-8 text-center">
            <CardContent className="pt-6">
              <p className="text-gray-600">
                No se encontraron respuestas para la empresa o encuesta seleccionada.
              </p>
            </CardContent>
          </Card>
        )}

        {selectedCompany !== "todas" && surveyData.length > 0 && (
          <Tabs defaultValue="personal" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
              <TabsTrigger value="personal" className="text-xs">
                Personal
              </TabsTrigger>
              <TabsTrigger value="tareas" className="text-xs">
                Tareas
              </TabsTrigger>
              <TabsTrigger value="viabilidad" className="text-xs">
                Viabilidad
              </TabsTrigger>
              <TabsTrigger value="actitud" className="text-xs">
                Actitud
              </TabsTrigger>
              <TabsTrigger value="conocimiento" className="text-xs">
                Conocimiento
              </TabsTrigger>
              <TabsTrigger value="gobierno" className="text-xs">
                Gobierno
              </TabsTrigger>
              <TabsTrigger value="impacto" className="text-xs">
                Impacto
              </TabsTrigger>
              <TabsTrigger value="adopcion" className="text-xs">
                Adopción
              </TabsTrigger>
            </TabsList>

            {surveyData.map((survey, index) => (
              <>
                <TabsContent key={`personal-${index}`} value="personal">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-purple-600" />
                        Información Personal
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-gray-700">Nombre:</p>
                          <p className="text-gray-600">{survey.name || "No especificado"}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">Email:</p>
                          <p className="text-gray-600">{survey.email || "No especificado"}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">Departamento:</p>
                          <Badge variant="outline">{survey.department || "No especificado"}</Badge>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">Puesto:</p>
                          <p className="text-gray-600">{survey.role || "No especificado"}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">Experiencia en puesto:</p>
                          <Badge>
                            {getAnswerText("experience", survey.experience) || "No especificado"}
                          </Badge>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">Experiencia profesional:</p>
                          <Badge>
                            {getAnswerText("totalExperience", survey.totalExperience) || "No especificado"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent key={`tareas-${index}`} value="tareas">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-purple-600" />
                        Inventario de Tareas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Tareas Principales:</h3>
                        <div className="space-y-3">
                          {survey.mainTasks?.map(
                            (task: string, taskIndex: number) =>
                              task && (
                                <div key={taskIndex} className="p-3 bg-gray-50 rounded-lg">
                                  <p className="font-medium text-purple-700">
                                    Tarea {taskIndex + 1}:
                                  </p>
                                  <p className="text-gray-700">{task}</p>
                                </div>
                              )
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-3">Aplicaciones Utilizadas:</h3>
                        <div className="flex flex-wrap gap-2">
                          {survey.applicationsUsed?.map((app: string, appIndex: number) => (
                            <Badge key={appIndex} variant="secondary">
                              {app}
                            </Badge>
                          ))}
                          {survey.otherToolText && (
                            <Badge variant="secondary">{survey.otherToolText}</Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent key={`viabilidad-${index}`} value="viabilidad">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-purple-600" />
                        Viabilidad de Automatización
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {survey.taskDetails?.map(
                          (task: any, taskIndex: number) =>
                            survey.mainTasks?.[taskIndex] && (
                              <div key={taskIndex} className="border rounded-lg p-4 bg-gray-50">
                                <h3 className="font-semibold text-lg mb-3">
                                  Tarea {taskIndex + 1}:{" "}
                                  {survey.mainTasks[taskIndex]?.substring(0, 50)}
                                  {survey.mainTasks[taskIndex]?.length > 50 ? "..." : ""}
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="font-medium text-gray-700">Frecuencia:</p>
                                    <Badge>
                                      {getAnswerText("frequency", task.frequency) || "No especificado"}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-700">Nivel de estructuración:</p>
                                    <Badge>
                                      {getAnswerText("structureLevel", task.structureLevel) || "No especificado"}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-700">Impacto:</p>
                                    <Badge>
                                      {getAnswerText("impact", task.impact) || "No especificado"}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-700">Disponibilidad de datos:</p>
                                    <Badge>
                                      {getAnswerText("dataAvailability", task.dataAvailability) || "No especificado"}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-700">KPI impactado:</p>
                                    <Badge>
                                      {getAnswerText("kpiImpact", task.kpiImpact) || "No especificado"}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-700">Severidad:</p>
                                    <Badge>
                                      {getAnswerText("severityImpact", task.severityImpact) || "No especificado"}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent key={`actitud-${index}`} value="actitud">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-purple-600" />
                        Actitud Cultural
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-700">Curiosidad:</p>
                        <p className="text-gray-600">
                          {getAnswerText("aiCuriosity", survey.aiCuriosity) || "No especificado"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Cautela:</p>
                        <p className="text-gray-600">
                          {getAnswerText("aiCaution", survey.aiCaution) || "No especificado"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Resistencia:</p>
                        <p className="text-gray-600">
                          {getAnswerText("aiResistance", survey.aiResistance) || "No especificado"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent key={`conocimiento-${index}`} value="conocimiento">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-purple-600" />
                        Conocimiento en IA
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-700">Conceptos básicos:</p>
                        <p className="text-gray-600">
                          {getAnswerText("aiBasicKnowledge", survey.aiBasicKnowledge) || "No especificado"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Diseño de prompts:</p>
                        <p className="text-gray-600">
                          {getAnswerText("aiKnowledgePromptDesign", survey.aiKnowledgePromptDesign) || "No especificado"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Integración en flujos:</p>
                        <p className="text-gray-600">
                          {getAnswerText("aiKnowledgeIntegration", survey.aiKnowledgeIntegration) || "No especificado"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Evaluación de riesgo:</p>
                        <p className="text-gray-600">
                          {getAnswerText("aiKnowledgeRiskAssessment", survey.aiKnowledgeRiskAssessment) || "No especificado"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Frecuencia de uso:</p>
                        <p className="text-gray-600">
                          {getAnswerText("aiKnowledgeUsageFrequency", survey.aiKnowledgeUsageFrequency) || "No especificado"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Herramientas utilizadas:</p>
                        <div className="flex flex-wrap gap-2">
                          {survey.toolsUsed?.map((tool: string, toolIndex: number) => (
                            <Badge key={toolIndex} variant="outline">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent key={`gobierno-${index}`} value="gobierno">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-purple-600" />
                        Gobierno y Ética
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-700">Política de IA responsable:</p>
                        <p className="text-gray-600">
                          {getAnswerText("aiPolicy", survey.aiPolicy) || "No especificado"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Gobierno de datos:</p>
                        <p className="text-gray-600">
                          {getAnswerText("aiDataGovernance", survey.aiDataGovernance) || "No especificado"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Seguridad y privacidad:</p>
                        <p className="text-gray-600">
                          {getAnswerText("aiSecurityPrivacy", survey.aiSecurityPrivacy) || "No especificado"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent key={`impacto-${index}`} value="impacto">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-purple-600" />
                        Evaluación de Impacto
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {survey.taskDetails?.map(
                          (task: any, taskIndex: number) =>
                            survey.mainTasks?.[taskIndex] && (
                              <div key={taskIndex} className="border rounded-lg p-4 bg-gray-50">
                                <h3 className="font-semibold text-lg mb-3">
                                  Tarea {taskIndex + 1}:{" "}
                                  {survey.mainTasks[taskIndex]?.substring(0, 50)}
                                  {survey.mainTasks[taskIndex]?.length > 50 ? "..." : ""}
                                </h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                  <div>
                                    <p className="font-medium text-gray-700">Prioridad:</p>
                                    <Badge>
                                      {getAnswerText("automationPriority", task.automationPriority) || "No especificado"}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-700">Tiempo ahorrado:</p>
                                    <Badge>
                                      {getAnswerText("timeSaved", task.timeSaved) || "No especificado"}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-700">Complejidad:</p>
                                    <Badge>
                                      {getAnswerText("implementationComplexity", task.implementationComplexity) || "No especificado"}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent key={`adopcion-${index}`} value="adopcion">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-purple-600" />
                        Roadmap de Adopción
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-700">Tiempo disponible:</p>
                        <p className="text-gray-600">
                          {getAnswerText("trainingTime", survey.trainingTime) || "No especificado"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Formatos de entrenamiento:</p>
                        <div className="flex flex-wrap gap-2">
                          {survey.trainingFormats?.map((format: string, formatIndex: number) => (
                            <Badge key={formatIndex} variant="outline">
                              {format}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Motivación:</p>
                        <p className="text-gray-600">
                          {getAnswerText("AI_learning_motivation", survey.AI_learning_motivation) || "No especificado"}
                          {survey.AI_learning_motivation_other && ` (${survey.AI_learning_motivation_other})`}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Apoyo del líder:</p>
                        <p className="text-gray-600">
                          {getAnswerText("AI_learning_leader_support", survey.AI_learning_leader_support) || "No especificado"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            ))}
          </Tabs>
        )}

        <Toaster />
      </div>
    </div>
  );
};

export default Responses;