"use client"

import { useState } from "react"
import "./GestionarPostulaciones.css"
import EscuelaNavigation from "./components/EscuelaNavigation"

function GestionarPostulaciones({ currentUser, onLogout, onNavigate, onBack }) {
  const [filterStatus, setFilterStatus] = useState("todas")
  const [postulaciones, setPostulaciones] = useState([
    {
      id: 1,
      estudiante: "Ana Mora Vargas",
      carrera: "Ingeniería en Computación",
      asistencia: "Tutoría de Programación I",
      fecha: "10/03/2025",
      promedio: 85.5,
      estado: "Pendiente",
    },
    {
      id: 2,
      estudiante: "Carlos Rojas Pérez",
      carrera: "Ingeniería en Computación",
      asistencia: "Asistencia de Laboratorio",
      fecha: "11/03/2025",
      promedio: 90.2,
      estado: "Pendiente",
    },
    {
      id: 3,
      estudiante: "María Jiménez Luna",
      carrera: "Ingeniería en Computación",
      asistencia: "Asistencia de Investigación",
      fecha: "09/03/2025",
      promedio: 88.7,
      estado: "Aprobada",
    },
    {
      id: 4,
      estudiante: "Pedro Sánchez Mora",
      carrera: "Ingeniería en Computación",
      asistencia: "Tutoría de Programación I",
      fecha: "12/03/2025",
      promedio: 82.3,
      estado: "Rechazada",
    },
  ])

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value)
    console.log("Filter changed to:", event.target.value)
  }

  // Handle approve application
  const handleApprove = (id) => {
    setPostulaciones((prev) => prev.map((post) => (post.id === id ? { ...post, estado: "Aprobada" } : post)))
    console.log("Approved application:", id)
  }

  // Handle reject application
  const handleReject = (id) => {
    setPostulaciones((prev) => prev.map((post) => (post.id === id ? { ...post, estado: "Rechazada" } : post)))
    console.log("Rejected application:", id)
  }

  // Handle view details
  const handleViewDetails = (id) => {
    console.log("View details for application:", id)
    alert(`Ver detalles de la postulación ${id} - Funcionalidad por implementar`)
  }

  // Get status badge class
  const getStatusClass = (estado) => {
    switch (estado) {
      case "Pendiente":
        return "status-pending"
      case "Aprobada":
        return "status-approved"
      case "Rechazada":
        return "status-rejected"
      default:
        return "status-pending"
    }
  }

  return (
    <div className="gestionar-postulaciones">
      {/* Reusable Navigation Component */}
      <EscuelaNavigation currentUser={currentUser} onLogout={onLogout} activeSection="gestionar" onNavigate={onBack} />

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          {/* Page Title */}
          <div className="page-header">
            <h1 className="page-title">Gestión de Postulaciones</h1>
          </div>

          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-group">
              <label htmlFor="status-filter" className="filter-label">
                Filtrar por estado:
              </label>
              <select id="status-filter" className="filter-select" value={filterStatus} onChange={handleFilterChange}>
                <option value="todas">Todas las postulaciones</option>
                <option value="pendiente">Pendientes</option>
                <option value="aprobada">Aprobadas</option>
                <option value="rechazada">Rechazadas</option>
              </select>
            </div>
          </div>

          {/* Applications Table */}
          <div className="table-container">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Estudiante</th>
                  <th>Carrera</th>
                  <th>Asistencia/Tutoría</th>
                  <th>Fecha</th>
                  <th>Promedio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {postulaciones.map((postulacion) => (
                  <tr key={postulacion.id}>
                    <td className="student-name">{postulacion.estudiante}</td>
                    <td className="career">{postulacion.carrera}</td>
                    <td className="assistance">{postulacion.asistencia}</td>
                    <td className="date">{postulacion.fecha}</td>
                    <td className="average">{postulacion.promedio}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(postulacion.estado)}`}>{postulacion.estado}</span>
                    </td>
                    <td className="actions">
                      {postulacion.estado === "Pendiente" && (
                        <>
                          <button className="action-btn approve-btn" onClick={() => handleApprove(postulacion.id)}>
                            Aprobar
                          </button>
                          <button className="action-btn reject-btn" onClick={() => handleReject(postulacion.id)}>
                            Rechazar
                          </button>
                        </>
                      )}
                      <button className="action-btn details-btn" onClick={() => handleViewDetails(postulacion.id)}>
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default GestionarPostulaciones
