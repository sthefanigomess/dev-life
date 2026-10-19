document.querySelector("h1").textContent = "Bem-vindo ao Dev Life!";
document.querySelector("p").textContent = "Organize sua vida, uma tarefa por vez.";

const inputTarefa = document.querySelector("#input-tarefa"); 
const botaoAdicionar = document.querySelector("#botao-adicionar");
const listaTarefas = document.querySelector("#lista-tarefas");
let tarefas = [];
let filtroAtual = "todas";

const botaoFiltroTodas = document.querySelector("#filtro-todas");
const botaoFiltroPendentes = document.querySelector("#filtro-pendentes");
const botaoFiltroConcluidas = document.querySelector("#filtro-concluidas");

function atualizarResumo() {
    const total = tarefas.length;
    const concluido = tarefas.filter(tarefa => tarefa.concluida).length;
    const pendente = total - concluido;

    document.querySelector("#total-tarefas").textContent = total;
    document.querySelector("#tarefas-concluidas").textContent = concluido;
    document.querySelector("#tarefas-pendentes").textContent = pendente;
}

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
    renderizarTarefas();
    atualizarResumo();
    
    inputTarefa.value = "";
   
});

function criarElementoTarefa(tarefa) {
    const itemTarefa = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarefa.concluida;

    const textoTarefa = document.createElement("span");
    textoTarefa.textContent = tarefa.descricao;

    const inputEdicao = document.createElement("input");
    inputEdicao.type = "text";
    inputEdicao.value = tarefa.descricao;
    inputEdicao.style.display = "none";

    textoTarefa.style.textDecoration = tarefa.concluida
        ? "line-through"
        : "none";

    itemTarefa.appendChild(checkbox);
    itemTarefa.appendChild(textoTarefa);
    itemTarefa.appendChild(inputEdicao);

    checkbox.addEventListener("change", () => {
        tarefa.concluida = checkbox.checked;

        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        renderizarTarefas();
        atualizarResumo();
    });

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";

    itemTarefa.appendChild(botaoEditar);

    botaoEditar.addEventListener("click", () => {
        if (inputEdicao.style.display === "none"){
            textoTarefa.style.display = "none";
            inputEdicao.style.display = "inline";
            botaoEditar.textContent = "Salvar";
            botaoEditar.classList.add("botao-salvar");
            inputEdicao.focus();
            return;
        }

        const novaDescricao = inputEdicao.value.trim();

        if (novaDescricao === "") {
            return;
        }

        tarefa.descricao = novaDescricao;

        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        botaoEditar.classList.remove("botao-salvar");

        renderizarTarefas();
        atualizarResumo();
    });

    inputEdicao.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter") {
            botaoEditar.click();
        }

        if (evento.key === "Escape") {
            textoTarefa.style.display = "inline";
            inputEdicao.style.display = "none";
            inputEdicao.value = tarefa.descricao;

            botaoEditar.textContent = "Editar";
            botaoEditar.classList.remove("botao-salvar");
        }
    });

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";

    botaoExcluir.addEventListener("click", () => {
        const indice = tarefas.findIndex((item) => item === tarefa);

        if (indice !== -1) {
            tarefas.splice(indice, 1);
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
            itemTarefa.remove();
            atualizarResumo();
        }
    });

    itemTarefa.appendChild(botaoExcluir);
    listaTarefas.appendChild(itemTarefa);
}

function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    let tarefasFiltradas = tarefas;

    if (filtroAtual === "pendentes") {
        tarefasFiltradas = tarefas.filter((tarefa) => {
            return tarefa.concluida === false; 
        });
    }

    if (filtroAtual === "concluidas") {
        tarefasFiltradas = tarefas.filter((tarefa) => {
            return tarefa.concluida === true; 
        });
    }

    tarefasFiltradas.forEach((tarefa) => {
        criarElementoTarefa(tarefa);
    });
}

function atualizarBotoesFiltro(){
    botaoFiltroTodas.classList.toggle("ativo", filtroAtual === "todas");
    botaoFiltroPendentes.classList.toggle("ativo", filtroAtual === "pendentes");
    botaoFiltroConcluidas.classList.toggle("ativo", filtroAtual === "concluidas");
}

botaoFiltroTodas.addEventListener("click", () => {
    filtroAtual = "todas";
    renderizarTarefas();
    atualizarBotoesFiltro();
});

botaoFiltroPendentes.addEventListener("click", () => {
    filtroAtual = "pendentes";
    renderizarTarefas();
    atualizarBotoesFiltro();
});

botaoFiltroConcluidas.addEventListener("click", () => {
    filtroAtual = "concluidas";
    renderizarTarefas();
    atualizarBotoesFiltro();
});

window.addEventListener("load", () => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
    }
    
    renderizarTarefas();
    atualizarResumo();

});