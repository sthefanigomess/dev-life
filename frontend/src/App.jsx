import './App.css'
import { useState } from 'react';

function KanbanColumn(props) {
  const tarefasFiltradas = props.tarefas.filter((tarefa) => {
    return (
    tarefa.status === props.status
  )})

  return (
    <section
      className='kanban-column'
      onDragOver={(evento) => {
        evento.preventDefault();
        }}
      onDrop={(evento) => {
        evento.preventDefault();

        const descricao = evento.dataTransfer.getData("text/plain");

        const novasTarefas = props.tarefas.map((tarefa) => {
          if (tarefa.descricao === descricao) {
            return {
              ...tarefa,
              status: props.status
            };
          }

          return tarefa;
        });

        props.atualizarTarefas(novasTarefas);
      }}
    >

      <h2>{props.title}</h2>

      {tarefasFiltradas.map((tarefa) => {
        return (
          <p 
            draggable={true} 
            key={tarefa.descricao}
            onDragStart={(evento) => {
              evento.dataTransfer.setData("text/plain", tarefa.descricao);
            }}
          >
            {tarefa.descricao}
          </p>
        );
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
        atualizarTarefas={setTarefas}
        />

        <KanbanColumn 
        title="Fazendo"
        status="fazendo" 
        tarefas={tarefas}
        atualizarTarefas={setTarefas}
        />

        <KanbanColumn 
        title="Concluído"
        status="concluido"
        tarefas={tarefas}
        atualizarTarefas={setTarefas}
        />
        </div>
      </section>
    </main>
  )
}

export default App