package org.example.students_details;

import jakarta.persistence.*;


@Entity
@Table(name = "students")
public class StudentModel {
    @Id

    @GeneratedValue(strategy = GenerationType.SEQUENCE)

    private Long id ;
    @Column(name = "name")
    private String name ;
    @Column(name = "email")
    private String email;
    @Column(name = "subject")
    private String subject;
    @Column(name = "marks")
    private String marks;
    @Column(name = "status")
    private boolean status;

    public StudentModel() {}

    public StudentModel(String email, String marks, String name, boolean status, String subject) {
        this.email = email;
        this.marks = marks;
        this.name = name;
        this.status = status;
        this.subject = subject;
    }

    public String getEmail() {
        return email;
    }

    public String getMarks() {
        return marks;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public boolean getStatus() {
        return status;
    }

    public String getSubject() {
        return subject;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMarks(String marks) {
        this.marks = marks;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}
