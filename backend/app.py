from flask import Flask, request, jsonify
from flask_cors import CORS
from db import users_collection
import bcrypt
from datetime import datetime
from db import progress_collection

app = Flask(__name__)
CORS(app)

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return jsonify({
            "message": "Use POST to register",
            "sample": {
                "name": "Prahasini",
                "email": "praha@gmail.com",
                "password": "123456"
            }
        })

    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"), bcrypt.gensalt()
    )

    users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password
    })

    return jsonify({"message": "User registered successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({"message": "Invalid password"}), 401

    return jsonify({
        "message": "Login successful",
        "name": user["name"],
        "email": user["email"]
    }), 200


@app.route("/add-progress", methods=["POST"])
def add_progress():
    data = request.json

    email = data.get("email")
    category = data.get("category")
    topic = data.get("topic").strip().lower()
    confidence = int(data.get("confidence"))
    time_spent = data.get("time_spent")

    # 🔑 LATEST UPDATE WINS (update if exists, else insert)
    progress_collection.update_one(
        {
            "email": email,
            "category": category,
            "topic": topic
        },
        {
            "$set": {
                "confidence": confidence,
                "time_spent": time_spent,
                "status": "Weak" if confidence <= 2 else "Strong"
            }
        },
        upsert=True
    )

    return jsonify({"message": "Progress updated"}), 200


@app.route("/get-progress", methods=["POST"])
def get_progress():
    data = request.json
    email = data.get("email")

    progress_list = list(progress_collection.find(
        {"email": email},
        {"_id": 0}
    ))

    return jsonify(progress_list), 200

@app.route("/weak-areas", methods=["POST"])
def weak_areas():
    data = request.json
    email = data.get("email")

    weak = list(progress_collection.find(
        {
            "email": email,
            "confidence": {"$lte": 2}
        },
        {
            "_id": 0,
            "category": 1,
            "topic": 1,
            "confidence": 1
        }
    ))

    return jsonify(weak), 200

@app.route("/today-focus", methods=["POST"])
def today_focus():
    data = request.json
    email = data.get("email")

    weak = list(progress_collection.find(
        {
            "email": email,
            "confidence": {"$lte": 2}
        }
    ))

    if not weak:
        return jsonify({"focus": "You're doing great!"}), 200

    focus = weak[0]  # simple & predictable

    return jsonify({
        "focus": f"{focus['category']} – {focus['topic']}"
    }), 200




if __name__ == "__main__":
    app.run(debug=True)
