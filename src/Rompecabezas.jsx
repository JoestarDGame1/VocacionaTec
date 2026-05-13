import React, { useState, useEffect, useRef } from 'react';
import imagenPuzzle from './iconoApp.jpeg';

import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const TAMANO = 4; // 4x4 = 16 piezas

const Rompecabezas = ({ onBack }) => {
  const [piezas, setPiezas] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [movimientos, setMovimientos] = useState(0);
  const [completado, setCompletado] = useState(false);
  const ordenOriginalRef = useRef([]);
  const [cargando, setCargando] = useState(true);

  const [usuario, setUsuario] = useState(null);
  const [recordGuardado, setRecordGuardado] = useState(false);
  const [mensajeRecord, setMensajeRecord] = useState("");

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUsuario(user);
  });

  return () => unsubscribe();
}, []);

  useEffect(() => {

  const guardarPendiente = async () => {

    if (!usuario) return;

    const recordPendiente =
      localStorage.getItem("recordTemporal");

    if (!recordPendiente) return;

    try {

      const data = JSON.parse(recordPendiente);

      await addDoc(collection(db, "scores"), {
        uid: usuario.uid,
        correo: usuario.email,
        juego: data.juego,
        puntaje: data.puntaje,
        fecha: serverTimestamp(),
      });

      localStorage.removeItem("recordTemporal");

      setMensajeRecord(
        "Récord pendiente guardado correctamente ✅"
      );

    } catch (error) {

      console.error(
        "Error guardando récord pendiente:",
        error
      );

    }

  };

  guardarPendiente();

}, [usuario]);

  useEffect(() => {
    const img = new Image();
    img.src = imagenPuzzle;
    img.onload = () => {
      const anchoPieza = img.width / TAMANO;
      const altoPieza = img.height / TAMANO;
      const original = [];
      for (let i = 0; i < TAMANO * TAMANO; i++) {
        const fila = Math.floor(i / TAMANO);
        const col = i % TAMANO;
        const canvas = document.createElement('canvas');
        canvas.width = anchoPieza;
        canvas.height = altoPieza;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, col * anchoPieza, fila * altoPieza, anchoPieza, altoPieza, 0, 0, anchoPieza, altoPieza);
        original.push(canvas.toDataURL());
      }
      ordenOriginalRef.current = original;
      // Mezclar
      const mezcladas = [...original];
      for (let i = mezcladas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mezcladas[i], mezcladas[j]] = [mezcladas[j], mezcladas[i]];
      }
      setPiezas(mezcladas);
      setCargando(false);
    };
  }, []);

  const handleClick = (indice) => {
    if (completado) return;
    if (seleccionada === null) {
      setSeleccionada(indice);
    } else {
      const nuevas = [...piezas];
      [nuevas[seleccionada], nuevas[indice]] = [nuevas[indice], nuevas[seleccionada]];
      setPiezas(nuevas);
      setMovimientos(movimientos + 1);
      setSeleccionada(null);
    }
  };

  const guardarRecord = async (puntaje) => {
  if (!usuario) {
  localStorage.setItem(
    "recordTemporal",
    JSON.stringify({
      juego: "Rompecabezas de habilidades",
      puntaje,
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
          juego: "Rompecabezas de habilidades",
          puntaje,
          fecha: serverTimestamp(),
        });

        setRecordGuardado(true);
        setMensajeRecord("Récord guardado correctamente ✅");
      } catch (error) {
        console.error("Error guardando récord:", error);
        setMensajeRecord("No se pudo guardar el récord.");
      }
    };

  useEffect(() => {
    if (piezas.length && ordenOriginalRef.current.length && !completado) {
      const esCompleto = piezas.every((p, i) => p === ordenOriginalRef.current[i]);
      if (esCompleto) {
        setCompletado(true);
        guardarRecord(movimientos);
      }
    }
  }, [piezas, completado]);

  const reiniciar = () => {
    if (ordenOriginalRef.current.length) {
      const mezcladas = [...ordenOriginalRef.current];
      for (let i = mezcladas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mezcladas[i], mezcladas[j]] = [mezcladas[j], mezcladas[i]];
      }
      setPiezas(mezcladas);
      setMovimientos(0);
      setCompletado(false);
      setSeleccionada(null);
    }
  };

  if (cargando) return <div className="puzzle-container">Cargando rompecabezas...</div>;

  return (
    <div className="puzzle-container">
      <h2>Rompecabezas de habilidades</h2>
      <p>Movimientos: {movimientos}</p>
      {completado && <p className="victoria">¡Felicidades! Completaste el puzzle en {movimientos} movimientos.</p>}

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

      <div
        className="puzzle-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${TAMANO}, 1fr)`,
          gap: '2px',
          maxWidth: '500px',
          margin: '0 auto',
        }}
      >
        {piezas.map((pieza, idx) => (
          <div
            key={idx}
            className={`puzzle-pieza ${seleccionada === idx ? 'seleccionada' : ''}`}
            onClick={() => handleClick(idx)}
            style={{
              backgroundImage: `url(${pieza})`,
              backgroundSize: 'cover',
              cursor: 'pointer',
              aspectRatio: '1 / 1',
            }}
          />
        ))}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={reiniciar} className="card-boton">Reiniciar</button>
        <button onClick={onBack} className="card-boton">Volver a juegos</button>
      </div>
    </div>
  );
};

export default Rompecabezas;