import React, { useState, useEffect } from "react";
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
// Add these imports at the top of your file
import { Rectangle } from "recharts";
import HeatMap from "react-heatmap-grid";

const DashboardD = () => {
  const [selectedCompany, setSelectedCompany] = useState("todas");
  const [companies, setCompanies] = useState<any[]>([]);
  const [comparisonType, setComparisonType] = useState("oportunidades");
  const [compareCompany1, setCompareCompany1] = useState("promedio");
  const [compareCompany2, setCompareCompany2] = useState("");
  const [radarData, setRadarData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [selectedAIDimension, setSelectedAIDimension] = useState("total");

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
    aiCultureByDepartment?: {
      graphData: any[];
    };
    aiknowledgeByDepartment?: {
      graphData: any[];
    };
    aiEthichsandGovernanceByDepartment?: {
      graphData: any[];
    };
    totalAIMaturityByDepartment?: {
      graphData: any[];
    };
    totalAIMaturityByClusters?: {
      heatmapGraph: any[];
    };
    totalAIMaturitySection?: {
      culture: {
        mean: number;
        curiosity: { mean: number };
        resistance: { mean: number };
        caution: { mean: number };
      };
      aiknowledge: {
        mean: number;
        basicKnowledge: {
          mean: number;
        };
        promts: {
          mean: number;
        };
        integration: {
          mean: number;
        };
        riskAssessment: {
          mean: number;
        };
        frequency: {
          mean: number;

        };
      };
      aiEthichsandGovernance: {
        mean: number;
        poltics: { mean: number };
        dataGovernance: { mean: number };
        security: { mean: number };
      };
    };
  }

  const [dashboardData, setDashboardData] = useState<DashboardData | null>({
    participationByDepartment: {
      graphData: [],
    },
    aiCultureByDepartment: {
      graphData: [],
    },
    aiknowledgeByDepartment: {
      graphData: [],
    },
    aiEthichsandGovernanceByDepartment: {
      graphData: [],
    },
    totalAIMaturityByDepartment: {
      graphData: [],
    },
    totalAIMaturityByClusters: {
      heatmapGraph: [],
    },
    totalAIMaturitySection: {
      culture: {
        mean: 0,
        curiosity: { mean: 0 },
        resistance: { mean: 0 },
        caution: { mean: 0 },
      },
      aiknowledge: {
        mean: 0,
        basicKnowledge: { mean: 0 },
        promts: { mean: 0 },
        integration: { mean: 0 },
        riskAssessment: { mean: 0 },
        frequency: { mean: 0 },
      },
      aiEthichsandGovernance: { 
        mean: 0, 
        poltics: { mean: 0 }, 
        dataGovernance: { mean: 0 }, 
        security: { mean: 0 } 
      },
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
        //proces scatter data
        const processedImpactEffortData = processScatterData(
          response.matrixImpactEffort.graphData || []
        );
        setDashboardData({
          ...response,
          matrixImpactEffort: { graphData: processedImpactEffortData },
        });
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

  // Agrega esta función para manejar los datos del radar
  const getAIDimensionRadarData = () => {
    let sourceData: any[] = [];

    switch (selectedAIDimension) {
      case "culture":
        sourceData = dashboardData?.aiCultureByDepartment?.graphData || [];
        break;
      case "knowledge":
        sourceData = dashboardData?.aiknowledgeByDepartment?.graphData || [];
        break;
      case "ethics":
        sourceData =
          dashboardData?.aiEthichsandGovernanceByDepartment?.graphData || [];
        break;
      case "total":
        sourceData =
          dashboardData?.totalAIMaturityByDepartment?.graphData || [];
        break;
      default:
        sourceData = [];
    }

    return sourceData.map((item) => ({
      area: item.name,
      value: item.mean,
    }));
  };

  interface CustomTooltipProps {
    active?: boolean; // Make active optional
    payload?: {
      payload: ScatterDataPoint;
    }[]; // Ensure consistent type with ScatterDataPoint
    label?: string; // Make label optional
  }

  // Custom shape for scatter points to include size
  const CustomShape = (props: any) => {
    const { cx, cy, payload, size } = props;
    const count = payload?.count || 1; // Si tienes datos agrupados

    return (
      <>
        <circle
          cx={cx}
          cy={cy}
          r={10} // Aumenta el tamaño según cantidad
          fill="#8884d8"
          fillOpacity={Math.min(0.3 + count * 0.1, 0.8)}
          stroke="#fff"
          strokeWidth={1}
        />
        {count > 1 && (
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff"
            fontSize={12}
            fontWeight="bold"
          >
            {count}
          </text>
        )}
      </>
    );
  };

  interface ScatterDataPoint {
    impact: number;
    effort: number;
    count: number;
    names: string[];
    frequencies: string[];
    name: string; // names.join(', ')
    frequency: string; // frequencies.join(', ')
    size: number;
  }

  interface CustomTooltipProps {
    active?: boolean;
    payload?: {
      payload: ScatterDataPoint;
    }[];
    label?: string;
  }

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (!active || !payload || payload.length === 0) return null;

    const pointData = payload[0].payload;

    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "12px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          maxWidth: "280px",
        }}
      >
        <div
          style={{
            marginBottom: "8px",
            paddingBottom: "6px",
            borderBottom: "1px solid #eee",
            fontWeight: "600",
            color: "#555",
          }}
        >
          {pointData.count > 1
            ? `${pointData.count} tareas en este punto`
            : "1 tarea en este punto"}

          <div>Impacto: {pointData.impact}</div>
          <div>Esfuerzo: {pointData.effort}</div>
        </div>

        <ul
          style={{
            margin: 0,
            paddingLeft: "18px",
            listStyleType: "circle",
          }}
        >
          {pointData.names.map((name, index) => (
            <li
              key={index}
              style={{
                marginBottom: "4px",
                fontSize: "0.9em",
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const processScatterData = (data: ScatterDataPoint[]) => {
    const grouped = data.reduce((acc, item) => {
      const key = `${item.impact}-${item.effort}`;
      if (!acc[key]) {
        acc[key] = {
          ...item,
          count: 0,
          names: [],
          frequencies: [],
        };
      }
      acc[key].count += 1;
      acc[key].names.push(item.name);
      acc[key].frequencies.push(item.frequency);
      return acc;
    }, {} as Record<string, any>);

    return Object.values(grouped).map((item) => ({
      ...item,
      name: item.names.join(", "),
      frequency: item.frequencies.join(", "),
      size: 10 + item.count * 2, // Aumentar tamaño según cantidad
    }));
  };

  interface HeatmapData {
    cluster: string;
    level_1: number;
    level_2: number;
    level_3: number;
    level_4: number;
    level_5: number;
  }
  const StackedBarChart = ({ data }: { data: HeatmapData[] }) => {
    // Transformar los datos para el gráfico de barras apiladas
    const chartData = data.map((item) => ({
      cluster: item.cluster,
      level_1: item.level_1,
      level_2: item.level_2,
      level_3: item.level_3,
      level_4: item.level_4,
      level_5: item.level_5,
    }));

    const colors = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"];

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="cluster" type="category" width={100} />
          <Tooltip />
          <Legend />
          <Bar dataKey="level_1" stackId="a" fill={colors[0]} name="Nivel 1" />
          <Bar dataKey="level_2" stackId="a" fill={colors[1]} name="Nivel 2" />
          <Bar dataKey="level_3" stackId="a" fill={colors[2]} name="Nivel 3" />
          <Bar dataKey="level_4" stackId="a" fill={colors[3]} name="Nivel 4" />
          <Bar dataKey="level_5" stackId="a" fill={colors[4]} name="Nivel 5" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const heatmapGraph = [
    {
      cluster: "Comunicadores",
      level_1: 1,
      level_2: 0,
      level_3: 0,
      level_4: 0,
      level_5: 0,
    },
    // Add more data as needed
  ];
  const HeatmapVisualization = ({ heatmapData }) => {
    // Definición fija de clusters en el orden deseado
    const clusterDefinitionsHP = [
        "Analistas",
        "Constructores",
        "Integradores",
        "Comunicadores",
        "Gestores"
    ];

    const levels = ["level_1", "level_2", "level_3", "level_4", "level_5"];

    const getColor = (value) => {
        if (value === 0) return "bg-gray-100";
        if (value === 1) return "bg-purple-200";
        if (value === 2) return "bg-purple-300";
        if (value === 3) return "bg-purple-400";
        if (value === 4) return "bg-purple-500";
        return "bg-purple-600";
    };

    // Ordenar los datos según clusterDefinitionsHP
    const sortedHeatmapData = clusterDefinitionsHP.map(clusterName => {
        const foundItem = heatmapData.find(item => item.cluster === clusterName);
        return foundItem || {
            cluster: clusterName,
            level_1: 0,
            level_2: 0,
            level_3: 0,
            level_4: 0,
            level_5: 0
        };
    });

    return (
      <div className="font-sans my-5" style={{ width: "100%", overflowX: "auto" ,
        display: "flex", justifyContent: "center", alignItems: "center"


      }}>
        <div className="font-sans my-5" style={{ width: "50%", overflowX: "auto" }}>
            {/* Heatmap Grid */}
            <div
                className="grid gap-px w-full"
                style={{
                    gridTemplateColumns: `1fr repeat(${levels.length}, 1fr)`,
                }}
            >
                {/* Header row */}
                <div className="bg-gray-100 p-2 text-center font-bold text-gray-700 rounded-tl-lg">
                    Cluster
                </div>
                {levels.map((level, i) => (
                    <div
                        key={i}
                        className="bg-gray-100 p-2 text-center font-bold text-gray-700"
                        style={{
                            ...(i === levels.length - 1
                                ? { borderRadius: "0 8px 0 0" }
                                : {}),
                        }}
                    >
                        Level {level.split("_")[1]}
                    </div>
                ))}

                {/* Data rows - ahora usando sortedHeatmapData */}
                {sortedHeatmapData.map((item, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        <div
                            className="bg-gray-100 p-2 font-bold text-gray-700 flex items-center"
                            style={{
                                gridRow: rowIndex + 2,
                                ...(rowIndex === sortedHeatmapData.length - 1
                                    ? { borderRadius: "0 0 0 8px" }
                                    : {}),
                            }}
                        >
                            {item.cluster}
                        </div>
                        {levels.map((level, colIndex) => (
                            <div
                                key={colIndex}
                                className={`flex items-center justify-center ${getColor(
                                    item[level]
                                )} text-sm aspect-square`}
                                style={{
                                    gridColumn: colIndex + 2,
                                    gridRow: rowIndex + 2,
                                    width: "100%", // fill the grid cell
                                    ...(rowIndex === sortedHeatmapData.length - 1 &&
                                        colIndex === levels.length - 1
                                        ? { borderRadius: "0 0 8px 0" }
                                        : {}),
                                }}
                            >
                                {item[level]}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center mt-4 gap-4 flex-wrap">
                {[0, 1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex items-center gap-2">
                        <div
                            className={`w-5 h-5 border border-gray-200 ${getColor(
                                value
                            )} rounded-sm`}
                        />
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
};


const ResumenGeneral = ({ dashboardData }) => {
  // Extract the necessary data with fallbacks
 
  const cultureMean = (dashboardData?.totalAIMaturitySection?.culture?.mean || 0).toFixed(1);
  const governanceMean = (dashboardData?.totalAIMaturitySection?.aiEthichsandGovernance?.mean || 0).toFixed(1);
  const knowledgeMean = (dashboardData?.totalAIMaturitySection?.aiknowledge?.mean || 0).toFixed(1);
  const totalAIMaturity = (
    (parseFloat(cultureMean) + 
    parseFloat(governanceMean) + 
    parseFloat(knowledgeMean)
  ) / 3).toFixed(1);
  // Find strongest and weakest areas
  const sections = [
    { name: "Conocimiento IA", value: dashboardData?.totalAIMaturitySection?.aiknowledge?.mean || 0 },
    { name: "Actitud Cultural", value: dashboardData?.totalAIMaturitySection?.culture?.mean || 0 },
    { name: "Gobierno y Ética", value: dashboardData?.totalAIMaturitySection?.aiEthichsandGovernance?.mean || 0 }
  ];
  
  const strongestArea = sections.reduce((max, section) => 
    section.value > max.value ? section : max, sections[0]);
  const weakestArea = sections.reduce((min, section) => 
    section.value < min.value ? section : min, sections[0]);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100 group hover:shadow-lg transition-all
      mt-8
    ">
      <h3 className="text-2xl font-semibold mb-4 text-purple-700">
        Resumen General
      </h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700">
            Área más fuerte:
          </h4>
          <p className="text-gray-600">
            {strongestArea.name} ({strongestArea.value.toFixed(1)}/5)
          </p>
        </div>
        <div>
          <h4 className="font-medium text-gray-700">
            Área a mejorar:
          </h4>
          <p className="text-gray-600">
            {weakestArea.name} ({weakestArea.value.toFixed(1)}/5)
          </p>
        </div>
        <div className="pt-2">
          <div className="h-3 bg-gray-200 rounded-full">
            <div
              className="h-3 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full"
              style={{ width: `${parseFloat(totalAIMaturity) * 20}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Madurez general en IA: {totalAIMaturity}/5
          </p>
        </div>
      </div>
    </div>
  );
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
      {loading && <FullSpinner message="Cargando..." />}

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

        {selectedCompany !== "todas" && (
          <div className="bg-white/95  rounded-2xl p-12  mb-10 ">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
              Evaluación de Madurez en IA
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100 group hover:shadow-lg transition-all">
                <h3 className="text-2xl font-semibold mb-4 text-purple-700">
                  Viabilidad de Automatización
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estructuración</span>
                    <span className="font-bold">2.5/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impacto</span>
                    <span className="font-bold">3/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Calidad de datos</span>
                    <span className="font-bold">2/5</span>
                  </div>
                  <div className="pt-3">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-purple-500 rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Puntuación total: 2.5/5
                    </p>
                  </div>
                </div>
              </div> */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100 group hover:shadow-lg transition-all">
                <h3 className="text-2xl font-semibold mb-4 text-purple-700">
                  Conocimiento IA
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conceptos básicos</span>
                    <span className="font-bold">
                      {JSON.stringify(
                        (dashboardData ?? {})?.totalAIMaturitySection?.aiknowledge.basicKnowledge.mean || 0
                      )}
                      /5
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uso de prompts</span>
                    <span className="font-bold">
                      {JSON.stringify(
                        (dashboardData ?? {})?.totalAIMaturitySection?.aiknowledge.promts.mean || 0
                      )}
                      /5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Integración</span>
                    <span className="font-bold">
                      {JSON.stringify(
                        (dashboardData ?? {})?.totalAIMaturitySection?.aiknowledge.integration.mean || 0
                      )}
                      /5
                    </span>


                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Evaluación de riesgos</span>
                    <span className="font-bold">
                      {JSON.stringify(
                        (dashboardData ?? {})?.totalAIMaturitySection?.aiknowledge.riskAssessment.mean || 0
                      )}
                      /5
                    </span> 
                  </div> 

                  <div className="flex justify-between">
                    <span className="text-gray-600">Frecuencia de uso</span>
                    <span className="font-bold">
                      {JSON.stringify(
                        (dashboardData ?? {})?.totalAIMaturitySection?.aiknowledge.frequency.mean || 0
                      )}
                      /5
                    </span> 
                  </div>
                    
                  

                  <div className="pt-3">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-purple-500 rounded-full"
                        style={{ width:  `${(dashboardData ?? {})?.totalAIMaturitySection?.aiknowledge.mean * 20}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Promedio: {JSON.stringify(
                        (dashboardData ?? {})?.totalAIMaturitySection?.aiknowledge.mean || 0
                      )}
                      /5
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100 group hover:shadow-lg transition-all">
                <h3 className="text-2xl font-semibold mb-4 text-purple-700">
                  Actitud Cultural
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Curiosidad</span>
                    <span className="font-bold">
                      {JSON.stringify(
                        (dashboardData ?? {})?.totalAIMaturitySection?.culture.curiosity.mean || 0
                      )}
                      /5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cautela</span>
                    <span className="font-bold">
                      {JSON.stringify(
                        (dashboardData ?? {})?.totalAIMaturitySection?.culture.caution.mean || 0
                      )}
                      /5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Resistencia</span>
                    <span className="font-bold">
                      
                      {JSON.stringify(
                        (dashboardData ?? {})?.totalAIMaturitySection?.culture.resistance.mean || 0
                      )}
                      /5</span>
                  </div>
                  <div className="pt-3">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-purple-500 rounded-full"
                        style={{ width: `${(dashboardData ?? {})?.totalAIMaturitySection?.culture.mean * 20}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Promedio: {JSON.stringify(
                        (dashboardData ?? {})?.totalAIMaturitySection?.culture.mean || 0
                      )}
                      /5
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100 group hover:shadow-lg transition-all">
                <h3 className="text-2xl font-semibold mb-4 text-purple-700">
                  Gobierno y Ética
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Políticas formales</span>
                    <span className="font-bold">
                      
                      {JSON.stringify(
                        (dashboardData ?? {})?.totalAIMaturitySection?.aiEthichsandGovernance.poltics.mean || 0
                      )}
                      /5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gobierno de datos</span>
                    <span className="font-bold">
                      
                      {JSON.stringify(
                        (dashboardData ?? {})?.totalAIMaturitySection?.aiEthichsandGovernance.dataGovernance.mean || 0
                      )}
                      /5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seguridad</span>
                    <span className="font-bold">
                      
                      {JSON.stringify(
                        (dashboardData ?? {})?.totalAIMaturitySection?.aiEthichsandGovernance.dataGovernance.mean || 0
                      )}
                      /5</span>
                  </div>
                  <div className="pt-3">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-purple-500 rounded-full"
                        style={{ width: `${(dashboardData ?? {})?.totalAIMaturitySection?.aiEthichsandGovernance.mean * 20}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Promedio: {JSON.stringify(
                        (dashboardData ?? {})?.totalAIMaturitySection?.aiEthichsandGovernance.mean || 0
                      )}
                      /5
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <ResumenGeneral dashboardData={dashboardData} />
          </div>
        )}

        {/* Nueva gráfica de pastel */}

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

        {selectedCompany !== "todas" && (
          <Card className="mb-8 mt-8">
            <CardHeader>
              <CardTitle>
                Madurez de IA por Dimensión
                {selectedCompany !== "todas" && (
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    - {getCompanyNameById(selectedCompany)}
                  </span>
                )}
              </CardTitle>
              <div className="mt-4 w-full md:w-1/3">
                <Select
                  value={selectedAIDimension}
                  onValueChange={setSelectedAIDimension}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar dimensión" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="total">🚀 Madurez Total</SelectItem>
                    <SelectItem value="culture">🧠 Cultura de IA</SelectItem>
                    <SelectItem value="knowledge">
                      📚 Conocimiento de IA
                    </SelectItem>
                    <SelectItem value="ethics">
                      ⚖️ Ética y Gobernanza
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={getAIDimensionRadarData()}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="area" />
                  <PolarRadiusAxis angle={90} domain={[0, 5]} />
                  <Radar
                    name={getCompanyNameById(selectedCompany)}
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {selectedCompany !== "todas" &&
          dashboardData.totalAIMaturityByClusters?.heatmapGraph && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>
                  Distribución de Madurez por Cluster y Nivel
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    - {getCompanyNameById(selectedCompany)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent
                style={ { width: "100%", maxWidth: "100%" ,textAlign: "center"} }
              >
                <HeatmapVisualization
                  heatmapData={
                    dashboardData.totalAIMaturityByClusters?.heatmapGraph || []
                  }
                />
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
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

                    <XAxis
                      type="number"
                      dataKey="effort"
                      name="Effort"
                      domain={[0, 100]}
                      label={{
                        value: "Esfuerzo →",
                        position: "insideBottomRight",
                        offset: -5,
                      }}
                      ticks={[0, 25, 50, 75, 100]}
                    />

                    <YAxis
                      type="number"
                      dataKey="impact"
                      name="Impact"
                      domain={[0, 100]}
                      label={{
                        value: "↑ Impacto",
                        angle: -90,
                        position: "insideLeft",
                      }}
                      ticks={[0, 25, 50, 75, 100]}
                    />

                    <ReferenceLine x={50} stroke="#000" strokeWidth={1} />
                    <ReferenceLine y={50} stroke="#000" strokeWidth={1} />
                    {/* 
                    <text
                      x="35%"
                      y="25%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#666"
                    >
                      Low Effort / Low Impact
                    </text>
                    <text
                      x="75%"
                      y="25%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#666"
                    >
                      High Effort / Low Impact
                    </text>
                    <text
                      x="35%"
                      y="65%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#666"
                    >
                      Low Effort / High Impact
                    </text>
                    <text
                      x="75%"
                      y="75%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#666"
                    >
                      High Effort / High Impact
                    </text> */}

                    <Scatter
                      name="Tasks"
                      data={dashboardData.matrixImpactEffort?.graphData || []}
                      fill="#8884d8"
                      shape={<CustomShape />}
                    />

                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ strokeDasharray: "3 3" }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Cultura de IA por Departamento
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
                    data={dashboardData.aiCultureByDepartment?.graphData || []}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="mean" fill="#8884d8" />
                    <YAxis />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Conocimiento de IA por Departamento
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
                      dashboardData.aiknowledgeByDepartment?.graphData || []
                    }
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="mean" fill="#8884d8" />
                    <YAxis />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Ética y Gobernanza de IA por Departamento
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
                      dashboardData.aiEthichsandGovernanceByDepartment
                        ?.graphData || []
                    }
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="mean" fill="#8884d8" />
                    <YAxis />
                  </BarChart>
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
