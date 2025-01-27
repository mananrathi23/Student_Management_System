package org.example.students_details.CourseService;

import org.example.students_details.CourseModel;
import org.example.students_details.StudentsDetailsModel;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface Course {
    CourseModel addCourse(CourseModel courseModel);
    List<CourseModel> readCourses();
    ResponseEntity<Map<String, Boolean>> updateCourses(CourseModel CoursesS);
    ResponseEntity<Map<String, Boolean>> deleteCourses(Long course_id);

}
