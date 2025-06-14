"use client"

import { useState, useEffect } from "react"
import "./EstudianteProfile.css"

const EstudianteProfile = ({ currentUser, onLogout, onNavigate }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    personalInfo: {
      nombreCompleto: "Luis Urbina Salazar",
      carnet: "2023156802",
      correoInstitucional: "lurbina@estudiante.tec.ac.cr",
      telefono: "8876-5432",
    },
    academicInfo: {
      carrera: "Ingeniería en Computación",
      nivelAcademico: "Segundo año",
      promedioPonderado: 87.5,
    },
    cursosAprobados: [
      "Introducción a la Programación",
      "Matemática Discreta",
      "Cálculo I",
      "Comunicación Escrita",
      "Programación Orientada a Objetos",
      "Estructuras de Datos",
    ],
    habilidades: [
      "Programación en Java",
      "Desarrollo web (HTML, CSS, JavaScript)",
      "Algoritmos y estructuras de datos",
      "Bases de datos relacionales",
      "Trabajo en equipo",
    ],
    experienciaPrevia: [
      {
        tipo: "Asistente de Laboratorio",
        descripcion: "Introducción a la Programación",
        profesor: "Dr. Carlos Ramírez",
        periodo: "2024-2",
      },
    ],
  })

  const [editData, setEditData] = useState({ ...profileData })

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleLogout = () => {
    setDropdownOpen(false)
    if (onLogout) {
      onLogout()
    }
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset to original data
      setEditData({ ...profileData })
    } else {
      // Start editing - copy current data
      setEditData({ ...profileData })
    }
    setIsEditing(!isEditing)
  }

  const handleSave = () => {
    setProfileData({ ...editData })
    setIsEditing(false)
  }

  const handleInputChange = (section, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleArrayChange = (section, index, value) => {
    setEditData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (section, newItem) => {
    setEditData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }))
  }

  const removeArrayItem = (section, index) => {
    setEditData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }))
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

  const currentData = isEditing ? editData : profileData

  return (
    <div className="estudiante-profile">
      {/* Navigation Header */}
      <header className="profile-header">
        <nav className="main-nav">
          <div className="nav-left">
            <button className="nav-item" onClick={() => onNavigate("inicio")}>
              Inicio
            </button>
            <button className="nav-item" onClick={() => onNavigate("buscar-oportunidades")}>
              Buscar Oportunidades
            </button>
            <button className="nav-item" onClick={() => onNavigate("mis-postulaciones")}>
              Mis Postulaciones
            </button>
            <button className="nav-item" onClick={() => onNavigate("seguimiento-actividades")}>
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
                  <button className="dropdown-item active" onClick={() => onNavigate("mi-perfil")}>
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
      <main className="profile-content">
        <div className="profile-title-section">
          <h1>Mi Perfil Académico</h1>
          <button className="btn-edit" onClick={isEditing ? handleSave : handleEditToggle}>
            {isEditing ? "Guardar Perfil" : "Editar Perfil"}
          </button>
          {isEditing && (
            <button className="btn-cancel" onClick={handleEditToggle}>
              Cancelar
            </button>
          )}
        </div>

        <div className="profile-grid">
          {/* Top Row - Personal and Academic Information */}
          <div className="profile-card personal-info">
            <h2>Información Personal</h2>
            <div className="info-group">
              <div className="info-item">
                <span className="label">Nombre completo:</span>
                {isEditing ? (
                  <input
                    type="text"
                    className="edit-input"
                    value={currentData.personalInfo.nombreCompleto}
                    onChange={(e) => handleInputChange("personalInfo", "nombreCompleto", e.target.value)}
                  />
                ) : (
                  <span className="value">{currentData.personalInfo.nombreCompleto}</span>
                )}
              </div>
              <div className="info-item">
                <span className="label">Carnet:</span>
                {isEditing ? (
                  <input
                    type="text"
                    className="edit-input"
                    value={currentData.personalInfo.carnet}
                    onChange={(e) => handleInputChange("personalInfo", "carnet", e.target.value)}
                  />
                ) : (
                  <span className="value">{currentData.personalInfo.carnet}</span>
                )}
              </div>
              <div className="info-item">
                <span className="label">Correo institucional:</span>
                {isEditing ? (
                  <input
                    type="email"
                    className="edit-input"
                    value={currentData.personalInfo.correoInstitucional}
                    onChange={(e) => handleInputChange("personalInfo", "correoInstitucional", e.target.value)}
                  />
                ) : (
                  <span className="value">{currentData.personalInfo.correoInstitucional}</span>
                )}
              </div>
              <div className="info-item">
                <span className="label">Teléfono:</span>
                {isEditing ? (
                  <input
                    type="tel"
                    className="edit-input"
                    value={currentData.personalInfo.telefono}
                    onChange={(e) => handleInputChange("personalInfo", "telefono", e.target.value)}
                  />
                ) : (
                  <span className="value">{currentData.personalInfo.telefono}</span>
                )}
              </div>
            </div>
          </div>

          <div className="profile-card academic-info">
            <h2>Información Académica</h2>
            <div className="info-group">
              <div className="info-item">
                <span className="label">Carrera:</span>
                {isEditing ? (
                  <input
                    type="text"
                    className="edit-input"
                    value={currentData.academicInfo.carrera}
                    onChange={(e) => handleInputChange("academicInfo", "carrera", e.target.value)}
                  />
                ) : (
                  <span className="value">{currentData.academicInfo.carrera}</span>
                )}
              </div>
              <div className="info-item">
                <span className="label">Nivel académico:</span>
                {isEditing ? (
                  <select
                    className="edit-select"
                    value={currentData.academicInfo.nivelAcademico}
                    onChange={(e) => handleInputChange("academicInfo", "nivelAcademico", e.target.value)}
                  >
                    <option value="Primer año">Primer año</option>
                    <option value="Segundo año">Segundo año</option>
                    <option value="Tercer año">Tercer año</option>
                    <option value="Cuarto año">Cuarto año</option>
                    <option value="Quinto año">Quinto año</option>
                  </select>
                ) : (
                  <span className="value">{currentData.academicInfo.nivelAcademico}</span>
                )}
              </div>
              <div className="info-item">
                <span className="label">Promedio ponderado:</span>
                <span className="value">
                  <span className="gpa-badge">{currentData.academicInfo.promedioPonderado}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Middle Row - Courses and Skills */}
          <div className="profile-card courses">
            <h2>Cursos Aprobados</h2>
            <div className="courses-list">
              {currentData.cursosAprobados.map((curso, index) => (
                <div key={index} className="course-item">
                  {isEditing ? (
                    <div className="edit-course">
                      <input
                        type="text"
                        className="edit-input"
                        value={curso}
                        onChange={(e) => handleArrayChange("cursosAprobados", index, e.target.value)}
                      />
                      <button className="btn-remove" onClick={() => removeArrayItem("cursosAprobados", index)}>
                        ×
                      </button>
                    </div>
                  ) : (
                    <span>{curso}</span>
                  )}
                </div>
              ))}
              {isEditing && (
                <button className="btn-add" onClick={() => addArrayItem("cursosAprobados", "Nuevo curso")}>
                  + Agregar curso
                </button>
              )}
            </div>
          </div>

          <div className="profile-card skills">
            <h2>Habilidades y Competencias</h2>
            <div className="skills-list">
              {currentData.habilidades.map((habilidad, index) => (
                <div key={index} className="skill-item">
                  {isEditing ? (
                    <div className="edit-skill">
                      <input
                        type="text"
                        className="edit-input"
                        value={habilidad}
                        onChange={(e) => handleArrayChange("habilidades", index, e.target.value)}
                      />
                      <button className="btn-remove" onClick={() => removeArrayItem("habilidades", index)}>
                        ×
                      </button>
                    </div>
                  ) : (
                    <span>{habilidad}</span>
                  )}
                </div>
              ))}
              {isEditing && (
                <button className="btn-add" onClick={() => addArrayItem("habilidades", "Nueva habilidad")}>
                  + Agregar habilidad
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row - Experience (Full Width) */}
          <div className="profile-card experience">
            <h2>Experiencia Previa en Asistencias</h2>
            <div className="experience-list">
              {currentData.experienciaPrevia.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <span className="experience-type">{exp.tipo}</span>
                    <span className="experience-description">- {exp.descripcion}</span>
                  </div>
                  <div className="experience-details">
                    <span>
                      Profesor: {exp.profesor} | Período: {exp.periodo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default EstudianteProfile
