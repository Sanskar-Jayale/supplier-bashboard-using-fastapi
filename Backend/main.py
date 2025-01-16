from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from compliance import router as compliance_router
from supplier import router as suppliers_router
from database import engine
from models import Base

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Allowed HTTP methods
    allow_headers=["Content-Type", "Authorization"],  # Headers to accept
)

# Include routers
app.include_router(suppliers_router, prefix="/api", tags=["Suppliers"])
app.include_router(compliance_router, prefix="/api", tags=["Compliance"])
