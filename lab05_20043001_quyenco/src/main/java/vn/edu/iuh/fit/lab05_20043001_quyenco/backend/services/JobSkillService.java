package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.JobSkill;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories.JobSkillRepository;

@Service
public class JobSkillService {
    @Autowired
    private JobSkillRepository jobSkillRepository;

    public void addJobSkill(JobSkill jobSkill) {
        System.out.println("Saving JobSkill: " + jobSkill);
        jobSkillRepository.save(jobSkill); // Lưu vào cơ sở dữ liệu
    }
}
