function BarraProgreso({
  respondidas,
  totalPreguntas,
  porcentaje,
  paginaActual,
  totalPaginas,
}) {
  return (
    <div className="divProgreso">

      <div className="divContenidoProgreso">
        <span>
          Progreso: {respondidas} / {totalPreguntas}
        </span>
      </div>

      {/* BARRA */}
      <div className="divProg">
        <div
          className="barraInterna"
          style={{
            width: `${porcentaje}%`,
          }}
        />
      </div>

      <div className="divContenidoProgreso">
        <span>{porcentaje}% completado</span>
      </div>

      <p className="pPaginas">
        Página {paginaActual + 1} de {totalPaginas}
      </p>

    </div>
  );
}

export default BarraProgreso;