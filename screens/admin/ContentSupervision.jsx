"use client"

import { useState, useEffect } from "react"
import "./ContentSupervision.css"

function ContentSupervision({ currentUser }) {
  const [activeTab, setActiveTab] = useState("validation") // validation or reports
  const [offers, setOffers] = useState([])
  const [reports, setReports] = useState([])
  const [filteredOffers, setFilteredOffers] = useState([])
  const [filteredReports, setFilteredReports] = useState([])
  const [filters, setFilters] = useState({
    status: "pendientes",
    type: "all",
    dateRange: "all",
    search: "",
  })
  const [selectedOffer, setSelectedOffer] = useState(null)
  const [selectedReport, setSelectedReport] = useState(null)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState([])

  // Sample offers data
  const sampleOffers = [
    {
      id: 1,
      title: "Asistencia de Laboratorio - Programación I",
      type: "Asistencia",
      school: "Escuela de Ingeniería en Computación",
      professor: "Dr. Carlos Ramírez",
      professorEmail: "cramirez@itcr.ac.cr",
      date: "15/03/2025",
      status: "Pendiente",
      description:
        "Se requiere asistente para laboratorio de programación básica en Java. Responsabilidades incluyen apoyo a estudiantes durante prácticas de laboratorio, revisión de código y explicación de conceptos fundamentales.",
      requirements: "Promedio mínimo: 85, Cursos aprobados: Programación I y II",
      schedule: "Lunes y Miércoles 2:00-4:00 PM",
      payment: "₡85,000/mes",
      hours: "8 horas/semana",
      submittedDate: "2025-03-15T10:30:00",
      priority: "normal",
    },
    {
      id: 2,
      title: "Tutoría de Matemática Discreta",
      type: "Tutoría",
      school: "Escuela de Matemática",
      professor: "Dra. María Fernández",
      professorEmail: "mfernandez@itcr.ac.cr",
      date: "14/03/2025",
      status: "Pendiente",
      description:
        "Tutoría para estudiantes con dificultades en matemática discreta. Incluye sesiones individuales y grupales para reforzar conceptos de lógica, teoría de conjuntos y grafos.",
      requirements: "Promedio mínimo: 90, Excelencia académica en matemáticas",
      schedule: "Martes y Jueves 3:00-5:00 PM",
      payment: "₡75,000/mes",
      hours: "6 horas/semana",
      submittedDate: "2025-03-14T14:15:00",
      priority: "high",
    },
    {
      id: 3,
      title: "Asistente de Investigación - Inteligencia Artificial",
      type: "Investigación",
      school: "Escuela de Ingeniería en Computación",
      professor: "Dr. Fernando Castro",
      professorEmail: "fcastro@itcr.ac.cr",
      date: "13/03/2025",
      status: "Aprobada",
      description: "Apoyo en proyecto de investigación sobre machine learning aplicado a análisis de datos médicos.",
      requirements: "Conocimientos en Python, estadística y machine learning",
      schedule: "Flexible, 15 horas/semana",
      payment: "₡120,000/mes",
      hours: "15 horas/semana",
      submittedDate: "2025-03-13T09:00:00",
      priority: "normal",
    },
  ]

  // Sample reports data
  const sampleReports = [
    {
      id: 1,
      offerId: 1,
      offerTitle: "Asistencia de Laboratorio - Programación I",
      reportedBy: "María José Vargas",
      reporterEmail: "mvargas@estudiante.tec.ac.cr",
      reason: "Contenido inapropiado",
      description:
        "La descripción de la oferta contiene requisitos discriminatorios que no están relacionados con las competencias académicas necesarias.",
      date: "16/03/2025",
      status: "Abierto",
      priority: "medium",
      category: "discrimination",
    },
    {
      id: 2,
      offerId: 2,
      offerTitle: "Tutoría de Matemática Discreta",
      reportedBy: "Luis Urbina Salazar",
      reporterEmail: "lurbina@estudiante.tec.ac.cr",
      reason: "Información incorrecta",
      description:
        "Los horarios publicados no coinciden con la disponibilidad real del profesor según el sistema académico.",
      date: "15/03/2025",
      status: "En revisión",
      priority: "low",
      category: "misinformation",
    },
  ]

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (activeTab === "validation") {
      applyOffersFilters()
    } else {
      applyReportsFilters()
    }
  }, [offers, reports, filters, activeTab])

  const loadData = async () => {
    setIsLoading(true)
    try {
      // Simulate API calls
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setOffers(sampleOffers)
      setReports(sampleReports)

      // Set notifications for pending items
      const pendingOffers = sampleOffers.filter((offer) => offer.status === "Pendiente").length
      const openReports = sampleReports.filter((report) => report.status === "Abierto").length

      setNotifications([
        ...(pendingOffers > 0 ? [`${pendingOffers} ofertas pendientes de revisión`] : []),
        ...(openReports > 0 ? [`${openReports} reportes abiertos`] : []),
      ])
    } catch (error) {
      console.error("Error loading data:", error)
      alert("Error al cargar datos")
    } finally {
      setIsLoading(false)
    }
  }

  const applyOffersFilters = () => {
    let filtered = [...offers]

    // Filter by status
    if (filters.status !== "all") {
      const statusMap = {
        pendientes: "Pendiente",
        aprobadas: "Aprobada",
        rechazadas: "Rechazada",
      }
      filtered = filtered.filter((offer) => offer.status === statusMap[filters.status])
    }

    // Filter by type
    if (filters.type !== "all") {
      filtered = filtered.filter((offer) => offer.type.toLowerCase() === filters.type.toLowerCase())
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        (offer) =>
          offer.title.toLowerCase().includes(searchTerm) ||
          offer.professor.toLowerCase().includes(searchTerm) ||
          offer.school.toLowerCase().includes(searchTerm),
      )
    }

    setFilteredOffers(filtered)
  }

  const applyReportsFilters = () => {
    let filtered = [...reports]

    // Filter by status
    if (filters.status !== "all") {
      const statusMap = {
        abiertos: "Abierto",
        "en-revision": "En revisión",
        resueltos: "Resuelto",
      }
      filtered = filtered.filter((report) => report.status === statusMap[filters.status])
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        (report) =>
          report.offerTitle.toLowerCase().includes(searchTerm) ||
          report.reportedBy.toLowerCase().includes(searchTerm) ||
          report.reason.toLowerCase().includes(searchTerm),
      )
    }

    setFilteredReports(filtered)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const handleViewOffer = (offer) => {
    setSelectedOffer(offer)
    setShowOfferModal(true)
  }

  const handleViewReport = (report) => {
    setSelectedReport(report)
    setShowReportModal(true)
  }

  const handleOfferAction = (offerId, action, reason = "") => {
    const actionMap = {
      approve: "Aprobada",
      reject: "Rechazada",
      request_changes: "Cambios solicitados",
    }

    setOffers((prev) =>
      prev.map((offer) =>
        offer.id === offerId
          ? {
              ...offer,
              status: actionMap[action],
              moderationReason: reason,
              moderatedBy: currentUser?.name,
              moderatedDate: new Date().toISOString(),
            }
          : offer,
      ),
    )

    const actionMessages = {
      approve: "Oferta aprobada exitosamente",
      reject: "Oferta rechazada",
      request_changes: "Se han solicitado cambios en la oferta",
    }

    alert(actionMessages[action])
    setShowOfferModal(false)
  }

  const handleReportAction = (reportId, action, resolution = "") => {
    const actionMap = {
      resolve: "Resuelto",
      dismiss: "Desestimado",
      escalate: "Escalado",
    }

    setReports((prev) =>
      prev.map((report) =>
        report.id === reportId
          ? {
              ...report,
              status: actionMap[action],
              resolution: resolution,
              resolvedBy: currentUser?.name,
              resolvedDate: new Date().toISOString(),
            }
          : report,
      ),
    )

    const actionMessages = {
      resolve: "Reporte resuelto exitosamente",
      dismiss: "Reporte desestimado",
      escalate: "Reporte escalado para revisión superior",
    }

    alert(actionMessages[action])
    setShowReportModal(false)
  }

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "pendiente":
      case "abierto":
        return "status-pending"
      case "aprobada":
      case "resuelto":
        return "status-approved"
      case "rechazada":
      case "desestimado":
        return "status-rejected"
      case "en revisión":
        return "status-review"
      default:
        return "status-default"
    }
  }

  const getTypeBadgeClass = (type) => {
    switch (type.toLowerCase()) {
      case "asistencia":
        return "type-asistencia"
      case "tutoría":
        return "type-tutoria"
      case "investigación":
        return "type-investigacion"
      default:
        return "type-default"
    }
  }

  const getPriorityBadgeClass = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "priority-high"
      case "medium":
        return "priority-medium"
      case "low":
        return "priority-low"
      default:
        return "priority-normal"
    }
  }

  return (
    <div className="content-supervision-content">
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="content-supervision-notifications">
          {notifications.map((notification, index) => (
            <div key={index} className="content-supervision-notification">
              🔔 {notification}
            </div>
          ))}
        </div>
      )}

      {/* Sub Navigation */}
      <div className="content-supervision-tabs">
        <button
          className={`content-supervision-tab ${activeTab === "validation" ? "active" : ""}`}
          onClick={() => setActiveTab("validation")}
        >
          Validación de Ofertas
        </button>
        <button
          className={`content-supervision-tab ${activeTab === "reports" ? "active" : ""}`}
          onClick={() => setActiveTab("reports")}
        >
          Reportes de Contenido
        </button>
      </div>

      {/* Filters and Controls */}
      <div className="content-supervision-controls">
        <div className="content-supervision-filters">
          <div className="content-supervision-filter-group">
            <label>Filtrar por estado:</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="content-supervision-select"
            >
              {activeTab === "validation" ? (
                <>
                  <option value="pendientes">Pendientes</option>
                  <option value="all">Todos</option>
                  <option value="aprobadas">Aprobadas</option>
                  <option value="rechazadas">Rechazadas</option>
                </>
              ) : (
                <>
                  <option value="abiertos">Abiertos</option>
                  <option value="all">Todos</option>
                  <option value="en-revision">En revisión</option>
                  <option value="resueltos">Resueltos</option>
                </>
              )}
            </select>
          </div>

          {activeTab === "validation" && (
            <div className="content-supervision-filter-group">
              <label>Tipo:</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="content-supervision-select"
              >
                <option value="all">Todos</option>
                <option value="asistencia">Asistencia</option>
                <option value="tutoría">Tutoría</option>
                <option value="investigación">Investigación</option>
              </select>
            </div>
          )}

          <div className="content-supervision-search-group">
            <label>Buscar:</label>
            <input
              type="text"
              placeholder={activeTab === "validation" ? "Buscar ofertas..." : "Buscar reportes..."}
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="content-supervision-search-input"
            />
          </div>
        </div>
      </div>

      {/* Content Table */}
      <div className="content-supervision-table-container">
        {isLoading ? (
          <div className="content-supervision-loading">
            <div className="content-supervision-spinner"></div>
            <p>Cargando datos...</p>
          </div>
        ) : activeTab === "validation" ? (
          <table className="content-supervision-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Tipo</th>
                <th>Escuela</th>
                <th>Profesor</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="content-supervision-no-data">
                    No se encontraron ofertas
                  </td>
                </tr>
              ) : (
                filteredOffers.map((offer) => (
                  <tr key={offer.id}>
                    <td>{offer.title}</td>
                    <td>
                      <span className={`content-supervision-type-badge ${getTypeBadgeClass(offer.type)}`}>
                        {offer.type}
                      </span>
                    </td>
                    <td>{offer.school}</td>
                    <td>{offer.professor}</td>
                    <td>{offer.date}</td>
                    <td>
                      <span className={`content-supervision-status-badge ${getStatusBadgeClass(offer.status)}`}>
                        {offer.status}
                      </span>
                    </td>
                    <td>
                      <button className="content-supervision-action-btn" onClick={() => handleViewOffer(offer)}>
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <table className="content-supervision-table">
            <thead>
              <tr>
                <th>Oferta Reportada</th>
                <th>Reportado por</th>
                <th>Motivo</th>
                <th>Fecha</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan="7" className="content-supervision-no-data">
                    No se encontraron reportes
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.offerTitle}</td>
                    <td>{report.reportedBy}</td>
                    <td>{report.reason}</td>
                    <td>{report.date}</td>
                    <td>
                      <span className={`content-supervision-priority-badge ${getPriorityBadgeClass(report.priority)}`}>
                        {report.priority === "high" ? "Alta" : report.priority === "medium" ? "Media" : "Baja"}
                      </span>
                    </td>
                    <td>
                      <span className={`content-supervision-status-badge ${getStatusBadgeClass(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td>
                      <button className="content-supervision-action-btn" onClick={() => handleViewReport(report)}>
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Results Summary */}
      <div className="content-supervision-summary">
        <p>
          Mostrando {activeTab === "validation" ? filteredOffers.length : filteredReports.length} de{" "}
          {activeTab === "validation" ? offers.length : reports.length}{" "}
          {activeTab === "validation" ? "ofertas" : "reportes"}
        </p>
      </div>

      {/* Offer Review Modal */}
      {showOfferModal && selectedOffer && (
        <OfferReviewModal offer={selectedOffer} onClose={() => setShowOfferModal(false)} onAction={handleOfferAction} />
      )}

      {/* Report Review Modal */}
      {showReportModal && selectedReport && (
        <ReportReviewModal
          report={selectedReport}
          onClose={() => setShowReportModal(false)}
          onAction={handleReportAction}
        />
      )}
    </div>
  )
}

// Offer Review Modal Component
function OfferReviewModal({ offer, onClose, onAction }) {
  const [actionType, setActionType] = useState("")
  const [reason, setReason] = useState("")
  const [showActionForm, setShowActionForm] = useState(false)

  const handleAction = (action) => {
    if (action === "approve") {
      onAction(offer.id, action)
    } else {
      setActionType(action)
      setShowActionForm(true)
    }
  }

  const handleSubmitAction = () => {
    if (actionType === "reject" && !reason.trim()) {
      alert("Por favor proporcione una razón para el rechazo")
      return
    }
    onAction(offer.id, actionType, reason)
    setShowActionForm(false)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-large">
        <div className="modal-header">
          <h2>Revisión de Oferta</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          {!showActionForm ? (
            <>
              <div className="offer-details">
                <div className="offer-detail-section">
                  <h3>Información General</h3>
                  <div className="offer-detail-grid">
                    <div className="offer-detail-item">
                      <label>Título:</label>
                      <span>{offer.title}</span>
                    </div>
                    <div className="offer-detail-item">
                      <label>Tipo:</label>
                      <span className={`content-supervision-type-badge ${offer.type.toLowerCase()}`}>{offer.type}</span>
                    </div>
                    <div className="offer-detail-item">
                      <label>Escuela:</label>
                      <span>{offer.school}</span>
                    </div>
                    <div className="offer-detail-item">
                      <label>Profesor:</label>
                      <span>{offer.professor}</span>
                    </div>
                    <div className="offer-detail-item">
                      <label>Email:</label>
                      <span>{offer.professorEmail}</span>
                    </div>
                    <div className="offer-detail-item">
                      <label>Fecha de envío:</label>
                      <span>{offer.date}</span>
                    </div>
                  </div>
                </div>

                <div className="offer-detail-section">
                  <h3>Descripción</h3>
                  <p>{offer.description}</p>
                </div>

                <div className="offer-detail-section">
                  <h3>Requisitos</h3>
                  <p>{offer.requirements}</p>
                </div>

                <div className="offer-detail-section">
                  <h3>Detalles del Puesto</h3>
                  <div className="offer-detail-grid">
                    <div className="offer-detail-item">
                      <label>Horario:</label>
                      <span>{offer.schedule}</span>
                    </div>
                    <div className="offer-detail-item">
                      <label>Horas por semana:</label>
                      <span>{offer.hours}</span>
                    </div>
                    <div className="offer-detail-item">
                      <label>Pago:</label>
                      <span>{offer.payment}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button className="modal-btn secondary" onClick={onClose}>
                  Cerrar
                </button>
                <button className="modal-btn success" onClick={() => handleAction("approve")}>
                  Aprobar
                </button>
                <button className="modal-btn warning" onClick={() => handleAction("request_changes")}>
                  Solicitar Cambios
                </button>
                <button className="modal-btn danger" onClick={() => handleAction("reject")}>
                  Rechazar
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="action-form">
                <h3>{actionType === "reject" ? "Rechazar Oferta" : "Solicitar Cambios"}</h3>
                <div className="form-group">
                  <label>Razón {actionType === "reject" ? "del rechazo" : "de los cambios solicitados"}:</label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Proporcione una explicación detallada..."
                    rows="4"
                    required={actionType === "reject"}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button className="modal-btn secondary" onClick={() => setShowActionForm(false)}>
                  Cancelar
                </button>
                <button className="modal-btn primary" onClick={handleSubmitAction}>
                  Confirmar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// Report Review Modal Component
function ReportReviewModal({ report, onClose, onAction }) {
  const [actionType, setActionType] = useState("")
  const [resolution, setResolution] = useState("")
  const [showActionForm, setShowActionForm] = useState(false)

  const handleAction = (action) => {
    setActionType(action)
    setShowActionForm(true)
  }

  const handleSubmitAction = () => {
    if (!resolution.trim()) {
      alert("Por favor proporcione una resolución")
      return
    }
    onAction(report.id, actionType, resolution)
    setShowActionForm(false)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-large">
        <div className="modal-header">
          <h2>Revisión de Reporte</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          {!showActionForm ? (
            <>
              <div className="report-details">
                <div className="report-detail-section">
                  <h3>Información del Reporte</h3>
                  <div className="report-detail-grid">
                    <div className="report-detail-item">
                      <label>Oferta reportada:</label>
                      <span>{report.offerTitle}</span>
                    </div>
                    <div className="report-detail-item">
                      <label>Reportado por:</label>
                      <span>{report.reportedBy}</span>
                    </div>
                    <div className="report-detail-item">
                      <label>Email:</label>
                      <span>{report.reporterEmail}</span>
                    </div>
                    <div className="report-detail-item">
                      <label>Fecha del reporte:</label>
                      <span>{report.date}</span>
                    </div>
                    <div className="report-detail-item">
                      <label>Motivo:</label>
                      <span>{report.reason}</span>
                    </div>
                    <div className="report-detail-item">
                      <label>Prioridad:</label>
                      <span className={`content-supervision-priority-badge priority-${report.priority}`}>
                        {report.priority === "high" ? "Alta" : report.priority === "medium" ? "Media" : "Baja"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="report-detail-section">
                  <h3>Descripción del Problema</h3>
                  <p>{report.description}</p>
                </div>
              </div>

              <div className="modal-actions">
                <button className="modal-btn secondary" onClick={onClose}>
                  Cerrar
                </button>
                <button className="modal-btn success" onClick={() => handleAction("resolve")}>
                  Resolver
                </button>
                <button className="modal-btn warning" onClick={() => handleAction("dismiss")}>
                  Desestimar
                </button>
                <button className="modal-btn danger" onClick={() => handleAction("escalate")}>
                  Escalar
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="action-form">
                <h3>
                  {actionType === "resolve"
                    ? "Resolver Reporte"
                    : actionType === "dismiss"
                      ? "Desestimar Reporte"
                      : "Escalar Reporte"}
                </h3>
                <div className="form-group">
                  <label>Resolución:</label>
                  <textarea
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    placeholder="Describa la acción tomada o la razón de la decisión..."
                    rows="4"
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button className="modal-btn secondary" onClick={() => setShowActionForm(false)}>
                  Cancelar
                </button>
                <button className="modal-btn primary" onClick={handleSubmitAction}>
                  Confirmar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContentSupervision
