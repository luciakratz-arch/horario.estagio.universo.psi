// src/pages/Planejamento.js
// Módulo de planejamento de semestre — coração do sistema

import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { gradeADM, professoresADM, diasSemana } from "../data/dadosADM";

const PERIODOS = ["1","2","3","4","5","6","7","8"];
const DIAS = ["SEG","TER","QUA","QUI","SEX"];

// Regras de CH
const REGRAS = {
  maxDiario: 6,
  maxSeguido: 4,
  maxSemanal: 40,
  minInterjornada: 11,
};

function calcularCargaProfessor(professorId, grade) {
  return grade.filter(d => d.professorId === professorId && !d.ead).length * 3;
}

function detectarConflitos(grade, professores) {
  const alertas = [];
  const profMap = Object.fromEntries(professores.map(p => [p.id, p]));

  // Verificar professor no mesmo dia/horário em dois períodos
  const ocupacao = {};
  grade.forEach(d => {
    if (!d.professorId || d.ead) return;
    const key = `${d.professorId}-${d.dia}`;
    if (!ocupacao[key]) ocupacao[key] = [];
    ocupacao[key].push(d);
  });

  Object.entries(ocupacao).forEach(([key, discs]) => {
    if (discs.length > 1) {
      const [profId] = key.split("-");
      const prof = profMap[profId];
      alertas.push({
        tipo: "CONFLITO",
        msg: `${prof?.nome || profId} tem ${discs.length} disciplinas no mesmo dia: ${discs.map(d => d.disciplina).join(", ")}`,
        cor: "alert-warn"
      });
    }
  });

  // Verificar carga vs referência
  professores.forEach(p => {
    const ch = calcularCargaProfessor(p.id, grade);
    if (ch < p.chRef) {
      alertas.push({
        tipo: "CARGA_BAIXA",
        msg: `${p.nome}: CH atual ${ch}h < referência ${p.chRef}h (diferença: ${p.chRef - ch}h)`,
        cor: "alert-warn"
      });
    }
  });

  return alertas;
}

export default function Planejamento() {
  const [semestre, setSemestre] = useState("2026-2");
  const [alunos, setAlunos] = useState({
    "1": 0, "2": 0, "3": 28, "4": 0, "5": 11, "6": 1, "7": 9, "8": 5
  });
  const [grade, setGrade] = useState(gradeADM.map(d => ({ ...d })));
  const [abaPeriodo, setAbaPeriodo] = useState("1");
  const [editando, setEditando] = useState(null);
  const [mostrarAlertas, setMostrarAlertas] = useState(true);

  const alertas = detectarConflitos(grade, professoresADM);
  const profMap = Object.fromEntries(professoresADM.map(p => [p.id, p]));

  // Projeção: alunos do período X vão para X+1 no próximo semestre
  const projecao = {};
  PERIODOS.forEach(p => {
    const anterior = String(parseInt(p) - 1);
    projecao[p] = alunos[anterior] || 0;
  });

  const gradePeriodo = grade.filter(d => d.periodo === abaPeriodo);

  const atualizarProf = (idx, novoProf) => {
    const novaGrade = [...grade];
    const globalIdx = grade.findIndex((d, i) =>
      d.periodo === abaPeriodo && grade.filter(x => x.periodo === abaPeriodo).indexOf(d) === idx
    );
    // find correct index
    let count = 0;
    for (let i = 0; i < grade.length; i++) {
      if (grade[i].periodo === abaPeriodo) {
        if (count === idx) {
          novaGrade[i] = { ...novaGrade[i], professorId: novoProf || null };
          break;
        }
        count++;
      }
    }
    setGrade(novaGrade);
  };

  const chPorProf = Object.fromEntries(
    professoresADM.map(p => [p.id, calcularCargaProfessor(p.id, grade)])
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: "bold", color: "#1F4E79" }}>
          Planejamento de Semestre — ADM
        </h2>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={semestre} onChange={e => setSemestre(e.target.value)}
            style={{ padding: "6px 10px", border: "1px solid #DDE1E7", borderRadius: 6, fontSize: 13, width: 100 }} />
          <button className="btn btn-primary" onClick={() => setMostrarAlertas(!mostrarAlertas)}>
            {alertas.length > 0 ? `⚠ ${alertas.length} alertas` : "✓ Sem alertas"}
          </button>
        </div>
      </div>

      {/* Alertas */}
      {mostrarAlertas && alertas.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          {alertas.map((a, i) => (
            <div key={i} className={`alert ${a.cor}`} style={{ marginBottom: 6 }}>
              {a.tipo === "CONFLITO" ? "🔴 CONFLITO: " : "🟡 ATENÇÃO: "}{a.msg}
            </div>
          ))}
        </div>
      )}
      {alertas.length === 0 && (
        <div className="alert alert-ok" style={{ marginBottom: 16 }}>✓ Nenhum conflito detectado!</div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Projeção de alunos */}
        <div className="card">
          <div className="card-title">
            Alunos por período — {semestre.split("-")[0]+"-"+(parseInt(semestre.split("-")[1])-1) || "atual"}
            <span style={{ fontSize: 11, fontWeight: 400, color: "#6B7280" }}>base para projeção</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {PERIODOS.map(p => (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: 8, background: "#F4F6F9", borderRadius: 6, padding: "6px 10px" }}>
                <span style={{ fontSize: 12, fontWeight: "bold", color: "#1F4E79", width: 24 }}>{p}º</span>
                <input type="number" min="0" value={alunos[p] || 0}
                  onChange={e => setAlunos(a => ({ ...a, [p]: parseInt(e.target.value) || 0 }))}
                  style={{ width: 60, padding: "4px 6px", border: "1px solid #DDE1E7", borderRadius: 4, fontSize: 13 }} />
                <span style={{ fontSize: 11, color: "#6B7280" }}>alunos</span>
                {parseInt(p) < 8 && (
                  <span style={{ fontSize: 10, color: "#1A7A45", marginLeft: "auto" }}>
                    → {projecao[String(parseInt(p)+1)]} no {parseInt(p)+1}º
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Carga horária dos professores */}
        <div className="card">
          <div className="card-title">Carga Horária por Professor</div>
          {professoresADM.map(p => {
            const ch = chPorProf[p.id] || 0;
            const pct = Math.min(ch / Math.max(p.chRef, 1) * 100, 100);
            const abaixo = ch < p.chRef;
            return (
              <div key={p.id} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 2 }}>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "65%" }}>
                    {p.nome}
                  </span>
                  <span style={{ whiteSpace: "nowrap", color: abaixo ? "#C00000" : "#1A7A45", fontWeight: "bold" }}>
                    {ch}h / {p.chRef}h ref.
                  </span>
                </div>
                <div className="ch-bar">
                  <div className={abaixo ? "ch-fill-alto" : "ch-fill-ok"}
                    style={{ width: `${pct}%`, height: "100%", borderRadius: 3 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grade por período */}
      <div className="card">
        <div className="card-title">Grade Horária — {semestre}</div>

        {/* Tabs períodos */}
        <div className="periodo-tabs" style={{ marginBottom: 14 }}>
          {PERIODOS.map(p => (
            <div key={p}
              className={`periodo-tab ${abaPeriodo === p ? "ativo" : ""}`}
              onClick={() => setAbaPeriodo(p)}>
              {p}º período
              {projecao[p] > 0 && (
                <span style={{ marginLeft: 4, fontSize: 10, background: "#E6F1FB", color: "#185FA5", padding: "1px 5px", borderRadius: 8 }}>
                  {projecao[p]} alunos
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Grade do período selecionado */}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Disciplina</th>
                <th>Dia</th>
                <th>Horário</th>
                <th>Professor(a)</th>
                <th>CH</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {gradePeriodo.map((d, idx) => (
                <tr key={idx}>
                  <td><strong>{d.disciplina}</strong></td>
                  <td style={{ fontSize: 12, maxWidth: 220 }}>{d.nome}</td>
                  <td>{diasSemana[d.dia]}</td>
                  <td style={{ fontSize: 12 }}>19:15 – 22:00</td>
                  <td>
                    {d.ead ? (
                      <span className="badge badge-m">EAD</span>
                    ) : editando === `${d.periodo}-${idx}` ? (
                      <select value={d.professorId || ""}
                        onChange={e => { atualizarProf(idx, e.target.value); setEditando(null); }}
                        onBlur={() => setEditando(null)}
                        autoFocus
                        style={{ fontSize: 12, padding: "3px 6px", border: "1px solid #DDE1E7", borderRadius: 4 }}>
                        <option value="">— Sem professor —</option>
                        {professoresADM.map(p => (
                          <option key={p.id} value={p.id}>{p.nome}</option>
                        ))}
                      </select>
                    ) : (
                      <span onClick={() => setEditando(`${d.periodo}-${idx}`)}
                        style={{ cursor: "pointer", borderBottom: "1px dashed #DDE1E7" }}>
                        {d.professorId ? profMap[d.professorId]?.nome || d.professorId
                          : <span style={{ color: "#C55A11" }}>⚠ Sem professor</span>}
                      </span>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>{d.ead ? "—" : "3h"}</td>
                  <td>
                    {d.estagio && <span className="badge badge-hosp">Estágio</span>}
                    {d.tcc && <span className="badge badge-n">TCC</span>}
                    {d.aumento && <span className="badge badge-cont">+ CH</span>}
                    {d.ead && <span className="badge badge-m">EAD</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ fontSize: 11, color: "#6B7280", marginTop: 8 }}>
          💡 Clique no nome do professor para editar
        </div>
      </div>

      {/* Grade visual semanal */}
      <div className="card">
        <div className="card-title">Grade Visual Semanal — {abaPeriodo}º Período ADM</div>
        <div style={{ display: "grid", gridTemplateColumns: "80px repeat(5, 1fr)", gap: 4, fontSize: 12 }}>
          <div style={{ fontWeight: "bold", color: "#6B7280", padding: 4 }}>Horário</div>
          {DIAS.map(d => (
            <div key={d} style={{ fontWeight: "bold", color: "#1F4E79", padding: 4, textAlign: "center", background: "#EFF6FF", borderRadius: 4 }}>{d}</div>
          ))}
          {/* Linha D */}
          <div style={{ padding: 4, color: "#6B7280", fontSize: 11 }}>18:25</div>
          {[0,1,2,3,4].map(dia => {
            const disc = gradePeriodo.find(d => d.dia === dia);
            return (
              <div key={dia} style={{ padding: 4, background: disc && !disc.ead ? "#FEF9C3" : "#F4F6F9", borderRadius: 4, textAlign: "center", fontSize: 10, color: "#856404" }}>
                {disc && !disc.ead ? "D" : ""}
              </div>
            );
          })}
          {/* Linhas N1, N2, N3 */}
          {["19:15", "20:05", "21:10"].map(hora => (
            <React.Fragment key={hora}>
              <div style={{ padding: 4, color: "#6B7280", fontSize: 11 }}>{hora}</div>
              {[0,1,2,3,4].map(dia => {
                const disc = gradePeriodo.find(d => d.dia === dia);
                const cor = disc?.estagio ? "#E6F1FB" : disc?.ead ? "#F3F4F6" : disc ? "#EDE9FE" : "#F4F6F9";
                const textCor = disc?.estagio ? "#185FA5" : disc?.ead ? "#9CA3AF" : disc ? "#6D28D9" : "#9CA3AF";
                return (
                  <div key={dia} style={{ padding: 4, background: cor, borderRadius: 4, textAlign: "center", fontSize: 10, color: textCor }}>
                    {disc ? disc.disciplina : ""}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
