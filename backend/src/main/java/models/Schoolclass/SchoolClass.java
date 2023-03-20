package models.Schoolclass;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class SchoolClass extends PanacheEntityBase {
    @Id
    public String id;
    public String room;

    public SchoolClass() {
    }

    public SchoolClass(String id, String room) {
        this.id = id;
        this.room = room;
    }

    public SchoolClassDTO toDTO() {
        return new SchoolClassDTO(id, room);
    }

    public static SchoolClass fromDTO(SchoolClassDTO s) {
        return new SchoolClass(s.getId(), s.getRoom());
    }
}
