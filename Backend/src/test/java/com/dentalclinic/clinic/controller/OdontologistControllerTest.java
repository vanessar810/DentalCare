package com.dentalclinic.clinic.controller;

import com.dentalclinic.clinic.service.IOdontologistService;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@AutoConfigureMockMvc
class OdontologistControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private IOdontologistService odontologistService;
//    @Test
//    @DisplayName("test getting an odontologist")
//    void getOdontologist() throws Exception {
//        mockMvc.perform(get("/odontologist/1")
//                .accept(MediaType.APPLICATION_JSON))
//                .andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(jsonPath(("$.name")).value("Leonard"))
//                .andExpect(jsonPath(("$.lastname")).value("Lambert"))
//                .andExpect(jsonPath(("$.license")).value( "10002"));
//    }

//    @Test
//    @DisplayName("test not getting an odontologist")
//    void DoNotgetOdontologist() throws Exception {
//        mockMvc.perform(get("/odontologist/12")
//                        .accept(MediaType.APPLICATION_JSON))
//                .andDo(print())
//                .andExpect(status().isNotFound());
//    }
//
//
//    @Test
//    @DisplayName("Test adding an odontologist to DB")
//    void createOdontologist() throws Exception {
//        String email = System.getenv("TEST_ADMIN_EMAIL");
//        String password = System.getenv("TEST_ADMIN_PASSWORD");
//        String loginRequest = String.format("{\"email\":\"%s\", \"password\":\"%s\"}", email, password);
//        MvcResult result = mockMvc.perform(post("/api/v1/auth/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(loginRequest))
//                .andExpect(status().isOk())
//                .andReturn();
//        String response = result.getResponse().getContentAsString();
//        String token = JsonPath.read(response, "$.token");
//
//        String odontologist = "{\"name\":\"Sophie\",\"lastname\":\"Rousseau\",\"license\":\"10006\"," +
//                "\"email\":\"sophie.rou@mail.com\",\"phone\":\"123456\",\"user\":\"DENTIST\"}";
//
//        mockMvc.perform(post("/odontologist")
//                        .header("Authorization", "Bearer " + token)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(odontologist))
//                .andDo(print())
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath(("$.name")).value("Sophie"))
//                .andExpect(jsonPath(("$.lastname")).value("Rousseau"))
//                .andExpect(jsonPath(("$.license")).value( "10006"))
//                .andExpect(jsonPath(("$.email")).value( "sophie.rou@mail.com"))
//                .andExpect(jsonPath(("$.phone")).value( "123456"))
//                .andExpect(jsonPath(("$.user")).value( "DENTIST"));
//
//    }
}