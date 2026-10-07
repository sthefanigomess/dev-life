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

function criarElementoTarefa(tarefa) {
    const itemTarefa = document.createElement("li");
    itemTarefa.textContent = tarefa.descricao;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox"; 
    checkbox.checked = tarefa.concluida;
    itemTarefa.appendChild(checkbox);

    if (tarefa.concluida) {
            itemTarefa.style.textDecoration = "line-through";
        }

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

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    itemTarefa.appendChild(botaoExcluir);

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