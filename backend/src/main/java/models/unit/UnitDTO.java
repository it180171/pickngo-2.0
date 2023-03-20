package models.unit;

public class UnitDTO {
    long id;
    int day;
    int unit;
    String subject;
    String classId;
    long teacherId;

    public UnitDTO(long id, int day, int unit, String subject, String classId, long teacherId) {
        this.id = id;
        this.day = day;
        this.unit = unit;
        this.subject = subject;
        this.classId = classId;
        this.teacherId = teacherId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getUnit() {
        return unit;
    }

    public void setUnit(int unit) {
        this.unit = unit;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }

    public long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(long teacherId) {
        this.teacherId = teacherId;
    }
}
