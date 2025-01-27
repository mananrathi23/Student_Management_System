package org.example.students_details.ServicesStudentDetails;

import org.example.students_details.StudentsDetailsModel;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface StudentService{
   StudentsDetailsModel createStudent(StudentsDetailsModel studentsDetailsModel);
   List<StudentsDetailsModel> readStudent();
   ResponseEntity<Map<String, Boolean>> updateStudents(StudentsDetailsModel studentU);
   ResponseEntity<Map<String, Boolean>> deleteStudent(Long studentId);

}

