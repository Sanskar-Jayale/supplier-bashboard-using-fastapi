from sqlalchemy import Column, Integer, String, Float, Text, Date, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database import Base


class SupplierData(Base):
    __tablename__ = "supplier_data"
    supplier_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    country = Column(String)
    compliance_score = Column(Float)
    contract_terms = Column(JSON)
    last_audit = Column(Date)


class ComplianceRecord(Base):
    __tablename__ = "compliance_record"
    compliance_record_id = Column(
        Integer, primary_key=True, index=True, autoincrement=True
    )
    supplier_id = Column(Integer, ForeignKey("supplier_data.supplier_id"))
    metric = Column(String)
    date_recorded = Column(Date)
    result = Column(String)
    status = Column(String)

    supplier = relationship("SupplierData", back_populates="compliance_records")


SupplierData.compliance_records = relationship(
    "ComplianceRecord", back_populates="supplier", cascade="all, delete-orphan"
)
