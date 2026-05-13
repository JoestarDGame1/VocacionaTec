import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function Navbar({ seccion, handleSeccionChange, linkStyle }) {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUsuario(user);

      if (user) {
        try {
          const usuarioRef = doc(db, "usuarios", user.uid);
          const usuarioSnap = await getDoc(usuarioRef);

          if (usuarioSnap.exists()) {
            setNombreUsuario(usuarioSnap.data().nombre);
          }
        } catch (error) {
          console.error("Error obteniendo usuario:", error);
        }
      } else {
        setNombreUsuario("");
        setMenuAbierto(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const cerrarSesion = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navContainerStyle">
        <div className="divNavegacion">
          <span
            className="logoStyle"
            onClick={() => handleSeccionChange("inicio")}
          >
            VocacionaTec
          </span>

          <div className="navLinksStyle">
            <span
              style={linkStyle(seccion === "inicio")}
              onClick={() => handleSeccionChange("inicio")}
            >
              Inicio
            </span>

            <span
              style={linkStyle(seccion === "test")}
              onClick={() => handleSeccionChange("test")}
            >
              Test
            </span>

            <span
              style={linkStyle(seccion === "carreras")}
              onClick={() => handleSeccionChange("carreras")}
            >
              Carreras
            </span>

            <span
              style={linkStyle(seccion === "juegos")}
              onClick={() => handleSeccionChange("juegos")}
            >
              Juegos
            </span>

            <span
              style={linkStyle(seccion === "acerca")}
              onClick={() => handleSeccionChange("acerca")}
            >
              Acerca
            </span>
          </div>
        </div>

        {!usuario ? (
          <button
            className="usuarioBoton"
            onClick={() => navigate("/login")}
          >
            👤 Iniciar sesión
          </button>
        ) : (
          <div className="usuarioMenuWrapper">
            <button
              className="usuarioBoton"
              onClick={() => setMenuAbierto(!menuAbierto)}
            >
              ✅ Hola, {nombreUsuario || "Usuario"} ▾
            </button>

            {menuAbierto && (
              <div className="usuarioDropdown">
                <button onClick={() => navigate("/mis-resultados")}>
                  📊 Mis resultados
                </button>

                <button onClick={cerrarSesion}>
                  🚪 Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;