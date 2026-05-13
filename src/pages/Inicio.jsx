function Inicio({ handleSeccionChange }) {

  return (

    <>

      {/* HERO PRINCIPAL */}

      <section className="hero">

        <h1 className="heroTitulo">
          Descubre tu vocación profesional 🚀
        </h1>

        <p className="heroTexto">
          Realiza nuestro test vocacional inteligente y encuentra
          la carrera ideal para tu futuro.
        </p>

        <button
          className="heroBoton"
          onClick={() => handleSeccionChange("test")}
        >
          Comenzar Test
        </button>

      </section>

      {/* COMO FUNCIONA */}

      <section className="como-funciona">

        <h2 className="titulo-como-funciona">
          ¿Cómo funciona?
        </h2>

        <div className="tarjetas-container">

          <div className="tarjeta">
            <div className="numero">1</div>

            <h3 className="titulo-tarjeta">
              Responde el test
            </h3>

            <p className="descripcion-tarjeta">
              Contesta preguntas diseñadas para conocer
              tus intereses y habilidades.
            </p>
          </div>

          <div className="tarjeta">
            <div className="numero">2</div>

            <h3 className="titulo-tarjeta">
              Descubre tu perfil
            </h3>

            <p className="descripcion-tarjeta">
              Analizamos tus respuestas para detectar
              tus áreas vocacionales.
            </p>
          </div>

          <div className="tarjeta">
            <div className="numero">3</div>

            <h3 className="titulo-tarjeta">
              Explora carreras
            </h3>

            <p className="descripcion-tarjeta">
              Obtén recomendaciones profesionales
              adaptadas a tu perfil.
            </p>
          </div>

        </div>

      </section>

      {/* BENEFICIOS */}

      <section className="porque-usar">

        <h2 className="titulo-porque">
          ¿Por qué usar VocacionaTec?
        </h2>

        <div className="ventajas-container">

          <div className="ventaja-item">
            <span className="ventaja-check">✅</span>
            <p>Resultados personalizados</p>
          </div>

          <div className="ventaja-item">
            <span className="ventaja-check">⚡</span>
            <p>Test rápido y sencillo</p>
          </div>

          <div className="ventaja-item">
            <span className="ventaja-check">🎯</span>
            <p>Recomendaciones inteligentes</p>
          </div>

          <div className="ventaja-item">
            <span className="ventaja-check">💡</span>
            <p>Interfaz moderna y amigable</p>
          </div>

        </div>

      </section>

      {/* CTA FINAL */}

      <section className="hero">

        <h2 className="heroTitulo">
          Tu futuro comienza hoy ✨
        </h2>

        <p className="heroTexto">
          Descubre la carrera perfecta para ti
          y empieza a construir tu camino profesional.
        </p>

        <button
          className="heroBoton"
          onClick={() => handleSeccionChange("test")}
        >
          Iniciar Ahora
        </button>

      </section>

    </>

  );
}

export default Inicio;