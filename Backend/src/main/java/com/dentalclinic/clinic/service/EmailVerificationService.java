package com.dentalclinic.clinic.service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Map;
@Service
public class EmailVerificationService implements EmailVerificationServiceImp{

    private final RestTemplate restTemplate;
    @Value("${email.verification.api.key}")
    private String apiKey;

    public EmailVerificationService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public boolean verifyEmailExists(String email) {
        String url = String.format("http://apilayer.net/api/check?access_key=%s&email=%s&smtp=1&format=1",
                apiKey, email);

        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Object formatValid = response.getBody().get("format_valid");
                Object smtpCheck = response.getBody().get("smtp_check");

                // Validamos formato y que el servidor responda
                return Boolean.TRUE.equals(formatValid) && Boolean.TRUE.equals(smtpCheck);
            }
        } catch (Exception e) {
            System.out.println("Error verifying email: " + e.getMessage());
        }
        return false;
    }
}
