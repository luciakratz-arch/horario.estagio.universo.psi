// src/pages/Turmas.js
import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import { updateTurma, addTurma, deleteTurma } from "../utils/firebaseService";

const STATUS_OPTS = ["FAVORÁVEL", "NÃO DEFERIDO", "EXCLUÍDO"];

function ModalTurma({ turma, professores, disciplinas, onClose, onSave }) {
  const [form, setForm] = useState(turma || {
    disciplinaCod: "", periodo: "5", turma: "", capacidade: 10,
    hospitar: false, professorId: "", horario: "", obs: "", status: "FAVORÁVEL"
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.disciplinaCod || !form.turma) return alert("Preencha disciplina e turma.");
    await onSave(form);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">{turma ? "Editar turma" : "Nova turma"}</div>
        <div className="field">
          <label>Disciplina</label>
          <select value={form.disciplinaCod} onChange={e => set("disciplinaCod", e.target.value)}>
            <option value="">Selecione...</option>
            {disciplinas.map(d => <option key={d.cod} value={d.cod}>{d.cod} – {d.nome.slice(0, 60)}</option>)}
          </select>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <div className="field"><label>Período</label>
            <select value={form.periodo} onChange={e => set("periodo", e.target.value)}>
              {["5","6","7","8","9","10"].map(p => <option key={p} value={p}>{p}º</option>)}
            </select>
          </div>
          <div className="field"><label>Turma</label>
            <input value={form.turma} onChange={e => set("turma", e.target.value)} placeholder="M1, N2..." />
          </div>
          <div className="field"><label>Capacidade</label>
            <input type="number" value={form.capacidade} onChange={e => set("capacidade", +e.target.value)} min={1} max={10} />
          </div>
        </div>
        <div className="field"><label>Professor(a)</label>
          <select value={form.professorId || ""} onChange={e => set("professorId", e.target.value || null)}>
            <option value="">— Contratação pendente —</option>
            {professores.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
          </select>
        </div>
        <div className="field"><label>Dia e Horário</label>
          <textarea value={form.horario} onChange={e => set("horario", e.target.value)} placeholder="Ex: Terça-feira 19:15 as 22:00" />
        </div>
        <div className="field"><label>Observação</label>
          <input value={form.obs} onChange={e => set("obs", e.target.value)} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div className="field"><label>Status</label>
            <select value={form.status} onChange={e => set("status", e.target.value)}>
              {STATUS_OPTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="field"><label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" checked={form.hospitar} onChange={e => set("hospitar", e.target.checked)} style={{ width: "auto" }} />
            Campo hospitalar (máx 8)
          </label></div>
        </div>
        <div className="modal-footer">
          <button className="btn" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleSave}>Salvar</button>
        </div>
      </div>
    </div>
  );
}

export default function Turmas() {
  const { turmas, setTurmas, professores, disciplinas, carregar } = useContext(AppContext);
  const [periodoFiltro, setPeriodoFiltro] = useState("todos");
  const [statusFiltro, setStatusFiltro] = useState("todos");
  const [profFiltro, setProfFiltro] = useState("todos");
  const [busca, setBusca] = useState("");
  const [modal, setModal] = useState(null); // null | { turma } | { nova: true }

  const profMap = Object.fromEntries(professores.map(p => [p.id, p.nome]));
  const discMap = Object.fromEntries(disciplinas.map(d => [d.cod, d]));

  const filtradas = turmas.filter(t => {
    if (periodoFiltro !== "todos" && t.periodo !== periodoFiltro) return false;
    if (statusFiltro !== "todos" && t.status !== statusFiltro) return false;
    if (profFiltro !== "todos" && t.professorId !== profFiltro) return false;
    if (busca && !t.id.toLowerCase().includes(busca.toLowerCase()) &&
        !(profMap[t.professorId] || "").toLowerCase().includes(busca.toLowerCase()) &&
        !(discMap[t.disciplinaCod]?.nome || "").toLowerCase().includes(busca.toLowerCase())) return false;
    return true;
  }).sort((a, b) => a.periodo.localeCompare(b.periodo) || a.turma.localeCompare(b.turma));

  const handleSave = async (form) => {
    if (modal?.turma) {
      await updateTurma(modal.turma.id, form);
    } else {
      await addTurma(form);
    }
    await carregar();
  };

  const handleDelete = async (t) => {
    if (!window.confirm(`Excluir turma ${t.id}?`)) return;
    await deleteTurma(t.id);
    await carregar();
  };

  const badgeStatus = (s) => s === "FAVORÁVEL" ? "badge badge-fav" : s === "EXCLUÍDO" ? "badge badge-exc" : "badge badge-nd";
  const badgeTurno = (turma) => turma.startsWith("M") ? "badge badge-m" : "badge badge-n";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ fontSize: 16, fontWeight: "bold", color: "#1F4E79" }}>Turmas de Estágio</h2>
        <button className="btn btn-primary" onClick={() => setModal({ nova: true })}>+ Nova turma</button>
      </div>

      {/* Filtros */}
      <div className="filtros">
        <input placeholder="🔍 Buscar turma, professor..." value={busca} onChange={e => setBusca(e.target.value)} style={{ minWidth: 220 }} />
        <select value={periodoFiltro} onChange={e => setPeriodoFiltro(e.target.value)}>
          <option value="todos">Todos os períodos</option>
          {["5","6","7","8","9","10"].map(p => <option key={p} value={p}>{p}º período</option>)}
        </select>
        <select value={statusFiltro} onChange={e => setStatusFiltro(e.target.value)}>
          <option value="todos">Todos os status</option>
          {STATUS_OPTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={profFiltro} onChange={e => setProfFiltro(e.target.value)}>
          <option value="todos">Todos os professores</option>
          {professores.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
          <option value="">Sem professor</option>
        </select>
        <span style={{ fontSize: 12, color: "#6B7280", marginLeft: "auto" }}>{filtradas.length} turma(s)</span>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Turma</th>
                <th>Disciplina</th>
                <th>Período</th>
                <th>Turno</th>
                <th>Capacidade</th>
                <th>Professor(a)</th>
                <th>Horário</th>
                <th>Observação</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map(t => (
                <tr key={t.id}>
                  <td><strong>{t.id}</strong></td>
                  <td style={{ fontSize: 11, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {discMap[t.disciplinaCod]?.cod || t.disciplinaCod}
                  </td>
                  <td>{t.periodo}º {t.hospitar && <span className="badge badge-hosp">Hosp.</span>}</td>
                  <td><span className={badgeTurno(t.turma)}>{t.turma.startsWith("M") ? "Matutino" : "Noturno"}</span></td>
                  <td style={{ textAlign: "center" }}>{t.capacidade}</td>
                  <td style={{ fontSize: 12 }}>
                    {t.professorId ? profMap[t.professorId] || t.professorId
                      : <span className="badge badge-cont">Contratação</span>}
                  </td>
                  <td style={{ fontSize: 11, maxWidth: 180, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.horario}</td>
                  <td style={{ fontSize: 11, color: t.obs ? "#856404" : "#9CA3AF" }}>{t.obs || "—"}</td>
                  <td><span className={badgeStatus(t.status)}>{t.status}</span></td>
                  <td>
                    <div className="btn-group">
                      <button className="btn btn-sm" onClick={() => setModal({ turma: t })}>✎ Editar</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(t)}>✕</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtradas.length === 0 && (
                <tr><td colSpan={10} style={{ textAlign: "center", color: "#9CA3AF", padding: 32 }}>Nenhuma turma encontrada.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <ModalTurma
          turma={modal.turma || null}
          professores={professores}
          disciplinas={disciplinas}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
