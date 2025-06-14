"use client"

import { useState } from "react"
import MisOfertasAcademicas from "./MisOfertasAcademicas"
import "./ProfesorDashboard.css"

const ProfesorDashboard = ({ currentUser, onLogout, onNavigate }) => {
  const [activeSection, setActiveSection] = useState("inicio")
  const [showDropdown, setShowDropdown] = useState(false)

  const handleNavigation = (section) => {
    setActiveSection(section)
    // Here you would implement navigation to different sections
    console.log(`Navigating to: ${section}`)
  }

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown)
  }

  const handleLogout = () => {
    setShowDropdown(false)
    onLogout()
  }

  // Render different sections based on activeSection
  if (activeSection === "ofertas") {
    return <MisOfertasAcademicas currentUser={currentUser} onLogout={onLogout} onNavigate={handleNavigation} />
  }

  // Sample data matching the reference image
  const dashboardData = {
    metrics: {
      asistenciasActivas: 3,
      postulacionesPendientes: 8,
      asistentesActuales: 5,
    },
    asignaturas: [
      "IC-1802 Introducción a la Programación",
      "IC-2001 Estructuras de Datos",
      "IC-4302 Bases de Datos II",
    ],
    proyectosInvestigacion: [
      "Desarrollo de algoritmos para análisis de datos climáticos",
      "Aplicaciones de machine learning en agricultura",
    ],
    actividadesRecientes: [
      {
        fecha: "15/03/2025",
        descripcion: "Nueva postulación para Asistencia de Laboratorio",
      },
      {
        fecha: "12/03/2025",
        descripcion: "Evaluación mensual completada para 3 asistentes",
      },
      {
        fecha: "10/03/2025",
        descripcion: "Creación de nueva oferta de tutoría",
      },
    ],
  }

  return (
    <div className="profesor-dashboard">
      {/* Navigation Header */}
      <header className="profesor-header">
        <nav className="profesor-nav">
          <div className="nav-left">
            <button
              className={`nav-item ${activeSection === "inicio" ? "active" : ""}`}
              onClick={() => handleNavigation("inicio")}
            >
              Inicio
            </button>
            <button
              className={`nav-item ${activeSection === "ofertas" ? "active" : ""}`}
              onClick={() => handleNavigation("ofertas")}
            >
              Mis Ofertas Académicas
            </button>
            <button
              className={`nav-item ${activeSection === "postulaciones" ? "active" : ""}`}
              onClick={() => handleNavigation("postulaciones")}
            >
              Postulaciones
            </button>
            <button
              className={`nav-item ${activeSection === "seguimiento" ? "active" : ""}`}
              onClick={() => handleNavigation("seguimiento")}
            >
              Seguimiento de Estudiantes
            </button>
          </div>
          <div className="nav-right">
            <div className="user-dropdown">
              <button className="user-button" onClick={handleDropdownToggle}>
                {currentUser?.name || "Dr. Carlos Ramírez Arias"} ▼
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <button className="dropdown-item">Mi Perfil</button>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="profesor-main">
        <div className="dashboard-container">
          <h1 className="dashboard-title">Panel de Control - Profesor</h1>

          {/* Metrics Cards */}
          <div className="metrics-grid">
            <div className="metric-card blue">
              <div className="metric-number">{dashboardData.metrics.asistenciasActivas}</div>
              <div className="metric-label">Asistencias y Tutorías Activas</div>
            </div>
            <div className="metric-card orange">
              <div className="metric-number">{dashboardData.metrics.postulacionesPendientes}</div>
              <div className="metric-label">Postulaciones Pendientes</div>
            </div>
            <div className="metric-card green">
              <div className="metric-number">{dashboardData.metrics.asistentesActuales}</div>
              <div className="metric-label">Asistentes Actuales</div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="academic-grid">
            <div className="academic-card">
              <h3 className="card-title">Mis Asignaturas</h3>
              <div className="card-content">
                {dashboardData.asignaturas.map((asignatura, index) => (
                  <div key={index} className="asignatura-item">
                    {asignatura}
                  </div>
                ))}
              </div>
            </div>
            <div className="academic-card">
              <h3 className="card-title">Proyectos de Investigación</h3>
              <div className="card-content">
                {dashboardData.proyectosInvestigacion.map((proyecto, index) => (
                  <div key={index} className="proyecto-item">
                    {proyecto}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="activities-section">
            <div className="activities-card">
              <h3 className="card-title">Actividades Recientes</h3>
              <div className="activities-content">
                {dashboardData.actividadesRecientes.map((actividad, index) => (
                  <div key={index} className="activity-item">
                    <span className="activity-date">{actividad.fecha}:</span>
                    <span className="activity-description">{actividad.descripcion}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProfesorDashboard
