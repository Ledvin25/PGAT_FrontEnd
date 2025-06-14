"use client"

import { useState } from "react"
import EscuelaNavigation from "./components/EscuelaNavigation"
import "./PerfilEscuela.css"

function PerfilEscuela({ currentUser, onLogout, onNavigate, onBack }) {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    informacionGeneral: {
      nombre: "Escuela de Ingeniería en Computación",
      facultad: "Ingeniería",
      correoInstitucional: "computacion@itcr.ac.cr",
      telefono: "2550-2400",
      responsable: "Dr. Roberto Cortés",
    },
    programasAcademicos: [
      "Bachillerato en Ingeniería en Computación",
      "Licenciatura en Ingeniería en Computación",
      "Maestría en Computación",
    ],
    descripcion:
      "La Escuela de Ingeniería en Computación forma profesionales capaces de crear soluciones informáticas para diversos sectores productivos...",
    criteriosElegibilidad: {
      promedioMinimo: 80,
      cursosPrerequisitos: "Programación I, Estructuras de Datos",
      horasMaximas: 20,
      requiereEntrevista: true,
    },
  })

  const [editData, setEditData] = useState({ ...profileData })

  // Handle navigation back to dashboard
  const handleBack = () => {
    if (onBack) {
      onBack()
    }
  }

  // Handle edit mode toggle
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setProfileData({ ...editData })
      console.log("Profile updated:", editData)
    } else {
      // Enter edit mode
      setEditData({ ...profileData })
    }
    setIsEditing(!isEditing)
  }

  // Handle input changes
  const handleInputChange = (section, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  // Handle array changes (for academic programs)
  const handleArrayChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      programasAcademicos: prev.programasAcademicos.map((item, i) => (i === index ? value : item)),
    }))
  }

  // Add new academic program
  const addAcademicProgram = () => {
    setEditData((prev) => ({
      ...prev,
      programasAcademicos: [...prev.programasAcademicos, ""],
    }))
  }

  // Remove academic program
  const removeAcademicProgram = (index) => {
    setEditData((prev) => ({
      ...prev,
      programasAcademicos: prev.programasAcademicos.filter((_, i) => i !== index),
    }))
  }

  // Cancel editing
  const handleCancel = () => {
    setEditData({ ...profileData })
    setIsEditing(false)
  }

  return (
    <div className="perfil-escuela">
      {/* Navigation */}
      <EscuelaNavigation currentUser={currentUser} onLogout={onLogout} activeSection="perfil" onNavigate={onNavigate} />

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">Perfil de Escuela/Departamento</h1>
            <div className="header-actions">
              {isEditing ? (
                <div className="edit-actions">
                  <button className="btn-cancel" onClick={handleCancel}>
                    Cancelar
                  </button>
                  <button className="btn-save" onClick={handleEditToggle}>
                    Guardar Cambios
                  </button>
                </div>
              ) : (
                <button className="btn-edit" onClick={handleEditToggle}>
                  Editar Perfil
                </button>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="profile-content">
            <div className="profile-grid">
              {/* General Information */}
              <div className="profile-section">
                <h2 className="section-title">Información General</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <label className="info-label">Nombre:</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="info-input"
                        value={editData.informacionGeneral.nombre}
                        onChange={(e) => handleInputChange("informacionGeneral", "nombre", e.target.value)}
                      />
                    ) : (
                      <span className="info-value">{profileData.informacionGeneral.nombre}</span>
                    )}
                  </div>

                  <div className="info-item">
                    <label className="info-label">Facultad:</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="info-input"
                        value={editData.informacionGeneral.facultad}
                        onChange={(e) => handleInputChange("informacionGeneral", "facultad", e.target.value)}
                      />
                    ) : (
                      <span className="info-value">{profileData.informacionGeneral.facultad}</span>
                    )}
                  </div>

                  <div className="info-item">
                    <label className="info-label">Correo Institucional:</label>
                    {isEditing ? (
                      <input
                        type="email"
                        className="info-input"
                        value={editData.informacionGeneral.correoInstitucional}
                        onChange={(e) => handleInputChange("informacionGeneral", "correoInstitucional", e.target.value)}
                      />
                    ) : (
                      <span className="info-value">{profileData.informacionGeneral.correoInstitucional}</span>
                    )}
                  </div>

                  <div className="info-item">
                    <label className="info-label">Teléfono:</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        className="info-input"
                        value={editData.informacionGeneral.telefono}
                        onChange={(e) => handleInputChange("informacionGeneral", "telefono", e.target.value)}
                      />
                    ) : (
                      <span className="info-value">{profileData.informacionGeneral.telefono}</span>
                    )}
                  </div>

                  <div className="info-item">
                    <label className="info-label">Responsable:</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="info-input"
                        value={editData.informacionGeneral.responsable}
                        onChange={(e) => handleInputChange("informacionGeneral", "responsable", e.target.value)}
                      />
                    ) : (
                      <span className="info-value">{profileData.informacionGeneral.responsable}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic Programs */}
              <div className="profile-section">
                <h2 className="section-title">Programas Académicos</h2>
                <div className="programs-list">
                  {(isEditing ? editData.programasAcademicos : profileData.programasAcademicos).map(
                    (program, index) => (
                      <div key={index} className="program-item">
                        {isEditing ? (
                          <div className="program-edit">
                            <input
                              type="text"
                              className="program-input"
                              value={program}
                              onChange={(e) => handleArrayChange(index, e.target.value)}
                            />
                            <button className="btn-remove" onClick={() => removeAcademicProgram(index)}>
                              ×
                            </button>
                          </div>
                        ) : (
                          <span className="program-name">{program}</span>
                        )}
                      </div>
                    ),
                  )}
                  {isEditing && (
                    <button className="btn-add-program" onClick={addAcademicProgram}>
                      + Agregar Programa
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="profile-section full-width">
              <h2 className="section-title">Descripción</h2>
              {isEditing ? (
                <textarea
                  className="description-textarea"
                  value={editData.descripcion}
                  onChange={(e) => setEditData((prev) => ({ ...prev, descripcion: e.target.value }))}
                  rows="4"
                />
              ) : (
                <p className="description-text">{profileData.descripcion}</p>
              )}
            </div>

            {/* Eligibility Criteria */}
            <div className="profile-section full-width">
              <h2 className="section-title">Criterios de Elegibilidad para Asistencias y Tutorías</h2>
              <div className="criteria-grid">
                <div className="criteria-item">
                  <label className="criteria-label">Promedio mínimo requerido:</label>
                  {isEditing ? (
                    <input
                      type="number"
                      className="criteria-input"
                      value={editData.criteriosElegibilidad.promedioMinimo}
                      onChange={(e) =>
                        handleInputChange("criteriosElegibilidad", "promedioMinimo", Number.parseInt(e.target.value))
                      }
                    />
                  ) : (
                    <span className="criteria-value">{profileData.criteriosElegibilidad.promedioMinimo}</span>
                  )}
                </div>

                <div className="criteria-item">
                  <label className="criteria-label">Cursos previos aprobados:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="criteria-input"
                      value={editData.criteriosElegibilidad.cursosPrerequisitos}
                      onChange={(e) =>
                        handleInputChange("criteriosElegibilidad", "cursosPrerequisitos", e.target.value)
                      }
                    />
                  ) : (
                    <span className="criteria-value">{profileData.criteriosElegibilidad.cursosPrerequisitos}</span>
                  )}
                </div>

                <div className="criteria-item">
                  <label className="criteria-label">Horas máximas permitidas por semestre:</label>
                  {isEditing ? (
                    <input
                      type="number"
                      className="criteria-input"
                      value={editData.criteriosElegibilidad.horasMaximas}
                      onChange={(e) =>
                        handleInputChange("criteriosElegibilidad", "horasMaximas", Number.parseInt(e.target.value))
                      }
                    />
                  ) : (
                    <span className="criteria-value">{profileData.criteriosElegibilidad.horasMaximas}</span>
                  )}
                </div>

                <div className="criteria-item">
                  <label className="criteria-label">¿Requiere entrevista?</label>
                  {isEditing ? (
                    <select
                      className="criteria-select"
                      value={editData.criteriosElegibilidad.requiereEntrevista ? "Si" : "No"}
                      onChange={(e) =>
                        handleInputChange("criteriosElegibilidad", "requiereEntrevista", e.target.value === "Si")
                      }
                    >
                      <option value="Si">Sí</option>
                      <option value="No">No</option>
                    </select>
                  ) : (
                    <span className="criteria-value">
                      {profileData.criteriosElegibilidad.requiereEntrevista ? "Sí" : "No"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PerfilEscuela
