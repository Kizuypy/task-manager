import uuid
from datetime import datetime


class Task:

    def __init__(
        self, 
        title, 
        description=None, 
        id=None,
        status="pending", 
        created_at=None
    ):

        self.id = id or str(uuid.uuid4())
        self.title = title
        self.description = description
        self.status = status
        self.created_at = created_at or datetime.now().isoformat()

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status,
            "created_at": self.created_at
        }

    @classmethod
    def from_dict(cls, data):
        return cls(
            title=data["title"],
            description=data.get("description"),
            id=data.get("id"),
            status=data.get("status", "pending"),
            created_at=data.get("created_at"),
        )
