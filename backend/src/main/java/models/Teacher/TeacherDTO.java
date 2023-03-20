package models.Teacher;

public class TeacherDTO {
    long id;
    String firstName;
    String lastName;
    String room;

    public TeacherDTO(long id, String firstName, String lastName, String room) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.room = room;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }
}
