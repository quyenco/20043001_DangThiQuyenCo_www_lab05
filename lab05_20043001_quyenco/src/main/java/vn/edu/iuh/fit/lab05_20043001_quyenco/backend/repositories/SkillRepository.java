package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    boolean existsBySkillName(String skillName);
}
