from fastapi import APIRouter, HTTPException
from app.schemas import EmployeeSchema
from app.db_config import employee_collection

router = APIRouter(prefix="/api/employees", tags=["Employees"])


@router.post("/")
def create_employee(employee: EmployeeSchema):
    existing_employee = employee_collection.find_one(
        {"employee_id": employee.employee_id}
    )

    if existing_employee:
        raise HTTPException(
            status_code=400,
            detail="Employee ID already exists"
        )

    existing_email = employee_collection.find_one(
        {"email": employee.email}
    )

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    employee_collection.insert_one(employee.dict())

    return {
        "message": "Employee added successfully"
    }


@router.get("/")
def get_employees():
    employees = []

    for employee in employee_collection.find({}, {"_id": 0}):
        employees.append(employee)

    return employees


@router.delete("/{employee_id}")
def delete_employee(employee_id: str):
    deleted = employee_collection.delete_one(
        {"employee_id": employee_id}
    )

    if deleted.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return {
        "message": "Employee deleted successfully"
    }