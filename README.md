# 🎓 Sistema de Gestão de Estágios — Psicologia UNIVERSO

Sistema web para gerenciar turmas de estágio, alocação de professores supervisores e exportação de relatórios institucionais do curso de Psicologia da **Universidade Salgado de Oliveira**.

---

## ✅ Funcionalidades

- **Dashboard** — métricas, alertas e visão geral do semestre
- **Turmas** — cadastrar, editar, filtrar e excluir turmas de estágio
- **Professores** — gerenciar supervisores e visualizar carga horária
- **Relatórios** — exportar Excel no formato oficial (Alocação + Horário Funcional)
- **Firebase** — dados salvos na nuvem, acessíveis de qualquer lugar

---

## 🚀 Como rodar localmente

### 1. Clone o repositório
```bash
git clone https://github.com/luciakratz-arch/horario.estagio.universo.psi.git
cd horario.estagio.universo.psi
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o Firebase

Acesse [console.firebase.google.com](https://console.firebase.google.com) e:
1. Crie um projeto (ex: `estagios-universo-psi`)
2. Ative o **Firestore Database** (modo produção ou teste)
3. Adicione um **App Web** e copie as credenciais
4. Edite o arquivo `src/firebase.js` com suas credenciais

### 4. Rode o projeto
```bash
npm start
```

O app abre em `http://localhost:3000`

---

## 🌐 Como publicar no Firebase Hosting

```bash
# Instalar Firebase CLI (só uma vez)
npm install -g firebase-tools

# Login
firebase login

# Inicializar hospedagem (só na primeira vez)
firebase init hosting
# → Escolha o projeto criado
# → Pasta pública: build
# → SPA: sim

# Gerar o build
npm run build

# Publicar
firebase deploy
```

---

## 📁 Estrutura do projeto

```
src/
├── App.js              # Shell principal com navegação
├── App.css             # Estilos globais (cores UNIVERSO)
├── firebase.js         # ⚠️ Configure suas credenciais aqui
├── data/
│   └── dadosIniciais.js    # Dados reais do semestre 2026-1
├── pages/
│   ├── Dashboard.js    # Visão geral e alertas
│   ├── Turmas.js       # CRUD de turmas
│   ├── Professores.js  # CRUD de professores
│   ├── Relatorios.js   # Exportação Excel
│   └── Configuracoes.js
└── utils/
    ├── firebaseService.js  # Todas as operações no Firebase
    └── exportarExcel.js    # Geração dos relatórios .xlsx
```

---

## 📋 Regras institucionais implementadas

| Regra | Implementação |
|-------|--------------|
| Estágios a partir do 5º período | Validado no cadastro |
| 5º–8º período: máx 10 alunos/turma | Capacidade padrão = 10 |
| 9º–10º período: máx 8 alunos/turma (hospitalar) | Flag `hospitar` + capacidade = 8 |
| Professor não pode estar em dois horários simultâneos | Alerta visual |
| Relatório de alocação no formato institucional | Exportação Excel |

---

## 📞 Suporte

Sistema desenvolvido para a coordenação de estágios do curso de Psicologia — UNIVERSO Goiânia.
