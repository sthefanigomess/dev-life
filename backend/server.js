const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const PORTA = 3000;
let tarefas = [
    { id: 1, descricao: "Estudar React", status: "fazendo" },
    { id: 2, descricao: "Aprender Node.js", status: "a-fazer" }
];

app.get("/", (req, res) => {
    res.send("API do DEV Life está funcionando!")
});

app.get("/tarefas", (req, res) => {
    res.json(tarefas);
});

app.post("/tarefas", (req, res) => {
    const { descricao, status } = req.body;

    if (!descricao || !status) {
        return res.status(400).json({
            erro: "Descrição e status são obrigatórios."
        });
    }

    const novaTarefa = {
        id: Date.now(),
        descricao: descricao,
        status: status
    };

    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

app.put("/tarefas/:id", (req, res) => {
    const id = Number(req.params.id);
    const { descricao, status } = req.body;

    if(status !== undefined && !["a-fazer", "fazendo", "concluido"].includes(status)) {
        return res.status(400).json({
            erro: "Status inválido."
        });
    }

    if (descricao !== undefined && !descricao.trim()) {
        return res.status(400).json({
            erro: "A descrição é obrigatória."
        });
    }
    const tarefa = tarefas.find((tarefa) => tarefa.id === id);
    
    if (!tarefa) {
        return res.status(404).json({
            erro: "Tarefa não encontrada."
        });
    }
    
    if (descricao !== undefined) {
        tarefa.descricao = descricao.trim();
    }

    if (status !== undefined) {
        tarefa.status = status;
    }

    res.json(tarefa);
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});