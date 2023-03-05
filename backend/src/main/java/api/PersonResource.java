package api;

import jwt.JwtService;
import models.Customer;
import org.json.JSONObject;
import workload.DTOs.SignUPDTO;
import workload.PersonService;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("person")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PersonResource {
    @Inject
    private PersonService service;
    @Inject
    JwtService jwtService;

    @POST
    @Path("signIn/{username}/{password}")
    public Response signIn(@PathParam("username") String username, @PathParam("password") String password) {
        String jwt = jwtService.generateJwt();
        SignUPDTO signInDTO = service.signInWithusernaem(username, password);
        if(!signInDTO.isSuccess()) {
            return Response.status(404).build();
        }
        return Response.ok(signInDTO)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwt)
                .header("Access-Control-Expose-Headers", "Authorization")
                .build();
    }

}
