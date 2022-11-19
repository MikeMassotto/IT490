import React from "react";
import Layout from "./components/Layout";
import Game from "./pages/Game";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <div className="h-screen w-screen">
      <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/user/:user/" element={<div></div>} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<div></div>} />
        </Routes>
      </Router>
      </Layout>
    </div>
  );
}

export default App;
