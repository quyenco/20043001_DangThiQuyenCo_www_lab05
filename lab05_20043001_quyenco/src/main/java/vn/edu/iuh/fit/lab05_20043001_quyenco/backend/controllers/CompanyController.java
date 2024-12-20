package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Company;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services.CompanyService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/company")
public class CompanyController {
    @Autowired
    private CompanyService companyService;

//    @GetMapping("/find")
//    public List<Company> getAll() {
//        return companyService.getAll();
//    }

    @GetMapping("get-page/{page}")
    public ResponseEntity<Map<String, Object>> getAll(@PathVariable int page) {
        Pageable pageable = Pageable.ofSize(4).withPage(page);
        Page<Company> companyPage = companyService.getAll(pageable); // Assuming companyService returns Page<Company>

        Map<String, Object> response = new HashMap<>();
        response.put("totalPages", companyPage.getTotalPages());
        response.put("companies", companyPage.getContent());

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCompanyById(@PathVariable Long id) {
        try {
            Company company = companyService.getById(id);
            return ResponseEntity.ok(company);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching company details: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCompany(@PathVariable Long id, @RequestBody Company updatedCompany) {
        try {
            Company company = companyService.updateCompany(id, updatedCompany);
            return ResponseEntity.ok(company);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating company: " + e.getMessage());
        }
    }
}
