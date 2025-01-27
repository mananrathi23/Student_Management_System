package org.example.students_details;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;

@Entity
@Table(name = "StudentsDetails")
public class StudentsDetailsModel {
    @Id

    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id ;
    @Column(name = "firstname")
    private String firstname ;
    @Column(name = "lastname")
    private String lastname ;
    @Column(name = "gaurdianname")
    private String gaurdianname ;
    @Column(name = "gaurdianphoneno")
    private String gaurdianphoneno;
    @Column(name = "address")
    private String address;
    @Column(name = "year")
    private Integer year ;


    public StudentsDetailsModel() {}
    public StudentsDetailsModel(String address, String firstname, String gaurdianphoneno, String gaurdianname, String lastname,Integer year) {
        this.address = address;
        this.firstname = firstname;
        this.gaurdianphoneno = gaurdianphoneno;
        this.gaurdianname = gaurdianname;
        this.lastname = lastname;
        this.year = year;
    }

    public String getGaurdianname() {
        return gaurdianname;
    }

    public String getAddress() {
        return address;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getGaurdianphoneno() {
        return gaurdianphoneno;
    }

    public String getLastname() {
        return lastname;
    }

    public Integer getYear(){return year;}

    public Long getId() {
        return id;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setGaurdianname(String gaurdianname) {
        this.gaurdianname = gaurdianname;
    }

    public void setGaurdianphoneno(String gaurdianphoneno) {
        this.gaurdianphoneno = gaurdianphoneno;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setYear(Integer year) {this.year = year;}

}


