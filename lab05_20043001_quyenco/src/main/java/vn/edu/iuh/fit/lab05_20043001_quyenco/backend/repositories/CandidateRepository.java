package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Candidate;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Company;

import java.util.List;
import java.util.Optional;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    Candidate findByEmail(String email);

    @Query("SELECT c FROM Candidate c JOIN FETCH c.address WHERE c.id = :id")
    Optional<Candidate> findByIdWithAddress(@Param("id") Long id);

    @Query("SELECT c FROM Candidate c WHERE c.id = :id")
    List<Candidate> findCandidatesById(@Param("id") Long id);
}
