// Mock de dados para testar o funcionamento
let goals = [];

// Função para exibir os objetivos na página
function displayGoals() {
    const goalsList = document.getElementById('goalsList');
    goalsList.innerHTML = '';

    goals.forEach((goal, index) => {
        const goalItem = document.createElement('div');
        goalItem.classList.add('goal-item');
        goalItem.innerHTML = `
            <h3>${goal.name}</h3>
            <p>${goal.description}</p>
            <p>Data de Início: ${goal.startDate}</p>
            <p>Data de Conclusão Prevista: ${goal.endDate}</p>
            <button onclick="editGoal(${index})">Editar</button>
            <button onclick="deleteGoal(${index})">Excluir</button>
        `;
        goalsList.appendChild(goalItem);
    });
}

// Função para adicionar um novo objetivo
function addGoal(event) {
    event.preventDefault();
    const goalName = document.getElementById('goalName').value;
    const goalDescription = document.getElementById('goalDescription').value;
    const goalStartDate = document.getElementById('goalStartDate').value;
    const goalEndDate = document.getElementById('goalEndDate').value;
    const newGoal = {
        name: goalName,
        description: goalDescription,
        startDate: goalStartDate,
        endDate: goalEndDate
    };
    goals.push(newGoal);
    displayGoals();
    closeModal();
}

// Função para abrir o modal de adicionar objetivo
function openModal() {
    const modal = document.getElementById('goalModal');
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.remove('fade-out');
        modal.classList.add('fade-in');
    }, 50); // Adiciona um pequeno atraso para garantir que a animação seja aplicada corretamente

    // Verifica se o modal está sendo aberto para editar um objetivo
    const submitButton = document.querySelector('#goalForm button[type="submit"]');
    if (submitButton.textContent === "Salvar Edições") {
        // Mantém os dados do objetivo selecionado no formulário
        return;
    }

    // Limpar os campos do formulário ao abrir o modal para criar um novo objetivo
    submitButton.textContent = "Adicionar Objetivo";
    document.getElementById('goalForm').removeEventListener('submit', editGoalSubmit);
    document.getElementById('goalForm').addEventListener('submit', addGoal);
    document.getElementById('goalForm').reset();
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('goalModal');
    modal.classList.remove('fade-in');
    modal.classList.add('fade-out');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300); // Tempo correspondente à duração da animação em milissegundos
}

// Função para editar um objetivo
function editGoal(index) {
    const editedGoal = goals[index];
    document.getElementById('goalName').value = editedGoal.name;
    document.getElementById('goalDescription').value = editedGoal.description;
    document.getElementById('goalStartDate').value = editedGoal.startDate;
    document.getElementById('goalEndDate').value = editedGoal.endDate;

    // Atualiza o botão de envio do formulário para "Salvar Edições"
    const submitButton = document.querySelector('#goalForm button[type="submit"]');
    submitButton.textContent = "Salvar Edições";

    // Altera o evento do formulário para chamar a função editGoalSubmit() com o índice do objetivo
    document.getElementById('goalForm').removeEventListener('submit', addGoal);
    document.getElementById('goalForm').addEventListener('submit', function (event) {
        editGoalSubmit(event, index);
    });

    openModal(); // Abre o modal de criação/edição de objetivo
}

// Função para enviar a edição de um objetivo
function editGoalSubmit(event, index) {
    event.preventDefault();
    const goalName = document.getElementById('goalName').value;
    const goalDescription = document.getElementById('goalDescription').value;
    const goalStartDate = document.getElementById('goalStartDate').value;
    const goalEndDate = document.getElementById('goalEndDate').value;

    // Atualiza o objetivo no array de objetivos
    goals[index] = {
        name: goalName,
        description: goalDescription,
        startDate: goalStartDate,
        endDate: goalEndDate
    };

    displayGoals(); // Atualiza a exibição dos objetivos na página
    closeModal(); // Fecha o modal
}

// Função para excluir um objetivo
function deleteGoal(index) {
    goals.splice(index, 1);
    displayGoals();
}

// Event Listeners
document.getElementById('addGoalBtn').addEventListener('click', openModal);
document.getElementById('goalForm').addEventListener('submit', addGoal);
document.querySelector('.close').addEventListener('click', closeModal);

// Chamada inicial para exibir os objetivos
displayGoals();
