"use client"

import { useState } from "react"
import "./EscuelaDashboard.css"
import EscuelaNavigation from "./components/EscuelaNavigation"
import BeneficiosEconomicos from "./BeneficiosEconomicos"
import GestionarPostulaciones from "./GestionarPostulaciones"
import PublicarAsistencias from "./PublicarAsistencias"
import PerfilEscuela from "./PerfilEscuela"

function EscuelaDashboard({ currentUser, onLogout, onNavigate }) {
  const [activeSection, setActiveSection] = useState("inicio")
  const [dashboardData, setDashboardData] = useState({
    asistenciasActivas: 12,
    postulacionesPendientes: 25,
    estudiantesAsignados: 18,
    fechasImportantes: [
      {
        fecha: "15/04/2025",
        descripcion: "Cierre de postulaciones I Semestre",
      },
      {
        fecha: "30/04/2025",
        descripcion: "Límite asignación de asistentes",
      },
      {
        fecha: "05/05/2025",
        descripcion: "Entrega de reportes mensuales",
      },
    ],
    asistenciasDestacadas: [
      {
        titulo: "Asistencia Especial Investigación",
        postulantes: 5,
      },
      {
        titulo: "Tutoría Cálculo",
        postulantes: 12,
      },
      {
        titulo: "Asistencia Laboratorio",
        postulantes: 8,
      },
    ],
  })

  // Handle navigation between sections
  const handleNavigation = (section) => {
    setActiveSection(section)
    console.log("Navigating to:", section)
  }

  // Render different sections based on active section
  if (activeSection === "beneficios") {
    return (
      <BeneficiosEconomicos
        currentUser={currentUser}
        onLogout={onLogout}
        onNavigate={onNavigate}
        onBack={() => handleNavigation("inicio")}
      />
    )
  }

  if (activeSection === "gestionar") {
    return (
      <GestionarPostulaciones
        currentUser={currentUser}
        onLogout={onLogout}
        onNavigate={onNavigate}
        onBack={() => handleNavigation("inicio")}
      />
    )
  }

  if (activeSection === "publicar") {
    return (
      <PublicarAsistencias
        currentUser={currentUser}
        onLogout={onLogout}
        onNavigate={onNavigate}
        onBack={() => handleNavigation("inicio")}
      />
    )
  }

  if (activeSection === "perfil") {
    return (
      <PerfilEscuela
        currentUser={currentUser}
        onLogout={onLogout}
        onNavigate={onNavigate}
        onBack={() => handleNavigation("inicio")}
      />
    )
  }

  return (
    <div className="escuela-dashboard">
      {/* Reusable Navigation Component */}
      <EscuelaNavigation
        currentUser={currentUser}
        onLogout={onLogout}
        activeSection={activeSection}
        onNavigate={handleNavigation}
      />

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          {/* Page Title */}
          <div className="page-header">
            <h1 className="page-title">Panel de Control - Escuela de Ingeniería en Computación</h1>
          </div>

          {/* Statistics Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-label">Asistencias Activas</h3>
              <div className="stat-number blue">{dashboardData.asistenciasActivas}</div>
            </div>
            <div className="stat-card">
              <h3 className="stat-label">Postulaciones Pendientes</h3>
              <div className="stat-number orange">{dashboardData.postulacionesPendientes}</div>
            </div>
            <div className="stat-card">
              <h3 className="stat-label">Estudiantes Asignados</h3>
              <div className="stat-number green">{dashboardData.estudiantesAsignados}</div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="content-grid">
            {/* Important Dates */}
            <div className="content-section">
              <h2 className="section-title">Próximas fechas importantes</h2>
              <div className="dates-list">
                {dashboardData.fechasImportantes.map((fecha, index) => (
                  <div key={index} className="date-item">
                    <span className="date-text">
                      {fecha.fecha} - {fecha.descripcion}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Assistances */}
            <div className="content-section">
              <h2 className="section-title">Asistencias destacadas</h2>
              <div className="assistances-list">
                {dashboardData.asistenciasDestacadas.map((asistencia, index) => (
                  <div key={index} className="assistance-item">
                    <span className="assistance-text">
                      {asistencia.titulo} - {asistencia.postulantes} postulantes
                    </span>
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

export default EscuelaDashboard
