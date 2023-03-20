package models.Teacher;

import io.quarkus.panache.common.Sort;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class TeacherService {

    @Inject
    TeacherRepository teacherRepository;
    public List<TeacherDTO> getAll() {
        return teacherRepository.listAll(Sort.by("lastName", Sort.Direction.Ascending))
                .stream()
                .map(Teacher::toDTO)
                .collect(Collectors.toList());
    }

    public Teacher getById(long id) {
        return teacherRepository.findById(id);
    }
}
