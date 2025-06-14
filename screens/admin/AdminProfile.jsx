"use client"

import { useState, useEffect } from "react"
import "./AdminProfile.css"

function AdminProfile({ currentUser, onClose }) {
  const [profileData, setProfileData] = useState({
    personalInfo: {
      fullName: "Laura González Mora",
      email: "lgonzalez@itcr.ac.cr",
      phone: "2550-2100",
      department: "Tecnologías de Información y Comunicación",
      position: "Administrador Principal",
      profilePicture: null,
      emergencyContact: "Ana González - 8888-9999",
      address: "San José, Costa Rica",
    },
    accountInfo: {
      role: "Administrador Principal",
      registrationDate: "2023-01-10",
      lastAccess: "2025-03-16T14:30:00",
      accountStatus: "Activo",
      twoFactorEnabled: true,
      sessionTimeout: 30,
    },
    permissions: [
      {
        id: 1,
        name: "Gestión de usuarios",
        granted: true,
        description: "Crear, editar y eliminar usuarios del sistema",
      },
      { id: 2, name: "Aprobación de contenido", granted: true, description: "Revisar y aprobar ofertas académicas" },
      { id: 3, name: "Generación de reportes", granted: true, description: "Crear y exportar reportes del sistema" },
      { id: 4, name: "Configuración del sistema", granted: true, description: "Modificar configuraciones globales" },
      { id: 5, name: "Auditoría de actividades", granted: true, description: "Acceso a logs y auditoría del sistema" },
      { id: 6, name: "Gestión de roles", granted: false, description: "Asignar y modificar roles de usuario" },
      { id: 7, name: "Backup del sistema", granted: false, description: "Realizar respaldos de la base de datos" },
    ],
  })

  const [activityHistory, setActivityHistory] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const [showPermissionRequestModal, setShowPermissionRequestModal] = useState(false)
  const [selectedPermission, setSelectedPermission] = useState(null)

  // Sample activity history
  const sampleActivities = [
    {
      id: 1,
      action: "Generación de reporte",
      description: "Generó reporte de asistencias y tutorías para el I Semestre 2025",
      timestamp: "2025-03-16T14:30:00",
      category: "reports",
      status: "success",
      details: "Formato: Excel, Período: 01/01/2025 - 30/06/2025",
    },
    {
      id: 2,
      action: "Aprobación de oferta",
      description: "Aprobó oferta 'Asistente de Laboratorio - Programación I'",
      timestamp: "2025-03-16T11:15:00",
      category: "content",
      status: "success",
      details: "Escuela de Ingeniería en Computación",
    },
    {
      id: 3,
      action: "Creación de usuario",
      description: "Creó nuevo usuario: Dr. Roberto Cortés",
      timestamp: "2025-03-15T16:45:00",
      category: "users",
      status: "success",
      details: "Rol: Profesor, Escuela: Computación",
    },
    {
      id: 4,
      action: "Modificación de perfil",
      description: "Actualizó información de contacto",
      timestamp: "2025-03-15T09:20:00",
      category: "profile",
      status: "success",
      details: "Cambió número de teléfono",
    },
    {
      id: 5,
      action: "Inicio de sesión",
      description: "Acceso al sistema desde IP: 192.168.1.100",
      timestamp: "2025-03-15T08:00:00",
      category: "security",
      status: "success",
      details: "Navegador: Chrome 122.0",
    },
    {
      id: 6,
      action: "Rechazo de oferta",
      description: "Rechazó oferta 'Tutoría de Matemáticas'",
      timestamp: "2025-03-14T15:30:00",
      category: "content",
      status: "warning",
      details: "Motivo: Requisitos no claros",
    },
    {
      id: 7,
      action: "Exportación de datos",
      description: "Exportó lista de usuarios activos",
      timestamp: "2025-03-14T10:10:00",
      category: "reports",
      status: "success",
      details: "Formato: CSV, 234 registros",
    },
    {
      id: 8,
      action: "Configuración del sistema",
      description: "Modificó tiempo de sesión a 30 minutos",
      timestamp: "2025-03-13T13:45:00",
      category: "system",
      status: "success",
      details: "Configuración de seguridad",
    },
  ]

  useEffect(() => {
    loadActivityHistory()
    setEditForm(profileData.personalInfo)
  }, [])

  const loadActivityHistory = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setActivityHistory(sampleActivities)
    } catch (error) {
      console.error("Error loading activity history:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm(profileData.personalInfo)
      setErrors({})
    }
    setIsEditing(!isEditing)
  }

  const handleInputChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!editForm.fullName?.trim()) {
      newErrors.fullName = "El nombre completo es requerido"
    }

    if (!editForm.email?.trim()) {
      newErrors.email = "El correo electrónico es requerido"
    } else if (!/\S+@\S+\.\S+/.test(editForm.email)) {
      newErrors.email = "El correo electrónico no es válido"
    }

    if (!editForm.phone?.trim()) {
      newErrors.phone = "El teléfono es requerido"
    } else if (!/^\d{4}-\d{4}$/.test(editForm.phone)) {
      newErrors.phone = "El formato del teléfono debe ser XXXX-XXXX"
    }

    if (!editForm.department?.trim()) {
      newErrors.department = "El departamento es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveProfile = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setProfileData((prev) => ({
        ...prev,
        personalInfo: { ...editForm },
      }))

      // Add activity log
      const newActivity = {
        id: Date.now(),
        action: "Modificación de perfil",
        description: "Actualizó información personal",
        timestamp: new Date().toISOString(),
        category: "profile",
        status: "success",
        details: "Información de contacto actualizada",
      }

      setActivityHistory((prev) => [newActivity, ...prev])
      setIsEditing(false)
      alert("Perfil actualizado exitosamente")
    } catch (error) {
      console.error("Error saving profile:", error)
      alert("Error al guardar el perfil")
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("La imagen debe ser menor a 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setEditForm((prev) => ({
          ...prev,
          profilePicture: e.target.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRequestPermission = (permission) => {
    setSelectedPermission(permission)
    setShowPermissionRequestModal(true)
  }

  const submitPermissionRequest = (reason) => {
    // Add activity log
    const newActivity = {
      id: Date.now(),
      action: "Solicitud de permiso",
      description: `Solicitó permiso: ${selectedPermission.name}`,
      timestamp: new Date().toISOString(),
      category: "security",
      status: "pending",
      details: `Razón: ${reason}`,
    }

    setActivityHistory((prev) => [newActivity, ...prev])
    setShowPermissionRequestModal(false)
    setSelectedPermission(null)
    alert("Solicitud de permiso enviada para revisión")
  }

  const getActivityIcon = (category) => {
    switch (category) {
      case "reports":
        return "📊"
      case "content":
        return "📝"
      case "users":
        return "👥"
      case "profile":
        return "👤"
      case "security":
        return "🔒"
      case "system":
        return "⚙️"
      default:
        return "📋"
    }
  }

  const getActivityStatusClass = (status) => {
    switch (status) {
      case "success":
        return "activity-status-success"
      case "warning":
        return "activity-status-warning"
      case "error":
        return "activity-status-error"
      case "pending":
        return "activity-status-pending"
      default:
        return "activity-status-default"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="admin-profile-overlay">
      <div className="admin-profile-modal">
        <div className="admin-profile-header">
          <h1>Mi Perfil de Administrador</h1>
          <button className="admin-profile-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="admin-profile-tabs">
          <button
            className={`admin-profile-tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Información Personal
          </button>
          <button
            className={`admin-profile-tab ${activeTab === "permissions" ? "active" : ""}`}
            onClick={() => setActiveTab("permissions")}
          >
            Permisos y Roles
          </button>
          <button
            className={`admin-profile-tab ${activeTab === "activity" ? "active" : ""}`}
            onClick={() => setActiveTab("activity")}
          >
            Historial de Actividad
          </button>
          <button
            className={`admin-profile-tab ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            Seguridad
          </button>
        </div>

        <div className="admin-profile-content">
          {activeTab === "profile" && (
            <div className="admin-profile-section">
              <div className="admin-profile-section-header">
                <h2>Información Personal</h2>
                <button className="admin-profile-edit-btn" onClick={handleEditToggle}>
                  {isEditing ? "Cancelar" : "Editar Perfil"}
                </button>
              </div>

              <div className="admin-profile-form">
                {/* Profile Picture */}
                <div className="admin-profile-picture-section">
                  <div className="admin-profile-picture">
                    {editForm.profilePicture || profileData.personalInfo.profilePicture ? (
                      <img
                        src={editForm.profilePicture || profileData.personalInfo.profilePicture}
                        alt="Foto de perfil"
                      />
                    ) : (
                      <div className="admin-profile-picture-placeholder">
                        <span>{profileData.personalInfo.fullName.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <div className="admin-profile-picture-actions">
                      <input
                        type="file"
                        id="profilePicture"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        style={{ display: "none" }}
                      />
                      <label htmlFor="profilePicture" className="admin-profile-picture-btn">
                        Cambiar Foto
                      </label>
                    </div>
                  )}
                </div>

                {/* Personal Information */}
                <div className="admin-profile-info-grid">
                  <div className="admin-profile-info-section">
                    <h3>Información Personal</h3>
                    <div className="admin-profile-form-group">
                      <label>Nombre completo:</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.fullName || ""}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          className={errors.fullName ? "error" : ""}
                        />
                      ) : (
                        <span>{profileData.personalInfo.fullName}</span>
                      )}
                      {errors.fullName && <span className="admin-profile-error">{errors.fullName}</span>}
                    </div>

                    <div className="admin-profile-form-group">
                      <label>Correo institucional:</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editForm.email || ""}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={errors.email ? "error" : ""}
                        />
                      ) : (
                        <span>{profileData.personalInfo.email}</span>
                      )}
                      {errors.email && <span className="admin-profile-error">{errors.email}</span>}
                    </div>

                    <div className="admin-profile-form-group">
                      <label>Teléfono:</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.phone || ""}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="XXXX-XXXX"
                          className={errors.phone ? "error" : ""}
                        />
                      ) : (
                        <span>{profileData.personalInfo.phone}</span>
                      )}
                      {errors.phone && <span className="admin-profile-error">{errors.phone}</span>}
                    </div>

                    <div className="admin-profile-form-group">
                      <label>Departamento:</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.department || ""}
                          onChange={(e) => handleInputChange("department", e.target.value)}
                          className={errors.department ? "error" : ""}
                        />
                      ) : (
                        <span>{profileData.personalInfo.department}</span>
                      )}
                      {errors.department && <span className="admin-profile-error">{errors.department}</span>}
                    </div>

                    <div className="admin-profile-form-group">
                      <label>Contacto de emergencia:</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.emergencyContact || ""}
                          onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                        />
                      ) : (
                        <span>{profileData.personalInfo.emergencyContact}</span>
                      )}
                    </div>

                    <div className="admin-profile-form-group">
                      <label>Dirección:</label>
                      {isEditing ? (
                        <textarea
                          value={editForm.address || ""}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          rows="2"
                        />
                      ) : (
                        <span>{profileData.personalInfo.address}</span>
                      )}
                    </div>
                  </div>

                  <div className="admin-profile-info-section">
                    <h3>Información de Cuenta</h3>
                    <div className="admin-profile-form-group">
                      <label>Rol:</label>
                      <span className="admin-profile-role-badge">{profileData.accountInfo.role}</span>
                    </div>

                    <div className="admin-profile-form-group">
                      <label>Fecha de registro:</label>
                      <span>{new Date(profileData.accountInfo.registrationDate).toLocaleDateString("es-ES")}</span>
                    </div>

                    <div className="admin-profile-form-group">
                      <label>Último acceso:</label>
                      <span>{formatDate(profileData.accountInfo.lastAccess)}</span>
                    </div>

                    <div className="admin-profile-form-group">
                      <label>Estado de cuenta:</label>
                      <span className="admin-profile-status-badge status-active">
                        {profileData.accountInfo.accountStatus}
                      </span>
                    </div>

                    <div className="admin-profile-form-group">
                      <label>Autenticación de dos factores:</label>
                      <span
                        className={`admin-profile-2fa-badge ${profileData.accountInfo.twoFactorEnabled ? "enabled" : "disabled"}`}
                      >
                        {profileData.accountInfo.twoFactorEnabled ? "Habilitada" : "Deshabilitada"}
                      </span>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="admin-profile-form-actions">
                    <button className="admin-profile-save-btn" onClick={handleSaveProfile} disabled={isLoading}>
                      {isLoading ? "Guardando..." : "Guardar Cambios"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "permissions" && (
            <div className="admin-profile-section">
              <h2>Permisos del Sistema</h2>
              <div className="admin-profile-permissions">
                {profileData.permissions.map((permission) => (
                  <div key={permission.id} className="admin-profile-permission-item">
                    <div className="admin-profile-permission-info">
                      <div className="admin-profile-permission-header">
                        <h4>{permission.name}</h4>
                        <span
                          className={`admin-profile-permission-status ${permission.granted ? "granted" : "denied"}`}
                        >
                          {permission.granted ? "✓ Concedido" : "✗ No concedido"}
                        </span>
                      </div>
                      <p>{permission.description}</p>
                    </div>
                    {!permission.granted && (
                      <button className="admin-profile-request-btn" onClick={() => handleRequestPermission(permission)}>
                        Solicitar
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="admin-profile-section">
              <h2>Historial de Actividad</h2>
              {isLoading ? (
                <div className="admin-profile-loading">
                  <div className="admin-profile-spinner"></div>
                  <p>Cargando historial...</p>
                </div>
              ) : (
                <div className="admin-profile-activity-list">
                  {activityHistory.map((activity) => (
                    <div key={activity.id} className="admin-profile-activity-item">
                      <div className="admin-profile-activity-icon">{getActivityIcon(activity.category)}</div>
                      <div className="admin-profile-activity-content">
                        <div className="admin-profile-activity-header">
                          <h4>{activity.action}</h4>
                          <span className={`admin-profile-activity-status ${getActivityStatusClass(activity.status)}`}>
                            {activity.status === "success" && "Exitoso"}
                            {activity.status === "warning" && "Advertencia"}
                            {activity.status === "error" && "Error"}
                            {activity.status === "pending" && "Pendiente"}
                          </span>
                        </div>
                        <p>{activity.description}</p>
                        <div className="admin-profile-activity-details">
                          <span className="admin-profile-activity-time">{formatDate(activity.timestamp)}</span>
                          <span className="admin-profile-activity-extra">{activity.details}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "security" && (
            <div className="admin-profile-section">
              <h2>Configuración de Seguridad</h2>
              <div className="admin-profile-security-options">
                <div className="admin-profile-security-item">
                  <h4>Cambiar Contraseña</h4>
                  <p>Actualiza tu contraseña para mantener tu cuenta segura</p>
                  <button className="admin-profile-security-btn" onClick={() => setShowChangePasswordModal(true)}>
                    Cambiar Contraseña
                  </button>
                </div>

                <div className="admin-profile-security-item">
                  <h4>Autenticación de Dos Factores</h4>
                  <p>
                    {profileData.accountInfo.twoFactorEnabled
                      ? "La autenticación de dos factores está habilitada"
                      : "Habilita la autenticación de dos factores para mayor seguridad"}
                  </p>
                  <button className="admin-profile-security-btn">
                    {profileData.accountInfo.twoFactorEnabled ? "Deshabilitar 2FA" : "Habilitar 2FA"}
                  </button>
                </div>

                <div className="admin-profile-security-item">
                  <h4>Tiempo de Sesión</h4>
                  <p>Tiempo de inactividad antes de cerrar sesión automáticamente</p>
                  <select className="admin-profile-security-select" defaultValue="30">
                    <option value="15">15 minutos</option>
                    <option value="30">30 minutos</option>
                    <option value="60">1 hora</option>
                    <option value="120">2 horas</option>
                  </select>
                </div>

                <div className="admin-profile-security-item">
                  <h4>Sesiones Activas</h4>
                  <p>Revisa y cierra sesiones activas en otros dispositivos</p>
                  <button className="admin-profile-security-btn">Ver Sesiones</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowChangePasswordModal(false)}
          onSuccess={() => {
            setShowChangePasswordModal(false)
            // Add activity log
            const newActivity = {
              id: Date.now(),
              action: "Cambio de contraseña",
              description: "Contraseña actualizada exitosamente",
              timestamp: new Date().toISOString(),
              category: "security",
              status: "success",
              details: "Contraseña cambiada por el usuario",
            }
            setActivityHistory((prev) => [newActivity, ...prev])
          }}
        />
      )}

      {/* Permission Request Modal */}
      {showPermissionRequestModal && selectedPermission && (
        <PermissionRequestModal
          permission={selectedPermission}
          onClose={() => setShowPermissionRequestModal(false)}
          onSubmit={submitPermissionRequest}
        />
      )}
    </div>
  )
}

// Change Password Modal Component
function ChangePasswordModal({ onClose, onSuccess }) {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field, value) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validatePasswords = () => {
    const newErrors = {}

    if (!passwords.current) {
      newErrors.current = "La contraseña actual es requerida"
    }

    if (!passwords.new) {
      newErrors.new = "La nueva contraseña es requerida"
    } else if (passwords.new.length < 8) {
      newErrors.new = "La contraseña debe tener al menos 8 caracteres"
    }

    if (!passwords.confirm) {
      newErrors.confirm = "Confirma la nueva contraseña"
    } else if (passwords.new !== passwords.confirm) {
      newErrors.confirm = "Las contraseñas no coinciden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validatePasswords()) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert("Contraseña cambiada exitosamente")
      onSuccess()
    } catch (error) {
      alert("Error al cambiar la contraseña")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="admin-profile-modal-overlay">
      <div className="admin-profile-change-password-modal">
        <div className="admin-profile-modal-header">
          <h3>Cambiar Contraseña</h3>
          <button onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="admin-profile-password-form">
          <div className="admin-profile-form-group">
            <label>Contraseña actual:</label>
            <input
              type="password"
              value={passwords.current}
              onChange={(e) => handleInputChange("current", e.target.value)}
              className={errors.current ? "error" : ""}
            />
            {errors.current && <span className="admin-profile-error">{errors.current}</span>}
          </div>

          <div className="admin-profile-form-group">
            <label>Nueva contraseña:</label>
            <input
              type="password"
              value={passwords.new}
              onChange={(e) => handleInputChange("new", e.target.value)}
              className={errors.new ? "error" : ""}
            />
            {errors.new && <span className="admin-profile-error">{errors.new}</span>}
          </div>

          <div className="admin-profile-form-group">
            <label>Confirmar nueva contraseña:</label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => handleInputChange("confirm", e.target.value)}
              className={errors.confirm ? "error" : ""}
            />
            {errors.confirm && <span className="admin-profile-error">{errors.confirm}</span>}
          </div>

          <div className="admin-profile-modal-actions">
            <button type="button" onClick={onClose} className="admin-profile-cancel-btn">
              Cancelar
            </button>
            <button type="submit" disabled={isLoading} className="admin-profile-save-btn">
              {isLoading ? "Cambiando..." : "Cambiar Contraseña"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Permission Request Modal Component
function PermissionRequestModal({ permission, onClose, onSubmit }) {
  const [reason, setReason] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!reason.trim()) {
      alert("Por favor proporciona una razón para la solicitud")
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onSubmit(reason)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="admin-profile-modal-overlay">
      <div className="admin-profile-permission-modal">
        <div className="admin-profile-modal-header">
          <h3>Solicitar Permiso</h3>
          <button onClick={onClose}>×</button>
        </div>
        <div className="admin-profile-permission-info">
          <h4>{permission.name}</h4>
          <p>{permission.description}</p>
        </div>
        <form onSubmit={handleSubmit} className="admin-profile-permission-form">
          <div className="admin-profile-form-group">
            <label>Razón de la solicitud:</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explica por qué necesitas este permiso..."
              rows="4"
              required
            />
          </div>
          <div className="admin-profile-modal-actions">
            <button type="button" onClick={onClose} className="admin-profile-cancel-btn">
              Cancelar
            </button>
            <button type="submit" disabled={isLoading} className="admin-profile-save-btn">
              {isLoading ? "Enviando..." : "Enviar Solicitud"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminProfile
