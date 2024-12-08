package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Address;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories.AddressRepository;

import java.util.List;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;

    public List<Address> getAll() {
        return addressRepository.findAll();
    }

    public boolean save(Address address) {
        return addressRepository.save(address) != null;
    }

    public boolean delete(Long id) {
        addressRepository.deleteById(id);
        return true;
    }

    public Address getById(Long id) {
        return addressRepository.findById(id).get();
    }


}
