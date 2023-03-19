package api;

import models.Menu;
import workload.MenuService;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("menu")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MenuResource {
    @Inject
    MenuService service;

    @GET
    public Response getAll() {
        return Response.ok(service.getAll()).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Long id) {
        return Response.ok(service.getById(id)).build();
    }

    @GET
    @Path("dishoftheday")
    public Response getDishOfTheDay() {
        return Response.ok(service.getDishOfTheDay()).build();
    }

    @POST
    @RolesAllowed({"admin"})
    public Response add(Menu menu) {
        return Response.ok(service.add(menu)).build();
    }

    @PUT
    @RolesAllowed({"admin"})
    public Response update(Menu menu) {
        return Response.ok(service.update(menu)).build();
    }

    @DELETE
    @Path("/{id}")
    @RolesAllowed({"admin"})
    public Response delete(@PathParam("id") Long id) {
        return Response.ok(service.delete(id)).build();
    }
}
