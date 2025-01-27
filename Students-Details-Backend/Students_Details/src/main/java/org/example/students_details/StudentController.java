package org.example.students_details;

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
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    // to put student details in backend
    @PostMapping("/students")
    public StudentModel CreateStudent(@RequestBody StudentModel student) {
        return studentRepository.save(student);
    }

    // to get student details
    @GetMapping("/students")
    public List<StudentModel> getAllStudents() {
        return studentRepository.findAll();
    }
    // to delete
    @GetMapping("/students/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteStudent(@PathVariable Long id){
        Optional<StudentModel> student = studentRepository.findById(id);
        studentRepository.deleteById(student.get().getId());
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

   // to update the student detail
   @PostMapping("/students/update")
   public ResponseEntity<Map<String, Boolean>> updateStudent( @RequestBody StudentModel student) {
        Optional<StudentModel> stud = studentRepository.findById(student.getId());
        stud.get().setName(student.getName());
        stud.get().setEmail(student.getEmail());
        stud.get().setSubject(student.getSubject());
        stud.get().setMarks(student.getMarks());
        stud.get().setStatus(student.getStatus());
        studentRepository.save(stud.get());
        Map<String,Boolean> response = new HashMap<>();
        response.put("updated",Boolean.TRUE);
        return ResponseEntity.ok(response);
   }

}
