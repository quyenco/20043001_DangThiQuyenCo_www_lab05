package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Company;

import java.util.List;
import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Company findByEmail(String email);

    @Query("SELECT c FROM Company c JOIN FETCH c.address WHERE c.id = :id")
    Optional<Company> findByIdWithAddress(@Param("id") Long id);

    @Query("SELECT c FROM Company c WHERE c.id = :id")
    List<Company> findCompaniesById(@Param("id") Long id);

}
