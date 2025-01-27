package org.example.students_details;

import org.example.students_details.ServicesStudentDetails.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "*")
public class StudentsDetailsController {
    @Autowired
    private StudentService studentService;
    @Autowired
    private StudentsDetailsRepository studentsDetailsRepository;

    // to put in StudentsDetails
    @PostMapping("/students/Savedetails")
    public StudentsDetailsModel createStudent(@RequestBody StudentsDetailsModel studentsDetailsModel) {
        return studentService.createStudent(studentsDetailsModel);
    }

    @GetMapping("/students/getdetails")
    public List<StudentsDetailsModel> getStudentDetails() {
        return studentService.readStudent();
    }

    // to delete the students detail
    @GetMapping("/students/details/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteStudent(@PathVariable Long id) {
            return studentService.deleteStudent(id);
    }

    // to update
    @PostMapping("/students/details/update/{id}")
    public ResponseEntity<Map<String, Boolean>> updateStudents(@RequestBody StudentsDetailsModel studentU){
        return studentService.updateStudents(studentU);

    }


}
