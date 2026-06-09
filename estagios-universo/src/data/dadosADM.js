// src/data/dadosADM.js
// Dados reais da Administração extraídos da grade 2026-1

export const professoresADM = [
  { id: "500154/04", mat: "500154", nome: "ANA MARIA ANDRADE RODRIGUES", chRef: 9, curso: "ADM" },
  { id: "500191/04", mat: "500191", nome: "ANEILTON BARBOSA DE PAIVA", chRef: 6, curso: "ADM" },
  { id: "500670/04", mat: "500670", nome: "REGINA BEATRIZ STEFAN", chRef: 15, curso: "ADM" },
  { id: "500027/04", mat: "500027", nome: "AROLDO LENZA JUNIOR", chRef: 9, curso: "ADM" },
  { id: "500052/04", mat: "500052", nome: "TATIANA REGAL DUTRA DIESEL", chRef: 3, curso: "ADM" },
  { id: "500217/04", mat: "500217", nome: "WALTER DE PAULA SILVA", chRef: 3, curso: "ADM" },
  { id: "500291/04", mat: "500291", nome: "JORGE ANTONIO BEZERRA OLIVEIRA", chRef: 3, curso: "ADM" },
];

// Grade horária real da ADM 2026-1
// dias: SEG=0, TER=1, QUA=2, QUI=3, SEX=4, SAB=5
// blocos: D=18:25, N1=19:15-20:05, N2=20:05-21:10, N3=21:10-22:00
export const gradeADM = [
  // 1º PERÍODO
  { periodo: "1", disciplina: "N003", nome: "INTRODUÇÃO À CONTABILIDADE", professorId: "500191/04", dia: 0, turma: "N1", bloco: "N" },
  { periodo: "1", disciplina: "N002", nome: "TEORIA GERAL DA ADMINISTRAÇÃO", professorId: "500154/04", dia: 1, turma: "N1", bloco: "N" },
  { periodo: "1", disciplina: "N001", nome: "LINGUAGENS E PESQUISA", professorId: null, dia: 2, turma: "N1", bloco: "N", ead: true },
  { periodo: "1", disciplina: "N009", nome: "COMPORTAMENTO ORGANIZACIONAL", professorId: "500670/04", dia: 3, turma: "N1", bloco: "N" },
  // 2º PERÍODO
  { periodo: "2", disciplina: "N069", nome: "CONTABILIDADE EMPRESARIAL", professorId: "500191/04", dia: 0, turma: "N1", bloco: "N" },
  { periodo: "2", disciplina: "N049", nome: "COMUNICAÇÃO ORGANIZACIONAL", professorId: "500670/04", dia: 1, turma: "N1", bloco: "N" },
  { periodo: "2", disciplina: "N108", nome: "ORGANIZAÇÃO E MÉTODOS EM SISTEMAS", professorId: "500154/04", dia: 2, turma: "N1", bloco: "N" },
  { periodo: "2", disciplina: "N004", nome: "CIÊNCIAS EXATAS E TECNOLOGIAS", professorId: null, dia: 3, turma: "N1", bloco: "N", ead: true },
  // 3º PERÍODO
  { periodo: "3", disciplina: "N048", nome: "GESTÃO DE NEGÓCIOS E LIDERANÇA", professorId: null, dia: 0, turma: "N1", bloco: "N", ead: true },
  { periodo: "3", disciplina: "N500", nome: "MARKETING E INOVAÇÃO", professorId: "500670/04", dia: 1, turma: "N1", bloco: "N" },
  { periodo: "3", disciplina: "N148", nome: "CONTABILIDADE DE CUSTOS", professorId: "500191/04", dia: 2, turma: "N1", bloco: "N" },
  { periodo: "3", disciplina: "N155", nome: "DIREITO EMPRESARIAL", professorId: "500217/04", dia: 3, turma: "N1", bloco: "N", aumento: true },
  // 4º PERÍODO
  { periodo: "4", disciplina: "N492", nome: "GESTÃO DE PESSOAS, EMPRESAS E SERVIÇOS", professorId: "500670/04", dia: 0, turma: "N1", bloco: "N" },
  { periodo: "4", disciplina: "N008", nome: "HOMEM, CULTURA E SOCIEDADE", professorId: null, dia: 1, turma: "N1", bloco: "N", ead: true },
  { periodo: "4", disciplina: "N147", nome: "CONSULTORIA EMPRESARIAL", professorId: "500154/04", dia: 2, turma: "N1", bloco: "N" },
  { periodo: "4", disciplina: "N213", nome: "ADMINISTRAÇÃO MERCADOLÓGICA", professorId: "500670/04", dia: 3, turma: "N1", bloco: "N" },
  // 5º PERÍODO
  { periodo: "5", disciplina: "N301", nome: "ADMINISTRAÇÃO FINANCEIRA E DA PRODUÇÃO", professorId: "500052/04", dia: 0, turma: "N1", bloco: "N" },
  { periodo: "5", disciplina: "N347", nome: "GESTÃO DE VENDAS E NEGOCIAÇÃO", professorId: "500670/04", dia: 2, turma: "N1", bloco: "N" },
  { periodo: "5", disciplina: "N599", nome: "PLANEJAMENTO ESTRATÉGICO", professorId: "500154/04", dia: 3, turma: "N1", bloco: "N" },
  { periodo: "5", disciplina: "N348", nome: "GESTÃO TRIBUTÁRIA", professorId: "500291/04", dia: 4, turma: "N1", bloco: "N" },
  // 6º PERÍODO
  { periodo: "6", disciplina: "N423", nome: "GESTÃO DA QUALIDADE", professorId: "500191/04", dia: 0, turma: "N1", bloco: "N" },
  { periodo: "6", disciplina: "N457", nome: "RELAÇÕES TRABALHISTAS", professorId: null, dia: 1, turma: "N1", bloco: "N", ead: true },
  { periodo: "6", disciplina: "N439", nome: "ORÇAMENTO", professorId: "500052/04", dia: 2, turma: "N1", bloco: "N" },
  { periodo: "6", disciplina: "N393", nome: "ANÁLISES E DEMONSTRAÇÕES CONTÁBEIS", professorId: "500191/04", dia: 3, turma: "N1", bloco: "N" },
  // 7º PERÍODO
  { periodo: "7", disciplina: "N549", nome: "ESTÁGIO SUPERVISIONADO EM ADMINISTRAÇÃO I", professorId: "500154/04", dia: 0, turma: "N1", bloco: "N", estagio: true },
  { periodo: "7", disciplina: "N128", nome: "ADM. DE RECURSOS MATERIAIS E PATRIMONIAIS", professorId: "500027/04", dia: 1, turma: "N1", bloco: "N" },
  { periodo: "7", disciplina: "N557", nome: "GESTÃO E SIMULAÇÃO DE PROJETOS", professorId: "500154/04", dia: 2, turma: "N1", bloco: "N" },
  { periodo: "7", disciplina: "N207", nome: "TEMAS TRANSVERSAIS E ATUALIDADES", professorId: null, dia: 4, turma: "N1", bloco: "N", ead: true },
  // 8º PERÍODO
  { periodo: "8", disciplina: "N623", nome: "ESTÁGIO SUPERVISIONADO EM ADMINISTRAÇÃO II", professorId: "500154/04", dia: 0, turma: "N1", bloco: "N", estagio: true },
  { periodo: "8", disciplina: "N688", nome: "GESTÃO DE PROCESSOS", professorId: "500191/04", dia: 1, turma: "N1", bloco: "N", aumento: true },
  { periodo: "8", disciplina: "N468", nome: "ADMINISTRAÇÃO DE SISTEMAS DE INFORMAÇÕES", professorId: "500027/04", dia: 2, turma: "N1", bloco: "N" },
  { periodo: "8", disciplina: "N626", nome: "TRABALHO DE CONCLUSÃO DE CURSO", professorId: "500154/04", dia: 0, turma: "N1", bloco: "N", tcc: true },
];

export const diasSemana = ["SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];

export const blocoHorario = {
  M: [
    { label: "07:40", hora: "07:40" },
    { label: "08:30", hora: "08:30" },
    { label: "09:20", hora: "09:20" },
    { label: "10:10", hora: "10:10" },
    { label: "11:15", hora: "11:15" },
    { label: "12:05", hora: "12:05" },
  ],
  N: [
    { label: "18:25 (D)", hora: "18:25" },
    { label: "19:15", hora: "19:15" },
    { label: "20:05", hora: "20:05" },
    { label: "21:10", hora: "21:10" },
    { label: "22:00", hora: "22:00" },
  ]
};
