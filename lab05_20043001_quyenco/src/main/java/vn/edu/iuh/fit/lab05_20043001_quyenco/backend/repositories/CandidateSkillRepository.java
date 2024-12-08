package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.CandidateSkill;

import java.util.List;

@Repository
public interface CandidateSkillRepository extends JpaRepository<CandidateSkill, Long> {
    @Query("SELECT cs.skill.id FROM CandidateSkill cs WHERE cs.can.id = :candidateId")
    List<Long> findSkillIdsByCandidateId(@Param("candidateId") Long candidateId);
}
