"use client";
import { useState } from "react";
import { useTarefas } from "@/data/ContextTarefa";
import { TarefaInterface } from "@/types/tarefa";
import Navbar from "@/components/Navbar";
import Link from "next/link";

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
    setEstaConcluido(!estaConcluido);
  };

  return (
    <div className={classeCard} onClick={escutarClique}>
      <h3 className={`text-xl font-bold ${classeCorDoTexto}`}>{titulo}</h3>
      <p className={`text-sm ${classeCorDoTexto}`}>
        {estaConcluido ? "Concluída" : "Pendente"}
      </p>
    </div>
  );
};

interface TarefasProps {
  dados: TarefaInterface[];
}

const Tarefas: React.FC<TarefasProps> = ({ dados }) => (
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

const TarefasPage = () => {
  const { tarefas } = useTarefas();

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <Link href="/tarefas/nova">
        <button className="mb-4 bg-blue-600 text-white p-2 rounded">
          Nova Tarefa
        </button>
      </Link>
      <Tarefas dados={tarefas} />
    </div>
  );
};

export default TarefasPage;