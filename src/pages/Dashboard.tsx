import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const [selectedCompany, setSelectedCompany] = useState("todas");
  const [companies, setCompanies] = useState<string[]>([]);
  const [comparisonType, setComparisonType] = useState("oportunidades");
  const [compareCompany1, setCompareCompany1] = useState("promedio");
  const [compareCompany2, setCompareCompany2] = useState("");

  // Cargar empresas disponibles
  useEffect(() => {
    const availableCompanies: string[] = [];
    
    // Buscar todas las claves que empiecen con 'surveyData_'
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('surveyData_')) {
        const companySlug = key.replace('surveyData_', '');
        if (companySlug !== 'general') {
          // Intentar obtener el nombre real de la empresa desde las respuestas
          const responses = JSON.parse(localStorage.getItem(key) || '[]');
          if (responses.length > 0 && responses[0].companyName) {
            availableCompanies.push(responses[0].companyName);
          } else {
            availableCompanies.push(companySlug);
          }
        }
      }
    }
    
    setCompanies([...new Set(availableCompanies)]);
  }, []);

  // Datos simulados para las visualizaciones (se pueden filtrar por empresa en el futuro)
  const departmentData = [
    { name: 'IT', responses: 45, automation: 85 },
    { name: 'Marketing', responses: 38, automation: 72 },
    { name: 'Ventas', responses: 42, automation: 68 },
    { name: 'RRHH', responses: 28, automation: 65 },
    { name: 'Finanzas', responses: 35, automation: 78 },
    { name: 'Operaciones', responses: 52, automation: 82 }
  ];

  const taskTypeData = [
    { name: 'Documentación', value: 35, color: '#8884d8' },
    { name: 'Comunicación', value: 28, color: '#82ca9d' },
    { name: 'Análisis', value: 22, color: '#ffc658' },
    { name: 'Creatividad', value: 15, color: '#ff7300' }
  ];

  const aiReadinessData = [
    { level: 'Principiante', count: 45 },
    { level: 'Básico', count: 38 },
    { level: 'Intermedio', count: 25 },
    { level: 'Avanzado', count: 12 },
    { level: 'Experto', count: 5 }
  ];

  const impactEffortData = [
    { name: 'Email automation', impact: 85, effort: 25, size: 40 },
    { name: 'Report generation', impact: 90, effort: 45, size: 60 },
    { name: 'Data analysis', impact: 95, effort: 70, size: 80 },
    { name: 'Content creation', impact: 70, effort: 35, size: 50 },
    { name: 'Customer support', impact: 80, effort: 55, size: 65 }
  ];

  // Datos para la gráfica radial comparativa
  const getRadarData = () => {
    const areas = ['IT', 'Marketing', 'Ventas', 'RRHH', 'Finanzas', 'Operaciones'];
    
    if (comparisonType === "oportunidades") {
      return areas.map(area => ({
        area,
        empresa1: Math.floor(Math.random() * 25) + 10, // Simulamos datos
        empresa2: Math.floor(Math.random() * 25) + 10,
      }));
    } else if (comparisonType === "tipos") {
      const tipos = ['Documentación', 'Comunicación', 'Análisis', 'Creatividad', 'Reportes', 'Gestión'];
      return tipos.map(tipo => ({
        area: tipo,
        empresa1: Math.floor(Math.random() * 40) + 10,
        empresa2: Math.floor(Math.random() * 40) + 10,
      }));
    } else { // automatización
      return areas.map(area => ({
        area,
        empresa1: Math.floor(Math.random() * 30) + 60, // Porcentajes entre 60-90
        empresa2: Math.floor(Math.random() * 30) + 60,
      }));
    }
  };

  const radarData = getRadarData();

  const getComparisonLabels = () => {
    const label1 = compareCompany1 === "promedio" ? "Promedio General" : compareCompany1;
    const label2 = compareCompany2 || "Seleccionar empresa";
    return { label1, label2 };
  };

  const { label1, label2 } = getComparisonLabels();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard Ejecutivo</h1>
              <p className="text-gray-600 text-lg">
                Vista general del diagnóstico de madurez en IA
              </p>
            </div>
            
            {/* Filtro por empresa */}
            <Card className="sm:w-80">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Filtrar por empresa:</label>
                  <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">📊 Todas las empresas</SelectItem>
                      {companies.map((company) => (
                        <SelectItem key={company} value={company}>
                          🏢 {company}
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
              <h3 className="font-semibold text-blue-800 mb-2">🏢 Empresa Seleccionada</h3>
              <p className="text-blue-700">{selectedCompany}</p>
            </div>
          )}
        </div>

        {/* KPIs principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Respuestas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">240</div>
              <p className="text-sm text-gray-500">
                {selectedCompany === "todas" ? "Todas las empresas" : `De ${selectedCompany}`}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Potencial de Automatización</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">73%</div>
              <p className="text-sm text-gray-500">Promedio {selectedCompany === "todas" ? "organizacional" : "de la empresa"}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Casos de Uso Identificados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">156</div>
              <p className="text-sm text-gray-500">Clasificados y priorizados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">ROI Estimado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">340%</div>
              <p className="text-sm text-gray-500">Primeros 12 meses</p>
            </CardContent>
          </Card>
        </div>

        {/* Nueva gráfica radial comparativa */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Análisis Comparativo por Empresa</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tipo de comparación:</label>
                <Select value={comparisonType} onValueChange={setComparisonType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oportunidades">🎯 Oportunidades por Área</SelectItem>
                    <SelectItem value="tipos">📋 Tipos de Oportunidades</SelectItem>
                    <SelectItem value="automatizacion">⚡ Potencial de Automatización</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Primera empresa:</label>
                <Select value={compareCompany1} onValueChange={setCompareCompany1}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="promedio">📊 Promedio General</SelectItem>
                    {companies.map((company) => (
                      <SelectItem key={company} value={company}>
                        🏢 {company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Segunda empresa:</label>
                <Select value={compareCompany2} onValueChange={setCompareCompany2}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company} value={company}>
                        🏢 {company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="area" />
                <PolarRadiusAxis angle={90} domain={[0, comparisonType === "automatizacion" ? 100 : 50]} />
                <Radar
                  name={label1}
                  dataKey="empresa1"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                {compareCompany2 && (
                  <Radar
                    name={label2}
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

        {/* Gráficos principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>
                Participación por Departamento
                {selectedCompany !== "todas" && (
                  <span className="text-sm font-normal text-gray-500"> - {selectedCompany}</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="responses" fill="#8884d8" name="Respuestas" />
                  <Bar dataKey="automation" fill="#82ca9d" name="% Automatización" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Distribución de Tipos de Tareas
                {selectedCompany !== "todas" && (
                  <span className="text-sm font-normal text-gray-500"> - {selectedCompany}</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={taskTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>
                Nivel de Preparación en IA
                {selectedCompany !== "todas" && (
                  <span className="text-sm font-normal text-gray-500"> - {selectedCompany}</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={aiReadinessData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="level" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Matriz Impacto vs Esfuerzo
                {selectedCompany !== "todas" && (
                  <span className="text-sm font-normal text-gray-500"> - {selectedCompany}</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={impactEffortData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    dataKey="effort" 
                    domain={[0, 100]} 
                    label={{ value: 'Esfuerzo', position: 'insideBottom', offset: -5 }} 
                  />
                  <YAxis 
                    type="number" 
                    dataKey="impact" 
                    domain={[0, 100]}
                    label={{ value: 'Impacto', angle: -90, position: 'insideLeft' }} 
                  />
                  <Tooltip 
                    formatter={(value, name) => [value, name]}
                    labelFormatter={(label) => `Caso: ${label}`}
                  />
                  <Scatter dataKey="size" fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
