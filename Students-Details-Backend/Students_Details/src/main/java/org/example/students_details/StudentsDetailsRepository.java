package org.example.students_details;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Repository
public interface StudentsDetailsRepository extends JpaRepository<StudentsDetailsModel,Long> {
    @Query(nativeQuery = true,value = "select concat(sd.firstname,' ',sd.lastname)as name,sd.id,sd.year  from students_details sd \n" +
            "where sd.year = ?1")
    List<Map<String, Object>> findStudentnames(Integer year);

    @Query(nativeQuery = true,value = "select c.course_name,c.course_id  from course c\n" + "where c.year = ?1  ")
    List<Map<String, Object>> findCourseNames(Integer year);

    @Query(nativeQuery = true,value = "select count(scm.name)  from  student_course_mapping scm \n" +
            "where scm.name=?1 ")
    Integer findCountStudentName(Long name);
}
