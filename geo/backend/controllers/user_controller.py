import hashlib
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user_model import get_user_by_username, create_user, update_user
from models.user_model import users_collection 
user_bp = Blueprint('user', __name__)

@user_bp.route("/api/v1/users", methods=["POST"])
def register():
    new_user = request.get_json()
    new_user["password"] = hashlib.sha256(new_user["password"].encode("utf-8")).hexdigest()
    
    # Ensure the email field is present
    if "email" not in new_user:
        return jsonify({'success': False, 'message': 'Email is required', 'error': 'Missing email field'}), 400
    
    # Check if the username or email already exists
    if users_collection.find_one({"username": new_user["username"]}) or users_collection.find_one({"email": new_user["email"]}):
        return jsonify({'success': False, 'message': 'Username or Email already exists', 'error': 'Duplicate entry'}), 409
    
    users_collection.insert_one(new_user)
    return jsonify({'success': True, 'message': 'User created successfully'}), 201

@user_bp.route("/api/v1/login", methods=["POST"])
def login():
    print("Login route reached")
    login_details = request.get_json()
    
    # Check if the login details contain an email
    user_from_db = users_collection.find_one({'$or': [{'username': login_details['username']}, {'email': login_details['username']}]})
    
    if user_from_db:
        print("User found:", user_from_db)
        encrypted_password = hashlib.sha256(login_details['password'].encode("utf-8")).hexdigest()
        if encrypted_password == user_from_db['password']:
            print("Username used for JWT token:", user_from_db['username'])
            access_token = create_access_token(identity=user_from_db['username'])
            print(access_token)
            response = {
                'message': "Login Success",
                'success': True,
                'jwtToken': access_token,
                'email': user_from_db['email'],
                'name': user_from_db['username']   # Adjust as needed to reflect the actual field for the name
            }
            return jsonify(response), 2000

    return jsonify({'error': 'The username/email or password is incorrect', 'message': "Login failed"}), 401


@user_bp.route("/api/v1/user", methods=["GET"])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    print(current_user)
    user_from_db = users_collection.find_one({'username': current_user})
    # user_from_db = users_collection.find_one({'username': 'testuser'})
    # print(user_from_db)
    if user_from_db:
        del user_from_db['_id'], user_from_db['password']
        return jsonify({'profile': user_from_db}), 200
    
    return jsonify({'msg': 'Profile not found'}), 404

