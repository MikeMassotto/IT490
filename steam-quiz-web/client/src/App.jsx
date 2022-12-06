import React from "react";
import Layout from "./components/Layout";
import Register from "./components/Register";
import Game from "./views/Game";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="h-screen w-screen">
      <Layout>

        <Router>
          <Routes>
            <Route path="/" element={<div></div>} />
            <Route path="/register" element={<Register />} />
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
