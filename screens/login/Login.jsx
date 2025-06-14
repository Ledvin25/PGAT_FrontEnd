"use client"

import { useState } from "react"
import "./Login.css"
import LoginHelp from "./LoginHelp"

// Demo users with updated credentials
const DEMO_USERS = {
  admin: {
    password: "admin",
    role: "Administrador",
    name: "Laura González Mora",
    email: "admin@tec.ac.cr",
  },
  professor: {
    password: "professor",
    role: "Profesor",
    name: "Dr. Carlos Rodríguez",
    email: "professor@tec.ac.cr",
  },
  student: {
    password: "student",
    role: "Estudiante",
    name: "María José Vargas",
    email: "student@tec.ac.cr",
  },
  school: {
    password: "school",
    role: "Escuela/Departamento",
    name: "Escuela de Computación",
    email: "school@tec.ac.cr",
  },
  // Keep Spanish versions for compatibility
  profesor: {
    password: "profesor",
    role: "Profesor",
    name: "Dr. Carlos Rodríguez",
    email: "profesor@tec.ac.cr",
  },
  estudiante: {
    password: "estudiante",
    role: "Estudiante",
    name: "María José Vargas",
    email: "estudiante@tec.ac.cr",
  },
  escuela: {
    password: "escuela",
    role: "Escuela/Departamento",
    name: "Escuela de Computación",
    email: "escuela@tec.ac.cr",
  },
}

function Login({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState("Estudiante")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const roles = [
    { id: "estudiante", label: "Estudiante", value: "Estudiante" },
    { id: "profesor", label: "Profesor", value: "Profesor" },
    { id: "escuela", label: "Escuela/Departamento", value: "Escuela/Departamento" },
    { id: "administrador", label: "Administrador", value: "Administrador" },
  ]

  const handleRoleChange = (role) => {
    setSelectedRole(role)
    console.log("Selected role:", role)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { username, password } = formData

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Verify demo credentials
      const user = DEMO_USERS[username.toLowerCase()]

      if (!user) {
        throw new Error("Usuario no encontrado. Usuarios disponibles: admin, professor, student, school")
      }

      if (user.password !== password) {
        throw new Error("Contraseña incorrecta")
      }

      // Verify selected role matches user role
      if (user.role !== selectedRole) {
        throw new Error(`Este usuario pertenece al rol: ${user.role}. Por favor seleccione el rol correcto.`)
      }

      // Successful login
      const loginData = {
        username: username,
        name: user.name,
        email: user.email,
        role: user.role,
        loginTime: new Date().toISOString(),
      }

      console.log("Login successful:", loginData)

      // Call parent login handler
      if (onLogin) {
        onLogin(loginData)
      }
    } catch (error) {
      console.error("Login error:", error)
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    console.log("Forgot password clicked")
    alert("Funcionalidad de recuperación de contraseña - Por implementar")
  }

  return (
    <div className="login-app">
      <div className="login-container">
        {/* Header with TEC logo */}
        <div className="login-header">
          <div className="login-logo">
            <span className="login-logo-text">TEC</span>
            <span className="login-logo-subtitle">
              Tecnológico
              <br />
              de Costa Rica
            </span>
          </div>
        </div>

        {/* Main title */}
        <div className="login-main-title">
          <h1>PGAT-TEC</h1>
          <p>Plataforma de Gestión de Asistencias, Tutorías y Proyectos</p>
        </div>

        {/* Login section */}
        <div className="login-section">
          <h2>Iniciar Sesión</h2>

          {/* Role selection buttons */}
          <div className="login-role-buttons">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                className={`login-role-btn ${selectedRole === role.value ? "active" : ""}`}
                onClick={() => handleRoleChange(role.value)}
                disabled={isLoading}
              >
                {role.label}
              </button>
            ))}
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Ingrese su nombre de usuario"
                disabled={isLoading}
                required
              />
            </div>

            <div className="login-form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Ingrese su contraseña"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="login-forgot-password"
                onClick={handleForgotPassword}
                disabled={isLoading}
              >
                ¿Olvidó su contraseña?
              </button>
            </div>

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          {/* Login Help */}
          <LoginHelp />
        </div>

        {/* Footer */}
        <div className="login-footer">
          <p>🛈 Para soporte técnico, contacte al departamento de TI</p>
        </div>
      </div>
    </div>
  )
}

export default Login
