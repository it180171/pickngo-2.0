package api;

import io.smallrye.mutiny.Uni;
import models.DrinkItem;
import models.FoodItem;
import models.Product;
import workload.DrinkItemRepo;
import workload.FoodItemRepo;
import workload.ProductRepository;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.File;

@Path("product")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {


    @Inject
    private ProductRepository productRepository;
    @Inject
    private FoodItemRepo foodItemRepo;
    @Inject
    private DrinkItemRepo drinkItemRepo;

    @GET
    public Response getProducts() {
        return Response.ok(productRepository.findAll().list()).build();
    }

    @GET
    @Path("{id}")
    public Response getProductById(@PathParam("id") Long productId) {
        return Response
                .ok(productRepository.findById(productId))
                .build();
    }

    @GET
    @Path("drinks")
    public Response getDrinks() {
        return Response.ok(drinkItemRepo.findAll().list()).build();
    }

    @GET
    @Path("foods")
    public Response getFoods() {
        return Response.ok(foodItemRepo.findAll().list()).build();
    }

    @POST
    @Path("foodItem")
    public Response persistFoodItem(FoodItem foodItem) {
        foodItemRepo.persistET(foodItem);
        return Response.ok().build();
    }

    @POST
    @Path("drinkItem")
    public Response persistDrinkItem(DrinkItem drinkItem) {
        drinkItemRepo.persistET(drinkItem);
        return Response.ok().build();
    }

    @GET
    @Path("/img/{fileName}")
    @Produces("image/jpeg")
    public Uni<Response> getFile(@PathParam("fileName") String fileName) {
        File nf = new File(this.getClass().getClassLoader().getResource("/imgs/products/" + fileName).getFile());
        Response.ResponseBuilder response = Response.ok((Object) nf);
        response.header("Content-Disposition", "attachment;filename=" + nf);
        Uni<Response> re = Uni.createFrom().item(response.build());
        return re;
    }
}
