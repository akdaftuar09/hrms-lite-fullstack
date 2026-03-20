from fastapi import APIRouter, HTTPException
from app.schemas import AttendanceSchema
from app.db_config import attendance_collection, employee_collection

router = APIRouter(prefix="/api/attendance", tags=["Attendance"])


@router.post("/")
def mark_attendance(record: AttendanceSchema):
    employee = employee_collection.find_one(
        {"employee_id": record.employee_id}
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    if record.status not in ["Present", "Absent"]:
        raise HTTPException(
            status_code=400,
            detail="Status must be Present or Absent"
        )

    existing_record = attendance_collection.find_one({
        "employee_id": record.employee_id,
        "date": str(record.date)
    })

    if existing_record:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked for this date"
        )

    attendance_collection.insert_one({
        "employee_id": record.employee_id,
        "date": str(record.date),
        "status": record.status
    })

    return {
        "message": "Attendance marked successfully"
    }


@router.get("/{employee_id}")
def get_attendance(employee_id: str):
    records = []

    for item in attendance_collection.find(
        {"employee_id": employee_id},
        {"_id": 0}
    ):
        records.append(item)

    return records