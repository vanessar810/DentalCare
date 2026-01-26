package com.dentalclinic.clinic.controller;

import com.dentalclinic.clinic.service.EmailVerificationServiceImp;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.Map;
@RestController
@RequestMapping("/api/email")

public class EmailVerificationController {
    private final EmailVerificationServiceImp emailVerificationService;

    public EmailVerificationController(EmailVerificationServiceImp emailVerificationService) {
        this.emailVerificationService = emailVerificationService;
    }

    @GetMapping("/verify")
    public ResponseEntity<Map<String, Boolean>> verifyEmail(@RequestParam String email) {
        boolean isValid = emailVerificationService.verifyEmailExists(email);
        return ResponseEntity.ok(Collections.singletonMap("valid", isValid));
    }
}
