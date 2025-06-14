"use client"

import { useState } from "react"
import "./BeneficiosEconomicos.css"
import EscuelaNavigation from "./components/EscuelaNavigation"

function BeneficiosEconomicos({ currentUser, onLogout, onNavigate, onBack }) {
  const [activeTab, setActiveTab] = useState("exoneraciones")
  const [filterStatus, setFilterStatus] = useState("todas")

  // Sample data for exemptions
  const [exoneracionesData] = useState([
    {
      id: 1,
      estudiante: "Ana Mora Vargas",
      carnet: "2023156789",
      tipo: "Total",
      asistencia: "Tutoría de Programación I",
      fechaInicio: "10/03/2025",
      fechaFin: "30/06/2025",
      estado: "Activa",
    },
    {
      id: 2,
      estudiante: "Carlos Rojas Pérez",
      carnet: "2022134567",
      tipo: "Parcial (70%)",
      asistencia: "Asistencia de Laboratorio",
      fechaInicio: "15/03/2025",
      fechaFin: "30/06/2025",
      estado: "Activa",
    },
    {
      id: 3,
      estudiante: "María Jiménez Luna",
      carnet: "2023145678",
      tipo: "Total",
      asistencia: "Asistencia de Investigación",
      fechaInicio: "05/02/2025",
      fechaFin: "30/06/2025",
      estado: "Activa",
    },
  ])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value)
  }

  const handleViewDetails = (id) => {
    alert(`Ver detalles de exoneración ${id} - Funcionalidad por implementar`)
  }

  const handleNewExemption = () => {
    alert("Asignar Nueva Exoneración - Funcionalidad por implementar")
  }

  return (
    <div className="beneficios-economicos">
      {/* Reusable Navigation Component */}
      <EscuelaNavigation currentUser={currentUser} onLogout={onLogout} activeSection="beneficios" onNavigate={onBack} />

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          {/* Page Title */}
          <div className="page-header">
            <h1 className="page-title">Gestión de Beneficios Económicos</h1>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="sub-nav">
            <button
              className={`sub-nav-item ${activeTab === "exoneraciones" ? "active" : ""}`}
              onClick={() => handleTabChange("exoneraciones")}
            >
              Exoneraciones
            </button>
            <button
              className={`sub-nav-item ${activeTab === "pagos" ? "active" : ""}`}
              onClick={() => handleTabChange("pagos")}
            >
              Pagos por Hora
            </button>
            <button
              className={`sub-nav-item ${activeTab === "reportes" ? "active" : ""}`}
              onClick={() => handleTabChange("reportes")}
            >
              Reportes Financieros
            </button>
          </div>

          {/* Content Area */}
          <div className="content-area">
            {activeTab === "exoneraciones" && (
              <div className="exoneraciones-section">
                {/* Filter and Actions */}
                <div className="filter-section">
                  <div className="filter-left">
                    <label htmlFor="status-filter" className="filter-label">
                      Filtrar por estado:
                    </label>
                    <select
                      id="status-filter"
                      className="filter-select"
                      value={filterStatus}
                      onChange={handleFilterChange}
                    >
                      <option value="todas">Todas las exoneraciones</option>
                      <option value="activa">Activas</option>
                      <option value="pendiente">Pendientes</option>
                      <option value="finalizada">Finalizadas</option>
                    </select>
                  </div>
                  <div className="filter-right">
                    <button className="new-exemption-btn" onClick={handleNewExemption}>
                      Asignar Nueva Exoneración
                    </button>
                  </div>
                </div>

                {/* Exemptions Table */}
                <div className="table-container">
                  <table className="exemptions-table">
                    <thead>
                      <tr>
                        <th>Estudiante</th>
                        <th>Carnet</th>
                        <th>Tipo</th>
                        <th>Asistencia/Tutoría</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exoneracionesData.map((exemption) => (
                        <tr key={exemption.id}>
                          <td>{exemption.estudiante}</td>
                          <td>{exemption.carnet}</td>
                          <td>{exemption.tipo}</td>
                          <td>{exemption.asistencia}</td>
                          <td>{exemption.fechaInicio}</td>
                          <td>{exemption.fechaFin}</td>
                          <td>
                            <span className="status-badge active">{exemption.estado}</span>
                          </td>
                          <td>
                            <button className="action-btn view-details" onClick={() => handleViewDetails(exemption.id)}>
                              Ver detalles
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "pagos" && (
              <div className="pagos-section">
                <p>Sección de Pagos por Hora - Por implementar</p>
              </div>
            )}

            {activeTab === "reportes" && (
              <div className="reportes-section">
                <p>Sección de Reportes Financieros - Por implementar</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default BeneficiosEconomicos
