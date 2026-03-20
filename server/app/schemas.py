from pydantic import BaseModel, EmailStr
from datetime import date


class EmployeeSchema(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str


class AttendanceSchema(BaseModel):
    employee_id: str
    date: date
    status: str 