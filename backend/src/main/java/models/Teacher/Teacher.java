package models.Teacher;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;

@Entity
public class Teacher extends PanacheEntity {
    public String firstName;
    public String lastName;
    public  String room;

    public Teacher() {
    }

    public Teacher(String firstName, String lastName, String room) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.room = room;
    }

    public TeacherDTO toDTO() {
        return new TeacherDTO(id, firstName, lastName, room);
    }

    public static Teacher fromDTO(TeacherDTO t) {
        return new Teacher(t.getFirstName(), t.getLastName(), t.getRoom());
    }
}
