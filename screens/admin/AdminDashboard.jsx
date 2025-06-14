"use client"

import { useState, useEffect } from "react"
import "./AdminDashboard.css"
import UserManagement from "./UserManagement"
import ContentSupervision from "./ContentSupervision"
import ReportGeneration from "./ReportGeneration"
import AdminProfile from "./AdminProfile"

function AdminDashboard({ currentUser: propCurrentUser, onLogout, onNavigate }) {
  const [currentUser, setCurrentUser] = useState(() => {
    // Use the prop first, then fallback to localStorage
    if (propCurrentUser) {
      return propCurrentUser
    }

    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      return JSON.parse(savedUser)
    }
    return {
      name: "Laura González Mora",
      role: "Administrador",
    }
  })

  const [activeTab, setActiveTab] = useState("inicio")
  const [showProfile, setShowProfile] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  // Placeholder data - to be replaced with API calls
  const [dashboardData, setDashboardData] = useState({
    kpis: {
      activeUsers: 356,
      publishedOffers: 42,
      applications: 189,
      activeAssistants: 103,
    },
    recentActivities: [
      {
        id: 1,
        date: "15/03/2025",
        description: "Nueva oferta pendiente de validación - Escuela de Computación",
        status: "Pendiente",
        type: "validation",
      },
      {
        id: 2,
        date: "14/03/2025",
        description: "12 nuevos estudiantes registrados",
        status: "Completado",
        type: "registration",
      },
      {
        id: 3,
        date: "13/03/2025",
        description: "Reporte mensual de beneficios económicos generado",
        status: "Completado",
        type: "report",
      },
      {
        id: 4,
        date: "12/03/2025",
        description: "Problema de acceso reportado - Escuela de Administración",
        status: "Pendiente",
        type: "issue",
      },
      {
        id: 5,
        date: "10/03/2025",
        description: "Sincronización con sistema académico completada",
        status: "Completado",
        type: "sync",
      },
    ],
    systemStats: [
      { label: "Escuelas activas", value: 15, color: "blue" },
      { label: "Profesores registrados", value: 87, color: "blue" },
      { label: "Estudiantes registrados", value: 234, color: "blue" },
      { label: "Administradores", value: 5, color: "blue" },
      { label: "Asistencias activas", value: 64, color: "green" },
      { label: "Tutorías activas", value: 35, color: "green" },
    ],
  })

  // Simulate API calls
  useEffect(() => {
    console.log("Loading dashboard data...")
    const timer = setTimeout(() => {
      console.log("Dashboard data loaded:", dashboardData)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    console.log("Tab changed to:", tab)
  }

  const handleActivityAction = (activityId, action) => {
    console.log(`Action ${action} for activity ${activityId}`)
    alert(`Acción ${action} para actividad ${activityId}`)
  }

  const handleLogout = () => {
    console.log("Admin logout")
    localStorage.removeItem("currentUser")
    // Call the parent's onLogout function to properly handle the logout
    if (onLogout) {
      onLogout()
    } else {
      // Fallback: redirect to login manually
      window.location.reload()
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "pendiente":
        return "status-pending"
      case "completado":
        return "status-completed"
      default:
        return "status-default"
    }
  }

  // Render the appropriate content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "inicio":
        return (
          <>
            {/* KPI Cards */}
            <div className="admin-kpi-grid">
              <div className="admin-kpi-card kpi-blue">
                <h3>Usuarios Activos</h3>
                <div className="admin-kpi-value">{dashboardData.kpis.activeUsers}</div>
              </div>

              <div className="admin-kpi-card kpi-cyan">
                <h3>Ofertas Publicadas</h3>
                <div className="admin-kpi-value">{dashboardData.kpis.publishedOffers}</div>
              </div>

              <div className="admin-kpi-card kpi-orange">
                <h3>Postulaciones</h3>
                <div className="admin-kpi-value">{dashboardData.kpis.applications}</div>
              </div>

              <div className="admin-kpi-card kpi-green">
                <h3>Asistentes Activos</h3>
                <div className="admin-kpi-value">{dashboardData.kpis.activeAssistants}</div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="admin-content-grid">
              {/* Recent Activities */}
              <div className="admin-section">
                <h2>Actividad Reciente</h2>
                <div className="admin-activities">
                  {dashboardData.recentActivities.map((activity) => (
                    <div key={activity.id} className="admin-activity-item">
                      <div className="admin-activity-content">
                        <div className="admin-activity-date">{activity.date}:</div>
                        <div className="admin-activity-description">{activity.description}</div>
                      </div>
                      <div className="admin-activity-actions">
                        <span className={`admin-status-badge ${getStatusBadgeClass(activity.status)}`}>
                          {activity.status}
                        </span>
                        {activity.status === "Pendiente" && (
                          <button
                            className="admin-action-btn"
                            onClick={() => handleActivityAction(activity.id, "review")}
                          >
                            Revisar
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Statistics */}
              <div className="admin-section">
                <h2>Estadísticas del Sistema</h2>
                <div className="admin-stats">
                  {dashboardData.systemStats.map((stat, index) => (
                    <div key={index} className="admin-stat-item">
                      <span className="admin-stat-label">{stat.label}</span>
                      <span className={`admin-stat-value stat-${stat.color}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )

      case "usuarios":
        return <UserManagement currentUser={currentUser} />

      case "contenido":
        return <ContentSupervision currentUser={currentUser} />

      case "reportes":
        return <ReportGeneration currentUser={currentUser} />

      default:
        return (
          <div className="admin-section">
            <h2>Página no encontrada</h2>
            <p>La sección solicitada no existe.</p>
          </div>
        )
    }
  }

  return (
    <div className="admin-dashboard-app">
      {/* Single Unified Header Navigation */}
      <header className="admin-header">
        <div className="admin-header-content">
          <nav className="admin-nav">
            <button
              className={`admin-nav-item ${activeTab === "inicio" ? "active" : ""}`}
              onClick={() => handleTabChange("inicio")}
            >
              Inicio
            </button>
            <button
              className={`admin-nav-item ${activeTab === "usuarios" ? "active" : ""}`}
              onClick={() => handleTabChange("usuarios")}
            >
              Gestión de Usuarios
            </button>
            <button
              className={`admin-nav-item ${activeTab === "contenido" ? "active" : ""}`}
              onClick={() => handleTabChange("contenido")}
            >
              Supervisión de Contenido
            </button>
            <button
              className={`admin-nav-item ${activeTab === "reportes" ? "active" : ""}`}
              onClick={() => handleTabChange("reportes")}
            >
              Reportes
            </button>
          </nav>

          <div className="admin-user-info">
            <span className="admin-user-name">{currentUser.name}</span>
            <button className="admin-dropdown-btn" onClick={() => setShowDropdown(!showDropdown)}>
              ▼
            </button>
            {showDropdown && (
              <div className="admin-dropdown-menu">
                <button
                  onClick={() => {
                    setShowProfile(true)
                    setShowDropdown(false)
                  }}
                >
                  Mi Perfil
                </button>
                <button onClick={handleLogout}>Cerrar Sesión</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-container">
          <h1 className="admin-title">
            {activeTab === "inicio" && "Panel de Control - Administrador"}
            {activeTab === "usuarios" && "Gestión de Usuarios"}
            {activeTab === "contenido" && "Supervisión de Contenido"}
            {activeTab === "reportes" && "Reportes"}
          </h1>

          {renderContent()}
        </div>
      </main>
      {/* Admin Profile Modal */}
      {showProfile && <AdminProfile currentUser={currentUser} onClose={() => setShowProfile(false)} />}
    </div>
  )
}

export default AdminDashboard
