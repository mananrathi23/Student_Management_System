package org.example.students_details;


import jakarta.persistence.*;


@Entity
@Table(name = "course")
public class CourseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_seq")
    @SequenceGenerator(
            name = "id_seq",
            allocationSize = 1
    )
    @Column(name = "course_id")
    private Long id;
    @Column(name = "course_name")
    private String course_name;
    @Column(name = "course_code")
    private String course_code;
    @Column(name = "course_status")
    private String course_status;
    @Column(name ="year")
    private Integer year ;

    public CourseModel() {}

    public CourseModel(String course_code, String course_name, String course_status,Integer year) {
        this.course_code = course_code;
        this.course_name = course_name;
        this.course_status = course_status;
        this.year = year;
    }

    public String getCourse_code() {
        return course_code;
    }

    public String getCourse_name() {
        return course_name;
    }

    public String getCourse_status() {
        return course_status;
    }

    public Long getId() {
        return id;
    }

    public void setCourse_code(String course_code) {
        this.course_code = course_code;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCourse_status(String course_status) {
        this.course_status = course_status;
    }

    public void setCourse_name(String course_name) {
        this.course_name = course_name;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}