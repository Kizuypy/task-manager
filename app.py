from flask import Flask, render_template, request, jsonify
from services.task_service import TaskService

app = Flask(__name__)
service = TaskService()


@app.route("/")
def index():
    return render_template("index.html")




@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = service.get_all_tasks()
    return jsonify([task.to_dict() for task in tasks])



@app.route("/tasks", methods=["POST"])
def create_tasks():
    data = request.json
    title = data.get("title")
    description = data.get("description")

    task = service.add_task(title, description)
    return jsonify(task.to_dict()), 201



@app.route("/tasks/<task_id>/complete", methods=["PATCH"])
def complete_task(task_id):
    try:
        task = service.complete_task(task_id)
        return jsonify(task.to_dict())
    except ValueError as e:
        return jsonify({"error": str(e)}), 404

@app.route("/tasks/<task_id>", methods=["DELETE"])
def delete_task(task_id):
    try:
        service.remove_task(task_id)
        return jsonify({"message": "Task removed"})
    except ValueError as e:
        return jsonify({"error": str(e)}), 404


if __name__ == "__main__":
    app.run(debug=True)