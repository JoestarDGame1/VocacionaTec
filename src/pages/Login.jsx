import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [registro, setRegistro] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [nombre, setNombre] = useState("");

  const manejarAuth = async (e) => {
    e.preventDefault();

    if (!correo || !password) {
      alert("Escribe correo y contraseña");
      return;
    }

    try {
      setCargando(true);

      if (registro) {
        await createUserWithEmailAndPassword(auth, correo, password);
        // Guardar información adicional del usuario en Firestore
        const userDocRef = doc(db, "usuarios", auth.currentUser.uid);
        await setDoc(userDocRef, {
          nombre: nombre,
          correo: correo,
          createdAt: serverTimestamp(),
        });
        alert("Cuenta creada correctamente");
      } else {
        await signInWithEmailAndPassword(auth, correo, password);
        alert("Bienvenido a VocacionaTec");
      }

      const resultadoTemporal = localStorage.getItem("resultadoTemporal");
const recordTemporal = localStorage.getItem("recordTemporal");

if (resultadoTemporal || recordTemporal) {
  navigate("/");
} else {
  navigate("/");
}
      
    } catch (error) {
      alert(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="loginPage">
      <button className="volverMenuBtn" onClick={() => navigate("/")}>
        ← Volver al menú
      </button>

      <div className="loginLayout">
        <div className="loginInfoPanel">
          <div className="loginLogo">VocacionaTec</div>

          <h2>Tu progreso siempre contigo</h2>

          <p>
            Inicia sesión para guardar tus respuestas, continuar tu test después
            y consultar tus resultados vocacionales.
          </p>

          <div className="loginBeneficios">
            <div>✅ Guarda tu progreso automáticamente</div>
            <div>📊 Consulta tus resultados</div>
            <div>🎯 Recomendaciones personalizadas</div>
          </div>
        </div>

        <div className="loginCard">
          <div className="loginTop">
            <span className="loginBadge">
              {registro ? "NUEVA CUENTA" : "ACCESO DE USUARIO"}
            </span>

            <h1 className="loginTitulo">
              {registro ? "Crear cuenta" : "Iniciar sesión"}
            </h1>

            <p className="loginSubtitulo">
              {registro
                ? "Crea tu cuenta para empezar a guardar tus avances."
                : "Accede para continuar tu test y ver tus resultados."}
            </p>
          </div>

          <form className="loginForm" onSubmit={manejarAuth}>
            {registro && (
              <input
                className="loginInput"
                type="text"
                placeholder="Nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            )}

            <input
              className="loginInput"
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

            <input
              className="loginInput"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="loginButton" type="submit" disabled={cargando}>
              {cargando
                ? "Procesando..."
                : registro
                ? "Crear cuenta"
                : "Entrar"}
            </button>
          </form>

          <div className="loginBottom">
            <p className="loginTexto">
              {registro ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
              <span
                className="loginLink"
                onClick={() => setRegistro(!registro)}
              >
                {registro ? "Inicia sesión" : "Regístrate"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;