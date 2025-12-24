from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["placement_tracker"]

users_collection = db["users"]
progress_collection = db["progress"]
