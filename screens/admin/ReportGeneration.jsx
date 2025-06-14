"use client"

import { useState, useEffect } from "react"
import "./ReportGeneration.css"

function ReportGeneration({ currentUser }) {
  const [reportParams, setReportParams] = useState({
    reportType: "asistencias-tutorias",
    academicPeriod: "i-semestre-2025",
    school: "todas",
    startDate: "2025-01-01",
    endDate: "2025-06-30",
    exportFormat: "excel",
    assistanceType: "todas",
    benefitType: "todos",
    studentStatus: "todos",
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedReports, setGeneratedReports] = useState([])
  const [reportData, setReportData] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const [reportStats, setReportStats] = useState({
    totalReportsGenerated: 0,
    reportsThisMonth: 0,
    mostRequestedType: "",
    averageGenerationTime: 0,
  })

  // Sample data for dropdowns
  const reportTypes = [
    { value: "asistencias-tutorias", label: "Asistencias y Tutorías" },
    { value: "beneficios-economicos", label: "Beneficios Económicos" },
    { value: "estadisticas-estudiantes", label: "Estadísticas de Estudiantes" },
    { value: "rendimiento-academico", label: "Rendimiento Académico" },
    { value: "uso-plataforma", label: "Uso de la Plataforma" },
    { value: "reporte-completo", label: "Reporte Completo" },
  ]

  const academicPeriods = [
    { value: "i-semestre-2025", label: "I Semestre 2025" },
    { value: "ii-semestre-2024", label: "II Semestre 2024" },
    { value: "i-semestre-2024", label: "I Semestre 2024" },
    { value: "ii-semestre-2023", label: "II Semestre 2023" },
    { value: "anual-2024", label: "Año Completo 2024" },
    { value: "personalizado", label: "Período Personalizado" },
  ]

  const schools = [
    { value: "todas", label: "Todas las escuelas/carreras" },
    { value: "computacion", label: "Escuela de Ingeniería en Computación" },
    { value: "matematica", label: "Escuela de Matemática" },
    { value: "electronica", label: "Escuela de Ingeniería Electrónica" },
    { value: "administracion", label: "Escuela de Administración de Empresas" },
    { value: "agronomia", label: "Escuela de Ingeniería Agronómica" },
  ]

  const exportFormats = [
    { value: "excel", label: "Excel (.xlsx)" },
    { value: "csv", label: "CSV (.csv)" },
    { value: "pdf", label: "PDF (.pdf)" },
    { value: "json", label: "JSON (.json)" },
  ]

  const assistanceTypes = [
    { value: "todas", label: "Todas las asistencias" },
    { value: "laboratorio", label: "Asistencias de Laboratorio" },
    { value: "catedra", label: "Asistencias de Cátedra" },
    { value: "tutoria", label: "Tutorías" },
    { value: "investigacion", label: "Asistencias de Investigación" },
  ]

  const benefitTypes = [
    { value: "todos", label: "Todos los beneficios" },
    { value: "exoneracion", label: "Exoneración de Matrícula" },
    { value: "beca-alimentacion", label: "Beca de Alimentación" },
    { value: "beca-transporte", label: "Beca de Transporte" },
    { value: "pago-horas", label: "Pago por Horas" },
  ]

  const studentStatuses = [
    { value: "todos", label: "Todos los estudiantes" },
    { value: "activos", label: "Estudiantes Activos" },
    { value: "graduados", label: "Estudiantes Graduados" },
    { value: "suspendidos", label: "Estudiantes Suspendidos" },
  ]

  // Sample report data
  const sampleReportData = {
    "asistencias-tutorias": {
      summary: {
        totalAssistances: 156,
        totalHours: 2340,
        totalStudents: 89,
        averageHoursPerStudent: 26.3,
      },
      byType: [
        { type: "Asistencias de Laboratorio", count: 45, hours: 720, students: 32 },
        { type: "Asistencias de Cátedra", count: 38, hours: 608, students: 28 },
        { type: "Tutorías", count: 42, hours: 672, students: 35 },
        { type: "Investigación", count: 31, hours: 340, students: 18 },
      ],
      bySchool: [
        { school: "Ing. Computación", count: 52, hours: 832, students: 38 },
        { school: "Matemática", count: 34, hours: 544, students: 24 },
        { school: "Ing. Electrónica", count: 28, hours: 448, students: 19 },
        { school: "Administración", count: 42, hours: 516, students: 28 },
      ],
    },
    "beneficios-economicos": {
      summary: {
        totalBenefits: 234,
        totalAmount: 45680000,
        totalStudents: 156,
        averageAmountPerStudent: 292820,
      },
      byType: [
        { type: "Exoneración de Matrícula", count: 89, amount: 23450000, students: 89 },
        { type: "Pago por Horas", count: 78, amount: 15680000, students: 67 },
        { type: "Beca de Alimentación", count: 45, amount: 4550000, students: 45 },
        { type: "Beca de Transporte", count: 22, amount: 2000000, students: 22 },
      ],
      bySchool: [
        { school: "Ing. Computación", count: 78, amount: 18920000, students: 52 },
        { school: "Matemática", count: 45, amount: 11250000, students: 34 },
        { school: "Ing. Electrónica", count: 56, amount: 8760000, students: 38 },
        { school: "Administración", count: 55, amount: 6750000, students: 32 },
      ],
    },
    "estadisticas-estudiantes": {
      summary: {
        totalStudents: 1247,
        activeStudents: 1089,
        averageGPA: 8.4,
        platformUsage: 78.5,
      },
      demographics: [
        { category: "Género", male: 687, female: 560 },
        { category: "Año de Ingreso", 2021: 234, 2022: 298, 2023: 356, 2024: 359 },
      ],
      performance: [
        { range: "9.0 - 10.0", count: 156, percentage: 12.5 },
        { range: "8.0 - 8.9", count: 423, percentage: 33.9 },
        { range: "7.0 - 7.9", count: 445, percentage: 35.7 },
        { range: "6.0 - 6.9", count: 223, percentage: 17.9 },
      ],
    },
  }

  useEffect(() => {
    loadReportStats()
    loadGeneratedReports()
  }, [])

  const loadReportStats = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    setReportStats({
      totalReportsGenerated: 1247,
      reportsThisMonth: 89,
      mostRequestedType: "Asistencias y Tutorías",
      averageGenerationTime: 2.3,
    })
  }

  const loadGeneratedReports = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    const reports = [
      {
        id: 1,
        name: "Reporte de Asistencias - Marzo 2025",
        type: "Asistencias y Tutorías",
        generatedDate: "2025-03-15T10:30:00",
        generatedBy: currentUser?.name || "Administrador",
        format: "Excel",
        size: "2.4 MB",
        status: "Completado",
      },
      {
        id: 2,
        name: "Beneficios Económicos - I Semestre 2025",
        type: "Beneficios Económicos",
        generatedDate: "2025-03-14T14:15:00",
        generatedBy: currentUser?.name || "Administrador",
        format: "PDF",
        size: "1.8 MB",
        status: "Completado",
      },
      {
        id: 3,
        name: "Estadísticas Estudiantiles - 2024",
        type: "Estadísticas de Estudiantes",
        generatedDate: "2025-03-13T09:45:00",
        generatedBy: currentUser?.name || "Administrador",
        format: "CSV",
        size: "856 KB",
        status: "Completado",
      },
    ]
    setGeneratedReports(reports)
  }

  const handleParamChange = (param, value) => {
    setReportParams((prev) => ({
      ...prev,
      [param]: value,
    }))
  }

  const validateParams = () => {
    const errors = []

    if (!reportParams.startDate) {
      errors.push("La fecha de inicio es requerida")
    }

    if (!reportParams.endDate) {
      errors.push("La fecha de fin es requerida")
    }

    if (reportParams.startDate && reportParams.endDate) {
      const startDate = new Date(reportParams.startDate)
      const endDate = new Date(reportParams.endDate)
      if (startDate > endDate) {
        errors.push("La fecha de inicio debe ser anterior a la fecha de fin")
      }
    }

    return errors
  }

  const generateReport = async () => {
    const errors = validateParams()
    if (errors.length > 0) {
      alert("Errores de validación:\n" + errors.join("\n"))
      return
    }

    setIsGenerating(true)
    try {
      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const data = sampleReportData[reportParams.reportType] || sampleReportData["asistencias-tutorias"]
      setReportData(data)
      setShowPreview(true)

      // Add to generated reports
      const newReport = {
        id: Date.now(),
        name: `${reportTypes.find((t) => t.value === reportParams.reportType)?.label} - ${new Date().toLocaleDateString()}`,
        type: reportTypes.find((t) => t.value === reportParams.reportType)?.label,
        generatedDate: new Date().toISOString(),
        generatedBy: currentUser?.name || "Administrador",
        format: exportFormats.find((f) => f.value === reportParams.exportFormat)?.label,
        size: "1.2 MB",
        status: "Completado",
      }

      setGeneratedReports((prev) => [newReport, ...prev])

      alert("Reporte generado exitosamente")
    } catch (error) {
      console.error("Error generating report:", error)
      alert("Error al generar el reporte")
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadReport = (reportId) => {
    alert(`Descargando reporte ${reportId}...`)
  }

  const deleteReport = (reportId) => {
    if (window.confirm("¿Está seguro de que desea eliminar este reporte?")) {
      setGeneratedReports((prev) => prev.filter((report) => report.id !== reportId))
      alert("Reporte eliminado exitosamente")
    }
  }

  const exportCurrentReport = () => {
    if (!reportData) {
      alert("No hay datos de reporte para exportar")
      return
    }

    const format = reportParams.exportFormat
    alert(`Exportando reporte en formato ${format.toUpperCase()}...`)
  }

  const getReportTypeFields = () => {
    switch (reportParams.reportType) {
      case "asistencias-tutorias":
        return (
          <div className="report-generation-filter-group">
            <label>Tipo de Asistencia:</label>
            <select
              value={reportParams.assistanceType}
              onChange={(e) => handleParamChange("assistanceType", e.target.value)}
              className="report-generation-select"
            >
              {assistanceTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        )

      case "beneficios-economicos":
        return (
          <div className="report-generation-filter-group">
            <label>Tipo de Beneficio:</label>
            <select
              value={reportParams.benefitType}
              onChange={(e) => handleParamChange("benefitType", e.target.value)}
              className="report-generation-select"
            >
              {benefitTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        )

      case "estadisticas-estudiantes":
        return (
          <div className="report-generation-filter-group">
            <label>Estado del Estudiante:</label>
            <select
              value={reportParams.studentStatus}
              onChange={(e) => handleParamChange("studentStatus", e.target.value)}
              className="report-generation-select"
            >
              {studentStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="report-generation-content">
      {/* Report Statistics */}
      <div className="report-generation-stats">
        <div className="report-generation-stat-card">
          <h3>Reportes Generados</h3>
          <div className="report-generation-stat-value">{reportStats.totalReportsGenerated}</div>
        </div>
        <div className="report-generation-stat-card">
          <h3>Este Mes</h3>
          <div className="report-generation-stat-value">{reportStats.reportsThisMonth}</div>
        </div>
        <div className="report-generation-stat-card">
          <h3>Tipo Más Solicitado</h3>
          <div className="report-generation-stat-label">{reportStats.mostRequestedType}</div>
        </div>
        <div className="report-generation-stat-card">
          <h3>Tiempo Promedio</h3>
          <div className="report-generation-stat-value">{reportStats.averageGenerationTime}s</div>
        </div>
      </div>

      <div className="report-generation-main-content">
        {/* Report Parameters */}
        <div className="report-generation-section">
          <h2>Parámetros del Reporte</h2>
          <div className="report-generation-form">
            <div className="report-generation-form-row">
              <div className="report-generation-filter-group">
                <label>Tipo de Reporte:</label>
                <select
                  value={reportParams.reportType}
                  onChange={(e) => handleParamChange("reportType", e.target.value)}
                  className="report-generation-select"
                >
                  {reportTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="report-generation-filter-group">
                <label>Período Académico:</label>
                <select
                  value={reportParams.academicPeriod}
                  onChange={(e) => handleParamChange("academicPeriod", e.target.value)}
                  className="report-generation-select"
                >
                  {academicPeriods.map((period) => (
                    <option key={period.value} value={period.value}>
                      {period.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="report-generation-filter-group">
                <label>Escuela/Carrera:</label>
                <select
                  value={reportParams.school}
                  onChange={(e) => handleParamChange("school", e.target.value)}
                  className="report-generation-select"
                >
                  {schools.map((school) => (
                    <option key={school.value} value={school.value}>
                      {school.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="report-generation-form-row">
              <div className="report-generation-filter-group">
                <label>Fecha de Inicio:</label>
                <input
                  type="date"
                  value={reportParams.startDate}
                  onChange={(e) => handleParamChange("startDate", e.target.value)}
                  className="report-generation-input"
                />
              </div>

              <div className="report-generation-filter-group">
                <label>Fecha de Fin:</label>
                <input
                  type="date"
                  value={reportParams.endDate}
                  onChange={(e) => handleParamChange("endDate", e.target.value)}
                  className="report-generation-input"
                />
              </div>

              <div className="report-generation-filter-group">
                <label>Formato de Exportación:</label>
                <select
                  value={reportParams.exportFormat}
                  onChange={(e) => handleParamChange("exportFormat", e.target.value)}
                  className="report-generation-select"
                >
                  {exportFormats.map((format) => (
                    <option key={format.value} value={format.value}>
                      {format.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dynamic fields based on report type */}
            <div className="report-generation-form-row">{getReportTypeFields()}</div>

            <div className="report-generation-form-actions">
              <button className="report-generation-generate-btn" onClick={generateReport} disabled={isGenerating}>
                {isGenerating ? "Generando Reporte..." : "Generar Reporte"}
              </button>
            </div>
          </div>
        </div>

        {/* Report Preview */}
        {showPreview && reportData && (
          <div className="report-generation-section">
            <div className="report-generation-preview-header">
              <h2>Vista Previa del Reporte</h2>
              <div className="report-generation-preview-actions">
                <button className="report-generation-export-btn" onClick={exportCurrentReport}>
                  Exportar
                </button>
                <button className="report-generation-close-btn" onClick={() => setShowPreview(false)}>
                  Cerrar
                </button>
              </div>
            </div>
            <ReportPreview data={reportData} type={reportParams.reportType} />
          </div>
        )}

        {/* Generated Reports History */}
        <div className="report-generation-section">
          <h2>Historial de Reportes</h2>
          <div className="report-generation-table-container">
            <table className="report-generation-table">
              <thead>
                <tr>
                  <th>Nombre del Reporte</th>
                  <th>Tipo</th>
                  <th>Fecha de Generación</th>
                  <th>Generado por</th>
                  <th>Formato</th>
                  <th>Tamaño</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {generatedReports.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="report-generation-no-data">
                      No hay reportes generados
                    </td>
                  </tr>
                ) : (
                  generatedReports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.name}</td>
                      <td>{report.type}</td>
                      <td>{new Date(report.generatedDate).toLocaleString("es-ES")}</td>
                      <td>{report.generatedBy}</td>
                      <td>{report.format}</td>
                      <td>{report.size}</td>
                      <td>
                        <span className="report-generation-status-badge status-completed">{report.status}</span>
                      </td>
                      <td>
                        <div className="report-generation-actions">
                          <button
                            className="report-generation-action-btn download"
                            onClick={() => downloadReport(report.id)}
                            title="Descargar reporte"
                          >
                            📥
                          </button>
                          <button
                            className="report-generation-action-btn delete"
                            onClick={() => deleteReport(report.id)}
                            title="Eliminar reporte"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// Report Preview Component
function ReportPreview({ data, type }) {
  const renderAssistanceReport = () => (
    <div className="report-preview-content">
      <div className="report-preview-summary">
        <h3>Resumen General</h3>
        <div className="report-preview-summary-grid">
          <div className="report-preview-summary-item">
            <label>Total de Asistencias:</label>
            <span>{data.summary.totalAssistances}</span>
          </div>
          <div className="report-preview-summary-item">
            <label>Total de Horas:</label>
            <span>{data.summary.totalHours.toLocaleString()}</span>
          </div>
          <div className="report-preview-summary-item">
            <label>Estudiantes Beneficiados:</label>
            <span>{data.summary.totalStudents}</span>
          </div>
          <div className="report-preview-summary-item">
            <label>Promedio Horas/Estudiante:</label>
            <span>{data.summary.averageHoursPerStudent}</span>
          </div>
        </div>
      </div>

      <div className="report-preview-tables">
        <div className="report-preview-table-section">
          <h4>Por Tipo de Asistencia</h4>
          <table className="report-preview-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Cantidad</th>
                <th>Horas</th>
                <th>Estudiantes</th>
              </tr>
            </thead>
            <tbody>
              {data.byType.map((item, index) => (
                <tr key={index}>
                  <td>{item.type}</td>
                  <td>{item.count}</td>
                  <td>{item.hours}</td>
                  <td>{item.students}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="report-preview-table-section">
          <h4>Por Escuela</h4>
          <table className="report-preview-table">
            <thead>
              <tr>
                <th>Escuela</th>
                <th>Cantidad</th>
                <th>Horas</th>
                <th>Estudiantes</th>
              </tr>
            </thead>
            <tbody>
              {data.bySchool.map((item, index) => (
                <tr key={index}>
                  <td>{item.school}</td>
                  <td>{item.count}</td>
                  <td>{item.hours}</td>
                  <td>{item.students}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderBenefitsReport = () => (
    <div className="report-preview-content">
      <div className="report-preview-summary">
        <h3>Resumen de Beneficios Económicos</h3>
        <div className="report-preview-summary-grid">
          <div className="report-preview-summary-item">
            <label>Total de Beneficios:</label>
            <span>{data.summary.totalBenefits}</span>
          </div>
          <div className="report-preview-summary-item">
            <label>Monto Total:</label>
            <span>₡{data.summary.totalAmount.toLocaleString()}</span>
          </div>
          <div className="report-preview-summary-item">
            <label>Estudiantes Beneficiados:</label>
            <span>{data.summary.totalStudents}</span>
          </div>
          <div className="report-preview-summary-item">
            <label>Promedio por Estudiante:</label>
            <span>₡{data.summary.averageAmountPerStudent.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="report-preview-tables">
        <div className="report-preview-table-section">
          <h4>Por Tipo de Beneficio</h4>
          <table className="report-preview-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Cantidad</th>
                <th>Monto</th>
                <th>Estudiantes</th>
              </tr>
            </thead>
            <tbody>
              {data.byType.map((item, index) => (
                <tr key={index}>
                  <td>{item.type}</td>
                  <td>{item.count}</td>
                  <td>₡{item.amount.toLocaleString()}</td>
                  <td>{item.students}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="report-preview-table-section">
          <h4>Por Escuela</h4>
          <table className="report-preview-table">
            <thead>
              <tr>
                <th>Escuela</th>
                <th>Cantidad</th>
                <th>Monto</th>
                <th>Estudiantes</th>
              </tr>
            </thead>
            <tbody>
              {data.bySchool.map((item, index) => (
                <tr key={index}>
                  <td>{item.school}</td>
                  <td>{item.count}</td>
                  <td>₡{item.amount.toLocaleString()}</td>
                  <td>{item.students}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderStudentStatsReport = () => (
    <div className="report-preview-content">
      <div className="report-preview-summary">
        <h3>Estadísticas de Estudiantes</h3>
        <div className="report-preview-summary-grid">
          <div className="report-preview-summary-item">
            <label>Total de Estudiantes:</label>
            <span>{data.summary.totalStudents}</span>
          </div>
          <div className="report-preview-summary-item">
            <label>Estudiantes Activos:</label>
            <span>{data.summary.activeStudents}</span>
          </div>
          <div className="report-preview-summary-item">
            <label>Promedio General:</label>
            <span>{data.summary.averageGPA}</span>
          </div>
          <div className="report-preview-summary-item">
            <label>Uso de Plataforma:</label>
            <span>{data.summary.platformUsage}%</span>
          </div>
        </div>
      </div>

      <div className="report-preview-tables">
        <div className="report-preview-table-section">
          <h4>Rendimiento Académico</h4>
          <table className="report-preview-table">
            <thead>
              <tr>
                <th>Rango de Notas</th>
                <th>Cantidad</th>
                <th>Porcentaje</th>
              </tr>
            </thead>
            <tbody>
              {data.performance.map((item, index) => (
                <tr key={index}>
                  <td>{item.range}</td>
                  <td>{item.count}</td>
                  <td>{item.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderReport = () => {
    switch (type) {
      case "asistencias-tutorias":
        return renderAssistanceReport()
      case "beneficios-economicos":
        return renderBenefitsReport()
      case "estadisticas-estudiantes":
        return renderStudentStatsReport()
      default:
        return renderAssistanceReport()
    }
  }

  return <div className="report-preview">{renderReport()}</div>
}

export default ReportGeneration
