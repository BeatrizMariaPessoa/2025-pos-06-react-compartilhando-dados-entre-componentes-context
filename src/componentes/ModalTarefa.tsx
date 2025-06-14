import { useState } from 'react';
import dados, { TarefaInterface } from "@/data";

let nextId = 5;
interface ModalTarefaProps{
  tarefas: TarefaInterface[];
  setTarefas: React.Dispatch<React.SetStateAction<TarefaInterface[]>>;
  onClose: () => void;

}

export default function ModalTarefa({ tarefas, setTarefas, onClose }: ModalTarefaProps) {
  const [titulo, setTitulo] = useState('');

  return (
    <>
    <div className='bg-gray-300 p-3 rounded-lg mb-3'>
      <h1>Escreva o nome da terefa</h1>
      <input className='border-1 border-gray-500 p-1 rounded-lg'
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
      />
      <button className='border-1 border-gray-500 p-1 rounded-lg ml-2' onClick={() => {
        setTarefas([
          ...tarefas,
          { id: nextId++, title: titulo, completed: false }
        ]);
      }}>Add</button>
      <button className='border-1 border-gray-500 p-1 rounded-lg ml-2' onClick={onClose}>Fechar</button>

    </div>
    </>
  );
}
