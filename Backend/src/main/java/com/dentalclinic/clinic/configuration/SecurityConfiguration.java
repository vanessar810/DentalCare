package com.dentalclinic.clinic.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final AuthenticationProvider authenticationProvider;
    private final  JwtAuthenticationFilter authenticationFilter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(
                        auth ->{
                            // endpoints that does not need authetication
                            auth.requestMatchers("/api/v1/auth/**").permitAll();
                            auth.requestMatchers("/api/v1/auth/login").permitAll();
                            auth.requestMatchers("/api/v1/auth/register").permitAll();
                            auth.requestMatchers(HttpMethod.GET, "/odontologist/**").permitAll();
                            // endpoints swagger
                            auth.requestMatchers(HttpMethod.GET, "/swagger-ui/**").permitAll();
                            auth.requestMatchers(HttpMethod.GET, "/v3/api-docs/**").permitAll();
                            auth.requestMatchers(HttpMethod.GET, "/swagger-ui.html").permitAll();

                            // endponints que necesitan algun tipo de rol especifico
                            auth.requestMatchers(HttpMethod.POST,"/api/v1/odontologist/**").hasAnyAuthority("ADMIN");
                            auth.requestMatchers(HttpMethod.PUT,"/api/v1/odontologist/**").hasAnyAuthority("ADMIN");
                            auth.requestMatchers(HttpMethod.DELETE,"/api/v1/odontologist/**").hasAnyAuthority("ADMIN");
                            auth.requestMatchers(HttpMethod.POST, "/api/v1/patient/profile").hasAnyAuthority("ADMIN", "USER");
                            auth.requestMatchers(HttpMethod.GET, "/api/v1/patient/profile").hasAnyAuthority("ADMIN", "PATIENT");
                            auth.requestMatchers(HttpMethod.POST,"/api/v1/patient/**").hasAnyAuthority("ADMIN");
                            auth.requestMatchers("/api/v1/patient/**").hasAnyAuthority("ADMIN");
                            auth.requestMatchers(HttpMethod.GET,"/api/v1/appointment/user").hasAnyAuthority("PATIENT");

                            auth.requestMatchers(HttpMethod.GET,"/api/v1/patient/**").hasAnyAuthority("ADMIN");
                            auth.requestMatchers(HttpMethod.PUT,"/api/v1/patient/**").hasAnyAuthority("ADMIN");
                            auth.requestMatchers(HttpMethod.DELETE,"/api/v1/patient/**").hasAnyAuthority("ADMIN");

                            // endpoints que requieren autenticacion basica (tener al menos el rol de user)
                            auth.requestMatchers("/api/v1/appointments/**").authenticated();
                            auth.anyRequest().authenticated();

                        })
                .csrf(config -> config.disable())
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(authenticationProvider)
                .cors(Customizer.withDefaults())
                .build();
    }
}
