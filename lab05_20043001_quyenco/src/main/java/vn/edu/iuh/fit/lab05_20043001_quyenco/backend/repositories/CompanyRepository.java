package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Company findByEmail(String email);

}
