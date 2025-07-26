package com.dentalclinic.clinic.auth;

import com.dentalclinic.clinic.dto.response.MeResponseDTO;
import com.dentalclinic.clinic.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    @PostMapping("/register")
    ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authenticationService.register(request));
    }
    @PostMapping("/login")
    ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authenticationService.login(request));
    }
    @GetMapping("/me")
    public ResponseEntity<MeResponseDTO> getMe(@AuthenticationPrincipal User user){
        return ResponseEntity.ok(authenticationService.getUserProfile(user));
    }
}
