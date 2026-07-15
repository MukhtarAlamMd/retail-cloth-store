package com.clothstore.retail_cloth_store.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    // ==========================================================
    // Replace with your own Base64 secret key
    // ==========================================================
    private static final String SECRET_KEY =
            "VGhpc0lzQVN1cGVyU2VjcmV0S2V5Rm9ySldUU3ByaW5nQm9vdEFwcGxpY2F0aW9uMTIzNDU2Nzg5MDEyMzQ1Njc4OTA=";

    // ==========================================================
    // Extract Username
    // ==========================================================
    public String extractUsername(String token) {

        return extractClaim(token, Claims::getSubject);
    }

    // ==========================================================
    // Extract Expiration
    // ==========================================================
    public Date extractExpiration(String token) {

        return extractClaim(token, Claims::getExpiration);
    }

    // ==========================================================
    // Extract Any Claim
    // ==========================================================
    public <T> T extractClaim(
            String token,
            Function<Claims, T> resolver) {

        Claims claims = extractAllClaims(token);

        return resolver.apply(claims);
    }

    // ==========================================================
    // Generate Token
    // ==========================================================
    public String generateToken(UserDetails userDetails) {

        return generateToken(new HashMap<>(), userDetails);
    }

    // ==========================================================
    // Generate Token With Extra Claims
    // ==========================================================
    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails) {

        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000 * 60 * 60
                        )
                )
                .signWith(
                        getSigningKey(),
                        SignatureAlgorithm.HS256
                )
                .compact();
    }

    // ==========================================================
    // Validate Token
    // ==========================================================
    public boolean isTokenValid(
            String token,
            UserDetails userDetails) {

        String username = extractUsername(token);

        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    // ==========================================================
    // Check Expired
    // ==========================================================
    private boolean isTokenExpired(String token) {

        return extractExpiration(token)
                .before(new Date());
    }

    // ==========================================================
    // Extract Claims
    // ==========================================================
    private Claims extractAllClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ==========================================================
    // Signing Key
    // ==========================================================
    private Key getSigningKey() {

        byte[] keyBytes =
                Decoders.BASE64.decode(SECRET_KEY);

        return Keys.hmacShaKeyFor(keyBytes);
    }
}