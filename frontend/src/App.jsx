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

        const id = evento.dataTransfer.getData("text/plain");

        const novasTarefas = props.tarefas.map((tarefa) => {
          if (tarefa.id === id) {
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
          <div 
            className='kanban-task'
            draggable={true} 
            key={tarefa.id}
            onDoubleClick={() => {
              props.setTarefaEditando(tarefa.id);
              props.setDescricaoEditada(tarefa.descricao);
            }}
            
            onDragStart={(evento) => {
              evento.dataTransfer.setData("text/plain", tarefa.id);
            }}
          >
            {props.tarefaEditando === tarefa.id ? ( 
              <>
              <input
                value={props.descricaoEditada}
                onChange={(evento) => {
                  props.setDescricaoEditada(evento.target.value);
                }}
                onKeyDown={(evento) => {
                  if (evento.key === "Enter") {
                    props.salvarEdicao();
                  }

                  if (evento.key === "Escape") {
                    props.cancelarEdicao();
                  }
                }}
              />

              <button onClick={props.salvarEdicao}>
                Salvar
              </button>

              <button onClick={props.cancelarEdicao}>
                Cancelar
              </button>
            
            </>
            ) : (
              tarefa.descricao
            )}
          </div>
        );
      })}
    </section>
  )
}

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [arrastandoSobreLixeira, setArrastandoSobreLixeira] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [descricaoEditada, setDescricaoEditada] = useState("");

  function adicionarTarefa(){
    if (novaTarefa.trim() === "") {
      return;
    }

    setTarefas([
      ...tarefas,
      {
        id: crypto.randomUUID(),
        descricao: novaTarefa,
        status: "a-fazer"
      }
    ]);
    setNovaTarefa("");
  }

  function salvarEdicao() {
    if (descricaoEditada.trim() === "") {
      return;
    }

    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === tarefaEditando) {
        return {
          ...tarefa,
          descricao: descricaoEditada.trim()
        };
      }

      return tarefa;
    });

    setTarefas(novasTarefas);
    setTarefaEditando(null);
    setDescricaoEditada("");
  }

  function cancelarEdicao() {
    setTarefaEditando(null);
    setDescricaoEditada("");
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
        tarefaEditando={tarefaEditando}
        descricaoEditada={descricaoEditada}
        setDescricaoEditada={setDescricaoEditada}
        setTarefaEditando={setTarefaEditando}
        salvarEdicao={salvarEdicao}
        cancelarEdicao={cancelarEdicao}
        />

        <KanbanColumn 
        title="Fazendo"
        status="fazendo" 
        tarefas={tarefas}
        atualizarTarefas={setTarefas}
        tarefaEditando={tarefaEditando}
        descricaoEditada={descricaoEditada}
        setDescricaoEditada={setDescricaoEditada}
        setTarefaEditando={setTarefaEditando}
        salvarEdicao={salvarEdicao}
        cancelarEdicao={cancelarEdicao}
        />

        <KanbanColumn 
        title="Concluído"
        status="concluido"
        tarefas={tarefas}
        atualizarTarefas={setTarefas}
        tarefaEditando={tarefaEditando}
        descricaoEditada={descricaoEditada}
        setDescricaoEditada={setDescricaoEditada}
        setTarefaEditando={setTarefaEditando}
        salvarEdicao={salvarEdicao}
        cancelarEdicao={cancelarEdicao}
        />
        </div>

        <div 
          className={`trash-zone ${arrastandoSobreLixeira ? "drag-over" : ""}`}
            onDragEnter={() => setArrastandoSobreLixeira(true)}
            onDragLeave={() => setArrastandoSobreLixeira(false)}
            onDragOver={(evento) => {
              evento.preventDefault();
            }}
            onDrop={(evento) => {
              evento.preventDefault();
              setArrastandoSobreLixeira(false);

              const id = evento.dataTransfer.getData("text/plain");
              const novasTarefas = tarefas.filter((tarefa) => {
                return tarefa.id !== id;
              });

              setTarefas(novasTarefas);
            }}
        >
          
          <span>🗑️</span>
          <p>Arraste uma tarefa aqui para excluir</p>
        </div>

      </section>
    </main>
  )
}

export default App