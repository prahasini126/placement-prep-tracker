from flask import Flask, request, jsonify
from flask_cors import CORS
from db import users_collection, progress_collection
import bcrypt
from dotenv import load_dotenv
import os

load_dotenv()

from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
)

app = Flask(__name__)
CORS(app)

# ✅ JWT Setup
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET")
jwt = JWTManager(app)


# ==============================
# REGISTER
# ==============================

@app.route("/register", methods=["POST"])
def register():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"message": "All fields required"}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password
    })

    return jsonify({"message": "User registered successfully"}), 201


# ==============================
# LOGIN
# ==============================

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

    # ✅ CREATE TOKEN
    access_token = create_access_token(identity=email)

    return jsonify({
        "token": access_token,
        "name": user["name"],
        "email": user["email"]
    }), 200


# ==============================
# ADD / UPDATE PROGRESS
# ==============================

@app.route("/add-progress", methods=["POST"])
@jwt_required()
def add_progress():

    email = get_jwt_identity()   # NEVER trust frontend email

    data = request.json

    category = data.get("category")
    topic = data.get("topic")
    confidence = data.get("confidence")
    time_spent = data.get("time_spent")

    if not category or not topic or confidence is None:
        return jsonify({"message": "Missing fields"}), 400

    topic = topic.strip().lower()
    confidence = int(confidence)

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


# ==============================
# GET PROGRESS
# ==============================

@app.route("/get-progress", methods=["GET"])
@jwt_required()
def get_progress():

    email = get_jwt_identity()

    progress_list = list(progress_collection.find(
        {"email": email},
        {"_id": 0}
    ))

    return jsonify(progress_list), 200


# ==============================
# WEAK AREAS
# ==============================

@app.route("/weak-areas", methods=["GET"])
@jwt_required()
def weak_areas():

    email = get_jwt_identity()

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


# ==============================
# TODAY FOCUS
# ==============================

@app.route("/today-focus", methods=["GET"])
@jwt_required()
def today_focus():

    email = get_jwt_identity()

    weak = list(progress_collection.find(
        {
            "email": email,
            "confidence": {"$lte": 2}
        }
    ))

    if not weak:
        return jsonify({"focus": "You're doing great!"}), 200

    focus = weak[0]

    return jsonify({
        "focus": f"{focus['category']} – {focus['topic']}"
    }), 200


# ==============================

if __name__ == "__main__":
    app.run(debug=True)
