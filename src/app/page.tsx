"use client";
import type React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import dados, { TarefaInterface } from "@/data";
import Navbar from "@/components/Navbar";

const Home = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tarefas, setTarefas] = useState<TarefaInterface[]>(dados);

  return (
    <div className="container mx-auto p-4">
      <Navbar />
    </div>
  );
};

export default Home;