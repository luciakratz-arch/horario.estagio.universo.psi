// src/pages/Configuracoes.js
import React, { useContext } from "react";
import { AppContext } from "../App";
import { popularDadosIniciais } from "../utils/firebaseService";
import { professores as profInicial, disciplinas as discInicial, turmas as turmasInicial } from "../data/dadosIniciais";

export default function Configuracoes() {
  const { carregar } = useContext(AppContext);

  const repovoar = async () => {
    if (!window.confirm("Isso vai recarregar todos os dados iniciais (2026-1). Dados editados serão sobrescritos. Confirmar?")) return;
    await popularDadosIniciais(profInicial, discInicial, turmasInicial);
    await carregar();
    alert("Dados recarregados com sucesso!");
  };

  return (
    <div>
      <h2 style={{ fontSize: 16, fontWeight: "bold", color: "#1F4E79", marginBottom: 14 }}>Configurações</h2>

      <div className="card">
        <div className="card-title">Firebase</div>
        <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>
          Para conectar ao Firebase, edite o arquivo <code>src/firebase.js</code> com as credenciais do seu projeto.
          Acesse <strong>console.firebase.google.com</strong> → seu projeto → Configurações do projeto → Apps Web.
        </p>
        <div style={{ background: "#F4F6F9", borderRadius: 6, padding: 14, fontFamily: "monospace", fontSize: 12, color: "#1F4E79", marginBottom: 14 }}>
          <div>apiKey: "SUA_API_KEY"</div>
          <div>authDomain: "seu-projeto.firebaseapp.com"</div>
          <div>projectId: "seu-projeto-id"</div>
        </div>
        <div className="alert alert-info">
          💡 Se o Firebase não estiver configurado, o app funciona com os dados locais (modo offline).
        </div>
      </div>

      <div className="card">
        <div className="card-title">Dados</div>
        <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>
          Recarregar os dados iniciais do semestre 2026-1 (planilha original).
        </p>
        <button className="btn btn-danger" onClick={repovoar}>
          ↺ Restaurar dados iniciais 2026-1
        </button>
      </div>

      <div className="card">
        <div className="card-title">Sobre o sistema</div>
        <p style={{ fontSize: 13, color: "#6B7280" }}>
          <strong>Sistema de Gestão de Estágios — Psicologia UNIVERSO</strong><br />
          Versão 1.0 · 2026<br /><br />
          Desenvolvido para gerenciar alocação de professores supervisores, turmas de estágio
          e geração de relatórios institucionais do curso de Psicologia da Universidade Salgado de Oliveira.
        </p>
      </div>
    </div>
  );
}
