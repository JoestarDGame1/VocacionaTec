import React, { useState } from "react";

// --- DATOS DEL TEST ---
const preguntasChaside = [
  { id: 1, texto: "¿Aceptarías trabajar escribiendo artículos en la sección económica de un diario?" },
  { id: 2, texto: "¿Te ofrecerías para organizar la despedida de soltero de uno de tus amigos?" },
  { id: 3, texto: "¿Te gustaría dirigir/crear un proyecto de urbanización en tu provincia?" },
  { id: 4, texto: "¿A una frustración siempre opones un pensamiento positivo?" },
  { id: 5, texto: "¿Te dedicarías a socorrer a personas accidentadas o atacadas por asaltantes?" },
  { id: 6, texto: "¿Te interesan más los misterios de la naturaleza que los secretos de la tecnología?" },
  { id: 7, texto: "¿Escuchas atentamente los problemas que te plantean tus amigos?" },
  { id: 8, texto: "¿Te ofrecerías para explicar a tus compañeros un determinado tema que ellos no entendieron?" },
  { id: 9, texto: "¿Te atrae armar rompecabezas o puzzles?" },
  { id: 10, texto: "¿Te gustaría conocer la diferencia entre macroeconomía y microeconomía?" },
  { id: 11, texto: "¿Usar uniforme te hace sentir distinto, importante?" },
  { id: 12, texto: "¿Participarías como profesional en un espectáculo de acrobacia aérea?" },
  { id: 13, texto: "¿Organizas tu dinero de manera que te alcance hasta el próximo cobro?" },
  { id: 14, texto: "¿Convences fácilmente a otras personas sobre la validez de tus argumentos?" },
  { id: 15, texto: "¿Te gustaría estar informado sobre los nuevos descubrimientos que se están realizando sobre el origen del Universo?" },
  { id: 16, texto: "¿Ante una situación de emergencia actúas rápidamente?" },
  { id: 17, texto: "¿Si te convocara tu club preferido para planificar, organizar y dirigir un campo de deportes, aceptarías?" },
  { id: 18, texto: "¿Eres el que pone un toque de alegría en las fiestas?" },
  { id: 19, texto: "¿Crees que los detalles son tan importantes como el todo?" },
  { id: 20, texto: "¿Te sentirías a gusto trabajando en un ámbito hospitalario?" },
  { id: 21, texto: "¿Te gustaría participar para mantener el orden ante grandes desórdenes y cataclismos?" },
  { id: 22, texto: "¿Pasarías varias horas leyendo algún libro de tu interés?" },
  { id: 23, texto: "¿Disfrutas modelando con arcilla?" },
  { id: 24, texto: "¿Ayudas habitualmente a los no videntes (a quien lo necesite) a cruzar la calle?" },
  { id: 25, texto: "¿Consideras importante que desde la educación secundaria se fomente la actitud crítica y la participación activa?" },
  { id: 26, texto: "¿Aceptarías que las mujeres formaran parte de las fuerzas armadas bajo las mismas normas que los hombres?" },
  { id: 27, texto: "¿Te gustaría crear nuevas técnicas para descubrir las patologías de algunas enfermedades a través del microscopio?" },
  { id: 28, texto: "¿Participarías en una campaña de prevención contra la enfermedad como el sida?" },
  { id: 29, texto: "¿Te interesan los temas relacionados al pasado y a la evolución del hombre?" },
  { id: 30, texto: "¿Te incluirías en un proyecto de investigación de los movimientos sísmicos y sus consecuencias?" },
  { id: 31, texto: "¿Fuera de los horarios escolares, dedicas algún día de la semana a la realización de actividades corporales?" },
  { id: 32, texto: "¿Te interesan las actividades de mucha acción y de reacción rápida en situaciones imprevistas y de algún peligro?" },
  { id: 33, texto: "¿Te gusta más el trabajo manual que el trabajo intelectual?" },
  { id: 34, texto: "¿Estarías dispuesto a renunciar a un momento placentero para ofrecer tu servicio como profesional (ayudando)?" },
  { id: 35, texto: "¿Participarías de una investigación sobre la violencia en el fútbol?" },
  { id: 36, texto: "¿Te gustaría trabajar en un laboratorio mientras estudias?" },
  { id: 37, texto: "¿Arriesgarías tu vida para salvar la vida de otro que no conoces?" },
  { id: 38, texto: "¿Te agradaría hacer un curso de primeros auxilios?" },
  { id: 39, texto: "¿Tolerarías empezar tantas veces como fuere necesario hasta obtener el logro deseado?" },
  { id: 40, texto: "¿Distribuyes tu horario del día adecuadamente para poder hacer todo lo planeado?" },
  { id: 41, texto: "¿Elegirías una profesión en la que tuvieras que estar algunos meses alejado de tu familia, por ejemplo el marino?" },
  { id: 42, texto: "¿Te radicarías en una zona agrícola-ganadera para desarrollar tus actividades como profesional?" },
  { id: 43, texto: "¿Cuando estás en un grupo trabajando, te entusiasma producir ideas originales y que sean tenidas en cuenta?" },
  { id: 44, texto: "¿Te resulta fácil coordinar un grupo de trabajo?" },
  { id: 45, texto: "¿Te resultó interesante el estudio de las ciencias biológicas?" },
  { id: 46, texto: "¿Si una gran empresa solicita un profesional como gerente de comercialización, te sentirías a gusto desempeñando ese rol?" },
  { id: 47, texto: "¿Tienes interés por saber cuáles son las causas que determinan ciertos fenómenos, aunque saberlo no altere tu vida?" },
  { id: 48, texto: "¿Descubriste algún filósofo o escritor que haya expresado tus mismas ideas con antelación?" },
  { id: 49, texto: "¿Desearías que te regalen algún instrumento musical para tu cumpleaños?" },
  { id: 50, texto: "¿Aceptarías colaborar con el cumplimiento de las normas en lugares públicos?" },
  { id: 51, texto: "¿Formarías parte de un equipo de trabajo orientado a la preservación de la flora y la fauna en extinción?" },
  { id: 52, texto: "¿Leerías revistas relacionadas con los últimos avances científicos y tecnológicos en el área de la salud?" },
  { id: 53, texto: "¿Preservar las raíces culturales de nuestro país te parece importante y necesario?" },
  { id: 54, texto: "¿Te gustaría realizar una investigación que contribuyera a hacer más justa la distribución de la riqueza?" },
  { id: 55, texto: "¿Estás dispuesto a participar activamente en tareas esenciales para el funcionamiento y mantenimiento de una unidad operativa, incluso en condiciones exigentes?" },
  { id: 56, texto: "¿Crees que un país debe poseer la más alta tecnología armamentista, a cualquier precio?" },
  { id: 57, texto: "¿La libertad y la justicia son valores fundamentales en tu vida?" },
  { id: 58, texto: "¿Aceptarías hacer una práctica pagada en una industria de productos alimenticios en el sector de control de calidad?" },
  { id: 59, texto: "¿Consideras que la salud pública debe ser prioritaria, gratuita y eficiente para todos?" },
  { id: 60, texto: "¿Te interesaría investigar sobre alguna nueva vacuna?" },
  { id: 61, texto: "¿En un equipo de trabajo, prefieres el rol de coordinador?" },
  { id: 62, texto: "¿En una discusión entre amigos, te ofreces como mediador?" },
  { id: 63, texto: "¿Estás de acuerdo con la formación de un cuerpo de soldados profesionales?" },
  { id: 64, texto: "¿Lucharías por una causa justa hasta las últimas consecuencias?" },
  { id: 65, texto: "¿Harías un nuevo diseño de una prenda pasada de moda, ante una reunión?" },
  { id: 66, texto: "¿Visitarías un observatorio astronómico para conocer en acción el funcionamiento de los aparatos?" },
  { id: 67, texto: "¿Dirigirías el área de importación y exportación de una empresa?" },
  { id: 68, texto: "¿Te cohíbes/inhibes (te cortas) al entrar a un lugar nuevo con gente desconocida?" },
  { id: 69, texto: "¿Te gratificaría trabajar con niños?" },
  { id: 70, texto: "¿Harías el diseño de un cartel o afiche para una campaña contra el sida?" },
  { id: 71, texto: "¿Dirigirías un grupo de teatro independiente?" },
  { id: 72, texto: "¿Participarías en un grupo de defensa internacional dentro de alguna fuerza armada?" },
  { id: 73, texto: "¿Te costearías tus estudios trabajando en una auditoría (revisión de las cuentas)?" },
  { id: 74, texto: "¿Eres de los que defienden causas perdidas?" },
  { id: 75, texto: "¿Ante una emergencia epidémica participarías en una campaña brindando tu ayuda?" },
  { id: 76, texto: "¿Sabrías responder qué significa ADN o ARN?" },
  { id: 77, texto: "¿Elegirías una carrera cuyo instrumento de trabajo fuera la utilización de un idioma extranjero?" },
  { id: 78, texto: "¿Te resultaría gratificante ser asesor contable en una empresa reconocida?" },
  { id: 79, texto: "¿Ante un llamado solidario, te ofrecerías para cuidar a un enfermo?" },
  { id: 80, texto: "¿Te atrae investigar sobre los misterios del universo, por ejemplo los agujeros negros?" },
  { id: 81, texto: "¿El trabajo individual te resulta más rápido y efectivo que el trabajo grupal?" },
  { id: 82, texto: "¿Dedicarías parte de tu tiempo a ayudar a personas con carencias o necesitadas?" },
  { id: 83, texto: "¿Cuando eliges tu ropa o decoras un ambiente, tienes en cuenta la combinación de los colores, las telas o el estilo de los muebles?" },
  { id: 84, texto: "¿Sabes qué es el PIB? Se trata de un concepto económico. ¿Te gusta este tipo de tema?" }
];

const mapeoAreas = {
  c: { nombre: "Administración y Contabilidad", preguntas: [1, 10, 17, 46, 55, 62, 68, 74, 79, 2, 13, 40, 44] },
  h: { nombre: "Humanidades y Ciencias Sociales", preguntas: [8, 22, 29, 35, 48, 58, 65, 70, 78, 83, 25, 54, 63, 75] },
  a: { nombre: "Artes", preguntas: [3, 9, 18, 23, 31, 39, 43, 49, 71, 84, 19, 33, 66, 72] },
  s: { nombre: "Ciencias de la Salud", preguntas: [7, 14, 20, 28, 38, 45, 53, 61, 76, 80, 4, 24, 34, 60] },
  d: { nombre: "Defensa y Seguridad", preguntas: [5, 12, 21, 26, 32, 41, 50, 56, 64, 73, 11, 16, 37, 57] },
  e: { nombre: "Ciencias Exactas y Técnicas", preguntas: [15, 27, 30, 36, 42, 52, 59, 67, 81, 6, 47, 69, 82] }
};

const preguntasPorCarrera = {
  c: [
    { nombre: "Administración", items: ["¿Te consideras una persona organizada?", "¿Te interesa la gestión de recursos?"] },
    { nombre: "Contaduría", items: ["¿Te gusta el análisis financiero?", "¿Te interesa la auditoría?"] },
    { nombre: "Economía", items: ["¿Te interesa entender mercados globales?", "¿Disfrutas analizar datos económicos?"] },
    { nombre: "Mercadotecnia", items: ["¿Te apasiona el comportamiento del consumidor?", "¿Te interesa desarrollar estrategias de marca?"] },
    { nombre: "Recursos Humanos", items: ["¿Te gusta ayudar en el desarrollo profesional?", "¿Te interesa la gestión del talento?"] }
  ],
  h: [
    { nombre: "Historia", items: ["¿Te apasiona analizar eventos históricos?", "¿Disfrutas investigar fuentes primarias?"] },
    { nombre: "Filosofía", items: ["¿Te interesa reflexionar sobre la existencia?", "¿Disfrutas de los debates intelectuales?"] },
    { nombre: "Psicología", items: ["¿Te interesa entender procesos mentales?", "¿Te apasiona ayudar con problemas emocionales?"] },
    { nombre: "Literatura", items: ["¿Te gusta analizar obras literarias?", "¿Te interesa la escritura creativa?"] },
    { nombre: "Derecho", items: ["¿Te interesa conocer el sistema jurídico?", "¿Disfrutas defender puntos de vista?"] },
    { nombre: "Comunicación", items: ["¿Te apasiona contar historias?", "¿Te interesan las relaciones públicas?"] },
    { nombre: "Pedagogía", items: ["¿Te gusta enseñar?", "¿Te interesan técnicas de aprendizaje?"] }
  ],
  a: [
    { nombre: "Artes visuales", items: ["¿Te apasiona la pintura o escultura?", "¿Te interesa la historia del arte?"] },
    { nombre: "Artes escénicas", items: ["¿Te gusta actuar o bailar?", "¿Te interesa la producción escénica?"] },
    { nombre: "Diseño gráfico", items: ["¿Te apasiona crear diseños visuales?", "¿Te interesa la tipografía?"] },
    { nombre: "Cine", items: ["¿Te gustaría dirigir películas?", "¿Te interesa escribir guiones?"] }
  ],
  s: [
    { nombre: "Medicina", items: ["¿Te apasiona mejorar la salud de otros?", "¿Te interesa aprender sobre el cuerpo humano?"] },
    { nombre: "Enfermería", items: ["¿Te gusta cuidar personas?", "¿Te interesa la atención al paciente?"] },
    { nombre: "Odontología", items: ["¿Te interesa la salud bucal?", "¿Te apasiona la prevención dental?"] },
    { nombre: "Fisioterapia", items: ["¿Te gusta ayudar en la rehabilitación?", "¿Te interesa la terapia física?"] },
    { nombre: "Nutrición", items: ["¿Te apasiona la alimentación saludable?", "¿Te interesa cómo los nutrientes afectan al cuerpo?"] }
  ],
  d: [
    { nombre: "Militar", items: ["¿Te interesa servir a tu país?", "¿Te gusta seguir una disciplina estricta?"] },
    { nombre: "Policía", items: ["¿Te apasiona la seguridad comunitaria?", "¿Te interesa la prevención del crimen?"] },
    { nombre: "Criminología", items: ["¿Te interesa entender las causas del delito?", "¿Te apasiona analizar evidencias?"] },
    { nombre: "Ingeniería de seguridad", items: ["¿Te interesa diseñar sistemas de protección?", "¿Te gusta trabajar con tecnología de seguridad?"] },
    { nombre: "Seguridad informática", items: ["¿Te apasiona la ciberseguridad?", "¿Te interesa proteger datos digitales?"] }
  ],
  e: [
    { nombre: "Biología", items: ["¿Te apasiona estudiar seres vivos?", "¿Te interesa la genética?"] },
    { nombre: "Química", items: ["¿Te gusta experimentar con reacciones?", "¿Te interesan las propiedades de la materia?"] },
    { nombre: "Física", items: ["¿Te apasiona entender las leyes del universo?", "¿Te interesa la mecánica cuántica?"] },
    { nombre: "Matemáticas", items: ["¿Te gusta resolver problemas abstractos?", "¿Te interesan teorías matemáticas?"] },
    { nombre: "Astronomía", items: ["¿Te apasiona estudiar los cuerpos celestes?", "¿Te interesa la evolución de galaxias?"] },
    { nombre: "Ciencias computacionales", items: ["¿Disfrutas resolver acertijos de lógica paso a paso?", "¿Te interesa entender la Inteligencia Artificial?"] },
    { nombre: "Mecánica", items: ["¿Te gusta entender cómo funcionan las máquinas?", "¿Te interesa el diseño mecánico?"] },
    { nombre: "Eléctrica", items: ["¿Te apasiona trabajar con circuitos?", "¿Te interesa la generación de energía?"] }
  ]
};

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

  // Calcular preguntas visibles por página
  const startIndex = paginaActual * PREGUNTAS_POR_PAGINA;
  const preguntasVisibles = preguntasChaside.slice(startIndex, startIndex + PREGUNTAS_POR_PAGINA);
  const totalPaginas = Math.ceil(preguntasChaside.length / PREGUNTAS_POR_PAGINA);

  // Total de preguntas respondidas
  const respondidas = Object.keys(respuestasChaside).length;
  const porcentaje = Math.round((respondidas / preguntasChaside.length) * 100);

  // Manejar respuesta
  const manejarRespuesta = (id, valor) => {
    setRespuestasChaside({ ...respuestasChaside, [id]: valor });
  };

  // Navegación entre páginas
  const irSiguiente = () => {
    const preguntasPaginaActual = preguntasVisibles;
    const todasRespondidas = preguntasPaginaActual.every(p => respuestasChaside[p.id] !== undefined);
    
    if (!todasRespondidas) {
      alert("Por favor responde todas las preguntas antes de continuar.");
      return;
    }

    if (paginaActual < totalPaginas - 1) {
      setPaginaActual(paginaActual + 1);
      window.scrollTo(0, 0);
    } else {
      finalizarChaside();
    }
  };

  const irAnterior = () => {
    if (paginaActual > 0) {
      setPaginaActual(paginaActual - 1);
      window.scrollTo(0, 0);
    }
  };

  // Finalizar test CHASIDE
  const finalizarChaside = () => {
    const conteos = { c: 0, h: 0, a: 0, s: 0, d: 0, e: 0 };
    Object.keys(respuestasChaside).forEach((id) => {
      if (respuestasChaside[id]) {
        for (let area in mapeoAreas) {
          if (mapeoAreas[area].preguntas.includes(parseInt(id))) {
            conteos[area]++;
          }
        }
      }
    });
    const mayor = Object.keys(conteos).reduce((a, b) => (conteos[a] > conteos[b] ? a : b));
    setAreaGanadora(mayor);
    setFase("carreras");
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

  // --- ESTILOS DE LA NAVBAR (Fija y centrada) ---
  const navStyle = {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 50px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #e0e0e0",
    fontFamily: "Arial, sans-serif",
    flexWrap: "wrap",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  };

  const navContainerStyle = {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  };

  const logoStyle = {
    color: "#4a90e2",
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "none",
    marginRight: "40px",
  };

  const navLinksStyle = {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
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

  const profileStyle = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  };

  const handleSeccionChange = (nuevaSeccion) => {
    setSeccion(nuevaSeccion);
  };

  // Renderizado del contenido del test según la fase
  const renderTestContent = () => {
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {fase === "inicio" && (
          <center>
          <div style={{ padding: "40px 20px"}}>
            <h2 style={{ color: "#2c3e50" }}>Test Vocacional CHASIDE</h2>
            <p style={{ fontSize: "1.1rem", color: "#555" }}>
              Responde a las preguntas de forma sincera para encontrar tu perfil profesional.
            </p>
            <button 
              style={{ 
                padding: "15px 40px", 
                fontSize: "1.1rem", 
                backgroundColor: "#4a90e2", 
                color: "white", 
                border: "none", 
                borderRadius: "8px", 
                cursor: "pointer", 
                marginTop: "20px" 
              }}
              onClick={() => setFase("chaside")}
            >
              Iniciar Test
            </button>
          </div>
          </center>
        )}

        {fase === "chaside" && (
          <>
            {/* BARRA DE PROGRESO */}
            <div style={{ marginBottom: "30px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", fontWeight: "bold" }}>
                <span>{respondidas} / {preguntasChaside.length} preguntas</span>
                <span>{porcentaje}% completado</span>
              </div>
              <div style={{ width: "100%", height: "12px", backgroundColor: "#eee", borderRadius: "10px", marginTop: "8px" }}>
                <div 
                  style={{ 
                    width: `${porcentaje}%`, 
                    height: "100%", 
                    backgroundColor: "#4caf50", 
                    borderRadius: "10px", 
                    transition: "width 0.4s ease" 
                  }} 
                />
              </div>
              <p style={{ color: "#888", fontSize: "0.85rem", marginTop: "10px" }}>
                Página {paginaActual + 1} de {totalPaginas}
              </p>
            </div>

            {/* LISTA DE PREGUNTAS CON RADIO BUTTONS */}
            <div style={{ textAlign: "left" }}>
              {preguntasVisibles.map((p) => (
                <div 
                  key={p.id} 
                  style={{ 
                    marginBottom: "25px", 
                    padding: "15px", 
                    backgroundColor: "#f9f9f9", 
                    borderRadius: "8px" 
                  }}
                >
                  <p style={{ margin: "0 0 12px 0", fontWeight: "600", color: "#333" }}>
                    {p.id}. {p.texto}
                  </p>
                  <div style={{ display: "flex", gap: "30px" }}>
                    <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                      <input 
                        type="radio" 
                        name={`pregunta-${p.id}`} 
                        checked={respuestasChaside[p.id] === true} 
                        onChange={() => manejarRespuesta(p.id, true)}
                        style={{ transform: "scale(1.2)" }}
                      /> Sí
                    </label>
                    <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                      <input 
                        type="radio" 
                        name={`pregunta-${p.id}`} 
                        checked={respuestasChaside[p.id] === false} 
                        onChange={() => manejarRespuesta(p.id, false)}
                        style={{ transform: "scale(1.2)" }}
                      /> No
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* NAVEGACIÓN */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
              <button 
                onClick={irAnterior} 
                disabled={paginaActual === 0}
                style={{ 
                  padding: "12px 20px", 
                  borderRadius: "6px", 
                  border: "1px solid #ccc", 
                  cursor: paginaActual === 0 ? "not-allowed" : "pointer",
                  backgroundColor: "#fff"
                }}
              >
                ← Pregunta anterior
              </button>
              <button 
                onClick={irSiguiente}
                style={{ 
                  padding: "12px 20px", 
                  borderRadius: "6px", 
                  border: "none", 
                  backgroundColor: "#4a90e2", 
                  color: "white", 
                  fontWeight: "bold", 
                  cursor: "pointer" 
                }}
              >
                {paginaActual === totalPaginas - 1 ? "Ver mis resultados" : "Siguiente →"}
              </button>
            </div>
          </>
        )}

        {fase === "carreras" && (
          <div style={{ padding: "20px", backgroundColor: "#eef6ff", borderRadius: "12px" }}>
            <h2 style={{ color: "#2c3e50" }}>
              Área detectada: {mapeoAreas[areaGanadora]?.nombre}
            </h2>
            <p style={{ fontSize: "1.1rem" }}>
              Para la carrera de: <strong>{preguntasPorCarrera[areaGanadora]?.[indiceCarrera]?.nombre}</strong>
            </p>
            <div style={{ textAlign: "left", padding: "15px", backgroundColor: "white", borderRadius: "8px", marginBottom: "20px" }}>
              {preguntasPorCarrera[areaGanadora]?.[indiceCarrera]?.items.map((item, i) => (
                <p key={i}>• {item}</p>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
              <button 
                onClick={() => responderCarrera(1)} 
                style={{ 
                  padding: "12px 25px", 
                  backgroundColor: "#4caf50", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "6px", 
                  cursor: "pointer" 
                }}
              >
                Me interesa mucho
              </button>
              <button 
                onClick={() => responderCarrera(0)} 
                style={{ 
                  padding: "12px 25px", 
                  backgroundColor: "#f44336", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "6px", 
                  cursor: "pointer" 
                }}
              >
                No mucho
              </button>
            </div>
          </div>
        )}

        {fase === "resultado" && (
          <div style={{ 
            padding: "40px 20px", 
            backgroundColor: "#f0fff4", 
            borderRadius: "15px", 
            border: "2px solid #4caf50" 
          }}>
            <h2 style={{ color: "#2e7d32" }}>¡Test Completado con Éxito!</h2>
            <p style={{ fontSize: "1.2rem", color: "#555" }}>
              Basado en tus respuestas, tu carrera ideal es:
            </p>
            <h1 style={{ color: "#1b5e20", textTransform: "uppercase", letterSpacing: "1px" }}>
              {Object.keys(carreraScores).reduce((a, b) => carreraScores[a] > carreraScores[b] ? a : b, Object.keys(carreraScores)[0])}
            </h1>
            <button 
              onClick={reiniciarTest} 
              style={{ 
                marginTop: "30px", 
                padding: "12px 30px", 
                borderRadius: "8px", 
                border: "none", 
                backgroundColor: "#666", 
                color: "white", 
                cursor: "pointer" 
              }}
            >
              Realizar de nuevo
            </button>
          </div>
        )}
      </div>
    );
  };

  // --- RENDERIZADO PRINCIPAL ---
  return (
    <div style={{ backgroundColor: "#fdfdfd", minHeight: "100vh" }}>
      
      {/* NAVBAR SUPERIOR - FIJA Y CENTRADA */}
      <nav style={navStyle}>
        <div style={navContainerStyle}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={logoStyle}>VocacionaTec</span>
            <div style={navLinksStyle}>
              <span onClick={() => handleSeccionChange("inicio")} style={linkStyle(seccion === "inicio")}>
                Inicio
              </span>
              <span onClick={() => handleSeccionChange("test")} style={linkStyle(seccion === "test")}>
                Test
              </span>
              <span onClick={() => handleSeccionChange("carreras")} style={linkStyle(seccion === "carreras")}>
                Carreras
              </span>
              <span onClick={() => handleSeccionChange("juegos")} style={linkStyle(seccion === "juegos")}>
                Juegos
              </span>
              <span onClick={() => handleSeccionChange("acerca")} style={linkStyle(seccion === "acerca")}>
                Acerca
              </span>
            </div>
          </div>

          <div style={profileStyle}>
            <span style={{ fontSize: "20px", marginRight: "8px" }}>👤</span>
            <span style={{ fontSize: "16px" }}>Perfil</span>
          </div>
        </div>
      </nav>

      {/* CONTENIDO DINÁMICO SEGÚN EL PANEL SELECCIONADO */}
      <main style={{ maxWidth: "1000px", margin: "40px auto", padding: "20px" }}>
        
        {seccion === "inicio" && (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <h1 style={{ color: "#2c3e50" }}>Bienvenido a VocacionaTec</h1>
            <p style={{ fontSize: "1.2rem", color: "#555" }}>
              Tu futuro profesional comienza con un paso. Elige la sección Test para comenzar.
            </p>
          </div>
        )}

        {seccion === "test" && renderTestContent()}

        {seccion === "carreras" && (
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <h2 style={{ color: "#2c3e50" }}>Explora nuestro catálogo de carreras universitarias</h2>
            <p style={{ color: "#555" }}>Descubre todas las opciones profesionales disponibles según tu perfil.</p>
          </div>
        )}

        {seccion === "juegos" && (
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <h2 style={{ color: "#2c3e50" }}>Panel de Juegos de Habilidad y Lógica</h2>
            <p style={{ color: "#555" }}>Próximamente: Juegos interactivos para desarrollar tus habilidades.</p>
          </div>
        )}

        {seccion === "acerca" && (
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <h2 style={{ color: "#2c3e50" }}>Sobre VocacionaTec y el Test CHASIDE</h2>
            <p style={{ color: "#555" }}>
              El test CHASIDE es una herramienta vocacional que te ayuda a descubrir tus áreas de interés 
              profesional basado en 6 dimensiones: Científica, Humanística, Artística, Social, Deportiva y Empresarial.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
