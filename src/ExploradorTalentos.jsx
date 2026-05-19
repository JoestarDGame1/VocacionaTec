import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const escenarios = [
  {
    situacion: "Una empresa necesita mejorar sus ventas y atraer clientes.",
    opciones: ["Medicina", "Mercadotecnia", "Astronomía"],
    correcta: "Mercadotecnia",
  },
  {
    situacion: "Un paciente necesita recuperar movilidad después de una lesión.",
    opciones: ["Fisioterapia", "Contaduría", "Cine"],
    correcta: "Fisioterapia",
  },
  {
    situacion: "Una organización necesita proteger sus sistemas de ataques digitales.",
    opciones: ["Seguridad informática", "Historia", "Nutrición"],
    correcta: "Seguridad informática",
  },
  {
    situacion: "Una escuela quiere mejorar sus métodos de enseñanza.",
    opciones: ["Pedagogía", "Física", "Diseño gráfico"],
    correcta: "Pedagogía",
  },
  {
    situacion: "Una empresa necesita organizar sus finanzas e impuestos.",
    opciones: ["Contaduría", "Artes escénicas", "Biología"],
    correcta: "Contaduría",
  },
];

function ExploradorTalentos({ onBack }) {
  const [usuario, setUsuario] = useState(null);
  const [indice, setIndice] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [terminado, setTerminado] = useState(false);
  const [mensajeRecord, setMensajeRecord] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUsuario(user));
    return () => unsub();
  }, []);

  const guardarRecord = async (puntajeFinal) => {
    if (!usuario) {
      localStorage.setItem(
        "recordTemporal",
        JSON.stringify({
          juego: "Explorador de Talentos",
          puntaje: puntajeFinal,
        })
      );
      setMensajeRecord("Inicia sesión para guardar tu récord.");
      return;
    }

    await addDoc(collection(db, "scores"), {
      uid: usuario.uid,
      correo: usuario.email,
      juego: "Explorador de Talentos",
      puntaje: puntajeFinal,
      fecha: serverTimestamp(),
    });

    setMensajeRecord("Récord guardado correctamente ✅");
  };

  const responder = (opcion) => {
    const nuevoPuntaje =
      opcion === escenarios[indice].correcta ? puntaje + 1 : puntaje;

    setPuntaje(nuevoPuntaje);

    if (indice + 1 < escenarios.length) {
      setIndice(indice + 1);
    } else {
      setTerminado(true);
      guardarRecord(nuevoPuntaje);
    }
  };

  const reiniciar = () => {
    setIndice(0);
    setPuntaje(0);
    setTerminado(false);
    setMensajeRecord("");
  };

  return (
    <div className="juegoDetalleContainer">
      <h2>Explorador de Talentos</h2>

      {!terminado ? (
        <div className="triviaCard">
          <p className="triviaProgreso">
            Escenario {indice + 1} de {escenarios.length}
          </p>

          <h3>{escenarios[indice].situacion}</h3>

          <div className="triviaOpciones">
            {escenarios[indice].opciones.map((opcion, i) => (
              <button key={i} onClick={() => responder(opcion)}>
                {opcion}
              </button>
            ))}
          </div>

          <p className="triviaPuntaje">Puntaje actual: {puntaje}</p>
        </div>
      ) : (
        <div className="triviaCard">
          <h3>Exploración finalizada</h3>

          <p>
            Tu puntaje fue: <strong>{puntaje} / {escenarios.length}</strong>
          </p>

          {mensajeRecord && (
            <div className="mensajeRecordBox">
              <p>{mensajeRecord}</p>

              {!usuario && (
                <button
                  className="btnLoginRecord"
                  onClick={() => (window.location.href = "/login")}
                >
                  Iniciar sesión
                </button>
              )}
            </div>
          )}

          <div className="juegoBotones">
            <button className="card-boton" onClick={reiniciar}>
              Reiniciar
            </button>

            <button className="card-boton" onClick={onBack}>
              Volver a juegos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExploradorTalentos;