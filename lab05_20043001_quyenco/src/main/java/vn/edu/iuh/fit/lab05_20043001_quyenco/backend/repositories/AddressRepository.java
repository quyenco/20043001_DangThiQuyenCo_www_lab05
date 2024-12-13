package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Address;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long>{
    Address findByCompanyId(Long companyId);
    Address findByCandidateId(Long candidateId);

    @Query(value = "SELECT * FROM Address ORDER BY id DESC LIMIT 1", nativeQuery = true)
    List<Address> findLastAddress();
}
