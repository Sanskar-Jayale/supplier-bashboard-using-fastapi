from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud import get_suppliers, create_supplier, get_single_supplier
from schemas import Supplier, SupplierCreate
from database import get_db
import json
from sqlalchemy.orm import Session
from models import SupplierData


router = APIRouter()


@router.get("/suppliers", response_model=list[Supplier])
def get_all_suppliers(db: Session = Depends(get_db)):
    return get_suppliers(db)


# @router.post("/suppliers", response_model=Supplier)
# def add_supplier(supplier: SupplierCreate, db: Session = Depends(get_db)):
#     return create_supplier(db, supplier)


@router.post("/suppliers", response_model=Supplier)
def add_supplier(supplier: SupplierCreate, db: Session = Depends(get_db)):
    # Check if contract_terms is a string and needs to be parsed as JSON
    if isinstance(supplier.contract_terms, str):
        try:
            supplier.contract_terms = json.loads(supplier.contract_terms)
        except json.JSONDecodeError:
            raise HTTPException(
                status_code=400, detail="Invalid JSON format for contract_terms"
            )

    return create_supplier(db, supplier)


@router.get("/suppliers/{supplier_id}", response_model=Supplier)
def get_single_id_supplier(supplier_id: int, db: Session = Depends(get_db)):
    supplier = get_single_supplier(db, supplier_id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier
