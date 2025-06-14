"use client"

import { useState, useEffect } from "react"
import BuscarOportunidades from "./BuscarOportunidades"
import MisPostulaciones from "./MisPostulaciones"
import SeguimientoActividades from "./SeguimientoActividades"
import EstudianteProfile from "./EstudianteProfile"
import "./EstudianteDashboard.css"

const EstudianteDashboard = ({ currentUser, onLogout, onNavigate }) => {
  const [activeSection, setActiveSection] = useState("inicio")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [studentData, setStudentData] = useState({
    academicInfo: {
      carnet: "2021156802",
      carrera: "Ingeniería en Computación",
      promedioActual: 87.5,
    },
    currentStatus: {
      postulacionesPendientes: 2,
      asistenciasTutorias: 1,
    },
    notifications: [
      {
        id: 1,
        message: "Nueva oportunidad de asistencia en tu carrera",
        date: "15/03/2025",
        type: "opportunity",
      },
      {
        id: 2,
        message: "Tu postulación para Tutoría de Cálculo ha sido aprobada",
        date: "14/03/2025",
        type: "approval",
      },
      {
        id: 3,
        message: "Recordatorio: Entrega de reporte mensual",
        date: "10/03/2025",
        type: "reminder",
      },
    ],
    assistantships: [
      {
        id: 1,
        tipo: "Tutoría",
        descripcion: "Tutoría de Cálculo",
        profesor: "Dr. Manuel Vargas",
        horas: "6 / 30",
        estado: "Activa",
      },
    ],
    importantDates: [
      {
        date: "20/03/2025",
        event: "Entrega de reporte de horas - Tutoría de Cálculo",
      },
      {
        date: "31/03/2025",
        event: "Cierre de postulaciones para asistencias del II Semestre",
      },
      {
        date: "05/04/2025",
        event: "Evaluación mensual de asistentes",
      },
    ],
    economicBenefits: {
      periodo: "actual",
      exoneracion: {
        status: "Vigente",
        amount: "100%",
      },
      historialPagos: [
        {
          periodo: "Febrero 2025",
          amount: "₡45,000",
        },
        {
          periodo: "Marzo 2025",
          amount: "En proceso",
        },
      ],
    },
  })

  const handleNavigation = (section) => {
    setActiveSection(section)
    // Here you would implement actual navigation logic
    console.log(`Navigating to: ${section}`)
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

  const handleBuscarOportunidades = () => {
    handleNavigation("buscar-oportunidades")
  }

  const handleVerNotificaciones = () => {
    console.log("Ver todas las notificaciones")
  }

  const handleVerHistorial = () => {
    console.log("Ver historial completo")
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

  // Render different sections based on activeSection
  if (activeSection === "buscar-oportunidades") {
    return <BuscarOportunidades currentUser={currentUser} onLogout={onLogout} onNavigate={handleNavigation} />
  }

  if (activeSection === "mis-postulaciones") {
    return <MisPostulaciones currentUser={currentUser} onLogout={onLogout} onNavigate={handleNavigation} />
  }

  if (activeSection === "seguimiento-actividades") {
    return <SeguimientoActividades currentUser={currentUser} onLogout={onLogout} onNavigate={handleNavigation} />
  }

  if (activeSection === "mi-perfil") {
    return <EstudianteProfile currentUser={currentUser} onLogout={onLogout} onNavigate={handleNavigation} />
  }

  return (
    <div className="estudiante-dashboard">
      {/* Navigation Header */}
      <header className="dashboard-header">
        <nav className="main-nav">
          <div className="nav-left">
            <button
              className={`nav-item ${activeSection === "inicio" ? "active" : ""}`}
              onClick={() => handleNavigation("inicio")}
            >
              Inicio
            </button>
            <button
              className={`nav-item ${activeSection === "buscar-oportunidades" ? "active" : ""}`}
              onClick={() => handleNavigation("buscar-oportunidades")}
            >
              Buscar Oportunidades
            </button>
            <button
              className={`nav-item ${activeSection === "mis-postulaciones" ? "active" : ""}`}
              onClick={() => handleNavigation("mis-postulaciones")}
            >
              Mis Postulaciones
            </button>
            <button
              className={`nav-item ${activeSection === "seguimiento-actividades" ? "active" : ""}`}
              onClick={() => handleNavigation("seguimiento-actividades")}
            >
              Seguimiento de Actividades
            </button>
          </div>
          <div className="nav-right">
            <div className="user-dropdown">
              <button className="user-dropdown-toggle" onClick={handleDropdownToggle}>
                {currentUser?.name || "Luis Urbina Salazar"} ▼
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
      <main className="dashboard-content">
        <div className="dashboard-title">
          <h1>Panel de Control - Estudiante</h1>
        </div>

        <div className="dashboard-grid">
          {/* Academic Information */}
          <div className="dashboard-card academic-info">
            <h2>Información Académica</h2>
            <div className="info-item">
              <span className="label">Carnet:</span>
              <span className="value">{studentData.academicInfo.carnet}</span>
            </div>
            <div className="info-item">
              <span className="label">Carrera:</span>
              <span className="value">{studentData.academicInfo.carrera}</span>
            </div>
            <div className="info-item">
              <span className="label">Promedio actual:</span>
              <span className="value">{studentData.academicInfo.promedioActual}</span>
            </div>
          </div>

          {/* Current Status */}
          <div className="dashboard-card current-status">
            <h2>Estado Actual</h2>
            <div className="status-item">
              <span className="status-label">Postulaciones pendientes:</span>
              <span className="status-badge pending">{studentData.currentStatus.postulacionesPendientes}</span>
            </div>
            <div className="status-item">
              <span className="status-label">Asistencias/Tutorías activas:</span>
              <span className="status-badge active">{studentData.currentStatus.asistenciasTutorias}</span>
            </div>
            <button className="btn-primary" onClick={handleBuscarOportunidades}>
              Buscar Nuevas Oportunidades
            </button>
          </div>

          {/* Recent Notifications */}
          <div className="dashboard-card notifications">
            <h2>Notificaciones Recientes</h2>
            <div className="notifications-list">
              {studentData.notifications.map((notification) => (
                <div key={notification.id} className="notification-item">
                  <p className="notification-message">{notification.message}</p>
                  <span className="notification-date">{notification.date}</span>
                </div>
              ))}
            </div>
            <button className="btn-secondary" onClick={handleVerNotificaciones}>
              Ver todas las notificaciones
            </button>
          </div>

          {/* My Assistantships and Tutorials */}
          <div className="dashboard-card assistantships">
            <h2>Mis Asistencias y Tutorías</h2>
            <div className="table-container">
              <table className="assistantships-table">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Descripción</th>
                    <th>Profesor</th>
                    <th>Horas</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.assistantships.map((item) => (
                    <tr key={item.id}>
                      <td>{item.tipo}</td>
                      <td>{item.descripcion}</td>
                      <td>{item.profesor}</td>
                      <td>{item.horas}</td>
                      <td>
                        <span className="status-badge active">{item.estado}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Important Dates */}
          <div className="dashboard-card important-dates">
            <h2>Próximas Fechas Importantes</h2>
            <div className="dates-list">
              {studentData.importantDates.map((dateItem, index) => (
                <div key={index} className="date-item">
                  <span className="date">{dateItem.date}:</span>
                  <span className="event">{dateItem.event}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Economic Benefits */}
          <div className="dashboard-card economic-benefits">
            <h2>Beneficios Económicos</h2>
            <div className="benefits-section">
              <p className="period">Período {studentData.economicBenefits.periodo}</p>
              <div className="benefit-item">
                <span className="benefit-label">Exoneración de matrícula:</span>
                <span className="benefit-badge active">{studentData.economicBenefits.exoneracion.status}</span>
              </div>
              <div className="payment-history">
                <p className="history-title">Historial de pagos</p>
                {studentData.economicBenefits.historialPagos.map((payment, index) => (
                  <div key={index} className="payment-item">
                    <span className="payment-period">{payment.periodo}:</span>
                    <span className="payment-amount">{payment.amount}</span>
                  </div>
                ))}
              </div>
              <button className="btn-secondary" onClick={handleVerHistorial}>
                Ver historial completo
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default EstudianteDashboard
