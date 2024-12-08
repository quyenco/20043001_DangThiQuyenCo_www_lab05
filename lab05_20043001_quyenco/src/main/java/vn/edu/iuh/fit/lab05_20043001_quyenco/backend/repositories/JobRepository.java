package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Job;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
//    @Query("SELECT j FROM Job j WHERE " +
//            "LOWER(j.jobName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
//            "LOWER(j.company.compName) LIKE LOWER(CONCAT('%', :search, '%'))")
//    Page<Job> searchJobs(@Param("search") String search, Pageable pageable);

    @Query("SELECT j FROM Job j WHERE LOWER(j.jobName) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Job> searchJobs(String search, Pageable pageable);

    @EntityGraph(attributePaths = {"company"})
    @Query("SELECT j FROM Job j WHERE j.id IN :skillIds")
    List<Job> findJobsBySkills(List<Long> skillIds);

    @EntityGraph(attributePaths = {"company"})
    @Override
    Page<Job> findAll(Pageable pageable);
}
