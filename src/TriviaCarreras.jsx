import React, { useEffect, useState } from "react";

import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const preguntas = [
  {
    pregunta: "¿Qué carrera se relaciona más con el análisis de estados financieros?",
    opciones: ["Diseño gráfico", "Contaduría", "Medicina", "Cine"],
    respuesta: "Contaduría",
  },
  {
    pregunta: "¿Qué carrera se enfoca en el cuidado y recuperación física de pacientes?",
    opciones: ["Fisioterapia", "Economía", "Derecho", "Astronomía"],
    respuesta: "Fisioterapia",
  },
  {
    pregunta: "¿Qué carrera se relaciona más con crear aplicaciones y sistemas?",
    opciones: ["Ciencias computacionales", "Historia", "Nutrición", "Artes escénicas"],
    respuesta: "Ciencias computacionales",
  },
  {
    pregunta: "¿Qué carrera estudia el comportamiento humano y los procesos mentales?",
    opciones: ["Psicología", "Química", "Militar", "Mercadotecnia"],
    respuesta: "Psicología",
  },
  {
    pregunta: "¿Qué carrera se enfoca en posicionar productos, marcas y servicios?",
    opciones: ["Mercadotecnia", "Física", "Odontología", "Pedagogía"],
    respuesta: "Mercadotecnia",
  },
];

function TriviaCarreras({ onBack }) {
  const [usuario, setUsuario] = useState(null);
  const [indice, setIndice] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [terminado, setTerminado] = useState(false);
  const [mensajeRecord, setMensajeRecord] = useState("");
  const [recordGuardado, setRecordGuardado] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });

    return () => unsubscribe();
  }, []);

  const guardarRecord = async (puntajeFinal) => {
    if (!usuario) {
      localStorage.setItem(
        "recordTemporal",
        JSON.stringify({
          juego: "Trivia de Carreras",
          puntaje: puntajeFinal,
        })
      );

      setMensajeRecord("Inicia sesión para guardar tu récord.");
      return;
    }

    if (recordGuardado) return;

    try {
      await addDoc(collection(db, "scores"), {
        uid: usuario.uid,
        correo: usuario.email,
        juego: "Trivia de Carreras",
        puntaje: puntajeFinal,
        fecha: serverTimestamp(),
      });

      setRecordGuardado(true);
      setMensajeRecord("Récord guardado correctamente ✅");
    } catch (error) {
      console.error("Error guardando récord:", error);
      setMensajeRecord("No se pudo guardar el récord.");
    }
  };

  const responder = (opcion) => {
    const esCorrecta = opcion === preguntas[indice].respuesta;
    const nuevoPuntaje = esCorrecta ? puntaje + 1 : puntaje;

    setPuntaje(nuevoPuntaje);

    if (indice + 1 < preguntas.length) {
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
    setRecordGuardado(false);
  };

  return (
    <div className="juegoDetalleContainer">
      <h2>Trivia de Carreras</h2>

      {!terminado ? (
        <div className="triviaCard">
          <p className="triviaProgreso">
            Pregunta {indice + 1} de {preguntas.length}
          </p>

          <h3>{preguntas[indice].pregunta}</h3>

          <div className="triviaOpciones">
            {preguntas[indice].opciones.map((opcion, i) => (
              <button key={i} onClick={() => responder(opcion)}>
                {opcion}
              </button>
            ))}
          </div>

          <p className="triviaPuntaje">
            Puntaje actual: {puntaje}
          </p>
        </div>
      ) : (
        <div className="triviaCard">
          <h3>Trivia finalizada</h3>

          <p>
            Tu puntaje fue: <strong>{puntaje} / {preguntas.length}</strong>
          </p>

          {mensajeRecord && (
            <div className="mensajeRecordBox">
              <p>{mensajeRecord}</p>

              {!usuario && (
                <button
                  className="btnLoginRecord"
                  onClick={() => window.location.href = "/login"}
                >
                  Iniciar sesión
                </button>
              )}
            </div>
          )}

          <div className="juegoBotones">
            <button onClick={reiniciar} className="card-boton">
              Reiniciar
            </button>

            <button onClick={onBack} className="card-boton">
              Volver a juegos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TriviaCarreras;