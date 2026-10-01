document.querySelector("h1").textContent = "Bem-vindo ao Dev Life!";
document.querySelector("p").textContent = "Organize sua vida, uma tarefa por vez.";

const inputTarefa = document.querySelector("#input-tarefa"); 
const botaoAdicionar = document.querySelector("#botao-adicionar");
const listaTarefas = document.querySelector("#lista-tarefas");

botaoAdicionar.addEventListener("click", () => {
    const tarefa = inputTarefa.value;
    if (tarefa === "") {
    console.log("O input está vazio. Por favor, digite uma tarefa.");
    return;
}
    console.log("Botão clicado!");
    const itemTarefa = document.createElement("li");
    itemTarefa.textContent = tarefa;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    itemTarefa.appendChild(checkbox);
    listaTarefas.appendChild(itemTarefa);
    inputTarefa.value = "";
    
   checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        itemTarefa.style.textDecoration = "line-through";
    } else {
        itemTarefa.style.textDecoration = "none";
    }

});
});

