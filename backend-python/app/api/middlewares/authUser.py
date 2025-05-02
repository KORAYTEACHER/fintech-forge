from fastapi import HTTPException
import jwt
from dotenv import dotenv_values

config = dotenv_values(".env")
def authenticateUser(token):
     print(token)
     if not token:
        raise HTTPException(status_code=401, detail="Authorization token is required.")

     try:
        
        decoded_jwt = jwt.decode(token, config["REFRESH_JWT_SECRET"], algorithms=["HS256"])
        print(decoded_jwt)
        return decoded_jwt
     except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expired.")
     except jwt.PyJWTError:
            raise HTTPException(status_code=401, detail="Invalid token.")