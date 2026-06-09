// src/App.js
import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { getTurmas, getProfessores, getDisciplinas, popularDadosIniciais } from "./utils/firebaseService";
import { professores as profInicial, disciplinas as discInicial, turmas as turmasInicial } from "./data/dadosIniciais";
import Dashboard from "./pages/Dashboard";
import Turmas from "./pages/Turmas";
import Professores from "./pages/Professores";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import Planejamento from "./pages/Planejamento";
import ProfessoresADM from "./pages/ProfessoresADM";
import "./App.css";

export const AppContext = createContext(null);

export default function App() {
  const [turmas, setTurmas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuAberto, setMenuAberto] = useState(false);
  const [cursoAtivo, setCursoAtivo] = useState("PSI");

  const carregar = async () => {
    setLoading(true);
    try {
      const [t, p, d] = await Promise.all([getTurmas(), getProfessores(), getDisciplinas()]);
      if (t.length === 0) {
        await popularDadosIniciais(profInicial, discInicial, turmasInicial);
        const [t2, p2, d2] = await Promise.all([getTurmas(), getProfessores(), getDisciplinas()]);
        setTurmas(t2); setProfessores(p2); setDisciplinas(d2);
      } else {
        setTurmas(t); setProfessores(p); setDisciplinas(d);
      }
    } catch (err) {
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
              <div className="sidebar-subtitulo">Gestão de Horários</div>
            </div>

            {/* Seletor de curso */}
            <div style={{ padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => setCursoAtivo("PSI")}
                  style={{ flex: 1, padding: "5px 0", borderRadius: 4, border: "none", cursor: "pointer", fontSize: 11, fontWeight: "bold",
                    background: cursoAtivo === "PSI" ? "rgba(255,255,255,0.25)" : "transparent", color: "#fff" }}>
                  PSICOLOGIA
                </button>
                <button onClick={() => setCursoAtivo("ADM")}
                  style={{ flex: 1, padding: "5px 0", borderRadius: 4, border: "none", cursor: "pointer", fontSize: 11, fontWeight: "bold",
                    background: cursoAtivo === "ADM" ? "rgba(255,255,255,0.25)" : "transparent", color: "#fff" }}>
                  ADM
                </button>
              </div>
            </div>

            <nav className="sidebar-nav">
              <NavLink to="/" end onClick={() => setMenuAberto(false)}>
                <span className="nav-icon">⊞</span> Dashboard
              </NavLink>

              {cursoAtivo === "ADM" ? <>
                <div style={{ padding: "8px 18px 4px", fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>ADMINISTRAÇÃO</div>
                <NavLink to="/planejamento" onClick={() => setMenuAberto(false)}>
                  <span className="nav-icon">◈</span> Planejamento
                </NavLink>
                <NavLink to="/professores-adm" onClick={() => setMenuAberto(false)}>
                  <span className="nav-icon">◫</span> Professores
                </NavLink>
                <NavLink to="/relatorios" onClick={() => setMenuAberto(false)}>
                  <span className="nav-icon">◧</span> Relatórios
                </NavLink>
              </> : <>
                <div style={{ padding: "8px 18px 4px", fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>PSICOLOGIA</div>
                <NavLink to="/turmas" onClick={() => setMenuAberto(false)}>
                  <span className="nav-icon">◫</span> Turmas
                </NavLink>
                <NavLink to="/professores" onClick={() => setMenuAberto(false)}>
                  <span className="nav-icon">◈</span> Professores
                </NavLink>
                <NavLink to="/relatorios" onClick={() => setMenuAberto(false)}>
                  <span className="nav-icon">◧</span> Relatórios
                </NavLink>
              </>}

              <NavLink to="/configuracoes" onClick={() => setMenuAberto(false)} style={{ marginTop: "auto" }}>
                <span className="nav-icon">⊙</span> Configurações
              </NavLink>
            </nav>
            <div className="sidebar-semestre">2026 · UNIVERSO Goiânia</div>
          </aside>

          <div className="main-area">
            <header className="topbar">
              <button className="menu-toggle" onClick={() => setMenuAberto(!menuAberto)}>☰</button>
              <div className="topbar-title">
                Sistema de Gestão de Horários
                <span style={{ marginLeft: 8, fontSize: 11, background: cursoAtivo === "ADM" ? "#DBEAFE" : "#EDE9FE",
                  color: cursoAtivo === "ADM" ? "#1D4ED8" : "#6D28D9", padding: "2px 8px", borderRadius: 10, fontWeight: "bold" }}>
                  {cursoAtivo === "ADM" ? "Administração" : "Psicologia"}
                </span>
              </div>
              <button className="btn-reload" onClick={carregar} title="Recarregar">↺</button>
            </header>

            <main className="page-content">
              {loading ? (
                <div className="loading-state"><div className="spinner" /><p>Carregando...</p></div>
              ) : (
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/turmas" element={<Turmas />} />
                  <Route path="/professores" element={<Professores />} />
                  <Route path="/planejamento" element={<Planejamento />} />
                  <Route path="/professores-adm" element={<ProfessoresADM />} />
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
