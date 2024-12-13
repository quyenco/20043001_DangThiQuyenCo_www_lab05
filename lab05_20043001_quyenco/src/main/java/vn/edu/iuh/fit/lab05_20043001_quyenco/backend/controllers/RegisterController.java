package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto.RegisterRequest;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Address;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Candidate;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Company;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services.AddressService;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services.UserService;

import java.time.LocalDate;


@RestController
@RequestMapping("/api")
public class RegisterController {
    @Autowired
    private UserService userService;

    @Autowired
    private AddressService addressService;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        System.out.println("Register request received: " + registerRequest);  // In log để kiểm tra
        String email = registerRequest.getEmail();
        String password = registerRequest.getPassword();
        String userType = registerRequest.getUserType();


//        long id = addressService.getLastAddress().getId();



        if (userService.emailExists(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email đã tồn tại");
        }

        if ("Candidate".equalsIgnoreCase(userType)) {
            Address address = new Address();
            addressService.save(address);
            Candidate candidate = new Candidate(email, password);
            candidate.setAddress(addressService.getLastAddress());
            candidate.setDob(LocalDate.now());
            candidate.setFullName(" ");
            candidate.setPhone(" ");
            userService.saveCandidate(candidate);
            return ResponseEntity.status(HttpStatus.CREATED).body("Đăng ký thành công");
        } else if ("Company".equalsIgnoreCase(userType)) {
            Address address = new Address();
            addressService.save(address);
            Company company = new Company(email, password);
            company.setAddress(addressService.getLastAddress());
            userService.saveCompany(company);
            return ResponseEntity.status(HttpStatus.CREATED).body("Đăng ký thành công");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Loại người dùng không hợp lệ");
    }
}
