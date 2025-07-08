import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ReferenceLine,
  Label,
} from "recharts";
import NavigationD from "@/components/NavigationD";
import { companyService } from "@/services/companyService"; // Asegúrate de que este servicio esté configurado correctamente
import { dashboardService } from "@/services/dashboardService";
import { set } from "date-fns";
import { userInfo } from "os";
import FullSpinner from "@/components/FullSpinner"; // Asegúrate de que este componente esté configurado correctamente
const DashboardD = () => {
  const [selectedCompany, setSelectedCompany] = useState("todas");
  const [companies, setCompanies] = useState<any[]>([]);
  const [comparisonType, setComparisonType] = useState("oportunidades");
  const [compareCompany1, setCompareCompany1] = useState("promedio");
  const [compareCompany2, setCompareCompany2] = useState("");
  const [radarData, setRadarData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  interface DashboardData {
    section1?: {
      totalAnswers?: number;
      numberUseCases?: number;
      automationPotential?: {
        mean: number;
      };
    };
    participationByDepartment?: {
      graphData: any[];
    };
    taskTypeData?: {
      graphData: any[];
    };
    levelOfPreparation?: {
      graphData: any[];
    };
    matrixImpactEffort?: {
      graphData: any[];
    };
  }

  const [dashboardData, setDashboardData] = useState<DashboardData | null>({
    participationByDepartment: {
      graphData: [],
    },
  });
  // Cargar empresas disponibles
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const companiesData = await companyService.getAllCompanies();
      if (companiesData) {
        console.log(companiesData);
        setCompanies(companiesData);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const taskTypeData = [
    { name: "Documentación", value: 35, color: "#8884d8" },
    { name: "Comunicación", value: 28, color: "#82ca9d" },
    { name: "Análisis", value: 22, color: "#ffc658" },
    { name: "Creatividad", value: 15, color: "#ff7300" },
  ];

  const aiReadinessData = [
    { level: "Principiante", count: 45 },
    { level: "Básico", count: 38 },
    { level: "Intermedio", count: 25 },
    { level: "Avanzado", count: 12 },
    { level: "Experto", count: 5 },
  ];

  const impactEffortData = [
    {
      name: "Email automation",
      impact: 85,
      effort: 25,
      size: 40,
      color: "#4CAF50",
    },
    {
      name: "Report generation",
      impact: 90,
      effort: 45,
      size: 60,
      color: "#4CAF50",
    },
    {
      name: "Data analysis",
      impact: 95,
      effort: 70,
      size: 80,
      color: "#2196F3",
    },
    {
      name: "Content creation",
      impact: 70,
      effort: 35,
      size: 50,
      color: "#4CAF50",
    },
    {
      name: "Customer support",
      impact: 80,
      effort: 55,
      size: 65,
      color: "#FF5722",
    },
  ].map((item) => ({
    ...item,
    color:
      item.impact >= 50 && item.effort <= 50
        ? "#4CAF50"
        : item.impact <= 50 && item.effort >= 50
        ? "#FF5722"
        : "#2196F3",
  }));

  // Datos para la gráfica radial comparativa
  const getRadarData = () => {
    const areas = [
      "IT",
      "Marketing",
      "Ventas",
      "RRHH",
      "Finanzas",
      "Operaciones",
    ];

    if (comparisonType === "oportunidades") {
      return radarData.areas;
    } else if (comparisonType === "tipos") {
      const tipos = [
        "Documentación",
        "Comunicación",
        "Análisis",
        "Creatividad",
        "Reportes",
        "Gestión",
      ];
      return radarData.tipeOportunity;
    } else {
      // automatización
      return radarData.potentialAutomation || [];
    }
  };

  const getComparisonLabels = () => {
    const label1 =
      compareCompany1 === "promedio" ? "Promedio General" : compareCompany1;
    const label2 = compareCompany2 || "Seleccionar empresa";
    return { label1, label2 };
  };

  const { label1, label2 } = getComparisonLabels();

  const getCompanyNameById = (id: string) => {
    const company = companies.find((c) => c._id === id);

    return company ? company.name : "Empresa Desconocida";
  };

  const fetchDashboardData = async (companyId: string) => {
    try {
      setLoading(true);
      const response = await dashboardService.getDashboardData(companyId);
      if (response) {
        setDashboardData(response);
        console.log("Dashboard data fetched:", response);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching survey data:", error);
      setDashboardData({
        section1: {
          totalAnswers: 0,
          numberUseCases: 0,
          automationPotential: { mean: 0 },
        },
        participationByDepartment: { graphData: [] },
        taskTypeData: { graphData: [] },
        levelOfPreparation: { graphData: [] },
        matrixImpactEffort: { graphData: [] },
      });
      setRadarData([]);
      setLoading(false);
    }
  };

  const getRadarDataAPI = async (companyId: string, companyId2: string) => {
    setLoading(true);
    try {
      const response = await dashboardService.getComparativeData(
        companyId,
        companyId2
      );
      if (response) {
        setRadarData(response);
        console.log("Radar data fetched:", response);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching radar data:", error);
      setRadarData([]);
      setLoading(false);
    }
  };

  const handleCompanyChange = async (companyId: string) => {
    setSelectedCompany(companyId);
    setCompareCompany1(companyId);
    setCompareCompany2("");
    if (companyId !== "todas") {
      await fetchDashboardData(companyId);
      await getRadarDataAPI(companyId, ""); // Fetch radar data for the selected company
    } else {
      setDashboardData({
        section1: {
          totalAnswers: 0,
          numberUseCases: 0,
          automationPotential: { mean: 0 },
        },
        participationByDepartment: { graphData: [] },
        taskTypeData: { graphData: [] },
      }); // clear data if "todas" is selected
    }
  };

  const CustomLabel = ({ name, x, y }) => (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={-10} // Ajusta la posición vertical
        textAnchor="middle"
        fill="#333"
        fontSize={12}
        fontWeight="bold"
      >
        {name}
      </text>
    </g>
  );

  interface CustomTooltipProps {
    active?: boolean; // Make active optional
    payload?: any[]; // Make payload optional
    label?: string; // Make label optional
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload; // Accede a los datos del punto
      return (
        <div
          className="custom-tooltip"
          style={{
            background: "white",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
            🔹 {data.name}
          </p>
          <p>
            Impacto: <strong>{data.impact}%</strong>
          </p>
          <p>
            Esfuerzo: <strong>{data.effort}%</strong>
          </p>
          <p>
            Frecuencia: <strong>{data.frequency}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    if (selectedCompany !== "todas") {
      getRadarDataAPI(compareCompany1, compareCompany2);
    } else {
      setRadarData([]);
    }
  }, [compareCompany1, compareCompany2]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <NavigationD />
      { loading && (<FullSpinner message="Cargando..."  />)}

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Dashboard Ejecutivo
              </h1>
              <p className="text-gray-600 text-lg">
                Vista general del diagnóstico de madurez en IA
              </p>
            </div>

            {/* Filtro por empresa */}
            <Card className="sm:w-80">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Filtrar por empresa:
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
          </div>

          {selectedCompany !== "todas" && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">
                🏢 Empresa Seleccionada
              </h3>
              <p className="text-blue-700">
                {getCompanyNameById(selectedCompany)}
              </p>
            </div>
          )}
        </div>

        {selectedCompany == "todas" && (
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

        {/* KPIs principales */}
        {selectedCompany !== "todas" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Respuestas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {(dashboardData ?? {})?.section1?.totalAnswers ?? 0}
                </div>
                <p className="text-sm text-gray-500">
                  {selectedCompany === "todas"
                    ? "Todas las empresas"
                    : `De ${getCompanyNameById(selectedCompany)}`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Potencial de Automatización
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {dashboardData?.section1?.automationPotential?.mean.toFixed(
                    1
                  ) || 0}
                  %
                </div>
                <p className="text-sm text-gray-500">
                  Promedio{" "}
                  {selectedCompany === "todas"
                    ? "organizacional"
                    : "de la empresa"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Casos de Uso Identificados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">
                  {(dashboardData ?? {})?.section1?.numberUseCases ?? 0}
                </div>
                <p className="text-sm text-gray-500">
                  Clasificados y priorizados
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">
                  ROI Estimado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">???..</div>
                <p className="text-sm text-gray-500">Primeros 12 meses</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Nueva gráfica radial comparativa */}
        {selectedCompany !== "todas" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Análisis Comparativo por Empresa</CardTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Tipo de comparación:
                  </label>
                  <Select
                    value={comparisonType}
                    onValueChange={setComparisonType}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oportunidades">
                        🎯 Oportunidades por Área
                      </SelectItem>
                      <SelectItem value="tipos">
                        📋 Tipos de Oportunidades
                      </SelectItem>
                      <SelectItem value="automatizacion">
                        ⚡ Potencial de Automatización
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Primera empresa:
                  </label>
                  <Select
                    value={compareCompany1}
                    onValueChange={setCompareCompany1}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company._id}>
                          🏢 {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Segunda empresa:
                  </label>
                  <Select
                    value={compareCompany2}
                    onValueChange={setCompareCompany2}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company._id}>
                          🏢 {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={getRadarData()} key={`${dashboardData}`}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="area" />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, comparisonType === "automatizacion" ? 100 : 50]}
                  />
                  <Radar
                    name={getCompanyNameById(label1)}
                    dataKey="empresa1"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  {compareCompany2 && (
                    <Radar
                      name={getCompanyNameById(label2)}
                      dataKey="empresa2"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  )}
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>

              {!compareCompany2 && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-700">
                    💡 Selecciona una segunda empresa para comparar los datos
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Gráficos principales */}

        {selectedCompany !== "todas" &&
          dashboardData.participationByDepartment.graphData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Participación por Departamento
                    {selectedCompany !== "todas" && (
                      <span className="text-sm font-normal text-gray-500">
                        {" "}
                        - {getCompanyNameById(selectedCompany)}
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={
                        dashboardData.participationByDepartment?.graphData || []
                      }
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="responses"
                        fill="#8884d8"
                        name="Respuestas"
                      />
                      <Bar
                        dataKey="automation"
                        fill="#82ca9d"
                        name="% Automatización"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    Distribución de Tipos de Tareas
                    {selectedCompany !== "todas" && (
                      <span className="text-sm font-normal text-gray-500">
                        {" "}
                        - {getCompanyNameById(selectedCompany)}
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={
                          dashboardData.taskTypeData?.graphData || taskTypeData
                        }
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {taskTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}

        {selectedCompany !== "todas" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>
                  Nivel de Preparación en IA
                  {selectedCompany !== "todas" && (
                    <span className="text-sm font-normal text-gray-500">
                      {" "}
                      - {getCompanyNameById(selectedCompany)}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={
                      dashboardData.levelOfPreparation?.graphData ||
                      aiReadinessData
                    }
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="level" type="category" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                    <YAxis />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Matriz Impacto vs Esfuerzo
                  {selectedCompany !== "todas" && (
                    <span className="text-sm font-normal text-gray-500">
                      {" "}
                      - {getCompanyNameById(selectedCompany)}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart
                    data={dashboardData.matrixImpactEffort?.graphData || []}
                  >
                    {/* Ejes y grid (igual que antes) */}
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="effort"
                      domain={[0, 100]}
                      label={{
                        value: "Esfuerzo →",
                        position: "insideBottomRight",
                        offset: -5, // Adjust label position
                      }}
                      padding={{}} // Remove unsupported 'top' property
                    />
                    <YAxis
                      dataKey="impact"
                      domain={[0, 100]}
                      label={{
                        value: "↑ Impacto",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />

                    {/* ScatterPlot con colores por prioridad */}
                    <Scatter name="Tareas" dataKey="size" fill="#8884d8" />

                    {/* Tooltip que muestra el nombre, impacto y esfuerzo */}
                    <Tooltip
                      content={(props) => <CustomTooltip {...props} />} // Pass props safely
                      cursor={{ strokeDasharray: "3 3" }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardD;
