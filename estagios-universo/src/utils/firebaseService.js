// src/utils/firebaseService.js
import {
  collection, doc, getDocs, getDoc,
  addDoc, setDoc, updateDoc, deleteDoc,
  query, orderBy, serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";

// ─── PROFESSORES ─────────────────────────────────────────────────────────────
export const getProfessores = async () => {
  const snap = await getDocs(query(collection(db, "professores"), orderBy("nome")));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addProfessor = async (dados) => {
  return await addDoc(collection(db, "professores"), { ...dados, criadoEm: serverTimestamp() });
};

export const updateProfessor = async (id, dados) => {
  await updateDoc(doc(db, "professores", id), { ...dados, atualizadoEm: serverTimestamp() });
};

export const deleteProfessor = async (id) => {
  await deleteDoc(doc(db, "professores", id));
};

// ─── DISCIPLINAS ─────────────────────────────────────────────────────────────
export const getDisciplinas = async () => {
  const snap = await getDocs(collection(db, "disciplinas"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addDisciplina = async (dados) => {
  return await setDoc(doc(db, "disciplinas", dados.cod), { ...dados, criadoEm: serverTimestamp() });
};

export const updateDisciplina = async (cod, dados) => {
  await updateDoc(doc(db, "disciplinas", cod), { ...dados, atualizadoEm: serverTimestamp() });
};

// ─── TURMAS ──────────────────────────────────────────────────────────────────
export const getTurmas = async () => {
  const snap = await getDocs(collection(db, "turmas"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addTurma = async (dados) => {
  const id = `${dados.disciplinaCod}-${dados.turma}`;
  await setDoc(doc(db, "turmas", id), { ...dados, criadoEm: serverTimestamp() });
  return id;
};

export const updateTurma = async (id, dados) => {
  await updateDoc(doc(db, "turmas", id), {
    ...dados,
    atualizadoEm: serverTimestamp()
  });
  // Registrar no histórico
  await addDoc(collection(db, "historico"), {
    tipo: "TURMA_EDITADA",
    turmaId: id,
    dados,
    em: serverTimestamp()
  });
};

export const deleteTurma = async (id) => {
  await deleteDoc(doc(db, "turmas", id));
};

// ─── HISTÓRICO ───────────────────────────────────────────────────────────────
export const getHistorico = async () => {
  const snap = await getDocs(query(collection(db, "historico"), orderBy("em", "desc")));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ─── POPULAR FIREBASE COM DADOS INICIAIS ─────────────────────────────────────
export const popularDadosIniciais = async (professores, disciplinas, turmas) => {
  const batch = [];

  for (const p of professores) {
    batch.push(setDoc(doc(db, "professores", p.id), {
      nome: p.nome, matricula: p.id, criadoEm: serverTimestamp()
    }));
  }

  for (const d of disciplinas) {
    batch.push(setDoc(doc(db, "disciplinas", d.cod), {
      ...d, criadoEm: serverTimestamp()
    }));
  }

  for (const t of turmas) {
    batch.push(setDoc(doc(db, "turmas", t.id), {
      ...t, criadoEm: serverTimestamp()
    }));
  }

  await Promise.all(batch);
  return true;
};
