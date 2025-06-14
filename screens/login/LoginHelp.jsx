"use client"

import { useState } from "react"
import "./LoginHelp.css"

function LoginHelp() {
  const [isVisible, setIsVisible] = useState(false)

  const demoUsers = [
    {
      username: "admin",
      password: "admin",
      role: "Administrador",
      name: "Laura González Mora",
      description: "Acceso completo al sistema, gestión de usuarios, reportes y configuración",
    },
    {
      username: "professor",
      password: "professor",
      role: "Profesor",
      name: "Dr. Carlos Rodríguez",
      description: "Crear ofertas, gestionar postulaciones, evaluar estudiantes",
    },
    {
      username: "student",
      password: "student",
      role: "Estudiante",
      name: "María José Vargas",
      description: "Buscar oportunidades, postular, ver historial académico",
    },
    {
      username: "school",
      password: "school",
      role: "Escuela/Departamento",
      name: "Escuela de Computación",
      description: "Gestionar ofertas departamentales, aprobar solicitudes, reportes",
    },
  ]

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const copyCredentials = (username, password) => {
    navigator.clipboard.writeText(`${username}`)
    alert(`Usuario "${username}" copiado al portapapeles`)
  }

  return (
    <div className="login-help">
      <button className="login-help-toggle" onClick={toggleVisibility} type="button">
        {isVisible ? "Ocultar" : "Ver"} Usuarios de Prueba
      </button>

      {isVisible && (
        <div className="login-help-panel">
          <h3>👥 Usuarios de Demostración</h3>
          <p className="login-help-intro">Utiliza estas credenciales para probar diferentes roles del sistema:</p>

          <div className="login-help-users">
            {demoUsers.map((user, index) => (
              <div key={index} className="login-help-user">
                <div className="login-help-user-header">
                  <div className="login-help-credentials">
                    <strong>{user.username}</strong> / {user.password}
                    <button
                      className="login-help-copy"
                      onClick={() => copyCredentials(user.username, user.password)}
                      title="Copiar usuario"
                    >
                      📋
                    </button>
                  </div>
                  <span className={`login-help-role role-${user.role.toLowerCase().replace("/", "-")}`}>
                    {user.role}
                  </span>
                </div>
                <div className="login-help-user-info">
                  <div className="login-help-name">{user.name}</div>
                  <div className="login-help-description">{user.description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="login-help-instructions">
            <h4>📋 Instrucciones:</h4>
            <ol>
              <li>
                Selecciona el <strong>rol</strong> correspondiente
              </li>
              <li>
                Ingresa el <strong>usuario</strong> y <strong>contraseña</strong>
              </li>
              <li>
                Haz clic en <strong>"Ingresar"</strong>
              </li>
              <li>Serás redirigido automáticamente al dashboard correspondiente</li>
            </ol>
          </div>

          <div className="login-help-note">
            <p>
              <strong>Nota:</strong> También puedes usar las versiones en español: profesor/profesor,
              estudiante/estudiante, escuela/escuela
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginHelp
