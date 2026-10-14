document.querySelector("h1").textContent = "Bem-vindo ao Dev Life!";
document.querySelector("p").textContent = "Organize sua vida, uma tarefa por vez.";

const inputTarefa = document.querySelector("#input-tarefa"); 
const botaoAdicionar = document.querySelector("#botao-adicionar");
const listaTarefas = document.querySelector("#lista-tarefas");
let tarefas = [];

botaoAdicionar.addEventListener("click", () => {
    const tarefa = inputTarefa.value;
    const novaTarefa = {
        descricao: tarefa,
        concluida: false
    }

    if (tarefa === "") {
        console.log("O input está vazio. Por favor, digite uma tarefa.");
        return;
    }

    tarefas.push(novaTarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    criarElementoTarefa(novaTarefa);
    
    inputTarefa.value = "";

   
});

function criarElementoTarefa(tarefa) {
    const itemTarefa = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox"; 
    checkbox.checked = tarefa.concluida;
    
    const textoTarefa = document.createElement("span");
    textoTarefa.textContent = tarefa.descricao;
    textoTarefa.style.textDecoration = tarefa.concluida 
    ? "line-through" 
    : "none";

    itemTarefa.appendChild(checkbox);
    itemTarefa.appendChild(textoTarefa);

    checkbox.addEventListener("change", () => {
        tarefa.concluida = checkbox.checked;

        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        textoTarefa.style.textDecoration = tarefa.concluida 
        ? "line-through" 
        : "none";

    });

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";

    botaoExcluir.addEventListener("click", () => {
            const indice = tarefas.findIndex((item) => item === tarefa);
            if (indice !== -1) {
                tarefas.splice(indice, 1);
                localStorage.setItem("tarefas", JSON.stringify(tarefas));
                itemTarefa.remove();
            }
        });

        itemTarefa.appendChild(botaoExcluir);
        listaTarefas.appendChild(itemTarefa);
}

window.addEventListener("load", () => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
    }
    
    tarefas.forEach((tarefa) => {
        criarElementoTarefa(tarefa);

    });

});