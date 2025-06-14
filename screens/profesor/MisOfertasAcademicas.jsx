"use client"

import { useState } from "react"
import "./MisOfertasAcademicas.css"

const MisOfertasAcademicas = ({ currentUser, onLogout, onNavigate }) => {
  const [activeSection, setActiveSection] = useState("ofertas")
  const [showDropdown, setShowDropdown] = useState(false)
  const [filterStatus, setFilterStatus] = useState("todas")

  const handleNavigation = (section) => {
    setActiveSection(section)
    if (onNavigate) {
      onNavigate(section)
    }
  }

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown)
  }

  const handleLogout = () => {
    setShowDropdown(false)
    if (onLogout) {
      onLogout()
    }
  }

  const handleNewOffer = () => {
    console.log("Creating new academic offer...")
  }

  const handleEdit = (offerId) => {
    console.log(`Editing offer: ${offerId}`)
  }

  const handleFinalize = (offerId) => {
    console.log(`Finalizing offer: ${offerId}`)
  }

  const handleActivate = (offerId) => {
    console.log(`Activating offer: ${offerId}`)
  }

  // Sample data matching the reference image
  const offers = [
    {
      id: 1,
      nombre: "Asistencia de Laboratorio - Programación I",
      tipo: "Asistencia",
      vacantes: 2,
      horasSemana: 8,
      fechaInicio: "20/03/2025",
      fechaFin: "30/06/2025",
      postulantes: 3,
      estado: "Activa",
    },
    {
      id: 2,
      nombre: "Tutoría de Estructuras de Datos",
      tipo: "Tutoría",
      vacantes: 1,
      horasSemana: 4,
      fechaInicio: "22/03/2025",
      fechaFin: "30/06/2025",
      postulantes: 2,
      estado: "Activa",
    },
    {
      id: 3,
      nombre: "Proyecto de Investigación en Machine Learning",
      tipo: "Proyecto",
      vacantes: 3,
      horasSemana: 10,
      fechaInicio: "01/04/2025",
      fechaFin: "15/07/2025",
      postulantes: 0,
      estado: "Pendiente",
    },
    {
      id: 4,
      nombre: "Tutoría de Bases de Datos",
      tipo: "Tutoría",
      vacantes: 1,
      horasSemana: 6,
      fechaInicio: "15/02/2025",
      fechaFin: "30/05/2025",
      postulantes: 4,
      estado: "Finalizada",
    },
  ]

  const filteredOffers =
    filterStatus === "todas"
      ? offers
      : offers.filter((offer) => offer.estado.toLowerCase() === filterStatus.toLowerCase())

  const getStatusBadgeClass = (estado) => {
    switch (estado.toLowerCase()) {
      case "activa":
        return "status-badge active"
      case "pendiente":
        return "status-badge pending"
      case "finalizada":
        return "status-badge finished"
      default:
        return "status-badge"
    }
  }

  const getTypeBadgeClass = (tipo) => {
    switch (tipo.toLowerCase()) {
      case "asistencia":
        return "type-badge asistencia"
      case "tutoría":
        return "type-badge tutoria"
      case "proyecto":
        return "type-badge proyecto"
      default:
        return "type-badge"
    }
  }

  return (
    <div className="ofertas-academicas">
      {/* Navigation Header */}
      <header className="ofertas-header">
        <nav className="ofertas-nav">
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
                {currentUser?.name || "Dr. Carlos Ramírez"} ▼
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
      <main className="ofertas-main">
        <div className="ofertas-container">
          <div className="ofertas-header-section">
            <h1 className="ofertas-title">Mis Ofertas Académicas</h1>
          </div>

          {/* Filters and Actions */}
          <div className="ofertas-controls">
            <div className="filter-section">
              <label htmlFor="status-filter" className="filter-label">
                Filtrar por estado:
              </label>
              <select
                id="status-filter"
                className="filter-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="todas">Todas las ofertas</option>
                <option value="activa">Activas</option>
                <option value="pendiente">Pendientes</option>
                <option value="finalizada">Finalizadas</option>
              </select>
            </div>
            <button className="new-offer-btn" onClick={handleNewOffer}>
              Nueva Oferta Académica
            </button>
          </div>

          {/* Offers Table */}
          <div className="ofertas-table-container">
            <table className="ofertas-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Vacantes</th>
                  <th>Horas/Semana</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Fin</th>
                  <th>Postulantes</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOffers.map((offer) => (
                  <tr key={offer.id}>
                    <td className="offer-name">{offer.nombre}</td>
                    <td>
                      <span className={getTypeBadgeClass(offer.tipo)}>{offer.tipo}</span>
                    </td>
                    <td>{offer.vacantes}</td>
                    <td>{offer.horasSemana}</td>
                    <td>{offer.fechaInicio}</td>
                    <td>{offer.fechaFin}</td>
                    <td>
                      <span className="postulantes-badge">{offer.postulantes}</span>
                    </td>
                    <td>
                      <span className={getStatusBadgeClass(offer.estado)}>{offer.estado}</span>
                    </td>
                    <td>
                      <div className="actions-cell">
                        {offer.estado === "Activa" && (
                          <>
                            <button className="action-btn edit" onClick={() => handleEdit(offer.id)}>
                              Editar
                            </button>
                            <button className="action-btn finalize" onClick={() => handleFinalize(offer.id)}>
                              Finalizar
                            </button>
                          </>
                        )}
                        {offer.estado === "Pendiente" && (
                          <>
                            <button className="action-btn edit" onClick={() => handleEdit(offer.id)}>
                              Editar
                            </button>
                            <button className="action-btn activate" onClick={() => handleActivate(offer.id)}>
                              Activar
                            </button>
                          </>
                        )}
                        {offer.estado === "Finalizada" && (
                          <button className="action-btn edit" onClick={() => handleEdit(offer.id)}>
                            Editar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOffers.length === 0 && (
            <div className="no-results">
              <p>No se encontraron ofertas académicas con los filtros seleccionados.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default MisOfertasAcademicas
