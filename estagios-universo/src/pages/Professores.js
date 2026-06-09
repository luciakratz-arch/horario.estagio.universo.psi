// src/pages/Professores.js
import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import { addProfessor, updateProfessor, deleteProfessor } from "../utils/firebaseService";

function ModalProf({ prof, onClose, onSave }) {
  const [form, setForm] = useState(prof || { id: "", nome: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSave = async () => {
    if (!form.nome || !form.id) return alert("Preencha nome e matrícula.");
    await onSave(form);
    onClose();
  };
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">{prof ? "Editar professor(a)" : "Novo(a) professor(a)"}</div>
        <div className="field"><label>Nome completo</label>
          <input value={form.nome} onChange={e => set("nome", e.target.value.toUpperCase())} placeholder="NOME COMPLETO" />
        </div>
        <div className="field"><label>Matrícula</label>
          <input value={form.id} onChange={e => set("id", e.target.value)} placeholder="Ex: 500741/04" disabled={!!prof} />
        </div>
        <div className="modal-footer">
          <button className="btn" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleSave}>Salvar</button>
        </div>
      </div>
    </div>
  );
}

export default function Professores() {
  const { turmas, professores, carregar } = useContext(AppContext);
  const [modal, setModal] = useState(null);

  const profCarga = professores.map(p => {
    const minhas = turmas.filter(t => t.professorId === p.id && t.status !== "EXCLUÍDO");
    const ch = minhas.length * 3;
    const periodos = [...new Set(minhas.map(t => t.periodo + "º"))].join(", ");
    const hospitalar = minhas.filter(t => t.hospitar).length;
    return { ...p, qtdTurmas: minhas.length, ch, periodos, hospitalar, turmasLista: minhas };
  }).sort((a, b) => b.qtdTurmas - a.qtdTurmas);

  const semProf = turmas.filter(t => !t.professorId && t.status !== "EXCLUÍDO").length;

  const handleSave = async (form) => {
    if (modal?.prof) await updateProfessor(form.id, { nome: form.nome });
    else await addProfessor(form);
    await carregar();
  };

  const handleDelete = async (p) => {
    const temTurmas = turmas.some(t => t.professorId === p.id);
    if (temTurmas) return alert(`${p.nome} possui turmas alocadas. Realoque as turmas antes de excluir.`);
    if (!window.confirm(`Excluir ${p.nome}?`)) return;
    await deleteProfessor(p.id);
    await carregar();
  };

  const chClass = (ch) => ch > 24 ? "ch-fill-alto" : ch > 15 ? "ch-fill-mid" : "ch-fill-ok";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ fontSize: 16, fontWeight: "bold", color: "#1F4E79" }}>Professores Supervisores</h2>
        <button className="btn btn-primary" onClick={() => setModal({ nova: true })}>+ Novo professor</button>
      </div>

      {semProf > 0 && (
        <div className="alert alert-warn">⚠ {semProf} turma(s) aguardando professor — precisam de contratação.</div>
      )}

      <div className="card" style={{ padding: 0 }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Professor(a)</th>
                <th>Matrícula</th>
                <th>Turmas</th>
                <th>CH Semanal</th>
                <th>Períodos</th>
                <th>Hospitalar</th>
                <th>Carga horária</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {profCarga.map(p => (
                <tr key={p.id}>
                  <td><strong>{p.nome}</strong></td>
                  <td style={{ fontSize: 12, color: "#6B7280" }}>{p.id}</td>
                  <td style={{ textAlign: "center" }}>{p.qtdTurmas}</td>
                  <td style={{ textAlign: "center" }}><strong>{p.ch}h</strong></td>
                  <td style={{ fontSize: 12 }}>{p.periodos || "—"}</td>
                  <td style={{ textAlign: "center" }}>
                    {p.hospitalar > 0 ? <span className="badge badge-hosp">{p.hospitalar} turma(s)</span> : "—"}
                  </td>
                  <td style={{ minWidth: 120 }}>
                    <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 3 }}>{Math.min(p.qtdTurmas, 10)}/10</div>
                    <div className="ch-bar">
                      <div className={chClass(p.ch)} style={{ width: `${Math.min(p.qtdTurmas / 10 * 100, 100)}%`, height: "100%", borderRadius: 3 }} />
                    </div>
                  </td>
                  <td>
                    <div className="btn-group">
                      <button className="btn btn-sm" onClick={() => setModal({ prof: p })}>✎ Editar</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p)}>✕</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Turmas sem professor */}
      {semProf > 0 && (
        <div className="card" style={{ marginTop: 16 }}>
          <div className="card-title" style={{ color: "#C55A11" }}>⚠ Turmas sem professor</div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Turma</th><th>Disciplina</th><th>Período</th><th>Horário</th><th>Status</th></tr></thead>
              <tbody>
                {turmas.filter(t => !t.professorId && t.status !== "EXCLUÍDO").map(t => (
                  <tr key={t.id}>
                    <td><strong>{t.id}</strong></td>
                    <td style={{ fontSize: 11 }}>{t.disciplinaCod}</td>
                    <td>{t.periodo}º</td>
                    <td style={{ fontSize: 11 }}>{t.horario}</td>
                    <td><span className="badge badge-nd">{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modal && (
        <ModalProf prof={modal.prof || null} onClose={() => setModal(null)} onSave={handleSave} />
      )}
    </div>
  );
}
