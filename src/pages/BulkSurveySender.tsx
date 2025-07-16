import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import NavigationD from "@/components/NavigationD";
import { useState, useCallback } from "react";
import { UploadCloud, FileText, X, CheckCircle } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { companyService } from "@/services/companyService"; // Asegúrate de que este servicio esté configurado correctamente
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

const BulkSurveySender = () => {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState("todas");
  const [companies, setCompanies] = useState<any[]>([]);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      if (
        selectedFile.type === "text/csv" ||
        selectedFile.name.endsWith(".csv")
      ) {
        setFile(selectedFile);
        setUploadSuccess(false);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    maxFiles: 1,
  });

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setUploadSuccess(true);
      // Here you would call your actual API:
      // await surveyService.bulkUpload(file);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };
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

  const getCompanyDetails = (companyId) => {
    const company = companies.find((c) => c._id === companyId);
    return company ? company : "Selecciona una empresa";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <NavigationD />
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Envío Masivo de Cuestionarios
          </h1>
          <p className="text-gray-600 text-lg">
            Sube un archivo CSV con los datos de las empresas para enviar
            cuestionarios masivamente.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Seleccionar Empresa o Cuestionario
            </CardTitle>

            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar empresa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">📊 Selecione una empresa</SelectItem>
                {companies.map((company) => (
                  <SelectItem key={company._id} value={company._id}>
                    🏢 {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedCompany !== "todas" && (
              <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                  <span>📋</span>
                  {getCompanyDetails(selectedCompany)?.name}
                </h3>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-blue-600">
                        URL del Cuestionario
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            getCompanyDetails(selectedCompany)?.survey_url
                          );
                          toast.success("¡URL copiado al portapapeles!", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                          });
                        }}
                        className="text-xs bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded text-blue-700 flex items-center gap-1"
                      >
                        <span>📋</span> Copiar
                      </button>
                    </div>
                    <p className="bg-white p-2 rounded text-sm break-all">
                      {getCompanyDetails(selectedCompany)?.survey_url || "-"}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm text-blue-600">
                      ✉️ Email de Responsable (se le notificará al terminar el envío)
                    </span>
                    <p className="bg-white p-2 rounded text-sm">
                      {getCompanyDetails(selectedCompany)?.contact_email ||
                        "-"}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm text-blue-600">📅 Invitación</span>
                    <p className="bg-white p-2 rounded text-sm">
                      {getCompanyDetails(selectedCompany)?.invitationDate
                        ? new Date(
                            getCompanyDetails(selectedCompany)?.invitationDate
                          ).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
                Verifica la información
                </p>
              </div>
            )}
            <CardTitle className="text-xl font-semibold text-gray-800">
              Subir Archivo CSV
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all 
                ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                }
                ${file ? "border-green-500 bg-green-50" : ""}
              `}
            >
              <input {...getInputProps()} />

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
                    className="text-red-500 hover:text-red-600"
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

            {file && !uploadSuccess && (
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleSubmit}
                  disabled={isUploading}
                  className="w-full sm:w-auto"
                >
                  {isUploading ? "Procesando..." : "Enviar Cuestionarios"}
                </Button>
              </div>
            )}

            {uploadSuccess && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center text-green-700">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>
                    ¡Archivo subido correctamente! Los cuestionarios están
                    siendo enviados.
                  </span>
                </div>
              </div>
            )}

            <div className="mt-8 bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">
                Formato requerido:
              </h3>
              <p className="text-sm text-blue-700 mb-2">
                El archivo CSV debe contener las siguientes columnas:
              </p>
              <ul className="text-sm text-blue-600 list-disc pl-5 space-y-1">
                <li>company_name (Nombre de la empresa)</li>
                <li>contact_email (Email de contacto)</li>
                <li>contact_name (Nombre del contacto)</li>
              </ul>
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-800 mt-3 pl-0"
                onClick={() => {
                  // This would ideally download a sample CSV
                  alert("Descargando archivo de ejemplo...");
                }}
              >
                <FileText className="w-4 h-4 mr-2" /> Descargar plantilla
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BulkSurveySender;
