package org.example.students_details;


import org.example.students_details.CourseService.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "*")
public class CourseController {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private Course course ;

    // to save details to backend
    @PostMapping("/Courses")
    public CourseModel addCourse(@RequestBody CourseModel courseModel) {
        return course.addCourse(courseModel);
    }

    // to get all Courses
    @GetMapping("/get")
    public List<CourseModel> getCourses() {
        return course.readCourses();
    }

    // to delete the students detail
    @GetMapping("/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCourses(@PathVariable Long id) {
        return course.deleteCourses(id);
    }

    // to update
    @PostMapping("/update/{id}")
    public ResponseEntity<Map<String, Boolean>> updateCourses(@RequestBody CourseModel CoursesS){
        return course.updateCourses(CoursesS);

    }


}
