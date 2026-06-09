// src/data/dadosIniciais.js
// Dados reais extraídos das planilhas 2026-1

export const professores = [
  { id: "500741/04", nome: "FABIANA ALVES CARDOSO" },
  { id: "500694/04", nome: "JOSE DA ROCHA" },
  { id: "500685/04", nome: "LORENA FLEURY DE MOURA" },
  { id: "500747/04", nome: "LUANA PEREIRA BRANT CAMPOS" },
  { id: "500729/04", nome: "TÂNIA CORREIA DE PAULA" },
  { id: "500242/04", nome: "DELAINE DE SOUSA SILVA ALVARES" },
  { id: "500315/04", nome: "JANETE CAPEL HERNANDES" },
  { id: "500602/04", nome: "ANALUCY AURY VIEIRA DE OLIVEIRA" },
  { id: "500757/04", nome: "HULLY DO NASCIMENTO SEGATTI" },
  { id: "500756/04", nome: "JULIA ISABEL SILVA NONATO" },
  { id: "500742/04", nome: "LORRAINE FIAMA DINIZ DE CARVALHO" },
];

export const disciplinas = [
  { cod: "N444", nome: "ESTÁGIO SUPERVISIONADO EM PSICOLOGIA - OFICINAS E DINÂMICA DE GRUPOS", periodo: "5", ch: 80, chPaga: 3 },
  { cod: "N170", nome: "ESTÁGIO SUPERVISIONADO EM PSICOLOGIA - PSICOLOGIA SOCIAL COMUNITÁRIA E DO TRABALHO", periodo: "6", ch: 80, chPaga: 3 },
  { cod: "N598", nome: "ESTÁGIO SUPERVISIONADO EM PSICOLOGIA - INICIAÇÃO CLÍNICA", periodo: "7", ch: 80, chPaga: 3 },
  { cod: "N456", nome: "ESTÁGIO SUPERVISIONADO EM PSICOLOGIA - AVALIAÇÃO PSICOLÓGICA", periodo: "8", ch: 80, chPaga: 3 },
  { cod: "N817", nome: "ESTÁGIO SUPERVISIONADO EM PSICOLOGIA I - INTERVENÇÕES PSICOLÓGICAS EM CLÍNICA", periodo: "9", ch: 80, chPaga: 5 },
  { cod: "N820", nome: "ESTÁGIO SUPERVISIONADO EM PSICOLOGIA II - INTERVENÇÕES PSICOLÓGICAS EM CLÍNICA", periodo: "10", ch: 80, chPaga: 5 },
];

export const turmas = [
  // ─── 5º PERÍODO – N444 ───
  { id: "N444-M1", disciplinaCod: "N444", periodo: "5", turma: "M1", capacidade: 10, hospitar: false, professorId: "500741/04", horario: "Segunda-feira das 12:05 as 13:10 e Terça 09:20 as 11:15", obs: "Mesma professora da Teórica e da Supervisão", status: "FAVORÁVEL" },
  { id: "N444-M2", disciplinaCod: "N444", periodo: "5", turma: "M2", capacidade: 10, hospitar: false, professorId: "500694/04", horario: "Terça-feira das 09:20 as 12:05", obs: "", status: "FAVORÁVEL" },
  { id: "N444-M3", disciplinaCod: "N444", periodo: "5", turma: "M3", capacidade: 10, hospitar: false, professorId: "500685/04", horario: "Terça-feira das 09:20 as 12:05", obs: "", status: "FAVORÁVEL" },
  { id: "N444-M4", disciplinaCod: "N444", periodo: "5", turma: "M4", capacidade: 10, hospitar: false, professorId: "500747/04", horario: "Terça-feira das 11:15 as 13:10 e sábado 8:30 as 09:20", obs: "", status: "FAVORÁVEL" },
  { id: "N444-M5", disciplinaCod: "N444", periodo: "5", turma: "M5", capacidade: 10, hospitar: false, professorId: "500747/04", horario: "Terça-feira 09:20 as 11:15 e sábado 09:20 as 10:10", obs: "", status: "FAVORÁVEL" },
  { id: "N444-M6", disciplinaCod: "N444", periodo: "5", turma: "M6", capacidade: 10, hospitar: false, professorId: "500747/04", horario: "Quarta-feira 12:05 as 15:05", obs: "", status: "FAVORÁVEL" },
  { id: "N444-N1", disciplinaCod: "N444", periodo: "5", turma: "N1", capacidade: 10, hospitar: false, professorId: "500729/04", horario: "Sexta-Feira das 15:55 as 18:25", obs: "", status: "FAVORÁVEL" },
  { id: "N444-N2", disciplinaCod: "N444", periodo: "5", turma: "N2", capacidade: 10, hospitar: false, professorId: "500747/04", horario: "Quinta-feira das 20h05 as 22h00 e sábado 13h10 as 14h00", obs: "CONTINUA LANÇADO ERRADO", status: "FAVORÁVEL" },
  { id: "N444-N3", disciplinaCod: "N444", periodo: "5", turma: "N3", capacidade: 10, hospitar: false, professorId: "500747/04", horario: "Quinta-feira das 18h25 as 20h05 e sábado das 11h15 as 12h05", obs: "", status: "FAVORÁVEL" },
  { id: "N444-N4", disciplinaCod: "N444", periodo: "5", turma: "N4", capacidade: 10, hospitar: false, professorId: "500747/04", horario: "Quinta-feira 16:45 as 18:25 e sábado das 12h05 as 13:10", obs: "", status: "FAVORÁVEL" },
  { id: "N444-N5", disciplinaCod: "N444", periodo: "5", turma: "N5", capacidade: 10, hospitar: false, professorId: "500747/04", horario: "Quarta-feira 15:55 as 18:25", obs: "", status: "FAVORÁVEL" },
  { id: "N444-N6", disciplinaCod: "N444", periodo: "5", turma: "N6", capacidade: 10, hospitar: false, professorId: "500729/04", horario: "Quarta-feira 15:55 as 18:25", obs: "", status: "FAVORÁVEL" },
  // ─── 6º PERÍODO – N170 ───
  { id: "N170-N1", disciplinaCod: "N170", periodo: "6", turma: "N1", capacidade: 10, hospitar: false, professorId: "500242/04", horario: "Terça-feira 19:15 as 21:10 e Quarta-Feira 17:35 as 18:25", obs: "", status: "FAVORÁVEL" },
  { id: "N170-N2", disciplinaCod: "N170", periodo: "6", turma: "N2", capacidade: 10, hospitar: false, professorId: null, horario: "Terça-feira 21:10 as 22:00 e Sábado 11h15 as 15:05", obs: "LANÇAR", status: "NÃO DEFERIDO" },
  // ─── 7º PERÍODO – N598 ───
  { id: "N598-M1", disciplinaCod: "N598", periodo: "7", turma: "M1", capacidade: 10, hospitar: false, professorId: "500729/04", horario: "Terça 10:10 as 12:05 e Sexta 15:05 as 15:55", obs: "", status: "FAVORÁVEL" },
  { id: "N598-M2", disciplinaCod: "N598", periodo: "7", turma: "M2", capacidade: 10, hospitar: false, professorId: "500756/04", horario: "Terça-Feira 10:10 as 13:10", obs: "", status: "FAVORÁVEL" },
  { id: "N598-M3", disciplinaCod: "N598", periodo: "7", turma: "M3", capacidade: 10, hospitar: false, professorId: "500757/04", horario: "Terça 10:10 as 12:05 e Quinta 12:05 as 13:10", obs: "", status: "FAVORÁVEL" },
  { id: "N598-M4", disciplinaCod: "N598", periodo: "7", turma: "M4", capacidade: 10, hospitar: false, professorId: null, horario: "Terça 10:10 as 12:05 e Sábado 10:10 as 11h15", obs: "LANÇAR", status: "NÃO DEFERIDO" },
  { id: "N598-M5", disciplinaCod: "N598", periodo: "7", turma: "M5", capacidade: 10, hospitar: false, professorId: null, horario: "Terça-Feira 09:20 as 13:10", obs: "LANÇAR", status: "NÃO DEFERIDO" },
  { id: "N598-N1", disciplinaCod: "N598", periodo: "7", turma: "N1", capacidade: 10, hospitar: false, professorId: "500685/04", horario: "Quinta-feira 19:15 as 22:00 e sábado das 11:15 as 12:05", obs: "", status: "FAVORÁVEL" },
  { id: "N598-N2", disciplinaCod: "N598", periodo: "7", turma: "N2", capacidade: 10, hospitar: false, professorId: "500694/04", horario: "Quinta-Feira 15:55 as 18:25", obs: "", status: "FAVORÁVEL" },
  { id: "N598-N3", disciplinaCod: "N598", periodo: "7", turma: "N3", capacidade: 10, hospitar: false, professorId: "500729/04", horario: "Quinta-Feira 15:55 as 18:25", obs: "", status: "FAVORÁVEL" },
  { id: "N598-N4", disciplinaCod: "N598", periodo: "7", turma: "N4", capacidade: 10, hospitar: false, professorId: "500315/04", horario: "Quinta-Feira 19:15 as 22:00", obs: "", status: "FAVORÁVEL" },
  { id: "N598-N5", disciplinaCod: "N598", periodo: "7", turma: "N5", capacidade: 10, hospitar: false, professorId: null, horario: "Quinta-Feira 19:15 as 22:00", obs: "LANÇAR", status: "NÃO DEFERIDO" },
  // ─── 8º PERÍODO – N456 ───
  { id: "N456-N1", disciplinaCod: "N456", periodo: "8", turma: "N1", capacidade: 10, hospitar: false, professorId: "500757/04", horario: "Terça-feira 19:15 as 22:00", obs: "Mesmo da Teórica", status: "FAVORÁVEL" },
  { id: "N456-N2", disciplinaCod: "N456", periodo: "8", turma: "N2", capacidade: 10, hospitar: false, professorId: null, horario: "Terça-Feira 19:15 as 21:10 e Sábado das 9:20 as 10h10", obs: "LANÇAR", status: "NÃO DEFERIDO" },
  // ─── 9º PERÍODO – N817 ───
  { id: "N817-M1", disciplinaCod: "N817", periodo: "9", turma: "M1", capacidade: 8, hospitar: true, professorId: "500315/04", horario: "Quarta-Feira 08:30 as 13:10", obs: "", status: "FAVORÁVEL" },
  { id: "N817-M2", disciplinaCod: "N817", periodo: "9", turma: "M2", capacidade: 8, hospitar: true, professorId: "500602/04", horario: "Quinta-Feira 09:20 as 14:00", obs: "", status: "FAVORÁVEL" },
  { id: "N817-M3", disciplinaCod: "N817", periodo: "9", turma: "M3", capacidade: 8, hospitar: true, professorId: "500741/04", horario: "Quarta-Feira 09:20 as 14:00", obs: "", status: "FAVORÁVEL" },
  { id: "N817-M4", disciplinaCod: "N817", periodo: "9", turma: "M4", capacidade: 8, hospitar: true, professorId: "500741/04", horario: "Quinta-Feira 08:30 as 11:15 e 12:05 as 14:00", obs: "", status: "FAVORÁVEL" },
  { id: "N817-M5", disciplinaCod: "N817", periodo: "9", turma: "M5", capacidade: 8, hospitar: true, professorId: "500242/04", horario: "Quinta-Feira 09:20 as 14:00", obs: "", status: "FAVORÁVEL" },
  { id: "N817-M6", disciplinaCod: "N817", periodo: "9", turma: "M6", capacidade: 8, hospitar: true, professorId: "500742/04", horario: "Quarta-Feira 08:30 as 13:10", obs: "", status: "FAVORÁVEL" },
  { id: "N817-N1", disciplinaCod: "N817", periodo: "9", turma: "N1", capacidade: 8, hospitar: true, professorId: "500694/04", horario: "Quinta-Feira 19:15 as 22:00 e Sexta 16:45 as 18:25", obs: "", status: "FAVORÁVEL" },
  { id: "N817-N2", disciplinaCod: "N817", periodo: "9", turma: "N2", capacidade: 8, hospitar: true, professorId: "500694/04", horario: "Terça 19:15 as 22:00 e Segunda 16:45 as 18:25", obs: "", status: "FAVORÁVEL" },
  { id: "N817-N3", disciplinaCod: "N817", periodo: "9", turma: "N3", capacidade: 8, hospitar: true, professorId: "500742/04", horario: "Sexta 14:00 as 18:25", obs: "", status: "FAVORÁVEL" },
  { id: "N817-N4", disciplinaCod: "N817", periodo: "9", turma: "N4", capacidade: 8, hospitar: true, professorId: "500741/04", horario: "Segunda 13:10 as 14:00 e 15:05 as 18:25", obs: "", status: "FAVORÁVEL" },
  { id: "N817-N5", disciplinaCod: "N817", periodo: "9", turma: "N5", capacidade: 8, hospitar: true, professorId: "500741/04", horario: "Terça-Feira 19:15 as 22:00 e Quinta 15:05 as 15:55 e Sexta 14:00 as 15:05", obs: "", status: "FAVORÁVEL" },
  { id: "N817-N6", disciplinaCod: "N817", periodo: "9", turma: "N6", capacidade: 8, hospitar: true, professorId: "500741/04", horario: "Sexta-Feira 14:05 as 16:45 e 17:35 as 18:55", obs: "", status: "FAVORÁVEL" },
  { id: "N817-N7", disciplinaCod: "N817", periodo: "9", turma: "N7", capacidade: 8, hospitar: true, professorId: "500685/04", horario: "Quinta-Feira 15:55 as 18:25 e Sábado 09:25 as 11:15", obs: "", status: "FAVORÁVEL" },
  { id: "N817-N8", disciplinaCod: "N817", periodo: "9", turma: "N8", capacidade: 8, hospitar: true, professorId: "500756/04", horario: "Quinta-feira 17:35 as 22:00", obs: "EXCLUÍDO", status: "EXCLUÍDO" },
];
