"use client"

import { useState, useEffect } from "react"
import "./MisPostulaciones.css"

const MisPostulaciones = ({ currentUser, onLogout, onNavigate }) => {
  const [activeSection, setActiveSection] = useState("mis-postulaciones")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("todas")

  const [applications] = useState([
    {
      id: 1,
      tipo: "Asistencia",
      titulo: "Asistencia de Laboratorio - Programación I",
      escuela: "Escuela de Ingeniería en Computación",
      fecha: "12/03/2025",
      estado: "Pendiente",
      badge: "asistencia",
      canCancel: true,
    },
    {
      id: 2,
      tipo: "Tutoría",
      titulo: "Tutoría de Cálculo",
      escuela: "Escuela de Matemática",
      fecha: "10/03/2025",
      estado: "Aprobada",
      badge: "tutoria",
      canCancel: false,
    },
    {
      id: 3,
      tipo: "Proyecto",
      titulo: "Proyecto de Investigación en Machine Learning",
      escuela: "Escuela de Ingeniería en Computación",
      fecha: "05/03/2025",
      estado: "Rechazada",
      badge: "proyecto",
      canCancel: false,
    },
    {
      id: 4,
      tipo: "Asistencia",
      titulo: "Asistencia Administrativa - Departamento de Admisión",
      escuela: "Departamento de Admisión y Registro",
      fecha: "15/02/2025",
      estado: "Cancelada",
      badge: "asistencia",
      canCancel: false,
    },
  ])

  const [filteredApplications, setFilteredApplications] = useState(applications)

  const handleNavigation = (section) => {
    setActiveSection(section)
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

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

  const handleVerDetalles = (applicationId) => {
    console.log(`Ver detalles de postulación: ${applicationId}`)
    // Here you would open a modal or navigate to details page
  }

  const handleCancelarPostulacion = (applicationId) => {
    console.log(`Cancelar postulación: ${applicationId}`)
    // Here you would implement the cancellation logic
    if (window.confirm("¿Está seguro que desea cancelar esta postulación?")) {
      // Update the application status to "Cancelada"
      // In a real app, this would make an API call
      alert("Postulación cancelada exitosamente")
    }
  }

  // Filter applications based on active filter
  useEffect(() => {
    const filtered = applications.filter((app) => {
      if (activeFilter === "todas") return true
      if (activeFilter === "pendientes") return app.estado === "Pendiente"
      if (activeFilter === "aprobadas") return app.estado === "Aprobada"
      if (activeFilter === "rechazadas") return app.estado === "Rechazada"
      if (activeFilter === "canceladas") return app.estado === "Cancelada"
      return true
    })

    setFilteredApplications(filtered)
  }, [activeFilter, applications])

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

  const getStatusClass = (estado) => {
    switch (estado) {
      case "Pendiente":
        return "status-pendiente"
      case "Aprobada":
        return "status-aprobada"
      case "Rechazada":
        return "status-rechazada"
      case "Cancelada":
        return "status-cancelada"
      default:
        return ""
    }
  }

  return (
    <div className="mis-postulaciones">
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
      <main className="postulaciones-content">
        <div className="postulaciones-header">
          <h1>Mis Postulaciones</h1>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={`filter-tab ${activeFilter === "todas" ? "active" : ""}`}
            onClick={() => handleFilterChange("todas")}
          >
            Todas
          </button>
          <button
            className={`filter-tab ${activeFilter === "pendientes" ? "active" : ""}`}
            onClick={() => handleFilterChange("pendientes")}
          >
            Pendientes
          </button>
          <button
            className={`filter-tab ${activeFilter === "aprobadas" ? "active" : ""}`}
            onClick={() => handleFilterChange("aprobadas")}
          >
            Aprobadas
          </button>
          <button
            className={`filter-tab ${activeFilter === "rechazadas" ? "active" : ""}`}
            onClick={() => handleFilterChange("rechazadas")}
          >
            Rechazadas
          </button>
          <button
            className={`filter-tab ${activeFilter === "canceladas" ? "active" : ""}`}
            onClick={() => handleFilterChange("canceladas")}
          >
            Canceladas
          </button>
        </div>

        {/* Applications Table */}
        <div className="applications-table-container">
          <table className="applications-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Título</th>
                <th>Escuela/Departamento</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  <td>
                    <span className={`type-badge ${application.badge}`}>{application.tipo}</span>
                  </td>
                  <td className="title-cell">{application.titulo}</td>
                  <td>{application.escuela}</td>
                  <td>{application.fecha}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(application.estado)}`}>{application.estado}</span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button className="btn-action btn-details" onClick={() => handleVerDetalles(application.id)}>
                        Detalles
                      </button>
                      {application.canCancel && (
                        <button
                          className="btn-action btn-cancel"
                          onClick={() => handleCancelarPostulacion(application.id)}
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredApplications.length === 0 && (
            <div className="no-applications">
              <p>No hay postulaciones que coincidan con el filtro seleccionado.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default MisPostulaciones
