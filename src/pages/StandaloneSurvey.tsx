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

    // Inventario de tareas
    mainTasks: ["", "", "", "", ""],
    applicationsUsed: [],

    // Viabilidad de automatización para cada tarea
    taskDetails: [
      { frequency: "", structureLevel: "", impact: "", dataAvailability: "" },
      { frequency: "", structureLevel: "", impact: "", dataAvailability: "" },
      { frequency: "", structureLevel: "", impact: "", dataAvailability: "" },
      { frequency: "", structureLevel: "", impact: "", dataAvailability: "" },
      { frequency: "", structureLevel: "", impact: "", dataAvailability: "" },
    ],

    // Tareas actuales (mantener para compatibilidad)
    dailyTasks: "",
    timeConsumingTasks: "",
    repetitiveTasks: "",

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

  const { toast } = useToast();
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

  const applications = [
    "Microsoft Office (Word, Excel, PowerPoint)",
    "Google Workspace (Docs, Sheets, Slides)",
    "Outlook / Gmail",
    "Microsoft Teams / Slack",
    "Salesforce",
    "SAP",
    "Oracle",
    "HubSpot",
    "Zendesk",
    "Jira",
    "Notion",
    "Trello / Asana",
    "Adobe Creative Suite",
    "AutoCAD",
    "Tableau / Power BI",
    "Zoom / Meet",
    "SharePoint",
    "OneDrive / Google Drive",
    "Otra",
  ];

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

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
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

    console.log("Creating survey with data:", surveyResponse , formData.companySlug);


    try {
      
      await surveyService.createSurvey(surveyResponse, formData.companySlug);

      toast({
        title: "¡Cuestionario completado!",
        description: `Tus respuestas han sido guardadas exitosamente${
          companyInfo.name ? ` para ${companyInfo.name}` : ""
        }.`,
      });

      console.log("Survey data:", surveyResponse);

      setCurrentStep(0);
    } catch (error) {
      console.error("Error al enviar el cuestionario:", error);
      toast({
        title: "Error",
        description:
          "No se pudo enviar el cuestionario. Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
      return;
    }
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
                <div className="grid md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {applications.map((app) => (
                    <div key={app} className="flex items-center space-x-2">
                      <Checkbox
                        id={app}
                        checked={formData.applicationsUsed.includes(app)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "applicationsUsed",
                            app,
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor={app} className="text-sm">
                        {app}
                      </Label>
                    </div>
                  ))}
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
                              <SelectItem value="diaria">Diaria</SelectItem>
                              <SelectItem value="semanal">Semanal</SelectItem>
                              <SelectItem value="mensual">Mensual</SelectItem>
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
                              <SelectValue placeholder="Nivel de estructura" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="muy-estructurada">
                                Muy estructurada
                              </SelectItem>
                              <SelectItem value="parcial">Parcial</SelectItem>
                              <SelectItem value="no-estructurada">
                                No estructurada
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
                              <SelectItem value="alto">Alto</SelectItem>
                              <SelectItem value="medio">Medio</SelectItem>
                              <SelectItem value="bajo">Bajo</SelectItem>
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
                              <SelectItem value="si">Sí</SelectItem>
                              <SelectItem value="parcial">Parcial</SelectItem>
                              <SelectItem value="no">No</SelectItem>
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
                Tareas Diarias Adicionales
              </h2>
              <p className="text-gray-600">
                Describe otras actividades que realizas habitualmente
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="dailyTasks">
                  ¿Cuáles son otras tareas diarias importantes?
                </Label>
                <Textarea
                  id="dailyTasks"
                  value={formData.dailyTasks}
                  onChange={(e) =>
                    handleInputChange("dailyTasks", e.target.value)
                  }
                  placeholder="Describe otras actividades que realizas día a día..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeConsumingTasks">
                  ¿Qué tareas te consumen más tiempo?
                </Label>
                <Textarea
                  id="timeConsumingTasks"
                  value={formData.timeConsumingTasks}
                  onChange={(e) =>
                    handleInputChange("timeConsumingTasks", e.target.value)
                  }
                  placeholder="Identifica las actividades que más tiempo te toman..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="repetitiveTasks">
                  ¿Tienes tareas repetitivas que haces frecuentemente?
                </Label>
                <Textarea
                  id="repetitiveTasks"
                  value={formData.repetitiveTasks}
                  onChange={(e) =>
                    handleInputChange("repetitiveTasks", e.target.value)
                  }
                  placeholder="Describe las tareas que repites con frecuencia..."
                  rows={4}
                />
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
                Evalúa tu experiencia actual con herramientas de IA
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aiKnowledge">
                  ¿Cuál es tu nivel de conocimiento en IA?
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("aiKnowledge", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="principiante">
                      Principiante - Nunca he usado IA
                    </SelectItem>
                    <SelectItem value="basico">
                      Básico - He probado algunas herramientas
                    </SelectItem>
                    <SelectItem value="intermedio">
                      Intermedio - Uso regularmente algunas herramientas
                    </SelectItem>
                    <SelectItem value="avanzado">
                      Avanzado - Integro IA en mi trabajo diario
                    </SelectItem>
                    <SelectItem value="experto">
                      Experto - Desarrollo soluciones con IA
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>
                  ¿Qué herramientas de IA has usado? (selecciona todas las que
                  apliquen)
                </Label>
                <div className="grid md:grid-cols-3 gap-3">
                  {aiTools.map((tool) => (
                    <div key={tool} className="flex items-center space-x-2">
                      <Checkbox
                        id={tool}
                        checked={formData.toolsUsed.includes(tool)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "toolsUsed",
                            tool,
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor={tool} className="text-sm">
                        {tool}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Casos de Uso Específicos
              </h2>
              <p className="text-gray-600">
                Identifica qué tareas podrían automatizarse con IA
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                  📄 Tareas de Documentación
                </h3>
                <div className="space-y-2">
                  {documentTasks.map((task) => (
                    <div key={task} className="flex items-center space-x-2">
                      <Checkbox
                        id={`doc-${task}`}
                        checked={formData.documentTasks.includes(task)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "documentTasks",
                            task,
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor={`doc-${task}`} className="text-sm">
                        {task}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                  💬 Tareas de Comunicación
                </h3>
                <div className="space-y-2">
                  {communicationTasks.map((task) => (
                    <div key={task} className="flex items-center space-x-2">
                      <Checkbox
                        id={`comm-${task}`}
                        checked={formData.communicationTasks.includes(task)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "communicationTasks",
                            task,
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor={`comm-${task}`} className="text-sm">
                        {task}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">📊 Tareas de Análisis</h3>
                <div className="space-y-2">
                  {analysisTasks.map((task) => (
                    <div key={task} className="flex items-center space-x-2">
                      <Checkbox
                        id={`analysis-${task}`}
                        checked={formData.analysisTasks.includes(task)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "analysisTasks",
                            task,
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor={`analysis-${task}`} className="text-sm">
                        {task}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">🎨 Tareas Creativas</h3>
                <div className="space-y-2">
                  {creativeTasks.map((task) => (
                    <div key={task} className="flex items-center space-x-2">
                      <Checkbox
                        id={`creative-${task}`}
                        checked={formData.creativeTasks.includes(task)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "creativeTasks",
                            task,
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor={`creative-${task}`} className="text-sm">
                        {task}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Evaluación de Impacto</h2>
              <p className="text-gray-600">
                Ayúdanos a priorizar las implementaciones
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="taskPriority">
                  ¿Cuál es la prioridad de automatizar tus tareas?
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("taskPriority", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alta">
                      Alta - Es urgente y crítico
                    </SelectItem>
                    <SelectItem value="media">
                      Media - Sería muy útil
                    </SelectItem>
                    <SelectItem value="baja">
                      Baja - No es prioritario
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="automationBenefit">
                  ¿Cuánto tiempo podrías ahorrar con automatización?
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("automationBenefit", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Estima el tiempo ahorrado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1-5 horas por semana</SelectItem>
                    <SelectItem value="6-10">6-10 horas por semana</SelectItem>
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
                <Label htmlFor="implementationComplexity">
                  ¿Qué tan complejo sería implementar estas automatizaciones?
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("implementationComplexity", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Evalúa la complejidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baja">
                      Baja - Herramientas existentes
                    </SelectItem>
                    <SelectItem value="media">
                      Media - Requiere configuración
                    </SelectItem>
                    <SelectItem value="alta">
                      Alta - Desarrollo personalizado
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Roadmap de Adopción</h2>
              <p className="text-gray-600">
                Evalúa tu disposición al cambio y necesidades de capacitación
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
                    <SelectItem value="0-1h">0-1 hora por semana</SelectItem>
                    <SelectItem value="1-3h">1-3 horas por semana</SelectItem>
                    <SelectItem value="3h+">
                      Más de 3 horas por semana
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
            </div>
          </div>
        );

      default:
        return <div>Paso en desarrollo...</div>;
    }
  };

  return (
    <SurveyLayout>
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
                  onClick={submitSurvey}
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
