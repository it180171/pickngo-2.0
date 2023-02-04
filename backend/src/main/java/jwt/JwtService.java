package jwt;

import io.smallrye.jwt.build.Jwt;

import javax.inject.Singleton;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Singleton
public class JwtService {

    public String generateJwt() {
        Set<String> roles = new HashSet<>(
                Arrays.asList("admin", "user")
        );
        return Jwt.issuer("pickngo-jwt")
                .subject("pickngo-jwt")
                .groups(roles)
                .expiresAt(
                        System.currentTimeMillis() + 3600
                )
                .sign();
    }
}
