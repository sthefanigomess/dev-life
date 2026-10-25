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

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});