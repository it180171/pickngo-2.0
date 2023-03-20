package models.Schoolclass;

import io.quarkus.panache.common.Sort;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class SchoolClassService {

     @Inject
    SchoolClassRepository schoolClassRepository;

     public List<SchoolClassDTO> getAll() {
         return schoolClassRepository.listAll(Sort.by("id", Sort.Direction.Ascending))
                 .stream()
                 .map(SchoolClass::toDTO)
                 .collect(Collectors.toList());
     }

    public SchoolClass getById(String id) {
        return schoolClassRepository.findById(id);
    }
}
