"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { TarefaInterface } from "@/types/tarefa";

interface ContextTarefaProps {
  tarefas: TarefaInterface[];
  setTarefas: React.Dispatch<React.SetStateAction<TarefaInterface[]>>;
}

const ContextTarefa = createContext<ContextTarefaProps | undefined>(undefined);

export const useTarefas = () => {
  const context = useContext(ContextTarefa);
  if (!context) throw new Error("useTarefas deve ser usado dentro do Provider");
  return context;
};

export const TarefaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tarefas, setTarefas] = useState<TarefaInterface[]>([]);

  useEffect(() => {
    const fetchTarefas = async () => {
      const response = await fetch('https://dummyjson.com/todos');
      const data = await response.json();
      const tarefasAPI = data.todos.map((t: any) => ({
        id: t.id,
        title: t.todo,
        completed: t.completed,
      }));
      setTarefas(tarefasAPI);
    };
    fetchTarefas();
  }, []);

  return (
    <ContextTarefa.Provider value={{ tarefas, setTarefas }}>
      {children}
    </ContextTarefa.Provider>
  );
};