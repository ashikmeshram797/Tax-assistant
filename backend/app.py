import psycopg2
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from tax_nlp import get_answer

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json["message"]

    reply = get_answer(user_message)

    return jsonify({"reply": reply})
# ---------------- REGISTER ROUTE ----------------
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    email = data["email"]
    username = data["username"]
    password = data["password"]

    conn = psycopg2.connect(
        host="localhost",
        database="taxdb",
        user="postgres",
        password="iphonex10"
    )

    cur = conn.cursor()
    cur.execute(
        "INSERT INTO users (email, username, password) VALUES (%s, %s, %s)",
        (email, username, password)
    )

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Registered Successfully"})


# ---------------- LOGIN ROUTE ----------------
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data["email"]
    password = data["password"]

    conn = psycopg2.connect(
        host="localhost",
        database="taxdb",
        user="postgres",
        password="iphonex10"
    )

    cur = conn.cursor()

    # Fetch user with role
    cur.execute(
        "SELECT email, role FROM users WHERE email=%s AND password=%s",
        (email, password)
    )

    user = cur.fetchone()

    cur.close()
    conn.close()

    if user:
        return jsonify({
            "message": "Login Successful",
            "role": user[1]   # role send kar
        })
    else:
        return jsonify({"message": "Invalid email or password"})

# ---------------- MAIN ----------------
if __name__ == "__main__":
    app.run(debug=True)