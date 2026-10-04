document.querySelector("h1").textContent = "Bem-vindo ao Dev Life!";
document.querySelector("p").textContent = "Organize sua vida, uma tarefa por vez.";

const inputTarefa = document.querySelector("#input-tarefa"); 
const botaoAdicionar = document.querySelector("#botao-adicionar");
const listaTarefas = document.querySelector("#lista-tarefas");
let tarefas = [];

botaoAdicionar.addEventListener("click", () => {
    const tarefa = inputTarefa.value;

    if (tarefa === "") {
        console.log("O input está vazio. Por favor, digite uma tarefa.");
        return;
}
    tarefas.push(tarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    console.log("Botão clicado!");
    const itemTarefa = document.createElement("li");
    itemTarefa.textContent = tarefa;
    const botaoExcluir = document.createElement("button");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    itemTarefa.appendChild(checkbox);
    itemTarefa.appendChild(botaoExcluir);
    listaTarefas.appendChild(itemTarefa);
    inputTarefa.value = "";

   checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        itemTarefa.style.textDecoration = "line-through";
        } else {
            itemTarefa.style.textDecoration = "none";
        }
    });

    botaoExcluir.addEventListener("click", () => {
        botaoExcluir.parentElement.remove();

    });
});

window.addEventListener("load", () => {
    const tarefaSalva = localStorage.getItem("tarefas");
    tarefas = JSON.parse(tarefaSalva);
    
    tarefas.forEach((tarefa) => {
        const itemTarefa = document.createElement("li");
        itemTarefa.textContent = tarefa;
        listaTarefas.appendChild(itemTarefa);

    });
});