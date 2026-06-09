// src/pages/Dashboard.js
import React, { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { turmas, professores, disciplinas } = useContext(AppContext);
  const navigate = useNavigate();

  const ativas = turmas.filter(t => t.status !== "EXCLUÍDO");
  const favoraveis = ativas.filter(t => t.status === "FAVORÁVEL").length;
  const semProf = ativas.filter(t => !t.professorId).length;
  const naoDefer = ativas.filter(t => t.status === "NÃO DEFERIDO").length;
  const hospitalar = ativas.filter(t => t.hospitar).length;

  const porPeriodo = ["5","6","7","8","9"].map(p => ({
    periodo: p,
    total: ativas.filter(t => t.periodo === p).length,
    favoravel: ativas.filter(t => t.periodo === p && t.status === "FAVORÁVEL").length,
  }));

  const profCarga = professores.map(p => ({
    ...p,
    turmas: ativas.filter(t => t.professorId === p.id).length,
  })).sort((a,b) => b.turmas - a.turmas);

  return (
    <div>
      <h2 style={{fontSize:16, fontWeight:"bold", color:"#1F4E79", marginBottom:16}}>Dashboard · 2026-1</h2>

      {/* Métricas */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Total de turmas</div>
          <div className="metric-value">{ativas.length}</div>
          <div className="metric-sub">ativas no semestre</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Favoráveis</div>
          <div className="metric-value" style={{color:"#1A7A45"}}>{favoraveis}</div>
          <div className="metric-sub">com professor alocado</div>
        </div>
        <div className="metric-card alerta">
          <div className="metric-label">Sem professor</div>
          <div className="metric-value">{semProf}</div>
          <div className="metric-sub">precisam de contratação</div>
        </div>
        <div className="metric-card alerta">
          <div className="metric-label">Não deferidas</div>
          <div className="metric-value">{naoDefer}</div>
          <div className="metric-sub">aguardando deferimento</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Campo hospitalar</div>
          <div className="metric-value" style={{color:"#92400E"}}>{hospitalar}</div>
          <div className="metric-sub">9º período · máx 8 alunos</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Professores</div>
          <div className="metric-value">{professores.length}</div>
          <div className="metric-sub">cadastrados</div>
        </div>
      </div>

      {/* Alertas */}
      {semProf > 0 && (
        <div className="alert alert-warn">
          ⚠ {semProf} turma(s) sem professor definido — precisam de contratação ou realocação.
          <button className="btn btn-sm" style={{marginLeft:"auto"}} onClick={() => navigate("/turmas")}>Ver turmas</button>
        </div>
      )}
      {naoDefer > 0 && (
        <div className="alert alert-warn">
          ⚠ {naoDefer} turma(s) marcadas como "Não Deferido" — pendentes de lançamento no sistema.
        </div>
      )}
      <div className="alert alert-ok">
        ✓ Regra de capacidade: turmas do 9º período com máx. 8 alunos (hospitalar) configurada.
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
        {/* Turmas por período */}
        <div className="card">
          <div className="card-title">Turmas por período</div>
          {porPeriodo.map(p => (
            <div key={p.periodo} style={{marginBottom:10}}>
              <div style={{display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:3}}>
                <span>{p.periodo}º Período</span>
                <span style={{color:"#6B7280"}}>{p.favoravel}/{p.total} alocadas</span>
              </div>
              <div className="ch-bar">
                <div className={p.total === 0 ? "" : p.favoravel/p.total >= 0.8 ? "ch-fill-ok" : "ch-fill-mid"}
                  style={{width: p.total ? `${Math.round(p.favoravel/p.total*100)}%` : "0%", height:"100%", borderRadius:3}} />
              </div>
            </div>
          ))}
        </div>

        {/* Carga horária professores */}
        <div className="card">
          <div className="card-title">Carga por professor</div>
          <div style={{maxHeight:220, overflowY:"auto"}}>
            {profCarga.map(p => (
              <div key={p.id} style={{marginBottom:8}}>
                <div style={{display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:2}}>
                  <span style={{overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:"70%"}}>{p.nome}</span>
                  <span style={{color:"#6B7280", whiteSpace:"nowrap"}}>{p.turmas} turmas · {p.turmas*3}h</span>
                </div>
                <div className="ch-bar">
                  <div className={p.turmas > 8 ? "ch-fill-alto" : p.turmas > 5 ? "ch-fill-mid" : "ch-fill-ok"}
                    style={{width:`${Math.min(p.turmas/10*100,100)}%`, height:"100%", borderRadius:3}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
