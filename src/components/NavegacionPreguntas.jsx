function NavegacionPreguntas({
  irAnterior,
  irSiguiente,
  paginaActual,
  totalPaginas
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "30px",
      }}
    >
      <button
        onClick={irAnterior}
        disabled={paginaActual === 0}
        style={{
          padding: "12px 20px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          cursor: paginaActual === 0 ? "not-allowed" : "pointer",
          backgroundColor: "#fff",
        }}
      >
        ← Pregunta anterior
      </button>

      <button
        onClick={irSiguiente}
        className="btnSiguiente"
      >
        {paginaActual === totalPaginas - 1
          ? "Ver mis resultados"
          : "Siguiente →"}
      </button>
    </div>
  );
}

export default NavegacionPreguntas;