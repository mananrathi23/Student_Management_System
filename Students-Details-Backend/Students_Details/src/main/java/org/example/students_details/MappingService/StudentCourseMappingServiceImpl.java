package org.example.students_details.MappingService;

import jakarta.persistence.Index;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.example.students_details.StudentCourseMappingModel;
import org.example.students_details.StudentCourseMappingRepository;
import org.example.students_details.StudentsDetailsModel;
import org.example.students_details.StudentsDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.Mapping;

import javax.lang.model.element.Name;
import java.util.*;

@Service
public class StudentCourseMappingServiceImpl implements StudentCourseMappingService {

    @Autowired
    private StudentsDetailsRepository studentsDetailsRepository;

    @Autowired
    private StudentCourseMappingRepository studentCourseMappingRepository;

    @Override
    public List<Map<String, Object>> StudentNames(Integer year) {
        return studentsDetailsRepository.findStudentnames(year);
    }

    @Override
    public List<Map<String, Object>> CourseName(Integer year) {
        return studentsDetailsRepository.findCourseNames(year);
    }

//    @Override
//    public List<StudentCourseMappingModel> getMapping() {
//        return StudentCourseMappingRepository.getMapping
//    }

    @Override
    public ResponseEntity<Map<String, Boolean>> StudentMappingPost(Map<String, Object> MappingStudent) {

        List<Integer> nameId = (List<Integer>) MappingStudent.get("name");
        List<Integer> courseId = (List<Integer>) MappingStudent.get("course");
        Integer Year = (Integer) MappingStudent.get("year");
        for (int i = 0; i < nameId.size(); i++) {
            for (int j = 0; j < courseId.size(); j++) {
                StudentCourseMappingModel map = new StudentCourseMappingModel();

                map.setName(nameId.get(i));
                map.setCourse(courseId.get(j));
                map.setYear(Year);
                studentCourseMappingRepository.save(map);
            }
        }
        Map<String, Boolean> response = new HashMap<>();
        response.put("saved", true);
        return ResponseEntity.ok(response);

    }

    @Override
    public Map<String, List<Map<String, Object>>> getStudentMapping() {
        List<Map<String, Object>> processing = studentCourseMappingRepository.takeStudentMapping();
        Map<String, List<Map<String, Object>>> result = new HashMap<>();
        for (int i = 0; i < processing.size(); i++) {
            String nameCatcher = (String) processing.get(i).get("name");
            if (result.containsKey(nameCatcher)) {
                result.get(nameCatcher).add(processing.get(i));
            } else {
                List<Map<String, Object>> newItems = new ArrayList<>();
                newItems.add(processing.get(i));
                result.put(nameCatcher, newItems);

            }
        }
        return result;

    }

    //to delete the studentMapping
    @Override
    public ResponseEntity<Map<String, Boolean>> StudentMappingDelete(List<Long> ListIds) {
        for (int i = 0; i < ListIds.size(); i++) {
//        Optional<StudentCourseMappingModel> Delete = studentCourseMappingRepository.findById(ListIds.get(i));
            studentCourseMappingRepository.deleteById(ListIds.get(i));
        }
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> StudentMappingUpdate(Map<String, Object> MappingStudentUpdate) {

        List<Integer> nameId = (List<Integer>) MappingStudentUpdate.get("name");
        List<Integer> courseId = (List<Integer>) MappingStudentUpdate.get("course");
        Integer Year = (Integer) MappingStudentUpdate.get("year");

        for(int i = 0; i < nameId.size(); i++){
            List<Map<String,Object>> ListStudentCourse = studentCourseMappingRepository.findMultiple(nameId.get(i));
            for(int j = 0; j < ListStudentCourse.size(); j++){
                studentCourseMappingRepository.deleteById((Long)ListStudentCourse.get(j).get("id"));
            }
        }
        for (int i = 0; i < nameId.size(); i++) {
            for (int j = 0; j < courseId.size(); j++) {
                StudentCourseMappingModel map = new StudentCourseMappingModel();

                map.setName(nameId.get(i));
                map.setCourse(courseId.get(j));
                map.setYear(Year);
                studentCourseMappingRepository.save(map);
            }
        }
        Map<String, Boolean> response = new HashMap<>();
        response.put("saved", true);
        return ResponseEntity.ok(response);

    }
}