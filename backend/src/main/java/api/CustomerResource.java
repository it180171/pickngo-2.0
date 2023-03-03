package api;

import io.smallrye.jwt.auth.principal.JWTAuthContextInfo;
import jwt.JwtService;
import models.Customer;
import workload.CustomerService;
import workload.DTOs.SignUPDTO;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("customer")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CustomerResource {
    @Inject
    private CustomerService service;
    @Inject
    JWTAuthContextInfo jwtAuthContextInfo;
    @Inject
    JwtService jwtService;

    //String jwt = jwtService.generateJwt();

    @GET
    public Response getCustomers(){
        System.out.println(service.findAll());
        return Response.ok(service.findAll()).build();
    }

    @GET
    @Path("{id}")
    public Response getCustomerById(@PathParam("id") Long id) {
        Customer customer = service.findById(id);
        return (customer != null ? Response.ok(customer) : Response.status(404)).build();
    }

    //ID beim request weglöschen, sonst detached entity
    @POST
    @RolesAllowed({"user"})
    @Path("signUp")
    public Response signUP(Customer customer) {
        SignUPDTO signUPDTO = service.signUP(customer);
        return Response.ok(signUPDTO)
                //.header(HttpHeaders.AUTHORIZATION, "Bearer " + jwt)
                .build();
    }

}
