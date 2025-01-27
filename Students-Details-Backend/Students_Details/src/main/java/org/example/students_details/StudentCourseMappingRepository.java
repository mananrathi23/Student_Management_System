package org.example.students_details;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface StudentCourseMappingRepository extends JpaRepository<StudentCourseMappingModel,Long> {
    @Query(nativeQuery = true, value = "select scm.id,concat(sd.firstname,' ',sd.lastname) as name , c.course_name ,scm.year from student_course_mapping scm \n" +
            "left join course c on scm.course =c.course_id\n" +
            "left join students_details sd on scm.name = sd.id")
    List<Map<String,Object>> takeStudentMapping();
    @Query(nativeQuery = true,value = "select * from student_course_mapping scm \n" +
            "where scm.name = ?1")
    List<Map<String,Object>> findMultiple(Integer id);
}