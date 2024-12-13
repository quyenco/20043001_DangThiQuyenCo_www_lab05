package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Address;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Company;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories.AddressRepository;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services.AddressService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/address")
public class AddressControllers {
    @Autowired
    private AddressService addressService;

    @GetMapping("/find")
    public List<Address> getAll() {
        return addressService.getAll();
    }

    @GetMapping("/find-last")
    public Address getLastAddress() {
        return addressService.getLastAddress();
    }


    @GetMapping("/find-by-company")
    public Address getByCompany(@RequestParam Long companyId) {
        return addressService.getByCompany(companyId);
    }

    @GetMapping("/find-by-candidate")
    public Address getByCandidate(@RequestParam Long candidateId) {
        return addressService.getByCandidate(candidateId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?>  update(@PathVariable Long id, @RequestBody Address updatedAddress) {
        try {
            Address address = addressService.update(id, updatedAddress);
            return ResponseEntity.ok(address);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating address: " + e.getMessage());
        }
    }
}
