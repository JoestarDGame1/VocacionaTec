import React, { useState } from "react";
import JuegoIframe from "./components/JuegoIframe";
import Rompecabezas from "./Rompecabezas";
import TriviaCarreras from "./TriviaCarreras";
import ExploradorTalentos from "./ExploradorTalentos";

export default function Juegos() {

  const [juegoActivo, setJuegoActivo] = useState(null);

  if (juegoActivo === "rompecabezas") {
  return (
    <Rompecabezas
      onBack={() => setJuegoActivo(null)}
    />
  );
}

if (juegoActivo === "trivia") {
  return (
    <TriviaCarreras
      onBack={() => setJuegoActivo(null)}
    />
  );
}

if (juegoActivo === "memoria") {
  return (
    <JuegoIframe
      titulo="Memoria Profesional"
      url="https://www.educaplay.com/learning-resources/18319116-memoria_de_profesiones.html"
      onBack={() => setJuegoActivo(null)}
    />
  );
}

if (juegoActivo === "sopa") {
  return (
    <JuegoIframe
      titulo="Sopa de Letras Vocacional"
      url="https://es.educaplay.com/recursos-educativos/3520204-orientacion_vocacional.html"
      onBack={() => setJuegoActivo(null)}
    />
  );
}

if (juegoActivo === "logica") {
  return (
    <JuegoIframe
      titulo="Desafío de Lógica"
      url="https://www.cokitos.com/piramide-de-sumas/play/"
      onBack={() => setJuegoActivo(null)}
    />
  );
}

if (juegoActivo === "explorador") {
  return (
    <ExploradorTalentos
      onBack={() => setJuegoActivo(null)}
    />
  );
}

  return (
    <div className="juegos-container">
      <header className="juegos-header">
        <h1 className="juegos-titulo">Juegos</h1>
        <p className="juegos-descripcion">
          Explora juegos interactivos para aprender y mantener tu interés mientras descubres tu vocación profesional.
        </p>
      </header>

      <div className="juegos-lista">
        <div className="juego-card">
          <div className="card-icon">🧩</div>
          <h2 className="card-titulo">Rompecabezas de habilidades</h2>
          <p className="card-descripcion">
            Descubre tus fortalezas resolviendo acertijos lógicos.
          </p>
          <button
            className="card-boton"
            onClick={() => setJuegoActual("puzzle")}
          >
            ▷ Jugar
          </button>
        </div>

        <div className="juego-card">
          <div className="card-icon">❓</div>
          <h2 className="card-titulo">Trivia de Carreras</h2>
          <p className="card-descripcion">
            Aprende sobre diferentes profesiones con preguntas divertidas.
          </p>
          <button
            className="card-boton"
            onClick={() => setJuegoActual("trivia")}
          >
            ▷ Jugar
          </button>
        </div>

        <div className="juego-card">
          <div className="card-icon">🧠</div>
          <h2 className="card-titulo">Memoria Profesional</h2>
          <p className="card-descripcion">
            Ejercita tu memoria asociando profesiones con sus herramientas.
          </p>
          <button
            className="card-boton"
            onClick={() => setJuegoActivo("memoria")}
          >
            ▷ Jugar
          </button>
        </div>

        <div className="juego-card">
          <div className="card-icon">🔤</div>
          <h2 className="card-titulo">Sopa de Letras Vocacional</h2>
          <p className="card-descripcion">
            Encuentra términos relacionados con tu área de interés.
          </p>
          <button
            className="card-boton"
            onClick={() => setJuegoActivo("sopa")}
          >
            ▷ Jugar
          </button>
        </div>

        <div className="juego-card">
          <div className="card-icon">💡</div>
          <h2 className="card-titulo">Desafío de Lógica</h2>
          <p className="card-descripcion">
            Resuelve problemas y descubre carreras afines.
          </p>
          <button
            className="card-boton"
            onClick={() => setJuegoActivo("logica")}
          >
            ▷ Jugar
          </button>
        </div>

        <div className="juego-card">
          <div className="card-icon">🔎</div>
          <h2 className="card-titulo">Explorador de Talentos</h2>
          <p className="card-descripcion">
            Interactúa con escenarios reales de diferentes profesiones.
          </p>
          <button
            className="card-boton"
            onClick={() => setJuegoActivo("explorador")}
          >
            ▷ Jugar
          </button>
        </div>
      </div>
    </div>
  );
}