import datetime

class Config:
    JWT_SECRET_KEY = '#past your secret key'
    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(days=1)
    MONGO_URI = "#pase your mongo db url"  # MongoDB connection URI
