"use client"

import { useState, useEffect } from "react"
import "./EscuelaNavigation.css"

function EscuelaNavigation({ currentUser, onLogout, activeSection, onNavigate }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Navigation items configuration
  const navigationItems = [
    { id: "inicio", label: "Inicio" },
    { id: "publicar", label: "Publicar Asistencias" },
    { id: "gestionar", label: "Gestionar Postulaciones" },
    { id: "beneficios", label: "Beneficios Económicos" },
  ]

  // Handle logout
  const handleLogout = () => {
    console.log("Logging out school user:", currentUser?.name)
    localStorage.removeItem("currentUser")
    if (onLogout) {
      onLogout()
    } else {
      window.location.reload()
    }
  }

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  // Handle navigation
  const handleNavigation = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId)
    }
    console.log("Navigating to:", sectionId)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest(".school-dropdown")) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [dropdownOpen])

  return (
    <header className="escuela-header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <span className="logo-text">PGAT-TEC</span>
          </div>
          <nav className="main-nav">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? "active" : ""}`}
                onClick={() => handleNavigation(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="header-right">
          <div className="school-dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              {currentUser?.name || "Escuela de Computación"}
              <span className="dropdown-arrow">▼</span>
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={() => handleNavigation("perfil")}>
                  Mi Perfil
                </button>
                <button className="dropdown-item" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default EscuelaNavigation
