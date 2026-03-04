# Task Manager 📋

Gerenciador de tarefas com interface web construído com **Python + Flask**. Projeto desenvolvido para praticar arquitetura de software em camadas, APIs REST e persistência de dados em JSON.

---

## 🖥️ Demo

> Adicione, conclua e remova tarefas com persistência automática em JSON.

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas com separação clara de responsabilidades:

```
task_manager/
│   app.py                  ← servidor Flask + rotas HTTP (REST API)
│
├── models/
│   └── task.py             ← classe Task com serialização (to_dict / from_dict)
│
├── services/
│   └── task_service.py     ← lógica de negócio (CRUD de tarefas)
│
├── utils/
│   └── decorators.py       ← decorator de log para monitorar chamadas
│
├── static/
│   ├── css/style.css       ← estilos da interface
│   └── js/main.js          ← comunicação com a API via fetch
│
├── templates/
│   └── index.html          ← template HTML servido pelo Flask (Jinja2)
│
└── data/
    └── tasks.json          ← persistência local (gerado automaticamente)
```

### Por que essa estrutura?

| Camada | Responsabilidade |
|--------|-----------------|
| `models/` | Representação dos dados |
| `services/` | Regras de negócio e persistência |
| `utils/` | Ferramentas reutilizáveis |
| `app.py` | Entrada HTTP, roteamento |
| `static/` | Interface do usuário |

---

## 🚀 Como rodar

**1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/task-manager.git
cd task-manager
```

**2. Instale as dependências**
```bash
pip install flask
```

**3. Rode o servidor**
```bash
python app.py
```

**4. Acesse no browser**
```
http://localhost:5000
```

---

## 🔌 API REST

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/tasks` | Lista todas as tarefas |
| `POST` | `/tasks` | Cria uma nova tarefa |
| `PATCH` | `/tasks/<id>/complete` | Alterna status da tarefa |
| `DELETE` | `/tasks/<id>` | Remove uma tarefa |

**Exemplo de payload (POST /tasks):**
```json
{
  "title": "Estudar Flask",
  "description": "Ver documentação oficial"
}
```

**Exemplo de resposta:**
```json
{
  "id": "a1b2c3d4-...",
  "title": "Estudar Flask",
  "description": "Ver documentação oficial",
  "status": "pending",
  "created_at": "2026-03-04T14:32:10"
}
```

---

## ✨ Funcionalidades

- ✅ Adicionar tarefas com título e descrição opcional
- ✅ Marcar/desmarcar tarefas como concluídas (toggle)
- ✅ Remover tarefas
- ✅ Filtrar por status (todas, pendentes, concluídas)
- ✅ Persistência automática em JSON
- ✅ Log automático de ações via decorator
- ✅ Interface web responsiva

---

## 🛠️ Tecnologias

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
**Python 3** — linguagem principal

![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
**Flask** — framework web / servidor HTTP

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
**HTML/CSS/JS** — interface web (frontend gerado com auxílio de IA)

![JSON](https://img.shields.io/badge/JSON-5E5C5C?style=for-the-badge&logo=json&logoColor=white)
**JSON** — persistência de dados

**uuid** — geração de IDs únicos

**datetime** — timestamps das tarefas

---

## 📚 Conceitos praticados

- Arquitetura em camadas (Models / Services / Routes)
- Orientação a objetos com Python (`__init__`, `@classmethod`, métodos)
- Serialização e desserialização de dados (`to_dict` / `from_dict`)
- Decorators em Python (`@log_action`)
- API REST com Flask (GET, POST, PATCH, DELETE)
- Tratamento de exceções (`try/except`, `ValueError`)
- Persistência de dados com JSON
- Comunicação frontend ↔ backend com `fetch` API

---

## 👨‍💻 Autor

Feito por **[Vinicius](https://github.com/Kizuypy)** como projeto de portfólio durante estudos de Python.
