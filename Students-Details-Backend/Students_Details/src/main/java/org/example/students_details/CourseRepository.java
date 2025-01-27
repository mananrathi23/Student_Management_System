package org.example.students_details;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

@Repository
public interface CourseRepository extends JpaRepository<CourseModel,Long> {

    @Query(nativeQuery = true,value = "select count(scm.course)  from  student_course_mapping scm \n" +
            "where scm.course =?1 ")
    Integer findCountByCourse(Long course);
}
