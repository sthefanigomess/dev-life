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
        tarefa.concluida = true;
        } else {
            itemTarefa.style.textDecoration = "none";
            tarefa.concluida = false;
        }
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    });

    botaoExcluir.addEventListener("click", () => {
        botaoExcluir.parentElement.remove();

    });
});

window.addEventListener("load", () => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
    }
    
    tarefas.forEach((tarefa) => {
        const itemTarefa = document.createElement("li");
        itemTarefa.textContent = tarefa.descricao;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox"; 
        checkbox.checked = tarefa.concluida;
        itemTarefa.appendChild(checkbox);
        
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                itemTarefa.style.textDecoration = "line-through";
            } else {
                itemTarefa.style.textDecoration = "none";
            }
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        
        botaoExcluir.addEventListener("click", () => {
            const indice = tarefas.findIndex((item) => {
                return item === tarefa;
            });
            
            if (indice !== -1) {
                tarefas.splice(indice, 1);
                localStorage.setItem("tarefas", JSON.stringify(tarefas));
            }
            
            botaoExcluir.parentElement.remove();
        });
       
        itemTarefa.appendChild(botaoExcluir);
        listaTarefas.appendChild(itemTarefa);

    });
});