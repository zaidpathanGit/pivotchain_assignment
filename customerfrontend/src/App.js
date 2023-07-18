import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/main.css";
import Header from "./Components/Header";
import Stats from "./Components/Stats";
import ListView from "./Components/ListView";
import FormView from "./Components/FormView";

function App() {
  return (
    <BrowserRouter>
      <main id="main">
        <Header />
        <Stats />
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/new" element={<FormView />} />
          <Route path="/update/:id" element={<FormView />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
