package api.TimeTable;


import models.Schoolclass.SchoolClassService;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("class")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SchoolClassResource {

    @Inject
    SchoolClassService schoolClassService;

    @GET
    public Response getAll() {
        return Response.ok(schoolClassService.getAll()).build();
    }
}
