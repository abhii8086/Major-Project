from pymongo import MongoClient
from config import Config

client = MongoClient(Config.MONGO_URI)
db_list = client.list_database_names()
print("Connected to MongoDB. Available databases:", db_list, flush=True)
# db = client.get_default_database()
db = client["abhijeet"]
users_collection = db["Geo-Assist"]

def get_user_by_username(username):
    return users_collection.find_one({"username": username})

def create_user(user):
    users_collection.insert_one(user)

def update_user(username, update_fields):
    users_collection.update_one({"username": username}, {"$set": update_fields})
