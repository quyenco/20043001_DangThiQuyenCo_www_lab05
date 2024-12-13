package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services;

import jakarta.persistence.NoResultException;
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

    public Address getByCompany(Long companyId) {
        return addressRepository.findByCompanyId(companyId);
    }

    public Address getByCandidate(Long candidateId) {
        return addressRepository.findByCandidateId(candidateId);
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

    public Address update(Long id, Address updatedAddress) {
        Address existingAddress = addressRepository.findById(id).get();

        existingAddress.setStreet(updatedAddress.getStreet());
        existingAddress.setCity(updatedAddress.getCity());
        existingAddress.setZipcode(updatedAddress.getZipcode());

        return addressRepository.save(existingAddress);
    }

    public Address getLastAddress() {
        List<Address> addresses = addressRepository.findLastAddress();

        if (addresses.isEmpty()) {
           return null;
        }

        return addresses.get(0); // Trả về địa chỉ cuối cùng
    }
}
