package org.example.students_details.CourseService;

import org.example.students_details.CourseModel;
import org.example.students_details.CourseRepository;
import org.example.students_details.StudentsDetailsModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CourseImpl implements Course{
    @Autowired
    private CourseRepository courseRepository;
    @Override
    public CourseModel addCourse(CourseModel courseModel){
        return courseRepository.save(courseModel);
    }

    @Override
    public List<CourseModel> readCourses(){
        return courseRepository.findAll();
    }

    public ResponseEntity<Map<String, Boolean>> updateCourses(CourseModel CoursesSS) {
        Optional<CourseModel> course = courseRepository.findById(CoursesSS.getId());
        course.get().setCourse_name(CoursesSS.getCourse_name());
        course.get().setCourse_code(CoursesSS.getCourse_code());
        course.get().setCourse_status(CoursesSS.getCourse_status());
        course.get().setYear(CoursesSS.getYear());
        courseRepository.save(course.get());
        Map<String, Boolean> response = new HashMap<>();
        response.put("updated", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Map<String,Boolean>> deleteCourses(Long id) {
        Optional<CourseModel> Co = courseRepository.findById(id);
        Integer countCourse = courseRepository.findCountByCourse(id);
        if(countCourse == 0){
            courseRepository.deleteById(Co.get().getId());
            Map<String, Boolean> response = new HashMap<>();
            response.put("deleted", Boolean.TRUE);
            return ResponseEntity.ok(response);
        }

        else if (countCourse > 0){
            Map<String, Boolean> response = new HashMap<>();
            response.put("deleted", Boolean.FALSE);
            return ResponseEntity.ok(response);
        }
        Map<String, Boolean> response = new HashMap<>();
        response.put("Ok ", Boolean.FALSE);
        return ResponseEntity.ok(response);
    }
}
