import { BrowserRouter, Routes, Route } from "react-router-dom";

import Test from "./pages/Test";
import Juegos from "./Juegos";
import Login from "./pages/Login";
import MisResultados from "./pages/MisResultados";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Test />} />

        <Route path="/juegos" element={<Juegos />} />

        <Route path="/login" element={<Login />} />

        <Route path="/mis-resultados" element={<MisResultados />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;