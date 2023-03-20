package models.unit;


import io.quarkus.hibernate.orm.panache.PanacheEntity;
import models.Schoolclass.SchoolClass;
import models.Teacher.Teacher;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Unit extends PanacheEntity {
    @Column(precision = 1)
    public Integer day;
    @Column(precision = 2)
    public Integer unit;

    public String subject;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    public Teacher teacher;

    @ManyToOne
    @JoinColumn(name = "schoolclass_id")
    public SchoolClass schoolClass;

    public Unit() {
    }

    public Unit(Integer day, Integer unit, String subject, Teacher teacher, SchoolClass schoolClass) {
        this.day = day;
        this.unit = unit;
        this.subject = subject;
        this.teacher = teacher;
        this.schoolClass = schoolClass;
    }

    public Unit(Integer day, Integer unit, String subject) {
        this.day = day;
        this.unit = unit;
        this.subject = subject;
    }

    public UnitDTO toDTO() {
        return new UnitDTO(id, day, unit, subject, schoolClass.id, teacher.id);
    }

    public static Unit fromDTO(UnitDTO u) {
        Unit unit = new Unit(u.getDay(), u.getUnit(), u.getSubject());
        if (u.getId() != -1) {
            unit.id = u.getId();
        }
        return unit;
    }
}
