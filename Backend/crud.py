from sqlalchemy.orm import Session
from models import SupplierData, ComplianceRecord
from schemas import SupplierCreate, ComplianceCheck


def get_suppliers(db: Session):

    return db.query(SupplierData).all()


def get_single_supplier(db: Session, supplier_id: int):
    return (
        db.query(SupplierData).filter(SupplierData.supplier_id == supplier_id).first()
    )


def create_supplier(db: Session, supplier: SupplierCreate):
    new_supplier = SupplierData(**supplier.model_dump(exclude={"supplier_id"}))
    db.add(new_supplier)
    db.commit()
    db.refresh(new_supplier)
    return new_supplier


def create_compliance_record(db: Session, compliance: ComplianceCheck):
    new_record = ComplianceRecord(
        **compliance.model_dump(exclude={"compliance_record_id"})
    )  # Ensure using Pydantic's dict()
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    return new_record  # This is the SQLAlchemy model, which will be converted to Pydantic automatically


def get_supplier_compliance_history(db: Session, supplier_id: int):
    # Query the database for compliance records related to the specific supplier
    compliance_history = (
        db.query(ComplianceRecord)
        .filter(ComplianceRecord.supplier_id == supplier_id)
        .all()
    )

    return compliance_history
