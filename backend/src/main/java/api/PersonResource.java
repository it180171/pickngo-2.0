package api;

import DTO.LoginDTO;
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
    PersonService service;
    @Inject
    JwtService jwtService;

    @POST
    public Response signIn(LoginDTO loginDTO) {
        String jwt = jwtService.generateJwt();
        SignUPDTO signInDTO = service.signInWithusernaem(loginDTO.username, loginDTO.password);
        if(!signInDTO.isSuccess()) {
            return Response.status(404).build();
        }
        return Response.ok(signInDTO)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwt)
                .header("Access-Control-Expose-Headers", "Authorization")
                .build();
    }

}
