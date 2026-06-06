// src/utils/exportarExcel.js
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Exporta a planilha de alocação no formato oficial
export const exportarAlocacao = (turmas, professores, disciplinas, semestre = "2026-1") => {
  const profMap = Object.fromEntries(professores.map(p => [p.id, p.nome]));
  const discMap = Object.fromEntries(disciplinas.map(d => [d.cod, d]));

  const cabecalho = [
    "Disciplina", "C.H. Disciplina", "C.H. Paga", "Curso / Período",
    "T. Autorizada", "Nº Matriculados", "Nº Pré-Matriculados",
    "Alocação Turma", "Alocação Capacidade", "Solicitação",
    "Alocação Professor", "Matrícula", "C.H. Saldo Atual",
    "Justificativa", "Dia e Horário", "Observação", "Status"
  ];

  const linhas = turmas
    .filter(t => t.status !== "EXCLUÍDO")
    .sort((a, b) => a.periodo.localeCompare(b.periodo) || a.turma.localeCompare(b.turma))
    .map((t, idx, arr) => {
      const disc = discMap[t.disciplinaCod] || {};
      const isFirstOfDisc = idx === 0 || arr[idx - 1].disciplinaCod !== t.disciplinaCod;
      const profNome = t.professorId ? profMap[t.professorId] : "CONTRATAÇÃO";
      return [
        isFirstOfDisc ? `${t.disciplinaCod} ${disc.nome} ${t.periodo}º` : "",
        isFirstOfDisc ? disc.ch : "",
        isFirstOfDisc ? disc.chPaga : "",
        isFirstOfDisc ? `PSICOLOGIA/${t.periodo}º` : "",
        t.turma,
        "",
        "",
        "SALA",
        t.capacidade,
        "ALOCAÇÃO DE PROFESSOR",
        profNome,
        t.professorId || "",
        disc.chPaga || "",
        "Professor(a) supervisor(a)",
        t.horario,
        t.obs || "",
        t.status
      ];
    });

  const ws = XLSX.utils.aoa_to_sheet([cabecalho, ...linhas]);

  // Larguras de coluna
  ws["!cols"] = [52, 8, 7, 14, 10, 11, 11, 10, 11, 20, 30, 13, 12, 22, 48, 28, 14]
    .map(w => ({ wch: w }));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "PSICOLOGIA TURMAS NO SISTEMA");

  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([buf], { type: "application/octet-stream" }),
    `ALOCACAO_PROFESSORES_PSICOLOGIA_${semestre}.xlsx`);
};

// Exporta horário funcional individual de um professor
export const exportarHorarioFuncional = (professor, turmas, disciplinas, semestre = "2026-1") => {
  const discMap = Object.fromEntries(disciplinas.map(d => [d.cod, d]));
  const turmasProf = turmas.filter(t => t.professorId === professor.id && t.status !== "EXCLUÍDO");

  const dados = [
    [`HORÁRIO FUNCIONAL – ${semestre}`],
    [`PROFESSOR(A): ${professor.nome}`, "", "", "", "", `MATRÍCULA: ${professor.id}`],
    [`CARGA HORÁRIA SEMANAL: ${turmasProf.length * 3}h`],
    [],
    ["DIA", "INÍCIO", "FIM", "DISCIPLINA", "PERÍODO", "TURMA", "Nº HORAS"],
    ...turmasProf.map(t => {
      const disc = discMap[t.disciplinaCod] || {};
      // Parse simples do horário para extrair primeiro bloco
      const h = t.horario;
      const match = h.match(/(\w+\-?\w*)\s+das?\s+([\d:h]+)\s+as\s+([\d:h]+)/i);
      return [
        match ? match[1].toUpperCase() : "—",
        match ? match[2] : "—",
        match ? match[3] : "—",
        `${t.disciplinaCod} - ${disc.nome || ""}`,
        `${t.periodo}º`,
        t.turma,
        3
      ];
    }),
    [],
    ["CARGA HORÁRIA TOTAL:", "", "", "", "", "", turmasProf.length * 3]
  ];

  const ws = XLSX.utils.aoa_to_sheet(dados);
  ws["!cols"] = [14, 10, 10, 55, 10, 10, 10].map(w => ({ wch: w }));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Horário Funcional");

  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([buf], { type: "application/octet-stream" }),
    `HORARIO_${professor.nome.replace(/ /g, "_")}_${semestre}.xlsx`);
};

// Exporta todos os horários funcionais em um único arquivo (uma aba por professor)
export const exportarTodosHorarios = (professores, turmas, disciplinas, semestre = "2026-1") => {
  const discMap = Object.fromEntries(disciplinas.map(d => [d.cod, d]));
  const wb = XLSX.utils.book_new();

  for (const prof of professores) {
    const turmasProf = turmas.filter(t => t.professorId === prof.id && t.status !== "EXCLUÍDO");
    if (!turmasProf.length) continue;

    const dados = [
      [`HORÁRIO FUNCIONAL – ${semestre}`],
      [`PROFESSOR(A): ${prof.nome}`, "", "", "", "", `MATRÍCULA: ${prof.id}`],
      [`CARGA HORÁRIA SEMANAL: ${turmasProf.length * 3}h`],
      [],
      ["DIA", "INÍCIO", "FIM", "DISCIPLINA", "PERÍODO", "TURMA", "Nº HORAS"],
      ...turmasProf.map(t => {
        const disc = discMap[t.disciplinaCod] || {};
        const h = t.horario;
        const match = h.match(/(\w+\-?\w*)\s+das?\s+([\d:h]+)\s+as\s+([\d:h]+)/i);
        return [
          match ? match[1].toUpperCase() : "—",
          match ? match[2] : "—",
          match ? match[3] : "—",
          `${t.disciplinaCod} - ${disc.nome || ""}`,
          `${t.periodo}º`,
          t.turma,
          3
        ];
      }),
      [],
      ["TOTAL CH:", "", "", "", "", "", turmasProf.length * 3]
    ];

    const ws = XLSX.utils.aoa_to_sheet(dados);
    ws["!cols"] = [14, 10, 10, 55, 10, 10, 10].map(w => ({ wch: w }));
    XLSX.utils.book_append_sheet(wb, ws, prof.nome.slice(0, 28));
  }

  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([buf], { type: "application/octet-stream" }),
    `HORARIOS_FUNCIONAIS_${semestre}.xlsx`);
};
