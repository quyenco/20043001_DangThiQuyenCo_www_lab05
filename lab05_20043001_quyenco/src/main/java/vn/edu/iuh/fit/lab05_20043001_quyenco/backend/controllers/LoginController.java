package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto.LoginRequest;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto.LoginResponse;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Candidate;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Company;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services.CandidateService;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services.CompanyService;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services.UserService;

//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class LoginController {
   @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Object user = userService.authenticateUser(email, password);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
        if (user instanceof Candidate) {
            Candidate candidate = (Candidate) user;
            return ResponseEntity.ok(new LoginResponse("Candidate",candidate.getId(), candidate.getEmail(), candidate.getFullName()));
        } else if (user instanceof Company) {
            Company company = (Company) user;
            return ResponseEntity.ok(new LoginResponse("Company",company.getId(), company.getEmail(), company.getCompName()));
        }


        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during login.");
    }


}
