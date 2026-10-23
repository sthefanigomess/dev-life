import './App.css'
import { useState } from 'react';

function KanbanColumn(props) {
  return (
    <section className="kanban-column">
      <h2>{props.title}</h2>

      {props.tarefas.map((tarefa) => {
        return (
          <p key={tarefa.descricao}>{tarefa.descricao}</p>
        )
      })}
    </section>
  )
}

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  function adicionarTarefa(){
    if (novaTarefa.trim() === "") {
      return;
    }

    setTarefas([
      ...tarefas,
      {
        descricao: novaTarefa,
        status: "a-fazer"
      }
    ]);
    setNovaTarefa("");
  }
  return (
    <main>
      <header>
        <h1> Dev Life</h1>
        <p>Organize sua vida, uma tarefa por vez.</p>
      </header>

      <section>
        <h2 className='tasks-title'>Minhas tarefas</h2>

        <input
        type='text'
        placeholder='Digite uma tarefa'
        value={novaTarefa}
        onChange={(evento) => setNovaTarefa(evento.target.value)}
        />

        <button onClick={adicionarTarefa}>
          Adicionar Tarefa
        </button>

        <div className="kanban-board">
        <KanbanColumn 
        title="A fazer" 
        status="a-fazer"
        tarefas={tarefas}
        />

        <KanbanColumn 
        title="Fazendo"
        status="fazendo" 
        tarefas={tarefas}
        />

        <KanbanColumn 
        title="Concluído"
        status="concluido"
        tarefas={tarefas}
        />
        </div>
      </section>
    </main>
  )
}

export default App