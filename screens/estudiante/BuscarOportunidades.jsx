"use client"

import { useState, useEffect } from "react"
import "./BuscarOportunidades.css"

const BuscarOportunidades = ({ currentUser, onLogout, onNavigate }) => {
  const [activeSection, setActiveSection] = useState("buscar-oportunidades")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    tipo: "todos",
    escuela: "todas",
    horasMin: "",
    horasMax: "",
    beneficio: "todos",
  })

  const [opportunities] = useState([
    {
      id: 1,
      tipo: "Asistencia",
      titulo: "Asistencia de Laboratorio - Programación I",
      escuela: "Escuela de Ingeniería en Computación",
      profesor: "Dr. Carlos Ramírez",
      horas: "8 semanales",
      beneficios: "Exoneración total de matrícula",
      vacantes: "2 / Postulantes: 5",
      fechas: "01/04/2025 - 30/06/2025",
      badge: "asistencia",
    },
    {
      id: 2,
      tipo: "Tutoría",
      titulo: "Tutoría de Estructuras de Datos",
      escuela: "Escuela de Ingeniería en Computación",
      profesor: "Dr. Carlos Ramírez",
      horas: "4 semanales",
      beneficios: "Pago por horas (₡2,500/hora)",
      vacantes: "1 / Postulantes: 3",
      fechas: "01/04/2025 - 30/06/2025",
      badge: "tutoria",
    },
    {
      id: 3,
      tipo: "Proyecto",
      titulo: "Asistente de Investigación - Inteligencia Artificial",
      escuela: "Escuela de Ingeniería en Computación",
      profesor: "Dra. Laura Martínez",
      horas: "10 semanales",
      beneficios: "Exoneración parcial (70%) + Pago por horas adicionales",
      vacantes: "3 / Postulantes: 2",
      fechas: "15/04/2025 - 15/07/2025",
      badge: "proyecto",
    },
    {
      id: 4,
      tipo: "Asistencia",
      titulo: "Asistencia de Cátedra - Bases de Datos",
      escuela: "Escuela de Ingeniería en Computación",
      profesor: "MSc. Ana González",
      horas: "6 semanales",
      beneficios: "Exoneración total de matrícula",
      vacantes: "1 / Postulantes: 4",
      fechas: "01/04/2025 - 30/06/2025",
      badge: "asistencia",
    },
  ])

  const [filteredOpportunities, setFilteredOpportunities] = useState(opportunities)

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const handleVerDetalles = (opportunityId) => {
    console.log(`Ver detalles de oportunidad: ${opportunityId}`)
    // Here you would navigate to the opportunity details page
  }

  // Filter opportunities based on search term and filters
  useEffect(() => {
    const filtered = opportunities.filter((opp) => {
      // Search term filter
      const matchesSearch =
        searchTerm === "" ||
        opp.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.profesor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.escuela.toLowerCase().includes(searchTerm.toLowerCase())

      // Type filter
      const matchesType = filters.tipo === "todos" || opp.tipo.toLowerCase() === filters.tipo.toLowerCase()

      // School filter
      const matchesSchool =
        filters.escuela === "todas" || opp.escuela.toLowerCase().includes(filters.escuela.toLowerCase())

      // Hours filter (simplified - in real app would parse hours from string)
      const matchesHours = true // Simplified for demo

      // Benefits filter
      const matchesBenefits =
        filters.beneficio === "todos" || opp.beneficios.toLowerCase().includes(filters.beneficio.toLowerCase())

      return matchesSearch && matchesType && matchesSchool && matchesHours && matchesBenefits
    })

    setFilteredOpportunities(filtered)
  }, [searchTerm, filters, opportunities])

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

  return (
    <div className="buscar-oportunidades">
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
      <main className="search-content">
        <div className="search-header">
          <h1>Buscar Oportunidades</h1>
        </div>

        {/* Search and Filters */}
        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar por título, descripción o profesor..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="filters-row">
            <div className="filter-group">
              <label>Tipo</label>
              <select
                value={filters.tipo}
                onChange={(e) => handleFilterChange("tipo", e.target.value)}
                className="filter-select"
              >
                <option value="todos">Todos los tipos</option>
                <option value="asistencia">Asistencia</option>
                <option value="tutoria">Tutoría</option>
                <option value="proyecto">Proyecto</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Escuela/Departamento</label>
              <select
                value={filters.escuela}
                onChange={(e) => handleFilterChange("escuela", e.target.value)}
                className="filter-select"
              >
                <option value="todas">Todas las escuelas</option>
                <option value="computacion">Ingeniería en Computación</option>
                <option value="electronica">Ingeniería Electrónica</option>
                <option value="industrial">Ingeniería Industrial</option>
              </select>
            </div>

            <div className="filter-group hours-filter">
              <label>Horas semanales</label>
              <div className="hours-inputs">
                <input
                  type="number"
                  placeholder="Mínimo"
                  value={filters.horasMin}
                  onChange={(e) => handleFilterChange("horasMin", e.target.value)}
                  className="hours-input"
                />
                <input
                  type="number"
                  placeholder="Máximo"
                  value={filters.horasMax}
                  onChange={(e) => handleFilterChange("horasMax", e.target.value)}
                  className="hours-input"
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Beneficio</label>
              <select
                value={filters.beneficio}
                onChange={(e) => handleFilterChange("beneficio", e.target.value)}
                className="filter-select"
              >
                <option value="todos">Todos</option>
                <option value="exoneracion">Exoneración</option>
                <option value="pago">Pago por horas</option>
                <option value="mixto">Mixto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="results-section">
          <h2>Resultados ({filteredOpportunities.length})</h2>

          <div className="opportunities-grid">
            {filteredOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="opportunity-card">
                <div className="card-header">
                  <span className={`opportunity-badge ${opportunity.badge}`}>{opportunity.tipo}</span>
                </div>

                <div className="card-content">
                  <h3 className="opportunity-title">{opportunity.titulo}</h3>
                  <p className="opportunity-school">{opportunity.escuela}</p>

                  <div className="opportunity-details">
                    <div className="detail-item">
                      <span className="detail-label">Profesor:</span>
                      <span className="detail-value">{opportunity.profesor}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Horas:</span>
                      <span className="detail-value">{opportunity.horas}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Beneficios:</span>
                      <span className="detail-value">{opportunity.beneficios}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Vacantes:</span>
                      <span className="detail-value">{opportunity.vacantes}</span>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <button className="btn-details" onClick={() => handleVerDetalles(opportunity.id)}>
                    Ver detalles
                  </button>
                  <div className="opportunity-dates">
                    <span>Fechas: {opportunity.fechas}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredOpportunities.length === 0 && (
            <div className="no-results">
              <p>No se encontraron oportunidades que coincidan con los criterios de búsqueda.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default BuscarOportunidades
