package org.example.students_details.MappingService;

import org.example.students_details.StudentCourseMappingModel;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Objects;

public interface StudentCourseMappingService {
    List<Map<String, Object>> StudentNames(Integer year);
    List<Map<String, Object>> CourseName(Integer year);
//    List<StudentCourseMappingModel> getMapping();
    ResponseEntity<Map<String,Boolean>> StudentMappingPost(Map<String,Object> MappingStudent);
    Map<String,List<Map<String,Object>>> getStudentMapping();
    ResponseEntity<Map<String,Boolean>> StudentMappingDelete(List<Long> ListIds);
    ResponseEntity<Map<String,Boolean>> StudentMappingUpdate(Map<String,Object> MappingStudentUpdate);

}
