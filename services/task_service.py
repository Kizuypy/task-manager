import json
import os
from models.task import Task
from utils.decorators import log_action


class TaskService:
    def __init__(self) -> None:
        self.filepath = "data/tasks.json"
        self.tasks = []
        self._load()

    def _load(self):
        if os.path.exists(self.filepath):
            with open(self.filepath, "r") as file:
                data = json.load(file)
                self.tasks = [Task.from_dict(item) for item in data]
        else:
            self.tasks = []

    def _save(self):
        with open(self.filepath, "w") as file:
            json.dump([task.to_dict() for task in self.tasks], file, indent=4)

    @log_action
    def add_task(self, title, description=None):
        task = Task(title, description)
        self.tasks.append(task)
        self._save()
        return task

    def remove_task(self, task_id):
        for i, task in enumerate(self.tasks):
            if task.id == task_id:
                removed_task = self.tasks.pop(i)
                self._save()
                return removed_task
        raise ValueError("Task not found")

    def complete_task(self, task_id):
        for task in self.tasks:
            if task.id == task_id:
                task.status = "pending" if task.status == "done" else "done"
                self._save()
                return task
        raise ValueError("Task not found")

    def get_all_tasks(self):
        return self.tasks
