import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import SurveyLayout from "@/components/SurveyLayout";
import { surveyService } from "@/services/surveyService";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const StandaloneSurvey = () => {
  const { companyId, tkn } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [companyInfo, setCompanyInfo] = useState({ name: "", slug: "" });
  const [formData, setFormData] = useState({
    // Información de empresa (nueva)
    companyName: "",
    companySlug: "",

    // Información personal
    name: "",
    email: "",
    department: "",
    role: "",
    experience: "",
    totalExperience: "",

    // Inventario de tareas
    mainTasks: ["", "", "", "", ""],
    applicationsUsed: [],
    otherToolText: "", // Nuevo campo para "Otra herramienta"

    // Viabilidad de automatización para cada tarea
    taskDetails: [
      { frequency: "", structureLevel: "", impact: "", dataAvailability: "" },
      { frequency: "", structureLevel: "", impact: "", dataAvailability: "" },
      { frequency: "", structureLevel: "", impact: "", dataAvailability: "" },
      { frequency: "", structureLevel: "", impact: "", dataAvailability: "" },
      { frequency: "", structureLevel: "", impact: "", dataAvailability: "" },
    ],


    // Conocimiento en IA
    aiKnowledge: "",
    toolsUsed: [],

    // Casos de uso específicos
    documentTasks: [],
    communicationTasks: [],
    analysisTasks: [],
    creativeTasks: [],

    // Evaluación de impacto
    taskPriority: "",
    automationBenefit: "",
    implementationComplexity: "",

    // Roadmap de adopción
    trainingTime: "",
    trainingFormats: [],
  });

  const totalSteps = 8;
  const progress = (currentStep / totalSteps) * 100;

  // Capturar información de empresa desde la URL
  useEffect(() => {
    if (companyId && tkn) {
      console.log("Company ID:", companyId);
      console.log("Token:", tkn);
      const companyData = {
        name: decodeURIComponent(tkn),
        slug: decodeURIComponent(companyId),
      };
      //setCompanyInfo(companyData);
      setFormData((prev) => ({
        ...prev,
        companyName: companyData.name,
        companySlug: companyData.slug,
      }));
    }
  }, []);

  const departments = [
    "Recursos Humanos",
    "Finanzas",
    "Marketing",
    "Ventas",
    "IT",
    "Operaciones",
    "Legal",
    "Compras",
    "Atención al Cliente",
    "Otro",
  ];

  const applicationsByCategory = {
    ERP: [
      "SAP S/4HANA",
      "Oracle E-Business Suite",
      "Microsoft Dynamics 365 F&O",
      "NetSuite",
      "Odoo",
    ],
    CRM: [
      "Salesforce",
      "HubSpot",
      "Microsoft Dynamics 365 CRM",
      "Zoho CRM",
      "Pipedrive",
    ],
    "BI / Analytics": [
      "Power BI",
      "Tableau",
      "Looker / Looker Studio",
      "Qlik Sense",
      "Google Data Studio",
    ],
    "Ofimática & Productividad": [
      "Microsoft Office (Word/Excel/PowerPoint)",
      "Google Workspace (Docs/Sheets/Slides)",
      "LibreOffice",
      "Notion",
    ],
    "Colaboración & Comunicación": [
      "Microsoft Teams",
      "Slack",
      "Google Chat/Meet",
      "Zoom",
      "Trello / Asana",
    ],
    "IA Generativa / Copilots": [
      "ChatGPT",
      "Gemini",
      "Microsoft Copilot (M365)",
      "GitHub Copilot",
      "Midjourney",
    ],
    "Automatización / RPA & No-Code": [
      "UiPath",
      "Power Automate",
      "Zapier",
      "Make (Integromat)",
      "Automation Anywhere",
    ],
    "Bases de Datos / Data Ops": [
      "MySQL / MariaDB",
      "PostgreSQL",
      "SQL Server",
      "BigQuery",
      "Snowflake",
    ],
    "Otra herramienta": ["Otra"], // o puedes dejarlo como campo abierto
  };

  const aiTools = [
    "ChatGPT",
    "GitHub Copilot",
    "Microsoft Copilot",
    "Google Bard",
    "Jasper",
    "Copy.ai",
    "Midjourney",
    "Ninguna",
    "Otra",
  ];

  const documentTasks = [
    "Redacción de emails",
    "Creación de reportes",
    "Revisión de documentos",
    "Traducción de textos",
    "Resúmenes ejecutivos",
    "Presentaciones",
    "Propuestas comerciales",
    "Contratos",
    "Manuales de procedimientos",
  ];

  const communicationTasks = [
    "Respuestas a clientes",
    "Comunicación interna",
    "Social media",
    "Newsletters",
    "Invitaciones a eventos",
    "Seguimiento de leads",
    "Encuestas",
    "Anuncios",
    "Press releases",
  ];

  const analysisTasks = [
    "Análisis de datos",
    "Creación de dashboards",
    "Reportes financieros",
    "Investigación de mercado",
    "Análisis de competencia",
    "KPIs",
    "Forecasting",
    "Análisis de riesgo",
    "Optimización de procesos",
  ];

  const creativeTasks = [
    "Diseño gráfico",
    "Creación de contenido",
    "Videos",
    "Podcasts",
    "Campañas publicitarias",
    "Naming de productos",
    "Storytelling",
    "UX/UI Design",
    "Branding",
  ];

  const trainingFormats = [
    "Videos tutoriales",
    "Workshops presenciales",
    "Micro-learning (lecciones cortas)",
    "Webinars en vivo",
    "Documentación y guías escritas",
    "Mentoring 1-on-1",
    "Cursos online auto-dirigidos",
    "Certificaciones",
    "Comunidades y foros",
    "Hands-on labs / práctica",
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    console.log("formadata updated:",formData);
  };

  const handleTaskChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      mainTasks: prev.mainTasks.map((task, i) => (i === index ? value : task)),
    }));
  };

  const handleTaskDetailChange = (
    taskIndex: number,
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      taskDetails: prev.taskDetails.map((task, i) =>
        i === taskIndex ? { ...task, [field]: value } : task
      ),
    }));
  };

  const handleCheckboxChange = (
    field: string,
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(
            (item) => item !== value
          ),
    }));
  };

  type FormDataType = typeof formData;

  const validateStepCompletion = (
    currentStep: number,
    formData: FormDataType
  ): { valid: boolean; missingFields: string[] } => {
    const missingFields: string[] = [];

    switch (currentStep) {
      case 1: // Información Personal
        if (!formData.name.trim()) missingFields.push("Nombre completo");
        if (!formData.email.trim()) missingFields.push("Email");
        if (!formData.department.trim()) missingFields.push("Departamento");
        if (!formData.role.trim()) missingFields.push("Puesto");
        if (!formData.experience.trim())
          missingFields.push("Años de experiencia");

        if (!formData.totalExperience.trim())
          missingFields.push("Años de experiencia profesional");

        return {
          valid: missingFields.length === 0,
          missingFields,
        };

      case 2: // Inventario de Tareas
        // Contar cuántas tareas tienen contenido (no están vacías después de trim)
        const filledTasksCount = formData.mainTasks.filter(
          (task) => task.trim() !== ""
        ).length;

        if (filledTasksCount < 3) {
          missingFields.push("Se requieren al menos 3 tareas principales");
        }
        if (formData.applicationsUsed.length === 0) {
          missingFields.push("Aplicaciones utilizadas");
        }
        return {
          valid: missingFields.length === 0,
          missingFields,
        };

      default:
        return {
          valid: true,
          missingFields: ["Paso no válido"],
        };
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      const validation = validateStepCompletion(currentStep, formData);
      if (validation.valid) {
        setCurrentStep(currentStep + 1);
      } else {
        toast.error(
          `Por favor completa los siguientes campos: ${validation.missingFields.join(
            ", "
          )}`,
          { position: "top-right", autoClose: 5000 }
        );
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitSurvey = async () => {
    // Crear timestamp para identificar la respuesta
    const timestamp = new Date().toISOString();
    const responseId = `${formData.companySlug || "general"}_${timestamp}`;

    const surveyResponse = {
      ...formData,
      responseId,
      timestamp,
      submittedAt: new Date().toLocaleString("es-MX"),
    };

    // Enviar los datos del cuestionario al servicio

    console.log(
      "Creating survey with data:",
      surveyResponse,
      formData.companySlug
    );

    try {
      await surveyService.createSurvey(surveyResponse, formData.companySlug);

      toast.success("¡Cuestionario enviado exitosamente! 🎉", {
        position: "top-right",
        autoClose: 5000,
      });

      console.log("Survey data:", surveyResponse);

      setCurrentStep(0);
    } catch (error) {
      console.error("Error al enviar el cuestionario:", error);
      toast.error(
        "Ocurrió un error al enviar el cuestionario. Por favor, inténtalo de nuevo más tarde.",
        { position: "top-right", autoClose: 5000 }
      );
      return;
    }
  };

  //new fields
  // Inside your component
  const [showOtherMotivation, setShowOtherMotivation] = useState(false);
  const [otherMotivation, setOtherMotivation] = useState("");

  const handleMotivationChange = (value) => {
    handleInputChange("AI_learning_motivation", value);
    setShowOtherMotivation(value === "5");
    if (value !== "5") {
      setOtherMotivation("");
      handleInputChange("AI_learning_motivation_other", "");
    }
  };

  const handleOtherMotivationChange = (e) => {
    const value = e.target.value;
    setOtherMotivation(value);
    handleInputChange("AI_learning_motivation_other", value);
  };

  


  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <div className="text-center space-y-6">
          <div className="text-6xl">🎉</div>
          <h2 className="text-3xl font-bold text-green-600">
            ¡Gracias por completar el cuestionario!
          </h2>
          {companyInfo.name && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 font-medium">
                📊 Respuesta registrada para:{" "}
                <span className="font-bold">{companyInfo.name}</span>
              </p>
            </div>
          )}
          <p className="text-lg text-gray-600">
            Tus respuestas han sido registradas exitosamente. El equipo de
            directivos podrá revisar la información para desarrollar un plan de
            adopción de IA personalizado.
          </p>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-blue-800 font-medium">
              📧 Te contactaremos pronto con los resultados del análisis y las
              recomendaciones específicas para tu rol.
            </p>
          </div>
        </div>
      );
    }

    // Aquí iría toda la lógica del renderStep original, manteniendo el mismo código
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {companyInfo.name && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-blue-800 mb-2">🏢 Empresa</h3>
                <p className="text-blue-700">{companyInfo.name}</p>
              </div>
            )}

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Información Personal</h2>
              <p className="text-gray-600">
                Cuéntanos sobre tu rol en la organización
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Tu nombre completo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="tu.email@empresa.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Departamento</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("department", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Puesto</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  placeholder="Tu puesto actual"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">
                Años de experiencia en el puesto
              </Label>
              <Select
                onValueChange={(value) =>
                  handleInputChange("experience", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu experiencia" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="0-1">0-1 años</SelectItem>
                  <SelectItem value="2-3">2-3 años</SelectItem>
                  <SelectItem value="4-5">4-5 años</SelectItem>
                  <SelectItem value="6-10">6-10 años</SelectItem>
                  <SelectItem value="10+">Más de 10 años</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">
                Años de experiencia profesional
              </Label>
              <Select
                onValueChange={(value) =>
                  handleInputChange("totalExperience", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu experiencia total" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="0-1">0-1 años</SelectItem>
                  <SelectItem value="2-3">2-3 años</SelectItem>
                  <SelectItem value="4-5">4-5 años</SelectItem>
                  <SelectItem value="6-10">6-10 años</SelectItem>
                  <SelectItem value="10+">Más de 10 años</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Inventario de Tareas</h2>
              <p className="text-gray-600">
                Describe tus 5 tareas principales y herramientas que usas
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-lg font-semibold">
                  1. Describe tus 5 tareas principales:
                </Label>
                {formData.mainTasks.map((task, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`task-${index}`}>Tarea {index + 1}</Label>
                    <Textarea
                      id={`task-${index}`}
                      value={task}
                      onChange={(e) => handleTaskChange(index, e.target.value)}
                      placeholder={`Describe tu tarea principal ${
                        index + 1
                      }...`}
                      rows={3}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">
                  2. ¿Qué aplicaciones usas? (selecciona todas las que apliquen)
                </Label>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {Object.entries(applicationsByCategory).map(
                    ([category, apps]) => (
                      <div key={category} className="space-y-2">
                        <Label className="text-md font-medium text-gray-700">
                          {category}
                        </Label>
                        <div className="grid md:grid-cols-2 gap-3 pl-4">
                          {apps.map((app) => (
                            <div
                              key={app}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={app}
                                checked={formData.applicationsUsed.includes(
                                  app
                                )}
                                onCheckedChange={(checked) =>
                                  handleCheckboxChange(
                                    "applicationsUsed",
                                    app,
                                    checked as boolean
                                  )
                                }
                              />
                              <Label
                                htmlFor={app}
                                className="text-sm whitespace-nowrap"
                              >
                                {app}
                              </Label>

                              {/* Mostrar input junto a "Otra" */}
                              {app === "Otra" &&
                                formData.applicationsUsed.includes("Otra") && (
                             

                                  <Input
                                  className="w-64 mb-2"
                                  id="other-tool"
                                  value={formData.otherToolText}
                                  onChange={(e) => 
                                    handleInputChange("otherToolText", e.target.value)
                                  }
                                  placeholder="Especifica otra herramienta"
                                />
                                )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Viabilidad de Automatización
              </h2>
              <p className="text-gray-600">
                Para cada tarea principal, evalúa su potencial de automatización
              </p>
            </div>

            <div className="space-y-8">
              {formData.mainTasks.map(
                (task, index) =>
                  task && (
                    <div
                      key={index}
                      className="border rounded-lg p-6 bg-gray-50"
                    >
                      <h3 className="font-semibold text-lg mb-4">
                        Tarea {index + 1}: {task.substring(0, 50)}
                        {task.length > 50 ? "..." : ""}
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Frecuencia</Label>
                          <Select
                            onValueChange={(value) =>
                              handleTaskDetailChange(index, "frequency", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona frecuencia" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="1">
                                Ad-hoc (≤1 vez/mes)
                              </SelectItem>
                              <SelectItem value="2">Trimestral</SelectItem>
                              <SelectItem value="3">Mensual</SelectItem>
                              <SelectItem value="4">Semanal</SelectItem>
                              <SelectItem value="5">Diaria</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Nivel de estructuración</Label>
                          <Select
                            onValueChange={(value) =>
                              handleTaskDetailChange(
                                index,
                                "structureLevel",
                                value
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Nivel de estructuración" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">
                                Totalmente ad-hoc (improvisado)
                              </SelectItem>
                              <SelectItem value="2">
                                Guías informales
                              </SelectItem>
                              <SelectItem value="3">
                                Checklist parcial
                              </SelectItem>
                              <SelectItem value="4">
                                Proceso documentado
                              </SelectItem>
                              <SelectItem value="5">
                                Workflow automatizado (RPA/BPM)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Impacto en resultados</Label>
                          <Select
                            onValueChange={(value) =>
                              handleTaskDetailChange(index, "impact", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Nivel de impacto" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">
                                Afecta poco o ningún KPI
                              </SelectItem>
                              <SelectItem value="2">
                                Bajo impacto local
                              </SelectItem>
                              <SelectItem value="3">
                                Impacto moderado en área
                              </SelectItem>
                              <SelectItem value="4">
                                Impacto alto en KPI de negocio
                              </SelectItem>
                              <SelectItem value="5">
                                Crítico para ingresos/cliente
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Disponibilidad de datos</Label>
                          <Select
                            onValueChange={(value) =>
                              handleTaskDetailChange(
                                index,
                                "dataAvailability",
                                value
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Disponibilidad" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">
                                Sin datos o no accesibles
                              </SelectItem>
                              <SelectItem value="2">
                                Datos dispersos/no limpios
                              </SelectItem>
                              <SelectItem value="3">Datos parciales</SelectItem>
                              <SelectItem value="4">
                                Datos completos pero dispersos
                              </SelectItem>
                              <SelectItem value="5">
                                Datos completos y estructurados
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>KPI impactado (marca uno)</Label>
                          <Select
                            onValueChange={(value) =>
                              handleTaskDetailChange(index, "kpiImpact", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Nivel de impacto" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectItem value="1">
                                Incrementar ventas / ingresos
                              </SelectItem>
                              <SelectItem value="2">
                                Reducir costos operativos
                              </SelectItem>
                              <SelectItem value="3">
                                Mejorar satisfacción del cliente (NPS)
                              </SelectItem>
                              <SelectItem value="4">
                                Acelerar tiempo de ciclo / entrega
                              </SelectItem>
                              <SelectItem value="5">
                                Cumplir requisitos regulatorios
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Severidad si la tarea falla</Label>
                          <Select
                            onValueChange={(value) =>
                              handleTaskDetailChange(
                                index,
                                "severityImpact",
                                value
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Nivel de impacto" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Nula</SelectItem>
                              <SelectItem value="2">Menor retrabajo</SelectItem>
                              <SelectItem value="3">
                                Retraso moderado
                              </SelectItem>
                              <SelectItem value="4">
                                Pérdida de clientes / multas menores
                              </SelectItem>
                              <SelectItem value="5">
                                Riesgo reputacional o multas fuertes
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Actitud cultural frente a la IA
              </h2>
              <p className="text-gray-600">
                Como describirías tu interés respecto a la IA
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aiCuriosity">
                  Curiosidad: “Me entusiasma experimentar con IA”
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("aiCuriosity", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      Nunca he buscado información sobre IA.
                    </SelectItem>
                    <SelectItem value="2">
                      He leído un artículo o visto un video, pero no he probado
                      nada.
                    </SelectItem>
                    <SelectItem value="3">
                      He probado un chatbot o generador de imágenes por
                      curiosidad.
                    </SelectItem>
                    <SelectItem value="4">
                      Pruebo nuevas apps IA cada mes y comparto hallazgos con mi
                      equipo.
                    </SelectItem>
                    <SelectItem value="5">
                      Prototipo regularmente y enseño a otros (ej.: hackathons
                      internos).
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aiCaution">
                  Cautela: “Prefiero esperar a que otros validen la IA”
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("aiCaution", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      No me preocupa el riesgo; usaría cualquier app sin
                      validar.
                    </SelectItem>
                    <SelectItem value="2">
                      Alguna vez pregunto sobre seguridad, pero no profundizo.
                    </SelectItem>
                    <SelectItem value="3">
                      Reviso referencias o políticas básicas antes de usar IA.
                    </SelectItem>
                    <SelectItem value="4">
                      Solicito pruebas piloto y aprobación de TI antes de
                      adoptar una herramienta.
                    </SelectItem>
                    <SelectItem value="5">
                      Participo en comités de riesgo y elaboro checklists
                      formales.
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aiResistance">
                  Resistencia: “La IA amenaza mi rol”
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("aiResistance", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      En absoluto; veo la IA como aliada.
                    </SelectItem>
                    <SelectItem value="2">
                      Tengo mínimos temores, pero no afectan mi adopción.
                    </SelectItem>
                    <SelectItem value="3">
                      Mi entusiasmo y mi preocupación están equilibrados.
                    </SelectItem>
                    <SelectItem value="4">
                      Evito usar IA salvo que sea obligatorio.
                    </SelectItem>
                    <SelectItem value="5">
                      Rechazo activamente proyectos de IA o bloqueo su adopción.
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Conocimiento en IA</h2>
              <p className="text-gray-600">
                Autoevalúa tu dominio y el uso que haces de la IA
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aiBasicKnowledge
                ">Conceptos básicos</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("aiBasicKnowledge", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      No conozco términos de IA.
                    </SelectItem>
                    <SelectItem value="2">
                      Sé que existen “modelos” pero no cómo funcionan.
                    </SelectItem>

                    <SelectItem value="3">
                      Puedo explicar IA vs. ML y citar ejemplos.
                    </SelectItem>
                    <SelectItem value="4">
                      Explico pipelines de datos-modelo-despliegue.
                    </SelectItem>
                    <SelectItem value="5">
                      Diseño arquitecturas con LLM, RAG, vectores, etc.
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aiKnowledgePromptDesign">Diseño de prompts</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("aiKnowledgePromptDesign", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      No estoy familiarizado con la tarea
                    </SelectItem>
                    <SelectItem value="2">
                      Ajusto palabras clave al azar.
                    </SelectItem>
                    <SelectItem value="3">
                      Sigo buenas prácticas básicas (rol + tarea).
                    </SelectItem>
                    <SelectItem value="4">
                      Creo prompts multi-paso con ejemplos y formato esperado.
                    </SelectItem>
                    <SelectItem value="5">
                      Construyo árboles de prompts y evalúo output
                      sistemáticamente.
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aiKnowledgeIntegration">Integración en flujos</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("aiKnowledgeIntegration", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Nunca he integrado IA.</SelectItem>
                    <SelectItem value="2">
                      Uso IA en tareas personales (p. ej. mails).
                    </SelectItem>
                    <SelectItem value="3">
                      Conecto IA a archivos o al navegador con extensiones.
                    </SelectItem>
                    <SelectItem value="4">
                      Uso APIs/no-code para automatizar un proceso de mi área.
                    </SelectItem>
                    <SelectItem value="5">
                      Desarrollo scripts o micro-servicios con IA en producción.
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aiKnowledgeRiskAssessment">Evaluación de riesgo</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("aiKnowledgeRiskAssessment", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      Desconozco el concepto de sesgo/privacidad.
                    </SelectItem>
                    <SelectItem value="2">
                      He oído de sesgo, no sé mitigarlo.
                    </SelectItem>
                    <SelectItem value="3">
                      Reviso outputs manualmente para detectar problemas.
                    </SelectItem>
                    <SelectItem value="4">
                      Uso listas de chequeo y métricas de calidad.
                    </SelectItem>
                    <SelectItem value="5">
                      Implemento auditorías, fairness, privacy-by-design.
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aiKnowledgeUsageFrequency">Frecuencia de uso</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("aiKnowledgeUsageFrequency", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Nunca la he usado</SelectItem>
                    <SelectItem value="2">Ad-hoc (≤1 vez/mes).</SelectItem>
                    <SelectItem value="3">Mensual.</SelectItem>
                    <SelectItem value="4">Semanal.</SelectItem>
                    <SelectItem value="5">Varias veces por semana.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Gobierno y ética de IA (Organización)
              </h2>
              <p className="text-gray-600">
                En tu experiencia en la empresa, cual es la situación actual de
                las siguientes áreas respecto a la IA
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aiPolicy">Política de IA responsable</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("aiPolicy", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      No existen reglas sobre el uso de IA.
                    </SelectItem>
                    <SelectItem value="2">
                      Hemos hablado del tema, pero nada está escrito.
                    </SelectItem>
                    <SelectItem value="3">
                      Hay un borrador de reglas que se está revisando.
                    </SelectItem>
                    <SelectItem value="4">
                      La política está aprobada y la gente la conoce.
                    </SelectItem>
                    <SelectItem value="5">
                      La política se revisa con frecuencia y un equipo vigila su
                      cumplimiento.
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aiDataGovernance">Gobierno de datos</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("aiDataGovernance", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      Nadie es responsable de los datos.
                    </SelectItem>
                    <SelectItem value="2">
                      Algunas personas cuidan datos, pero sin roles claros ni
                      revisiones.{" "}
                    </SelectItem>
                    <SelectItem value="3">
                      Se nombraron responsables y se limpian los datos cuando
                      hace falta.
                    </SelectItem>
                    <SelectItem value="4">
                      Hay reglas claras y se revisa la calidad de los datos con
                      regularidad.
                    </SelectItem>
                    <SelectItem value="5">
                      Tenemos inventario de datos y monitoreamos calidad todo el
                      tiempo.
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aiSecurityPrivacy">Seguridad & privacidad</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("aiSecurityPrivacy", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      No hay controles; cualquiera puede ver o copiar la
                      información.
                    </SelectItem>
                    <SelectItem value="2">
                      Contraseñas básicas; a veces marcamos documentos como
                      “confidencial”.
                    </SelectItem>
                    <SelectItem value="3">
                      Controles básicos de TI (antivirus, contraseñas); sin
                      revisiones formales.
                    </SelectItem>
                    <SelectItem value="4">
                      Cumplimos políticas internas: copias de seguridad, accesos
                      limitados.
                    </SelectItem>
                    <SelectItem value="5">
                      Pasamos auditorías externas y protegemos datos de acuerdo
                      con leyes de privacidad.
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Evaluación de Impacto</h2>
              <p className="text-gray-600">
                Ayúdanos a priorizar la automatización de tus tareas
              </p>
            </div>
            {formData.mainTasks.map(
              (task, index) =>
                task && (
                  <div key={index} className="border rounded-lg p-6 bg-gray-50">
                    <h3 className="font-semibold text-lg mb-6">
                      Evaluación de Impacto - Tarea {index + 1}:{" "}
                      {task.substring(0, 50)}
                      {task.length > 50 ? "..." : ""}
                    </h3>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Prioridad de automatización</Label>
                        <Select
                          onValueChange={(value) =>
                            handleTaskDetailChange(
                              index,
                              "automationPriority",
                              value
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona la prioridad" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">
                            Puede esperar. Si no se hace, nada grave ocurre en los próximos 2 años.
                            </SelectItem>
                            <SelectItem value="2">
                            Sería útil: Aporta valor, pero podemos dejarlo para dentro de 1 a 1½ años.
                            </SelectItem>
                            <SelectItem value="3">
                            Necesario: Conviene resolverlo antes de que acabe el año.
                            </SelectItem>
                            <SelectItem value="4">
                            Urgente: Retrasar más de 3-6 meses nos costará dinero o clientes.
                            </SelectItem>
                            <SelectItem value="5">
                            Crítico: Debemos atenderlo de inmediato; afecta operación o cumplimiento.
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Tiempo que podrías ahorrar</Label>
                        <Select
                          onValueChange={(value) =>
                            handleTaskDetailChange(index, "timeSaved", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Estima el tiempo ahorrado" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="<1">
                              &lt; 1 h por semana
                            </SelectItem>
                            <SelectItem value="1-5">
                              1-5 horas por semana
                            </SelectItem>
                            <SelectItem value="6-10">
                              6-10 horas por semana
                            </SelectItem>
                            <SelectItem value="11-20">
                              11-20 horas por semana
                            </SelectItem>
                            <SelectItem value="20+">
                              Más de 20 horas por semana
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Complejidad de implementación</Label>
                        <Select
                          onValueChange={(value) =>
                            handleTaskDetailChange(
                              index,
                              "implementationComplexity",
                              value
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Evalúa la complejidad" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="1">
                              Muy fácil: Se resuelve con un click o activando una
                              opción.
                            </SelectItem>
                            <SelectItem value="2">
                              Fácil: Requiere una simple configuración, sin
                              ayuda de TI.
                            </SelectItem>
                            <SelectItem value="3">
                              Moderada: Necesita conectar una API o ajustar un
                              flujo con soporte de TI.
                            </SelectItem>
                            <SelectItem value="4">
                              Complicada: Implica desarrollar código nuevo y
                              hacer pruebas formales.
                            </SelectItem>
                            <SelectItem value="5">
                              Muy complicada: Exige rediseñar procesos y tocar
                              varios sistemas críticos.
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Roadmap de Adopción (Disponibilidad y Apoyo para tu Capacitación en IA)</h2>
              <p className="text-gray-600">
              Cuéntanos cuántas horas puedes dedicar cada semana, qué te impulsa a aprender y qué respaldo recibes de tu líder. Con estos datos crearemos un plan de formación realista y alineado a tus necesidades.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="trainingTime">
                  ¿Cuánto tiempo semanal podrías dedicar a formación en IA?
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("trainingTime", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tiempo disponible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 hora por semana</SelectItem>
                    <SelectItem value="1-3">1-3 horas por semana</SelectItem>
                    <SelectItem value="4-6">4-6 horas por semana</SelectItem>
                    <SelectItem value="7-10">7-10 horas por semana</SelectItem>
                    <SelectItem value="10+">
                      Más de 10 horas por semana
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>
                  Marca los formatos de entrenamiento preferidos (selecciona
                  todos los que te interesen):
                </Label>
                <div className="grid md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {trainingFormats.map((format) => (
                    <div key={format} className="flex items-center space-x-2">
                      <Checkbox
                        id={format}
                        checked={formData.trainingFormats.includes(format)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "trainingFormats",
                            format,
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor={format} className="text-sm">
                        {format}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="trainingTime">
                  Motivación principal para aprender IA
                </Label>
                <Select onValueChange={handleMotivationChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tiempo disponible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Desarrollo profesional</SelectItem>
                    <SelectItem value="2">Eficiencia operativa</SelectItem>
                    <SelectItem value="3">Curiosidad/Innovación</SelectItem>
                    <SelectItem value="4">
                      Cumplir regulaciones y seguridad
                    </SelectItem>
                    <SelectItem value="5">Otro</SelectItem>
                  </SelectContent>
                </Select>

                {showOtherMotivation && (
                  <div className="mt-2">
                    <Label htmlFor="otherMotivation">
                      Especifica tu motivación
                    </Label>
                    <input
                      type="text"
                      id="otherMotivation"
                      value={otherMotivation}
                      onChange={handleOtherMotivationChange}
                      className="w-full p-2 border rounded"
                      placeholder="Por favor, especifica tu motivación"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="trainingTime">
                  Apoyo de tu líder para dedicar tiempo a IA
                </Label>

                <Select
                  onValueChange={(value) =>
                    handleInputChange("AI_learning_leader_support", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el apoyo de tu líder" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      Sin Apoyo: Mi líder no autoriza tiempo de capacitación.
                    </SelectItem>
                    <SelectItem value="2">
                      Interés verbal: Revela interés, pero sin tiempo asignado.
                    </SelectItem>
                    <SelectItem value="3">
                      Apoyo puntual: Permite asistir a 1-2 cursos al año.
                    </SelectItem>
                    <SelectItem value="4">
                      Apoyo Activo: Autoriza horas semanales y financia cursos
                      clave.
                    </SelectItem>
                    <SelectItem value="5">
                      Apoyo estratégico: Incluye IA en OKRs, presupuesto y
                      tiempo dedicados.
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Paso en desarrollo...</div>;
    }
  };

  return (
    <SurveyLayout>
      <ToastContainer />
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-2xl">
              Cuestionario de Diagnóstico IA
            </CardTitle>
            {currentStep > 0 && (
              <span className="text-sm text-gray-500">
                Paso {currentStep} de {totalSteps}
              </span>
            )}
          </div>
          {currentStep > 0 && <Progress value={progress} className="w-full" />}
        </CardHeader>

        <CardContent>
          {renderStep()}

          {currentStep > 0 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Anterior
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  onClick={() => {
                    const validation = validateStepCompletion(
                      currentStep,
                      formData
                    );
                    if (validation.valid) {
                      submitSurvey();
                    } else {
                      toast.error(
                        `Por favor completa los siguientes campos: ${validation.missingFields.join(
                          ", "
                        )}`,
                        { position: "top-right", autoClose: 5000 }
                      );
                    }
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Completar Cuestionario
                </Button>
              ) : (
                <Button onClick={nextStep}>Siguiente</Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </SurveyLayout>
  );
};

export default StandaloneSurvey;
