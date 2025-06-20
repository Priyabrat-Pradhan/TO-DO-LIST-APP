const searchValue = document.getElementById('search-input')?.value.toLowerCase() || "";

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  const searchInput = document.getElementById('search-input');
  const searchValue = searchInput ? searchInput.value.toLowerCase() : "";

  const filter = document.querySelector('.filters button.active')?.dataset.filter || 'all';

  tasks.forEach(task => {
    // ✅ Apply filter (Completed / Pending / All)
    if (filter === 'completed' && !task.completed) return;
    if (filter === 'pending' && task.completed) return;

    // ✅ Apply search filter
    if (!task.text.toLowerCase().includes(searchValue)) return;

    // ✅ If passed both filters, show the task
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <div class="task-info">
        <strong>${task.text}</strong><br/>
        <small>${task.timestamp}</small>
      </div>
      <div class="actions">
        <button onclick="toggleTask(${task.id})">✅</button>
        <button onclick="editTask(${task.id})">✏️</button>
        <button onclick="deleteTask(${task.id})">🗑</button>
      </div>
    `;
    list.appendChild(li);
  });
}


function toggleTask(id) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }
}

function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks = tasks.filter(t => t.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

function editTask(id) {
   window.location.href = `add.html?id=${id}`;
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const task = tasks.find(t => t.id === id);
  if (task) {
    if (newText !== null && newText.trim() !== "") {
      task.text = newText.trim();
      task.timestamp = new Date().toLocaleString(); // Update time
      localStorage.setItem('tasks', JSON.stringify(tasks));
      loadTasks();
    }
  }
}

document.querySelectorAll('.filters button').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    loadTasks();
  };
});

window.onload = loadTasks;

document.getElementById('search-input')?.addEventListener('input', loadTasks);


