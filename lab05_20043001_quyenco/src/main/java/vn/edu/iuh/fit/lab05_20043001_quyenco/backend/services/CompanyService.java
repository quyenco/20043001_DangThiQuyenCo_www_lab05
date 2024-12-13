package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services;

import jakarta.persistence.NoResultException;
import jakarta.persistence.NonUniqueResultException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Company;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories.CompanyRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    public Page<Company> getAll(Pageable pageable) {
        return companyRepository.findAll(pageable); // Sử dụng phương thức phân trang của repository
    }

    public Company getById(Long id) {
        List<Company> companies = companyRepository.findCompaniesById(id);

        if (companies.isEmpty()) {
            throw new NoResultException("Không tìm thấy công ty nào với id = " + id);
        }

        if (companies.size() > 1) {
            throw new NonUniqueResultException("Nhiều công ty được tìm thấy với id = " + id);
        }

        return companies.get(0);
    }

    public Company updateCompany(Long id, Company updatedCompany) {
        Optional<Company> existingCompanyOptional = companyRepository.findById(id);

        if (!existingCompanyOptional.isPresent()) {
            throw new IllegalArgumentException("Company with ID " + id + " not found.");
        }

        Company existingCompany = existingCompanyOptional.get();

        // Update fields
        existingCompany.setCompName(updatedCompany.getCompName());
        existingCompany.setEmail(updatedCompany.getEmail());
        existingCompany.setPhone(updatedCompany.getPhone());
        existingCompany.setWebUrl(updatedCompany.getWebUrl());
        existingCompany.setAbout(updatedCompany.getAbout());

        if (updatedCompany.getAddress() != null) {
            existingCompany.getAddress().setStreet(updatedCompany.getAddress().getStreet());
            existingCompany.getAddress().setCity(updatedCompany.getAddress().getCity());
            existingCompany.getAddress().setZipcode(updatedCompany.getAddress().getZipcode());
        }

        return companyRepository.save(existingCompany);
    }
}
