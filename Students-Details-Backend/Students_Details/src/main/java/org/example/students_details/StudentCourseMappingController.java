package org.example.students_details;

import org.example.students_details.MappingService.StudentCourseMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "*")
public class StudentCourseMappingController {

    @Autowired
    StudentCourseMappingService studentCourseMappingService;

    @Autowired
    StudentCourseMappingRepository studentCourseMappingRepository ;
    @Autowired
    private StudentsDetailsRepository studentsDetailsRepository;

    // to get the names of students from student details
    @GetMapping("/getStudentNames/{year}")
    public List<Map<String, Object>> getStudentNames(@PathVariable Integer year) {
        return studentCourseMappingService.StudentNames(year);
    }

    // to get courses from course file
    @GetMapping("/getCourseNames/{year}")
    public List<Map<String, Object>> getCourseNames(@PathVariable Integer year){
        return studentCourseMappingService.CourseName(year);
    }

    // to get details in table
//    @GetMapping("/get")
//    public List<StudentCourseMappingModel> studentCourseMappingModel() {
//        return studentCourseMappingService.getMapping() ;
//    }



    // to post in backend
    @PostMapping("/create")
    public ResponseEntity<Map<String,Boolean>> StudentMappingPost(@RequestBody Map<String,Object> MappingStudent ){
        return studentCourseMappingService.StudentMappingPost(MappingStudent);
    }

     // to get hte data from backend to table
    @GetMapping("/getMapping")
    public Map<String,List<Map<String,Object>>> getStudentMapping(){
        return studentCourseMappingService.getStudentMapping();
    }

    @PostMapping("/delete")
    public ResponseEntity<Map<String,Boolean>> StudentMappingDelete(@RequestBody List<Long> ListIds ){
        return studentCourseMappingService.StudentMappingDelete(ListIds);
    }

    // to delete the names with id
    @PostMapping("/update")
    public ResponseEntity<Map<String,Boolean>> StudentMappingUpdate(@RequestBody Map<String,Object> MappingStudentUpdate ){
        return studentCourseMappingService.StudentMappingUpdate(MappingStudentUpdate);
    }

}