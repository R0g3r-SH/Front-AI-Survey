import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts";
import NavigationD from "@/components/NavigationD";
import { analysisService } from "@/services/analisysService";
import { companyService } from "@/services/companyService";
import { report } from "process";

const AnalysisD = () => {
  const [selectedCluster, setSelectedCluster] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [clusters, setClusters] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("todas");
  const [analysisData, setAnalysisData] = useState({
    clusters: [],
    departments: [],
    useCases: [],
    technologyStack: [],
    report: {
      main_recommendation: "",
      expected_impact: "",
    },
  });
  const [loadingRecommendations, setLodingRecommendations] = useState(false);

  // Datos de clusters identificados
  // const clusters = [
  //   {
  //     id: "content-creators",
  //     name: "Creadores de Contenido",
  //     description: "Usuarios que crean documentos, presentaciones y materiales de comunicación",
  //     size: 45,
  //     departments: ["Marketing", "RRHH", "Ventas"],
  //     mainTasks: ["Redacción", "Diseño", "Presentaciones"],
  //     recommendedTools: ["ChatGPT", "Canva AI", "Gamma"],
  //     priority: "Alta",
  //     roi: "280%"
  //   },
  //   {
  //     id: "data-analysts",
  //     name: "Analistas de Datos",
  //     description: "Profesionales que trabajan con análisis de información y reportes",
  //     size: 38,
  //     departments: ["Finanzas", "IT", "Operaciones"],
  //     mainTasks: ["Análisis", "Reportes", "Dashboards"],
  //     recommendedTools: ["Microsoft Copilot", "Tableau AI", "Power BI"],
  //     priority: "Alta",
  //     roi: "420%"
  //   },
  //   {
  //     id: "communicators",
  //     name: "Comunicadores",
  //     description: "Roles enfocados en comunicación interna y externa",
  //     size: 32,
  //     departments: ["RRHH", "Marketing", "Atención al Cliente"],
  //     mainTasks: ["Emails", "Social Media", "Atención al Cliente"],
  //     recommendedTools: ["Jasper", "Zendesk AI", "HubSpot AI"],
  //     priority: "Media",
  //     roi: "190%"
  //   },
  //   {
  //     id: "process-optimizers",
  //     name: "Optimizadores de Procesos",
  //     description: "Usuarios que buscan automatizar procesos operativos",
  //     size: 28,
  //     departments: ["Operaciones", "Legal", "Compras"],
  //     mainTasks: ["Automatización", "Workflows", "Documentación"],
  //     recommendedTools: ["Zapier", "Power Automate", "UiPath"],
  //     priority: "Media",
  //     roi: "350%"
  //   }
  // ];

  // Casos de uso específicos por cluster
  const useCases = {
    "content-creators": [
      {
        name: "Generación de contenido para redes sociales",
        impact: 85,
        effort: 25,
        users: 15,
      },
      {
        name: "Creación de presentaciones automáticas",
        impact: 90,
        effort: 40,
        users: 25,
      },
      {
        name: "Redacción de emails marketing",
        impact: 75,
        effort: 20,
        users: 18,
      },
      {
        name: "Diseño de materiales gráficos",
        impact: 80,
        effort: 35,
        users: 12,
      },
    ],
    "data-analysts": [
      {
        name: "Automatización de reportes financieros",
        impact: 95,
        effort: 60,
        users: 20,
      },
      {
        name: "Análisis predictivo de ventas",
        impact: 90,
        effort: 70,
        users: 15,
      },
      { name: "Dashboards inteligentes", impact: 85, effort: 45, users: 25 },
      {
        name: "Limpieza automática de datos",
        impact: 80,
        effort: 50,
        users: 18,
      },
    ],
    communicators: [
      {
        name: "Respuestas automáticas de soporte",
        impact: 85,
        effort: 30,
        users: 22,
      },
      {
        name: "Personalización de newsletters",
        impact: 70,
        effort: 25,
        users: 16,
      },
      { name: "Moderación de contenido", impact: 75, effort: 40, users: 12 },
      { name: "Traducción automática", impact: 80, effort: 20, users: 28 },
    ],
    "process-optimizers": [
      {
        name: "Automatización de aprovaciones",
        impact: 90,
        effort: 55,
        users: 20,
      },
      { name: "Procesamiento de facturas", impact: 95, effort: 65, users: 15 },
      { name: "Gestión de inventarios", impact: 85, effort: 50, users: 18 },
      { name: "Onboarding automatizado", impact: 80, effort: 45, users: 12 },
    ],
  };

  const technologyStack = [
    {
      category: "Generative AI Platforms",
      tools: [
        {
          name: "ChatGPT Enterprise",
          users: 85,
          cost: "$20/user/month",
          clusters: ["content-creators", "communicators"],
        },
        {
          name: "Microsoft Copilot 365",
          users: 120,
          cost: "$30/user/month",
          clusters: ["data-analysts", "content-creators"],
        },
        {
          name: "Google Bard Enterprise",
          users: 45,
          cost: "$25/user/month",
          clusters: ["all"],
        },
      ],
    },
    {
      category: "Automation Tools",
      tools: [
        {
          name: "Power Automate",
          users: 60,
          cost: "$15/user/month",
          clusters: ["process-optimizers"],
        },
        {
          name: "Zapier Enterprise",
          users: 40,
          cost: "$50/month",
          clusters: ["process-optimizers"],
        },
        {
          name: "UiPath",
          users: 25,
          cost: "$420/user/month",
          clusters: ["process-optimizers"],
        },
      ],
    },
    {
      category: "Specialized AI Tools",
      tools: [
        {
          name: "Jasper",
          users: 35,
          cost: "$40/user/month",
          clusters: ["content-creators"],
        },
        {
          name: "Tableau AI",
          users: 28,
          cost: "$75/user/month",
          clusters: ["data-analysts"],
        },
        {
          name: "Canva AI",
          users: 55,
          cost: "$15/user/month",
          clusters: ["content-creators"],
        },
      ],
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-800";
      case "Media":
        return "bg-yellow-100 text-yellow-800";
      case "Baja":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const companiesData = await companyService.getAllCompanies();
        setCompanies(companiesData);
      } catch (error) {
        console.error("Error fetching clusters:", error);
      }
    };

    fetchClusters();
  }, []);

  const generateAIReport = async () => {
    if (selectedCompany === "todas") {
      console.error("No company selected for AI report generation");
      return;
    }
    try {
      setLodingRecommendations(true);
      const reportData = await analysisService.generateAIReport(
        selectedCompany
      );
      setAnalysisData((prevData) => ({
        ...prevData,
        report: {
          main_recommendation: reportData.main_recommendation,
          expected_impact: reportData.expected_impact,
        },
      }));
      setLodingRecommendations(false);
      console.log("AI report generated successfully:", reportData);
    } catch (error) {
      setLodingRecommendations(false);
      console.error("Error generating AI report:", error);
    }
  };

  const handleCompanyChange = async (companyId: string) => {
    setSelectedCompany(companyId);
    if (companyId !== "todas") {
      await analysisService
        .getClustersByCompany(companyId)
        .then((data) => {
          setClusters(data.clusters);
          setAnalysisData(data);
        })
        .catch((error) => {
          console.error("Error fetching clusters for company:", error);
          setClusters([]);
          setAnalysisData({
            clusters: [],
            departments: [],
            useCases: [],
            technologyStack: [],
            report: {
              main_recommendation: "",
              expected_impact: "",
            },
          });
        });
    } else {
      setClusters([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <NavigationD />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Análisis y Clustering
          </h1>
          <p className="text-gray-600 text-lg">
            Segmentación inteligente de casos de uso y análisis de patrones
            organizacionales
          </p>
        </div>

        <CardContent className="mx-auto mb-8" style={{ padding: "0px" }}>
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

        <Tabs defaultValue="clusters" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="clusters">Clusters Identificados</TabsTrigger>
            <TabsTrigger value="use-cases">Casos de Uso</TabsTrigger>
            <TabsTrigger value="technology">Stack Tecnológico</TabsTrigger>
            <TabsTrigger value="impact">Análisis de Impacto</TabsTrigger>
          </TabsList>

          <TabsContent value="clusters" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analysisData.clusters.map((cluster) => (
                <Card
                  key={cluster.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">
                          {cluster.name}
                        </CardTitle>
                        <Badge className={getPriorityColor(cluster.priority)}>
                          Prioridad {cluster.priority}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {cluster.size}
                        </div>
                        <div className="text-sm text-gray-500">usuarios</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{cluster.description}</p>

                    <div>
                      <h4 className="font-semibold mb-2">Departamentos:</h4>
                      <div className="flex flex-wrap gap-2">
                        {cluster.departments.map((dept) => (
                          <Badge key={dept} variant="outline">
                            {dept}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">
                        Tareas principales:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {cluster.mainTasks.map((task) => (
                          <Badge key={task} variant="secondary">
                            {task}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">
                        Herramientas recomendadas:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {cluster.recommendedTools.map((tool) => (
                          <Badge
                            key={tool}
                            className="bg-green-100 text-green-800"
                          >
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="text-sm text-gray-500">
                        ROI Estimado:
                      </span>
                      <span className="font-bold text-green-600">
                        {cluster.roi}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="use-cases" className="space-y-6">
            <div className="flex gap-4 mb-6">
              <Select
                value={selectedCluster}
                onValueChange={setSelectedCluster}
              >
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Seleccionar cluster" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los clusters</SelectItem>
                  {clusters.map((cluster) => (
                    <SelectItem key={cluster.id} value={cluster.id}>
                      {cluster.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCluster === "all" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Object.entries(useCases).map(([clusterId, cases]) => {
                  const cluster = clusters.find((c) => c.id === clusterId);
                  return (
                    <Card key={clusterId}>
                      <CardHeader>
                        <CardTitle>{cluster?.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                          <ScatterChart data={cases}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="effort"
                              label={{
                                value: "Esfuerzo",
                                position: "insideBottom",
                                offset: -5,
                              }}
                            />
                            <YAxis
                              dataKey="impact"
                              label={{
                                value: "Impacto",
                                angle: -90,
                                position: "insideLeft",
                              }}
                            />
                            <Tooltip
                              formatter={(value, name) => [value, name]}
                            />
                            <Scatter dataKey="impact" fill="#8884d8" />
                          </ScatterChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Casos de Uso Detallados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {useCases[selectedCluster as keyof typeof useCases]?.map(
                      (useCase, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold">{useCase.name}</h4>
                            <Badge>{useCase.users} usuarios</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Impacto: </span>
                              <span className="font-medium">
                                {useCase.impact}%
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Esfuerzo: </span>
                              <span className="font-medium">
                                {useCase.effort}%
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="technology" className="space-y-6">
            {analysisData.technologyStack.map((category) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.tools.map((tool, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-4 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-semibold">{tool.name}</h4>
                          <p className="text-sm text-gray-600">
                            Aplicable a:{" "}
                            {tool.clusters
                              .map(
                                (id) =>
                                  clusters.find((c) => c.id === id)?.name || id
                              )
                              .join(", ")}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{tool.cost}</div>
                          <div className="text-sm text-gray-500">
                            {tool.users} usuarios potenciales
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis de ROI por Cluster</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={clusters}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="size" fill="#8884d8" name="Usuarios" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <div className="flex items-center justify-between p-4">
                  <CardTitle>Resumen Ejecutivo</CardTitle>
                  {analysisData?.report?.main_recommendation &&
                    !loadingRecommendations && (
                      <Button
                        onClick={generateAIReport}
                        variant="outline"
                        size="sm"
                        className="ml-4"
                      >
                        🔁 Regenerar
                      </Button>
                    )}
                </div>
                <CardContent className="space-y-4">
                  {loadingRecommendations ? (
                    <div
                      className="flex items-center justify-center "
                      style={{ height: "300px" }}
                    >
                      <Spinner message="Generando recomendaciones..." />
                    </div>
                  ) : analysisData?.report?.main_recommendation ? (
                    <>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-blue-800 mb-2">
                              Recomendación Principal
                            </h4>
                            <p className="text-blue-700 text-sm">
                              {analysisData.report.main_recommendation}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">
                          Impacto Esperado
                        </h4>
                        <p className="text-green-700 text-sm">
                          {analysisData.report.expected_impact}
                        </p>
                      </div>

                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2">
                          Inversión Requerida
                        </h4>
                        <p className="text-orange-700 text-sm">
                          $50,000 USD en licencias y $30,000 USD en
                          entrenamiento para la implementación inicial.
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="text-gray-500 mb-4">
                        No hay recomendaciones generadas
                      </p>
                      <Button onClick={generateAIReport}>
                        ¿Te gustaría generar una?
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {selectedCompany == "todas" && (
          <Card className=" mx-auto mb-8 text-center">
            <CardContent className="pt-6">
              <p className="text-gray-600">
                Seleccione una empresa para ver el análisis detallado de
                clusters, casos de uso y recomendaciones.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                O explore las respuestas generales disponibles.
              </p>
            </CardContent>
          </Card>
        )}
        {clusters.length === 0 && selectedCompany !== "todas" && (
          <Card className=" mx-auto mb-8 text-center">
            <CardContent className="pt-6">
              <p className="text-gray-600">
                No se encontraron datos para la empresa seleccionada.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Asegúrate de que la empresa tenga datos de encuesta disponibles.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AnalysisD;
