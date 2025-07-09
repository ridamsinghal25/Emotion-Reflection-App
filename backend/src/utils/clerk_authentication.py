from clerk_backend_api import Clerk, AuthenticateRequestOptions
import os
from dotenv import load_dotenv
from fastapi import HTTPException
from src.database.db import users_collection
load_dotenv()

clerk_sdk = Clerk(  
    bearer_auth=os.getenv("CLERK_SECRET_KEY"),
)


def authenticate_and_get_user_details(request):
    try:    
        request_state = clerk_sdk.authenticate_request(
            request,
            AuthenticateRequestOptions(
                authorized_parties=["http://localhost:5173"],
                jwt_key=os.getenv("JWT_KEY")
            ),
        )

        if not request_state.is_signed_in:
            raise HTTPException(status_code=401, detail="Unauthorized")

        print("authenticated:", request_state)

        user = users_collection.find_one({"clerk_id": request_state.payload.get("sub")})

        return {"user": user}
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))