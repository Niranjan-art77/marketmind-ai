import secrets

class AuthService:
    def __init__(self):
        # In-memory user storage
        # Pre-populate with admin user
        self.users_db = {
            "admin": {
                "username": "admin",
                "password": "admin",
                "name": "Admin User",
                "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
            }
        }

    def login(self, username, password):
        user = self.users_db.get(username)
        if user and user["password"] == password:
            return {
                "token": secrets.token_hex(16),
                "user": {
                    "username": user["username"],
                    "name": user["name"],
                    "avatar": user.get("avatar")
                }
            }
        return {"error": "Invalid credentials"}

    def register(self, username, password, name):
        if username in self.users_db:
            return {"error": "Username already exists"}
        
        self.users_db[username] = {
            "username": username,
            "password": password,
            "name": name,
            "avatar": f"https://api.dicebear.com/7.x/avataaars/svg?seed={username}"
        }
        
        return {
            "message": "Registration successful",
            "user": {
                "username": username,
                "name": name,
                "avatar": self.users_db[username]["avatar"]
            }
        }

auth_service = AuthService()
