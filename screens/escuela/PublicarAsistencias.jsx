"use client"

import { useState } from "react"
import "./PublicarAsistencias.css"
import EscuelaNavigation from "./components/EscuelaNavigation"

function PublicarAsistencias({ currentUser, onLogout, onNavigate, onBack }) {
  const [formData, setFormData] = useState({
    nombreOferta: "",
    profesorResponsable: "",
    descripcionDetallada: "",
    numeroEstudiantes: "",
    horasSemestrales: "",
    fechaInicio: "",
    fechaFinalizacion: "",
    beneficiosEconomicos: "Exoneración total del pago de matrícula",
    promedioMinimo: "",
    cursosPrevios: "",
    habilidadesEspecificas: "",
    metodoEvaluacion: "Revisión de expediente académico",
  })

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Publishing assistance offer:", formData)
    alert("Asistencia publicada exitosamente")
    onBack()
  }

  // Handle cancel
  const handleCancel = () => {
    onBack()
  }

  return (
    <div className="publicar-asistencias">
      {/* Reusable Navigation Component */}
      <EscuelaNavigation currentUser={currentUser} onLogout={onLogout} activeSection="publicar" onNavigate={onBack} />

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          <div className="page-header">
            <h1 className="page-title">Publicar Oferta de Asistencia</h1>
          </div>

          <div className="form-container">
            <form onSubmit={handleSubmit} className="assistance-form">
              {/* Row 1: Nombre de la oferta y Profesor responsable */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombreOferta">Nombre de la oferta</label>
                  <input
                    type="text"
                    id="nombreOferta"
                    name="nombreOferta"
                    value={formData.nombreOferta}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="profesorResponsable">Profesor responsable</label>
                  <input
                    type="text"
                    id="profesorResponsable"
                    name="profesorResponsable"
                    value={formData.profesorResponsable}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Row 2: Descripción detallada */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="descripcionDetallada">Descripción detallada</label>
                  <textarea
                    id="descripcionDetallada"
                    name="descripcionDetallada"
                    value={formData.descripcionDetallada}
                    onChange={handleInputChange}
                    rows="4"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Row 3: Número de estudiantes, Horas semestrales, Fechas */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="numeroEstudiantes">Número de estudiantes</label>
                  <input
                    type="number"
                    id="numeroEstudiantes"
                    name="numeroEstudiantes"
                    value={formData.numeroEstudiantes}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="horasSemestrales">Horas semestrales</label>
                  <input
                    type="number"
                    id="horasSemestrales"
                    name="horasSemestrales"
                    value={formData.horasSemestrales}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fechaInicio">Fecha de inicio</label>
                  <input
                    type="date"
                    id="fechaInicio"
                    name="fechaInicio"
                    value={formData.fechaInicio}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fechaFinalizacion">Fecha de finalización</label>
                  <input
                    type="date"
                    id="fechaFinalizacion"
                    name="fechaFinalizacion"
                    value={formData.fechaFinalizacion}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Row 4: Beneficios económicos */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="beneficiosEconomicos">Beneficios económicos</label>
                  <select
                    id="beneficiosEconomicos"
                    name="beneficiosEconomicos"
                    value={formData.beneficiosEconomicos}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Exoneración total del pago de matrícula">
                      Exoneración total del pago de matrícula
                    </option>
                    <option value="Exoneración parcial del pago de matrícula">
                      Exoneración parcial del pago de matrícula
                    </option>
                    <option value="Pago por horas trabajadas">Pago por horas trabajadas</option>
                    <option value="Beca de alimentación">Beca de alimentación</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Promedio mínimo y Cursos previos */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="promedioMinimo">Promedio mínimo requerido</label>
                  <input
                    type="number"
                    id="promedioMinimo"
                    name="promedioMinimo"
                    value={formData.promedioMinimo}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    step="0.1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cursosPrevios">Cursos previos necesarios</label>
                  <input
                    type="text"
                    id="cursosPrevios"
                    name="cursosPrevios"
                    value={formData.cursosPrevios}
                    onChange={handleInputChange}
                    placeholder="Ej: Cálculo I, Programación I"
                  />
                </div>
              </div>

              {/* Row 6: Habilidades específicas */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="habilidadesEspecificas">Habilidades específicas requeridas</label>
                  <textarea
                    id="habilidadesEspecificas"
                    name="habilidadesEspecificas"
                    value={formData.habilidadesEspecificas}
                    onChange={handleInputChange}
                    rows="3"
                  ></textarea>
                </div>
              </div>

              {/* Row 7: Método de evaluación */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="metodoEvaluacion">Método de evaluación de postulaciones</label>
                  <select
                    id="metodoEvaluacion"
                    name="metodoEvaluacion"
                    value={formData.metodoEvaluacion}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Revisión de expediente académico">Revisión de expediente académico</option>
                    <option value="Entrevista personal">Entrevista personal</option>
                    <option value="Examen técnico">Examen técnico</option>
                    <option value="Presentación de proyecto">Presentación de proyecto</option>
                  </select>
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                  Cancelar
                </button>
                <button type="submit" className="btn-submit">
                  Publicar Asistencia
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PublicarAsistencias
