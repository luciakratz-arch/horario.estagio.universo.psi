// src/pages/Relatorios.js
import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import { exportarAlocacao, exportarTodosHorarios, exportarHorarioFuncional } from "../utils/exportarExcel";

export default function Relatorios() {
  const { turmas, professores, disciplinas } = useContext(AppContext);
  const [semestre, setSemestre] = useState("2026-1");
  const [profSel, setProfSel] = useState("");
  const [baixando, setBaixando] = useState("");

  const baixar = async (tipo) => {
    setBaixando(tipo);
    try {
      if (tipo === "alocacao") exportarAlocacao(turmas, professores, disciplinas, semestre);
      if (tipo === "todos_horarios") exportarTodosHorarios(professores, turmas, disciplinas, semestre);
      if (tipo === "horario_prof") {
        const prof = professores.find(p => p.id === profSel);
        if (!prof) return alert("Selecione um professor.");
        exportarHorarioFuncional(prof, turmas, disciplinas, semestre);
      }
    } finally {
      setTimeout(() => setBaixando(""), 1500);
    }
  };

  const ativas = turmas.filter(t => t.status !== "EXCLUÍDO");
  const favoraveis = ativas.filter(t => t.status === "FAVORÁVEL").length;
  const semProf = ativas.filter(t => !t.professorId).length;
  const hospitalar = ativas.filter(t => t.hospitar).length;

  return (
    <div>
      <h2 style={{ fontSize: 16, fontWeight: "bold", color: "#1F4E79", marginBottom: 14 }}>Relatórios e Exportação</h2>

      <div className="card">
        <div className="card-title">Configuração</div>
        <div className="field" style={{ maxWidth: 260 }}>
          <label>Semestre de referência</label>
          <input value={semestre} onChange={e => setSemestre(e.target.value)} placeholder="Ex: 2026-1" />
        </div>
      </div>

      {/* Resumo */}
      <div className="card">
        <div className="card-title">Resumo do semestre {semestre}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", gap: 12 }}>
          {[
            { label: "Total de turmas", valor: ativas.length, cor: "#1F4E79" },
            { label: "Favoráveis", valor: favoraveis, cor: "#1A7A45" },
            { label: "Sem professor", valor: semProf, cor: semProf > 0 ? "#C00000" : "#1A7A45" },
            { label: "Hospitalar (9º)", valor: hospitalar, cor: "#92400E" },
            { label: "Professores ativos", valor: professores.filter(p => ativas.some(t => t.professorId === p.id)).length, cor: "#1F4E79" },
          ].map(m => (
            <div key={m.label} style={{ background: "#F4F6F9", borderRadius: 6, padding: "10px 14px" }}>
              <div style={{ fontSize: 11, color: "#6B7280" }}>{m.label}</div>
              <div style={{ fontSize: 22, fontWeight: "bold", color: m.cor }}>{m.valor}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Relatórios */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

        <div className="card">
          <div className="card-title">📋 Planilha de Alocação Oficial</div>
          <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 14 }}>
            Exporta no formato institucional com todas as turmas, disciplinas, professores, horários e status — igual ao modelo original.
          </p>
          <button className="btn btn-primary" onClick={() => baixar("alocacao")} disabled={baixando === "alocacao"}>
            {baixando === "alocacao" ? "⏳ Gerando..." : "⬇ Baixar XLSX"}
          </button>
        </div>

        <div className="card">
          <div className="card-title">👥 Horários Funcionais — Todos os Professores</div>
          <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 14 }}>
            Uma aba por professor com horário funcional completo — igual ao modelo do José Antônio Soares Cavalcante.
          </p>
          <button className="btn btn-primary" onClick={() => baixar("todos_horarios")} disabled={baixando === "todos_horarios"}>
            {baixando === "todos_horarios" ? "⏳ Gerando..." : "⬇ Baixar XLSX"}
          </button>
        </div>

        <div className="card">
          <div className="card-title">👤 Horário Funcional — Professor Individual</div>
          <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 10 }}>
            Gera o horário de um professor específico.
          </p>
          <div className="field">
            <label>Selecione o(a) professor(a)</label>
            <select value={profSel} onChange={e => setProfSel(e.target.value)}>
              <option value="">Selecione...</option>
              {professores.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select>
          </div>
          <button className="btn btn-primary" onClick={() => baixar("horario_prof")} disabled={baixando === "horario_prof" || !profSel}>
            {baixando === "horario_prof" ? "⏳ Gerando..." : "⬇ Baixar XLSX"}
          </button>
        </div>

        <div className="card">
          <div className="card-title">⚠ Pendências e Alertas</div>
          {semProf > 0 && (
            <div className="alert alert-warn" style={{ marginBottom: 8 }}>
              {semProf} turma(s) sem professor definido
            </div>
          )}
          {turmas.filter(t => t.obs && t.obs.toUpperCase().includes("ERRADO")).map(t => (
            <div key={t.id} className="alert alert-warn" style={{ marginBottom: 8 }}>
              Turma {t.id}: {t.obs}
            </div>
          ))}
          {turmas.filter(t => t.status === "NÃO DEFERIDO").map(t => (
            <div key={t.id} className="alert alert-warn" style={{ marginBottom: 8 }}>
              Turma {t.id}: aguardando deferimento — {t.obs || "LANÇAR"}
            </div>
          ))}
          {semProf === 0 && turmas.filter(t => t.status === "NÃO DEFERIDO").length === 0 && (
            <div className="alert alert-ok">✓ Nenhuma pendência encontrada!</div>
          )}
        </div>

      </div>
    </div>
  );
}
