function PreguntaCard({ pregunta, respuesta, manejarRespuesta }) {

  return (

    <div className="preguntaCard">

      <h3 className="preguntaTitulo">
        {pregunta.id}. {pregunta.texto}
      </h3>

      <div className="opcionesContainer">

        <label
          className={`opcionBtn ${
            respuesta === true ? "opcionActivaSi" : ""
          }`}
        >
          <input
            type="radio"
            name={`pregunta-${pregunta.id}`}
            checked={respuesta === true}
            onChange={() => manejarRespuesta(pregunta.id, true)}
          />

          <span>✔ Sí</span>
        </label>

        <label
          className={`opcionBtn ${
            respuesta === false ? "opcionActivaNo" : ""
          }`}
        >
          <input
            type="radio"
            name={`pregunta-${pregunta.id}`}
            checked={respuesta === false}
            onChange={() => manejarRespuesta(pregunta.id, false)}
          />

          <span>✖ No</span>
        </label>

      </div>

    </div>

  );
}

export default PreguntaCard;