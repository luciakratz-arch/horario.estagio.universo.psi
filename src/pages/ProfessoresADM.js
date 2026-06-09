// src/pages/ProfessoresADM.js
import React, { useState } from "react";
import { professoresADM, gradeADM, diasSemana } from "../data/dadosADM";

const DIAS_LABELS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export default function ProfessoresADM() {
  const [profSel, setProfSel] = useState(professoresADM[0].id);
  const prof = professoresADM.find(p => p.id === profSel);
  const aulas = gradeADM.filter(d => d.professorId === profSel);
  const chTotal = aulas.length * 3;

  // Montar grade visual
  const grade = {};
  aulas.forEach(d => {
    if (!grade[d.dia]) grade[d.dia] = [];
    grade[d.dia].push(d);
  });

  return (
    <div>
      <h2 style={{ fontSize: 16, fontWeight: "bold", color: "#1F4E79", marginBottom: 14 }}>
        Professores — Administração
      </h2>

      {/* Seletor */}
      <div className="card">
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <label style={{ fontSize: 13, fontWeight: "bold", color: "#1F4E79" }}>Professor(a):</label>
          <select value={profSel} onChange={e => setProfSel(e.target.value)}
            style={{ padding: "7px 10px", border: "1px solid #DDE1E7", borderRadius: 6, fontSize: 13, minWidth: 280 }}>
            {professoresADM.map(p => (
              <option key={p.id} value={p.id}>{p.nome} — {p.chRef}h ref.</option>
            ))}
          </select>
          <span style={{ fontSize: 12, color: "#6B7280" }}>Matrícula: {prof?.mat}</span>
        </div>
      </div>

      {/* Resumo */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 16 }}>
        <div className="metric-card">
          <div className="metric-label">CH Referência (2026-1)</div>
          <div className="metric-value">{prof?.chRef}h</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">CH Atual na Grade</div>
          <div className="metric-value" style={{ color: chTotal < (prof?.chRef || 0) ? "#C00000" : "#1A7A45" }}>
            {chTotal}h
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Diferença</div>
          <div className="metric-value" style={{ color: chTotal - (prof?.chRef || 0) >= 0 ? "#1A7A45" : "#C00000" }}>
            {chTotal - (prof?.chRef || 0) >= 0 ? "+" : ""}{chTotal - (prof?.chRef || 0)}h
          </div>
        </div>
      </div>

      {chTotal < (prof?.chRef || 0) && (
        <div className="alert alert-warn" style={{ marginBottom: 14 }}>
          ⚠ Professor(a) com carga abaixo da referência — precisa de mais {(prof?.chRef || 0) - chTotal}h para manter o mesmo nível de 2026-1
        </div>
      )}

      {/* Horário funcional */}
      <div className="card">
        <div className="card-title">Horário Funcional — {prof?.nome}</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Dia</th>
                <th>Disciplina</th>
                <th>Período</th>
                <th>Turma</th>
                <th>Horário</th>
                <th>CH</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {aulas.sort((a,b) => a.dia - b.dia).map((d, i) => (
                <tr key={i}>
                  <td><strong>{DIAS_LABELS[d.dia]}</strong></td>
                  <td style={{ fontSize: 12 }}>{d.disciplina} — {d.nome}</td>
                  <td style={{ textAlign: "center" }}>{d.periodo}º</td>
                  <td style={{ textAlign: "center" }}>{d.turma}</td>
                  <td style={{ fontSize: 12 }}>19:15 – 22:00</td>
                  <td style={{ textAlign: "center" }}>3h</td>
                  <td>
                    {d.estagio ? <span className="badge badge-hosp">Estágio</span>
                      : d.tcc ? <span className="badge badge-n">TCC</span>
                      : <span className="badge badge-m">Teórica</span>}
                  </td>
                </tr>
              ))}
              {aulas.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: "center", color: "#9CA3AF", padding: 24 }}>
                  Nenhuma disciplina alocada nesta grade
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade visual */}
      <div className="card">
        <div className="card-title">Grade Visual Semanal</div>
        <div style={{ display: "grid", gridTemplateColumns: "80px repeat(5,1fr)", gap: 4, fontSize: 12 }}>
          <div style={{ fontWeight: "bold", color: "#6B7280", padding: 4 }}>Horário</div>
          {["SEG","TER","QUA","QUI","SEX"].map(d => (
            <div key={d} style={{ fontWeight: "bold", color: "#1F4E79", padding: 4, textAlign: "center", background: "#EFF6FF", borderRadius: 4 }}>{d}</div>
          ))}
          {["18:25 D","19:15","20:05","21:10"].map((h, hi) => (
            <React.Fragment key={h}>
              <div style={{ padding: 4, color: "#6B7280", fontSize: 11 }}>{h}</div>
              {[0,1,2,3,4].map(dia => {
                const disc = aulas.find(d => d.dia === dia);
                const isD = hi === 0;
                const bg = !disc ? "#F4F6F9" : isD ? "#FEF9C3" : disc.estagio ? "#E6F1FB" : "#EDE9FE";
                const tc = !disc ? "#9CA3AF" : isD ? "#856404" : disc.estagio ? "#185FA5" : "#6D28D9";
                return (
                  <div key={dia} style={{ padding: 4, background: bg, borderRadius: 4, textAlign: "center", fontSize: 10, color: tc, minHeight: 28 }}>
                    {disc ? (isD ? "D" : disc.disciplina) : ""}
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
