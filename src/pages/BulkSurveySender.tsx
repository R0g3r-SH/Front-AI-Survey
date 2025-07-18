import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import NavigationD from "@/components/NavigationD";
import { useState, useCallback } from "react";
import { UploadCloud, FileText, X, CheckCircle, Download } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { companyService } from "@/services/companyService";
import { surveyService } from "@/services/surveyService";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BulkSurveySender = () => {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState("todas");
  const [companies, setCompanies] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      if (
        selectedFile.type === "text/csv" ||
        selectedFile.name.endsWith(".csv")
      ) {
        if (selectedFile.size > 5 * 1024 * 1024) {
          toast.error("El archivo excede el límite de 5MB", {
            position: "top-center",
            autoClose: 3000,
          });
          return;
        }
        setFile(selectedFile);
        setUploadSuccess(false);
        toast.success("Archivo CSV cargado correctamente", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.error("Por favor sube un archivo CSV válido", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeFile = () => {
    setFile(null);
    toast.info("Archivo removido", {
      position: "top-center",
      autoClose: 1500,
    });
  };

  const downloadTemplate = () => {
    // Crear contenido CSV
    const csvContent = "email,nombre,role\n" +
      "ejemplo1@empresa.com,Juan Pérez,Gerente\n" +
      "ejemplo2@empresa.com,María González,Supervisor\n" +
      "ejemplo3@empresa.com,Carlos López,Analista";

    // Crear blob y enlace de descarga
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "plantilla_encuestas.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Plantilla descargada correctamente", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const resetForm = () => {
    setFile(null);
    setSelectedCompany("todas");
    setUploadSuccess(false);
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Por favor selecciona un archivo CSV", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (selectedCompany === "todas") {
      toast.error("Por favor selecciona una empresa", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setIsUploading(true);
    try {
      await surveyService.bulkUpload(file, selectedCompany);
      
      setUploadSuccess(true);
      toast.success("¡Procesamiento iniciado con éxito! Los emails se están enviando.", {
        position: "top-center",
        autoClose: 5000,
      });
      
      // Resetear después de 3 segundos
      setTimeout(resetForm, 3000);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Error al procesar el archivo: " + (error as Error).message, {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Cargar empresas disponibles
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const companiesData = await companyService.getAllCompanies();
        if (companiesData) {
          setCompanies(companiesData);
        }
      } catch (error) {
        toast.error("Error al cargar las empresas", {
          position: "top-center",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCompanyDetails = (companyId: string) => {
    const company = companies.find((c) => c._id === companyId);
    return company ? company : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-sans">
      <NavigationD />
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
 
          <h1 className="text-4xl font-bold text-gray-800 mb-4 ">
            Envío Masivo de Cuestionarios
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Sube un archivo CSV con los datos de los contactos para enviar
            cuestionarios masivamente de manera eficiente.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800 ">
              Configuración del Envío Masivo
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Sección de selección de empresa */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Seleccionar Empresa Destino
              </h3>
              <Select 
                value={selectedCompany} 
                onValueChange={setSelectedCompany}
                disabled={isUploading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una empresa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">
                    <span className="flex items-center gap-2">
                      <span>📊</span> Seleccione una empresa
                    </span>
                  </SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company._id} value={company._id}>
                      <span className="flex items-center gap-2">
                        <span>🏢</span> {company.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Detalles de la empresa seleccionada */}
            {selectedCompany !== "todas" && (
              <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-3 flex items-center gap-2 text-lg">
                  <span>📋</span>
                  {getCompanyDetails(selectedCompany)?.name}
                </h3>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-blue-600 font-medium">
                        URL del Cuestionario
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            getCompanyDetails(selectedCompany)?.survey_url || ""
                          );
                          toast.success("¡URL copiado al portapapeles!", {
                            position: "top-center",
                            autoClose: 2000,
                          });
                        }}
                        className="text-xs bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded text-blue-700 flex items-center gap-1 transition-colors"
                      >
                        <span>📋</span> Copiar
                      </button>
                    </div>
                    <p className="bg-white p-2 rounded text-sm break-all font-mono">
                      {getCompanyDetails(selectedCompany)?.survey_url || "-"}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm text-blue-600 font-medium">
                      ✉️ Email de Notificación
                    </span>
                    <p className="bg-white p-2 rounded text-sm">
                      {getCompanyDetails(selectedCompany)?.contact_email || "-"}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3 italic">
                  Verifica que la información sea correcta antes de proceder
                </p>
              </div>
            )}

            {/* Sección de subida de archivo */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Subir Archivo CSV
              </h3>
              
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all 
                  ${
                    isDragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                  }
                  ${file ? "border-green-500 bg-green-50" : ""}
                  ${isUploading ? "opacity-70 pointer-events-none" : ""}
                `}
              >
                <input {...getInputProps()} disabled={isUploading} />

                {file ? (
                  <div className="flex flex-col items-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
                    <p className="text-lg font-medium text-gray-700 mb-1">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      disabled={isUploading}
                    >
                      <X className="w-4 h-4 mr-2" /> Eliminar archivo
                    </Button>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      {isDragActive
                        ? "Suelta el archivo aquí"
                        : "Arrastra tu archivo CSV aquí"}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      o haz clic para seleccionar
                    </p>
                    <p className="text-xs text-gray-400">
                      Solo se aceptan archivos CSV (máx. 5MB)
                    </p>
                  </>
                )}
              </div>

              {/* Botón de enviar */}
              {file && !uploadSuccess && (
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={handleSubmit}
                    disabled={isUploading || selectedCompany === "todas"}
                    className="w-full sm:w-auto px-8 py-4 text-lg font-medium"
                    size="lg"
                  >
                    {isUploading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando...
                      </span>
                    ) : (
                      "Enviar Cuestionarios"
                    )}
                  </Button>
                </div>
              )}

              {selectedCompany === "todas" && file && (
                <p className="text-sm text-red-500 mt-2 text-center">
                  Por favor selecciona una empresa antes de enviar
                </p>
              )}

              {uploadSuccess && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center text-green-700">
                    <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span>
                      ¡Archivo recibido correctamente! El procesamiento ha comenzado.
                      Los emails se enviarán en segundo plano.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Sección de formato requerido */}
            <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2 text-lg">
                Formato Requerido del CSV
              </h3>
              <p className="text-sm text-blue-700 mb-3">
                El archivo CSV debe contener las siguientes columnas (la primera fila debe ser el encabezado):
              </p>
              <ul className="text-sm text-blue-600 list-disc pl-5 space-y-1 mb-4">
                <li><span className="font-mono font-bold">email</span> (Email de contacto, <span className="text-red-500">requerido</span>)</li>
                <li><span className="font-mono font-bold">nombre</span> (Nombre del contacto, <span className="text-red-500">requerido</span>)</li>
                <li><span className="font-mono font-bold">role</span> (Puesto en la empresa, opcional)</li>
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button
                  onClick={downloadTemplate}
                  variant="outline"
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Descargar Plantilla
                </Button>
       
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BulkSurveySender;