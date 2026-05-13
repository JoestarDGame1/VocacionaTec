import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";

function MisResultados() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [scores, setScores] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarResultados = async (user) => {
    try {
      setCargando(true);

      const resultadosRef = collection(
        db,
        "usuarios",
        user.uid,
        "resultados"
      );

      const q = query(
        resultadosRef,
        orderBy("fecha", "desc")
      );

      const snapshot = await getDocs(q);

      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setResultados(lista);

      const scoresRef = collection(db, "scores");

const snapshotScores = await getDocs(scoresRef);

const listaScores = snapshotScores.docs
  .map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
  .filter(score => score.uid === user.uid);

    const mejoresScores = Object.values(
  listaScores.reduce((acc, score) => {
    const juego = score.juego;

    if (!acc[juego]) {
      acc[juego] = score;
      return acc;
    }

    if (
      juego === "Rompecabezas de habilidades" &&
      score.puntaje < acc[juego].puntaje
    ) {
      acc[juego] = score;
    }

    if (
      juego !== "Rompecabezas de habilidades" &&
      score.puntaje > acc[juego].puntaje
    ) {
      acc[juego] = score;
    }

    return acc;
  }, {})
);

setScores(mejoresScores);

    } catch (error) {
      console.error("Error cargando resultados:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUsuario(user);

      if (user) {
        await cargarResultados(user);
      } else {
        setResultados([]);
        setCargando(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const ultimoResultado = resultados[0];

    return (

  <div className="misResultadosPage">

    <button
      className="btnVolverResultados"
      onClick={() => navigate("/")}
    >
      ← Volver al inicio
    </button>

    <div className="misResultadosTop">

      <h1>
        Mis resultados
      </h1>

      <p>
        Historial de resultados vocacionales guardados.
      </p>

    </div>

    {!usuario && (

      <div className="resultadoVacio">
        Inicia sesión para ver tus resultados.
      </div>

    )}

    {usuario && resultados.length === 0 && (

      <div className="resultadoVacio">
        Aún no tienes resultados guardados.
      </div>

    )}

    <div className="resultadosGrid">

      {resultados.map((resultado, index) => (

        <div
          className="resultadoHistorialCard"
          key={resultado.id}
        >

          <div className="resultadoHistorialTop">

            <span className="resultadoNumero">
              #{index + 1}
            </span>

            <span className="resultadoFecha">
              {resultado.fecha?.toDate?.().toLocaleDateString("es-MX") || "Sin fecha"}
            </span>

          </div>

          <h2>
            {resultado.carreraFinal}
          </h2>

          <p>
            Resultado principal detectado por el test vocacional.
          </p>

          <div className="rankingMini">

            {resultado.ranking?.slice(0, 3).map((carrera, i) => (

              <div
                className="rankingMiniItem"
                key={i}
              >
                <span>{carrera.nombre}</span>
                <strong>{carrera.puntaje}</strong>
              </div>

            ))}

          </div>

        </div>

      ))}

    </div>

    <div className="misRecordsSection">

      <h1 className="recordsTitulo">
        Mis récords
      </h1>

      {scores.length === 0 ? (

        <div className="resultadoVacio">
          Aún no tienes récords guardados.
        </div>

      ) : (

        <div className="recordsGrid">

          {scores.map((score, index) => (

            <div
              className="recordCard"
              key={score.id}
            >

              <h2>
                {score.juego}
              </h2>

              <p>
                Puntaje: {score.puntaje}
              </p>

              <span>
                #{index + 1}
              </span>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>

);
}

export default MisResultados;