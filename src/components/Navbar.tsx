import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 mb-6">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-white font-bold text-xl">Tarefas App</span>
        <div>
          <Link href="/">
            <span className="text-gray-200 hover:text-white mx-2 cursor-pointer">Home</span>
          </Link>
          <Link href="/tarefas">
            <span className="text-gray-200 hover:text-white mx-2 cursor-pointer">Tarefas</span>
          </Link>
          <Link href="/tarefas/nova">
            <span className="text-gray-200 hover:text-white mx-2 cursor-pointer">Nova Tarefa</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}