import './App.css'

function KanbanColumn(props) {
  return (
    <section className="kanban-column">
      <h2>{props.title}</h2>
    </section>
  )
}

function App() {
  return (
    <main>
      <header>
        <h1> Dev Life</h1>
        <p>Organize sua vida, uma tarefa por vez.</p>
      </header>

      <section>
        <h2>Minhas tarefas</h2>

        <div className="kanban-board">
        <KanbanColumn title="A fazer" />
        <KanbanColumn title="Fazendo" />
        <KanbanColumn title="Concluído" />
        </div>
      </section>
    </main>
  )
}

export default App