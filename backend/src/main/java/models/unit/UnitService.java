package models.unit;


import models.Schoolclass.SchoolClass;
import models.Teacher.Teacher;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class UnitService {

    @Inject
    UnitRepository unitRepository;

    public List<UnitDTO> getAllForClass(String classId) {
        return unitRepository.getAllForClass(classId)
                .stream()
                .map(Unit::toDTO)
                .collect(Collectors.toList());
    }

    public Unit postUnit(Unit u, Teacher t, SchoolClass sc) {
        u.schoolClass = sc;
        u.teacher = t;
        return unitRepository.save(u);
    }

    public void delete(long id) {
        unitRepository.delete(unitRepository.findById(id));
    }
}
