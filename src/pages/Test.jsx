import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "firebase/firestore";

import { useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useState } from "react"; 
import Juegos from "../Juegos";   // ajusta la ruta si es necesario
import { preguntasChaside } from "../data/preguntasChaside";
import { mapeoAreas } from "../data/areas";
import { preguntasPorCarrera } from "../data/carreras";
import PreguntaCard from "../components/PreguntaCard";
import BarraProgreso from "../components/BarraProgreso";

import Inicio from "./Inicio";
import Resultado from "../components/Resultado";
import AreaDetectada from "../components/AreaDetectada";
import NavegacionPreguntas from "../components/NavegacionPreguntas";

// --- COMPONENTE PRINCIPAL ---
function App() {
  // Estado para la navegación global
  const [seccion, setSeccion] = useState("inicio");

  // --- ESTADOS DEL TEST ---
  const PREGUNTAS_POR_PAGINA = 4;
  const [paginaActual, setPaginaActual] = useState(0);
  const [respuestasChaside, setRespuestasChaside] = useState({});
  const [fase, setFase] = useState("inicio");
  const [areaGanadora, setAreaGanadora] = useState(null);
  const [indiceCarrera, setIndiceCarrera] = useState(0);
  const [carreraScores, setCarreraScores] = useState({});

  const [usuarioActual, setUsuarioActual] = useState(null);

const [email, setEmail] = useState("");
const [submitted, setSubmitted] = useState(false);

useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, async (user) => {

    if (user) {

      setUsuarioActual(user);

      const resultadoTemporal = localStorage.getItem("resultadoTemporal");

      if (resultadoTemporal) {
        const dataTemporal = JSON.parse(resultadoTemporal);

        setCarreraScores(dataTemporal.carreraScores || {});
        setFase("resultado");

        return;
      }

      try {

        const progresoRef = doc(
          db,
          "progresos",
          user.uid
        );

        const progresoSnap = await getDoc(progresoRef);

        if (progresoSnap.exists()) {

          const data = progresoSnap.data();

          setPaginaActual(data.paginaActual || 0);

          setRespuestasChaside(
            data.respuestasChaside || {}
          );

          setFase(data.fase || "inicio");

          setAreaGanadora(
            data.areaGanadora || null
          );

          setIndiceCarrera(
            data.indiceCarrera || 0
          );

          setCarreraScores(
            data.carreraScores || {}
          );

        }

      } catch (error) {

        console.error(
          "Error cargando progreso:",
          error
        );

      }

    }else {
      setUsuarioActual(null);
      setPaginaActual(0);
      setRespuestasChaside({});
      setFase("inicio");
      setAreaGanadora(null);
      setIndiceCarrera(0);
      setCarreraScores({});
    }
  });

  return () => unsubscribe();

}, []);

const handleEmailSubmit = (e) => {
  e.preventDefault();
  if (!email) return;
  setSubmitted(true);
  // Aquí puedes enviar el email a tu backend más adelante
  console.log("Correo enviado:", email);
  setTimeout(() => {
    setSubmitted(false);
    setEmail("");
  }, 3000);
};

  // Calcular preguntas visibles por página
  const startIndex = paginaActual * PREGUNTAS_POR_PAGINA;
  const preguntasVisibles = preguntasChaside.slice(startIndex, startIndex + PREGUNTAS_POR_PAGINA);
  const totalPaginas = Math.ceil(preguntasChaside.length / PREGUNTAS_POR_PAGINA);

  // Total de preguntas respondidas
  const respondidas = Object.keys(respuestasChaside).length;
  const porcentaje = Math.round((respondidas / preguntasChaside.length) * 100);

  // Manejar respuesta
  const guardarProgreso = async (nuevoEstado) => {
  if (!usuarioActual) return;

  try {
    const progresoRef = doc(db, "progresos", usuarioActual.uid);

    await setDoc(progresoRef, {
      fase,
      paginaActual,
      respuestasChaside,
      areaGanadora,
      indiceCarrera,
      carreraScores,
      actualizadoEn: serverTimestamp(),
      ...nuevoEstado,
    });
  } catch (error) {
    console.error("Error guardando progreso:", error);
  }
};

const manejarRespuesta = async (id, valor) => {
  const nuevasRespuestas = {
    ...respuestasChaside,
    [id]: valor,
  };

  setRespuestasChaside(nuevasRespuestas);

  await guardarProgreso({
    respuestasChaside: nuevasRespuestas,
  });
};

  // Navegación entre páginas
  const irSiguiente = async () => {
    const preguntasPaginaActual = preguntasVisibles;
    const todasRespondidas = preguntasPaginaActual.every(p => respuestasChaside[p.id] !== undefined);
    
    if (!todasRespondidas) {
      alert("Por favor responde todas las preguntas antes de continuar.");
      return;
    }

    if (paginaActual < totalPaginas - 1) {
      const nuevaPagina = paginaActual + 1;

      setPaginaActual(nuevaPagina);

      await guardarProgreso({
        paginaActual: nuevaPagina,
        fase: "chaside",
      });

      window.scrollTo(0, 0);
    } else {
      finalizarChaside();
    }
  };

  const irAnterior = async () => {
  if (paginaActual > 0) {
    const nuevaPagina = paginaActual - 1;

    setPaginaActual(nuevaPagina);

    await guardarProgreso({
      paginaActual: nuevaPagina,
      fase: "chaside",
    });

    window.scrollTo(0, 0);
  }
};

  // Finalizar test CHASIDE
  const finalizarChaside = () => {
  const puntajes = {};

  for (let area in mapeoAreas) {
    const preguntasArea = mapeoAreas[area].preguntas;

    const respuestasSi = preguntasArea.filter(
      (id) => respuestasChaside[id] === true
    ).length;

    const totalPreguntasArea = preguntasArea.length;

    puntajes[area] = {
      si: respuestasSi,
      total: totalPreguntasArea,
      porcentaje: respuestasSi / totalPreguntasArea,
    };
  }

  const mayor = Object.keys(puntajes).reduce((a, b) =>
    puntajes[a].porcentaje > puntajes[b].porcentaje ? a : b
  );

  setAreaGanadora(mayor);
  setFase("carreras");

  guardarProgreso({
    areaGanadora: mayor,
    fase: "carreras",
    puntajesAreas: puntajes,
  });
};

  // Responder sobre interés en carrera
  const responderCarrera = (puntaje) => {
    const carreraActual = preguntasPorCarrera[areaGanadora][indiceCarrera].nombre;
    setCarreraScores(prev => ({
      ...prev,
      [carreraActual]: (prev[carreraActual] || 0) + puntaje
    }));

    if (indiceCarrera < preguntasPorCarrera[areaGanadora].length - 1) {
      setIndiceCarrera(indiceCarrera + 1);
    } else {
      setFase("resultado");
    }
  };

  // Reiniciar test
  const reiniciarTest = () => {
    setFase("inicio");
    setPaginaActual(0);
    setRespuestasChaside({});
    setAreaGanadora(null);
    setIndiceCarrera(0);
    setCarreraScores({});
  };

  const linkStyle = (active) => ({
    margin: "0 15px",
    color: active ? "#4a90e2" : "#333",
    textDecoration: "none",
    cursor: "pointer",
    fontWeight: active ? "bold" : "normal",
    fontSize: "16px",
    transition: "color 0.3s",
  });

  const handleSeccionChange = (nuevaSeccion) => {
    setSeccion(nuevaSeccion);
  };

  // Renderizado del contenido del test según la fase
  const renderTestContent = () => {
    return (
      <div className="testContainer">
        {fase === "inicio" && (

  <div className="testHero">

    <div className="testIcon">
      🧠
    </div>

    <h2 className="testTitulo">
      Test Vocacional CHASIDE
    </h2>

    <p className="testTexto">
      Descubre tus intereses, habilidades y el área
      profesional que mejor se adapta a ti mediante
      nuestro test vocacional inteligente.
    </p>

    <div className="testInfoGrid">

      <div className="testInfoCard">
        <h3>⌛ Duración</h3>
        <p>5 a 10 minutos</p>
      </div>

      <div className="testInfoCard">
        <h3>📋 Preguntas</h3>
        <p>Respuestas rápidas</p>
      </div>

      <div className="testInfoCard">
        <h3>🎯 Resultado</h3>
        <p>Perfil personalizado</p>
      </div>

    </div>

    <button
      className="testBoton"
      onClick={() => setFase("chaside")}
    >
      Comenzar Test
    </button>

  </div>

)}

        {fase === "chaside" && (
  <>
    
    <div className="testHeader">

      <div className="testBadge">
        TEST VOCACIONAL
      </div>

      <h1 className="testTitulo">
        Test CHASIDE
      </h1>

      <p className="testDescripcion">
        Responde cada pregunta con sinceridad para descubrir
        qué área profesional se adapta mejor a tu personalidad,
        intereses y habilidades.
      </p>

      <div className="testMiniInfo">

        <div className="miniCard">
          <span>📝</span>
          <p>{preguntasChaside.length} preguntas</p>
        </div>

        <div className="miniCard">
          <span>⏱️</span>
          <p>5-10 min</p>
        </div>

        <div className="miniCard">
          <span>🎯</span>
          <p>Resultado personalizado</p>
        </div>

      </div>

    </div>

            {/* LISTA DE PREGUNTAS CON RADIO BUTTONS */}
            <div style={{ textAlign: "left" }}>
              {preguntasVisibles.map((p) => (
                <PreguntaCard
                  key={p.id}
                  pregunta={p}
                  respuesta={respuestasChaside[p.id]}
                  manejarRespuesta={manejarRespuesta}
                />
              ))}
            </div>

            <BarraProgreso
              respondidas={respondidas}
              totalPreguntas={preguntasChaside.length}
              porcentaje={porcentaje}
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
            />

            <NavegacionPreguntas
              irAnterior={irAnterior}
              irSiguiente={irSiguiente}
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
            />
          </>
        )}

        {fase === "carreras" && (
          <AreaDetectada
            areaGanadora={areaGanadora}
            preguntasPorCarrera={preguntasPorCarrera}
            indiceCarrera={indiceCarrera}
            mapeoAreas={mapeoAreas}
            responderCarrera={responderCarrera}
          />
        )}

        {fase === "resultado" && (
          <Resultado
            carreraScores={carreraScores}
            reiniciarTest={reiniciarTest}
          />
        )}
      </div>
    );
  };

  // --- RENDERIZADO PRINCIPAL ---
  return (
    <div>
      <Navbar
        seccion={seccion}
        handleSeccionChange={handleSeccionChange}
        linkStyle={linkStyle}
      />
            

      {/* CONTENIDO SEGÚN EL PANEL SELECCIONADO */}
      <main className="main">
        
        {seccion === "inicio" && (
          <Inicio
            handleSeccionChange={handleSeccionChange}
            email={email}
            setEmail={setEmail}
            submitted={submitted}
            handleEmailSubmit={handleEmailSubmit}
          />
        )}
        {seccion === "test" && renderTestContent()}

        {seccion === "carreras" && (

          <div className="divCentrado">

            <h2 className="h2">Explora Carreras</h2>

            <p className="p">
              Descubre opciones profesionales según tus intereses.
            </p>

            <div className="equipo-grid">

              <div className="miembro-card">
                <div className="miembro-avatar">💻</div>
                <h3 className="miembro-nombre">
                  Ingeniería en Sistemas
                </h3>
                <p className="miembro-rol">
                  Desarrollo de software, IA y tecnología.
                </p>
              </div>

              <div className="miembro-card">
                <div className="miembro-avatar">🏥</div>
                <h3 className="miembro-nombre">
                  Medicina
                </h3>
                <p className="miembro-rol">
                  Atención médica y ciencias de la salud.
                </p>
              </div>

              <div className="miembro-card">
                <div className="miembro-avatar">⚖️</div>
                <h3 className="miembro-nombre">
                  Derecho
                </h3>
                <p className="miembro-rol">
                  Leyes, justicia y defensa legal.
                </p>
              </div>

              <div className="miembro-card">
                <div className="miembro-avatar">🎨</div>
                <h3 className="miembro-nombre">
                  Diseño Gráfico
                </h3>
                <p className="miembro-rol">
                  Creatividad visual y branding.
                </p>
              </div>

              <div className="miembro-card">
                <div className="miembro-avatar">📈</div>
                <h3 className="miembro-nombre">
                  Administración
                </h3>
                <p className="miembro-rol">
                  Gestión empresarial y liderazgo.
                </p>
              </div>

              <div className="miembro-card">
                <div className="miembro-avatar">🔬</div>
                <h3 className="miembro-nombre">
                  Biotecnología
                </h3>
                <p className="miembro-rol">
                  Investigación científica e innovación.
                </p>
              </div>

            </div>

          </div>

        )}

        {seccion === "juegos" && (
          <Juegos />
        )}

        {seccion === "acerca" && (
          <div className="divCentrado">
            <h2 className="h2">ACERCA DE</h2>
            <p className="p">
              Conoce al equipo de desarrollo detrás de VocacionaTec
            </p>

            <h2 className="h2">Sobre el proyecto</h2>
            <p className="p">
              VocacionaTec es una plataforma web diseñada para ayudar a los estudiantes a descubrir su vocación profesional mediante el test vocacional CHASIDE, recomendaciones de carreras y contenido interactivo.
            </p>

            <h2 className="h2">Equipo de desarrollo</h2>
            <div className="equipo-grid">
              {/* Integrante 1 */}
              <div className="miembro-card">
                <div className="miembro-avatar">👩‍💼</div>
                <h3 className="miembro-nombre">Apale Mora Tania</h3>
                <p className="miembro-rol">Analista</p>
              </div>
              {/* Integrante 2 */}
              <div className="miembro-card">
                <div className="miembro-avatar">🧪</div>
                <h3 className="miembro-nombre">Arellano Crivelli Rafael</h3>
                <p className="miembro-rol">Tester</p>
              </div>
              {/* Integrante 3 */}
              <div className="miembro-card">
                <div className="miembro-avatar">🎨</div>
                <h3 className="miembro-nombre">De Jesús Palacios Irais</h3>
                <p className="miembro-rol">Front-end, diseñadora</p>
              </div>
              {/* Integrante 4 */}
              <div className="miembro-card">
                <div className="miembro-avatar">🗄️</div>
                <h3 className="miembro-nombre">Jiménez Vázquez Jürgen Jared</h3>
                <p className="miembro-rol">DBA, arquitecto de datos</p>
              </div>
              {/* Integrante 5 */}
              <div className="miembro-card">
                <div className="miembro-avatar">⚙️</div>
                <h3 className="miembro-nombre">Vásquez Leal Irving</h3>
                <p className="miembro-rol">Back-end, líder</p>
              </div>
            </div>
          </div>
        )}

      </main>
        <Footer handleSeccionChange={handleSeccionChange} />
    </div>
  );
}

export default App;