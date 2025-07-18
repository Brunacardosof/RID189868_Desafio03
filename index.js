// Obtem tarefas do localStorage
const getTasksFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  };
  
  // Salva tarefas no localStorage
  const setTasksInLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  
  // Gera um ID novo pra cada tarefa
  const getNewTaskId = () => {
    const tasks = getTasksFromLocalStorage();
    const lastId = tasks.length ? tasks[tasks.length - 1].id : 0;
    return lastId + 1;
  };

  const createTaskElement = (task) => {
    const li = document.createElement("li");
    li.className = "task-item";
    li.id = `task-${task.id}`;
  
    // Título da tarefa
    const title = document.createElement("p");
    title.textContent = task.name;
    title.className = "task-title";
    if (task.completed) {
      title.classList.add("completed");
    }
  
    // Etiqueta
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = task.tag;
  
    // Data
    const date = document.createElement("p");
    date.className = "date";
    date.textContent = `Criada em: ${task.createdAt}`;
  
    // Container da esquerda (tag + data)
    const leftInfo = document.createElement("div");
    leftInfo.className = "left-info";
    leftInfo.appendChild(tag);
    leftInfo.appendChild(date);
  
    // Botão "Concluir" (só aparece se ainda não concluída)
    let button = null;
    if (!task.completed) {
      button = document.createElement("button");
      button.className = "complete-btn";
      button.textContent = "Concluir";
      button.onclick = () => completeTask(task.id);
    }
  
    // Linha de topo: tag + data (esquerda) | botão (direita)
    const headerRow = document.createElement("div");
    headerRow.className = "header-row";
    headerRow.appendChild(leftInfo);
    if (button) headerRow.appendChild(button);
  
    // Ícone de tarefa concluída
    const doneIcon = document.createElement("img");
    doneIcon.className = "done-icon";
    doneIcon.src = "Checked.png";
    doneIcon.alt = "Tarefa concluída";
    doneIcon.style.display = task.completed ? "block" : "none";
  
    // Montagem do card
    li.appendChild(title);
    li.appendChild(headerRow);
    li.appendChild(doneIcon);
  
    document.getElementById("task-list").appendChild(li);
  };
  
  
  const completeTask = (id) => {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: true };
      }
      return task;
    });
  
    setTasksInLocalStorage(updatedTasks);
    renderTasks();

  };
  

  const renderTasks = () => {
    const tasks = getTasksFromLocalStorage();
    const list = document.getElementById("task-list");
    list.innerHTML = "";
  
    tasks.forEach(createTaskElement);
  
    // Atualiza progresso
    renderTasksProgressData(tasks);
  };

  const renderTasksProgressData = (tasks) => {
    const footer = document.getElementById("task-footer");
    let progress = document.getElementById("tasks-progress");
  
    if (!progress) {
      progress = document.createElement("div");
      progress.id = "tasks-progress";
      footer.appendChild(progress);
    }
  
    const done = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    progress.textContent = `${done} de ${total} concluídas`;
  };

  document.getElementById("create-task-form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const name = document.getElementById("task-name").value.trim();
    const tag = document.getElementById("task-tag").value.trim();
    const date = new Date().toLocaleDateString("pt-BR");
  
    const newTask = {
      id: getNewTaskId(),
      name,
      tag,
      createdAt: date,
      completed: false
    };
  
    const tasks = getTasksFromLocalStorage();
    tasks.push(newTask);
    setTasksInLocalStorage(tasks);
  
    renderTasks();
  
    // Limpa inputs
    event.target.reset();
  });

  window.onload = () => {
    renderTasks();
  };
  
  

  
  
  
  