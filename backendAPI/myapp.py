from flask import Flask, request
import database

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello!"

@app.route('/api/v1/get', methods=['GET'])
def get():
    # machine = database.get_or_add_machine(uid)
    if request.method == 'GET':
        record = database.get_id()
        if record is not None:
            return { "id": record.imdb_id }
        else:
            return {"error": 404}
    else:
            return {"error": 404}
    # if machine is None:
    #     return "Something went wrong :("
    # else:
    #     return {"ip": machine.id}

@app.route('/api/v1/add', methods=['POST'])
def add():
    if request.method == 'POST':
        machine = database.add_id(uid)
        return {"uid": machine.id}
    else:
        return {"error": 404}
    pass

if __name__ == "__main__":
    app.run()