// src/App.js
import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { getTurmas, getProfessores, getDisciplinas, popularDadosIniciais } from "./utils/firebaseService";
import { professores as profInicial, disciplinas as discInicial, turmas as turmasInicial } from "./data/dadosIniciais";
import Dashboard from "./pages/Dashboard";
import Turmas from "./pages/Turmas";
import Professores from "./pages/Professores";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import "./App.css";

export const AppContext = createContext(null);

export default function App() {
  const [turmas, setTurmas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuAberto, setMenuAberto] = useState(false);

  const carregar = async () => {
    setLoading(true);
    try {
      const [t, p, d] = await Promise.all([getTurmas(), getProfessores(), getDisciplinas()]);
      // Se Firebase vazio, popular com dados iniciais
      if (t.length === 0) {
        await popularDadosIniciais(profInicial, discInicial, turmasInicial);
        const [t2, p2, d2] = await Promise.all([getTurmas(), getProfessores(), getDisciplinas()]);
        setTurmas(t2); setProfessores(p2); setDisciplinas(d2);
      } else {
        setTurmas(t); setProfessores(p); setDisciplinas(d);
      }
    } catch (err) {
      console.error("Erro Firebase:", err);
      // Fallback local se Firebase não configurado
      setTurmas(turmasInicial); setProfessores(profInicial); setDisciplinas(discInicial);
    }
    setLoading(false);
  };

  useEffect(() => { carregar(); }, []);

  return (
    <AppContext.Provider value={{ turmas, setTurmas, professores, setProfessores, disciplinas, setDisciplinas, carregar }}>
      <BrowserRouter>
        <div className="app-shell">
          <aside className={`sidebar ${menuAberto ? "aberto" : ""}`}>
            <div className="sidebar-logo">
              <img src="/logo-universo.png" alt="UNIVERSO" />
              <div className="sidebar-subtitulo">Estágios · Psicologia</div>
            </div>
            <nav className="sidebar-nav">
              <NavLink to="/" end onClick={() => setMenuAberto(false)}>
                <span className="nav-icon">⊞</span> Dashboard
              </NavLink>
              <NavLink to="/turmas" onClick={() => setMenuAberto(false)}>
                <span className="nav-icon">◫</span> Turmas
              </NavLink>
              <NavLink to="/professores" onClick={() => setMenuAberto(false)}>
                <span className="nav-icon">◈</span> Professores
              </NavLink>
              <NavLink to="/relatorios" onClick={() => setMenuAberto(false)}>
                <span className="nav-icon">◧</span> Relatórios
              </NavLink>
              <NavLink to="/configuracoes" onClick={() => setMenuAberto(false)}>
                <span className="nav-icon">⊙</span> Configurações
              </NavLink>
            </nav>
            <div className="sidebar-semestre">2026-1</div>
          </aside>

          <div className="main-area">
            <header className="topbar">
              <button className="menu-toggle" onClick={() => setMenuAberto(!menuAberto)}>☰</button>
              <div className="topbar-title">Sistema de Gestão de Estágios</div>
              <button className="btn-reload" onClick={carregar} title="Recarregar dados">↺</button>
            </header>

            <main className="page-content">
              {loading ? (
                <div className="loading-state">
                  <div className="spinner" />
                  <p>Carregando dados...</p>
                </div>
              ) : (
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/turmas" element={<Turmas />} />
                  <Route path="/professores" element={<Professores />} />
                  <Route path="/relatorios" element={<Relatorios />} />
                  <Route path="/configuracoes" element={<Configuracoes />} />
                </Routes>
              )}
            </main>
          </div>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
