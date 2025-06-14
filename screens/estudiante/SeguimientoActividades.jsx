"use client"

import { useState, useEffect } from "react"
import "./SeguimientoActividades.css"

const SeguimientoActividades = ({ currentUser, onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState("activas")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [activitiesData, setActivitiesData] = useState({
    active: [
      {
        id: 1,
        tipo: "Tutoría",
        titulo: "Tutoría de Cálculo",
        escuela: "Escuela de Matemática",
        profesor: "Dr. Manuel Vargas",
        periodo: "20/03/2025 - 30/06/2025",
        beneficio: "Exoneración total de matrícula",
        horasCompletadas: 12,
        horasTotales: 30,
        evaluacion: 95.0,
        estado: "Activa",
      },
    ],
    historical: [
      {
        id: 2,
        tipo: "Asistencia",
        titulo: "Asistencia de Laboratorio - Programación I",
        escuela: "Escuela de Ingeniería en Computación",
        profesor: "Dr. Carlos Ramírez",
        periodo: "01/08/2024 - 30/11/2024",
        beneficio: "Pago por horas (₡2,500/hora)",
        horasCompletadas: 40,
        horasTotales: 40,
        evaluacion: 88.5,
        estado: "Completada",
      },
    ],
  })

  const handleNavigation = (section) => {
    if (onNavigate) {
      onNavigate(section)
    }
  }

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleLogout = () => {
    setDropdownOpen(false)
    if (onLogout) {
      onLogout()
    }
  }

  const handleRegistrarHoras = (activityId) => {
    console.log(`Registrar horas para actividad: ${activityId}`)
    // Here you would implement the hour registration modal
  }

  const handleVerDetalles = (activityId) => {
    console.log(`Ver detalles de actividad: ${activityId}`)
    // Here you would implement the details view
  }

  const calculateProgress = (completed, total) => {
    return Math.round((completed / total) * 100)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest(".user-dropdown")) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownOpen])

  const currentActivities = activeTab === "activas" ? activitiesData.active : activitiesData.historical

  return (
    <div className="seguimiento-actividades">
      {/* Navigation Header */}
      <header className="dashboard-header">
        <nav className="main-nav">
          <div className="nav-left">
            <button className="nav-item" onClick={() => handleNavigation("inicio")}>
              Inicio
            </button>
            <button className="nav-item" onClick={() => handleNavigation("buscar-oportunidades")}>
              Buscar Oportunidades
            </button>
            <button className="nav-item" onClick={() => handleNavigation("mis-postulaciones")}>
              Mis Postulaciones
            </button>
            <button className="nav-item active" onClick={() => handleNavigation("seguimiento-actividades")}>
              Seguimiento de Actividades
            </button>
          </div>
          <div className="nav-right">
            <div className="user-dropdown">
              <button className="user-dropdown-toggle" onClick={handleDropdownToggle}>
                {currentUser?.name || "Luis Urbina"} ▼
              </button>
              {dropdownOpen && (
                <div className="user-dropdown-menu">
                  <button className="dropdown-item" onClick={() => handleNavigation("mi-perfil")}>
                    Mi Perfil
                  </button>
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="seguimiento-content">
        <div className="page-title">
          <h1>Seguimiento de Actividades</h1>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === "activas" ? "active" : ""}`}
            onClick={() => setActiveTab("activas")}
          >
            Asistencias y Tutorías Activas
          </button>
          <button
            className={`tab-button ${activeTab === "historial" ? "active" : ""}`}
            onClick={() => setActiveTab("historial")}
          >
            Historial
          </button>
        </div>

        {/* Activities List */}
        <div className="activities-container">
          {currentActivities.length === 0 ? (
            <div className="no-activities">
              <p>No hay {activeTab === "activas" ? "actividades activas" : "historial de actividades"} para mostrar.</p>
            </div>
          ) : (
            currentActivities.map((activity) => (
              <div key={activity.id} className="activity-card">
                <div className="activity-header">
                  <div className="activity-title-section">
                    <span className={`activity-type-badge ${activity.tipo.toLowerCase()}`}>{activity.tipo}</span>
                    <h3 className="activity-title">{activity.titulo}</h3>
                  </div>
                  <span className={`activity-status-badge ${activity.estado.toLowerCase()}`}>{activity.estado}</span>
                </div>

                <div className="activity-content">
                  <div className="activity-info">
                    <div className="info-item">
                      <span className="info-label">Escuela/Departamento:</span>
                      <span className="info-value">{activity.escuela}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Profesor:</span>
                      <span className="info-value">{activity.profesor}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Período:</span>
                      <span className="info-value">{activity.periodo}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Beneficio:</span>
                      <span className="info-value">{activity.beneficio}</span>
                    </div>
                  </div>

                  <div className="activity-progress">
                    <div className="progress-section">
                      <span className="progress-label">Progreso de horas:</span>
                      <div className="progress-bar-container">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${calculateProgress(activity.horasCompletadas, activity.horasTotales)}%` }}
                          ></div>
                        </div>
                        <span className="progress-percentage">
                          {calculateProgress(activity.horasCompletadas, activity.horasTotales)}%
                        </span>
                      </div>
                      <span className="progress-text">
                        {activity.horasCompletadas} de {activity.horasTotales} horas completadas
                      </span>
                    </div>

                    <div className="evaluation-section">
                      <span className="evaluation-label">Evaluaciones:</span>
                      <span className="evaluation-score">{activity.evaluacion}</span>
                    </div>
                  </div>
                </div>

                <div className="activity-actions">
                  {activity.estado === "Activa" && (
                    <button className="btn-primary" onClick={() => handleRegistrarHoras(activity.id)}>
                      Registrar Horas
                    </button>
                  )}
                  <button className="btn-secondary" onClick={() => handleVerDetalles(activity.id)}>
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default SeguimientoActividades
