import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavigationD from "@/components/NavigationD";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
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

import { companyService } from "@/services/companyService"; // Asegúrate de que este servicio esté configurado correctamente

const Responses = () => {
  const [surveyData, setSurveyData] = useState<any>([]);
  const [selectedCompany, setSelectedCompany] = useState("todas");
  const [companies, setCompanies] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const companiesData = await companyService.getAllCompanies();

      if (companiesData) {
        setCompanies(companiesData);
      }
    };

    fetchData();
  }, []);

  const fetchSurveyData = async (companyId: string) => {
    try {
      const response = await companyService.getCompanyById(companyId);
      if (response && response.surveys) {
        setSurveyData(response.surveys);
      }
    } catch (error) {
      console.error("Error fetching survey data:", error);
      setSurveyData([]);
    }
  };

  const handleCompanyChange = async (companyId: string) => {
    setSelectedCompany(companyId);
    if (companyId !== "todas") {
      await fetchSurveyData(companyId);
    } else {
      setSurveyData([]); // clear data if "todas" is selected
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

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Respuestas del Cuestionario
          </h1>
          <p className="text-gray-600">
            Revisión detallada de todas las respuestas proporcionadas
          </p>
        </div>

        <CardContent
          className="max-w-6xl mx-auto mb-8"
          style={{ padding: "0px" }}
        >
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

        {selectedCompany == "todas"  && (
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

        {
          surveyData.length  == 0 && selectedCompany !== "todas" &&(
            <Card className="max-w-6xl mx-auto mb-8 text-center">
            <CardContent className="pt-6">
              <p className="text-gray-600">
                No se encontraron respuestas para la empresa o encuesta seleccionada.
              </p>
        
            </CardContent>
          </Card>  
          )
        }

        {selectedCompany !== "todas" &&  surveyData.length > 0 && (
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
              <TabsTrigger value="adicional" className="text-xs">
                Adicional
              </TabsTrigger>
              <TabsTrigger value="ia" className="text-xs">
                IA
              </TabsTrigger>
              <TabsTrigger value="casos" className="text-xs">
                Casos
              </TabsTrigger>
              <TabsTrigger value="impacto" className="text-xs">
                Impacto
              </TabsTrigger>
              <TabsTrigger value="adopcion" className="text-xs">
                Adopción
              </TabsTrigger>
            </TabsList>
            {surveyData.map((surveyData: any) => (
              <TabsContent value="personal">
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
                        <p className="text-gray-600">
                          {surveyData.name || "No especificado"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Email:</p>
                        <p className="text-gray-600">
                          {surveyData.email || "No especificado"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">
                          Departamento:
                        </p>
                        <Badge variant="outline">
                          {surveyData.department || "No especificado"}
                        </Badge>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Puesto:</p>
                        <p className="text-gray-600">
                          {surveyData.role || "No especificado"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">
                          Experiencia:
                        </p>
                        <Badge>
                          {surveyData.experience || "No especificado"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}

            {}

            {surveyData.map((surveyData: any) => (
              <TabsContent value="tareas">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-purple-600" />
                      Inventario de Tareas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">
                        Tareas Principales:
                      </h3>
                      <div className="space-y-3">
                        {surveyData.mainTasks?.map(
                          (task: string, index: number) =>
                            task && (
                              <div
                                key={index}
                                className="p-3 bg-gray-50 rounded-lg"
                              >
                                <p className="font-medium text-purple-700">
                                  Tarea {index + 1}:
                                </p>
                                <p className="text-gray-700">{task}</p>
                              </div>
                            )
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">
                        Aplicaciones Utilizadas:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {surveyData.applicationsUsed?.map(
                          (app: string, index: number) => (
                            <Badge key={index} variant="secondary">
                              {app}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}

            {surveyData.map((surveyData: any) => (
              <TabsContent value="viabilidad">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-600" />
                      Viabilidad de Automatización
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {surveyData.taskDetails?.map(
                        (task: any, index: number) =>
                          surveyData.mainTasks[index] && (
                            <div
                              key={index}
                              className="border rounded-lg p-4 bg-gray-50"
                            >
                              <h3 className="font-semibold text-lg mb-3">
                                Tarea {index + 1}:{" "}
                                {surveyData.mainTasks[index]?.substring(0, 50)}
                                ...
                              </h3>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <p className="font-medium text-gray-700">
                                    Frecuencia:
                                  </p>
                                  <Badge
                                    variant={
                                      task.frequency === "diaria"
                                        ? "default"
                                        : "secondary"
                                    }
                                  >
                                    {task.frequency || "No especificado"}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-700">
                                    Nivel de estructuración:
                                  </p>
                                  <Badge
                                    variant={
                                      task.structureLevel === "muy-estructurada"
                                        ? "default"
                                        : "secondary"
                                    }
                                  >
                                    {task.structureLevel || "No especificado"}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-700">
                                    Impacto:
                                  </p>
                                  <Badge
                                    variant={
                                      task.impact === "alto"
                                        ? "default"
                                        : "secondary"
                                    }
                                  >
                                    {task.impact || "No especificado"}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-700">
                                    Disponibilidad de datos:
                                  </p>
                                  <Badge
                                    variant={
                                      task.dataAvailability === "si"
                                        ? "default"
                                        : "secondary"
                                    }
                                  >
                                    {task.dataAvailability || "No especificado"}
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
            ))}

            {surveyData.map((surveyData: any) => (
              <TabsContent value="adicional">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-purple-600" />
                      Tareas Adicionales
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold text-gray-700 mb-2">
                        Tareas diarias importantes:
                      </p>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {surveyData.dailyTasks || "No especificado"}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 mb-2">
                        Tareas que consumen más tiempo:
                      </p>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {surveyData.timeConsumingTasks || "No especificado"}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 mb-2">
                        Tareas repetitivas:
                      </p>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {surveyData.repetitiveTasks || "No especificado"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}

            {surveyData.map((surveyData: any) => (
              <TabsContent value="ia">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      Conocimiento en IA
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold text-gray-700 mb-2">
                        Nivel de conocimiento:
                      </p>
                      <Badge variant="default" className="text-lg px-4 py-2">
                        {surveyData.aiKnowledge || "No especificado"}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 mb-2">
                        Herramientas utilizadas:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {surveyData.toolsUsed?.map(
                          (tool: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {tool}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}

            {surveyData.map((surveyData: any) => (
              <TabsContent value="casos">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-purple-600" />
                      Casos de Uso Específicos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">
                        📄 Documentación
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {surveyData.documentTasks?.map(
                          (task: string, index: number) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {task}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3">
                        💬 Comunicación
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {surveyData.communicationTasks?.map(
                          (task: string, index: number) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {task}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3">
                        📊 Análisis
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {surveyData.analysisTasks?.map(
                          (task: string, index: number) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {task}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3">
                        🎨 Creatividad
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {surveyData.creativeTasks?.map(
                          (task: string, index: number) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {task}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}

            {surveyData.map((surveyData: any) => (
              <TabsContent value="impacto">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-purple-600" />
                      Evaluación de Impacto
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="font-semibold text-gray-700 mb-2">
                          Prioridad
                        </p>
                        <Badge variant="default" className="text-lg px-4 py-2">
                          {surveyData.taskPriority || "No especificado"}
                        </Badge>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="font-semibold text-gray-700 mb-2">
                          Tiempo ahorrado
                        </p>
                        <Badge variant="default" className="text-lg px-4 py-2">
                          {surveyData.automationBenefit || "No especificado"}
                        </Badge>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="font-semibold text-gray-700 mb-2">
                          Complejidad
                        </p>
                        <Badge variant="default" className="text-lg px-4 py-2">
                          {surveyData.implementationComplexity ||
                            "No especificado"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
            {surveyData.map((surveyData: any) => (
              <TabsContent value="adopcion">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-purple-600" />
                      Roadmap de Adopción
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold text-gray-700 mb-2">
                        Tiempo disponible para formación:
                      </p>
                      <Badge variant="default" className="text-lg px-4 py-2">
                        {surveyData.trainingTime || "No especificado"}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 mb-3">
                        Formatos de entrenamiento preferidos:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {surveyData.trainingFormats?.map(
                          (format: string, index: number) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-sm"
                            >
                              {format}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        )}

        <Toaster />
      </div>
    </div>
  );
};

export default Responses;
