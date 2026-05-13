function Footer({ handleSeccionChange }) {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-logo">
          <span className="footer-nombre">
            VocacionaTec
          </span>
        </div>

        <nav className="footer-nav">

          <button
            onClick={() => handleSeccionChange("inicio")}
            className="footer-link"
          >
            Inicio
          </button>

          <button
            onClick={() => handleSeccionChange("test")}
            className="footer-link"
          >
            Test
          </button>

          <button
            onClick={() => handleSeccionChange("carreras")}
            className="footer-link"
          >
            Carreras
          </button>

          <button
            onClick={() => handleSeccionChange("juegos")}
            className="footer-link"
          >
            Juegos
          </button>

          <button
            onClick={() => handleSeccionChange("acerca")}
            className="footer-link"
          >
            Acerca de
          </button>

        </nav>

        <div className="footer-copyright">
          <p>
            © 2026 VocacionaTec. Todos los derechos reservados.
          </p>
        </div>

      </div>

    </footer>
  );
}

export default Footer;