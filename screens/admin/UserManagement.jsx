"use client"

import { useState, useEffect } from "react"
import "./UserManagement.css"

function UserManagement({ currentUser }) {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [filters, setFilters] = useState({
    role: "all",
    status: "all",
    search: "",
  })
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Sample user data - replace with API call
  const sampleUsers = [
    {
      id: 1,
      name: "Dr. Roberto Cortés",
      email: "rcortes@itcr.ac.cr",
      role: "Escuela",
      department: "Escuela de Ingeniería en Computación",
      status: "Activo",
      lastAccess: "15/03/2025",
      createdDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Dr. Carlos Ramírez",
      email: "cramirez@itcr.ac.cr",
      role: "Profesor",
      department: "Escuela de Ingeniería en Computación",
      status: "Activo",
      lastAccess: "15/03/2025",
      createdDate: "2024-02-10",
    },
    {
      id: 3,
      name: "Luis Urbina Salazar",
      email: "lurbina@estudiante.tec.ac.cr",
      role: "Estudiante",
      department: "Ingeniería en Computación",
      status: "Activo",
      lastAccess: "14/03/2025",
      createdDate: "2024-03-01",
    },
    {
      id: 4,
      name: "María Fernández López",
      email: "mfernandez@estudiante.tec.ac.cr",
      role: "Estudiante",
      department: "Ingeniería en Computación",
      status: "Activo",
      lastAccess: "13/03/2025",
      createdDate: "2024-03-05",
    },
    {
      id: 5,
      name: "Dra. Laura Martínez",
      email: "lmartinez@itcr.ac.cr",
      role: "Profesor",
      department: "Escuela de Matemática",
      status: "Inactivo",
      lastAccess: "10/02/2025",
      createdDate: "2024-01-20",
    },
  ]

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [users, filters])

  const loadUsers = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUsers(sampleUsers)
    } catch (error) {
      console.error("Error loading users:", error)
      alert("Error al cargar usuarios")
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...users]

    // Filter by role
    if (filters.role !== "all") {
      filtered = filtered.filter((user) => user.role.toLowerCase() === filters.role.toLowerCase())
    }

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter((user) => user.status.toLowerCase() === filters.status.toLowerCase())
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.department.toLowerCase().includes(searchTerm),
      )
    }

    setFilteredUsers(filtered)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const handleCreateUser = () => {
    setSelectedUser(null)
    setShowCreateModal(true)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setShowEditModal(true)
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm("¿Está seguro de que desea eliminar este usuario?")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId))
      alert("Usuario eliminado exitosamente")
    }
  }

  const handleToggleStatus = (userId) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "Activo" ? "Inactivo" : "Activo",
            }
          : user,
      ),
    )
    alert("Estado del usuario actualizado")
  }

  const getRoleBadgeClass = (role) => {
    switch (role.toLowerCase()) {
      case "escuela":
        return "role-escuela"
      case "profesor":
        return "role-profesor"
      case "estudiante":
        return "role-estudiante"
      case "administrador":
        return "role-administrador"
      default:
        return "role-default"
    }
  }

  const getStatusBadgeClass = (status) => {
    return status === "Activo" ? "status-active" : "status-inactive"
  }

  return (
    <div className="user-management-content">
      {/* Filters and Controls */}
      <div className="user-management-controls">
        <div className="user-management-filters">
          <div className="user-management-filter-group">
            <label>Filtrar por tipo:</label>
            <select
              value={filters.role}
              onChange={(e) => handleFilterChange("role", e.target.value)}
              className="user-management-select"
            >
              <option value="all">Todos los usuarios</option>
              <option value="administrador">Administrador</option>
              <option value="escuela">Escuela/Departamento</option>
              <option value="profesor">Profesor</option>
              <option value="estudiante">Estudiante</option>
            </select>
          </div>

          <div className="user-management-filter-group">
            <label>Estado:</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="user-management-select"
            >
              <option value="all">Todos</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          <div className="user-management-search-group">
            <label>Buscar usuario:</label>
            <input
              type="text"
              placeholder="Buscar por nombre o correo..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="user-management-search-input"
            />
          </div>
        </div>

        <button className="user-management-create-btn" onClick={handleCreateUser}>
          Nuevo Usuario
        </button>
      </div>

      {/* Users Table */}
      <div className="user-management-table-container">
        {isLoading ? (
          <div className="user-management-loading">
            <div className="user-management-spinner"></div>
            <p>Cargando usuarios...</p>
          </div>
        ) : (
          <table className="user-management-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Tipo</th>
                <th>Escuela/Carrera</th>
                <th>Estado</th>
                <th>Último acceso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="user-management-no-data">
                    No se encontraron usuarios
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`user-management-role-badge ${getRoleBadgeClass(user.role)}`}>{user.role}</span>
                    </td>
                    <td>{user.department}</td>
                    <td>
                      <span className={`user-management-status-badge ${getStatusBadgeClass(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>{user.lastAccess}</td>
                    <td>
                      <div className="user-management-actions">
                        <button
                          className="user-management-action-btn edit"
                          onClick={() => handleEditUser(user)}
                          title="Editar usuario"
                        >
                          ✏️
                        </button>
                        <button
                          className="user-management-action-btn toggle"
                          onClick={() => handleToggleStatus(user.id)}
                          title={user.status === "Activo" ? "Desactivar usuario" : "Activar usuario"}
                        >
                          {user.status === "Activo" ? "🔒" : "🔓"}
                        </button>
                        <button
                          className="user-management-action-btn delete"
                          onClick={() => handleDeleteUser(user.id)}
                          title="Eliminar usuario"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Results Summary */}
      <div className="user-management-summary">
        <p>
          Mostrando {filteredUsers.length} de {users.length} usuarios
        </p>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <UserModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSave={(userData) => {
            const newUser = {
              ...userData,
              id: Math.max(...users.map((u) => u.id)) + 1,
              lastAccess: "Nunca",
              createdDate: new Date().toLocaleDateString("es-ES"),
            }
            setUsers((prev) => [...prev, newUser])
            setShowCreateModal(false)
            alert("Usuario creado exitosamente")
          }}
          title="Crear Nuevo Usuario"
        />
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <UserModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={(userData) => {
            setUsers((prev) => prev.map((user) => (user.id === selectedUser.id ? { ...user, ...userData } : user)))
            setShowEditModal(false)
            alert("Usuario actualizado exitosamente")
          }}
          title="Editar Usuario"
          initialData={selectedUser}
        />
      )}
    </div>
  )
}

// User Modal Component
function UserModal({ isOpen, onClose, onSave, title, initialData = null }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    role: initialData?.role || "Estudiante",
    department: initialData?.department || "",
    status: initialData?.status || "Activo",
    password: "",
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo no es válido"
    }

    if (!formData.department.trim()) {
      newErrors.department = "La escuela/carrera es requerida"
    }

    if (!initialData && !formData.password.trim()) {
      newErrors.password = "La contraseña es requerida"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
    }
  }

  if (!isOpen) return null

  return (
    <div className="user-modal-overlay">
      <div className="user-modal">
        <div className="user-modal-header">
          <h2>{title}</h2>
          <button className="user-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="user-modal-form">
          <div className="user-modal-form-group">
            <label htmlFor="name">Nombre completo *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="user-modal-error">{errors.name}</span>}
          </div>

          <div className="user-modal-form-group">
            <label htmlFor="email">Correo electrónico *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="user-modal-error">{errors.email}</span>}
          </div>

          <div className="user-modal-form-group">
            <label htmlFor="role">Rol *</label>
            <select id="role" name="role" value={formData.role} onChange={handleInputChange}>
              <option value="Estudiante">Estudiante</option>
              <option value="Profesor">Profesor</option>
              <option value="Escuela">Escuela/Departamento</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>

          <div className="user-modal-form-group">
            <label htmlFor="department">Escuela/Carrera *</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className={errors.department ? "error" : ""}
              placeholder="Ej: Escuela de Ingeniería en Computación"
            />
            {errors.department && <span className="user-modal-error">{errors.department}</span>}
          </div>

          {!initialData && (
            <div className="user-modal-form-group">
              <label htmlFor="password">Contraseña *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? "error" : ""}
              />
              {errors.password && <span className="user-modal-error">{errors.password}</span>}
            </div>
          )}

          <div className="user-modal-form-group">
            <label htmlFor="status">Estado</label>
            <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <div className="user-modal-actions">
            <button type="button" className="user-modal-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="user-modal-save">
              {initialData ? "Actualizar" : "Crear"} Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserManagement
