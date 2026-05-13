function AreaDetectada({
  areaGanadora,
  preguntasPorCarrera,
  indiceCarrera,
  mapeoAreas,
  responderCarrera
}) {
  return (
    <div className="divAreaDetectada">
      <h2 className="h2">
        Área detectada: {mapeoAreas[areaGanadora]?.nombre}
      </h2>

      <p className="pAreaDetectada">
        Para la carrera de:
        <strong>
          {" "}
          {preguntasPorCarrera[areaGanadora]?.[indiceCarrera]?.nombre}
        </strong>
      </p>

      <div className="divDosArea">
        {preguntasPorCarrera[areaGanadora]?.[indiceCarrera]?.items.map(
          (item, i) => (
            <p key={i}>• {item}</p>
          )
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => responderCarrera(1)}
          className="btnMeInteresa"
        >
          Me interesa mucho
        </button>

        <button
          onClick={() => responderCarrera(0)}
          className="btnNoMucho"
        >
          No mucho
        </button>
      </div>
    </div>
  );
}

export default AreaDetectada;