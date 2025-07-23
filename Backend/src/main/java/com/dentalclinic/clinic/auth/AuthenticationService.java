package com.dentalclinic.clinic.auth;

import com.dentalclinic.clinic.Dto.response.MeResponseDTO;
import com.dentalclinic.clinic.configuration.JwtService;
import com.dentalclinic.clinic.entity.User;
import com.dentalclinic.clinic.entity.UserRole;
import com.dentalclinic.clinic.exception.EmailAlreadyUsedException;
import com.dentalclinic.clinic.repository.IPatientRepository;
import com.dentalclinic.clinic.repository.IUserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final IUserRepository userRepository;
    private final IPatientRepository patientRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyUsedException("This email is already in use.");
        }
        User user = User.builder()
                .name(request.getName())
                .lastname(request.getLastname())
              //  .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .userRole(UserRole.USER)
                .build();
        userRepository.save(user);
        String token = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(token).build();
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        authenticationManager.authenticate(
             new UsernamePasswordAuthenticationToken(
                     request.getEmail(),
                     request.getPassword()
             )
        );
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User does not exists"));
        String token = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }
    public MeResponseDTO getUserProfile(User user){
        boolean hasProfile = patientRepository.existsByUser(user);
        return new MeResponseDTO(user.getName(), user.getEmail(), hasProfile, user.getUserRole());
    }

}
