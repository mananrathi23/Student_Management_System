package org.example.students_details;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;

@Entity
@Table(name = "Student_Course_Mapping")
public class StudentCourseMappingModel {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private Integer name ;
    @Column(name = "course")
    private Integer course ;
    @Column(name = "year")
    private Integer year ;


    public StudentCourseMappingModel() {}

    public StudentCourseMappingModel(Integer course, Integer name,Integer year) {
        this.course = course;
        this.name = name;
        this.year = year;
    }

    public Integer getCourse() {
        return course;
    }

    public Long getId() {
        return id;
    }

    public Integer getName() {
        return name;
    }

    public void setCourse(Integer course) {
        this.course = course;
    }

    public void setName(Integer name) {
        this.name = name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}
