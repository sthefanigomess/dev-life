import './App.css'
import { useState, useEffect } from 'react';

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

        const id = Number(evento.dataTransfer.getData("text/plain"));

        const novasTarefas = props.tarefas.map((tarefa) => {
          if (tarefa.id === id) {
            return {
              ...tarefa,
              status: props.status
            };
          }

          return tarefa;
        });

        props.atualizarStatusTarefa(id, props.status);
      }}
    >

      <h2>{props.title}
        <span className='task-count'>
          {tarefasFiltradas.length}
        </span>
      </h2>

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
              <>
              <span>{tarefa.descricao}</span>

              <button
                onClick={() => {
                  const novasTarefas = props.tarefas.map((item) => {
                    if (item.id === tarefa.id) {
                      return {
                        ...item,
                        status: tarefa.status === "concluido" ? "a-fazer" : "concluido"
                      };
                    }

                    return item;
                });

                props.atualizarTarefas(novasTarefas);
              }}
            >
              {tarefa.status === "concluido" ? "Reabrir" : "Concluir"}
              </button>
            </>
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
  
  useEffect(() => {
    fetch("http://localhost:3000/tarefas")
    .then((resposta) => resposta.json())
    .then((dados) => {
      console.log("Tarefas recebidas da API:", dados);
      setTarefas(dados);
    })
    .catch((erro) => {
      console.error("Erro ao buscar tarefas:", erro);
    });
  }, []);

  const [arrastandoSobreLixeira, setArrastandoSobreLixeira] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [descricaoEditada, setDescricaoEditada] = useState("");

  async function adicionarTarefa(){
    if (novaTarefa.trim() === "") {
      return;
    }

    const resposta = await fetch("http://localhost:3000/tarefas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        descricao: novaTarefa.trim(),
        status: "a-fazer"
      })
    });

    if (!resposta.ok) {
      console.error("Erro ao adicionar tarefa:", resposta.status);
      return;
    }

    const tarefaCriada = await resposta.json();

    setTarefas([...tarefas, tarefaCriada]);
    setNovaTarefa("");
  }

  async function salvarEdicao() {
    if (descricaoEditada.trim() === "") {
      return;
    }

    const resposta = await fetch(
      `http://localhost:3000/tarefas/${tarefaEditando}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          descricao: descricaoEditada.trim()
        })
      }
    );

    if(!resposta.ok) {
      console.error("Erro ao editar tarefa:", resposta.status);
      return;
    }

    const tarefaAtualizada = await resposta.json();

    const novasTarefas = tarefas.map((tarefa) => 
      tarefa.id === tarefaAtualizada.id ? tarefaAtualizada : tarefa
  );
    setTarefas(novasTarefas);
    setTarefaEditando(null);
    setDescricaoEditada("");
  }

  async function atualizarStatusTarefa(id, novoStatus) {
    const resposta = await fetch(`http://localhost:3000/tarefas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: novoStatus
      })
    });

    if (!resposta.ok) {
      throw new Error("Erro ao atualizar o status da tarefa.");
    }
    const tarefaAtualizada = await resposta.json();

    setTarefas((tarefasAtuais) => 
      tarefasAtuais.map((tarefa) => 
        tarefa.id === tarefaAtualizada.id 
          ? tarefaAtualizada
          : tarefa
        )
      );
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
        atualizarStatusTarefa={atualizarStatusTarefa}
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
        atualizarStatusTarefa={atualizarStatusTarefa}
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
        atualizarStatusTarefa={atualizarStatusTarefa}
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