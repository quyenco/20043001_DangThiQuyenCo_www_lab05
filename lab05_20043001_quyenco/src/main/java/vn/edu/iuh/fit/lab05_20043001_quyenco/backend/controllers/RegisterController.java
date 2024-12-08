package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto.RegisterRequest;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Address;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Candidate;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Company;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services.UserService;

import java.time.LocalDate;


@RestController
@RequestMapping("/api")
public class RegisterController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        System.out.println("Register request received: " + registerRequest);  // In log để kiểm tra
        String email = registerRequest.getEmail();
        String password = registerRequest.getPassword();
        String userType = registerRequest.getUserType();


        if (userService.emailExists(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email đã tồn tại");
        }

        if ("Candidate".equalsIgnoreCase(userType)) {
            Candidate candidate = new Candidate(email, password);
            candidate.setDob(LocalDate.now());
            candidate.setFullName(" ");
            candidate.setPhone(" ");
            
//            candidate.setAddress();
            userService.saveCandidate(candidate);
            return ResponseEntity.status(HttpStatus.CREATED).body("Đăng ký thành công");
        } else if ("Company".equalsIgnoreCase(userType)) {
            Company company = new Company(email, password);
//            company.setAddress(new Address());
            userService.saveCompany(company);
            return ResponseEntity.status(HttpStatus.CREATED).body("Đăng ký thành công");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Loại người dùng không hợp lệ");
    }
}
