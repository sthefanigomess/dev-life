console.log("Olá, Dev Life!");
document.querySelector("h1").textContent = "Bem-vindo ao Dev Life!";
document.querySelector("p").textContent = "Organize sua vida, uma tarefa por vez.";

const inputTarefa = document.querySelector("#input-tarefa"); 
const botaoAdicionar = document.querySelector("#botao-adicionar");
const listaTarefas = document.querySelector("#lista-tarefas");

console.log(inputTarefa);
console.log(inputTarefa.value);
console.log(botaoAdicionar);

botaoAdicionar.addEventListener("click", () => {
    const tarefa = inputTarefa.value;
    console.log("Botão clicado!");
    const itemTarefa = document.createElement("li");
    itemTarefa.textContent = tarefa;
    listaTarefas.appendChild(itemTarefa);
});
