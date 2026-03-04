let allTasks = [];
let currentFilter = 'all';

async function fetchTasks() {
  const res = await fetch('/tasks');
  allTasks = await res.json();
  renderTasks();
  updateStats();
}

function updateStats() {
  const total = allTasks.length;
  const done = allTasks.filter(t => t.status === 'done').length;
  const pending = total - done;
  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-pending').textContent = pending;
  document.getElementById('stat-done').textContent = done;
}

function setFilter(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('task-list');
  const empty = document.getElementById('empty-state');

  const filtered = allTasks.filter(t => {
    if (currentFilter === 'pending') return t.status !== 'done';
    if (currentFilter === 'done') return t.status === 'done';
    return true;
  });

  list.querySelectorAll('.task-item').forEach(el => el.remove());

  if (filtered.length === 0) {
    empty.style.display = 'flex';
    return;
  }

  empty.style.display = 'none';

  filtered.forEach((task, i) => {
    const el = document.createElement('div');
    el.className = `task-item${task.status === 'done' ? ' done' : ''}`;
    el.style.animationDelay = `${i * 0.04}s`;

    const date = new Date(task.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
    });

    el.innerHTML = `
      <button class="check-btn" onclick="completeTask('${task.id}')" title="Concluir">
        ${task.status === 'done' ? '✓' : ''}
      </button>
      <div class="task-body">
        <div class="task-title">${escapeHtml(task.title)}</div>
        ${task.description ? `<div class="task-desc">${escapeHtml(task.description)}</div>` : ''}
        <div class="task-meta">${date} · ${task.status === 'done' ? 'concluída' : 'pendente'}</div>
      </div>
      <div class="task-actions">
        <button class="btn-icon" onclick="deleteTask('${task.id}')" title="Remover">✕</button>
      </div>
    `;
    list.appendChild(el);
  });
}

async function addTask() {
  const title = document.getElementById('input-title').value.trim();
  const description = document.getElementById('input-desc').value.trim();

  if (!title) {
    showToast('Digite um título para a tarefa.', 'error');
    return;
  }

  const res = await fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description })
  });

  if (res.ok) {
    document.getElementById('input-title').value = '';
    document.getElementById('input-desc').value = '';
    showToast('Tarefa adicionada!', 'success');
    await fetchTasks();
  } else {
    showToast('Erro ao adicionar tarefa.', 'error');
  }
}

async function completeTask(id) {
  const task = allTasks.find(t => t.id === id);
  

  const res = await fetch(`/tasks/${id}/complete`, { method: 'PATCH' });
  if (res.ok) {
    showToast('Tarefa concluída! ✓', 'success');
    await fetchTasks();
  }
}

async function deleteTask(id) {
  const res = await fetch(`/tasks/${id}`, { method: 'DELETE' });
  if (res.ok) {
    showToast('Tarefa removida.', 'error');
    await fetchTasks();
  }
}

function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `show ${type}`;
  setTimeout(() => toast.className = '', 2500);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('input-title').addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
  });
  fetchTasks();
});