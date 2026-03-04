from functools import wraps
from datetime import datetime


def log_action(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[LOG] {timestamp} - função: {func.__name__} - args: {args} - kwargs: {kwargs}")

        resultado = func(*args, **kwargs)

        return resultado

    return wrapper
