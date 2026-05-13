import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { infoCarreras } from "../data/infoCarreras";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";

function Resultado({ carreraScores, reiniciarTest }) {
  const [guardado, setGuardado] = useState(false);
  const [correoEnviado, setCorreoEnviado] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [correoManual, setCorreoManual] = useState("");

  const carrerasOrdenadas = Object.entries(carreraScores)
  .sort((a, b) => b[1] - a[1]);

  const carreraFinal = carrerasOrdenadas[0]?.[0] || "Sin resultado";

  useEffect(() => {

    localStorage.setItem(
      "resultadoTemporal",
      JSON.stringify({
        carreraFinal,
        carreraScores,
      })
    );

  }, []);

  const info = infoCarreras[carreraFinal];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      if (user?.email) {
        setCorreoManual(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

    useEffect(() => {
      const guardarResultado = async () => {
        if (!usuario) {
          setGuardado(false);
          return;
        }

        try {
          const resultado = {
            carreraFinal,
            carreraScores,
            ranking: carrerasOrdenadas.map(([nombre, puntaje]) => ({
              nombre,
              puntaje,
            })),
            uid: usuario.uid,
            correo: usuario.email,
            fecha: serverTimestamp(),
          };

          await addDoc(collection(db, "resultadosGlobales"), resultado);

          await addDoc(
            collection(db, "usuarios", usuario.uid, "resultados"),
            resultado
          );

          setGuardado(true);
          localStorage.removeItem("resultadoTemporal");

        } catch (error) {
          console.error("Error guardando resultado:", error);
        }
      };

      if (carrerasOrdenadas.length > 0) {
        guardarResultado();
      }
    }, [usuario]);

  const enviarCorreo = async () => {
    if (!correoManual) {
      alert("Escribe un correo para enviar el resultado");
      return;
    }

    try {
      await emailjs.send(
        "service_esw3fgw",
        "template_6ivjm9c",
        {
          to_name: usuario?.displayName || "Estudiante",
          to_email: correoManual,
          carrera: carreraFinal,
          mensaje: `Tu carrera con mayor compatibilidad fue ${carreraFinal}. Ranking: ${carrerasOrdenadas
            .map(([nombre, puntaje], index) => `${index + 1}. ${nombre}: ${puntaje} puntos`)
            .join(" | ")}`,
          fecha: new Date().toLocaleDateString("es-MX"),
        },
        "oi6JoZkXcD1HGPju3"
      );

      setCorreoEnviado(true);
      alert("Correo enviado correctamente");
    } catch (error) {
      console.error("Error enviando correo:", error);
      alert("No se pudo enviar el correo");
    }
  };

  return (
    <div className="resultadoContainer">
      <div className="resultadoTop">
        <div className="resultadoBadge">
          RESULTADO FINAL
        </div>

        <h2 className="resultadoTitulo">
          Tu carrera ideal es:
        </h2>

        <h1 className="resultadoCarrera">
          {carreraFinal}
        </h1>

        <p className="resultadoDescripcion">
          Según tus respuestas, esta carrera coincide con tus intereses,
          habilidades y preferencias vocacionales.
        </p>

        {guardado && (
          <p className="mensaje-exito">
            Resultado guardado en Firebase ✅
          </p>
        )}
      </div>

      <div className="rankingContainer">
        <h3 className="rankingTitulo">
          Otras carreras compatibles
        </h3>

        {carrerasOrdenadas.map(([nombre, puntaje], index) => (
          <div className="rankingCard" key={index}>
            <div>
              <h4>{nombre}</h4>
              <p>{puntaje} puntos</p>
            </div>

            <span className="rankingNumero">
              #{index + 1}
            </span>
          </div>
        ))}
      </div>

      {usuario && info ? (
    <div className="infoCarreraCard">
      <h2 className="infoCarreraTitulo">
        Información de la carrera
      </h2>

      <p className="infoCarreraDescripcion">
        {info.descripcion}
      </p>

      <div className="infoGrid">
        <div className="infoBox">
          <h3>Duración</h3>
          <p>{info.duracion}</p>
        </div>

        <div className="infoBox">
          <h3>Campo laboral</h3>
          <ul>
            {info.campoLaboral.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="infoBox">
          <h3>Habilidades</h3>
          <ul>
            {info.habilidades.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="materiasBox">
        <h3>Materias principales</h3>

        <div className="materiasLista">
          {info.materias.map((materia, index) => (
            <span className="materiaTag" key={index}>
              {materia}
            </span>
          ))}
        </div>
      </div>
    </div>
    ) : (

  <div className="premiumLockedBox">
    <h3>🔒 Información completa bloqueada</h3>

    <p>
      Inicia sesión para desbloquear la información completa de tu resultado:
    </p>

    <ul>
      <li>Duración de la carrera</li>
      <li>Campo laboral</li>
      <li>Habilidades recomendadas</li>
      <li>Materias principales</li>
      <li>Historial de resultados</li>
    </ul>

    <button
      className="btnPremiumLogin"
      onClick={() => window.location.href = "/login"}
    >
      Iniciar sesión para desbloquear
    </button>
  </div>
)}
      <div className="correoResultadoBox">
        <h3>Enviar resultado por correo</h3>

        <p>
          Recibe una copia de tu resultado vocacional en tu correo electrónico.
        </p>

        <div className="correoResultadoForm">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correoManual}
            onChange={(e) => setCorreoManual(e.target.value)}
          />

          <button onClick={enviarCorreo}>
            Enviar resultado
          </button>
        </div>

        {correoEnviado && (
          <p className="mensaje-exito">
            Resultado enviado por correo ✅
          </p>
        )}
      </div>

      <button
        className="btnReiniciarPremium"
        onClick={reiniciarTest}
      >
        Realizar Test Nuevamente
      </button>
    </div>
  );
}

export default Resultado;