"use client";
import type React from "react";
import axios from 'axios'

import { useEffect, useState } from "react";
// import dados, { TarefaInterface } from "@/data";
import Cabecalho from "@/componentes/Cabecalho";
import ModalTarefa from "@/componentes/ModalTarefa";

export interface TarefaInterface {
  id: number;
  title: string;
  completed: boolean;
}

interface TarefaProps {
  titulo: string;
  concluido?: boolean;
}

const Tarefa: React.FC<TarefaProps> = ({ titulo, concluido }) => {
  const [estaConcluido, setEstaConcluido] = useState(concluido);

  const classeCard = `p-3 mb-3 rounded-lg shadow-md hover:cursor-pointer hover:border ${
    estaConcluido
      ? "bg-gray-800 hover:border-gray-800"
      : "bg-gray-400 hover:border-gray-400"
  }`;

  const classeCorDoTexto = estaConcluido ? "text-amber-50" : "";

  const escutarClique = () => {
    console.log(`A tarefa '${titulo}' foi clicada!`);
    setEstaConcluido(!estaConcluido);
  };

  return (
    <div className={classeCard} onClick={() => escutarClique()}>
      <h3 className={`text-xl font-bold ${classeCorDoTexto}`}>{titulo}</h3>
      <p className={`text-sm ${classeCorDoTexto}`}>
        {estaConcluido ? "Concluída" : "Pendente"}
      </p>
    </div>
  );
};

interface TareafasProps {
  dados: TarefaInterface[];
}

const Tarefas: React.FC<TareafasProps> = ({ dados }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {dados.map((tarefa, idx) => (
        <Tarefa
          key={`${tarefa.id}-${idx}`}
          titulo={tarefa.title}
          concluido={tarefa.completed}
        />
      ))}
    </div>
  );
};

const Home = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tarefas, setTarefas] = useState<TarefaInterface[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const feachTarefas = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/todos')
        const tarefasAPI = response.data.todos.map((t: any) => ({
          id: t.id,
          title: t.todo,
          completed: t.completed,
        }));
        setTarefas(tarefasAPI);
      } catch (err) {
        setError('Failed to fetch todos')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    feachTarefas()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Cabecalho />
      <button className="mb-1 bg-gray-600 text-white p-2 font-semibold rounded-lg" onClick={() => setMostrarModal(true)}>Adicionar Tarefa +</button>
      {mostrarModal && <ModalTarefa tarefas={tarefas} setTarefas={setTarefas} onClose={() => setMostrarModal(false)} />}
      <Tarefas dados={tarefas} />
    </div>
  );
};

export default Home;
