"use client"

import { useState, useEffect } from "react"
import Login from "./screens/login/Login"
import AdminDashboard from "./screens/admin/AdminDashboard"
import EscuelaDashboard from "./screens/escuela/EscuelaDashboard"
import EstudianteDashboard from "./screens/estudiante/EstudianteDashboard"
import ProfesorDashboard from "./screens/profesor/ProfesorDashboard"

// Routing configuration
const ROUTES = {
  LOGIN: "login",
  ADMIN_DASHBOARD: "admin-dashboard",
  ESCUELA_DASHBOARD: "escuela-dashboard",
  ESTUDIANTE_DASHBOARD: "estudiante-dashboard",
  PROFESOR_DASHBOARD: "profesor-dashboard",
}

// Role to route mapping
const ROLE_ROUTES = {
  Administrador: ROUTES.ADMIN_DASHBOARD,
  "Escuela/Departamento": ROUTES.ESCUELA_DASHBOARD,
  Estudiante: ROUTES.ESTUDIANTE_DASHBOARD,
  Profesor: ROUTES.PROFESOR_DASHBOARD,
}

function App() {
  const [currentRoute, setCurrentRoute] = useState(ROUTES.LOGIN)
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on app load
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        const savedUser = localStorage.getItem("currentUser")
        if (savedUser) {
          const user = JSON.parse(savedUser)
          if (user && user.role) {
            setCurrentUser(user)
            const targetRoute = ROLE_ROUTES[user.role]
            if (targetRoute) {
              setCurrentRoute(targetRoute)
            }
          }
        }
      } catch (error) {
        console.error("Error checking existing session:", error)
        localStorage.removeItem("currentUser")
      } finally {
        setIsLoading(false)
      }
    }

    checkExistingSession()
  }, [])

  // Handle successful login
  const handleLogin = (user) => {
    console.log("Login successful:", user)
    setCurrentUser(user)

    // Save user data to localStorage
    localStorage.setItem("currentUser", JSON.stringify(user))

    // Navigate to appropriate dashboard
    const targetRoute = ROLE_ROUTES[user.role]
    if (targetRoute) {
      setCurrentRoute(targetRoute)
    } else {
      console.error("Unknown role:", user.role)
      alert("Error: Rol no reconocido")
    }
  }

  // Handle logout
  const handleLogout = () => {
    console.log("Logging out user:", currentUser?.name)
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
    setCurrentRoute(ROUTES.LOGIN)
  }

  // Navigate to different routes
  const navigateTo = (route) => {
    // Check if user is authorized for the route
    if (route !== ROUTES.LOGIN && !currentUser) {
      console.warn("Unauthorized access attempt to:", route)
      setCurrentRoute(ROUTES.LOGIN)
      return
    }

    // Check if user has permission for specific dashboard
    if (route !== ROUTES.LOGIN && route !== ROLE_ROUTES[currentUser?.role]) {
      console.warn("User attempting to access unauthorized dashboard:", route)
      alert("No tienes permisos para acceder a esta sección")
      return
    }

    setCurrentRoute(route)
  }

  // Show loading screen
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #4a90e2",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto",
              }}
            ></div>
          </div>
          <p>Cargando PGAT-TEC...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  // Render current route
  const renderCurrentRoute = () => {
    switch (currentRoute) {
      case ROUTES.LOGIN:
        return <Login onLogin={handleLogin} />

      case ROUTES.ADMIN_DASHBOARD:
        return <AdminDashboard currentUser={currentUser} onLogout={handleLogout} onNavigate={navigateTo} />

      case ROUTES.ESCUELA_DASHBOARD:
        return <EscuelaDashboard currentUser={currentUser} onLogout={handleLogout} onNavigate={navigateTo} />

      case ROUTES.ESTUDIANTE_DASHBOARD:
        return <EstudianteDashboard currentUser={currentUser} onLogout={handleLogout} onNavigate={navigateTo} />

      case ROUTES.PROFESOR_DASHBOARD:
        return <ProfesorDashboard currentUser={currentUser} onLogout={handleLogout} onNavigate={navigateTo} />

      default:
        console.error("Unknown route:", currentRoute)
        return <Login onLogin={handleLogin} />
    }
  }

  return <div className="app">{renderCurrentRoute()}</div>
}

export default App
