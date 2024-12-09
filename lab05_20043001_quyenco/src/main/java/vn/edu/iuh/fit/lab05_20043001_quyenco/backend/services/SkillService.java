package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Skill;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories.SkillRepository;

import java.util.List;

@Service
public class SkillService {
    @Autowired
    private SkillRepository skillRepository;

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public Skill addSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public Skill getSkillById(Long id) {
        return skillRepository.findById(id).orElse(null);
    }

}
