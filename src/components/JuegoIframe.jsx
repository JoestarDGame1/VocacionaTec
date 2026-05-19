import React from "react";

function JuegoIframe({ titulo, url, onBack }) {
  return (
    <div className="iframeJuegoContainer">

      <div className="iframeTop">

        <h1>{titulo}</h1>

        <button
          className="card-boton"
          onClick={onBack}
        >
          ← Volver a juegos
        </button>

      </div>

      <div className="iframeWrapper">

        <iframe
          src={url}
          title={titulo}
          className="iframeJuego"
          allowFullScreen
        />

      </div>

    </div>
  );
}

export default JuegoIframe;