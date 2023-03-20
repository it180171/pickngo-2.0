package models.Schoolclass;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SchoolClassRepository implements PanacheRepositoryBase<SchoolClass, String> {
}
