package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto.JobSkillDTO;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.ids.JobSkillId;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.JobSkill;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories.JobRepository;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories.SkillRepository;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services.JobSkillService;

@RestController
@RequestMapping("/api/job-skills")
public class JobSkillController {
    @Autowired
    private JobSkillService jobSkillService;
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private SkillRepository skillRepository;

    @PostMapping("/add")
    public ResponseEntity<JobSkill> addJobSkill(@RequestBody JobSkillDTO jobSkillDTO) {
        JobSkill jobSkill = new JobSkill();
        jobSkill.setId(new JobSkillId(jobSkillDTO.getJobId(), jobSkillDTO.getSkillId()));
        jobSkill.setMoreInfos(jobSkillDTO.getMoreInfos());
        jobSkill.setSkillLevel(jobSkillDTO.getSkillLevel());

        // Nếu cần gán `Job` hoặc `Skill`, bạn có thể tìm chúng trong DB.
        jobSkill.setJob(jobRepository.findById(jobSkillDTO.getJobId()).orElseThrow());
        jobSkill.setSkill(skillRepository.findById(jobSkillDTO.getSkillId()).orElseThrow());

        jobSkillService.addJobSkill(jobSkill);
        return ResponseEntity.ok(jobSkill);
    }

}
