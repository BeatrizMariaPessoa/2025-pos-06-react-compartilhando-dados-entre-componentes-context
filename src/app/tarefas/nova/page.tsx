"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTarefas } from "@/data/ContextTarefa";

export default function NovaTarefaPage() {
  const [titulo, setTitulo] = useState("");
  const { tarefas, setTarefas } = useTarefas();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    setTarefas([
      ...tarefas,
      { id: tarefas.length + 1, title: titulo, completed: false }
    ]);
    router.push("/tarefas");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Adicionar Nova Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 rounded mr-2"
          type="text"
          placeholder="Título da tarefa"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white p-2 rounded"
          type="submit"
        >
          Adicionar
        </button>
      </form>
    </div>
  );
}