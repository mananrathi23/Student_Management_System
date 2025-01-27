package org.example.students_details.ServicesStudentDetails;

import org.example.students_details.StudentsDetailsController;
import org.example.students_details.StudentsDetailsModel;
import org.example.students_details.StudentsDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private StudentsDetailsRepository studentsDetailsRepository;
    @Override
    public StudentsDetailsModel createStudent(StudentsDetailsModel studentsDetailsModel) {
        return studentsDetailsRepository.save(studentsDetailsModel);
    }
    @Override
    public List<StudentsDetailsModel> readStudent() {
        return studentsDetailsRepository.findAll();
    }


    public ResponseEntity<Map<String, Boolean>> updateStudents(StudentsDetailsModel studentU) {
        Optional<StudentsDetailsModel> student = studentsDetailsRepository.findById(studentU.getId());
        student.get().setFirstname(studentU.getFirstname());
        student.get().setLastname(studentU.getLastname());
        student.get().setGaurdianname(studentU.getGaurdianname());
        student.get().setGaurdianphoneno(studentU.getGaurdianphoneno());
        student.get().setAddress(studentU.getAddress());
        student.get().setYear(studentU.getYear());
        studentsDetailsRepository.save(student.get());
        Map<String, Boolean> response = new HashMap<>();
        response.put("updated", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Map<String,Boolean>> deleteStudent(Long id) {
        Optional<StudentsDetailsModel> studentDetails = studentsDetailsRepository.findById(id);
        Integer nameCount = studentsDetailsRepository.findCountStudentName(id);
        if(nameCount == 0) {
            studentsDetailsRepository.deleteById(studentDetails.get().getId());
            Map<String, Boolean> response = new HashMap<>();
            response.put("deleted", Boolean.TRUE);
            return ResponseEntity.ok(response);
        }
        else if (nameCount > 0) {
            Map<String, Boolean> response = new HashMap<>();
            response.put("deleted", Boolean.FALSE);
            return ResponseEntity.ok(response);

        }
        Map<String, Boolean> response = new HashMap<>();
        response.put("Ok ", Boolean.FALSE);
        return ResponseEntity.ok(response);
    }


}
