package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Address;
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

    @GetMapping("/find-by-company")
    public Address getByCompany(@RequestParam Long companyId) {
        return addressService.getByCompany(companyId);
    }
}
