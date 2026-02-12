from pymongo import MongoClient

client = MongoClient(os.getenv("MONGO_URI"))

db = client["placement_tracker"]

users_collection = db["users"]
progress_collection = db["progress"]
