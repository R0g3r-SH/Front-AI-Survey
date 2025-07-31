// surveyMappings.js

export const questionAnswerMaps = {
  // Step 1: Información Personal
  experience: {
    questionText: "Años de experiencia en el puesto",
    valueToText: {
      "0-1": "0-1 años",
      "2-3": "2-3 años",
      "4-5": "4-5 años",
      "6-10": "6-10 años",
      "10+": "Más de 10 años"
    }
  },

  totalExperience: {
    questionText: "Años de experiencia profesional",
    valueToText: {
      "0-1": "0-1 años",
      "2-3": "2-3 años",
      "4-5": "4-5 años",
      "6-10": "6-10 años",
      "10+": "Más de 10 años"
    }
  },

  // Step 3: Viabilidad de Automatización
  frequency: {
    questionText: "Frecuencia",
    valueToText: {
      "1": "Ad-hoc (≤1 vez/mes)",
      "2": "Trimestral",
      "3": "Mensual",
      "4": "Semanal",
      "5": "Diaria"
    }
  },

  structureLevel: {
    questionText: "Nivel de estructuración",
    valueToText: {
      "1": "Totalmente ad-hoc (improvisado)",
      "2": "Guías informales",
      "3": "Checklist parcial",
      "4": "Proceso documentado",
      "5": "Workflow automatizado (RPA/BPM)"
    }
  },

  impact: {
    questionText: "Impacto en resultados",
    valueToText: {
      "1": "Afecta poco o ningún KPI",
      "2": "Bajo impacto local",
      "3": "Impacto moderado en área",
      "4": "Impacto alto en KPI de negocio",
      "5": "Crítico para ingresos/cliente"
    }
  },

  dataAvailability: {
    questionText: "Disponibilidad de datos",
    valueToText: {
      "1": "Sin datos o no accesibles",
      "2": "Datos dispersos/no limpios",
      "3": "Datos parciales",
      "4": "Datos completos pero dispersos",
      "5": "Datos completos y estructurados"
    }
  },

  kpiImpact: {
    questionText: "KPI impactado",
    valueToText: {
      "1": "Incrementar ventas / ingresos",
      "2": "Reducir costos operativos",
      "3": "Mejorar satisfacción del cliente (NPS)",
      "4": "Acelerar tiempo de ciclo / entrega",
      "5": "Cumplir requisitos regulatorios"
    }
  },

  severityImpact: {
    questionText: "Severidad si la tarea falla",
    valueToText: {
      "1": "Nula",
      "2": "Menor retrabajo",
      "3": "Retraso moderado",
      "4": "Pérdida de clientes / multas menores",
      "5": "Riesgo reputacional o multas fuertes"
    }
  },

  // Step 4: Actitud cultural frente a la IA
  aiCuriosity: {
    questionText: "Curiosidad: 'Me entusiasma experimentar con IA'",
    valueToText: {
      "1": "Nunca he buscado información sobre IA.",
      "2": "He leído un artículo o visto un video, pero no he probado nada.",
      "3": "He probado un chatbot o generador de imágenes por curiosidad.",
      "4": "Pruebo nuevas apps IA cada mes y comparto hallazgos con mi equipo.",
      "5": "Prototipo regularmente y enseño a otros (ej.: hackathons internos)."
    }
  },

  aiCaution: {
    questionText: "Cautela: 'Prefiero esperar a que otros validen la IA'",
    valueToText: {
      "1": "No me preocupa el riesgo; usaría cualquier app sin validar.",
      "2": "Alguna vez pregunto sobre seguridad, pero no profundizo.",
      "3": "Reviso referencias o políticas básicas antes de usar IA.",
      "4": "Solicito pruebas piloto y aprobación de TI antes de adoptar una herramienta.",
      "5": "Participo en comités de riesgo y elaboro checklists formales."
    }
  },

  aiResistance: {
    questionText: "Resistencia: 'La IA amenaza mi rol'",
    valueToText: {
      "1": "En absoluto; veo la IA como aliada.",
      "2": "Tengo mínimos temores, pero no afectan mi adopción.",
      "3": "Mi entusiasmo y mi preocupación están equilibrados.",
      "4": "Evito usar IA salvo que sea obligatorio.",
      "5": "Rechazo activamente proyectos de IA o bloqueo su adopción."
    }
  },

  // Step 5: Conocimiento en IA
  aiBasicKnowledge: {
    questionText: "Conceptos básicos",
    valueToText: {
      "1": "No conozco términos de IA.",
      "2": "Sé que existen 'modelos' pero no cómo funcionan.",
      "3": "Puedo explicar IA vs. ML y citar ejemplos.",
      "4": "Explico pipelines de datos-modelo-despliegue.",
      "5": "Diseño arquitecturas con LLM, RAG, vectores, etc."
    }
  },

  aiKnowledgePromptDesign: {
    questionText: "Diseño de prompts",
    valueToText: {
      "1": "No estoy familiarizado con la tarea",
      "2": "Ajusto palabras clave al azar.",
      "3": "Sigo buenas prácticas básicas (rol + tarea).",
      "4": "Creo prompts multi-paso con ejemplos y formato esperado.",
      "5": "Construyo árboles de prompts y evalúo output sistemáticamente."
    }
  },

  aiKnowledgeIntegration: {
    questionText: "Integración en flujos",
    valueToText: {
      "1": "Nunca he integrado IA.",
      "2": "Uso IA en tareas personales (p. ej. mails).",
      "3": "Conecto IA a archivos o al navegador con extensiones.",
      "4": "Uso APIs/no-code para automatizar un proceso de mi área.",
      "5": "Desarrollo scripts o micro-servicios con IA en producción."
    }
  },

  aiKnowledgeRiskAssessment: {
    questionText: "Evaluación de riesgo",
    valueToText: {
      "1": "Desconozco el concepto de sesgo/privacidad.",
      "2": "He oído de sesgo, no sé mitigarlo.",
      "3": "Reviso outputs manualmente para detectar problemas.",
      "4": "Uso listas de chequeo y métricas de calidad.",
      "5": "Implemento auditorías, fairness, privacy-by-design."
    }
  },

  aiKnowledgeUsageFrequency: {
    questionText: "Frecuencia de uso",
    valueToText: {
      "1": "Nunca la he usado",
      "2": "Ad-hoc (≤1 vez/mes).",
      "3": "Mensual.",
      "4": "Semanal.",
      "5": "Varias veces por semana."
    }
  },

  // Step 6: Gobierno y ética de IA (Organización)
  aiPolicy: {
    questionText: "Política de IA responsable",
    valueToText: {
      "1": "No existen reglas sobre el uso de IA.",
      "2": "Hemos hablado del tema, pero nada está escrito.",
      "3": "Hay un borrador de reglas que se está revisando.",
      "4": "La política está aprobada y la gente la conoce.",
      "5": "La política se revisa con frecuencia y un equipo vigila su cumplimiento."
    }
  },

  aiDataGovernance: {
    questionText: "Gobierno de datos",
    valueToText: {
      "1": "Nadie es responsable de los datos.",
      "2": "Algunas personas cuidan datos, pero sin roles claros ni revisiones.",
      "3": "Se nombraron responsables y se limpian los datos cuando hace falta.",
      "4": "Hay reglas claras y se revisa la calidad de los datos con regularidad.",
      "5": "Tenemos inventario de datos y monitoreamos calidad todo el tiempo."
    }
  },

  aiSecurityPrivacy: {
    questionText: "Seguridad & privacidad",
    valueToText: {
      "1": "No hay controles; cualquiera puede ver o copiar la información.",
      "2": "Contraseñas básicas; a veces marcamos documentos como 'confidencial'.",
      "3": "Controles básicos de TI (antivirus, contraseñas); sin revisiones formales.",
      "4": "Cumplimos políticas internas: copias de seguridad, accesos limitados.",
      "5": "Pasamos auditorías externas y protegemos datos de acuerdo con leyes de privacidad."
    }
  },

  // Step 7: Evaluación de Impacto
  automationPriority: {
    questionText: "Prioridad de automatización",
    valueToText: {
      "1": "Puede esperar. Si no se hace, nada grave ocurre en los próximos 2 años.",
      "2": "Sería útil: Aporta valor, pero podemos dejarlo para dentro de 1 a 1½ años.",
      "3": "Necesario: Conviene resolverlo antes de que acabe el año.",
      "4": "Urgente: Retrasar más de 3-6 meses nos costará dinero o clientes.",
      "5": "Crítico: Debemos atenderlo de inmediato; afecta operación o cumplimiento."
    }
  },

  timeSaved: {
    questionText: "Tiempo que podrías ahorrar",
    valueToText: {
      "<1": "< 1 h por semana",
      "1-5": "1-5 horas por semana",
      "6-10": "6-10 horas por semana",
      "11-20": "11-20 horas por semana",
      "20+": "Más de 20 horas por semana"
    }
  },

  implementationComplexity: {
    questionText: "Complejidad de implementación",
    valueToText: {
      "1": "Muy fácil: Se resuelve con un click o activando una opción.",
      "2": "Fácil: Requiere una simple configuración, sin ayuda de TI.",
      "3": "Moderada: Necesita conectar una API o ajustar un flujo con soporte de TI.",
      "4": "Complicada: Implica desarrollar código nuevo y hacer pruebas formales.",
      "5": "Muy complicada: Exige rediseñar procesos y tocar varios sistemas críticos."
    }
  },

  // Step 8: Roadmap de Adopción
  trainingTime: {
    questionText: "Tiempo semanal para formación en IA",
    valueToText: {
      "0-1": "0-1 hora por semana",
      "1-3": "1-3 horas por semana",
      "4-6": "4-6 horas por semana",
      "7-10": "7-10 horas por semana",
      "10+": "Más de 10 horas por semana"
    }
  },

  AI_learning_motivation: {
    questionText: "Motivación principal para aprender IA",
    valueToText: {
      "1": "Desarrollo profesional",
      "2": "Eficiencia operativa",
      "3": "Curiosidad/Innovación",
      "4": "Cumplir regulaciones y seguridad",
      "5": "Otro"
    }
  },

  AI_learning_leader_support: {
    questionText: "Apoyo de tu líder para dedicar tiempo a IA",
    valueToText: {
      "1": "Sin Apoyo: Mi líder no autoriza tiempo de capacitación.",
      "2": "Interés verbal: Revela interés, pero sin tiempo asignado.",
      "3": "Apoyo puntual: Permite asistir a 1-2 cursos al año.",
      "4": "Apoyo Activo: Autoriza horas semanales y financia cursos clave.",
      "5": "Apoyo estratégico: Incluye IA en OKRs, presupuesto y tiempo dedicados."
    }
  }
};

// Helper Functions

/**
 * Get the display text for a specific answer value
 * @param {string} questionKey - The question identifier
 * @param {string} value - The answer value
 * @returns {string} The display text
 */
export const getAnswerText = (questionKey, value) => {
  return questionAnswerMaps[questionKey]?.valueToText[value] || "";
};